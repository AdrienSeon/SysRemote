/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
	View,
	Text,
	Animated,
	PanResponder,
	StyleSheet,
	Easing
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
	value: number,
	disabled: boolean,
	min: number,
	max: number,
	onChange: (value: number) => void,
	onComplete: (value: number) => void,
	width: number,
	height: number,
	borderRadius: number,
	outerTrackColor: string,
	innerTrackColor: string,
	gradientColor: Array<string>,
	showValueIndicator: boolean,
	step?: number,
	valueIndicatorColor?: string,
	valueIndicatorWidth?: number,
	valueIndicatorPosition?: number,
	valueIndicatorTextColor?: string
};

type State = {
	value: number,
	sliderHeight: any,
	valueIndicatorHeight: any,
	panResponder: any
};

export default class VerticalSlider extends Component<Props, State> {
	_moveStartValue = null;

	constructor(props: Props) {
		super(props);

		let panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => false,
			onPanResponderGrant: () => {
				this._moveStartValue = this.state.value;
			},
			onPanResponderMove: (event, gestureState) => {
				if (this.props.disabled) {
					return;
				}
				const value = this._fetchNewValueFromGesture(gestureState);
				this._changeState(value);
				if (this.props.onChange) {
					this.props.onChange(value);
				}
			},
			onPanResponderRelease: (event, gestureState) => {
				if (this.props.disabled) {
					return;
				}
				const value = this._fetchNewValueFromGesture(gestureState);
				this._changeState(value);
				if (this.props.onComplete) {
					this.props.onComplete(value);
				}
			},
			onPanResponderTerminationRequest: () => false,
			onPanResponderTerminate: (event, gestureState) => {
				if (this.props.disabled) {
					return;
				}
				const value = this._fetchNewValueFromGesture(gestureState);
				this._changeState(value);
				if (this.props.onComplete) {
					this.props.onComplete(value);
				}
			}
		});

		this.state = {
			value: props.value,
			sliderHeight: new Animated.Value(0),
			valueIndicatorHeight: new Animated.Value(0),
			panResponder
		};
	}

	_fetchNewValueFromGesture(gestureState: any): number {
		const { min, max, step, height } = this.props;
		const ratio = -gestureState.dy / height;
		const diff = max - min;
		if (step) {
			return Math.max(
				min,
				Math.min(
					max,
					this._moveStartValue + Math.round((ratio * diff) / step) * step
				)
			);
		}
		let value = Math.max(min, this._moveStartValue + ratio * diff);
		return Math.floor(value * 100) / 100;
	}

	_getSliderHeight(value: number): number {
		const { min, max, height } = this.props;
		return ((value - min) * height) / (max - min);
	}

	_changeState(value: number): void {
		const { height, valueIndicatorWidth } = this.props;
		const sliderHeight = this._getSliderHeight(value);
		let ballPosition = sliderHeight;
		const valueIndicatorHeight = (valueIndicatorWidth ? valueIndicatorWidth : 48) / 2;
		if (ballPosition + valueIndicatorHeight > height) {
			ballPosition = height - valueIndicatorHeight * 2;
		} else if (ballPosition - valueIndicatorHeight <= 0) {
			ballPosition = 0;
		} else {
			ballPosition = ballPosition - valueIndicatorHeight;
		}
		Animated.parallel([
			Animated.timing(this.state.sliderHeight, {
				toValue: sliderHeight,
				easing: Easing.linear
			}),
			Animated.timing(this.state.valueIndicatorHeight, {
				toValue: ballPosition,
				easing: Easing.linear
			})
		]).start();
		this.setState({ value });
	}

	componentDidMount(): void {
		const { value } = this.props;
		if (value) {
			this._changeState(value);
		}
	}

	render() {
		const {
			value,
			disabled,
			min,
			max,
			onChange,
			onComplete,
			width,
			height,
			borderRadius,
			outerTrackColor,
			innerTrackColor,
			gradientColor,
			showValueIndicator,
			valueIndicatorColor,
			valueIndicatorWidth,
			valueIndicatorPosition,
			valueIndicatorTextColor
		} = this.props;
		return (
			<View style={[{ height, width, borderRadius }]}>
				<View
					style={[
						styles.container,
						{
							height,
							width,
							borderRadius,
							backgroundColor: outerTrackColor
								? outerTrackColor
								: "#ECECEC"
						}
					]}
					{...this.state.panResponder.panHandlers}
				>
					{this.props.gradientOuterTrack ? (
						<LinearGradient
							colors={
								gradientColor ? gradientColor : ["#000000"]
							}
							start={{ x: 1.0, y: 1.0 }}
							end={{ x: 0.0, y: 0.0 }}
							style={styles.linearGradient}
						/>
					) : null}
					<Animated.View
						style={[
							styles.slider,
							{
								height: this.state.sliderHeight,
								width,
								backgroundColor: innerTrackColor
									? innerTrackColor
									: "#ffffff"
							}
						]}
					>
						{this.props.gradientInnerTrack ? (
							<LinearGradient
								colors={
									gradientColor ? gradientColor : ["#000000"]
								}
								start={{ x: 1.0, y: 1.0 }}
								end={{ x: 0.0, y: 0.0 }}
								style={styles.linearGradient}
							/>
						) : null}
					</Animated.View>
				</View>
				{this.props.showValueIndicator ? (
					<Animated.View
						style={[
							styles.ball,
							{
								width: valueIndicatorWidth ? valueIndicatorWidth : 48,
								height: valueIndicatorWidth ? valueIndicatorWidth : 48,
								bottom: this.state.valueIndicatorHeight,
								left: valueIndicatorPosition ? valueIndicatorPosition : -40,
							}
						]}
					>
						<Text
							style={[
								styles.ballText,
								{
									color: valueIndicatorTextColor ? valueIndicatorTextColor : "#000000",
								}
							]}
						>
							{this.state.value}
						</Text>
					</Animated.View>
				) : null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	ball: {
		position: "absolute",
		alignItems: "center",
		justifyContent: "center"
	},
	ballText: {
		fontWeight: "900",
		fontFamily: "OpenSans",
		fontSize: 12,
	},
	container: {
		overflow: "hidden",
		shadowColor: "rgba(100, 100, 100, 0.1)",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 4,
		shadowOpacity: 1
	},
	slider: {
		position: "absolute",
		bottom: 0
	},
	linearGradient: {
		width: "100%",
		height: "100%"
	}
});
