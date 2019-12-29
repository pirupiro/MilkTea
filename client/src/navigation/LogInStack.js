import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { createStackNavigator } from 'react-navigation-stack';

const LogInStack = createStackNavigator({
    LogInScreen,
    SignUpScreen
});

export default LogInStack;
