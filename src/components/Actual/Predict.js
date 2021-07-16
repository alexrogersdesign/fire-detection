import '../../App.css';
import React, { useReducer, useRef,  useState} from 'react';
import { Form, FormFeedback, FormGroup, Input } from 'reactstrap';

import * as tf from '@tensorflow/tfjs';

import {loadGraphModel} from '@tensorflow/tfjs-converter';

import { Button } from 'react-bootstrap';
import { useStyles } from 'react-styles-hook'
import { useValidateImageURL } from "use-validate-image-url";
import { useAlert } from 'react-alert'



import ConfidencePlot from './ConfidencePlot';
import ProgressBar from './ProgressBar';


function Predict({color}) {
  const reducer = (currentState, event) =>
  state.states[currentState].on[event] || state.initial; 
  const next = () => dispatch("next"); 
  const [model, setModel] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [results, setResults] = useState(null);
  const [formUrl, setFormUrl] = useState("");
  const [loadProgress, setLoadProgress] = useState("");
  // const [urlStatus , setUrlStatus] = useState(true);
  const urlStatus = useValidateImageURL(formUrl)
  const inputRef = useRef();
  const imageRef = useRef();
  const alert = useAlert();
  
  const state = {
    initial: "initial",
    states: {
      initial: { on: { next: "loadingModel" } },
      loadingModel: { on: { next: "modelReady" }, showProgress: true },
      modelReady: { on: { next: "imageReady" } , showUrl: true },
      imageReady: { on: { next: "identifying" }, showImage: true },
      identifying: { on: { next: "complete" }, showProgress: true },
      complete: { on: { next: "modelReady" }, showImage: true, showResults: true }
    }
  };
  const [appState, dispatch] = useReducer(reducer, state.initial);
  
  const modelUrl = {
    // model: 'https://arogerscapstone.blob.core.windows.net/capstone-tensorflow/final-first/model.json',
    model: 'http://localhost:8080/htts://arogerscapstone.blob.core.windows.net/capstone-tensorflow/final-first/model.json',
    };
  
    const styles = useStyles({
      image: {
        width: "50%",
        height: "auto",
        borderRadius: 30,
        flexShrink: 0,
        flexGrow: 2,
        // alignSelf: "flex-end",
        // top: 80,
        order: -1,
        flexBasis: 0
      },
      input: {
        width: "0.1px",
        height: "0.1px",
        opacity: 0,
        overflow: "hidden",
        // position: "absolute",
        zIndex: -1,
      },
      div: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        padding: "30px",
        // width: "100%"
      }, 
      textColor: {
        color: color? color : "#66615b" 
      },
      btn: {
        backgroundColor: "#a84a32",
        borderColor: "#a84a32",
        borderRadius: 6
        // border: 0,
        // marginTop: 15,
      },
      form: {
        // marginTop: 20
      },
      textgroup: {
        paddingBottom: 30
      },
      urlForm: {
        display: "flex",
        flexDirection: "row",
        // textAlign: "center",
        alignItems: "baseline",
        alignSelf: "center",
        alignContent: "space-between",
        justifyContent: "center",
        margin: 5
        // padding: "30px",
      },
      graphics: { 
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        alignContent: "center",
        flexWrap: "nowrap",
        flexFlow: "center",
        justifyContent: "space-around",
        marginTop: 20
      },
      chart: {
        // position: "absolute",
        // top: 30,
        // height: "40%",
        // width: "auto",
        flexGrow: 3,
        flexShrink: 2,
      },
      progress: {
        width: "20%",
        height: "auto",
        flexShrink: 1,
        flexGrow: 1,
        // flexBasis: 200,
        // padding: 10,
        margin: "2%"
      },
    })
  

  const load = async () => {
  try {
  next()
  const model = await loadGraphModel(modelUrl.model, {onProgress: (p => setLoadProgress(p * 100))} );
  next()
  setModel(model);
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
  setLoadProgress(25)
  next();
  const imageTensor = processImage(imageRef.current)
  const results = await model.predict(imageTensor).data();
  setTimeout(()=> setLoadProgress(75), 2000)
  setResults(results)
  next()
  }


  const handleUrlUpload= async (event) => {
    
    if (urlStatus === "valid"){
      setImageUrl(formUrl)
      next()
    }
    else {
      alert.show('This Url Is Not A Valid Image')
    }   
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
  initial: { text: "Begin", action: load },
  loadingModel: { text: "Loading Model" , action: ()=> {} },
  modelReady: { text: "Upload Image File", action: ()=> inputRef.current.click() },
  imageReady: { text: "Identify", action: identify},
  identifying: { text: "Identifying", action: () => {} },
  complete: { text: "Reset", action: resetState }
  }


  const { showImage = false , showResults = false, showUrl = false, showProgress = false} = state.states[appState]
  return (
  <div className="App" style={{...styles.div, ...styles.textColor}}>
    <h1>Evaluate the model</h1>
    <h5 style={styles.textgroup}>Upload your own image <br/> The model will predict if it contains fire</h5>
    { showProgress && <ProgressBar value={loadProgress} style={styles.progress}/>}
    <Button style={styles.btn} onClick={buttonProps[appState].action}>
      {buttonProps[appState].text}
    </Button>
    <div style={styles.graphics} >
      { results&&
        <div>
          <ConfidencePlot color={color} prediction={results} style={styles.chart}/>
        </div>
        }
      { showImage &&  <img style={styles.image} src={imageUrl} alt="file-preview" ref={imageRef} crossOrigin='anonymous'/>}
      <div style={styles.form}>
        <input 
        type="file" 
        accept="image/*" 
        capture="camera" 
        ref={inputRef} 
        onChange={handleUpload}
        style={styles.input}
        />
        {showUrl && 
        <div style={styles.formUrl}>
          <Form inline >
            <FormGroup style={styles.formUrl}> 
              <Input
                type="url"
                name="url"
                id="exampleUrl"
                placeholder="http://imageurl.com"
                // invalid={urlStatus === "invalid"}
                onChange={(e) => setFormUrl(e.target.value)}
              />
              <FormFeedback>Invalid Url</FormFeedback>
            <Button style={styles.btn} onClick={handleUrlUpload}>Upload URL</Button>
            </FormGroup>
          </Form>
        </div>
        }
      </div>
    </div>
  </div>
  );
}

export default Predict;
