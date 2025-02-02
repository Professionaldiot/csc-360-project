import React, { createContext, useContext, useState } from 'react';

/*
Creates a global state that can be used throughout the
rest of the site, and going across the different pages.
*/

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
    const [userData, setUserData] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    console.log(userData);
    return (
        <GlobalStateContext.Provider value={{
            userData, setUserData,
            isLogged, setIsLogged,
            statusMessage, setStatusMessage,
        }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalStateContext);