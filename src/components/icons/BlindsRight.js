import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import PropTypes from 'prop-types';

const BlindsRight = (props) => (
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
		<Path fill={props.iconColor} fillOpacity={0.5} d="M12.638 7.404h-1.043v9.391h1.043z" />
		<Rect
			width={9.391}
			height={2.087}
			rx={1.043}
			transform="scale(-1 1) rotate(-45 3.217 24.125)"
			fill={props.iconColor}
		/>
		<Rect
			width={9.391}
			height={2.087}
			rx={1.043}
			transform="scale(-1 1) rotate(-45 7.442 25.875)"
			fill={props.iconColor}
		/>
		<Rect
			width={9.391}
			height={2.087}
			rx={1.043}
			transform="scale(-1 1) rotate(-45 11.667 27.625)"
			fill={props.iconColor}
		/>
		<Rect
			width={9.391}
			height={2.087}
			rx={1.043}
			transform="scale(-1 1) rotate(-45 15.892 29.375)"
			fill={props.iconColor}
		/>
	</Svg>
);

BlindsRight.propTypes = {
	iconColor: PropTypes.string,
	backgroundColor: PropTypes.string,
	size: PropTypes.number
};

BlindsRight.defaultProps = {
	iconColor: 'black',
	backgroundColor: 'white',
	size: 32
};

export default BlindsRight;
