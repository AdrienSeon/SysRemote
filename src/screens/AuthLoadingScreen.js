import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';

class AuthLoadingScreen extends React.Component {
	constructor(props) {
		super(props);
		this.loadAuthAsync();
	}

	loadAuthAsync = async () => {
		const userToken = await AsyncStorage.getItem('userToken');

		this.props.navigation.navigate(userToken ? 'Temperature' : 'Login');
	};

	render() {
		return (
			<View style={styles.container}>
				<ActivityIndicator />
				<StatusBar barStyle="default" />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.appBackground,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default AuthLoadingScreen;
