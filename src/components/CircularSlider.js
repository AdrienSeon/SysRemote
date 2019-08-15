import React, { Component } from 'react';
import { PanResponder, View, Dimensions } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import LinearScale from 'linear-scale';

class CircularSlider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			startCoord: 70,
			maxCoord: 290,
			angle: 70,
			knobRadius: this.props.knobRadius
		};

		this.polarToCartesian = this.polarToCartesian.bind(this);
		this.cartesianToPolar = this.cartesianToPolar.bind(this);
		this.handlePanResponderMove = this.handlePanResponderMove.bind(this);
	}

	componentWillMount() {
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onStartShouldSetPanResponderCapture: () => true,
			onMoveShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponderCapture: () => true,
			onPanResponderMove: this.handlePanResponderMove
			/*	onPanResponderGrant: (evt, gestureState) => {
				this.setState({knobRadius: this.state.knobRadius + 3});
			},
			onPanResponderRelease: (e, { vx, vy }) => {
				this.setState({knobRadius:  this.state.knobRadius - 3});
			},	*/
		});
	}

	componentDidMount() {
		this.setState({ angle: this.valueToAngle(this.props.value) });
	}

	handlePanResponderMove({ nativeEvent: { locationX, locationY } }) {
		const angle = this.cartesianToPolar(locationX, locationY);

		if (angle < this.state.startCoord) {
			this.setState({ angle: this.state.startCoord });
		} else if (angle > this.state.maxCoord) {
			this.setState({ angle: this.state.maxCoord });
		} else {
			this.setState({ angle });
		}
		this.props.onValueChange(this.angleToValue(this.state.angle));
	}

	valueToAngle = (value) => {
		const linearScale = LinearScale(
			[this.props.minValue, this.props.maxValue],
			[this.state.startCoord, this.state.maxCoord]
		);
		return linearScale(value);
	};

	angleToValue = (value) => {
		const linearScale = LinearScale(
			[this.state.startCoord, this.state.maxCoord],
			[this.props.minValue, this.props.maxValue]
		);
		let valueFormated = linearScale(value);
		valueFormated = +valueFormated.toFixed(1);
		return valueFormated;
	};

	polarToCartesian(angle) {
		const dialRadius = this.props.dialRadius;
		const hC = this.props.dialRadius + this.state.knobRadius;
		const a = ((angle - 270) * Math.PI) / 180.0;
		const x = hC + dialRadius * Math.cos(a);
		const y = hC + dialRadius * Math.sin(a);

		return { x, y };
	}

	cartesianToPolar(x, y) {
		const hC = this.props.dialRadius + this.state.knobRadius;

		if (x === 0) {
			return y > hC ? 0 : 180;
		} else if (y === 0) {
			return x > hC ? 90 : 270;
		} else {
			return Math.round(
				Math.atan((y - hC) / (x - hC)) / (Math.PI / 180) + (x > hC ? 270 : 90)
			);
		}
	}

	render() {
		const width = (this.props.dialRadius + this.state.knobRadius) * 2;
		const knobRadius = this.state.knobRadius;
		const dialRadius = this.props.dialRadius;
		const startCoord = this.polarToCartesian(this.state.startCoord);
		const maxCoord = this.polarToCartesian(this.state.maxCoord);
		const endCoord = this.polarToCartesian(this.valueToAngle(this.props.value));

		return (
			<View>
				<Svg
					onLayout={this.onLayout}
					ref="CircularSlider"
					width={width}
					height={width}
					viewBox={`0 0 ${width} ${width}`}>
					<Defs>
						<LinearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
							<Stop
								offset="0%"
								stopColor={this.props.startGradient}
								stopOpacity="1"
							/>
							<Stop
								offset="100%"
								stopColor={this.props.endGradient}
								stopOpacity="1"
							/>
						</LinearGradient>
						<LinearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
							<Stop
								offset="0%"
								stopColor={this.props.backgroundColor}
								stopOpacity="0"
							/>
							<Stop
								offset="70%"
								stopColor={this.props.backgroundColor}
								stopOpacity="1"
							/>
						</LinearGradient>
					</Defs>

					{/*					<Circle
					  r={dialRadius}
					  cx={width / 2}
					  cy={width / 2}
					  stroke={this.props.backgroundColor}
					  strokeWidth={25}
					  fill="none"
					/>
					<Path
						stroke={"url(#gradient1)"}
						strokeWidth={this.props.dialWidth}
						fill="none"
						strokeLinecap='round'
						strokeLinejoin='round'
						d={`M${startCoord.x} ${startCoord.y} A ${dialRadius} ${dialRadius} 0 ${this.state.angle>180+this.state.startCoord?1:0} 1 ${endCoord.x} ${endCoord.y}`}
					/>*/}
					<Circle
						r={dialRadius}
						cx={width / 2}
						cy={width / 2}
						stroke="url(#gradient1)"
						strokeWidth={this.props.dialWidth}
						fill="none"
					/>
					<Rect x="0" y="0" width={width} height={width} fill="url(#gradient2)" />
					<Circle
						x={endCoord.x - knobRadius}
						y={endCoord.y - knobRadius}
						r={knobRadius}
						cx={knobRadius}
						cy={knobRadius}
						stroke="#E2E8F2"
						strokeWidth={1}
						fill={this.props.knobColor}
						{...this.panResponder.panHandlers}
					/>
				</Svg>
			</View>
		);
	}
}

/*CircularSlider.defaultProps = {
	knobRadius: 13,
	dialRadius: 130,
	dialWidth: 25,
	value: 0,
	xCenter: Dimensions.get('window').width / 2,
	yCenter: Dimensions.get('window').height / 2,
	startGradient: '#12D8FA',
	endGradient: '#A6FFCB',
	backgroundColor: 'white',
	minValue: 0,
	maxValue: 100,
	onValueChange: (x) => x
};*/

export default CircularSlider;
