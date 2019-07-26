import React, {Component} from "react";
import {PanResponder, View, Dimensions} from "react-native";
import Svg, {
	Path,
	Circle,
	G,
	Text,
	Defs,
	LinearGradient,
	Stop,
	Rect
} from "react-native-svg";

class CircularSlider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			angle: this.props.value,
			xCenter: 0,
			yCenter: 0,
			knobRadius: this.props.knobRadius,
		};

		this.polarToCartesian = this.polarToCartesian.bind(this)
		this.cartesianToPolar = this.cartesianToPolar.bind(this)
		this.onLayout = this.onLayout.bind(this)
		    this.handlePanResponderMove = this.handlePanResponderMove.bind(this)
	}

	componentWillMount() {
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (event, gestureState) => true,
			onStartShouldSetPanResponderCapture: (event, gestureState) => true,
			onMoveShouldSetPanResponder: (event, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (event, gestureState) => true,
			onPanResponderMove: this.handlePanResponderMove
/*			onPanResponderGrant: (evt, gestureState) => {
				this.setState({knobRadius: this.state.knobRadius + 3});
			},
			onPanResponderRelease: (e, { vx, vy }) => {
				this.setState({knobRadius:  this.state.knobRadius - 3});
			},*/
		});
	}

	handlePanResponderMove({nativeEvent:{locationX,locationY}}) {
		let angle = this.cartesianToPolar(locationX,locationY)

		if (angle < this.props.startCoord) {
			this.setState({angle: this.props.startCoord});
		} else if (angle > this.props.maxCoord) {
			this.setState({angle: this.props.maxCoord});
		} else {
			this.setState({angle});
		}

		this.props.onValueChange(this.state.angle)
	}

	polarToCartesian(angle) {
		let dialRadius = this.props.dialRadius;
		let hC = this.props.dialRadius + this.state.knobRadius;
		let a = ((angle - 270) * Math.PI) / 180.0;
		let x = hC + dialRadius * Math.cos(a);
		let y = hC + dialRadius * Math.sin(a);

		return {x, y};
	}
 
	cartesianToPolar(x, y) {
		let hC = this.props.dialRadius + this.state.knobRadius;

		if (x === 0) {
			return y > hC ? 0 : 180;
		} else if (y === 0) {
			return x > hC ? 90 : 270;
		} else {
			return (
        		Math.round((Math.atan((y-hC)/(x-hC)))/(Math.PI/180)+((x>hC) ? 270 : 90))
			);
		}
	}

	handleMeasure = (ox, oy, width, height, px, py) => {
		this.setState({
			xCenter: px + (this.props.dialRadius + this.state.knobRadius),
			yCenter: py + (this.props.dialRadius + this.state.knobRadius)
		});
	}

	onLayout = () => {
		this.refs.CircularSlider.measure(this.handleMeasure);
	}

	render() {
		let width = (this.props.dialRadius + this.state.knobRadius) * 2;
		let knobRadius = this.state.knobRadius;
		let dialRadius = this.props.dialRadius;
		let startCoord = this.polarToCartesian(this.props.startCoord);
		let maxCoord = this.polarToCartesian(this.props.maxCoord);
		let endCoord = this.polarToCartesian(this.props.value);

		return (
			<View>
				<Svg onLayout={this.onLayout} ref="CircularSlider" width={width} height={width} viewBox={`0 0 ${width} ${width}`}>
					<Defs>
					  <LinearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
						  <Stop offset="0%" stopColor={this.props.startGradient} stopOpacity="1"/>
						  <Stop offset="100%" stopColor={this.props.endGradient} stopOpacity="1"/>
					  </LinearGradient>
					  <LinearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
						  <Stop offset="0%" stopColor={this.props.backgroundColor} stopOpacity="0"/>
						  <Stop offset="70%" stopColor={this.props.backgroundColor} stopOpacity="1"/>
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
						d={`M${startCoord.x} ${startCoord.y} A ${dialRadius} ${dialRadius} 0 ${this.state.angle>180+this.props.startCoord?1:0} 1 ${endCoord.x} ${endCoord.y}`}
					/>*/}
					<Circle
					  r={dialRadius}
					  cx={width / 2}
					  cy={width / 2}
					  stroke={"url(#gradient1)"}
					  strokeWidth={this.props.dialWidth}
					  fill="none"
					/>
					<Rect
						x="0"
						y="0"
						width={width}
						height={width}
						fill={"url(#gradient2)"}
					/>
					<Circle
						x={endCoord.x - knobRadius}
						y={endCoord.y - knobRadius}
						r={knobRadius}
						cx={knobRadius}
						cy={knobRadius}
						stroke='#E2E8F2'
						strokeWidth={1}
						fill={this.props.knobColor}
						{...this._panResponder.panHandlers}
					/>
				</Svg>
			</View>
		);
	}
}

CircularSlider.defaultProps = {
	knobRadius: 13,
	dialRadius: 130,
	dialWidth: 25,
	value: 0,
	xCenter: Dimensions.get("window").width / 2,
	yCenter: Dimensions.get("window").height / 2,
	startGradient: '#12D8FA',
	endGradient: '#A6FFCB',
	backgroundColor: 'white',
	startCoord: 0,
	maxCoord: 360,
	onValueChange: x => x
};

export default CircularSlider;