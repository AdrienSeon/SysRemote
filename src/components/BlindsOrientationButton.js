import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';

class BlindsOrientationButton extends PureComponent {
	handlePress = () => {
		this.props.onPressItem(this.props.item);
	};

	render() {
		const { checked, checkedComponent, uncheckedComponent, ...other } = this.props;

		return (
			<TouchableOpacity style={styles.touchable} onPress={this.handlePress}>
				{checkedComponent && uncheckedComponent
					? checked
						? checkedComponent
						: uncheckedComponent
					: null}
			</TouchableOpacity>
		);
	}
}

BlindsOrientationButton.propTypes = {
	checkedComponent: PropTypes.element.isRequired,
	uncheckedComponent: PropTypes.element.isRequired,
	checked: PropTypes.bool.isRequired,
	onPressItem: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
	touchable: {
		flex: 1,
		alignItems: 'center'
	}
});

export default BlindsOrientationButton;
