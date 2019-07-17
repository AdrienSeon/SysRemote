import React from 'react'
import {TouchableHighlight} from 'react-native';
import Colors from '../../constants/Colors';
import Svg, { Path, Circle } from 'react-native-svg'

class Cloud extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableHighlight underlayColor={Colors.appBackground} {...this.props}>
				<Svg width={this.props.size} height={this.props.size} fill="none">
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M14.001 45.75c-7.733 0-21.733-16.901-3.25-27.25 1.485-5.5 5.164-9.384 13.502-7.5 14.515-19.651 35.7-4.95 34.508 9 16.507 0 18.007 25.5 1.25 25.5-9.258 0-30.246.319-46.01.25z"
						stroke={this.props.color}
						strokeWidth={2}
						strokeLinejoin="round"
					/>
					<Circle cx={28.768} cy={72.849} r={3.5} stroke={this.props.color} strokeWidth={2} />
					<Path d="M28.768 46.349v23" stroke={this.props.color} strokeWidth={2} />
					<Circle cx={42.768} cy={72.849} r={3.5} stroke={this.props.color} strokeWidth={2} />
					<Path d="M42.768 46.349v23" stroke={this.props.color} strokeWidth={2} />
					<Path
						d="M18.002 46.349V61.75a1 1 0 0 1-1 1H8.268"
						stroke={this.props.color}
						strokeWidth={2}
						strokeLinejoin="round"
					/>
					<Circle cx={4.768} cy={62.849} r={3.5} stroke={this.props.color} strokeWidth={2} />
					<Path
						d="M54.268 46.349V61.75a1 1 0 0 0 1 1h8.734"
						stroke={this.props.color}
						strokeWidth={2}
						strokeLinejoin="round"
					/>
					<Circle
						r={3.5}
						transform="matrix(-1 0 0 1 67.502 62.849)"
						stroke={this.props.color}
						strokeWidth={2}
					/>
				</Svg>
			</TouchableHighlight>
		);
	}
}

export default Cloud
