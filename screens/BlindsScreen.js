import React from 'react';
import {Platform, View, Text, Button, StyleSheet, StatusBar} from 'react-native';
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
		marginLeft: 16
	}
});

class BlindsScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	static navigationOptions = ({ navigation }) => ({
		title: 'Stores',
		headerStyle: {
			height: 56,
		},
		headerTransparent: true,
		headerTintColor: Colors.primaryText,
		headerTitleStyle: {
			fontWeight: '600',
		},
		headerLeft: <MenuIcon style={styles.menuBtn} color={Colors.primaryText} size='32' onPress={() => navigation.openDrawer()}/>,
		headerBackTitle: null,
		headerTruncatedBackTitle: null,
	});

	componentDidMount() {
		this._navListener = this.props.navigation.addListener('didFocus', () => {
			StatusBar.setBarStyle('light-content');
			if(Platform.OS === "android"){
				StatusBar.setBackgroundColor('#6a51ae');
			}
		});
	}

	componentWillUnmount() {
		this._navListener.remove();
	}

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