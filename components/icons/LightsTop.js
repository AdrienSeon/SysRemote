import React from 'react'
import {TouchableHighlight} from 'react-native';
import Colors from '../../constants/Colors';
import Svg, { Path } from 'react-native-svg'

class LightsTop extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableHighlight underlayColor={Colors.appBackground} {...this.props}>
				<Svg width={this.props.size} height={this.props.size} viewBox="0 0 32 32" fill="none">
					<Path
						d="M14.5 4C14.5 3.44772 14.9477 3 15.5 3C16.0523 3 16.5 3.44772 16.5 4V11H14.5V4Z"
						fill={this.props.color}
						fillOpacity={0.5}
					/>
					<Path
						d="M27 21H4C4 21 4.52273 10 15.5 10C26.4773 10 27 21 27 21Z"
						fill={this.props.color}
					/>
				</Svg>
			</TouchableHighlight>
		);
	}
}

export default LightsTop
