import React from 'react';
import OrderListScreen from '../screens/OrderListScreen';
import { StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

const OrderTab = createMaterialTopTabNavigator({
    Waiting: OrderListScreen,
    Received: OrderListScreen,
    Completed: OrderListScreen
}, {
    tabBarOptions: {
        style: {
            marginTop: StatusBar.currentHeight
        }
    }
});

export default OrderTab;
