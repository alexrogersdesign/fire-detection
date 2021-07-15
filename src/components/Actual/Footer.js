import React from 'react'
import { Row, Container } from "reactstrap";

export default function Footer() {
  return (
    <footer className="footer ">
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a
                href="/">
                  Home
                </a>
              </li>
              <li>
                <a
                href="/predict">
                  Test The Model
                </a>
              </li>
              <li>
                <a
                href="https://colab.research.google.com/drive/1Wzi-dnEtzJYu1R3LrwTtIHnFTHWRPOhq?usp=sharing">
                  Model Information
                </a>
              </li>
            </ul>
          </nav>
        </Row>
      </Container>
    </footer>
  )
}
