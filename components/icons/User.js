import React from 'react';
import { TouchableHighlight } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import Colors from '../../constants/Colors';

const User = (props) => (
	<TouchableHighlight underlayColor={Colors.appBackground} {...props}>
		<Svg width={props.size} height={props.size} viewBox="0 0 15 15" fill="none">
			<Path d="M14.5 15H.5s.538-6.5 7-6.5c6.461 0 7 6.5 7 6.5z" fill={props.color} />
			<Circle cx={7.5} cy={3.75} fill={props.color} fillOpacity={0.5} r={3.75} />
		</Svg>
	</TouchableHighlight>
);

export default User;
