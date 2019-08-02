/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Animated, Easing, PanResponder, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';

const DEFAULT_ANIMATION_CONFIGS = {
	spring: {
		friction: 7,
		tension: 100
	},
	timing: {
		duration: 150,
		easing: Easing.inOut(Easing.ease),
		delay: 0
	}
};

const getBoundedValue = ({ value, maximumValue, minimumValue }) =>
	// eslint-disable-next-line no-nested-ternary
	value > maximumValue ? maximumValue : value < minimumValue ? minimumValue : value;

class Rect {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	containsPoint(x, y) {
		return x >= this.x && y >= this.y && x <= this.x + this.width && y <= this.y + this.height;
	}
}

class Slider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			containerSize: { width: 0, height: 0 },
			trackSize: { width: 0, height: 0 },
			thumbSize: { width: 0, height: 0 },
			allMeasured: false,
			value: new Animated.Value(getBoundedValue(props))
		};

		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder.bind(this),
			onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder.bind(this),
			onPanResponderGrant: this.handlePanResponderGrant.bind(this),
			onPanResponderMove: this.handlePanResponderMove.bind(this),
			onPanResponderRelease: this.handlePanResponderEnd.bind(this),
			onPanResponderTerminationRequest: this.handlePanResponderRequestEnd.bind(this),
			onPanResponderTerminate: this.handlePanResponderEnd.bind(this)
		});
	}

	componentDidUpdate(prevProps) {
		const newValue = getBoundedValue(this.props);

		if (prevProps.value !== newValue) {
			if (this.props.animateTransitions) {
				this.setCurrentValueAnimated(newValue);
			} else {
				this.setCurrentValue(newValue);
			}
		}
	}

	setCurrentValue(value) {
		this.state.value.setValue(value);
	}

	setCurrentValueAnimated(value) {
		const { animationType } = this.props;
		const animationConfig = Object.assign(
			{},
			DEFAULT_ANIMATION_CONFIGS[animationType],
			this.props.animationConfig,
			{
				toValue: value
			}
		);

		Animated[animationType](this.state.value, animationConfig).start();
	}

	getTouchOverflowStyle() {
		const { width, height } = this.getTouchOverflowSize();

		const touchOverflowStyle = {};
		if (width !== undefined && height !== undefined) {
			const verticalMargin = -height / 2;
			touchOverflowStyle.marginTop = verticalMargin;
			touchOverflowStyle.marginBottom = verticalMargin;

			const horizontalMargin = -width / 2;
			touchOverflowStyle.marginLeft = horizontalMargin;
			touchOverflowStyle.marginRight = horizontalMargin;
		}

		if (this.props.debugTouchArea === true) {
			touchOverflowStyle.backgroundColor = 'orange';
			touchOverflowStyle.opacity = 0.5;
		}

		return touchOverflowStyle;
	}

	getTouchOverflowSize() {
		const { thumbSize, allMeasured, containerSize } = this.state;
		const { thumbTouchSize } = this.props;

		const size = {};
		if (allMeasured === true) {
			size.width = Math.max(0, thumbTouchSize.width - thumbSize.width);
			size.height = Math.max(0, thumbTouchSize.height - containerSize.height);
		}

		return size;
	}

	getValue(gestureState) {
		const length = this.state.containerSize.width - this.state.thumbSize.width;
		const thumbLeft =
			this._previousLeft +
			(this.props.orientation === 'vertical' ? gestureState.dy : gestureState.dx);

		const ratio = thumbLeft / length;

		if (this.props.step) {
			return Math.max(
				this.props.minimumValue,
				Math.min(
					this.props.maximumValue,
					this.props.minimumValue +
						Math.round(
							(ratio * (this.props.maximumValue - this.props.minimumValue)) /
								this.props.step
						) *
							this.props.step
				)
			);
		}
		return Math.max(
			this.props.minimumValue,
			Math.min(
				this.props.maximumValue,
				ratio * (this.props.maximumValue - this.props.minimumValue) +
					this.props.minimumValue
			)
		);
	}

	getCurrentValue() {
		return this.state.value.__getValue();
	}

	getRatio(value) {
		return (
			(value - this.props.minimumValue) / (this.props.maximumValue - this.props.minimumValue)
		);
	}

	getThumbLeft(value) {
		const ratio = this.getRatio(value);
		return ratio * (this.state.containerSize.width - this.state.thumbSize.width);
	}

	getThumbTouchRect() {
		const { thumbSize, containerSize } = this.state;
		const { thumbTouchSize } = this.props;
		const touchOverflowSize = this.getTouchOverflowSize();

		if (this.props.orientation === 'vertical') {
			return new Rect(
				touchOverflowSize.height / 2 + (containerSize.height - thumbTouchSize.height) / 2,
				touchOverflowSize.width / 2 +
					this.getThumbLeft(this.getCurrentValue()) +
					(thumbSize.width - thumbTouchSize.width) / 2,
				thumbTouchSize.width,
				thumbTouchSize.height
			);
		}
		return new Rect(
			touchOverflowSize.width / 2 +
				this.getThumbLeft(this.getCurrentValue()) +
				(thumbSize.width - thumbTouchSize.width) / 2,
			touchOverflowSize.height / 2 + (containerSize.height - thumbTouchSize.height) / 2,
			thumbTouchSize.width,
			thumbTouchSize.height
		);
	}

	getMinimumTrackStyles(thumbStart) {
		const { thumbSize, trackSize } = this.state;
		const minimumTrackStyle = {
			position: 'absolute'
		};

		if (this.props.orientation === 'vertical') {
			minimumTrackStyle.height = Animated.add(thumbStart, thumbSize.height);
			minimumTrackStyle.marginLeft = -trackSize.width;
		} else {
			minimumTrackStyle.width = Animated.add(thumbStart, thumbSize.width);
			minimumTrackStyle.marginTop = -trackSize.height;
		}
		return minimumTrackStyle;
	}

	getThumbPositionStyles(thumbStart) {
		if (this.props.orientation === 'vertical') {
			return [
				{
					translateX: -(this.state.trackSize.height + this.state.thumbSize.height) / 2
				},
				{ translateY: thumbStart }
			];
		}
		return [
			{ translateX: thumbStart },
			{
				translateY: -(this.state.trackSize.height + this.state.thumbSize.height) / 2
			}
		];
	}

	measureContainer = (x) => {
		this.handleMeasure('containerSize', x);
	};

	measureTrack = (x) => {
		this.handleMeasure('trackSize', x);
	};

	measureThumb = (x) => {
		this.handleMeasure('thumbSize', x);
	};

	handleMeasure(name, x) {
		const { width: layoutWidth, height: layoutHeight } = x.nativeEvent.layout;
		const width = this.props.orientation === 'vertical' ? layoutHeight : layoutWidth;
		const height = this.props.orientation === 'vertical' ? layoutWidth : layoutHeight;
		const size = { width, height };
		const storeName = `_${name}`;
		const currentSize = this[storeName];
		if (currentSize && width === currentSize.width && height === currentSize.height) {
			return;
		}
		this[storeName] = size;

		if (this._containerSize && this._trackSize && this._thumbSize) {
			this.setState({
				containerSize: this._containerSize,
				trackSize: this._trackSize,
				thumbSize: this._thumbSize,
				allMeasured: true
			});
		}
	}

	handleStartShouldSetPanResponder(e /* gestureState: Object */) {
		// Should we become active when the user presses down on the thumb?
		return this.thumbHitTest(e);
	}

	thumbHitTest({ nativeEvent }) {
		const thumbTouchRect = this.getThumbTouchRect();
		return thumbTouchRect.containsPoint(nativeEvent.locationX, nativeEvent.locationY);
	}

	// eslint-disable-next-line class-methods-use-this
	handleMoveShouldSetPanResponder(/* e: Object, gestureState: Object */) {
		// Should we become active when the user moves a touch over the thumb?
		return false;
	}

	handlePanResponderGrant(/* e: Object, gestureState: Object */) {
		this._previousLeft = this.getThumbLeft(this.getCurrentValue());
		this.fireChangeEvent('onSlidingStart');
	}

	handlePanResponderMove(_, gestureState) {
		if (this.props.disabled) {
			return;
		}

		this.setCurrentValue(this.getValue(gestureState));
		this.fireChangeEvent('onValueChange');
	}

	// eslint-disable-next-line class-methods-use-this
	handlePanResponderRequestEnd() {
		// Should we allow another component to take over this pan?
		return false;
	}

	handlePanResponderEnd(_, gestureState) {
		if (this.props.disabled) {
			return;
		}

		this.setCurrentValue(this.getValue(gestureState));
		this.fireChangeEvent('onSlidingComplete');
	}

	fireChangeEvent(event) {
		if (this.props[event]) {
			this.props[event](this.getCurrentValue());
		}
	}

	renderDebugThumbTouchRect(thumbLeft) {
		const thumbTouchRect = this.getThumbTouchRect();
		const positionStyle = {
			left: thumbLeft,
			top: thumbTouchRect.y,
			width: thumbTouchRect.width,
			height: thumbTouchRect.height
		};
		return <Animated.View style={positionStyle} pointerEvents="none" />;
	}

	render() {
		const {
			minimumValue,
			maximumValue,
			minimumTrackTintColor,
			maximumTrackTintColor,
			thumbTintColor,
			containerStyle,
			style,
			trackStyle,
			thumbStyle,
			debugTouchArea,
			orientation,
			gradientColor,
			gradientlocation,
			gradientInnerTrack,
			gradientOuterTrack,
			fanSpeedBackground,
			blindsBackground,
			showValueIndicator,
			valueIndicatorWidth,
			valueIndicatorPosition,
			valueIndicatorStyle,
			valueIndicatorTextColor,
			thumbSizeProp,
			trackSizeProp,
			...other
		} = this.props;

		const { value, containerSize, thumbSize, allMeasured } = this.state;

		const mainStyles = containerStyle || styles;
		const thumbStart = value.interpolate({
			inputRange: [minimumValue, maximumValue],
			outputRange: [0, containerSize.width - thumbSize.width]
			// extrapolate: 'clamp',
		});

		const valueVisibleStyle = {};
		if (!allMeasured) {
			valueVisibleStyle.height = 0;
			valueVisibleStyle.width = 0;
		}

		const minimumTrackStyle = {
			...this.getMinimumTrackStyles(thumbStart),
			backgroundColor: minimumTrackTintColor,
			...valueVisibleStyle
		};

		const getValueIndicatorPosition = (valueIndicatorPosition) => {
			switch (valueIndicatorPosition) {
				case 'left':
					return {
						right: (thumbSizeProp / 3) * 2,
						textAlign: 'right'
					};
					break;
				case 'right':
					return {
						top: (thumbSizeProp / 3) * 2,
						textAlign: 'left'
					};
					break;
				case 'top':
					return {
						bottom: (thumbSizeProp / 3) * 2,
						textAlign: 'center'
					};
					break;
				case 'bottom':
					return {
						top: (thumbSizeProp / 3) * 2,
						textAlign: 'center'
					};
					break;
				default:
					return {
						bottom: (thumbSizeProp / 3) * 2,
						textAlign: 'center'
					};
			}
		};

		const thumbStyleTransform = (thumbStyle && thumbStyle.transform) || [];
		const touchOverflowStyle = this.getTouchOverflowStyle();

		return (
			<View
				{...other}
				style={StyleSheet.flatten([
					orientation === 'vertical'
						? mainStyles.containerVertical
						: mainStyles.containerHorizontal,
					style
				])}
				onLayout={this.measureContainer}>
				<View
					style={StyleSheet.flatten([
						{ borderRadius: trackSizeProp / 2 },
						orientation === 'vertical'
							? { flex: 1, width: trackSizeProp }
							: { height: trackSizeProp },
						gradientOuterTrack || fanSpeedBackground || blindsBackground
							? mainStyles.overflow
							: null,
						trackStyle,
						{ backgroundColor: maximumTrackTintColor }
					])}
					onLayout={this.measureTrack}>
					{gradientOuterTrack ? (
						<LinearGradient
							colors={gradientColor ? gradientColor : ['grey', 'black']}
							locations={gradientlocation ? gradientlocation : [0, 1]}
							start={{ x: 0.0, y: 0.0 }}
							end={{ x: 1.0, y: 1.0 }}
							style={styles.linearGradient}
						/>
					) : null}
					{fanSpeedBackground ? (
						<View
							style={StyleSheet.flatten([
								mainStyles.overflow,
								{ flex: 1, flexDirection: 'row' }
							])}>
							<View style={{ flex: 1, backgroundColor: Colors.primaryBrand33 }} />
							<View style={{ flex: 1, backgroundColor: Colors.primaryBrand66 }} />
							<View style={{ flex: 1, backgroundColor: Colors.primaryBrand }} />
						</View>
					) : null}
				</View>
				{this.getCurrentValue() ? (
					<Animated.View
						style={StyleSheet.flatten([
							{ borderRadius: trackSizeProp / 2 },
							orientation === 'vertical'
								? { flex: 1, width: trackSizeProp }
								: { height: trackSizeProp },
							gradientInnerTrack || fanSpeedBackground || blindsBackground
								? mainStyles.overflow
								: null,
							trackStyle,
							minimumTrackStyle
						])}>
						{gradientInnerTrack ? (
							<LinearGradient
								colors={gradientColor ? gradientColor : ['grey', 'black']}
								locations={gradientlocation ? gradientlocation : [0, 1]}
								start={{ x: 0.0, y: 0.0 }}
								end={{ x: 1.0, y: 1.0 }}
								style={styles.linearGradient}
							/>
						) : null}
						{blindsBackground ? (
							<View
								style={StyleSheet.flatten([
									mainStyles.overflow,
									{ flex: 1, flexDirection: 'column' }
								])}>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
								<View
									style={{
										flex: 2,
										backgroundColor: Colors.primaryBrand,
										minHeight: 8
									}}
								/>
								<View
									style={{
										flex: 1,
										backgroundColor: 'rgba(255,255,255,0)',
										minHeight: 4
									}}
								/>
							</View>
						) : null}
					</Animated.View>
				) : null}
				<Animated.View
					testID="sliderThumb"
					onLayout={this.measureThumb}
					style={StyleSheet.flatten([
						{
							backgroundColor: thumbTintColor,
							position: 'absolute',
							width: thumbSizeProp,
							height: thumbSizeProp,
							borderRadius: thumbSizeProp / 2
						},
						orientation === 'vertical'
							? { left: 20 + trackSizeProp / 2 }
							: { top: 20 + trackSizeProp / 2 },
						,
						thumbStyle,
						{
							transform: [
								...this.getThumbPositionStyles(thumbStart),
								...thumbStyleTransform
							],
							...valueVisibleStyle
						}
					])}>
					{showValueIndicator ? (
						<View
							style={StyleSheet.flatten([
								styles.valueIndicator,
								{
									width: valueIndicatorWidth ? valueIndicatorWidth : 48,
									height: valueIndicatorWidth ? valueIndicatorWidth : 48
								},
								getValueIndicatorPosition(valueIndicatorPosition),
								valueIndicatorStyle
							])}>
							<Text
								style={StyleSheet.flatten([
									{
										color: valueIndicatorTextColor
											? valueIndicatorTextColor
											: '#000000'
									}
								])}>
								{this.getCurrentValue()}
							</Text>
						</View>
					) : null}
				</Animated.View>
				<View
					style={StyleSheet.flatten([styles.touchArea, touchOverflowStyle])}
					{...this.panResponder.panHandlers}>
					{debugTouchArea === true && this.renderDebugThumbTouchRect(thumbStart)}
				</View>
			</View>
		);
	}
}

