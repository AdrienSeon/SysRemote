import React from 'react';
import {Platform, SafeAreaView, View, StyleSheet, Button, StatusBar, Text} from 'react-native';
import { DrawerActions } from 'react-navigation';
import Colors from '../constants/Colors';
import MenuIcon from '../components/icons/Menu';

import CircularSlider from '../components/CircularSlider';
import CircularSlider2 from '../components/CircularSlider2';
import CircularSlider3 from '../components/CircularSlider3';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.appBackground,
		paddingTop:100,
		alignItems: "center",
	},
	menuBtn: {
		marginLeft: 16
	},
	slider3:{
		transform: [{ rotate: '90deg'}]
	}

});

class TemperatureScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			startAngle: 20,
			angleLength: 120,
			slider1: 270,
		}
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

 

	render() {
		const { value } = this.state;
		return (
			<View style={styles.container}>

				<CircularSlider2 style={styles.slider2}
					value={90}
					btnRadius={15}
					dialRadius={100}
					dialWidth={15}
					meterColor={"white"}
					fillColor={"blue"}
					textColor={"black"}
					textSize={16}
					strokeColor={"yellow"}
					strokeWidth={5}
					startCoord={20}
					startGradient='#01fffc'
					endGradient='#a200ff'
					min={0}
					max={270}
				/>

				<CircularSlider3 style={styles.slider3}
					value={0}
					dialRadius={100}
					dialWidth={15}
					knobRadius={15}
					backgroundColor={'white'}
					textSize={24}
					textColor={"black"}
					startGradient='#01fffc'
					endGradient='#a200ff'
					startCoord={70}
					maxCoord={290}
				/>
				<Text>{this.state.slider1}</Text>
			</View>
		);
	}
}

export default TemperatureScreen;