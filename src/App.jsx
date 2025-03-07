import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Payment from './pages/Product';
import About from './pages/About';
import Map from './pages/Map';
import Login from './components/Login';
import './App.css';
import PreLoader from './components/Preloader';
import TranslateWidget from './components/TranslateWidget';


const App = () => {
    const [showPopup, setShowPopup] = useState(true);
    const [showLogin, setShowLogin] = useState(false);

    const handleAccept = () => {
        setShowPopup(false);
    };

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    return (
        <>
            <PreLoader />
            <Router>
                <div>
                    <Nav onLoginClick={handleLoginClick} />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/product" element={<Payment />} />
                            <Route path="/map" element={<Map />} />
                            <Route path="/about" element={<About />} />

                            
                        </Routes>
                    </main>
                </div>
            </Router>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>SMART RATION SHOP</h2>
                        <TranslateWidget />
                        <p>Welcome to my wonderfull people</p>
                        <button onClick={handleAccept}>Accept</button>
                    </div>
                </div>
            )}
            {showLogin && <Login onClose={handleCloseLogin} />}
        </>
    );
}

export default App;
