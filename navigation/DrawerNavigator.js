import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import BottomTabNavigator from './BottomTabNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';
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
		}
	}
});

DrawerNavigator.path = '';

export default DrawerNavigator;
