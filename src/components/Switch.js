import React, { Component } from 'react';
import { Animated, Easing, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class Switch extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.value,
			animatedValue: new Animated.Value(this.props.value ? this.props.trackSize : 0)
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.value !== this.props.value) {
			this.setState({ value: this.props.value }, () => {
				Animated.timing(this.state.animatedValue, {
					toValue: this.state.value ? this.props.trackSize : 0,
					easing: Easing.elastic(0.7),
					duration: 100
				}).start();
			});
		}
	}

	handlePress() {
		this.setState(
			(prevState) => ({ value: !prevState.value }),
			() => this.props.onChange(this.state.value)
		);
	}

	render() {
		const {
			value,
			onChange,
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
				activeOpacity={0.7}
				style={StyleSheet.flatten([
					{
						backgroundColor: this.state.value ? trackOnColor : trackOffColor,
						width: trackSize * 2,
						height: trackSize,
						borderRadius: trackSize / 2
					},
					trackStyle
				])}
				onPress={() => this.handlePress()}>
				<Animated.View
					style={StyleSheet.flatten([
						{
							backgroundColor: this.state.value ? knobOnColor : knobOffColor,
							width: knobSize,
							height: knobSize,
							borderRadius: knobSize / 2,
							transform: [
								{
									translateX: this.state.animatedValue
								}
							]
						},
						knobStyle
					])}
				/>
			</TouchableOpacity>
		);
	}
}

Switch.propTypes = {
	value: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	trackOnColor: PropTypes.string,
	trackOffColor: PropTypes.string,
	knobOnColor: PropTypes.string,
	knobOffColor: PropTypes.string,
	knobSize: PropTypes.number,
	trackSize: PropTypes.number,
	knobStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	trackStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

Switch.defaultProps = {
	value: false,
	trackOnColor: 'limegreen',
	trackOffColor: 'gray',
	knobOnColor: 'white',
	knobOffColor: 'white',
	knobSize: 24,
	trackSize: 32,
	knobStyle: {},
	trackStyle: {}
};

export default Switch;
