import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import Colors from '../constants/Colors';
import LightsTopIcon from './icons/LightsTop';
import LightsBotIcon from './icons/LightsBot';
import Switch from './Switch';
import Slider from './Slider';

class SingleLightCommand extends Component {
	shouldComponentUpdate(nextProps) {
		if (this.props.selected !== nextProps.selected) {
			return true;
		}
		if (this.props.collapsed !== nextProps.collapsed) {
			return true;
		}
		if (this.props.sliderValue !== nextProps.sliderValue) {
			return true;
		}
		if (this.props.switchValue !== nextProps.switchValue) {
			return true;
		}
		return false;
	}

	handleSliderValue = (value) => {
		this.props.onChildSliderValueChange(this.props.item, value);
	};

	handleSwitchValue = (value) => {
		this.props.onChildSwitchValueChange(this.props.item, value);
	};

	handlePress = () => {
		this.props.onPressItem(this.props.item);
	};

	render() {
		return this.props.selected ? (
			<TouchableOpacity
				activeOpacity={0.7}
				style={StyleSheet.flatten([
					styles.container,
					{
						width: this.props.collapsed ? 160 : 120,
						height: 165,
						margin: this.props.collapsed ? 10 : 5
					}
				])}
				onPress={this.handlePress}>
				<LinearGradient
					colors={[Colors.primaryBrandGradientLight, Colors.primaryBrandGradientDark]}
					style={styles.linearGradient}>
					<View
						style={StyleSheet.flatten([
							styles.innerContainer,
							{
								flexDirection: this.props.collapsed ? 'row' : 'column',
								margin: this.props.collapsed ? 15 : 10
							}
						])}>
						<View style={styles.topPart}>
							<View style={{ flex: 1 }}>
								<LightsTopIcon
									style={styles.topIcon}
									color={
										this.props.selected ? Colors.inverted : Colors.primaryBrand
									}
									size={48}
								/>
								<LightsBotIcon
									style={StyleSheet.flatten([
										styles.botIcon,
										{
											shadowColor: `rgba(255, 221, 136, ${this.props
												.sliderValue / 100})`
										}
									])}
									color={`rgba(255, 220, 133, ${this.props.sliderValue / 100})`}
									size={48}
								/>
							</View>
							<View style={{ flex: 1 }}>
								<Text
									style={StyleSheet.flatten([
										styles.bigValueDisplay,
										{
											color: this.props.selected
												? Colors.inverted
												: Colors.primaryText
										}
									])}>
									{this.props.sliderValue + '%'}
								</Text>
							</View>
						</View>
						<View style={styles.text}>
							<Text
								style={StyleSheet.flatten([
									styles.name,
									{
										color: this.props.selected
											? Colors.inverted
											: Colors.primaryText
									}
								])}>
								{this.props.name}
							</Text>
							<Text
								style={StyleSheet.flatten([
									styles.state,
									{
										color: this.props.selected
											? Colors.inverted50
											: Colors.secondaryText
									}
								])}>
								{this.props.switchValue ? 'Allumé' : 'Eteint'}
							</Text>
						</View>
					</View>
				</LinearGradient>
			</TouchableOpacity>
		) : (
			<TouchableOpacity
				activeOpacity={0.7}
				style={StyleSheet.flatten([
					styles.container,
					{
						width: this.props.collapsed ? 160 : 120,
						height: 165,
						margin: this.props.collapsed ? 10 : 5
					}
				])}
				onPress={this.handlePress}>
				<View
					style={StyleSheet.flatten([
						styles.innerContainer,
						{
							flexDirection: this.props.collapsed ? 'row' : 'column',
							margin: this.props.collapsed ? 15 : 10
						}
					])}>
					<View style={{ flex: this.props.collapsed ? 2 : 1 }}>
						<View style={styles.topPart}>
							<View>
								<LightsTopIcon
									style={styles.topIcon}
									color={
										this.props.selected ? Colors.inverted : Colors.primaryBrand
									}
									size={48}
								/>
								<LightsBotIcon
									style={StyleSheet.flatten([
										styles.botIcon,
										{
											shadowColor: `rgba(255, 221, 136, ${this.props
												.sliderValue / 100})`
										}
									])}
									color={`rgba(255, 220, 133, ${this.props.sliderValue / 100})`}
									size={48}
								/>
							</View>
							{this.props.collapsed ? (
								<View style={styles.switchContainer}>
									<Switch
										onChange={this.handleSwitchValue}
										value={this.props.switchValue}
										trackOnColor={
											this.props.selected
												? Colors.primaryBrandDark
												: Colors.primaryBrand50
										}
										trackOffColor={
											this.props.selected
												? Colors.primaryBrandDark
												: Colors.primaryBrand50
										}
										knobOnColor={
											this.props.selected
												? Colors.inverted
												: Colors.primaryBrand
										}
										knobOffColor={
											this.props.selected
												? Colors.inverted
												: Colors.primaryBrand
										}
										knobSize={14}
										trackSize={18}
										trackStyle={styles.switchTrackStyle}
										knobStyle={styles.switchKnobStyle}
									/>
								</View>
							) : (
								<View style={{ flex: 1 }}>
									<Text
										style={StyleSheet.flatten([
											styles.bigValueDisplay,
											{
												color: this.props.selected
													? Colors.inverted
													: Colors.primaryText
											}
										])}>
										{this.props.sliderValue + '%'}
									</Text>
								</View>
							)}
						</View>
						<View style={styles.text}>
							<Text
								style={StyleSheet.flatten([
									styles.name,
									{
										color: this.props.selected
											? Colors.inverted
											: Colors.primaryText
									}
								])}>
								{this.props.name}
							</Text>
							<Text
								style={StyleSheet.flatten([
									styles.state,
									{
										color: this.props.selected
											? Colors.inverted50
											: Colors.secondaryText
									}
								])}>
								{this.props.switchValue ? 'Allumé' : 'Eteint'}
							</Text>
						</View>
					</View>
					{this.props.collapsed ? (
						<View style={styles.sliderContainer}>
							<Slider
								value={this.props.sliderValue}
								onValueChange={this.handleSliderValue}
								animateTransitions
								animationType="spring"
								minimumValue={0}
								maximumValue={100}
								step={1}
								trackSizeProp={18}
								thumbSizeProp={18}
								orientation="vertical"
								maximumTrackTintColor={
									this.props.selected
										? Colors.primaryBrandDark
										: Colors.primaryBrand50
								}
								minimumTrackTintColor={
									this.props.selected ? Colors.inverted : Colors.primaryBrand
								}
								style={styles.slider}
								thumbStyle={styles.sliderthumbStyle}
							/>
						</View>
					) : null}
				</View>
			</TouchableOpacity>
		);
	}
}

