import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Rect } from 'react-native-svg';

const Menu = (props) => (
	<Svg width={props.size} height={props.size} viewBox="0 0 32 32" fill="none" {...props}>
		<Rect x={3} y={4} width={15} height={2.573} rx={1} fill={props.color} />
		<Rect x={3} y={14.937} width={25} height={2.573} rx={1} fill={props.color} />
		<Rect x={3} y={25.873} width={21.25} height={2.573} rx={1} fill={props.color} />
	</Svg>
);

Menu.propTypes = {
	color: PropTypes.string,
	size: PropTypes.number
};

Menu.defaultProps = {
	color: 'black',
	size: 32
};

export default Menu;
