import React from 'react';
import ItemListScreen from '../screens/ItemListScreen';
import ItemScreen from '../screens/ItemScreen';
import CartScreen from '../screens/CartScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';

const HomeStack = createStackNavigator({
    ItemListScreen,
    ItemScreen,
    CartScreen
}, {
    navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
            <Ionicons
                name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
                size={35}
                color={tintColor}
            ></Ionicons>
        )
    }
});

export default HomeStack;
