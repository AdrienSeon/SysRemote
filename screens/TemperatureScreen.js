import React, {Component} from "react";
import {Platform, SafeAreaView, View, StyleSheet, Button, StatusBar, Text} from 'react-native';
import { DrawerActions } from 'react-navigation';
import Colors from '../constants/Colors';
import MenuIcon from '../components/icons/Menu';
import CircularSlider from '../components/CircularSlider';
import LinearScale from "linear-scale"

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.appBackground,
		paddingTop:100,
		alignItems: "center",
		justifyContent: 'center'
	},
	menuBtn: {
		marginLeft: 16
	},
	CircularSlider:{

	},
	setpointValue: {
		fontFamily: "OpenSans",
		fontSize: 36,
		color: Colors.primaryText
	}
});

class TemperatureScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			setpoint: 20,
			minSetpoint: 15,
			maxSetpoint: 30,
			setpointInRadian: 70,
			startCoord: 70,
			maxCoord: 290,
			sliderValue: 70,
		}

		this.handleSliderValueChange = this.handleSliderValueChange.bind(this);
		this.setpointInRadianToDegree = this.setpointInRadianToDegree.bind(this);
		this.setpointInDegreeToRadian = this.setpointInDegreeToRadian.bind(this);
	}

	static navigationOptions = ({ navigation }) => ({
		title: 'Température',
		headerLeft: <MenuIcon style={styles.menuBtn} color={Colors.primaryText} size='32' onPress={() => navigation.openDrawer()}/>,
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

	handleSliderValueChange(value) {
		this.setState({setpointInRadian: value});
		this.setpointInRadianToDegree(value);
		this.setpointInDegreeToRadian(this.state.setpoint);
	}

	setpointInRadianToDegree(value) {
		let setpointInRadianToDegree = LinearScale([this.state.startCoord, this.state.maxCoord], [this.state.minSetpoint, this.state.maxSetpoint])
		let setpoint = setpointInRadianToDegree(value)
		setpoint = +setpoint.toFixed(1)
		this.setState({setpoint: setpoint})
	}

	setpointInDegreeToRadian(value) {
		let setpointInDegreeToRadian = LinearScale([this.state.minSetpoint, this.state.maxSetpoint], [this.state.startCoord, this.state.maxCoord])
		this.setState({setpointInRadian: setpointInDegreeToRadian(value)})
	}

	render() {

		return (
			<View style={styles.container}>
				<View style={{}}>
					<View style={{

						//backgroundColor: 'blue'
					}}
					>
						<CircularSlider style={{
							position: 'relative',
							top: 0,
							left: 0,
						}}
							value={this.state.sliderValue}
							dialRadius={130}
							dialWidth={5}
							knobRadius={14}
							knobColor={Colors.inverted}
							startGradient='#5D87E7'
							endGradient='#FF7978'
							startCoord={this.state.startCoord}
							maxCoord={this.state.maxCoord}
							backgroundColor={Colors.appBackground}
							onValueChange={this.handleSliderValueChange}
						/>
					</View>
					<View style={{
						backgroundColor: Colors.secondaryText,
						height: 226,
						width: 1,
						position: 'absolute',
						top: 30,
						left: 143,
						alignItems: 'center',
						justifyContent: 'center',
					}}
					>
					</View>
					<View style={{
						backgroundColor: Colors.secondaryText,
						height: 1,
						width: 226,
						position: 'absolute',
						top: 143,
						left: 30,
						alignItems: 'center',
						justifyContent: 'center',
					}}
					>
					</View>
					<View style={{
						backgroundColor: Colors.inverted,
						shadowColor: "rgba(189, 199, 225, 0.5)",
						shadowOffset: {
							width: 0,
							height: 17
						},
						shadowRadius: 25,
						height: 210,
						width: 210,
						borderRadius: 100,
						shadowOpacity: 1,
						position: 'absolute',
						top: 38,
						left: 38,
						alignItems: 'center',
						justifyContent: 'center',
					}}
					>
						<Text style={styles.setpointValue}>{this.state.setpoint + "°C"}</Text>
						<Text style={{fontSize:12}}>{this.state.setpointInRadian + "rad"}</Text>
					</View>
				</View>
			</View>
		);
	}
}

export default TemperatureScreen;