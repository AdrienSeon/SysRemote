import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import BackIcon from '../components/icons/Back';

class BlindsListScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Stores',
		headerBackImage: <BackIcon style={styles.backBtn} color={Colors.primaryText} size={32} />
	});

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.baseText}>Liste des stores</Text>
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
