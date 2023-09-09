import React from 'react';
import LoginPage from './Login/Login';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SideNavBar from './SideNavigation/SideNavBar';

function App() {
    return (
        <BrowserRouter>
            <Routes >
                <Route exact path="/login" element={<LoginPage />} />
                <Route path="/dashboard/*" element={<SideNavBar />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
