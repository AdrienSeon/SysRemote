import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, TextInput } from 'react-native';
import Colors from '../constants/Colors';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

class BacnetSettingsRow extends Component {
	constructor(props) {
		super(props);

		this.inputRefs = {
			pointTypeInput: null,
			pointInstanceInput: null,
		};

		this.state = {
			point: this.props.point
		}
	}

	render() {

		const typePlaceholder = {
			label: 'Type',
			value: null,
			color: Colors.secondaryText,
		};

		return (
			<View style={styles.rowContainer}>
				<Text 
					style={StyleSheet.flatten([
						styles.inputLabel,
						Platform.OS === 'ios'
							? styles.inputIOS
							: styles.inputAndroid,
					])}
				>
					{this.state.point.label}
				</Text>
				<RNPickerSelect
					value={this.state.point.type}
					onValueChange={value => { this.setState({
						point: {
							...this.state.point,
							type: value 
						}
					})}}
					items={types}
					onDownArrow={() => { this.inputRefs.pointInstanceInput.focus() }}
					doneText='OK'
					placeholder={typePlaceholder}
					useNativeAndroidPickerStyle={false}
					style={pickerSelectStyles}
					ref={el => { this.inputRefs.pointTypeInput = el }}
				/>
				<TextInput
					value={ this.state.point.instance }
					onChangeText={value => { this.setState({
						point: {
							...this.state.point,
							instance: value 
						}
					})}}
					placeholder='0'
					underlineColorAndroid='transparent'  
					style={StyleSheet.flatten([
						styles.instanceInput,
					])}
					keyboardType={'numeric'}
					ref={el => { this.inputRefs.pointInstanceInput = el }}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	rowContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	inputLabel: {
		flex: 6,
		fontFamily: "OpenSans",
 		fontSize: 14,
	},
	typeInput: {
		flex: 5,
	},
	instanceInput: {
		flex: 1,
		fontFamily: "OpenSans",
 		fontSize: 14,
 		color: Colors.secondaryText,
		textAlign: 'center',
		minWidth: 15,
	},
	inputIOS: {
		paddingHorizontal: 10,
	},
	inputAndroid: {
		paddingHorizontal: 10,
	},
});

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		paddingHorizontal: 10,
		fontFamily: "OpenSans",
		fontSize: 14,
		color: Colors.secondaryText,
		paddingRight: 35,
	},
	inputAndroid: {
		paddingHorizontal: 10,
		fontFamily: "OpenSans",
		fontSize: 14,
		color: Colors.secondaryText,
		paddingRight: 35,
	},
});

const types = [
	{
		label: 'Analog Value',
		value: 'analogValue',
	},
	{
		label: 'Analog Input',
		value: 'analogInput',
	},
	{
		label: 'Analog Output',
		value: 'analogOutput',
	},
	{
		label: 'Binary Value',
		value: 'binaryValue',
	},
	{
		label: 'Binary Input',
		value: 'binaryInput',
	},
	{
		label: 'Binary Output',
		value: 'binaryOutput',
	},
	{
		label: 'Multistate Value',
		value: 'multistateValue',
	},
	{
		label: 'Multistate Input',
		value: 'multistateInput',
	},
	{
		label: 'Multistate Output',
		value: 'multistateOutput',
	},
];

export default BacnetSettingsRow;