import React, { useContext } from 'react';
import OrderTab from './OrderTab';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialIcons } from '@expo/vector-icons';

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
            <MaterialIcons
                name='receipt'
                size={30}
                color={tintColor}
            ></MaterialIcons>
        )
    }
});

export default OrderStack;
