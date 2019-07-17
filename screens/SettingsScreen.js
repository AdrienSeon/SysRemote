import React from 'react';
import {Platform, SafeAreaView, Text, Button, StyleSheet, StatusBar} from 'react-native';
import Colors from '../constants/Colors';
import BackIcon from '../components/icons/Back';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.appBackground,
		justifyContent: "center",
		alignItems: "center",
	},
	backBtn: {
		marginLeft: 16
	}
});

class SettingsScreen extends React.Component {
	constructor(props) {
		super(props);
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
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.baseText}>Paramètres</Text>
				<Button onPress={() => this.props.navigation.navigate('Temperature')} title="Go back home" />
			</SafeAreaView>
		);
	}
}

export default SettingsScreen;