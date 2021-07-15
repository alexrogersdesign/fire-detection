import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { useStyles } from 'react-styles-hook'

import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";

const colabURL = "https://colab.research.google.com/drive/1Wzi-dnEtzJYu1R3LrwTtIHnFTHWRPOhq?usp=sharing"

export default function NavBarTop({transitionPosition}) {
  const [color, setColor] = useState("navbar-transparent")
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
    document.documentElement.classList.toggle("nav-open")
  }
  useEffect(()=>{
    const updateColor = () => {
      if (
        document.documentElement.scrollTop  > transitionPosition - 1 ||
        document.body.scrollTop > transitionPosition - 1
      ){setColor("")}
      else if (
        document.documentElement.scrollTop < transitionPosition  ||
        document.body.scrollTop < transitionPosition
      )
      {setColor("navbar-transparent")}
    }
    window.addEventListener("scroll", updateColor)
    return () => window.removeEventListener("scroll", updateColor)
  })

  const styles = useStyles({
    header: {
      // width: "100%",
    },
    container: {
      // padding: 5,
      // top: 0
    },
    brand:{
      // padding: 5
    },
    link: {
      // padding: 5
    }
  })

  return (
    <Navbar 
      className={classnames("fixed-top", color)}
      // color-on-scroll="300"
      expand="lg"
      // style={styles.header}
    >
      <Container 
      // style={styles.container}
      >
        <div className="navbar-translate">
          <NavbarBrand
          data-placement="bottom"
          to="/"
          title="Detecting Fire With Machine Learning"
          tag={Link}
          // style={styles.brand}
          >
            Detecting Fire With Machine Learning
          </NavbarBrand>
          <button 
            aria-expanded={visible}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: visible
            })}
            onClick={toggleVisibility}
            >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={visible}
        >
          <Nav navbar>
            <NavItem>
              <NavLink 
                data-placement="bottom"
                href="/"
                title="home"
              >
                <i style= {styles.link} className="nc-icon nc-book-bookmark" /> 
                &nbsp; Home <br/> 
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink 
                data-placement="bottom"
                href="/predict"
                title="predict"
              >
                <i style= {styles.link} className="nc-icon nc-book-bookmark" /> 
                &nbsp; Test the model <br/> 
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink 
                data-placement="bottom"
                target="_blank"
                href= {colabURL}
                title="How It Works"
              >
                <i style= {styles.link} className="nc-icon nc-book-bookmark" /> 
                &nbsp; Model Information <br/> 
                
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink 
                data-placement="bottom"
                target="_blank"
                href="https://www.linkedin.com/in/alexrogersdesign/"
                title="Follow me on Linkedin"
              >
                <i className="fa fa-linkedin"/>
                <p className="d-lg-none">Linkedin</p>
              </NavLink>
            </NavItem> */}
          </Nav>
        </Collapse>

      </Container>
    
    </Navbar>
  )
}
