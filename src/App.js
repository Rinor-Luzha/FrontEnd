import './App.css';
import React from 'react';
import { urlName } from './endpoints';
import Footer from './Components/Footer';
import Header from './header';

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <div className='container'>
        <Header/>
        </div>
      </div>
    <Footer />
  </div>
  )
}

export default App;
