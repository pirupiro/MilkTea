import React from 'react';
import InfoScreen from '../screens/InfoScreen';
import LogInStack from './LogInStack';
import { createSwitchNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

const InfoSwitch = createSwitchNavigator({
    InfoScreen,
    LogInStack
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

export default InfoSwitch;
