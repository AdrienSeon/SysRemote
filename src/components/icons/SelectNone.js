import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';

const SelectNone = (props) => (
	<Svg width={props.size} height={props.size} viewBox="0 0 32 32" fill="none" {...props}>
		<Path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M19.6106 5.80531H8.67257C7.08902 5.80531 5.80531 7.08903 5.80531 8.67257V19.6106C5.80531 21.1942 7.08902 22.4779 8.67257 22.4779H19.6106C21.1942 22.4779 22.4779 21.1942 22.4779 19.6106V8.67257C22.4779 7.08903 21.1942 5.80531 19.6106 5.80531ZM8.67257 4C6.09198 4 4 6.09198 4 8.67257V19.6106C4 22.1912 6.09198 24.2832 8.67257 24.2832H19.6106C22.1912 24.2832 24.2832 22.1912 24.2832 19.6106V8.67257C24.2832 6.09198 22.1912 4 19.6106 4H8.67257Z"
			fill={props.color}
		/>
		<Path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M26.1947 18.3363L26.1947 23.3274C26.1947 24.911 24.911 26.1947 23.3274 26.1947H17.8053V26.1947H8.69971C9.55466 27.2933 10.8895 28 12.3894 28H23.3274C25.908 28 28 25.908 28 23.3274V12.3894C28 10.8895 27.2933 9.55466 26.1947 8.69971V18.3363Z"
			fill={props.color}
		/>
	</Svg>
);

SelectNone.propTypes = {
	color: PropTypes.string,
	size: PropTypes.number
};

SelectNone.defaultProps = {
	color: 'black',
	size: 32
};

export default SelectNone;
