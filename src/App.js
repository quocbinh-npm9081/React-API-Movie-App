import './App.scss';
import 'swiper/swiper.min.css' 
import './assets/boxicons-2.0.7/css/boxicons.min.css'

import {BrowserRouter  } from 'react-router-dom';
import React from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import RouteS from './config/Route_s';
function App() {
  return (
        <BrowserRouter>
            <React.Fragment>
                <Header />
                <RouteS/>
                <Footer />
            </React.Fragment>
        </BrowserRouter>
    );
}

export default App;
