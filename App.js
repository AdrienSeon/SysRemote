import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { useScreens } from 'react-native-screens';
import AppNavigator from './navigation/AppNavigator';

useScreens();

export default function App(props) {
	const [isLoadingComplete, setLoadingComplete] = useState(false);

	if (!isLoadingComplete && !props.skipLoadingScreen) {
		return (
			<AppLoading
				startAsync={loadResourcesAsync}
				onError={handleLoadingError}
				onFinish={() => handleFinishLoading(setLoadingComplete)}
			/>
		);
	}
	return (
		<View style={styles.container}>
			{Platform.OS === 'ios' && <StatusBar barStyle="default" />}
			<AppNavigator />
		</View>
	);
}

async function loadResourcesAsync() {
	await Promise.all([
		Asset.loadAsync([
			require('./assets/images/robot-dev.png'), // eslint-disable-line global-require
			require('./assets/images/robot-prod.png'), // eslint-disable-line global-require
			require('./assets/images/building.png') // eslint-disable-line global-require
		]),
		Font.loadAsync({
			OpenSans: require('./assets/fonts/OpenSans-Regular.ttf'), // eslint-disable-line global-require
			'OpenSans-Semibold': require('./assets/fonts/OpenSans-Semibold.ttf') // eslint-disable-line global-require
		})
	]);
}

function handleLoadingError(error: Error) {
	// In this case, you might want to report the error to your error reporting
	// service, for example Sentry
	console.warn(error); // eslint-disable-line no-console
}

function handleFinishLoading(setLoadingComplete) {
	setLoadingComplete(true);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
});
