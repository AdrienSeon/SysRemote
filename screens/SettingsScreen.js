import React, { Component } from 'react';
import { Platform, SafeAreaView, ScrollView, View, TouchableWithoutFeedback, Text, Button, StyleSheet, StatusBar, TextInput } from 'react-native';
//import { List, ListItem } from 'native-base';
import Colors from '../constants/Colors';
import BackIcon from '../components/icons/Back';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

class SettingsScreen extends Component {
	constructor(props) {
		super(props);

		this.inputRefs = {
			outsideTemperatureTypeInput: null,
			outsideTemperatureInstanceInput: null,
			outsideHumidityTypeInput: null,
			outsideHumidityInstanceInput: null,
			outsideCO2TypeInput: null,
			outsideCO2InstanceInput: null,
			roomTemperatureTypeInput: null,
			roomTemperatureInstanceInput: null,
			roomHumidityTypeInput: null,
			roomHumidityInstanceInput: null,
			roomCO2TypeInput: null,
			roomCO2InstanceInput: null,
			fanspeedTypeInput: null,
			fanspeedInstanceInput: null,
			effectiveSetpointTypeInput: null,
			effectiveSetpointInstanceInput: null,
			LightsValueTypeInput: null,
			LightsValueInstanceInput: null,
			Light1ValueTypeInput: null,
			Light1ValueInstanceInput: null,
			Light2ValueTypeInput: null,
			Light2ValueInstanceInput: null,
			Light3ValueTypeInput: null,
			Light3ValueInstanceInput: null,
			Light4ValueTypeInput: null,
			Light4ValueInstanceInput: null,
			blindsPositionTypeInput: null,
			blindsPositionInstanceInput: null,
			blind1PositionTypeInput: null,
			blind1PositionInstanceInput: null,
			blind2PositionTypeInput: null,
			blind2PositionInstanceInput: null,
			blind3PositionTypeInput: null,
			blind3PositionInstanceInput: null,
			blind4PositionTypeInput: null,
			blind4PositionInstanceInput: null,
			blindsRotationTypeInput: null,
			blindsRotationInstanceInput: null,
			blind1RotationTypeInput: null,
			blind1RotationInstanceInput: null,
			blind2RotationTypeInput: null,
			blind2RotationInstanceInput: null,
			blind3RotationTypeInput: null,
			blind3RotationInstanceInput: null,
			blind4RotationTypeInput: null,
			blind4RotationInstanceInput: null,
		};

		this.state = {
			outsideTemperatureType: '',
			outsideTemperatureInstance: '',
			outsideHumidityType: '',
			outsideHumidityInstance: '',
			outsideCO2Type: '',
			outsideCO2Instance: '',
			roomTemperatureType: '',
			roomTemperatureInstance: '',
			roomHumidityType: '',
			roomHumidityInstance: '',
			roomCO2Type: '',
			roomCO2Instance: '',
			fanspeedType: '',
			fanspeedInstance: '',
			effectiveSetpointType: '',
			effectiveSetpointInstance: '',
			LightsValueType: '',
			LightsValueInstance: '',
			Light1ValueType: '',
			Light1ValueInstance: '',
			Light2ValueType: '',
			Light2ValueInstance: '',
			Light3ValueType: '',
			Light3ValueInstance: '',
			Light4ValueType: '',
			Light4ValueInstance: '',
			blindsPositionType: '',
			blindsPositionInstance: '',
			blind1PositionType: '',
			blind1PositionInstance: '',
			blind2PositionType: '',
			blind2PositionInstance: '',
			blind3PositionType: '',
			blind3PositionInstance: '',
			blind4PositionType: '',
			blind4PositionInstance: '',
			blindsRotationType: '',
			blindsRotationInstance: '',
			blind1RotationType: '',
			blind1RotationInstance: '',
			blind2RotationType: '',
			blind2RotationInstance: '',
			blind3RotationType: '',
			blind3RotationInstance: '',
			blind4RotationType: '',
			blind4RotationInstance: '',
		}
	}
	
