import React from 'react'
import {TouchableHighlight} from 'react-native';
import Colors from '../../constants/Colors';
import Svg, { Path } from 'react-native-svg'

class LightsBot extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableHighlight underlayColor={Colors.appBackground} {...this.props}>
				<Svg width={this.props.size} height={this.props.size} viewBox="0 0 32 32" fill="none">
					<Path
						d="M15.5 27C10 27 10 22 10 22H21C21 22 21 27 15.5 27Z"
						fill={this.props.color}
						fillOpacity={1}
					/>
				</Svg>
			</TouchableHighlight>
		);
	}
}

export default LightsBot