Slider.propTypes = {
	/**
	 * Initial value of the slider. The value should be between minimumValue
	 * and maximumValue, which default to 0 and 1 respectively.
	 * Default value is 0.
	 *
	 * *This is not a controlled component*, e.g. if you don't update
	 * the value, the component won't be reset to its inital value.
	 */
	value: PropTypes.number,

	/**
	 * If true the user won't be able to move the slider.
	 * Default value is false.
	 */
	disabled: PropTypes.bool,

	/**
	 * Initial minimum value of the slider. Default value is 0.
	 */
	minimumValue: PropTypes.number,

	/**
	 * Initial maximum value of the slider. Default value is 1.
	 */
	maximumValue: PropTypes.number,

	/**
	 * Step value of the slider. The value should be between 0 and
	 * (maximumValue - minimumValue). Default value is 0.
	 */
	step: PropTypes.number,

	/**
	 * The color used for the track to the left of the button. Overrides the
	 * default blue gradient image.
	 */
	minimumTrackTintColor: PropTypes.string,

	/**
	 * The color used for the track to the right of the button. Overrides the
	 * default blue gradient image.
	 */
	maximumTrackTintColor: PropTypes.string,

	/**
	 * The color used for the thumb.
	 */
	thumbTintColor: PropTypes.string,

	/**
	 * The size of the touch area that allows moving the thumb.
	 * The touch area has the same center has the visible thumb.
	 * This allows to have a visually small thumb while still allowing the user
	 * to move it easily.
	 * The default is {width: 40, height: 40}.
	 */
	thumbTouchSize: PropTypes.shape({
		width: PropTypes.number,
		height: PropTypes.number
	}),

	/**
	 * Callback continuously called while the user is dragging the slider.
	 */
	onValueChange: PropTypes.func,

	/**
	 * Callback called when the user starts changing the value (e.g. when
	 * the slider is pressed).
	 */
	onSlidingStart: PropTypes.func,

	/**
	 * Callback called when the user finishes changing the value (e.g. when
	 * the slider is released).
	 */
	onSlidingComplete: PropTypes.func,

	/**
	 * Set this to true to visually see the thumb touch rect in green.
	 */
	debugTouchArea: PropTypes.bool,

	/**
	 * Set to true to animate values with default 'timing' animation type
	 */
	animateTransitions: PropTypes.bool,

	/**
	 * Custom Animation type. 'spring' or 'timing'.
	 */
	animationType: PropTypes.oneOf(['spring', 'timing']),

	/**
	 * Choose the orientation. 'horizontal' or 'vertical'.
	 */
	orientation: PropTypes.oneOf(['horizontal', 'vertical']),

	/**
	 * Used to configure the animation parameters.  These are the same parameters in the Animated library.
	 */
	animationConfig: PropTypes.object,

	/**
	 * Use gradient instead of minimumTrackTintColor
	 */
	gradientInnerTrack: PropTypes.bool,

	/**
	 * Use gradient instead of maximumTrackTintColor
	 */
	gradientOuterTrack: PropTypes.bool,

	/**
	 * Gradient color used if gradientInnerTrack or gradientOuterTrack is true
	 */
	gradientColor: PropTypes.arrayOf(PropTypes.string),

	/**
	 * Position of radient color used if gradientInnerTrack or gradientOuterTrack is true
	 */
	gradientlocation: PropTypes.arrayOf(PropTypes.number),

	/**
	 * Show value indicator next to thumb
	 */
	showValueIndicator: PropTypes.bool,

	/**
	 * Value indicator width
	 */
	valueIndicatorWidth: PropTypes.number,

	/**
	 * Value indicator position
	 */

	valueIndicatorPosition: PropTypes.string,

	/**
	 * Value indicator text color
	 */
	valueIndicatorTextColor: PropTypes.string,

	/**
	 * special value for personnal purpose application
	 */
	fanSpeedBackground: PropTypes.bool,

	/**
	 * special value for personnal purpose application
	 */
	blindsBackground: PropTypes.bool,

	/**
	 * Width of the thumb
	 */
	thumbSizeProp: PropTypes.number,

	/**
	 * thickness of the tracksize
	 */
	trackSizeProp: PropTypes.number
};

Slider.defaultProps = {
	value: 0,
	minimumValue: 0,
	maximumValue: 1,
	step: 0,
	minimumTrackTintColor: 'transparent',
	maximumTrackTintColor: 'transparent',
	thumbTintColor: 'red',
	thumbTouchSize: { width: 50, height: 50 },
	debugTouchArea: false,
	animationType: 'timing',
	orientation: 'horizontal'
};

const styles = StyleSheet.create({
	containerHorizontal: {
		height: 40,
		justifyContent: 'center'
	},
	containerVertical: {
		width: 40,
		flexDirection: 'column',
		alignItems: 'center'
	},
	touchArea: {
		position: 'absolute',
		backgroundColor: 'transparent',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	debugThumbTouchArea: {
		position: 'absolute',
		backgroundColor: 'green',
		opacity: 0.5
	},
	linearGradient: {
		width: '100%',
		height: '100%'
	},
	overflow: {
		overflow: 'hidden'
	},
	valueIndicator: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default Slider;
