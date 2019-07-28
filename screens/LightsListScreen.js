import React, { Component } from 'react';
import { Platform, SafeAreaView, ScrollView, View, StyleSheet, FlatList, Text } from 'react-native';
import { Header } from 'react-navigation';
import Colors from '../constants/Colors';
import BackIcon from '../components/icons/Back';
import SingleLightCommand from '../components/SingleLightCommand';

class LightsListScreen extends Component {
	static navigationOptions = () => ({
		title: 'Luminaires',
		headerBackImage: <BackIcon style={styles.backBtn} color={Colors.primaryText} size={32} />
	});

	constructor(props) {
		super(props);

		this.state = {
			light1Selected: false,
			light2Selected: false,
			light3Selected: false,
			light4Selected: false,
			light5Selected: false,
			light6Selected: false,
			light7Selected: false,
			light8Selected: false,
			isSliderVisible: true,
			selected: (new Map(): Map<string, boolean>),
			data: [{key: 'light1', name: 'Luminaire 1'}, {key: 'light2', name: 'Luminaire 2'}, {key: 'light3', name: 'Luminaire 3'}, {key: 'light4', name: 'Luminaire 4'}, {key: 'light5', name: 'Luminaire 5'}, {key: 'light6', name: 'Luminaire 6'}, {key: 'light7', name: 'Luminaire 7'}, {key: 'light8', name: 'Luminaire 8'}]
		};
	}

	_keyExtractor = (item, index) => item.id;

	_onPressItem = (id: string) => {
		// updater functions are preferred for transactional updates
		this.setState((state) => {
			// copy the map rather than modifying state.
			const selected = new Map(state.selected);
			selected.set(id, !selected.get(id)); // toggle
			return {selected};
		});
	};

	_renderItem = ({item}) => (
		<SingleLightCommand
			id={item.id}
			onPressItem={this._onPressItem}
			selected={!!this.state.selected.get(item.id)}
			name={item.name}
		/>
	);

	render() {
		return (
			<SafeAreaView style={styles.safearea}>
				<View style={styles.container}>
					<FlatList
						data={this.state.data}
						extraData={this.state}
						renderItem={this._renderItem}
						numColumns={2}
						contentContainerStyle={{flex:1}}
					/>
					<View style={{flex:1}}>
					<Text>text</Text>
					</View>
				</View>
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
		flex: 1,
		marginTop: Platform.OS === 'ios' ? Header.HEIGHT - 20 : Header.HEIGHT + 24,
		flexDirection: 'row',
	},
	backBtn: {
		marginLeft: Platform.OS === 'ios' ? 10 : 0
	},
	singleCommand: {}
});

export default LightsListScreen;
