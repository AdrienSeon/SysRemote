import React from 'react';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import LogoutIcon from '../components/icons/Logout';
import Colors from '../constants/Colors';

const LoginStackNavigator = createStackNavigator({
	Login: {
		screen: LoginScreen,
	}
},{
	initialRouteName: 'Login',
	defaultNavigationOptions: {
		headerTransparent: true,
		headerBackTitle: null,
		headerTruncatedBackTitle: null,
	}
});

LoginStackNavigator.navigationOptions = {
	drawerLabel: 'Se déconnecter',
	drawerIcon: <LogoutIcon color={Colors.inverted} size='21'/>,
};

LoginStackNavigator.path = '';

export default LoginStackNavigator;
