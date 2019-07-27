import React, { Component } from 'react';
import { Platform, SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { Header } from 'react-navigation';
import Colors from '../constants/Colors';
import BackIcon from '../components/icons/Back';
import SingleLightCommand from '../components/SingleLightCommand';

class LightsListScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Luminaires',
		headerBackImage: <BackIcon style={styles.backBtn} color={Colors.primaryText} size='32'/>,
	});
	
	constructor(props) {
		super(props);

		this.state = {
			light1Selected: false,
			light2Selected: false,
			light3Selected: false,
			light4Selected: false,
			light5Selected: false,
			light6Selected: false,
			light7Selected: false,
			light8Selected: false
		};
	}

	render() {
		return (
			<SafeAreaView style={styles.safearea}>
				<View style={styles.container}>
					<ScrollView>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<SingleLightCommand
								name="Luminaire 1"
								selected={this.state.light1Selected}
								onChange={(value) => this.setState({ light1Selected: value })}
								style={styles.singleCommand}
							/>
							<SingleLightCommand
								name="Luminaire 2"
								selected={this.state.light2Selected}
								onChange={(value) => this.setState({ light2Selected: value })}
								style={styles.singleCommand}
							/>
						</View>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<SingleLightCommand
								name="Luminaire 3"
								selected={this.state.light3Selected}
								onChange={(value) => this.setState({ light3Selected: value })}
								style={styles.singleCommand}
							/>
							<SingleLightCommand
								name="Luminaire 4"
								selected={this.state.light4Selected}
								onChange={(value) => this.setState({ light4Selected: value })}
								style={styles.singleCommand}
							/>
						</View>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'space-around'
							}}>
							<SingleLightCommand
								name="Luminaire 5"
								selected={this.state.light5Selected}
								onChange={(value) => this.setState({ light5Selected: value })}
								style={styles.singleCommand}
							/>
							<SingleLightCommand
								name="Luminaire 6"
								selected={this.state.light6Selected}
								onChange={(value) => this.setState({ light6Selected: value })}
								style={styles.singleCommand}
							/>
						</View>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<SingleLightCommand
								name="Luminaire 7"
								selected={this.state.light7Selected}
								onChange={(value) => this.setState({ light7Selected: value })}
								style={styles.singleCommand}
							/>
							<SingleLightCommand
								name="Luminaire 8"
								selected={this.state.light8Selected}
								onChange={(value) => this.setState({ light8Selected: value })}
								style={styles.singleCommand}
							/>
						</View>
					</ScrollView>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	safearea: {
		flex: 1,
		backgroundColor: Colors.appBackground
	},
	container: {
		flex: 1,
		paddingTop: Platform.OS === 'ios' ? Header.HEIGHT - 10 : Header.HEIGHT + 25
	},
	backBtn: {
		marginLeft: Platform.OS === 'ios' ? 10 : 0
	},
	singleCommand: {}
});

export default LightsListScreen;
