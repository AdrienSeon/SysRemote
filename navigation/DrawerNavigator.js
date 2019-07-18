import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import BottomTabNavigator from './BottomTabNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import DrawerScreen from '../screens/DrawerScreen';
import Colors from '../constants/Colors';

const DrawerNavigator = createDrawerNavigator(
{
	Temperature: {
		screen: BottomTabNavigator,
		navigationOptions: {
			drawerLabel: () => null
		}
	},
	Settings: {
		screen: SettingsStackNavigator,
	},
	Auth: {
		screen: AuthStackNavigator,
	}
},{
	contentComponent : DrawerScreen,
	contentOptions: {
		itemStyle: {
			marginLeft: 20,
		},
		labelStyle: {
			marginLeft: -5,
			fontFamily: "OpenSans",
			fontSize: 14,
			color: Colors.inverted,
			lineHeight: 21,
		}
	},
	overlayColor: 'rgba(0, 0, 0, 0.25)',
	initialRouteName: 'Temperature',
});

DrawerNavigator.path = '';

export default DrawerNavigator;