	static navigationOptions = ({ navigation }) => ({
		title: 'Paramètres',
		headerLeft: <BackIcon style={styles.backBtn} color={Colors.primaryText} size='32' onPress={() => navigation.navigate('Temperature')}/>,
	});

	componentDidMount() {
/*		this._navListener = this.props.navigation.addListener('didFocus', () => {
			StatusBar.setBarStyle('light-content');
			if(Platform.OS === "android"){
				StatusBar.setBackgroundColor('#6a51ae');
			}
		});*/
	}

	componentWillUnmount() {
		//this._navListener.remove();
	}

	render() {

		const typePlaceholder = {
			label: 'Sélectionner',
			value: null,
			color: Colors.secondaryText,
		};

		return (
			<SafeAreaView style={styles.safearea}>
				<ScrollView style={styles.container}>
{/*        <List>
            <ListItem itemHeader first>
              <Text>COMEDY</Text>
            </ListItem>
            <ListItem >
              <Text>Hangover</Text>
            </ListItem>
            <ListItem last>
              <Text>Cop Out</Text>
            </ListItem>
            <ListItem itemHeader>
              <Text>ACTION</Text>
            </ListItem>
            <ListItem>
              <Text>Terminator Genesis</Text>
            </ListItem>
          </List>*/}
					<View style={styles.rowContainer}>
						<Text 
							style={StyleSheet.flatten([
								styles.inputLabel,
								Platform.OS === 'ios'
									? styles.inputIOS
									: styles.inputAndroid,
							])}
						>
							Température extérieure
						</Text>
						<RNPickerSelect
							items={types}
							onValueChange={value => { this.setState({ outsideTemperatureType: value })}}
							onDownArrow={() => { this.inputRefs.outsideTemperatureInstanceInput.focus() }}
							doneText='OK'
							placeholder={typePlaceholder}
							useNativeAndroidPickerStyle={false}
							style={pickerSelectStyles}
							value={this.state.outsideTemperatureType}
							ref={el => { this.inputRefs.outsideTemperatureTypeInput = el }}
						/>
						<TextInput
							value={ this.state.outsideTemperatureInstance }
							placeholder='0'
							onChangeText={ (value) => this.setState({ outsideTemperatureInstance: value }) }
							underlineColorAndroid='transparent'  
							style={StyleSheet.flatten([
								styles.instanceInput,
								Platform.OS === 'ios'
									? styles.inputIOS
									: styles.inputAndroid,
							])}
							keyboardType={'numeric'}
							ref={el => { this.inputRefs.outsideTemperatureInstanceInput = el }}
						/>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	safearea: {
		flex: 1,
		backgroundColor: Colors.appBackground,
	},
	container: {
		flex: 1,
		...Platform.select({
			ios: {
				paddingTop: 70 + 20
			},
			android: {
				paddingTop: 80 + 20
			}
		}),
	},
	backBtn: {
		marginLeft: 16
	},
	rowContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	inputLabel: {
		flex: 8,
		fontFamily: "OpenSans",
 		fontSize: 16,
	},
	typeInput: {
		flex: 5,
	},
	instanceInput: {
		flex: 1,
		fontFamily: "OpenSans",
 		fontSize: 16,
 		color: Colors.secondaryText,
		textAlign: 'center',
	},
	inputIOS: {
		paddingVertical: 12,
		paddingHorizontal: 10,
	},
	inputAndroid: {
		paddingHorizontal: 10,
		paddingVertical: 8,
	},
});

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		paddingVertical: 12,
		paddingHorizontal: 10,
		fontFamily: "OpenSans",
		fontSize: 16,
		color: Colors.secondaryText,
	},
	inputAndroid: {
		paddingHorizontal: 10,
		paddingVertical: 8,
		fontFamily: "OpenSans",
		fontSize: 16,
		color: Colors.secondaryText,
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

export default SettingsScreen;