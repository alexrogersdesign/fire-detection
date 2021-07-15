import React, { useState, useEffect } from 'react'
import { useStyles } from 'react-styles-hook'
import Plot from 'react-plotly.js';



export default function ConfidenceChart({prediction, color}) {
  const [response, setResponse] = useState("");

  
  useEffect(()=>{
    if (!prediction) setResponse("")
    else prediction > .5 ? setResponse("Fire Detected") : setResponse("No Fire Detected")
    }
    ,[prediction])


  const styles = useStyles({
    label: {
      fontSize: 1
    },
    container: {
      // margin: 10,
      // padding: 10,
      flex: 1,
      flexDirection: "column",
      // alignContent: "stretch",
      // flexGrow: 4,
      // alignItems: "center",
      // justifyContent: "center",
      padding: 5,
    },
    legend: {
      position:"absolute",
      right: "0px",
      top: "-20px",
      color: color? color : "#66615b",
      
      // 
    },
    textColor: {
      color: color? color : "#66615b" 
    }
  })
  
  const plotData = [{
    values: [Math.round(prediction * 100), Math.round(Math.abs(1 - prediction) * 100)],
    labels: ["Fire", "No Fire"],
    textposition: "outside",
    type: "pie", 
    marker: {
      colors:  [ "#eb8334", "#86b095" ]
    }
  }]

  const plotLayout ={
    width: 300,
    height: 300,
    margin: {
      t: 10,
      r: 50,
      // l: 50
      
    },
    // title: "Model Confidence",
    font: {
      size: 14,
      color: styles.textColor.color
    },
    paper_bgcolor: "rgba(0,0,0,0",
    // plot_bgcolor: "rgba(0,0,0,0",
  }
  

  return (
    <div styles={styles.container} >
      <h2>{response}</h2>
      <h3>Model confidence</h3>
      <Plot
        style={styles.textColor}
        data = {plotData}
        layout = {plotLayout}
      />
    </div>
  )
}
