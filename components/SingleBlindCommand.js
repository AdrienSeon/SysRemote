import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import Colors from '../constants/Colors';
import BlindsIconAnimated from './icons/BlindsAnimated';
import BlindsLeftIcon from './icons/BlindsLeft';
import BlindsMiddleIcon from './icons/BlindsMiddle';
import BlindsRightIcon from './icons/BlindsRight';
import BlindsOrientationButton from './BlindsOrientationButton';
import Slider from './Slider';
import {isEqual} from 'lodash'

class SingleBlindCommand extends Component {
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
		console.log(this.props.orientationButtons)
		console.log(isEqual(this.props.orientationButtons, nextProps.orientationButtons))
		if (!isEqual(this.props.orientationButtons, nextProps.orientationButtons)) {
			return true;
		}
		return false;
	}

	handleSliderValue = (value) => {
		this.props.onChildSliderValueChange(this.props.item, value);
	};

	handleOrientationPress = (item) => {
		this.props.onChildOrientationPress(this.props.item);
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
								margin: this.props.collapsed ? 15 : 10
							}
						])}>
						<View style={styles.topPart}>
							<View style={{ flex: 1 }}>
								<BlindsIconAnimated
									style={styles.blindsIcon}
									color={Colors.inverted}
									size={40}
									opacityRow2={this.props.sliderValue > 16.66 ? 2 : 0}
									opacityRow3={this.props.sliderValue > 16.66 * 3 ? 1 : 0}
									opacityRow4={this.props.sliderValue > 16.66 * 4 ? 1 : 0}
									opacityRow5={this.props.sliderValue > 16.66 * 5 ? 1 : 0}
									opacityRow6={this.props.sliderValue > 16.66 * 6 ? 1 : 0}
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
								{this.props.switchValue ? 'Descendu' : 'Monté'}
							</Text>
							<View
								style={StyleSheet.flatten([
									styles.orientationContainer,
									{
										marginLeft: this.props.selected ? 0 : -3
									}
								])}>
								{this.props.orientationButtons.map((item) => {
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
													size={24}
												/>
											}
											uncheckedComponent={
												<Icon
													backgroundColor={Colors.inverted}
													iconColor={Colors.primaryBrand}
													size={24}
												/>
											}
										/>
									);
								})}
							</View>
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
								<BlindsIconAnimated
									style={styles.blindsIcon}
									color={Colors.primaryBrand}
									size={40}
									opacityRow2={this.props.sliderValue > 16.66 ? 2 : 0}
									opacityRow3={this.props.sliderValue > 16.66 * 3 ? 1 : 0}
									opacityRow4={this.props.sliderValue > 16.66 * 4 ? 1 : 0}
									opacityRow5={this.props.sliderValue > 16.66 * 5 ? 1 : 0}
									opacityRow6={this.props.sliderValue > 16.66 * 6 ? 1 : 0}
								/>
							</View>
							{!this.props.collapsed ? (
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
							) : null}
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
								{this.props.switchValue ? 'Descendu' : 'Monté'}
							</Text>
						</View>
						<View
							style={StyleSheet.flatten([
								styles.orientationContainer,
								{
									marginLeft: this.props.selected ? 0 : -3
								}
							])}>
							{this.props.orientationButtons.map((item) => {
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
												size={24}
											/>
										}
										uncheckedComponent={
											<Icon
												backgroundColor={Colors.inverted}
												iconColor={Colors.primaryBrand}
												size={24}
											/>
										}
									/>
								);
							})}
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

SingleBlindCommand.propTypes = {
	selected: PropTypes.bool,
	name: PropTypes.string,
	onPressItem: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.inverted,
		borderRadius: 20
		/* shadowColor: 'rgba(100, 100, 100, 0.1)',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowRadius: 15,
		shadowOpacity: 1 */
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
		flex: 3,
		flexDirection: 'row'
	},
	blindsIcon: {
		marginLeft: -1
	},
	text: {
		flex: 4,
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
	orientationContainer: {
		flex: 2,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-around'
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
		lineHeight: 40,
		textAlign: 'right'
	}
});

export default SingleBlindCommand;
