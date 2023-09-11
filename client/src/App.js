import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import RentBike from "./RentBike";

function App() {
  return (
    <>
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/RentBike" element={<RentBike />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
