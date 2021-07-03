import './App.css';
import React, { useReducer, useRef,  useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet'; 
import * as tf from '@tensorflow/tfjs-node';
import {loadLayersModel} from '@tensorflow/tfjs-converter';

import state from './state';

const modelUrl = {
  model: 'https://arogerscapstone.blob.core.windows.net/capstone-tensorflow',
  };

function App() {
  const reducer = (currentState, event) =>
  state.states[currentState].on[event] || state.initial;
  const [appState, dispatch] = useReducer(reducer, state.initial);
  const next = () => dispatch("next"); 
  const [model, setModel] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [results, setResults] = useState([]);
  const inputRef = useRef();
  const imageRef = useRef();

  const load = async () => {
    next()
    const model = await tf.loadLayersModel(modelUrl);
    setModel(model)
    next()
  }

  const indentify = async () => {
    next();
    const results = await model.classify(imageRef.current);
    setResults(results)
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


  const formatResult = ({ className, probability}) => (
    <li key={className}>
      {'${className}: %s{(probability * 100).toFixed(2)}'}
    </li>
  )
  const resetState = () => {
    setImageUrl([])
    setResults([])
    next();
  }

  const buttonProps = {
    initial: { text: "Load Model", action: load },
    loadingModel: { text: "Loading Model" , action: ()=> {} },
    modelReady: { text: "Upload Image", action: ()=> inputRef.current.click() },
    imageReady: { text: "Identify Fire", action: indentify},
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
        results.map(({ className, probability }) => (
          <li key={className}>
            {`${className}: %${(probability * 100).toFixed(
              2
            )}`}
          </li>
        ))
      }
    </div>
  );
}

export default App;
