import React, {Component} from "react";
import {Platform, SafeAreaView, View, StyleSheet, Button, StatusBar, Text} from 'react-native';
import { DrawerActions } from 'react-navigation';
import Colors from '../constants/Colors';
import MenuIcon from '../components/icons/Menu';
import CircularSlider from '../components/CircularSlider';
import LinearScale from "linear-scale"
import Slider from '../components/Slider';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.appBackground,
		paddingTop:100,
		//alignItems: 'center',
		justifyContent: 'space-around',
	},
	menuBtn: {
		marginLeft: 16
	},
	valuesPanelContainer: {
		flex: 1,
		marginLeft: 50,
		marginRight: 50,
		borderRadius: 10,
		backgroundColor: Colors.inverted,
		shadowColor: "rgba(100, 100, 100, 0.05)",
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowRadius: 15,
		shadowOpacity: 1,
	},
	valuesPanelValueContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	valuesPanelValue: {
		fontFamily: "OpenSans",
		fontSize: 22,
		color: Colors.primaryText,
	},
	valuesPanelLabel: {
		fontFamily: "OpenSans",
		fontSize: 10,
		color: Colors.secondaryText,
	},
	valuesPanelFirstTopValue: {
		borderRightWidth: 1,
		borderRightColor: 'rgba(100, 100, 100, 0.05)',
	},
	valuesPanelFirstRow: {
		flex: 1,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(100, 100, 100, 0.05)',
	},
	thermostat: {
		flex: 3,
		alignSelf: 'center',
		justifyContent:'center'
	},
	verticalDash: {
		backgroundColor: Colors.tertiaryText,
		height: 226,
		width: 1,
		position: 'absolute',
		top: 30,
		left: 143,
		alignItems: 'center',
		justifyContent: 'center',
	},
	horizontalDash: {
		backgroundColor: Colors.tertiaryText,
		height: 1,
		width: 226,
		position: 'absolute',
		top: 143,
		left: 30,
		alignItems: 'center',
		justifyContent: 'center',
	},
	CircularSlider: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		top: 0,
		left: 0,
	},
	middleThermostat: {
		backgroundColor: Colors.inverted,
		shadowColor: "rgba(189, 199, 225, 0.5)",
		shadowOffset: {
			width: 0,
			height: 17
		},
		shadowRadius: 25,
		height: 210,
		width: 210,
		borderRadius: 100,
		shadowOpacity: 1,
		position: 'absolute',
		top: 38,
		left: 38,
		alignItems: 'center',
		justifyContent: 'center',
	},
	setpointValue: {
		fontFamily: "OpenSans",
		fontSize: 36,
		color: Colors.primaryText
	},
	speedSliderKnob: {
		shadowColor: "rgba(100, 100, 100, 0.2)",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 2,
		shadowOpacity: 1
	}
});

class TemperatureScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			setpoint: 20,
			minSetpoint: 15,
			maxSetpoint: 30,
			setpointInRadian: 70,
			startCoord: 70,
			maxCoord: 290,
			ThermostatsliderValue: 70,
			value:2,
		}

		this.handleThermostatSliderValueChange = this.handleThermostatSliderValueChange.bind(this);
		this.setpointInRadianToDegree = this.setpointInRadianToDegree.bind(this);
		this.setpointInDegreeToRadian = this.setpointInDegreeToRadian.bind(this);
	}

	static navigationOptions = ({ navigation }) => ({
		title: 'Température',
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

	handleThermostatSliderValueChange(value) {
		this.setState({setpointInRadian: value});
		this.setpointInRadianToDegree(value);
		this.setpointInDegreeToRadian(this.state.setpoint);
	}

	setpointInRadianToDegree(value) {
		let setpointInRadianToDegree = LinearScale([this.state.startCoord, this.state.maxCoord], [this.state.minSetpoint, this.state.maxSetpoint])
		let setpoint = setpointInRadianToDegree(value)
		setpoint = +setpoint.toFixed(1)
		this.setState({setpoint: setpoint})
	}

	setpointInDegreeToRadian(value) {
		let setpointInDegreeToRadian = LinearScale([this.state.minSetpoint, this.state.maxSetpoint], [this.state.startCoord, this.state.maxCoord])
		this.setState({setpointInRadian: setpointInDegreeToRadian(value)})
	}

	render() {

		return (
			<View style={styles.container}>
{/*				<View style={styles.valuesPanelContainer}>
					<View style={styles.valuesPanelFirstRow}>
						<View style={[styles.valuesPanelValueContainer, styles.valuesPanelFirstTopValue]}>
							<Text style={styles.valuesPanelValue}>27.2</Text>
							<Text style={styles.valuesPanelLabel}>Température extérieure</Text>
						</View>
						<View style={styles.valuesPanelValueContainer}>
							<Text style={styles.valuesPanelValue}>69%</Text>
							<Text style={styles.valuesPanelLabel}>Humidité extérieure</Text>
						</View>
					</View>
					<View style={styles.valuesPanelValueContainer}>
						<Text style={styles.valuesPanelValue}>23.1°C</Text>
						<Text style={styles.valuesPanelLabel}>Température ambiante</Text>
					</View>
				</View>
				<View style={styles.thermostat}>
					<View style={{position: 'relative'}}>
						<CircularSlider style={styles.circularSlider}
							value={this.state.ThermostatsliderValue}
							dialRadius={130}
							dialWidth={5}
							knobRadius={14}
							knobColor={Colors.inverted}
							startGradient='#5D87E7'
							endGradient='#FF7978'
							startCoord={this.state.startCoord}
							maxCoord={this.state.maxCoord}
							backgroundColor={Colors.appBackground}
							onValueChange={this.handleThermostatSliderValueChange}
						/>
						<View style={styles.verticalDash}></View>
						<View style={styles.horizontalDash}></View>
						<View style={styles.middleThermostat}>
							<Text style={styles.setpointValue}>{this.state.setpoint + "°C"}</Text>
						</View>
					</View>
				</View>*/}
				<View style={{flex:1, marginLeft:50, marginRight:50}}>
					<Slider
						value={this.state.value}
						onValueChange={value => this.setState({ value })}
						animateTransitions={true}
						animationType='timing'
						minimumTrackTintColor='yellow'
						maximumTrackTintColor='green'
						minimumValue={0}
						maximumValue={3}
						step={1}
						thumbStyle={{
							shadowColor: "rgba(100, 100, 100, 0.2)",
							shadowOffset: {
								width: 0,
								height: 2
							},
							shadowRadius: 2,
							shadowOpacity: 1,
							backgroundColor:'#ffffff'
						}}
					/>
					<Text>{this.state.value}</Text>
				</View>
			</View>
		);
	}
}

export default TemperatureScreen;