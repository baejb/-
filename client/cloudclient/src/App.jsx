import './App.css'
import React, { useEffect } from 'react';
import axios from 'axios';
import LandingPage from './pages/LandingPage'
import { baseUrl } from './constants';

function App() {
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   axios.defaults.headers.common['atk'] = token;
  // }, []);
  return (
    <>
     <LandingPage/>
     
    </>
  )
}

export default App
