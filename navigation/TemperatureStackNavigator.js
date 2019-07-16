import React from 'react';
import { createStackNavigator } from 'react-navigation';
import TemperatureIcon from '../components/icons/Temperature';
import TemperatureScreen from '../screens/TemperatureScreen';
import Colors from '../constants/Colors';

const TemperatureStackNavigator = createStackNavigator(
	{
		Temperature: TemperatureScreen,
	}
);

TemperatureStackNavigator.navigationOptions = {
	tabBarLabel: 'Temperature',
	tabBarIcon: ({ focused }) => (
		<TemperatureIcon color={focused ? Colors.primaryBrand : Colors.secondaryBrand} size='32' />
	),
};

TemperatureStackNavigator.path = '';

export default TemperatureStackNavigator;
