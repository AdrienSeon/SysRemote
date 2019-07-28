import React from 'react';
import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../screens/SettingsScreen';
import BacnetSettingsScreen from '../screens/BacnetSettingsScreen';
import SettingsIcon from '../components/icons/Settings';
import Colors from '../constants/Colors';

const SettingsStackNavigator = createStackNavigator(
	{
		Settings: {
			screen: SettingsScreen
		},
		BacnetSettings: {
			screen: BacnetSettingsScreen
		}
	},
	{
		initialRouteName: 'Settings',
		defaultNavigationOptions: {
			headerTintColor: Colors.primaryText,
			headerTitleStyle: {
				fontFamily: 'OpenSans-Semibold',
				fontSize: 18
			},
			headerBackTitle: null,
			headerTruncatedBackTitle: null
		}
	}
);

SettingsStackNavigator.navigationOptions = {
	drawerLabel: 'Paramètres',
	drawerIcon: <SettingsIcon color={Colors.inverted} size={21} />
};

SettingsStackNavigator.path = '';

export default SettingsStackNavigator;
