import React from 'react'
import {TouchableHighlight} from 'react-native';
import Colors from '../../constants/Colors';
import Svg, { Path } from 'react-native-svg'

class Next extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableHighlight underlayColor={Colors.appBackground} {...this.props}>
				<Svg width={this.props.size} height={this.props.size} viewBox="0 0 32 32" fill="none">
					<Path
						d="M10 4L20.5634 15.3205L10 26.641"
						stroke={this.props.color}
						strokeWidth={3}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</Svg>
			</TouchableHighlight>
		);
	}
}

export default Next;
