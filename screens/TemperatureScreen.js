import React from 'react';
import {Platform, SafeAreaView, StyleSheet, Button, StatusBar} from 'react-native';
import { DrawerActions } from 'react-navigation';
import Colors from '../constants/Colors';
import MenuIcon from '../components/icons/Menu';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:"#ecf0f1",
		justifyContent: "center",
		alignItems: "center",
	},
	menuBtn: {
		marginLeft: 16
	}
});

class TemperatureScreen extends React.Component {
	constructor(props) {
		super(props);
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
		return (
			<SafeAreaView style={styles.container}>

			</SafeAreaView>
		);
	}
}

export default TemperatureScreen;