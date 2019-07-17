import React from 'react';
import {Platform, View, Text, StyleSheet, StatusBar, TextInput, Button, TouchableOpacity, ImageBackground } from 'react-native';
import Colors from '../constants/Colors';
import AppConfig from '../constants/AppConfig';
import UserIcon from '../components/icons/User';
import LockIcon from '../components/icons/Lock';
import { LinearGradient } from 'expo-linear-gradient';
import KeyboardShift from '../components/KeyboardShift';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.appBackground,
		alignItems: "stretch",
	},
	backgroundImage: {
		flex: 1,
		backgroundColor:'transparent',
	},
	titleContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		marginLeft: 35,
		marginRight: 35,
	},
	appName: {
		fontFamily: "OpenSans",
		fontSize: 24,
		color: Colors.inverted50,
		marginBottom: 2,
	},
	buildingName: {
	  	fontFamily: "OpenSans",
		fontSize: 36,
		color: Colors.inverted,
	},
	loginContainer: {
		flex: 1,
		borderRadius: 15,
		backgroundColor: Colors.inverted,
		shadowColor: "rgba(100, 100, 100, 0.05)",
		shadowOffset: {
			width: 0,
			height: 7
		},
		shadowRadius: 20,
		shadowOpacity: 1,
		alignItems: "stretch",
		justifyContent: 'space-around',
		padding: 35,
		margin: 35,
	},
	welcomeMessage: {
		textAlign: 'center',
		fontFamily: "OpenSans",
		fontSize: 14,
		color: Colors.primaryBrand,
		marginBottom: 20,
	},
	emailInputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
		borderRadius: 5,
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: Colors.secondaryBrand,
	},
	emailInput: {
		flex: 18,
		fontFamily: "OpenSans",
		fontSize: 14,
		color: Colors.primaryText,
		paddingLeft: 15,
		height: 40,
	},
	emailInputIcon: {
		flex: 2,
		marginRight:10,
	},
	passwordInputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,

		borderRadius: 5,
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: Colors.secondaryBrand,
	},
	passwordInput: {
		flex: 18,
		fontFamily: "OpenSans",
		fontSize: 14,
		color: Colors.primaryText,
		paddingLeft: 15,
		height: 40,
	},
	passwordInputIcon: {
		flex: 2,
		marginRight:10,
	},
	loginBtnContainer: {
		borderRadius: 5,
		marginBottom: 20,
		alignItems: 'center',
	},
	loginBtn: {
		fontFamily: "OpenSans",
		fontSize: 14,
		fontWeight: "600",
		letterSpacing: -0.5,
		color: Colors.inverted,
		paddingTop: 10,
		paddingBottom: 10,
		height: 40,
	},
	noAccount: {
		textAlign: 'center',
		fontFamily: "OpenSans",
		fontSize: 11,
		marginBottom: 3,
		color: Colors.secondaryBrand,
	},
	contactBuildingManager: {
		textAlign: 'center',
		fontFamily: "OpenSans",
		fontSize: 11,
		color: Colors.secondaryText,
	},
});

class LoginScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
		};
	};

	static navigationOptions = {
		header: null,
	};

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

	handleEmailChange = (email: string) => {
		this.setState({ email: email});
	};

	handleEPasswordChange = (password: string) => {
		this.setState({ password: password});
	};

	handleLoginPress = () => {
		this.props.navigation.navigate('Temperature');
	};

	render() {
		return (
			<KeyboardShift>
				{() => (
					<ImageBackground style={styles.backgroundImage}source={require('../assets/images/building.png')}>
						<View style={styles.titleContainer}>
							<Text style={styles.appName}>{AppConfig.appName}</Text>
							<Text style={styles.buildingName}>{AppConfig.buildingName}</Text>
						</View>
						<View style={styles.loginContainer}>
							<Text style={styles.welcomeMessage}>Bienvenue ! Connectez-vous pour accéder à la gestion de votre espace.</Text>
							<View style={styles.emailInputContainer}>
								<TextInput
									style={styles.emailInput}
									onChangeText={this.handleEmailChange}
									ref={(input)=>this.emailInput = input }
									onEndEditing ={() => this.passwordInput.focus()}
									keyboardType='email-address'
									autoCorrect={false}
									textContentType='emailAddress'
									returnKeyType='next'
									placeholder='Email'
									clearButtonMode='while-editing'
								/>
								<UserIcon style={styles.emailInputIcon} color={Colors.secondaryBrand} size='15'/>
							</View>
							<View style={styles.passwordInputContainer}>
								<TextInput 
									style={styles.passwordInput}
									onChangeText={this.handlePasswordChange}
									ref={(input)=>this.passwordInput = input }
									placeholder='Mot de passe'
									autoCorrect={false}
									textContentType='password'
									returnKeyType='done'
									secureTextEntry={true}
									clearButtonMode='while-editing'
								/>
								<LockIcon style={styles.passwordInputIcon} color={Colors.secondaryBrand} size='15'/>
							</View>
							<TouchableOpacity underlayColor={Colors.appBackground} onPress={this.handleLoginPress}>
								<LinearGradient style={styles.loginBtnContainer} colors={[Colors.primaryBrandGradientDark, Colors.primaryBrandGradientLight]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0}} >
									<Text style={styles.loginBtn}>Se connecter</Text>
								</LinearGradient>
							</TouchableOpacity>
							<Text style={styles.noAccount}>Pas encore de compte ?</Text>
							<TouchableOpacity underlayColor={Colors.appBackground}>
								<Text style={styles.contactBuildingManager}>Contactez votre gestionnaire</Text>
							</TouchableOpacity>
						</View>
					</ImageBackground>
				)}
			</KeyboardShift>
		);
	}
}

export default LoginScreen;