import React from 'react';
import {View, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import MenuIcon from '../components/icons/Menu';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.appBackground,
		justifyContent: "center",
		alignItems: "center",
	},
	menuBtn: {
		marginLeft: 7.5
	}
});

class LightsScreen extends React.Component {
	static navigationOptions = {
		title: 'Luminaires',
		headerStyle: {
			height: 56,
		},
		headerTransparent: true,
		headerTintColor: Colors.primaryText,
		headerTitleStyle: {
			fontWeight: '600',
		},
		headerLeft: <MenuIcon style={styles.menuBtn} color={Colors.primaryText} size='32'/>
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.baseText}>Luminaires</Text>
			</View>
		);
	}
}

export default LightsScreen;