import '../../App.css';
import React, { useReducer, useRef,  useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

import {loadGraphModel} from '@tensorflow/tfjs-converter';

import { Button } from 'react-bootstrap';
import { useStyles } from 'react-styles-hook'


import ConfidencePlot from './ConfidencePlot';


function Predict() {
  const reducer = (currentState, event) =>
  state.states[currentState].on[event] || state.initial; 
  const next = () => dispatch("next"); 
  const [model, setModel] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [results, setResults] = useState(null);
  const [response, setResponse] = useState("");
  const inputRef = useRef();
  const imageRef = useRef();
  
  const state = {
    initial: "initial",
    states: {
      initial: { on: { next: "loadingModel" } },
      loadingModel: { on: { next: "modelReady" } },
      modelReady: { on: { next: "imageReady" } },
      imageReady: { on: { next: "identifying" }, showImage: true },
      identifying: { on: { next: "complete" } },
      complete: { on: { next: "modelReady" }, showImage: true, showResults: true }
    }
  };
  const [appState, dispatch] = useReducer(reducer, state.initial);
  
  const modelUrl = {
    model: 'https://arogerscapstone.blob.core.windows.net/capstone-tensorflow/final-first/model.json',
    };
  
    const styles = useStyles({
      image: {
        width: "100%",
        height: "auto",
        borderRadius: 30
      },
      input: {
        width: "0.1px",
        height: "0.1px",
        opacity: 0,
        overflow: "hidden",
        position: "absolute",
        zIndex: -1,
      },
      div: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        padding: "30px",
      } 
    })
  

  const load = async () => {
  try {
  next()
  const model = await loadGraphModel(modelUrl.model);
  setModel(model);
  console.log("Load model success")
  next()
  }
  catch (err) {
  console.log(err);
  }
  }
  const IMG_SIZE = 224; 

  const processImage = (imageToProcess) => {
  const newImage = tf.browser.fromPixels(imageToProcess)
  return tf.image.resizeBilinear(newImage, ([IMG_SIZE, IMG_SIZE]))
                 .reshape([-1,IMG_SIZE,IMG_SIZE,3])
                 .div(255)
  }
  
  const indentify = async () => {
  next();
  const imageTensor = processImage(imageRef.current)
  const results = await model.predict(imageTensor).data();
  console.log(results)
  setResults(results)
  next()
  }

  useEffect(()=>{
  if (!results) setResponse("")
  else results > .5 ? setResponse("Fire Detected") : setResponse("No Fire Detected")
  }
  ,[results])

  const handleUpload = event => {
  const { files } = event.target;
  if (files.length > 0) {
    const url = URL.createObjectURL(files[0])
    setImageUrl(url)
    next()
  }
  }

  const resetState = () => {
  setImageUrl([])
  setResults("")
  setResponse("")
  next();
  }

  const buttonProps = {
  initial: { text: "Load Model", action: load },
  loadingModel: { text: "Loading Model" , action: ()=> {} },
  modelReady: { text: "Upload Image", action: ()=> inputRef.current.click() },
  imageReady: { text: "Identify", action: indentify},
  identifying: { text: "Identifying", action: () => {} },
  complete: { text: "Reset", action: resetState }
  }


  const { showImage = false , showResults = false} = state.states[appState]
  return (
  <div className="App" style={styles.div}>
    <h1>Evaluate the model</h1>
    <br/>
    <h5>Upload your own image <br/> The model will predict if it contains fire</h5>
    <br/>
    { showImage &&  <img style={styles.image} src={imageUrl} alt="file-preview" ref={imageRef}/>}
    <Button onClick={buttonProps[appState].action}>{buttonProps[appState].text}</Button>
    <input 
    type="file" 
    accept="image/*" 
    capture="camera" 
    ref={inputRef} 
    onChange={handleUpload}
    style={styles.input}
    />
    { results&&
      <div>
        <h2>{response}</h2>
        <ConfidencePlot prediction={results}/>
      </div>
      }
  </div>
  );
}

export default Predict;
