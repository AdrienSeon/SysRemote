import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import PropTypes from 'prop-types';

const BlindsLeft = (props) => (
	<Svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" {...props}>
		<Path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M0 12C0 5.373 5.373 0 12 0s12 5.373 12 12-5.373 12-12 12S0 18.627 0 12z"
			fill={props.backgroundColor}
		/>
		<Path
			d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"
			stroke={props.iconColor}
			strokeOpacity={0.5}
			strokeWidth={2}
		/>
		<Path fill={props.iconColor} fillOpacity={0.5} d="M11.478 7.404h1.043v9.391h-1.043z" />
		<Rect
			x={8}
			y={9.341}
			width={9.391}
			height={2.087}
			rx={1.043}
			transform="rotate(-45 8 9.34)"
			fill={props.iconColor}
		/>
		<Rect
			x={8}
			y={12.841}
			width={9.391}
			height={2.087}
			rx={1.043}
			transform="rotate(-45 8 12.84)"
			fill={props.iconColor}
		/>
		<Rect
			x={8}
			y={16.341}
			width={9.391}
			height={2.087}
			rx={1.043}
			transform="rotate(-45 8 16.34)"
			fill={props.iconColor}
		/>
		<Rect
			x={8}
			y={19.841}
			width={9.391}
			height={2.087}
			rx={1.043}
			transform="rotate(-45 8 19.84)"
			fill={props.iconColor}
		/>
	</Svg>
);

BlindsLeft.propTypes = {
	iconColor: PropTypes.string,
	backgroundColor: PropTypes.string,
	size: PropTypes.number
};

BlindsLeft.defaultProps = {
	iconColor: 'black',
	backgroundColor: 'white',
	size: 32
};

export default BlindsLeft;
