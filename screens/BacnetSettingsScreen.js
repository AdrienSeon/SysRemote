import React, { Component } from 'react';
import { Platform, SafeAreaView, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { List, ListItem } from 'native-base';
import Colors from '../constants/Colors';
import BackIcon from '../components/icons/Back';
import BacnetSettingsRow from '../components/BacnetSettingsRow';
import KeyboardShift from '../components/KeyboardShift';

class BacnetSettingsScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Gestion Bacnet',
		headerBackImage: (
			Platform.OS === 'ios' ? (
				<TouchableOpacity activeOpacity={0.5}>
					<BackIcon style={styles.backBtn} color={Colors.primaryText} size={32} />
				</TouchableOpacity>
			) : (
				<BackIcon style={styles.backBtn} color={Colors.primaryText} size={32} />
			)
		)
	});

	constructor(props) {
		super(props);

		this.state = {
			outsideTemperature: {
				label: 'Température ambiante',
				type: '',
				instance: ''
			},
			outsideHumidity: {
				label: 'Humidité extérieure',
				type: '',
				instance: ''
			},
			outsideCO2: {
				label: 'CO2 extérieur',
				type: '',
				instance: ''
			},
			roomTemperature: {
				label: 'Température ambiante',
				type: '',
				instance: ''
			},
			roomHumidity: {
				label: 'Humidité ambiante',
				type: '',
				instance: ''
			},
			roomCO2: {
				label: 'CO2 ambiant',
				type: '',
				instance: ''
			},
			roomSetpoint: {
				label: 'Consigne effective',
				type: '',
				instance: ''
			},
			roomSetpointRange: {
				label: 'Plage de consigne',
				type: '',
				instance: ''
			},
			fanspeed: {
				label: 'Vitesse ventilateur',
				type: '',
				instance: ''
			},
			LightsValue: {
				label: 'Valeur luminaires générale',
				type: '',
				instance: ''
			},
			Light1Value: {
				label: 'Valeur luminaire 1',
				type: '',
				instance: ''
			},
			Light2Value: {
				label: 'Valeur luminaire 2',
				type: '',
				instance: ''
			},
			Light3Value: {
				label: 'Valeur luminaire 3',
				type: '',
				instance: ''
			},
			Light4Value: {
				label: 'Valeur luminaire 4',
				type: '',
				instance: ''
			},
			blindsPosition: {
				label: 'Position stores générale',
				type: '',
				instance: ''
			},
			blind1Position: {
				label: 'Position store 1',
				type: '',
				instance: ''
			},
			blind2Position: {
				label: 'Position store 2',
				type: '',
				instance: ''
			},
			blind3Position: {
				label: 'Position store 3',
				type: '',
				instance: ''
			},
			blind4Position: {
				label: 'Position store 4',
				type: '',
				instance: ''
			},
			blindsRotation: {
				label: 'Rotation stores générale',
				type: '',
				instance: ''
			},
			blind1Rotation: {
				label: 'Rotation store 1',
				type: '',
				instance: ''
			},
			blind2Rotation: {
				label: 'Rotation store 2',
				type: '',
				instance: ''
			},
			blind3Rotation: {
				label: 'Rotation store 3',
				type: '',
				instance: ''
			},
			blind4Rotation: {
				label: 'Rotation store 4',
				type: '',
				instance: ''
			}
		};
	}

	render() {
		return (
			<KeyboardShift
				animDuringKeyboardDisplayIOS={false}
				keyboardShowDisplayDuration={200}
				keyboardHideDisplayDuration={200}
				keyboardDisplayTopSpacing={Platform.OS === 'ios' ? 13 : 15}>
				{() => (
					<SafeAreaView style={styles.safearea}>
						<ScrollView style={styles.container}>
							<List style={styles.listContainer}>
								<ListItem itemHeader first style={styles.listHeader}>
									<Text>CVC</Text>
								</ListItem>
								<ListItem style={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.outsideTemperature} />
								</ListItem>
								<ListItem style={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.outsideHumidity} />
								</ListItem>
								<ListItem style={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.outsideCO2} />
								</ListItem>
								<ListItem style={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.roomTemperature} />
								</ListItem>
								<ListItem style={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.roomHumidity} />
								</ListItem>
								<ListItem style={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.roomCO2} />
								</ListItem>
								<ListItem style={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.roomSetpoint} />
								</ListItem>
								<ListItem style={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.roomSetpointRange} />
								</ListItem>
								<ListItem last style={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.fanspeed} />
								</ListItem>
								<ListItem itemHeader style={styles.listHeader}>
									<Text>LUMINAIRES</Text>
								</ListItem>
								<ListItem tyle={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.LightsValue} />
								</ListItem>
								<ListItem tyle={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.Light1Value} />
								</ListItem>
								<ListItem tyle={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.Light2Value} />
								</ListItem>
								<ListItem tyle={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.Light3Value} />
								</ListItem>
								<ListItem last tyle={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.Light4Value} />
								</ListItem>
								<ListItem itemHeader style={styles.listHeader}>
									<Text>STORES</Text>
								</ListItem>
								<ListItem tyle={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.blindsPosition} />
								</ListItem>
								<ListItem tyle={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.blind1Position} />
								</ListItem>
								<ListItem tyle={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.blind2Position} />
								</ListItem>
								<ListItem tyle={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.blind3Position} />
								</ListItem>
								<ListItem tyle={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.blind4Position} />
								</ListItem>
								<ListItem tyle={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.blindsRotation} />
								</ListItem>
								<ListItem tyle={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.blind1Rotation} />
								</ListItem>
								<ListItem tyle={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.blind2Rotation} />
								</ListItem>
								<ListItem tyle={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.blind3Rotation} />
								</ListItem>
								<ListItem last tyle={styles.rowContainer}>
									<BacnetSettingsRow point={this.state.blind4Rotation} />
								</ListItem>
							</List>
						</ScrollView>
					</SafeAreaView>
				)}
			</KeyboardShift>
		);
	}
}

const styles = StyleSheet.create({
	safearea: {
		flex: 1,
		backgroundColor: Colors.appBackground
	},
	container: {
		flex: 1
	},
	backBtn: {
		marginLeft: Platform.OS === 'ios' ? 10 : 0
	},
	listContainer: {
		flex: 1,
		backgroundColor: '#fff'
	},
	listHeader: {
		backgroundColor: Colors.appBackground
	},
	rowContainer: {
		flex: 1
	}
});

export default BacnetSettingsScreen;
