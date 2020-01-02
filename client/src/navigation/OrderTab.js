import OrderListScreen from '../screens/OrderListScreen';
import { StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

const eng2vie = {
    Waiting: 'Đang chờ',
    Received: 'Đã Tiếp nhận',
    Completed: 'Hoàn thành'
};

const OrderTab = createMaterialTopTabNavigator({
    Waiting: OrderListScreen,
    Received: OrderListScreen,
    Completed: OrderListScreen
}, {
    defaultNavigationOptions: ({ navigation }) => {
        return {
            tabBarLabel: eng2vie[navigation.state.routeName]
        };
    },
    tabBarOptions: {
        style: {
            marginTop: StatusBar.currentHeight
        }
    }
});

export default OrderTab;
