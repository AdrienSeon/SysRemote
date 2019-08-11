import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';

const Next = (props) => (
	<Svg width={props.size} height={props.size} viewBox="0 0 32 32" fill="none" {...props}>
		<Path
			d="M10 4L20.5634 15.3205L10 26.641"
			stroke={props.color}
			strokeWidth={3}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);

Next.propTypes = {
	color: PropTypes.string,
	size: PropTypes.number
};

Next.defaultProps = {
	color: 'black',
	size: 32
};

export default Next;
