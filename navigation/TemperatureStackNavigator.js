import React from 'react';
import { createStackNavigator } from 'react-navigation';
import TemperatureIcon from '../components/icons/Temperature';
import TemperatureScreen from '../screens/TemperatureScreen';
import Colors from '../constants/Colors';

const TemperatureStackNavigator = createStackNavigator({
	Temperature: TemperatureScreen,
},{
	initialRouteName: 'Temperature',
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

TemperatureStackNavigator.navigationOptions = {
	tabBarLabel: 'Temperature',
	tabBarIcon: ({ focused }) => (
		<TemperatureIcon color={focused ? Colors.primaryBrand : Colors.secondaryBrand} size='32' />
	)
};

TemperatureStackNavigator.path = '';

export default TemperatureStackNavigator;
