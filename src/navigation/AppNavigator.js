import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import DrawerNavigator from './DrawerNavigator';
import AuthStackNavigator from './AuthStackNavigator';

export default createAppContainer(
	createAnimatedSwitchNavigator(
		{
			AuthLoading: AuthLoadingScreen,
			Auth: AuthStackNavigator,
			Drawer: DrawerNavigator
		},
		{
			initialRouteName: 'AuthLoading',
			transition: (
				<Transition.Together>
					<Transition.In type="fade" durationMs={350} interpolation="easeIn" />
					{// Android bug on Transition.Out
					Platform.OS === 'ios' ? (
						<Transition.Out type="fade" durationMs={350} interpolation="easeIn" />
					) : null}
				</Transition.Together>
			)
		}
	)
);
