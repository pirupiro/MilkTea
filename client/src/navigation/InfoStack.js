import React from 'react';
import InfoScreen from '../screens/InfoScreen';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesome } from '@expo/vector-icons';

const InfoStack = createStackNavigator({
    InfoScreen: {
        screen: InfoScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    SignUpScreen
}, {
    navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
            <FontAwesome
                name='user-circle'
                size={30}
                color={tintColor}
            ></FontAwesome>
        )
    }
});

export default InfoStack;
