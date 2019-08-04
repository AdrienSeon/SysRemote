import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	TouchableOpacity,
	View,
	StyleSheet,
	Platform,
	TouchableNativeFeedback,
	TouchableWithoutFeedback
} from 'react-native';

class BlindsOrientationButton extends PureComponent {
	handlePress = () => {
		this.props.onPressItem(this.props.item);
	};

	render() {
		const {
			checked,
			containerStyle,
			checkedComponent,
			uncheckedComponent,
			noFeedback,
			disabled,
			...other
		} = this.props;

		const NativeContainer = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;
		const Container = noFeedback ? TouchableWithoutFeedback : NativeContainer;

		return (
			<Container style={[containerStyle]} onPress={this.handlePress} disabled={disabled}>
				{checkedComponent && uncheckedComponent
					? checked
						? checkedComponent
						: uncheckedComponent
					: null}
			</Container>
		);
	}
}

BlindsOrientationButton.propTypes = {
	checkedComponent: PropTypes.element.isRequired,
	uncheckedComponent: PropTypes.element.isRequired,
	checked: PropTypes.bool.isRequired,
	containerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onPressItem: PropTypes.func.isRequired,
	noFeedback: PropTypes.bool,
	disabled: PropTypes.bool
};

BlindsOrientationButton.defaultProps = {
	noFeedback: false,
	disabled: false,
	containerStyle: {}
};

export default BlindsOrientationButton;
