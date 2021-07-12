import React, { useState } from 'react';
import { useStyles } from 'react-styles-hook'
import classnames from "classnames";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
  Container
} from 'reactstrap';

export default function NavBarLite(props) {

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const styles = useStyles({
    navbar: {
      // width: "100%",
      height: "100px",
      // padding: ".5em 1em ",
      // margin: "1.5rem 0 0",
      flex: 1,
      flexDirection: "row",
      alignContent: "stretch",
      flexGrow: 4,
      flexBasis: "auto",
      alignItems: "center",
      justifyContent: "space-between"
    },
    burger:{
      // color: "#FFFFFF"
    }
  })

  return (
    <div className="fixed-top" style={styles.navbar}>
    <Navbar expand="lg" color="dark" style={styles.navbar}>
        <NavbarBrand href="/" ><h6>Fire Detection</h6></NavbarBrand>
        <button 
            aria-expanded={collapsed}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: !collapsed
            })}
            onClick={toggleNavbar}
            >
            <span style={styles.burger}className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        <NavbarToggler onClick={toggleNavbar} c />
        <Collapse
         navbar 
         isOpen={true}
         className="justify-content-end"
         >
          <Nav navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
    </Navbar>
  </div>
  )
}
