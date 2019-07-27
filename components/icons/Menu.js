import React from 'react';
import { TouchableHighlight } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import Colors from '../../constants/Colors';

const Menu = (props) => (
	<TouchableHighlight underlayColor={Colors.appBackground} {...props}>
		<Svg width={props.size} height={props.size} viewBox="0 0 32 32" fill="none">
			<Rect x={3} y={4} width={15} height={2.573} rx={1} fill={props.color} />
			<Rect x={3} y={14.937} width={25} height={2.573} rx={1} fill={props.color} />
			<Rect x={3} y={25.873} width={21.25} height={2.573} rx={1} fill={props.color} />
		</Svg>
	</TouchableHighlight>
);

export default Menu;
