import React from "react"
import PropTypes from "prop-types"
import {
	Animated,
	Easing,
	TouchableOpacity,
} from "react-native"

const knobOffset = 32

class Switch extends React.Component {
	static propTypes = {
		value: PropTypes.bool,
		onChange: PropTypes.func.isRequired,
	}

	static defaultProps = {
		value: false,
	}

	state = {
		value: this.props.value,
		animatedValue: new Animated.Value(this.props.value ? knobOffset : 0),
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
		return (
			<TouchableOpacity
				activeOpacity={0.5}
				style={{
					backgroundColor: this.state.value ? "limegreen" : "gray",
					width: 64,
					height: 32,
					borderRadius: 32,
					padding: 4,
				}}
				onPress={() => this.handlePress()}
			>
				<Animated.View style={{
					width: 24,
					height: 24,
					borderRadius: 32,
					transform: [{
						translateX: this.state.animatedValue,
					}]
				}} />
			</TouchableOpacity>
		)
	}
}

export default Switch