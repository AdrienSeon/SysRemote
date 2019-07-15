import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
		marginLeft: 7.5
	}
});


class BlindsListScreen extends React.Component {
	static navigationOptions = {
		title: 'Stores',
		headerStyle: {
			height: 56,
		},
		headerTransparent: true,
		headerTintColor: Colors.primaryText,
		headerTitleStyle: {
			fontWeight: '600',
		},
		headerLeft: <BackIcon style={styles.backBtn} color={Colors.primaryText} size='32'/>
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.baseText}>Liste des stores</Text>
			</View>
		);
	}
}

export default BlindsListScreen;