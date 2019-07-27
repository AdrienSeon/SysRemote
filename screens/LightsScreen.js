import React, { Component } from 'react';
import { Platform, SafeAreaView, View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import MenuIcon from '../components/icons/Menu';
import LightsTopIcon from '../components/icons/LightsTop';
import LightsBotIcon from '../components/icons/LightsBot';
import NextIcon from '../components/icons/Next';
import Switch from '../components/Switch';
import Slider from '../components/Slider';

class LightsScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Luminaires',
		headerLeft: (
			<MenuIcon
				style={styles.menuBtn}
				color={Colors.primaryText}
				size="32"
				onPress={() => navigation.openDrawer()}
			/>
		)
	});

	constructor(props) {
		super(props);

		this.state = {
			switchValue: true,
			sliderValue: 80
		};
	}

	handleSliderValue(value) {
		this.setState({ sliderValue: value });

		if (value > 0) {
			this.setState({ switchValue: true });
		} else {
			this.setState({ switchValue: false });
		}
	}

	handleSwitchValue(value) {
		this.setState({ switchValue: value });

		if (value) {
			this.setState({ sliderValue: 100 });
		} else {
			this.setState({ sliderValue: 0 });
		}
	}

	render() {
		return (
			<SafeAreaView style={styles.safearea}>
				<View style={styles.container}>
					<TouchableOpacity
						style={styles.lightsListButtonContainer}
						onPress={() => this.props.navigation.navigate('LightsList')}
						activeOpacity={0.5}>
						<View style={styles.lightsListButton}>
							<View style={styles.lightsListButtonLeftPart}>
								<LightsTopIcon
									style={styles.lightsTopIcon}
									color={Colors.primaryBrand}
									size="128"
								/>
								<LightsBotIcon
									style={StyleSheet.flatten([
										styles.lightsBopIcon,
										{
											shadowColor: `rgba(255, 221, 136, ${this.state
												.sliderValue / 100})`
										}
									])}
									color={`rgba(255, 220, 133, ${this.state.sliderValue / 100})`}
									size="128"
								/>
							</View>
							<View style={styles.lightsListButtonRightPart}>
								<NextIcon
									style={styles.nextIcon}
									color={Colors.inverted}
									size="32"
								/>
							</View>
						</View>
					</TouchableOpacity>
					<View style={styles.switchContainer}>
						<Switch
							onChange={(value) => this.handleSwitchValue(value)}
							value={this.state.switchValue}
							trackOnColor={Colors.primaryBrand}
							trackOffColor={Colors.inverted}
							knobOnColor={Colors.inverted}
							knobOffColor={Colors.primaryBrand}
							knobSize={28}
							trackSize={32}
							trackStyle={styles.switchTrackStyle}
							knobStyle={styles.switchKnobStyle}
						/>
					</View>
					<View style={styles.lightSliderContainer}>
						<Slider
							value={this.state.sliderValue}
							onValueChange={(value) => this.handleSliderValue(value)}
							animateTransitions
							animationType="spring"
							minimumValue={0}
							maximumValue={100}
							step={1}
							trackSizeProp={25}
							thumbSizeProp={25}
							maximumTrackTintColor={Colors.inverted}
							gradientInnerTrack
							gradientColor={[Colors.inverted, Colors.tertiaryBrand]}
							showValueIndicator
							valueIndicatorPosition="top"
							valueIndicatorTextColor={Colors.tertiaryText}
							valueIndicatorStyle={styles.lightSliderValueIndicatorStyle}
							style={styles.lightSlider}
							thumbTintColor={Colors.inverted}
							thumbStyle={styles.lightSliderthumbStyle}
						/>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	safearea: {
		flex: 1,
		backgroundColor: Colors.appBackground
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
		paddingBottom: 20
	},
	menuBtn: {
		marginLeft: 16
	},
	lightsListButtonContainer: {
		flex: 2
	},
	lightsListButton: {
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
	lightsListButtonLeftPart: {
		backgroundColor: Colors.inverted,
		width: 170,
		height: 180,
		borderBottomLeftRadius: 20,
		borderTopLeftRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 70
	},
	lightsTopIcon: {
		position: 'relative',
		top: 25,
		left: 3
	},
	lightsBopIcon: {
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
	lightsListButtonRightPart: {
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
	lightSliderContainer: {
		flex: 1,
		justifyContent: 'space-around',
		marginLeft: 50,
		marginRight: 50
	},
	lightSliderValueIndicatorStyle: {
		fontFamily: 'OpenSans',
		fontSize: 14,
		left: -10
	},
	lightSlider: {
		shadowColor: 'rgba(100, 100, 100, 0.1)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 4,
		shadowOpacity: 1
	},
	lightSliderthumbStyle: {
		shadowColor: 'rgba(100, 100, 100, 0.2)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 2,
		shadowOpacity: 1
	}
});

export default LightsScreen;
