import SplashScreen from '../screens/SplashScreen';
import MainNavigator from './MainNavigator';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

const SwitchNavigator = createSwitchNavigator({
    SplashScreen,
    MainNavigator
});

const AppContainer = createAppContainer(SwitchNavigator);
export default AppContainer;
