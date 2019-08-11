import React, { Component } from 'react';
import { Platform, SafeAreaView, View, StyleSheet, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { Header } from 'react-navigation';
import Colors from '../constants/Colors';
import MenuIcon from '../components/icons/Menu';
import BlindsIconAnimated from '../components/icons/BlindsAnimated';
import BlindsLeftIcon from '../components/icons/BlindsLeft';
import BlindsMiddleIcon from '../components/icons/BlindsMiddle';
import BlindsRightIcon from '../components/icons/BlindsRight';
import NextIcon from '../components/icons/Next';
import Slider from '../components/Slider';
import BlindsOrientationButton from '../components/BlindsOrientationButton';

class BlindsScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Stores',
		headerLeft: (
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
		)
	});

	constructor(props) {
		super(props);

		this.state = {
			sliderValue: 80,
			orientationButtons: [
				{
					key: 'left',
					checked: true,
					icon: BlindsLeftIcon
				},
				{
					key: 'middle',
					checked: false,
					icon: BlindsMiddleIcon
				},
				{
					key: 'right',
					checked: false,
					icon: BlindsRightIcon
				}
			]
		};
	}

	handleOrientationPress = (item) => {
		const items = this.state.orientationButtons;

		items.forEach((button) => {
			button.checked = false;
		});

		const index = items.indexOf(item);
		items[index].checked = true;

		this.setState({ orientationButtons: items });
	};

	render() {
		return (
			<SafeAreaView style={styles.safearea}>
				<View style={styles.container}>
					<View style={styles.listButtonContainer}>
						<TouchableOpacity
							style={styles.listButtonTouchable}
							onPress={() => this.props.navigation.navigate('BlindsList')}
							activeOpacity={0.7}>
							<View style={styles.listButton}>
								<View style={styles.listButtonLeftPart}>
									<BlindsIconAnimated
										style={styles.listButtonBlindsIcon}
										color={Colors.primaryBrand}
										size={128}
										opacityRow2={this.state.sliderValue > 16.66 ? 2 : 0}
										opacityRow3={this.state.sliderValue > 16.66 * 3 ? 1 : 0}
										opacityRow4={this.state.sliderValue > 16.66 * 4 ? 1 : 0}
										opacityRow5={this.state.sliderValue > 16.66 * 5 ? 1 : 0}
										opacityRow6={this.state.sliderValue > 16.66 * 6 ? 1 : 0}
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
					</View>
					<View style={styles.blindsCommands}>
						<View style={styles.orientationContainer}>
							{this.state.orientationButtons.map((item) => {
								const Icon = item.icon;
								return (
									<BlindsOrientationButton
										key={item.key}
										onPressItem={this.handleOrientationPress}
										checked={item.checked}
										item={item}
										checkedComponent={
											<Icon
												backgroundColor={Colors.primaryBrand}
												iconColor={Colors.inverted}
												size={48}
											/>
										}
										uncheckedComponent={
											<Icon
												backgroundColor={Colors.inverted}
												iconColor={Colors.primaryBrand}
												size={48}
											/>
										}
									/>
								);
							})}
						</View>
						<View style={styles.sliderContainer}>
							<Slider
								value={this.state.sliderValue}
								onValueChange={(value) => this.setState({ sliderValue: value })}
								animateTransitions
								animationType="spring"
								minimumValue={0}
								maximumValue={100}
								step={1}
								trackSizeProp={35}
								thumbSizeProp={35}
								maximumTrackTintColor={Colors.inverted}
								blindsBackground
								orientation="vertical"
								showValueIndicator
								valueIndicatorPosition="left"
								valueIndicatorTextColor={Colors.tertiaryText}
								valueIndicatorStyle={styles.sliderValueIndicatorStyle}
								style={styles.slider}
								thumbTintColor={Colors.inverted}
								thumbStyle={styles.sliderthumbStyle}
							/>
						</View>
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
		marginTop: Platform.OS === 'ios' ? Header.HEIGHT - 20 : Header.HEIGHT + 24,
		paddingVertical: 20
	},
	menuBtn: {
		marginLeft: 16
	},
	listButtonContainer: {
		flex: 1,
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
	listButtonBlindsIcon: {
		position: 'relative',
		top: -35,
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
	blindsCommands: {
		flex: 1,
		flexDirection: 'row',
		marginLeft: 20,
		marginRight: 20
	},
	orientationContainer: {
		flex: 2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	sliderContainer: {
		flex: 1,
		alignItems: 'center'
	},
	slider: {
		height: '100%',
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
		top: -7
	}
});

export default BlindsScreen;
