import React from 'react';
import {Text, TouchableOpacity, View, Alert, StyleSheet} from 'react-native';
import CloudIcon from '../components/icons/Cloud';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
	baseText: {
		marginTop: 10,
		fontFamily: "OpenSans",
		fontSize: 12,
		lineHeight: 20,
		color: Colors.secondaryText
	},
	linkText: {
		fontFamily: "OpenSans",
		fontSize: 12,
		lineHeight: 20,
		color: Colors.primaryBrand
	}
});

class NoDevice extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<CloudIcon color={Colors.secondaryBrand} width='73' height='78' />
				<Text style={styles.baseText}>Aucun automate connecté</Text>
				<TouchableOpacity onPress={() => {Alert.alert('popup de connexion automate')}}>
					<Text style={styles.linkText}>Se connecter ?</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default NoDevice;