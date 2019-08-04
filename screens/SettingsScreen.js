import React, { Component } from 'react';
import {
	Platform,
	SafeAreaView,
	ScrollView,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import { List, ListItem, Left, Right, Icon } from 'native-base';
import Colors from '../constants/Colors';
import BackIcon from '../components/icons/Back';

class BacnetSettingsScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Paramètres',
		headerLeft: (
			<TouchableOpacity
				activeOpacity={0.5}
				onPress={() => navigation.navigate('Temperature')}>
				<BackIcon style={styles.backBtn} color={Colors.primaryText} size={32} />
			</TouchableOpacity>
		)
	});

	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<SafeAreaView style={styles.safearea}>
				<ScrollView style={styles.container}>
					<List style={styles.listContainer}>
						<ListItem itemHeader first style={styles.listHeader} />
						<ListItem
							last
							button
							onPress={() => this.props.navigation.navigate('BacnetSettings')}
							style={styles.rowContainer}>
							<Left>
								<Text>Gestion Bacnet</Text>
							</Left>
							<Right>
								<Icon name="arrow-forward" />
							</Right>
						</ListItem>
					</List>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	safearea: {
		flex: 1,
		backgroundColor: Colors.appBackground
	},
	container: {
		flex: 1
	},
	backBtn: {
		marginLeft: Platform.OS === 'ios' ? 10 : 0
	},
	listContainer: {
		flex: 1,
		backgroundColor: '#fff'
	},
	listHeader: {
		backgroundColor: Colors.appBackground
	},
	rowContainer: {
		flex: 1
	}
});

export default BacnetSettingsScreen;
