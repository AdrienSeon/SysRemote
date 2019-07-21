import React, { Component } from 'react';
import { Animated, Easing, TouchableOpacity, StyleSheet } from "react-native"
import PropTypes from 'prop-types';
const knobOffset = 32

class Switch extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.value,
			animatedValue: new Animated.Value(this.props.value ? knobOffset : 0),
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.value !== this.props.value) {
			this.setState(
				{ value: this.props.value },
				() => {
					Animated.timing(
						this.state.animatedValue,
						{
							toValue: this.state.value ? knobOffset : 0,
							easing: Easing.elastic(0.7),
							duration: 100,
						}
					).start()
				}
			)
		}
	}

	handlePress() {
		this.setState(
			{ value: !this.state.value },
			() => this.props.onChange(this.state.value)
		)
	}

	render() {
		const {
			value,
			onChange,
			knobTintColor,
			trackOnColor,
			trackOffColor,
			knobOnColor,
			knobOffColor,
			trackStyle,
			knobStyle,
			knobSize,
			trackSize,
			...other
		} = this.props;

		return (
			<TouchableOpacity
				activeOpacity={0.5}
				style={StyleSheet.flatten([
					{
						backgroundColor: this.state.value ? trackOnColor : trackOffColor,
						width: trackSize * 2,
						height: trackSize,
						borderRadius: trackSize / 2,
					},
					trackStyle
				])}
				onPress={() => this.handlePress()}
			>
				<Animated.View
					style={StyleSheet.flatten([
						{
							backgroundColor: this.state.value ? knobOnColor : knobOffColor,
							width: knobSize,
							height: knobSize,
							borderRadius: knobSize / 2,
							transform: [{
								translateX: this.state.animatedValue,
							}],
						},
						knobStyle
					])}
				/>
			</TouchableOpacity>
		)
	}
}

Switch.proptypes = {
	value: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	knobTintColor: PropTypes.string,
	trackOnColor: PropTypes.string,
	trackOffColor: PropTypes.string,
	knobOnColor: PropTypes.string,
	knobOffColor: PropTypes.string,
	knobSize: PropTypes.number,
	trackSize: PropTypes.number
}

Switch.defaultProps = {
	value: false,
	knobTintColor: 'white',
	trackOnColor: 'limegreen',
	trackOffColor: 'gray',
	knobOnColor: 'white',
	knobOffColor: 'white',
	knobSize: 24,
	trackSize: 32
};

export default Switch