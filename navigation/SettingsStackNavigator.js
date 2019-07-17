import React from 'react';
import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../screens/SettingsScreen';
import SettingsIcon from '../components/icons/Settings';
import Colors from '../constants/Colors';

const SettingsStackNavigator = createStackNavigator({
	Settings: SettingsScreen,
},{
	initialRouteName: 'Settings',
	defaultNavigationOptions: {
		headerStyle: {
			height: 56,
		},
		headerTransparent: true,
		headerTintColor: Colors.primaryText,
		headerTitleStyle: {
			fontFamily: "OpenSans-Semibold",
			fontSize: 18,
		},
		headerBackTitle: null,
		headerTruncatedBackTitle: null,
	}
});

SettingsStackNavigator.navigationOptions = {
	drawerLabel: 'Paramètres',
	drawerIcon: <SettingsIcon color={Colors.inverted} size='21'/>,
};

SettingsStackNavigator.path = '';

export default SettingsStackNavigator;
