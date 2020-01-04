import React, { useContext } from 'react';
import LogInScreen from './LogInScreen';
import InfoScreen from './InfoScreen';
import UserContext from '../context/UserContext';

export default function Switch(props) {
    const user = useContext(UserContext);
    return user.loggedIn ? <InfoScreen navigation={props.navigation} /> : <LogInScreen navigation={props.navigation} />;
}
