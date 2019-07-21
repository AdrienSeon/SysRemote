import React from 'react';
import {Platform, SafeAreaView, View, Text, Button, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import MenuIcon from '../components/icons/Menu';
import LightsTopIcon from '../components/icons/LightsTop';
import LightsBotIcon from '../components/icons/LightsBot';
import NextIcon from '../components/icons/Next';
import Switch from '../components/Switch';

class LightsScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			switchValue: false,
		}
	}

	static navigationOptions = ({ navigation }) => ({
		title: 'Luminaires',
		headerLeft: <MenuIcon style={styles.menuBtn} color={Colors.primaryText} size='32' onPress={() => navigation.openDrawer()}/>,
	});

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
//
	render() {
		return (
			<SafeAreaView style={styles.safearea}>
					<View style={styles.container}>
						<TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate('LightsList')}>
							<View style={{
								flex: 1,
								flexDirection: 'row',
								alignSelf: 'center',
								shadowColor: "rgba(100, 100, 100, 0.05)",
								shadowOffset: {
									width: 0,
									height: 5
								},
								shadowRadius: 7,
								shadowOpacity: 1,
							}} onPress={() => this.props.navigation.navigate('LightsList')}>
								<View style={{
									backgroundColor: Colors.inverted,
									width: 170,
									height:180,
									borderBottomLeftRadius: 20,
									borderTopLeftRadius: 20,
									alignItems: 'center',
								}}>
									<LightsTopIcon style={styles.lightsTopIcon} color={Colors.primaryBrand} size='128'/>
									<LightsBotIcon style={styles.lightsBopIcon} color={Colors.tertiaryBrand} size='128'/>
								</View>
								<View style={{
									backgroundColor: Colors.primaryBrand,
									width: 40,
									height: 180,
									borderBottomRightRadius: 20,
									borderTopRightRadius: 20,
									alignItems: 'center',
									justifyContent: 'center',
								}}>
									<NextIcon style={styles.nextIcon} color={Colors.inverted} size='32'/>
								</View>
							</View>
								<Switch
									style={{
										flex: 1,
									}}
						        	onChange = {value => this.setState({switchValue: value})}
									value = {this.state.switchValue}
								/>
								<Text>{this.state.switchValue}</Text>
						</TouchableOpacity>
					</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	safearea: {
		flex: 1,
		backgroundColor: Colors.appBackground,
	},
	container: {
		flex: 1,
		...Platform.select({
			ios: {
				paddingTop: 70 + 20
			},
			android: {
				paddingTop: 80 + 20
			}
		}),
		justifyContent: 'space-around',
		paddingBottom: 20
	},
	menuBtn: {
		marginLeft: 16
	},
	lightsTopIcon: {
		position: 'relative',
		top: 25,
		left: 3,
	},
	lightsBopIcon: {
		shadowColor: "rgba(255, 221, 136, 0.8)",
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowRadius: 10,
		shadowOpacity: 1,
		position: 'relative',
		top: -100,
		left: 3,
	},
});

export default LightsScreen;