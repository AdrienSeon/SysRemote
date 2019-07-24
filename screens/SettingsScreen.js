import React, { Component } from 'react';
import { Platform, SafeAreaView, ScrollView, Text, StyleSheet, StatusBar } from 'react-native';
import { List, ListItem, Left, Right, Icon } from 'native-base';
import Colors from '../constants/Colors';
import BackIcon from '../components/icons/Back';
import BacnetSettingsRow from '../components/BacnetSettingsRow';

class BacnetSettingsScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {

		}
	}
	
	static navigationOptions = ({ navigation }) => ({
		title: 'Paramètres',
		headerLeft: <BackIcon style={styles.backBtn} color={Colors.primaryText} size='32' onPress={() => navigation.navigate('Temperature')}/>,
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
			<SafeAreaView style={styles.safearea}>
				<ScrollView style={styles.container}>
					<List style={styles.listContainer}>
						<ListItem itemHeader first style={styles.listHeader}>

						</ListItem>
						<ListItem last button onPress={() => this.props.navigation.navigate('BacnetSettings')} style={styles.rowContainer}>
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
		backgroundColor: Colors.appBackground,
	},
	container: {
		flex: 1,
	},
	backBtn: {
		marginLeft: Platform.OS === 'ios' ? 10 : 0,
	},
	listContainer: {
		flex: 1,
		backgroundColor: '#fff'
	},
	listHeader: {
		backgroundColor: Colors.appBackground
	},
	rowContainer: {
		flex: 1,
	},
});

export default BacnetSettingsScreen;