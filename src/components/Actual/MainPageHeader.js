import React from 'react'
import { Container } from "reactstrap"

export default function MainPageHeader() {
  return (
    <div>
      <div 
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" + require("assets/img/actual/forest2.jpeg").default + ")",
        }}
        >
          <div className="filter"/> 
          <div className="content-center">
            <Container>
              <div className="title-brand">
                <h1 className="presentation-title">
                  Fire Detection
                </h1>
                <div className="fog-low">
                <img
                  alt="..."
                  src={require("assets/img/fog-low.png").default}
                />
                </div>
                <div className="fog-low right">
                  <img
                    alt="..."
                    src={require("assets/img/fog-low.png").default}
                  />
                </div>
              </div>
                <h2 className="presentation-subtitle text-center">
                Detecting Forest Fires With Machine Learning
              </h2>
  
            </Container>
          </div>
          <div
            className="moving-clouds"
            style={{
              backgroundImage:
                "url(" + require("assets/img/clouds.png").default + ")",
            }}
          />
        <h6 className="category category-absolute">
            Capstone Project by Alex Rogers
        </h6>


        </div>
    </div>
     )
}
