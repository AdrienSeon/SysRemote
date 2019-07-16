import React from 'react';
import { createStackNavigator } from 'react-navigation';
import BlindsIcon from '../components/icons/Blinds';
import BlindsScreen from '../screens/BlindsScreen';
import BlindsListScreen from '../screens/BlindsListScreen';
import Colors from '../constants/Colors';

const BlindsStackNavigator = createStackNavigator({
	Blinds: BlindsScreen,
	BlindsList: BlindsListScreen,
});

BlindsStackNavigator.navigationOptions = {
	tabBarLabel: 'Stores',
	tabBarIcon: ({ focused }) => (
		<BlindsIcon color={focused ? Colors.primaryBrand : Colors.secondaryBrand} size='32' />
	),
};

BlindsStackNavigator.path = '';

export default BlindsStackNavigator;
