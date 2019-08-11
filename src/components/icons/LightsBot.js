import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';

const LightsBot = (props) => (
	<Svg width={props.size} height={props.size} viewBox="0 0 32 32" fill="none" {...props}>
		<Path
			d="M15.5 27C10 27 10 22 10 22H21C21 22 21 27 15.5 27Z"
			fill={props.color}
			fillOpacity={1}
		/>
	</Svg>
);

LightsBot.propTypes = {
	color: PropTypes.string,
	size: PropTypes.number
};

LightsBot.defaultProps = {
	color: 'black',
	size: 32
};

export default LightsBot;
