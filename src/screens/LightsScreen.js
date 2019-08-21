import React, { Component } from 'react';
import {
	Platform,
	SafeAreaView,
	View,
	StyleSheet,
	TouchableOpacity,
	TouchableNativeFeedback
} from 'react-native';
import { Header } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import debounce from 'debounce';
import * as Animatable from 'react-native-animatable';
import Colors from '../constants/Colors';
import MenuIcon from '../components/icons/Menu';
import LightsTopIcon from '../components/icons/LightsTop';
import LightsBotIcon from '../components/icons/LightsBot';
import NextIcon from '../components/icons/Next';
import Switch from '../components/Switch';
import Slider from '../components/Slider';
import * as Actions from '../actions';
import store from '../store';

class LightsScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Luminaires',
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

	debouncedSetAllLightsSliderValue = debounce((value) => {
		this.props.actions.setAllLightsSliderValue(value);
	}, 200);

	debouncedSetAllLightsSwitchValue = debounce((value) => {
		this.props.actions.setAllLightsSwitchValue(value);
	}, 200);

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
		this.props.actions.getAllLights();
	}

	handleSliderValue = (value) => {
		this.props.actions.setAllLightsUIsliderValue(value);
		this.debouncedSetAllLightsSliderValue(value);
	};

	handleSwitchValue = (value) => {
		this.props.actions.setAllLightsUIswitchValue(value);
		this.debouncedSetAllLightsSwitchValue(value);
	};

	render() {
		return (
			<SafeAreaView style={styles.safearea}>
				<View style={styles.container}>
					<Animatable.View
						animation="fadeIn"
						delay={300}
						duration={300}
						easing="ease-out"
						useNativeDriver
						style={styles.listButtonContainer}>
						<TouchableOpacity
							style={styles.listButtonTouchable}
							onPress={() => this.props.navigation.navigate('LightsList')}
							activeOpacity={0.7}>
							<View style={styles.listButton}>
								<View style={styles.listButtonLeftPart}>
									<LightsTopIcon
										style={styles.topIcon}
										color={Colors.primaryBrand}
										size={128}
									/>
									<LightsBotIcon
										style={StyleSheet.flatten([
											styles.botIcon,
											{
												shadowColor: `rgba(255, 221, 136, ${this.props
													.allLights.UIsliderValue / 100})`
											}
										])}
										color={`rgba(255, 220, 133, ${this.props.allLights
											.UIsliderValue / 100})`}
										size={128}
									/>
								</View>
								<View style={styles.listButtonRightPart}>
									<NextIcon
										style={styles.nextIcon}
										color={Colors.inverted}
										size={32}
									/>
								</View>
							</View>
						</TouchableOpacity>
					</Animatable.View>
					<Animatable.View
						animation="fadeIn"
						delay={500}
						duration={300}
						easing="ease-out"
						useNativeDriver
						style={styles.switchContainer}>
						<Switch
							onChange={this.handleSwitchValue}
							value={this.props.allLights.UIswitchValue}
							trackOnColor={Colors.primaryBrand}
							trackOffColor={Colors.inverted}
							knobOnColor={Colors.inverted}
							knobOffColor={Colors.primaryBrand}
							knobSize={28}
							trackSize={32}
							trackStyle={styles.switchTrackStyle}
							knobStyle={styles.switchKnobStyle}
						/>
					</Animatable.View>
					<Animatable.View
						animation="fadeIn"
						delay={700}
						duration={300}
						easing="ease-out"
						useNativeDriver
						style={styles.sliderContainer}>
						<Slider
							value={this.props.allLights.UIsliderValue}
							onValueChange={this.handleSliderValue}
							animateTransitions
							animationType="spring"
							minimumValue={0}
							maximumValue={100}
							step={1}
							trackSizeProp={35}
							thumbSizeProp={35}
							minimumTrackTintColor="black"
							maximumTrackTintColor={Colors.inverted}
							gradientInnerTrack
							gradientColor={[Colors.inverted, Colors.tertiaryBrand]}
							showValueIndicator
							valueIndicatorPosition="top"
							valueIndicatorTextColor={Colors.tertiaryText}
							valueIndicatorStyle={styles.sliderValueIndicatorStyle}
							style={styles.slider}
							thumbTintColor={Colors.inverted}
							thumbStyle={styles.sliderthumbStyle}
						/>
					</Animatable.View>
				</View>
			</SafeAreaView>
		);
	}
}

function mapStateToProps({ lightsScreenReducer }) {
	const { allLights } = lightsScreenReducer;
	console.log(JSON.stringify(store.getState(), 0, 4));
	return {
		allLights
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
		paddingVertical: 20
	},
	menuBtn: {
		marginLeft: 16
	},
	listButtonContainer: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	listButtonTouchable: {
		width: 210,
		height: 180
	},
	listButton: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: 'rgba(100, 100, 100, 0.05)',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowRadius: 7,
		shadowOpacity: 1
	},
	listButtonLeftPart: {
		backgroundColor: Colors.inverted,
		width: 170,
		height: 180,
		borderBottomLeftRadius: 20,
		borderTopLeftRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 70
	},
	topIcon: {
		position: 'relative',
		top: 25,
		left: 3
	},
	botIcon: {
		shadowColor: 'rgba(255, 221, 136, 0.8)',
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowRadius: 10,
		shadowOpacity: 1,
		position: 'relative',
		top: -100,
		left: 3
	},
	listButtonRightPart: {
		backgroundColor: Colors.primaryBrand,
		width: 40,
		height: 180,
		borderBottomRightRadius: 20,
		borderTopRightRadius: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	switchContainer: {
		flex: 1,
		alignItems: 'center'
	},
	switchTrackStyle: {
		shadowColor: 'rgba(100, 100, 100, 0.1)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 4,
		shadowOpacity: 1,
		padding: 2
	},
	switchKnobStyle: {
		shadowColor: 'rgba(100, 100, 100, 0.2)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 2,
		shadowOpacity: 1
	},
	sliderContainer: {
		flex: 1,
		justifyContent: 'space-around',
		marginLeft: 50,
		marginRight: 50
	},
	slider: {
		shadowColor: 'rgba(100, 100, 100, 0.1)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 4,
		shadowOpacity: 1
	},
	sliderthumbStyle: {
		shadowColor: 'rgba(100, 100, 100, 0.2)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 2,
		shadowOpacity: 1
	},
	sliderValueIndicatorStyle: {
		fontFamily: 'OpenSans',
		fontSize: 14,
		left: -5
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LightsScreen);