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
        activeTintColor: 'rgb(183, 21, 64)',
        inactiveTintColor: 'rgb(96, 96, 96)',
        showLabel: false,
        showIcon: true
    }
});

export default MainNavigator;
