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
	backBtn: {
		marginLeft: Platform.OS === 'ios' ? 10 : 0,
	}
});

class LightsListScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	static navigationOptions = {
		title: 'Luminaires',
		headerBackImage: <BackIcon style={styles.backBtn} color={Colors.primaryText} size='32'/>,
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
				<Text style={styles.baseText}>Liste des luminaires</Text>
			</View>
		);
	}
}

export default LightsListScreen;