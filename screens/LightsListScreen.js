import React, { Component } from 'react';
import {
	Platform,
	SafeAreaView,
	View,
	StyleSheet,
	FlatList,
	LayoutAnimation,
	UIManager,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import { Header } from 'react-navigation';
import Colors from '../constants/Colors';
import BackIcon from '../components/icons/Back';
import SelectNone from '../components/icons/SelectNone';
import SingleLightCommand from '../components/SingleLightCommand';
import Switch from '../components/Switch';
import Slider from '../components/Slider';

const { width } = Dimensions.get('window');

class LightsListScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Luminaires',
		headerBackImage: (
			<TouchableOpacity activeOpacity={0}>
				<BackIcon style={styles.backBtn} color={Colors.primaryText} size={32} />
			</TouchableOpacity>
		),
		headerRight: navigation.getParam('selectNoneButtonDisplay', false) ? (
			<TouchableOpacity activeOpacity={0.5} onPress={navigation.getParam('deselectAll')}>
				<SelectNone style={styles.rightBtn} color={Colors.primaryText} size={32} />
			</TouchableOpacity>
		) : null
	});

	constructor(props) {
		super(props);

		this.state = {
			switchValue: true,
			sliderValue: 80,
			collapsed: true,
			rightPannel: -100,
			width,
			layoutAnimationActive: false,
			selected: (new Map(): Map<string, boolean>),
			lightsData: [
				{
					id: 'light1',
					name: 'Luminaire 1',
					switchValue: true,
					sliderValue: 80,
					selected: false
				},
				{
					id: 'light2',
					name: 'Luminaire 2',
					switchValue: true,
					sliderValue: 80,
					selected: false
				},
				{
					id: 'light3',
					name: 'Luminaire 3',
					switchValue: true,
					sliderValue: 80,
					selected: false
				},
				{
					id: 'light4',
					name: 'Luminaire 4',
					switchValue: true,
					sliderValue: 80,
					selected: false
				},
				{
					id: 'light5',
					name: 'Luminaire 5',
					switchValue: true,
					sliderValue: 80,
					selected: false
				},
				{
					id: 'light6',
					name: 'Luminaire 6',
					switchValue: true,
					sliderValue: 80,
					selected: false
				},
				{
					id: 'light7',
					name: 'Luminaire 7',
					switchValue: true,
					sliderValue: 80,
					selected: false
				},
				{
					id: 'light8',
					name: 'Luminaire 8',
					switchValue: true,
					sliderValue: 80,
					selected: false
				}
			]
		};

		if (Platform.OS === 'android') {
			UIManager.setLayoutAnimationEnabledExperimental &&
				UIManager.setLayoutAnimationEnabledExperimental(true);
		}
	}

	componentDidMount() {
		this.props.navigation.setParams({ deselectAll: this.deselectAll });
	}

	componentDidUpdate(prevState) {
		if (prevState.selected !== this.state.selected) {
			if (this.state.selected.size > 0 && this.state.collapsed) {
				this.setState({ collapsed: false });
				this.props.navigation.setParams({ selectNoneButtonDisplay: true });
				this.changeLayout();
			}
			if (this.state.selected.size === 0 && !this.state.collapsed) {
				this.setState({ collapsed: true });
				this.props.navigation.setParams({ selectNoneButtonDisplay: false });
				this.changeLayout();
			}
		}
	}

	deselectAll = () => {
		const items = this.state.lightsData;
		items.forEach((item) => {
			item.selected = false;
		});
		this.setState({ lightsData: items });

		this.setState(() => {
			const selected = new Map(this.state.selected);
			selected.clear();
			return { selected };
		});
	};

	changeLayout = () => {
		LayoutAnimation.configureNext({
			duration: 300,
			create: {
				type: LayoutAnimation.Types.easeInEaseOut,
				property: LayoutAnimation.Properties.opacity
			},
			update: {
				type: LayoutAnimation.Types.easeInEaseOut
			}
		});

		if (this.state.collapsed) {
			this.setState({ rightPannel: 0 });
			this.setState({ width: width - 100 });
		} else {
			this.setState({ rightPannel: -100 });
			this.setState({ width });
		}
	};

	onPressItem = (item) => {
		const items = this.state.lightsData;
		const index = items.indexOf(item);
		items[index].selected = !items[index].selected;
		this.setState({ lightsData: items });

		this.setState((state) => {
			const selected = new Map(state.selected);
			this.state.selected.has(item.id)
				? selected.delete(item.id, !selected.get(item.id))
				: selected.set(item.id, !selected.get(item.id));
			return { selected };
		});
	};

	renderItem = ({ item }) => (
		<SingleLightCommand
			id={item.id}
			onPressItem={this.onPressItem}
			selected={item.selected}
			name={item.name}
			collapsed={this.state.collapsed}
			switchValue={item.switchValue}
			sliderValue={item.sliderValue}
			item={item}
			onChildSliderValueChange={this.handleChildSliderValue}
			onChildSwitchValueChange={this.handleChildSwitchValue}
		/>
	);

	keyExtractor = (item) => item.id;

	handleMainSliderValue = (value) => {
		this.setState({ sliderValue: value });

		this.setState((state) => {
			const lights = state.lightsData.map((light) => {
				if (light.selected) {
					light.sliderValue = value;
					if (value > 0) {
						light.switchValue = true
					} else {
						light.switchValue = false
					}
				}
				return light;
			});
			return { lights };
		});

		if (value > 0) {
			this.setState({ switchValue: true });
		} else {
			this.setState({ switchValue: false });
		}
	};

	handleChildSliderValue = (item, value) => {
		const items = this.state.lightsData;
		const index = items.indexOf(item);

		items[index].sliderValue = value;

		if (value > 0) {
			items[index].switchValue = true;
		} else {
			items[index].switchValue = false;
		}

		this.setState({ lightsData: items });
	};

	handleMainSwitchValue = (value) => {
		this.setState({ switchValue: value });

		this.setState((state) => {
			const lights = state.lightsData.map((light) => {
				if (light.selected) {
					light.switchValue = value;
					if (value) {
						light.sliderValue = 100
					} else {
						light.sliderValue = 0
					}
				}
				return light;
			});
			return { lights };
		});

		if (value) {
			this.setState({ sliderValue: 100 });
		} else {
			this.setState({ sliderValue: 0 });
		}
	};

	handleChildSwitchValue = (item, value) => {
		const items = this.state.lightsData;
		const index = items.indexOf(item);

		items[index].switchValue = value;

		if (value) {
			items[index].sliderValue = 100;
		} else {
			items[index].sliderValue = 0;
		}

		this.setState({ lightsData: items });
	};

	render() {
		return (
			<SafeAreaView style={styles.safearea}>
				<View
					style={{
						flex: 1,
						marginTop: Platform.OS === 'ios' ? Header.HEIGHT - 20 : Header.HEIGHT + 24,
						flexDirection: 'row'
					}}>
					<View
						style={{
							width: this.state.width
						}}>
						<FlatList
							contentContainerStyle={{
								alignItems: 'center'
							}}
							data={this.state.lightsData}
							extraData={this.state}
							renderItem={this.renderItem}
							numColumns={2}
							keyExtractor={this.keyExtractor}
						/>
					</View>
					<View
						style={{
							width: 100,
							position: 'absolute',
							top: 10,
							bottom: 0,
							right: this.state.rightPannel
						}}>
						<View style={styles.switchContainer}>
							<Switch
								onChange={this.handleMainSwitchValue}
								value={this.state.switchValue}
								trackOnColor={Colors.primaryBrand}
								trackOffColor={Colors.inverted}
								knobOnColor={Colors.inverted}
								knobOffColor={Colors.primaryBrand}
								knobSize={28}
								trackSize={32}
								trackStyle={styles.switchTrackStyle}
								knobStyle={styles.switchKnobStyle}
							/>
						</View>
						<View style={styles.sliderContainer}>
							<Slider
								value={this.state.sliderValue}
								onValueChange={this.handleMainSliderValue}
								animateTransitions
								animationType="spring"
								minimumValue={0}
								maximumValue={100}
								step={1}
								orientation="vertical"
								trackSizeProp={40}
								thumbSizeProp={40}
								maximumTrackTintColor={Colors.inverted}
								gradientInnerTrack
								gradientColor={[Colors.inverted, Colors.tertiaryBrand]}
								style={styles.slider}
								thumbTintColor={Colors.inverted}
								thumbStyle={styles.sliderthumbStyle}
							/>
						</View>
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
	backBtn: {
		marginLeft: Platform.OS === 'ios' ? 10 : 0
	},
	rightBtn: {
		marginRight: 10
	},
	switchContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	switchTrackStyle: {
		shadowColor: 'rgba(100, 100, 100, 0.1)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 4,
		shadowOpacity: 1,
		padding: 2
	},
	switchKnobStyle: {
		shadowColor: 'rgba(100, 100, 100, 0.2)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 2,
		shadowOpacity: 1
	},
	sliderContainer: {
		flex: 2,
		paddingBottom: 30,
		alignItems: 'center'
	},
	slider: {
		height: '100%',
		shadowColor: 'rgba(100, 100, 100, 0.1)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 4,
		shadowOpacity: 1
	},
	sliderthumbStyle: {
		shadowColor: 'rgba(100, 100, 100, 0.2)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 2,
		shadowOpacity: 1
	}
});

export default LightsListScreen;
