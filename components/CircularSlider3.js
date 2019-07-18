import React, {Component} from "react";
import {PanResponder, View, Dimensions} from "react-native";
import Svg, {
	Path,
	Circle,
	G,
	Text,
	Defs,
	LinearGradient,
	Stop
} from "react-native-svg";

export default class CircleSlider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			angle: this.props.value,
			xCenter: 0,
			yCenter: 0
		};
	}

	componentWillMount() {
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (event, gestureState) => true,
			onStartShouldSetPanResponderCapture: (event, gestureState) => true,
			onMoveShouldSetPanResponder: (event, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (event, gestureState) => true,
			onPanResponderMove: (event, gestureState) => {
				let xOrigin = this.state.xCenter - (this.props.dialRadius + this.props.knobRadius);
				let yOrigin = this.state.yCenter - (this.props.dialRadius + this.props.knobRadius);
				let a = this.cartesianToPolar(gestureState.moveX - xOrigin, gestureState.moveY - yOrigin);

				if (a < this.props.min) {
					this.setState({angle: this.props.min});
				} else if (a > this.props.max) {
					this.setState({angle: this.props.max});
				} else {
					this.setState({angle: a});
				}
			}
		});
	}

	polarToCartesian(angle) {
		let dialRadius = this.props.dialRadius;
		let hC = this.props.dialRadius + this.props.knobRadius;
		let a = ((angle - 90) * Math.PI) / 180.0;

		let x = hC + dialRadius * Math.cos(a);
		let y = hC + dialRadius * Math.sin(a);
		return {x, y};
	}

	cartesianToPolar(x, y) {
		let hC = this.props.dialRadius + this.props.knobRadius;

		if (x === 0) {
			return y > hC ? 0 : 180;
		} else if (y === 0) {
			return x > hC ? 90 : 270;
		} else {
			return (
				Math.round((Math.atan((y - hC) / (x - hC)) * 180) / Math.PI) +
				(x > hC ? 90 : 270)
			);
		}
	}

	handleMeasure = (ox, oy, width, height, px, py) => {
		this.setState({
			xCenter: px + (this.props.dialRadius + this.props.knobRadius),
			yCenter: py + (this.props.dialRadius + this.props.knobRadius)
		});
	}

	doStuff = () => {
		this.refs.circleslider.measure(this.handleMeasure);
	}

	render() {

		let width = (this.props.dialRadius + this.props.knobRadius) * 2;
		let knobRadius = this.props.knobRadius;
		let dialRadius = this.props.dialRadius;
		let startCoord = this.polarToCartesian(this.props.startCoord);
		let endCoord = this.polarToCartesian(this.state.angle);

		return (
			<View style={{flex: 1}}>
				<Svg onLayout={this.doStuff} ref="circleslider" width={width} height={width} >
					<Defs>
					  <LinearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
						  <Stop offset="0%" stopColor={this.props.startGradient}/>
						  <Stop offset="100%" stopColor={this.props.endGradient}/>
					  </LinearGradient>
					</Defs>
					<Circle
					  r={dialRadius}
					  cx={width / 2}
					  cy={width / 2}
					  stroke={this.props.backgroundColor}
					  strokeWidth={25}
					  fill="none"
					/>
					<Text
						x={width / 2}
						y={width / 2 + 50}
						fontSize={8}
						fill={this.props.textColor}
						textAnchor="middle">
						{`this.state.angle ${this.state.angle} this.state.angle>180 ${this.state.angle>180?1:0} endCoord.x ${endCoord.x.toFixed(0)} endCoord.y ${endCoord.y.toFixed(0)}`}
					</Text>
										<Text
						x={width / 2}
						y={width / 2 + 60}
						fontSize={8}
						fill={this.props.textColor}
						textAnchor="middle">
						{`rotate(10 ${(endCoord.x - knobRadius) / 2} ${(endCoord.y - knobRadius) / 2})`}
					</Text>
					<Text
						x={width / 2}
						y={width / 2}
						fontSize={this.props.textSize}
						fill={this.props.textColor}
						textAnchor="middle"
					>
						{this.props.showValue &&
						this.props.onValueChange(this.state.angle) + ""}
					</Text>
					<Path
						stroke={"url(#gradient1)"}
						strokeWidth={this.props.dialWidth}
						fill="none"
						strokeLinecap='round'
						strokeLinejoin='round'
						d={`M${startCoord.x} ${startCoord.y} A ${dialRadius} ${dialRadius} 1 ${this.state.angle>180?1:0} 1 ${endCoord.x} ${endCoord.y}`}
					/>
					<Circle
						x={endCoord.x - knobRadius}
						y={endCoord.y - knobRadius}
						r={knobRadius}
						cx={knobRadius}
						cy={knobRadius}
						fill={"yellow"}
						{...this._panResponder.panHandlers}
					/>



				</Svg>
			</View>
		);
	}
}

CircleSlider.defaultProps = {
	knobRadius: 13,
	dialRadius: 130,
	dialWidth: 25,
	textColor: "white",
	textSize: 50,
	value: 0,
	xCenter: Dimensions.get("window").width / 2,
	yCenter: Dimensions.get("window").height / 2,
	showValue: true,
	startGradient: '#12D8FA',
	endGradient: '#A6FFCB',
	backgroundColor: 'white',
	startCoord: 0,
	onValueChange: x => x
};
