import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SatelliteWeather from './pages/SatelliteWeather';
import './App.css';

const App = () => {
  return (
    <>
      <Navbar />
      <div className="app-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/satellite" element={<SatelliteWeather />} />
        </Routes>
      </div>
    </>
  );
};

export default App;