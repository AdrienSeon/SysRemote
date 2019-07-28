import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';

const Back = (props) => (
	<Svg width={props.size} height={props.size} viewBox="0 0 32 32" fill="none" {...props}>
		<Path
			d="M20.75 5L10 15.75 20.75 26.5"
			stroke={props.color}
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);

Back.propTypes = {
	color: PropTypes.string,
	size: PropTypes.number
};

Back.defaultProps = {
	color: 'black',
	size: 32
};

export default Back;
