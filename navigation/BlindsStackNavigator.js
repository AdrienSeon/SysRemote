import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import BlindsIcon from '../components/icons/Blinds';
import BlindsScreen from '../screens/BlindsScreen';
import BlindsListScreen from '../screens/BlindsListScreen';
import Colors from '../constants/Colors';

const BlindsStackNavigator = createStackNavigator(
	{
		Blinds: {
			screen: BlindsScreen
		},
		BlindsList: {
			screen: BlindsListScreen
		}
	},
	{
		initialRouteName: 'Blinds',
		defaultNavigationOptions: {
			headerStyle: {
				height: Platform.OS === 'ios' ? 44 : 56,
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

BlindsStackNavigator.navigationOptions = {
	tabBarLabel: 'Stores',
	tabBarIcon: ({ focused }) => (
		<BlindsIcon color={focused ? Colors.primaryBrand : Colors.secondaryBrand} size={32} />
	)
};

BlindsStackNavigator.path = '';

export default BlindsStackNavigator;
