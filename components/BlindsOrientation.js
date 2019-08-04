import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import BlindsOrientationButton from './BlindsOrientationButton';
import Colors from '../constants/Colors';

class BlindsOrientation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			buttons: [
				{
					key: 'left',
					checked: false,
					icon: 'BlindsLeftIcon'
				},
				{
					key: 'middle',
					checked: false,
					icon: 'BlindsMiddleIcon'
				},
				{
					key: 'right',
					checked: false,
					icon: 'BlindsRightIcon'
				}
			]
		};
	}

	handlePress = (item) => {
		const items = this.state.buttons;

		items.forEach((button) => {
			button.checked = false;
		});

		const index = items.indexOf(item);
		items[index].checked = true;

		this.setState({ buttons: items });
	};

	render() {
		const { checked } = this.state;
		const {
			containerStyle,
			checkedComponent,
			uncheckedComponent,
			checkboxStyle,
			labelStyle,
			numberOfLabelLines,
			label,
			noFeedback,
			customLabel,
			disabled,
			direction,
			...other
		} = this.props;
/*
			<View>
				{options.map(item => {
					return (
						<BlindsOrientationButton
							key={item.key}
							onPressItem={this.handlePress}
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
*/
		return (
						<BlindsOrientationButton
							key={item.key}
							onPressItem={this.handlePress}
							checked={item.checked}
							item={item}
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
		);
	}
}

BlindsOrientation.propTypes = {
	checkedComponent: PropTypes.element.isRequired,
	uncheckedComponent: PropTypes.element.isRequired,
	checked: PropTypes.bool,
	checkboxStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	containerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	label: PropTypes.string,
	customLabel: PropTypes.element,
	labelBefore: PropTypes.bool,
	noLabel: PropTypes.bool,
	labelStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	numberOfLabelLines: PropTypes.number,
	onChange: PropTypes.func.isRequired,
	noFeedback: PropTypes.bool,
	disabled: PropTypes.bool
};

BlindsOrientation.defaultProps = {
	label: 'Label',
	customLabel: null,
	numberOfLabelLines: 1,
	labelBefore: false,
	noLabel: false,
	checked: false,
	noFeedback: false,
	disabled: false,
	checkboxStyle: {},
	containerStyle: {},
	labelStyle: {}
};

const styles = StyleSheet.create({});

export default BlindsOrientationButton;
