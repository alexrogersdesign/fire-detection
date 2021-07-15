import React from 'react'
import { useStyles } from 'react-styles-hook'
import Footer from './Footer'


import NavBarTop from './NavBarTop'
import Predict from './Predict'

export default function PredictWrapper() {

  const styles = useStyles({
    page: {
      backgroundColor: "#343a40",
      height: "140em"
    },
    component: {
      position: "absolute",
      top: "80px",
      color: "#FFFFFF",
      // display: "flex",
      // flexDirection: "column",
      textAlign: "center",
      alignItems: "center",
      padding: "30px",
    } 
  })

  return (
    <div style={styles.page}>
      <br/>
      <br/>
      <br/>
      <br/>
      <NavBarTop transitionPosition={50}/>
      <Predict style={styles.component} color="#FFFFFF"/>
      {/* <Footer/> */}
    </div>
  )
}
