import React from 'react';
import {Platform, View, Text, StyleSheet, StatusBar} from 'react-native';
import Colors from '../constants/Colors';
import BackIcon from '../components/icons/Back';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.appBackground,
		justifyContent: "center",
		alignItems: "center",
	},
});

class BlindsListScreen extends React.Component {
	constructor(props) {
		super(props);
	}
	
	static navigationOptions = {
		title: 'Stores',
		headerBackImage: <BackIcon color={Colors.primaryText} size='32'/>,
	};

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
			<View style={styles.container}>
				<Text style={styles.baseText}>Liste des stores</Text>
			</View>
		);
	}
}

export default BlindsListScreen;