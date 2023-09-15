import React, { createContext, useState, useEffect } from 'react';
export const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        token: null,
    });
    useEffect(() => {
        const token = localStorage.getItem('authTokenConvo');
        if (token) {
            setAuthState(token);
        }
    }, []);

    const login = (token) => {
        setAuthState({ isAuthenticated: true, token });
        localStorage.setItem('authTokenConvo', token);
    };

    const logout = () => {
        setAuthState({ isAuthenticated: false, token: null });
        localStorage.removeItem('authTokenConvo');
    };

    return (
        <UserAuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </UserAuthContext.Provider>
    );
};
