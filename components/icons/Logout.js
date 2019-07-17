import React from 'react'
import {TouchableHighlight} from 'react-native';
import Colors from '../../constants/Colors';
import Svg, { Path } from 'react-native-svg'

class Logout extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableHighlight underlayColor={Colors.appBackground} {...this.props}>
				<Svg width={this.props.size} height={this.props.size} fill="none">
					<Path
						d="M7 7.547l-3.5 3.5m0 0l3.5 3.5m-3.5-3.5H14"
						stroke={this.props.color}
						strokeOpacity={0.5}
						strokeWidth={2}
						strokeLinecap="round"
					/>
					<Path
						d="M3 5.031C9.194-1.435 19 3.331 19 11c0 7.67-9.806 12.434-16 5.969"
						stroke={this.props.color}
						strokeWidth={2}
						strokeLinecap="round"
					/>
				</Svg>
			</TouchableHighlight>
		);
	}
}

export default Logout
