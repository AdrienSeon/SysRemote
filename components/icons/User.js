import React from 'react'
import {TouchableHighlight} from 'react-native';
import Colors from '../../constants/Colors';
import Svg, { Path, Circle } from 'react-native-svg'

class User extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableHighlight underlayColor={Colors.appBackground} {...this.props}>
				<Svg width={this.props.size} height={this.props.size} viewBox="0 0 15 15" fill="none">
					<Path d="M14.5 15H.5s.538-6.5 7-6.5c6.461 0 7 6.5 7 6.5z" fill={this.props.color} />
					<Circle cx={7.5} cy={3.75} fill={this.props.color} fillOpacity={0.5} r={3.75} />
				</Svg>
			</TouchableHighlight>
		);
	}
}

export default User;
