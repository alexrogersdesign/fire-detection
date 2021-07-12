import './assets/css/paper-kit.css';
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Predict from './components/Actual/Predict'
import LandingPage from 'views/examples/LandingPage';
import MainPage from 'components/Actual/MainPage';
import Graph from 'components/Actual/Graph';
import NavBarLite from 'components/Actual/NavBarLite';
import NavBarTop from 'components/Actual/NavBarTop';
import PredictWrapper from 'components/Actual/PredictWrapper';
import Notebook from 'components/Actual/Notebook';

export default function App() {
  return (
  <BrowserRouter style={{backgroundColor: "#343a40"}}>
    <Switch>
      <Route path="/predict">
        <PredictWrapper/>
      </Route>
      {/* <Graph/> */}
      {/* <LandingPage/> */}
      <Route path="/notebook">
        <Notebook/>
      </Route>
      <Route path="/">
        <MainPage/>
      </Route>
    </Switch>
  </BrowserRouter>
  )
}
