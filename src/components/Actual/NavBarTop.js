import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

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

  return (
    <Navbar 
      className={classnames("fixed-top", color)}
      // color-on-scroll="300"
      expand="lg"
    >
      <Container>
        <div classnames="navbar-translate">
          <NavbarBrand
          data-placement="bottom"
          to="/index"
          target="_blank"
          title="Detecting Fire With Machine Learning"
          tag={Link}>
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
