import React from 'react'
import { useStyles } from 'react-styles-hook'

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Navbar,
} from "reactstrap";

import NavBarTop from './NavBarTop';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import ProfilePageHeader from 'components/Headers/ProfilePageHeader';
import LandingPageHeader from 'components/Headers/LandingPageHeader';
import IndexHeader from 'components/Headers/IndexHeader';
import MainPageHeader from './MainPageHeader';
import Predict from './Predict';
import NavBarLite from './NavBarLite';

export default function MainPage() {
 
  const styles = useStyles({
    page: {
      // backgroundColor: "#343a40"
    },
    div: {
      // display: "flex",
      // flexDirection: "column",
      // textAlign: "center",
      // alignItems: "center",
      // padding: "30px",
    } 
  })

  return (
    <div style={styles.div}>
      {/* <NavBarLite style={styles.page}/> */}
      <MainPageHeader style={styles.page}/> 
      <NavBarTop/>
      {/* <IndexNavbar/> */}
      <div className="main" style={styles.page}>
        <Container>
        <Row>
          <Col className="ml-auto mr-auto" md="8">
          <Predict/>
          <h5>
           Using machine learning to indentify fires in forest imagry. With forest fires growning more common 
          </h5>
          <Button
          className="btn-round"
          color="info"
          />
          </Col>
        </Row>
        <Row>
          <Col md="3">
          <div className="info">
            <div className="description">
            <h4 className="info-title">Title</h4>
            <p className="description">
              Tempora sit et asperiores molestias et aspernatur culpa perspiciatis. Autem non eum nulla aut amet dolorum. Cupiditate quia qui. Quasi omnis earum nam officiis deleniti quidem laboriosam sed. Qui ea corporis repellat sed.
            </p>

            </div>
            
          
          </div>
          </Col>
        </Row>
        </Container>
      </div>
    </div>
  )
}
