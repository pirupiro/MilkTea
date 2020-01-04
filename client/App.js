import React, { useState } from 'react';
import AppContainer from './src/navigation/AppContainer';
import UserContext from './src/context/UserContext';
import ItemContext from './src/context/ItemContext';

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    const userContext = {
        loggedIn, setLoggedIn,
        id, setId,
        password, setPassword,
        name, setName,
        gender, setGender,
        phone, setPhone,
        address, setAddress
    };

    const itemContext = {
        items, setItems,
        cartItems, setCartItems
    };

    return (
        <UserContext.Provider value={userContext}>
            <ItemContext.Provider value={itemContext}>
                <AppContainer />
            </ItemContext.Provider>
        </UserContext.Provider>
    );
}
