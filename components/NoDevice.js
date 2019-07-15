import React from 'react';
import {Text, TouchableOpacity, View, Alert, StyleSheet} from 'react-native';
import CloudIcon from '../components/icons/Cloud';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.appBackground,
		justifyContent: "center",
		alignItems: "center"
	},
	baseText: {
		marginTop: 10,
		fontFamily: "OpenSans",
		fontSize: 12,
		lineHeight: 20,
		color: Colors.secondaryText
	},
	linkTextContainer: {
		backgroundColor: Colors.appBackground
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
					<View style={styles.linkTextContainer}>
						<Text style={styles.linkText}>Se connecter ?</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

export default NoDevice;