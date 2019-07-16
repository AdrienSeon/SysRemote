import React from 'react';
import { createStackNavigator } from 'react-navigation';
import TemperatureIcon from '../components/icons/Temperature';
import SettingsScreen from '../screens/SettingsScreen';
import SettingsIcon from '../components/icons/Settings';
import Colors from '../constants/Colors';

const SettingsStackNavigator = createStackNavigator(
{
	Settings: SettingsScreen,
},{
	initialRouteName: 'Settings',
});

SettingsStackNavigator.navigationOptions = {
	drawerLabel: 'Paramètres',
	drawerIcon: <SettingsIcon color={Colors.inverted} size='20'/>,
};

SettingsStackNavigator.path = '';

export default SettingsStackNavigator;