SingleLightCommand.propTypes = {
	selected: PropTypes.bool,
	name: PropTypes.string,
	onPressItem: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.inverted,
		borderRadius: 20
		/*		shadowColor: 'rgba(100, 100, 100, 0.1)',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowRadius: 15,
		shadowOpacity: 1*/
	},
	linearGradient: {
		width: '100%',
		height: '100%',
		borderRadius: 20
	},
	innerContainer: {
		flex: 1
	},
	topPart: {
		flex: 1,
		flexDirection: 'row'
	},
	topIcon: {
		position: 'relative',
		left: -5
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
		top: -48,
		left: -5
	},
	switchContainer: {
		flex: 1,
		marginTop: 15,
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
	text: {
		flex: 2,
		justifyContent: 'center'
	},
	name: {
		fontFamily: 'OpenSans',
		fontSize: 15,
		lineHeight: 27
	},
	state: {
		fontFamily: 'OpenSans',
		fontSize: 12,
		lineHeight: 27
	},
	sliderContainer: {
		flex: 1,
		alignItems: 'flex-end'
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
		opacity: 0
	},
	bigValueDisplay: {
		fontFamily: 'OpenSans',
		fontSize: 20,
		lineHeight: 48,
		textAlign: 'right'
	}
});

export default SingleLightCommand;
