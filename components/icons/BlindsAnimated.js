import React from 'react';
import { TouchableHighlight } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import Colors from '../../constants/Colors';

const Blinds = (props) => (
	<TouchableHighlight underlayColor={Colors.appBackground} {...props}>
		<Svg width={props.size} height={props.size} viewBox="0 0 32 32" fill="none">
			<Path
				d="M5 27V6h2v19a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1V6h2v21a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"
				fill={props.color}
				fillOpacity={0.5}
			/>
			<Rect x={1} y={4} width={29} height={3} rx={1.5} fill={props.color} />
			<Rect
				x={1}
				y={8}
				width={29}
				height={3}
				rx={1.5}
				fill={props.color}
				fillOpacity={props.opacityRow2}
			/>
			<Rect
				x={1}
				y={12}
				width={29}
				height={3}
				rx={1.5}
				fill={props.color}
				fillOpacity={props.opacityRow3}
			/>
			<Rect
				x={1}
				y={16}
				width={29}
				height={3}
				rx={1.5}
				fill={props.color}
				fillOpacity={props.opacityRow4}
			/>
			<Rect
				x={1}
				y={20}
				width={29}
				height={3}
				rx={1.5}
				fill={props.color}
				fillOpacity={props.opacityRow5}
			/>
			<Rect
				x={1}
				y={24}
				width={29}
				height={3}
				rx={1.5}
				fill={props.color}
				fillOpacity={props.opacityRow6}
			/>
		</Svg>
	</TouchableHighlight>
);

export default Blinds;
