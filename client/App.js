import React, { useState } from 'react';
import AppContainer from './src/navigation/AppContainer';
import UserContext from './src/context/UserContext';

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [password, setPassword] = useState('123');
    const [name, setName] = useState('Giang');
    const [gender, setGender] = useState('male');
    const [phone, setPhone] = useState('0325306161');
    const [address, setAddress] = useState('1192A');

    const user = {
        loggedIn, setLoggedIn,
        password, setPassword,
        name, setName,
        gender, setGender,
        phone, setPhone,
        address, setAddress
    };

    return (
        <UserContext.Provider value={user}>
            <AppContainer />
        </UserContext.Provider>
    );
}
