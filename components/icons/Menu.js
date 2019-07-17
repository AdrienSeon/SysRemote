import React from 'react'
import {TouchableHighlight} from 'react-native';
import Colors from '../../constants/Colors';
import Svg, { Rect } from 'react-native-svg'

class Menu extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableHighlight underlayColor={Colors.appBackground} {...this.props}>
				<Svg width={this.props.size} height={this.props.size} fill="none">
					<Rect x={3} y={4} width={15} height={2.573} rx={1} fill={this.props.color} />
					<Rect x={3} y={14.937} width={25} height={2.573} rx={1} fill={this.props.color} />
					<Rect x={3} y={25.873} width={21.25} height={2.573} rx={1} fill={this.props.color} />
				</Svg>
			</TouchableHighlight>
		);
	}
}

export default Menu;
