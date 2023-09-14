import React, { useContext } from 'react';
import LoginPage from './Login/Login';
import { Route, BrowserRouter, Routes, useNavigate, useLocation } from 'react-router-dom';
import SideNavBar from './SideNavigation/SideNavBar';
import SignupPage from './Signup/Signup';
import { UserAuthProvider, UserAuthContext } from '../Context/UserAuthContext';


const AppRoutes = () => {
    const navigate = useNavigate();
    const { authState } = useContext(UserAuthContext);
    if (!authState.isAuthenticated) {
        navigate("/");
    }
    return (
        <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/dashboard/*" element={<SideNavBar />} />
            <Route path="/signup" element={<SignupPage />} />
        </Routes>
    );
};

function App() {
    return (
        <UserAuthProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </UserAuthProvider>
    );
}

export default App;
