import React from 'react'
import { Container } from "reactstrap"
import { useStyles } from 'react-styles-hook'

export default function MainPageHeader() {
  
  const styles = useStyles({
   div : {
     display: "flex",
     flexFlow: "column nowrap"
   },
   header: {
    display: "flex",
    flexGrow: 0,
    flexShrink: 3

   }
  
  })
  return (
    <div style={styles.div}>
      <div 
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" + require("assets/img/actual/forest2.jpeg").default + ")",
            flexGrow: 1,
            flexShrink: 4
        }}
        >
          <div className="filter"/> 
          <div className="content-center">
            <Container >
              <div className="title-brand" >
                <h1 style={styles.header} className="presentation-title">
                  Fire
                  Detection
                </h1>
                <div className="fog-low">
                <img
                  alt="..."
                  src={require("assets/img/actual/fog-low.png").default}
                />
                </div>
                <div className="fog-low right">
                  <img
                    alt="..."
                    src={require("assets/img/actual/fog-low.png").default}
                  />
                </div>
              </div>
                <h2 className="presentation-subtitle text-center">
                Detecting Forest Fires With Computer Vision
              </h2>
  
            </Container>
          </div>
          <div
            className="moving-clouds"
            style={{
              backgroundImage:
                "url(" + require("assets/img/actual/clouds.png").default + ")",
            }}
          />
        <h6 className="category category-absolute">
            Capstone Project by Alex Rogers
        </h6>


        </div>
    </div>
     )
}
