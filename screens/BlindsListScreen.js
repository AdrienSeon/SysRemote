import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import BackIcon from '../components/icons/Back';
import BlindsOrientation from '../components/BlindsOrientation';

class BlindsListScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Stores',
		headerBackImage: (
			<TouchableOpacity activeOpacity={0.5}>
				<BackIcon style={styles.backBtn} color={Colors.primaryText} size={32} />
			</TouchableOpacity>
		)
	});

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.baseText}>Liste des stores</Text>
				<BlindsOrientation />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.appBackground,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default BlindsListScreen;
