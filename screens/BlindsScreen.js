import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import MenuIcon from '../components/icons/Menu';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.appBackground,
		justifyContent: "center",
		alignItems: "center",
	},
	menuBtn: {
		marginLeft: 7.5
	}
});

class BlindsScreen extends React.Component {
	static navigationOptions = {
		title: 'Stores',
		headerStyle: {
			height: 56,
		},
		headerTransparent: true,
		headerTintColor: Colors.primaryText,
		headerTitleStyle: {
			fontWeight: '600',
		},
		headerLeft: <MenuIcon style={styles.menuBtn} color={Colors.primaryText} size='32'/>,
		headerBackTitle: null,
		headerTruncatedBackTitle: null,
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.baseText}>Stores</Text>
				<Button title='Liste des stores' onPress={() => this.props.navigation.navigate('BlindsList')}/>
			</View>
		);
	}
}

export default BlindsScreen;