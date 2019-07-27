import React, { Component } from 'react';
import { Platform, SafeAreaView, View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import MenuIcon from '../components/icons/Menu';
import BlindsIconAnimated from '../components/icons/BlindsAnimated';
import BlindsLeftIcon from '../components/icons/BlindsLeft';
import BlindsMiddleIcon from '../components/icons/BlindsMiddle';
import BlindsRightIcon from '../components/icons/BlindsRight';
import NextIcon from '../components/icons/Next';
import Slider from '../components/Slider';
import CustomizableCheckbox from '../components/CustomizableCheckbox';

class BlindsScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Stores',
		headerLeft: (
			<MenuIcon
				style={styles.menuBtn}
				color={Colors.primaryText}
				size={32}
				onPress={() => navigation.openDrawer()}
			/>
		)
	});

	constructor(props) {
		super(props);

		this.state = {
			sliderValue: 80,
			blindsLeftOrientationValue: true,
			blindsMiddleOrientationValue: false,
			blindsRightOrientationValue: false
		};
	}

	render() {
		return (
			<SafeAreaView style={styles.safearea}>
				<View style={styles.container}>
					<TouchableOpacity
						style={styles.blindsListButtonContainer}
						onPress={() => this.props.navigation.navigate('BlindsList')}
						activeOpacity={0.5}>
						<View style={styles.blindsListButton}>
							<View style={styles.blindsListButtonLeftPart}>
								<BlindsIconAnimated
									style={styles.blindsListButtonBlindsIcon}
									color={Colors.primaryBrand}
									size="128"
									opacityRow2={this.state.sliderValue > 16.66 ? 2 : 0}
									opacityRow3={this.state.sliderValue > 16.66 * 3 ? 1 : 0}
									opacityRow4={this.state.sliderValue > 16.66 * 4 ? 1 : 0}
									opacityRow5={this.state.sliderValue > 16.66 * 5 ? 1 : 0}
									opacityRow6={this.state.sliderValue > 16.66 * 6 ? 1 : 0}
								/>
							</View>
							<View style={styles.blindsListButtonRightPart}>
								<NextIcon
									style={styles.nextIcon}
									color={Colors.inverted}
									size={32}
								/>
							</View>
						</View>
					</TouchableOpacity>
					<View style={styles.blindsCommands}>
						<View style={styles.orientationContainer}>
							<CustomizableCheckbox
								value={this.state.blindsLeftOrientationValue}
								noLabel
								onChange={(checked) =>
									this.setState({ blindsLeftOrientationValue: checked })
								}
								checkedComponent={
									<BlindsLeftIcon
										backgroundColor={Colors.primaryBrand}
										iconColor={Colors.inverted}
										size={48}
									/>
								}
								uncheckedComponent={
									<BlindsLeftIcon
										backgroundColor={Colors.inverted}
										iconColor={Colors.primaryBrand}
										size={48}
									/>
								}
							/>
							<CustomizableCheckbox
								value={this.state.blindsMiddleOrientationValue}
								noLabel
								onChange={(checked) =>
									this.setState({ blindsMiddleOrientationValue: checked })
								}
								checkedComponent={
									<BlindsMiddleIcon
										backgroundColor={Colors.primaryBrand}
										iconColor={Colors.inverted}
										size={48}
									/>
								}
								uncheckedComponent={
									<BlindsMiddleIcon
										backgroundColor={Colors.inverted}
										iconColor={Colors.primaryBrand}
										size={48}
									/>
								}
							/>
							<CustomizableCheckbox
								value={this.state.blindsRightOrientationValue}
								noLabel
								onChange={(checked) =>
									this.setState({ blindsRightOrientationValue: checked })
								}
								checkedComponent={
									<BlindsRightIcon
										backgroundColor={Colors.primaryBrand}
										iconColor={Colors.inverted}
										size={48}
									/>
								}
								uncheckedComponent={
									<BlindsRightIcon
										backgroundColor={Colors.inverted}
										iconColor={Colors.primaryBrand}
										size={48}
									/>
								}
							/>
						</View>
						<View style={styles.blindsliderContainer}>
							<Slider
								value={this.state.sliderValue}
								onValueChange={(value) => this.setState({ sliderValue: value })}
								animateTransitions
								animationType="spring"
								minimumValue={0}
								maximumValue={100}
								step={1}
								trackSizeProp={25}
								thumbSizeProp={25}
								maximumTrackTintColor={Colors.inverted}
								blindsBackground
								orientation="vertical"
								showValueIndicator
								valueIndicatorPosition="left"
								valueIndicatorTextColor={Colors.tertiaryText}
								valueIndicatorStyle={styles.blindsliderValueIndicatorStyle}
								style={styles.blindslider}
								thumbTintColor={Colors.inverted}
								thumbStyle={styles.blindsliderthumbStyle}
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
	blindsListButtonContainer: {
		flex: 1
	},
	blindsListButton: {
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
	blindsListButtonLeftPart: {
		backgroundColor: Colors.inverted,
		width: 170,
		height: 180,
		borderBottomLeftRadius: 20,
		borderTopLeftRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 70
	},
	blindsListButtonBlindsIcon: {
		position: 'relative',
		top: -35,
		left: 3
	},
	blindsListButtonRightPart: {
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
	blindsliderContainer: {
		flex: 1,
		alignItems: 'center'
	},
	blindslider: {
		height: '100%',
		shadowColor: 'rgba(100, 100, 100, 0.1)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 4,
		shadowOpacity: 1
	},
	blindsliderthumbStyle: {
		shadowColor: 'rgba(100, 100, 100, 0.2)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 2,
		shadowOpacity: 1
	},
	blindsliderValueIndicatorStyle: {
		fontFamily: 'OpenSans',
		fontSize: 14,
		paddingBottom: 21
	}
});

export default BlindsScreen;
