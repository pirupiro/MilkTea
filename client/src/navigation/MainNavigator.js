import HomeStack from './HomeStack';
import OrderStack from './OrderStack';
import InfoStack from './InfoStack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const MainNavigator = createBottomTabNavigator({
    HomeStack,
    OrderStack,
    InfoStack
}, {
    tabBarOptions: {
        activeTintColor: 'rgb(181, 52, 113)',
        inactiveTintColor: 'gray',
        showLabel: false,
        showIcon: true
    }
});

export default MainNavigator;
