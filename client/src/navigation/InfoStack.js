import React from 'react';
import Switch from '../screens/Switch';
import SignUpScreen from '../screens/SignUpScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesome } from '@expo/vector-icons';

const InfoStack = createStackNavigator({
    Switch: {
        screen: Switch,
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
