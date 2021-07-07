import React from 'react'

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

export default function MainPage() {
  return (
    <div>
      {/* <IndexNavbar/> */}
      {/* <IndexHeader/> */}
      <MainPageHeader/> 
      <NavBarTop/>
      <div className="main">
        <Container>
        <Row>
          <Col className="ml-auto mr-auto" md="8">
          <h2 className="title">
            Detecting Fire 
          </h2>
          <h5>
            Cum blanditiis eius impedit ut provident aut. Recusandae saepe ipsum est eius laboriosam maiores. Et eius fuga quia a aut quas quod saepe esse.
 
            Nobis qui iure assumenda vel quo nisi autem saepe. Nostrum repudiandae repudiandae laboriosam quas. Et aperiam corrupti. Voluptates eius sequi architecto necessitatibus molestiae ut. In et suscipit. Non numquam minima veniam cupiditate et facere dolor vero.
            
            Vel delectus iusto ratione doloremque quod ea nam ipsa ratione. Veniam repudiandae dolore ut. Iusto ut dicta numquam ducimus itaque eaque placeat consequatur. Tempore et quidem non.
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
