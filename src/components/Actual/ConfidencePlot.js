import React, { useState } from 'react'
import { PopoverContent } from 'react-bootstrap';
import { useStyles } from 'react-styles-hook'
import {
  LabelSeries,
  RadialChart,
  DiscreteColorLegend,
} from 'react-vis';



export default function ConfidenceChart({prediction}) {
  const positivePercentage = prediction * 100
  const negativePercentage =   Math.abs(1 - prediction) * 100
  console.log(positivePercentage);
  console.log(prediction);
  
  
  const labels = [
    {x: "",
    y: 100},
    {x: "",
    y: 100}
  ]
  const radialData = [
    {
      angle: prediction * 360, 
      label: "Fire",
      subLabel: String(prediction * 100) + "%",
      color: "#eb8334",
      radius: 1.1

    },
    {
      angle: Math.abs(1 - prediction) * 360,
      label: "No Fire",
      subLabel: String(Math.abs(1 - prediction) * 360) + "%",
      color: "#86b095"
     }
  ]

  const styles = useStyles({
    label: {
      fontSize: 1
    },
    legend: {
      position:"absolute",
      right: "0px",
      top: "-60px",
      flex: 1,
      flexDirection: "row",
      alignContent: "stretch",
      flexGrow: 4
    }
  })


  return (
    <div >
      <h3>Model confidence</h3>
      <RadialChart 
      data={radialData} 
      width={300} 
      height={400} 
      colorType="literal" 
      // showLabels={true} 
      // labelsRadiusMultiplier={.8}
      // labelStyle={styles.label}
      >
        <DiscreteColorLegend 
        className = {"h5"}
        items = {radialData.map(i => (
          {
          title: i.label + " " + String(Math.round(i.angle / 360 * 100) + "%"), 
          color: i.color,
          strokeWidth: 10
          }
          ))}
         orientation="horizontal"
        //  width={300}
         height={200}
         style={styles.legend} />
      </RadialChart>
    </div>
  )
}
