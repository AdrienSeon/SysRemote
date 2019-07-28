import React, { Component } from 'react';
import {
	Platform,
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableHighlight,
	TouchableOpacity,
	ImageBackground,
	AsyncStorage
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import AppConfig from '../constants/AppConfig';
import UserIcon from '../components/icons/User';
import LockIcon from '../components/icons/Lock';
import KeyboardShift from '../components/KeyboardShift';
import background from '../assets/images/building.png';

class LoginScreen extends Component {
	static navigationOptions = () => ({
		header: null
	});

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};
	}

	componentDidMount() {
		/*		this._navListener = this.props.navigation.addListener('didFocus', () => {
			StatusBar.setBarStyle('light-content');
			if(Platform.OS === "android"){
				StatusBar.setBackgroundColor('#6a51ae');
			}
		}); */
	}

	componentWillUnmount() {
		// this._navListener.remove();
	}

	handleEmailChange = (email: string) => {
		this.setState({ email });
	};

	handleEPasswordChange = (password: string) => {
		this.setState({ password });
	};

	handleLoginPress = () => {
		this.LoginAsync;
	};

	LoginAsync = async () => {
		await AsyncStorage.setItem('userToken', 'abc');
		this.props.navigation.navigate('Temperature');
	};

	render() {
		const TouchablePlatformSpecific =
			Platform.OS === 'ios' ? TouchableHighlight : TouchableHighlight;

		return (
			<KeyboardShift
				animDuringKeyboardDisplayIOS={false}
				keyboardShowDisplayDuration={200}
				keyboardHideDisplayDuration={200}
				keyboardDisplayTopSpacing={Platform.OS === 'ios' ? 110 : 120}>
				{() => (
					<ImageBackground style={styles.backgroundImage} source={background}>
						<View style={styles.titleContainer}>
							<Text style={styles.appName}>{AppConfig.appName}</Text>
							<Text style={styles.buildingName}>{AppConfig.buildingName}</Text>
						</View>
						<View style={styles.loginContainer}>
							<Text style={styles.welcomeMessage}>
								Bienvenue ! Connectez-vous pour accéder à la gestion de votre
								espace.
							</Text>
							<View style={styles.emailInputContainer}>
								<TextInput
									style={styles.emailInput}
									onChangeText={this.handleEmailChange}
									ref={(input) => (this.emailInput = input)}
									onSubmitEditing={() => this.passwordInput.focus()}
									blurOnSubmit={false}
									keyboardType="email-address"
									autoCorrect={false}
									textContentType="emailAddress"
									returnKeyType="next"
									placeholder="Email"
									clearButtonMode="while-editing"
								/>
								<UserIcon
									style={styles.emailInputIcon}
									color={Colors.secondaryBrand}
									size={15}
								/>
							</View>
							<View style={styles.passwordInputContainer}>
								<TextInput
									style={styles.passwordInput}
									onChangeText={this.handlePasswordChange}
									ref={(input) => (this.passwordInput = input)}
									placeholder="Mot de passe"
									autoCorrect={false}
									textContentType="password"
									returnKeyType="done"
									secureTextEntry
									clearButtonMode="while-editing"
								/>
								<LockIcon
									style={styles.passwordInputIcon}
									color={Colors.secondaryBrand}
									size={15}
								/>
							</View>
							<TouchablePlatformSpecific
								style={styles.loginBtnContainer}
								underlayColor={Colors.appBackground}
								onPress={this.LoginAsync}>
								<View>
									<LinearGradient
										style={styles.loginBtnGradient}
										colors={[
											Colors.primaryBrandGradientDark,
											Colors.primaryBrandGradientLight
										]}
										start={{ x: 0, y: 0 }}
										end={{ x: 1, y: 0 }}>
										<Text style={styles.loginBtn}>Se connecter</Text>
									</LinearGradient>
								</View>
							</TouchablePlatformSpecific>
							<Text style={styles.noAccount}>Pas encore de compte ?</Text>
							<TouchableOpacity activeOpacity={0.5}>
								<View>
									<Text style={styles.contactBuildingManager}>
										Contactez votre gestionnaire
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					</ImageBackground>
				)}
			</KeyboardShift>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.appBackground,
		alignItems: 'stretch'
	},
	backgroundImage: {
		flex: 1,
		backgroundColor: 'transparent'
	},
	titleContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		marginLeft: 35,
		marginRight: 35
	},
	appName: {
		fontFamily: 'OpenSans',
		fontSize: 24,
		color: Colors.inverted50,
		marginBottom: 2
	},
	buildingName: {
		fontFamily: 'OpenSans',
		fontSize: 36,
		color: Colors.inverted
	},
	loginContainer: {
		flex: 1,
		borderRadius: 15,
		backgroundColor: Colors.inverted,
		shadowColor: 'rgba(100, 100, 100, 0.05)',
		shadowOffset: {
			width: 0,
			height: 7
		},
		shadowRadius: 20,
		shadowOpacity: 1,
		alignItems: 'stretch',
		justifyContent: 'space-around',
		padding: 35,
		margin: 35
	},
	welcomeMessage: {
		textAlign: 'center',
		fontFamily: 'OpenSans',
		fontSize: 14,
		color: Colors.primaryBrand,
		marginBottom: 20
	},
	emailInputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
		borderRadius: 5,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: Colors.secondaryBrand
	},
	emailInput: {
		flex: 18,
		fontFamily: 'OpenSans',
		fontSize: 14,
		color: Colors.primaryText,
		paddingLeft: 15,
		height: 40
	},
	emailInputIcon: {
		flex: 2,
		marginRight: 10
	},
	passwordInputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,

		borderRadius: 5,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: Colors.secondaryBrand
	},
	passwordInput: {
		flex: 18,
		fontFamily: 'OpenSans',
		fontSize: 14,
		color: Colors.primaryText,
		paddingLeft: 15,
		height: 40
	},
	passwordInputIcon: {
		flex: 2,
		marginRight: 10
	},
	loginBtnContainer: {
		marginBottom: 20
	},
	loginBtnGradient: {
		borderRadius: 5,
		alignItems: 'center'
	},
	loginBtn: {
		fontFamily: 'OpenSans',
		fontSize: 14,
		fontWeight: '600',
		letterSpacing: -0.5,
		color: Colors.inverted,
		paddingTop: 10,
		paddingBottom: 10,
		height: 40
	},
	noAccount: {
		textAlign: 'center',
		fontFamily: 'OpenSans',
		fontSize: 11,
		marginBottom: 3,
		color: Colors.secondaryBrand
	},
	contactBuildingManager: {
		textAlign: 'center',
		fontFamily: 'OpenSans',
		fontSize: 11,
		color: Colors.secondaryText
	}
});

export default LoginScreen;
