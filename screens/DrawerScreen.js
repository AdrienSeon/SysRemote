import React from 'react';
import {Platform, SafeAreaView, View, Text, Button, StyleSheet, StatusBar, Image, TouchableNativeFeedback, TouchableOpacity, AsyncStorage } from 'react-native';
import { DrawerItems } from 'react-navigation';
import Colors from '../constants/Colors';
import AppConfig from '../constants/AppConfig';
import SettingsIcon from '../components/icons/Settings';
import LogoutIcon from '../components/icons/Logout';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	linearGradient: {
		flex: 1,
		justifyContent: 'space-between',
	},
	titleContainer: {
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
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 40,
		alignItems: 'stretch',
	},
	menuItem: {
		flexDirection: 'row',
		height: 45,
		alignItems: 'center',
	},
	menuItemLabel: {
		flex: 18,
		fontFamily: "OpenSans",
		fontSize: 14,
		lineHeight: 27,
		color: Colors.inverted,
		marginLeft: 10,
	},
	MenuItemIcon: {
		flex: 2,
		marginLeft: 40,
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

	LogoutAsync = async () => {
		await AsyncStorage.clear();
		this.props.navigation.navigate('Auth');
	};

	render() {

		let TouchablePlatformSpecific = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

		return (
			<SafeAreaView style={styles.container}>
				<LinearGradient colors={['rgba(149, 161, 183, 1)', 'rgba(172, 186, 211, 1)']} start={{ x: 1, y: 1 }} end={{ x: 0, y: 0}} style={styles.linearGradient}>
					<View style={styles.titleContainer}>
						<Image style={styles.logo}/>
						<Text style={styles.appName}>{AppConfig.appName}</Text>
						<Text style={styles.buildingName}>{AppConfig.buildingName}</Text>
					</View>
					<View style={styles.menu}>
						<TouchablePlatformSpecific onPress={() => this.props.navigation.navigate('Settings')}>
							<View style={styles.menuItem}>
								<SettingsIcon style={styles.MenuItemIcon} color={Colors.inverted} size='21'/>
								<Text style={styles.menuItemLabel}>Paramètres</Text>
							</View>
						</TouchablePlatformSpecific>
						<TouchablePlatformSpecific onPress={this.LogoutAsync}>
							<View style={styles.menuItem}>
								<SettingsIcon style={styles.MenuItemIcon} color={Colors.inverted} size='21'/>
								<Text style={styles.menuItemLabel}>Se déconnecter</Text>
							</View>
						</TouchablePlatformSpecific>
					</View>
				</LinearGradient>
			</SafeAreaView>
		);
	}
}

export default DrawerScreen;