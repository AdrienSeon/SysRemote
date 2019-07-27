import { createAppContainer, createSwitchNavigator } from 'react-navigation';
//  import { Transition } from 'react-native-reanimated';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import DrawerNavigator from './DrawerNavigator';
import AuthStackNavigator from './AuthStackNavigator';

export default createAppContainer(
	createSwitchNavigator(
		{
			AuthLoading: AuthLoadingScreen,
			Drawer: DrawerNavigator,
			Auth: AuthStackNavigator
		},
		{
			initialRouteName: 'Auth'
			/*	transition: (
				<Transition.Together>
				  <Transition.Out type="slide-bottom" durationMs={400} interpolation="easeIn" />
				  <Transition.In type="fade" durationMs={500} />
				</Transition.Together>
			  ),	*/
		}
	)
);
