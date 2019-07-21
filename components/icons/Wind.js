import React from 'react'
import {TouchableHighlight} from 'react-native';
import Colors from '../../constants/Colors';
import Svg, { Path } from 'react-native-svg'

class Wind extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableHighlight underlayColor={Colors.appBackground} {...this.props}>
				<Svg width={this.props.size} height={this.props.size} viewBox="0 0 32 32" fill="none">
					<Path
						d="M4 19h10.371c3.629 0 5.4 3.311 3.629 5.983-1.771 2.672-5.326 1.747-6.315 0M4 12.658h5.371c3.629 0 5.4-3.311 3.629-5.983-1.771-2.672-5.326-1.747-6.315 0"
						stroke={this.props.color}
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<Path
						d="M4 15.636h17.601c4.533 0 6.746-3.892 4.533-7.032s-6.654-2.053-7.889 0"
						stroke={this.props.color}
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</Svg>
			</TouchableHighlight>
		);
	}
}

export default Wind
