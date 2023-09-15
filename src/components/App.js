import React, { useContext, useEffect } from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { UserAuthContext, UserAuthProvider } from '../Context/UserAuthContext';
import LoginPage from './Login/Login';
import SideNavBar from './SideNavigation/SideNavBar';
import SignupPage from './Signup/Signup';


const ProtectedRoute = ({ children }) => {
    const { authState } = useContext(UserAuthContext);

    if (!authState.isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
};

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
                path="/dashboard/*"
                element={
                    <ProtectedRoute>
                        <SideNavBar />
                    </ProtectedRoute>
                }
            />
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