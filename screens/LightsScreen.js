import React from 'react';
import {Platform, SafeAreaView, View, Text, Button, StyleSheet, StatusBar} from 'react-native';
import Colors from '../constants/Colors';
import MenuIcon from '../components/icons/Menu';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.appBackground,
		justifyContent: "center",
		alignItems: "center",
	},
	mainView: {
		flex: 1,
	},
	menuBtn: {
		marginLeft: 16
	}
});

class LightsScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	static navigationOptions = ({ navigation }) => ({
		title: 'Luminaires',
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
				<Text style={styles.baseText}>Luminaires</Text>
				<Button title='Liste des luminaires' onPress={() => this.props.navigation.navigate('LightsList')}/>
			</SafeAreaView>
		);
	}
}

export default LightsScreen;