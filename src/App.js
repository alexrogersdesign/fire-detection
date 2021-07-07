import './assets/css/paper-kit.css';
import React from 'react'
import { BrowserRouter } from 'react-router-dom';


import Predict from './components/Actual/Predict'
import LandingPage from 'views/examples/LandingPage';
import MainPage from 'components/Actual/MainPage';
import Graph from 'components/Actual/Graph';

export default function App() {
  return (
  <BrowserRouter>
    {/* <MainPage/> */}
    <Graph/>
    {/* <LandingPage/> */}
    {/* <Predict/> */}
  </BrowserRouter>
  )
}
 