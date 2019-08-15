import React, { Component } from 'react';
import {
	Platform,
	SafeAreaView,
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableNativeFeedback,
	Button
} from 'react-native';
import { Header } from 'react-navigation';
import LinearScale from 'linear-scale';
import Colors from '../constants/Colors';
import MenuIcon from '../components/icons/Menu';
import WindIcon from '../components/icons/Wind';
import CircularSlider from '../components/CircularSlider';
import Slider from '../components/Slider';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import debounce from 'debounce';
import axios from 'axios';
import AppConfig from '../constants/AppConfig';
import store from '../store';

class TemperatureScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Température',
		headerLeft:
			Platform.OS === 'ios' ? (
				<TouchableOpacity activeOpacity={0.5} onPress={() => navigation.openDrawer()}>
					<MenuIcon style={styles.menuBtn} color={Colors.primaryText} size={32} />
				</TouchableOpacity>
			) : (
				<TouchableNativeFeedback
					background={TouchableNativeFeedback.Ripple(Colors.primaryTextRipple, true)}
					onPress={() => navigation.openDrawer()}>
					<MenuIcon style={styles.menuBtn} color={Colors.primaryText} size={32} />
				</TouchableNativeFeedback>
			)
	});

	componentDidMount() {
		this.getData();

		this.interval = setInterval(() => {
			this.getData();
		}, 30000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getData() {
		this.props.actions.getFanSpeed();
		this.props.actions.getFanSpeedAuto();
		this.props.actions.getOutdoorTemperature();
		this.props.actions.getSpaceHumidity();
		this.props.actions.getSpaceTemperature();
		this.props.actions.getSetpoint();
	}

	handleThermostatSliderValueChange = (value) => {
		this.props.actions.setUISetpointOffset(value);
		this.props.actions.setUISetpoint(this.props.UISetpoint.baseValue + value);
		this.debouncedSetSetpointOffset(value);
	};

	debouncedSetSetpointOffset = debounce((value) => {
		this.props.actions.setSetpointOffset(value);
	}, 200);

	handleFanSpeedSliderValue = debounce((value) => {
		this.props.actions.setFanSpeed(value);
	}, 200);

	handleFanSpeedAuto = () => {
		this.props.actions.setFanSpeedAuto();
	};

	axiosTest = () => {
		const host = AppConfig.device.host;
		const objectType = 'analogValue';
		const objectInstance = 34;
		const url =
			'http://' + host + '/api/rest/v1/protocols/bacnet/local/objects/read-property-multiple';
		const data = {
			encode: 'text',
			propertyReferences: [
				{
					type: objectType,
					instance: objectInstance,
					property: 'presentValue',
					arrayIndex: -1
				},
				{
					type: objectType,
					instance: objectInstance,
					property: 'units',
					arrayIndex: -1
				}
			]
		};
		const params = {
			auth: {
				username: AppConfig.device.username,
				password: AppConfig.device.password
			}
		};
		console.log(url);
		console.log(data);
		axios
			.post(url, data, params)
			.then((response) => {
				const value = parseFloat(response.data[0].value);
				const unit = response.data[1].value;
				console.log(value + unit);
			})
			.catch((error) => {
				console.log('error : ' + error);
			});
	};

	render() {
		const colorScale = LinearScale(
			[this.props.setpointOffsetRange.min, this.props.setpointOffsetRange.max],
			[222, 359]
		);

		return (
			<SafeAreaView style={styles.safearea}>
				<View style={styles.container}>
					<Button onPress={this.axiosTest} title="test" />
					<View style={styles.valuesPanelContainer}>
						<View style={styles.valuesPanelRow}>
							<View style={styles.valuesPanelValueContainer}>
								<Text style={styles.valuesPanelValue}>
									{this.props.outdoorTemperature.value +
										this.props.outdoorTemperature.unit}
								</Text>
								<Text style={styles.valuesPanelLabel}>Température extérieure</Text>
							</View>
							<View
								style={StyleSheet.flatten([
									styles.valuesPanelValueContainer,
									styles.valuesPanelLastValueOfRow
								])}>
								<Text style={styles.valuesPanelValue}>
									{this.props.spaceHumidity.value + this.props.spaceHumidity.unit}
								</Text>
								<Text style={styles.valuesPanelLabel}>Humidité extérieure</Text>
							</View>
						</View>
						<View
							style={StyleSheet.flatten([
								styles.valuesPanelRow,
								styles.valuesPanelLastRow
							])}>
							<View style={styles.valuesPanelValueContainer}>
								<Text style={styles.valuesPanelValue}>
									{this.props.spaceTemperature.value +
										this.props.spaceTemperature.unit}
								</Text>
								<Text style={styles.valuesPanelLabel}>Température ambiante</Text>
							</View>
						</View>
					</View>
					<View style={styles.thermostat}>
						<CircularSlider
							style={styles.circularSlider}
							value={this.props.UISetpointOffset.value}
							dialRadius={130}
							dialWidth={5}
							knobRadius={14}
							knobColor={Colors.inverted}
							startGradient="#5D87E7"
							endGradient="#FF7978"
							minValue={this.props.setpointOffsetRange.min}
							maxValue={this.props.setpointOffsetRange.max}
							backgroundColor={Colors.appBackground}
							onValueChange={this.handleThermostatSliderValueChange}
						/>
						<View style={styles.verticalDash} />
						<View style={styles.horizontalDash} />
						<View
							style={StyleSheet.flatten([
								styles.middleThermostat,
								{
									shadowColor: `hsla(${colorScale(
										this.props.UISetpointOffset.value
									)}, 40%, 91%, 0.8)`
								}
							])}>
							<Text style={styles.setpointValue}>
								{this.props.UISetpoint.effectiveValue.toString() +
									this.props.UISetpoint.unit}
							</Text>
							<Text style={styles.setpointLabel}>Consigne ambiante</Text>
						</View>
					</View>
					<View style={styles.fanSpeedContainer}>
						<WindIcon
							style={styles.windIconLeft}
							color={Colors.primaryBrand33}
							size={24}
						/>
						<View style={styles.fanSpeedSliderContainer}>
							<Slider
								value={
									this.props.fanSpeed.value === '--'
										? 0
										: this.props.fanSpeed.value
								}
								onValueChange={this.handleFanSpeedSliderValue}
								animateTransitions
								animationType="spring"
								minimumValue={1}
								maximumValue={4}
								step={1}
								trackSizeProp={10}
								thumbSizeProp={20}
								fanSpeedBackground
								thumbTintColor={Colors.inverted}
								thumbStyle={styles.fanSpeedSliderThumbStyle}
								style={styles.fanSpeedSliderTrackStyle}
							/>
						</View>
						<WindIcon
							style={styles.windIconRight}
							color={Colors.primaryBrand}
							size={32}
						/>
						<TouchableOpacity
							style={StyleSheet.flatten([
								styles.autoIconContainer,
								this.props.fanSpeedAuto.value
									? styles.autoIconActive
									: styles.autoIconInactive
							])}
							onPress={this.handleFanSpeedAuto}
							disabled={this.props.fanSpeedAuto.value ? true : false}>
							<Text
								style={StyleSheet.flatten([
									styles.autoIconText,
									this.props.fanSpeedAuto.value
										? styles.autoIconActive
										: styles.autoIconInactive
								])}>
								A
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

function mapStateToProps({ temperatureScreen }) {
	const {
		fanSpeed,
		fanSpeedAuto,
		outdoorTemperature,
		spaceHumidity,
		spaceTemperature,
		setpointOffset,
		setpointOffsetRange,
		effectiveSetpoint,
		UISetpointOffset,
		UISetpoint
	} = temperatureScreen;
	//console.log(JSON.stringify(store.getState(), 0, 4));
	return {
		fanSpeed,
		fanSpeedAuto,
		outdoorTemperature,
		spaceHumidity,
		spaceTemperature,
		setpointOffset,
		setpointOffsetRange,
		effectiveSetpoint,
		UISetpointOffset,
		UISetpoint
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}

const styles = StyleSheet.create({
	safearea: {
		flex: 1,
		backgroundColor: Colors.appBackground
	},
	container: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? Header.HEIGHT - 20 : Header.HEIGHT + 24,
		paddingTop: 20,
		paddingBottom: 40
	},
	menuBtn: {
		marginLeft: 16
	},
	valuesPanelContainer: {
		flex: 3,
		marginHorizontal: 40,
		borderRadius: 10,
		backgroundColor: Colors.inverted,
		shadowColor: 'rgba(100, 100, 100, 0.05)',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowRadius: 15,
		shadowOpacity: 1
	},
	valuesPanelRow: {
		flex: 1,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(100, 100, 100, 0.05)'
	},
	valuesPanelLastRow: {
		flex: 1,
		flexDirection: 'row',
		borderBottomWidth: 0
	},
	valuesPanelValueContainer: {
		flex: 1,
		padding: 5,
		borderRightWidth: 1,
		borderRightColor: 'rgba(100, 100, 100, 0.05)',
		alignItems: 'center'
	},
	valuesPanelLastValueOfRow: {
		borderRightWidth: 0
	},
	valuesPanelValue: {
		flex: 2,
		fontFamily: 'OpenSans',
		fontSize: 22,
		color: Colors.primaryText
	},
	valuesPanelLabel: {
		flex: 1,
		fontFamily: 'OpenSans',
		fontSize: 12,
		color: Colors.secondaryText
	},
	thermostat: {
		flex: 8,
		alignSelf: 'center',
		marginTop: 30
	},
	verticalDash: {
		backgroundColor: Colors.tertiaryText,
		height: 226,
		width: 1,
		position: 'absolute',
		top: 30,
		left: 143,
		alignItems: 'center',
		justifyContent: 'center'
	},
	horizontalDash: {
		backgroundColor: Colors.tertiaryText,
		height: 1,
		width: 226,
		position: 'absolute',
		top: 143,
		left: 30,
		alignItems: 'center',
		justifyContent: 'center'
	},
	CircularSlider: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		top: 0,
		left: 0,
		zIndex: 1
	},
	middleThermostat: {
		backgroundColor: Colors.inverted,
		shadowColor: 'rgba(189, 199, 225, 0.5)',
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
		justifyContent: 'center'
	},
	setpointValue: {
		fontFamily: 'OpenSans',
		fontSize: 36,
		color: Colors.primaryText
	},
	setpointLabel: {
		fontFamily: 'OpenSans',
		fontSize: 12,
		color: Colors.secondaryText
	},
	fanSpeedContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginHorizontal: 20
	},
	windIconLeft: {
		alignSelf: 'center',
		marginRight: 5
	},
	fanSpeedSliderContainer: {
		flex: 1,
		justifyContent: 'space-around'
	},
	fanSpeedSliderThumbStyle: {
		shadowColor: 'rgba(100, 100, 100, 0.2)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 2,
		shadowOpacity: 1
	},
	fanSpeedSliderTrackStyle: {
		shadowColor: 'rgba(100, 100, 100, 0.1)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 4,
		shadowOpacity: 1
	},
	windIconRight: {
		alignSelf: 'center',
		marginLeft: 5
	},
	autoIconContainer: {
		marginLeft: 20,
		shadowColor: 'rgba(108, 204, 53, 0.2)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 3,
		shadowOpacity: 1,
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: 'rgb(108, 204, 53)',
		width: 24,
		height: 24,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	},
	autoIconText: {
		fontFamily: 'OpenSans',
		fontSize: 14,
		textAlign: 'center'
	},
	autoIconActive: {
		backgroundColor: 'rgb(108, 204, 53)',
		color: Colors.inverted
	},
	autoIconInactive: {
		backgroundColor: Colors.inverted,
		color: 'rgb(108, 204, 53)'
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TemperatureScreen);
