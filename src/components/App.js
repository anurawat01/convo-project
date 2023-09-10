import React from 'react';
import LoginPage from './Login/Login';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SideNavBar from './SideNavigation/SideNavBar';
import SignupPage from './Signup/Signup';

function App() {
    return (
        <BrowserRouter>
            <Routes >
                <Route exact path="/" element={<LoginPage />} />
                <Route path="/dashboard/*" element={<SideNavBar />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
