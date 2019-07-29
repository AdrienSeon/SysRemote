import React, { Component } from 'react';
import {
	Platform,
	SafeAreaView,
	ScrollView,
	View,
	StyleSheet,
	FlatList,
	Text,
	Button,
	Animated,
	LayoutAnimation,
	UIManager
} from 'react-native';
import { Header } from 'react-navigation';
import Colors from '../constants/Colors';
import BackIcon from '../components/icons/Back';
import SingleLightCommand from '../components/SingleLightCommand';
import { FlatGrid } from 'react-native-super-grid';

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
			collapsed: true,

			flex: 0,
			selected: [],
			data: [
				{ key: 'light1', name: 'Luminaire 1' },
				{ key: 'light2', name: 'Luminaire 2' },
				{ key: 'light3', name: 'Luminaire 3' },
				{ key: 'light4', name: 'Luminaire 4' },
				{ key: 'light5', name: 'Luminaire 5' },
				{ key: 'light6', name: 'Luminaire 6' },
				{ key: 'light7', name: 'Luminaire 7' },
				{ key: 'light8', name: 'Luminaire 8' }
			]
		};

		if (Platform.OS === 'android') {
			UIManager.setLayoutAnimationEnabledExperimental(true);
		}
	}

	_keyExtractor = (item, index) => item.id;

	_onPressItem = (id: string) => {
		// updater functions are preferred for transactional updates
		this.setState((state) => {
			// copy the map rather than modifying state.
			const selected = new Map(state.selected);
			selected.set(id, !selected.get(id)); // toggle
			return { selected };
		});
	};

	_renderItem = ({ item }) => (
		<SingleLightCommand
			key={item.key}
			id={item.id}
			onPressItem={this._onPressItem}
			selected={!!this.state.selected.get(item.id)}
			name={item.name}
		/>
	);

_handleclick = (index, item) => {
        let selectedIndex = this.state.selected.indexOf(index+item.label);
        if(selectedIndex== -1){
          this.setState({selected: [...this.state.selected,index+item.label], selectedColor: item.value})
        }

      }

	handleSliderPanel() {
		this.setState((prevState) => ({ collapsed: !prevState.collapsed }));
		this.changeLayout();
	}

	changeLayout = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		if (this.state.flex == 0) {
			this.setState({ flex: 3 });
		} else {
			this.setState({ flex: 0 });
		}
	};

	testOnPress() {}

	render() {
		return (
			<SafeAreaView style={styles.safearea}>
				<View style={styles.container}>
					<FlatGrid
						itemDimension={160}
						items={this.state.data}
						contentContainerStyle={{ alignItems: 'center', backgroundColor: 'green' }}
						staticDimension={this.state.collapsed ? undefined : 200}
						renderItem={({ item, index }) => (
							<SingleLightCommand
								name={item.name}
								id={item.id}
								key={item.key}
								onPressItem={this._handleclick(index, item)}
								selected={!!this.state.selected.get(item.id)}
							/>
						)}
					/>
					<View
						style={{
							flex: this.state.flex,
							backgroundColor: 'red'
						}}></View>
				</View>
				<View style={{ flex: 1 }}>
					<Button onPress={() => this.handleSliderPanel()} title="Test" color="#000" />
					<Text>{'selected ' + JSON.stringify(this.state.selected)}</Text>
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
		flex: 6,
		marginTop: Platform.OS === 'ios' ? Header.HEIGHT - 20 : Header.HEIGHT + 24,
		flexDirection: 'row'
	},
	backBtn: {
		marginLeft: Platform.OS === 'ios' ? 10 : 0
	},
	singleCommand: {}
});

export default LightsListScreen;
