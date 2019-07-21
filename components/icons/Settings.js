import React from 'react'
import {TouchableHighlight} from 'react-native';
import Colors from '../../constants/Colors';
import Svg, { Path, Circle } from 'react-native-svg'

class Settings extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableHighlight underlayColor={Colors.appBackground} viewBox="0 0 22 22"{...this.props}>
				<Svg width={this.props.size} height={this.props.size} fill="none">
					<Path
						d="M3.82105 5.93975L3.91695 7.77441C3.93231 8.06832 3.81743 8.35407 3.60289 8.55555L2.55238 9.54211C1.71124 10.332 1.71124 11.668 2.55238 12.4579L3.60289 13.4444C3.81743 13.6459 3.93231 13.9317 3.91695 14.2256L3.82105 16.0603C3.75935 17.2405 4.72912 18.2166 5.90976 18.1626L7.72344 18.0796C8.01135 18.0664 8.29094 18.1781 8.49054 18.386L9.55723 19.4971C10.3443 20.317 11.6557 20.317 12.4428 19.4971L13.5095 18.386C13.7091 18.1781 13.9887 18.0664 14.2766 18.0796L16.0902 18.1626C17.2709 18.2166 18.2406 17.2405 18.179 16.0603L18.083 14.2256C18.0677 13.9317 18.1826 13.6459 18.3971 13.4444L19.4476 12.4579C20.2888 11.668 20.2888 10.3321 19.4476 9.54211L18.3971 8.55555C18.1826 8.35407 18.0677 8.06832 18.083 7.77441L18.179 5.93975C18.2406 4.75948 17.2709 3.7834 16.0902 3.83744L14.2766 3.92044C13.9887 3.93362 13.7091 3.82193 13.5095 3.61402L12.4428 2.50289C11.6557 1.68298 10.3443 1.68298 9.55723 2.50289L8.49054 3.61402C8.29094 3.82193 8.01135 3.93362 7.72344 3.92044L5.90976 3.83744C4.72911 3.7834 3.75935 4.75948 3.82105 5.93975Z"
						stroke={this.props.color}
						strokeWidth={2}
					/>
					<Circle
						cx={11}
						cy={11}
						r={3}
						stroke={this.props.color}
						strokeOpacity={0.5}
						strokeWidth={2}
					/>
				</Svg>
			</TouchableHighlight>
		);
	}
}

export default Settings
