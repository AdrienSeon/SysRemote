import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	TouchableOpacity,
	View,
	Text,
	StyleSheet,
	Platform,
	TouchableNativeFeedback,
	TouchableWithoutFeedback
} from 'react-native';

class CustomizableCheckbox extends Component {
	static Container = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

	constructor(props) {
		super(props);

		this.state = {
			checked: this.props.checked
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.checked !== this.props.checked) {
			this.setState({ checked: this.props.checked });
		}
	}

	handleToggleChecked() {
		this.setState(
			(prevState) => ({ checked: !prevState.checked }),
			() => this.props.onChange(this.state.checked)
		);
	}

	render() {
		const { checked } = this.state;
		const {
			labelBefore,
			noLabel,
			containerStyle,
			checkedComponent,
			uncheckedComponent,
			checkboxStyle,
			labelStyle,
			numberOfLabelLines,
			label,
			noFeedback,
			customLabel,
			disabled,
			...other
		} = this.props;

		const Container = noFeedback ? TouchableWithoutFeedback : CustomizableCheckbox.Container;

		return (
			<Container
				style={[styles.container, containerStyle]}
				onPress={() => this.handleToggleChecked()}
				disabled={disabled}>
				<View style={[styles.container, containerStyle]}>
					{labelBefore
						? !noLabel && (
								<Label
									labelStyle={labelStyle}
									numberOfLabelLines={numberOfLabelLines}
									label={label}
									customLabel={customLabel}
								/>
						  )
						: null}
					{checkedComponent && uncheckedComponent
						? checked
							? checkedComponent
							: uncheckedComponent
						: null}
					{!labelBefore && !noLabel && (
						<Label
							labelStyle={labelStyle}
							numberOfLabelLines={numberOfLabelLines}
							label={label}
							customLabel={customLabel}
						/>
					)}
				</View>
			</Container>
		);
	}
}

CustomizableCheckbox.propTypes = {
	checkedComponent: PropTypes.element.isRequired,
	uncheckedComponent: PropTypes.element.isRequired,
	checked: PropTypes.bool,
	checkboxStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	containerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	label: PropTypes.string,
	customLabel: PropTypes.element,
	labelBefore: PropTypes.bool,
	noLabel: PropTypes.bool,
	labelStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	numberOfLabelLines: PropTypes.number,
	onChange: PropTypes.func.isRequired,
	noFeedback: PropTypes.bool,
	disabled: PropTypes.bool
};

CustomizableCheckbox.defaultProps = {
	label: 'Label',
	customLabel: null,
	numberOfLabelLines: 1,
	labelBefore: false,
	noLabel: false,
	checked: false,
	noFeedback: false,
	disabled: false
};

const Label = ({ labelStyle, numberOfLabelLines, label, customLabel }) => {
	return !customLabel ? (
		<View style={styles.labelContainer}>
			<Text style={[styles.label, labelStyle]} numberOfLines={numberOfLabelLines}>
				{label}
			</Text>
		</View>
	) : (
		customLabel
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	checkbox: {
		width: 30,
		height: 30
	},
	labelContainer: {
		marginLeft: 10,
		marginRight: 10
	},
	label: {
		fontSize: 16,
		color: '#222'
	}
});

export default CustomizableCheckbox;
