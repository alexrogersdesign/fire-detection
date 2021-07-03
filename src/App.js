import './App.css';
import React, { useReducer, useRef,  useState, useEffect } from 'react';
// import * as mobilenet from '@tensorflow-models/mobilenet'; 
import * as tf from '@tensorflow/tfjs';
// const tf = require('@tensorflow/tfjs-node');
import {loadGraphModel} from '@tensorflow/tfjs-converter';

import { Button } from 'react-bootstrap';

import state from './state';

// const modelUrl = {
//   model: 'https://arogerscapstone.blob.core.windows.net/capstone-tensorflow/original/model.json',
//   options: {
//     fromTFHub: true 
//   }
//   };
const modelUrl = {
  model: 'https://arogerscapstone.blob.core.windows.net/capstone-tensorflow/second-model/model.json',
  };

function App() {
  const reducer = (currentState, event) =>
  state.states[currentState].on[event] || state.initial; 
  const [appState, dispatch] = useReducer(reducer, state.initial);
  const next = () => dispatch("next"); 
  const [model, setModel] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [results, setResults] = useState(null);
  const [response, setResponse] = useState("");
  const inputRef = useRef();
  const imageRef = useRef();


  const load = async () => {
    try {
    next()
    // const model = await tf.loadLayersModel(modelUrl.model, modelUrl.options);
    const model = await loadGraphModel(modelUrl.model);
    setModel(model);
    console.log("Load model success")
    next()
    }
    catch (err) {
    console.log(err);
    }
    }

  const processImage = (imageToProcess) => {
    const newImage = tf.browser.fromPixels(imageToProcess)
    const args = {
      images: newImage,
      size: ([224,224])
    } 
    return tf.image.resizeBilinear(newImage, ([224, 224])).reshape([1,224,224,3])
  }
    
  const indentify = async () => {
    next();
    const results = await model.predict(processImage(imageRef.current)).data();
    console.log(results)
    setResults(results)
    next()
  }

  useEffect(()=>{
    if (!results) setResponse("")
    else results > .5 ? setResponse("Fire") : setResponse("Not Fire")
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
    setResults([null])
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
    <div className="App">
      { showImage &&  <img src={imageUrl} alt="file-preview" ref={imageRef}/>}
      <button onClick={buttonProps[appState].action}>{buttonProps[appState].text}</button>
      <input type="file" accept="image/*" capture="camera" ref={inputRef} onChange={handleUpload}></input>
      {
        <h2>{response}</h2>
      }
    </div>
  );
}

export default App;
