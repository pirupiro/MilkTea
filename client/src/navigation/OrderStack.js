import React, { useContext } from 'react';
import OrderTab from './OrderTab';
import OrderScreen from '../screens/OrderScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialIcons } from '@expo/vector-icons';

const OrderStack = createStackNavigator({
    OrderTab: {
        screen: OrderTab,
        navigationOptions: {
            headerShown: false
        }
    },
    OrderScreen: {
        screen: OrderScreen,
        navigationOptions: {
            headerTransparent: true
        }
    }
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

export default OrderStack;
