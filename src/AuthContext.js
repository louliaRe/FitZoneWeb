import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        role: null,
        username: null,
        branch_id:null,
        gym_id:null,
    });

    const navigate = useNavigate();
    
    const login = (accessToken, refreshToken, role, username,branch_id, gym_id ) => {
        console.log("Logging in with:", { accessToken, refreshToken, role, username,branch_id, gym_id});

        setAuthState(prevState => ({
            ...prevState,
            accessToken,
            
            isAuthenticated: true,
            role,
            username,
            branch_id,
            gym_id,
            
        }));

        console.log("Updated AuthState after login:", {
            accessToken,
            refreshToken,
            isAuthenticated: true,
            role,
            username,
            branch_id,
            gym_id,

        });

        switch (role) {
            case 1:
                navigate('/admin');
                break;
            case 2:
                navigate('/ManagerInterface');
                break;
            case 3:
                navigate('/EmpMainP');
                break;
            case 4:
                navigate('/coach');
                break;
            case 5:
                navigate('/client');
                break;
            default:
                navigate('/');
                break;
        }
    };

    const logout = () => {
        setAuthState({
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            role: null,
            username: null,
            branch_id:null,
            gym_id:null,

        });
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };
