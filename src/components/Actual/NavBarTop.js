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
  Button,
  } from "reactstrap";
  

export default function NavBarTop() {
  const [color, setColor] = useState("navbar-transparent")
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
    document.documentElement.classList.toggle("nav-open")
  }
  useEffect(()=>{
    const updateColor = () => {
      if (
        document.documentElement.scrollTop  > 299 ||
        document.body.scrollTop > 299
      ){setColor("")}
      else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      )
      {setColor("navbar-transparent")}
    }
    window.addEventListener("scroll", updateColor)
    return () => window.removeEventListener("scroll", updateColor)
  })

  const styles = useStyles({
    header: {
      // width: "100%",
      // height: "15%",
      // top:-20
      // borderRadius: 30
      // flex: 1,
      // flexDirection: "row",
      // alignContent: "stretch",
      // flexGrow: 4,
      // flexBasis: "auto",
      // alignItems: "center",
      // justifyContent: "space-between"
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
          to="/home"
          target="_blank"
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
                target="_blank"
                href="/predict"
                title="predict"
              >
                <i style= {styles.link} className="nc-icon nc-book-bookmark" /> 
                &nbsp; Try it out <br/> 
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink 
                data-placement="bottom"
                target="_blank"
                href="https://colab.research.google.com/drive/13mUQ9J170wyLSmsRuPryniJ2VxPM1gIO?usp=sharing"
                title="How It Works"
              >
                <i style= {styles.link} className="nc-icon nc-book-bookmark" /> 
                &nbsp; How it works <br/> 
                &nbsp;&nbsp;&nbsp;&nbsp; (Colab Notebook)
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink 
                data-placement="bottom"
                target="_blank"
                href="https://www.linkedin.com/in/alexrogersdesign/"
                title="Follow me on Linkedin"
              >
                <i className="fa fa-linkedin"/>
                <p className="d-lg-none">Linkedin</p>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>

      </Container>
    
    </Navbar>
  )
}
