import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Text, StyleSheet, Image, Platform, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native'

class CustomizableCheckbox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			checked: this.props.checked,
		};
	}

	static Container = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.checked !== this.props.checked) {
			this.setState(
				{ checked: this.props.checked },
			)
		}
	}

	handleToggleChecked() {
		this.setState(
			{ checked: !this.state.checked },
			() => this.props.onChange(this.state.checked)
		)
	}

	render () {
		const { checked } = this.state;
		const {
			labelBefore,
			noLabel,
			containerStyle,
			checkedComponent,
			uncheckedComponent,
			checkedImage,
			uncheckedImage,
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
				disabled={disabled}
			>
				<View style={[styles.container, containerStyle]}>
					{
						labelBefore ? !noLabel && (
							<Label
								labelStyle={labelStyle}
								numberOfLabelLines={numberOfLabelLines}
								label={label}
								customLabel={customLabel}
							/>
						) : null
					}
					{
						checkedComponent && uncheckedComponent ? (
							this.state.checked ? checkedComponent : uncheckedComponent
						) : null
					}
					{
						!labelBefore && !noLabel && (
							<Label
								labelStyle={labelStyle}
								numberOfLabelLines={numberOfLabelLines}
								label={label}
								customLabel={customLabel}
							/>
						)
					}
				</View>
			</Container>
		)
	}
}

CustomizableCheckbox.defaultProps = {
	custom: false,
	label: 'Label',
	customLabel: null,
	numberOfLabelLines: 1,
	labelBefore: false,
	noLabel: false,
	checked: false,
	checkedComponent: null,
	uncheckedComponent: null,
	noFeedback: false,
	disabled: false
};

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
	onChange: PropTypes.func,
	noFeedback: PropTypes.bool,
	disabled: PropTypes.bool
};

const Label = ({ labelStyle, numberOfLabelLines, label, customLabel }) => {
	return !customLabel ? (
		<View style={styles.labelContainer}>
			<Text style={[styles.label, labelStyle]} numberOfLines={numberOfLabelLines}>
				{label}
			</Text>
		</View>
	) : customLabel
};

var styles = StyleSheet.create({
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
