import React from 'react';
import ReactDOM from 'react-dom/client';
// import MainPage from './App';
// import './index.css';
// import App from './Component/Header';
import Header from './Component/Header';
// import Footer from './Component/Footer';
import Mainpage from './Component/Mainpage';
// import App from './Component/App';
// import MainPage from './App';
// import App from ''
// import App from "App";
// import NewsCard from './Component/Card';
// import Navbar from './Component/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    {/* <App/> */}
    <Mainpage/>
    {/* <App/> */}
    {/* <Footer/> */}
  </React.StrictMode>
);


