import React from 'react';
import OrderTab from './OrderTab';
import LogInStack from './LogInStack';
import { createSwitchNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';

const OrderSwitch = createSwitchNavigator({
    OrderTab,
    LogInStack
}, {
    navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
            <MaterialIcons
                name='receipt'
                size={30}
                color={tintColor}
            ></MaterialIcons>
        )
    }
});

export default OrderSwitch;
