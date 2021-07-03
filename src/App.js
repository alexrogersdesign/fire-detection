import './App.css';
import React, { useReducer, useRef,  useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet'; 

import state from './state';

const reducer = (currentState, event) =>
 state.states[currentState].on[event] || state.initial;


function App() {
  const [appState, dispatch] = useReducer(reducer, state.initial);
  const next = () => dispatch("next"); 
  const [model, setModel] = useState(null);
  const inputRef = useRef();
  const imageRef = useRef();
  const [imageUrl, setImageUrl] = useState(null);

  const handleUpload = event => {
    const { files } = event.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0])
      setImageUrl(url)
      next()
    }
  }

  const load = async () => {
    next()
    const mobilenetModel = await mobilenet.load();
    setModel(mobilenetModel)
    next()
  }

  const buttonProps = {
    initial: { text: "Load Model", action: load},
    loadingModel: {text: "Loading Model" , action: ()=> {},
    modelReady: { text: "Upload Image", action: ()=> inputRef.current.click() },
    imageReady: { text: "Identify Fire", action: () => {} },
    identifying: { text: "Identifying", action: () => {} },
    complete: { text: "Reset", action: () => {} }
    }
  }
  const { showImage = false } = state.states[appState]
  return (
    <div className="App">
      <button onClick={buttonProps[appState].action}>{buttonProps[appState.text]}</button>
      <input type="file" accept="image/*" capture="camera" ref={inputRef} onChange={handleUpload}></input>
    </div>
  );
}

export default App;
