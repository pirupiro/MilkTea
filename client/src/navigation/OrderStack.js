import React from 'react';
import OrderTab from './OrderTab';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesome5 } from '@expo/vector-icons';

const OrderStack = createStackNavigator({
    OrderTab: {
        screen: OrderTab,
        navigationOptions: {
            headerShown: false
        }
    },
    OrderDetailScreen: {
        screen: OrderDetailScreen,
        navigationOptions: {
            headerTitle: 'Chi tiết đơn hàng'
        }
    }
}, {
    navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
            <FontAwesome5
                name='receipt'
                size={30}
                color={tintColor}
            ></FontAwesome5>
        )
    }
});

export default OrderStack;
