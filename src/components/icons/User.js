import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import PropTypes from 'prop-types';

const User = (props) => (
	<Svg width={props.size} height={props.size} viewBox="0 0 15 15" fill="none" {...props}>
		<Path d="M14.5 15H.5s.538-6.5 7-6.5c6.461 0 7 6.5 7 6.5z" fill={props.color} />
		<Circle cx={7.5} cy={3.75} fill={props.color} fillOpacity={0.5} r={3.75} />
	</Svg>
);

User.propTypes = {
	color: PropTypes.string,
	size: PropTypes.number
};

User.defaultProps = {
	color: 'black',
	size: 32
};

export default User;
