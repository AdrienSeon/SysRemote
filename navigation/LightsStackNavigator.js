import React from 'react';
import { createStackNavigator } from 'react-navigation';
import LightsIcon from '../components/icons/Lights';
import LightsScreen from '../screens/LightsScreen';
import LightsListScreen from '../screens/LightsListScreen';
import Colors from '../constants/Colors';

const LightsStackNavigator = createStackNavigator(
	{
		Lights: {
			screen: LightsScreen
		},
		LightsList: {
			screen: LightsListScreen
		}
	},
	{
		initialRouteName: 'Lights',
		defaultNavigationOptions: {
			headerStyle: {
				height: 56
			},
			headerTransparent: true,
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

LightsStackNavigator.navigationOptions = {
	tabBarLabel: 'Luminaires',
	tabBarIcon: ({ focused }) => (
		<LightsIcon color={focused ? Colors.primaryBrand : Colors.secondaryBrand} size="32" />
	)
};

LightsStackNavigator.path = '';

export default LightsStackNavigator;
