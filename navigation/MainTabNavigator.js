import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TemperatureIcon from '../components/icons/Temperature';
import LightsIcon from '../components/icons/Lights';
import BlindsIcon from '../components/icons/Blinds';
import Temperature from '../screens/TemperatureScreen';
import Lights from '../screens/LightsScreen';
import Blinds from '../screens/BlindsScreen';

import Colors from '../constants/Colors';

const TemperatureStack = createStackNavigator(
	{
		Temperature: Temperature,
	}
);

TemperatureStack.navigationOptions = {
	tabBarLabel: 'Temperature',
	tabBarIcon: ({ focused }) => (
		<TemperatureIcon color={focused ? Colors.primaryBrand : Colors.secondaryBrand} size='32' />
	),
};


TemperatureStack.path = '';

const LightsStack = createStackNavigator({
	Lights: Lights,
});

LightsStack.navigationOptions = {
	tabBarLabel: 'Luminaires',
	tabBarIcon: ({ focused }) => (
		<LightsIcon color={focused ? Colors.primaryBrand : Colors.secondaryBrand} size='32' />
	),
};

LightsStack.path = '';

const BlindsStack = createStackNavigator({
	Blinds: Blinds,
});

BlindsStack.navigationOptions = {
	tabBarLabel: 'Stores',
	tabBarIcon: ({ focused }) => (
		<BlindsIcon color={focused ? Colors.primaryBrand : Colors.secondaryBrand} size='32' />
	),
};

BlindsStack.path = '';

const tabNavigator = createBottomTabNavigator({
	TemperatureStack,
	LightsStack,
	BlindsStack,
},{
	tabBarOptions:{
		activeTintColor: Colors.primaryBrand,
		inactiveTintColor: Colors.secondaryBrand,
		labelStyle: {
			fontSize: 12,
			fontFamily: "OpenSans",
			fontWeight: "600",
			lineHeight: 27,
  			letterSpacing: -0.5
		},
		style: {
			height: 56,
			border:0,
			paddingTop: 10,
			borderTopColor: "transparent",
			backgroundColor: Colors.inverted,
			shadowColor: "rgba(100, 100, 100, 0.05)",
			shadowOffset: {
				width: 0,
				height: -3
			},
			shadowRadius: 10,
			shadowOpacity: 1
		},
	}
});

tabNavigator.path = '';

export default tabNavigator;
