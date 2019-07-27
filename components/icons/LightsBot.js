import React from 'react';
import { TouchableHighlight } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Colors from '../../constants/Colors';

const LightsBot = (props) => (
	<TouchableHighlight underlayColor={Colors.appBackground} {...props}>
		<Svg width={props.size} height={props.size} viewBox="0 0 32 32" fill="none">
			<Path
				d="M15.5 27C10 27 10 22 10 22H21C21 22 21 27 15.5 27Z"
				fill={props.color}
				fillOpacity={1}
			/>
		</Svg>
	</TouchableHighlight>
);

export default LightsBot;
