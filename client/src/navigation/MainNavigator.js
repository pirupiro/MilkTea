import HomeStack from './HomeStack';
import OrderSwitch from './OrderSwitch';
import InfoSwitch from './InfoSwitch';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const MainNavigator = createBottomTabNavigator({
    HomeStack,
    OrderSwitch,
    InfoSwitch
}, {
    tabBarOptions: {
        activeTintColor: 'rgb(183, 21, 64)',
        inactiveTintColor: 'rgb(96, 96, 96)',
        inactiveBackgroundColor: 'rgb(224, 224, 224)',
        showLabel: false,
        showIcon: true
    }
});

export default MainNavigator;
