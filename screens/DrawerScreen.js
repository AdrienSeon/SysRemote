import React from 'react';
import {Platform, SafeAreaView, View, Text, Button, StyleSheet, StatusBar, Image} from 'react-native';
import { DrawerItems } from 'react-navigation';
import Colors from '../constants/Colors';
import AppConfig from '../constants/AppConfig';
import MenuIcon from '../components/icons/Menu';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	linearGradient: {
		flex: 1,
	},
	title: {
		flex: 1,
		marginTop: 80,
		alignItems: 'center',
	},
	logo: {
		width: 80,
		height: 80,
		borderRadius: 10,
		backgroundColor: Colors.inverted50,
		shadowColor: "rgba(0, 0, 0, 0.05)",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 4,
		shadowOpacity: 1,
	},
	appName: {
		fontFamily: "OpenSans",
		fontSize: 14,
		lineHeight: 27,
		color: Colors.inverted50
	},
	buildingName: {
		marginTop: 23,
		fontFamily: "OpenSans",
		fontSize: 24,
		lineHeight: 27,
		color: Colors.inverted
	},
	menu: {
		marginBottom: 40,
	},
});

class DrawerScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	static navigationOptions = {
		labelStyle : Colors.inverted,
		inactiveBackgroundColor: 'red',
	}

	componentDidMount() {
/*		this._navListener = this.props.navigation.addListener('didFocus', () => {
			StatusBar.setBarStyle('light-content');
			if(Platform.OS === "android"){
				StatusBar.setBackgroundColor('#6a51ae');
			}
		});*/
	}

	componentWillUnmount() {
		//this._navListener.remove();
	}
	
	render() {
		return (
			<SafeAreaView style={styles.container}>
				<LinearGradient colors={['rgba(149, 161, 183, 1)', 'rgba(172, 186, 211, 1)']} start={{ x: 1, y: 1 }} end={{ x: 0, y: 0}} style={styles.linearGradient}>
					<View style={styles.title}>
						<Image style={styles.logo}/>
						<Text style={styles.appName}>{AppConfig.appName}</Text>
						<Text style={styles.buildingName}>{AppConfig.buildingName}</Text>
					</View>
					<View style={styles.menu}>
						<DrawerItems {...this.props}/>
					</View>
				</LinearGradient>
			</SafeAreaView>
		);
	}
}

export default DrawerScreen;