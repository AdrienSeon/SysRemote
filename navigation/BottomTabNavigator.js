import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import TemperatureStackNavigator from './TemperatureStackNavigator';
import LightsStackNavigator from './LightsStackNavigator';
import BlindsStackNavigator from './BlindsStackNavigator';
import Colors from '../constants/Colors';

const BottomTabNavigator = createBottomTabNavigator({
	TemperatureStackNavigator,
	LightsStackNavigator,
	BlindsStackNavigator,
},{
	drawerLabel: () => null,
	resetOnBlur: true,
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

BottomTabNavigator.path = '';

export default BottomTabNavigator;
