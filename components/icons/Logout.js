import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';

const Logout = (props) => (
	<Svg width={props.size} height={props.size} viewBox="0 0 22 22" fill="none" {...props}>
		<Path
			d="M7 7.547l-3.5 3.5m0 0l3.5 3.5m-3.5-3.5H14"
			stroke={props.color}
			strokeOpacity={0.5}
			strokeWidth={2}
			strokeLinecap="round"
		/>
		<Path
			d="M3 5.031C9.194-1.435 19 3.331 19 11c0 7.67-9.806 12.434-16 5.969"
			stroke={props.color}
			strokeWidth={2}
			strokeLinecap="round"
		/>
	</Svg>
);

Logout.propTypes = {
	color: PropTypes.string,
	size: PropTypes.number
};

Logout.defaultProps = {
	color: 'black',
	size: 32
};

export default Logout;
