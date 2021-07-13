import '../../App.css';
import React, { useReducer, useRef,  useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';


import * as tf from '@tensorflow/tfjs';

import {loadGraphModel} from '@tensorflow/tfjs-converter';

import { Button } from 'react-bootstrap';
import { useStyles } from 'react-styles-hook'


import ConfidencePlot from './ConfidencePlot';


function Predict({color}) {
  const reducer = (currentState, event) =>
  state.states[currentState].on[event] || state.initial; 
  const next = () => dispatch("next"); 
  const [model, setModel] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [results, setResults] = useState(null);
  const [formUrl, setFormUrl] = useState("");
  const inputRef = useRef();
  const imageRef = useRef();
  
  const state = {
    initial: "initial",
    states: {
      initial: { on: { next: "loadingModel" } },
      loadingModel: { on: { next: "modelReady" } },
      modelReady: { on: { next: "imageReady" } , showUrl: true },
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
        width: "80%",
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
      }, 
      textColor: {
        color: color? color : "#66615b" 
      },
      btn: {
        backgroundColor: "#a84a32",
        border: 0,
        marginTop: 15,
      }
    })
  

  const load = async () => {
  try {
  next()
  const model = await loadGraphModel(modelUrl.model);
  next()
  setModel(model);
  console.log("Load model success")
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
  
  const identify = async () => {
  next();
  const imageTensor = processImage(imageRef.current)
  const results = await model.predict(imageTensor).data();
  console.log(results)
  setResults(results)
  next()
  }

  const handleUrlUpload= event => {
    setImageUrl(formUrl)
    console.log(event.target)
    next()
  }


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
  next();
  }

  const buttonProps = {
  initial: { text: "Load Model", action: load },
  loadingModel: { text: "Loading Model" , action: ()=> {} },
  modelReady: { text: "Upload Image", action: ()=> inputRef.current.click() },
  imageReady: { text: "Identify", action: identify},
  identifying: { text: "Identifying", action: () => {} },
  complete: { text: "Reset", action: resetState }
  }


  const { showImage = false , showResults = false, showUrl} = state.states[appState]
  return (
  <div className="App" style={{...styles.div, ...styles.textColor}}>
    <h1>Evaluate the model</h1>
    <br/>
    <h5>Upload your own image <br/> The model will predict if it contains fire</h5>
    <Button style={styles.btn} onClick={buttonProps[appState].action}>{buttonProps[appState].text}</Button>
    <br/>
    { results&&
      <div>
        <ConfidencePlot color={color} prediction={results}/>
      </div>
      }
    { showImage &&  <img style={styles.image} src={imageUrl} alt="file-preview" ref={imageRef}/>}
    <input 
    type="file" 
    accept="image/*" 
    capture="camera" 
    ref={inputRef} 
    onChange={handleUpload}
    style={styles.input}
    />
    {showUrl && 
    <div>
      <Form inline>
        <FormGroup>
          <Input
            type="url"
            name="url"
            id="exampleUrl"
            placeholder="Paste image url"
            onChange={(e) => setFormUrl(e.target.value)}
          />
        <Button style={styles.btn} onClick={handleUrlUpload}>Upload URL</Button>
        </FormGroup>
      </Form>
    </div>
    }
  </div>
  );
}

export default Predict;
