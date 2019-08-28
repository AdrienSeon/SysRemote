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
	TouchableOpacity,
	TouchableNativeFeedback
} from 'react-native';
import { Header } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import debounce from 'debounce';
import * as Animatable from 'react-native-animatable';
import Colors from '../constants/Colors';
import BackIcon from '../components/icons/Back';
import SelectNone from '../components/icons/SelectNone';
import SingleLightCommand from '../components/SingleLightCommand';
import Switch from '../components/Switch';
import Slider from '../components/Slider';
import * as Actions from '../actions';
import store from '../store';

const { width } = Dimensions.get('window');

class LightsListScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Luminaires',
		headerBackImage:
			Platform.OS === 'ios' ? (
				<TouchableOpacity activeOpacity={0.5}>
					<BackIcon style={styles.backBtn} color={Colors.primaryText} size={32} />
				</TouchableOpacity>
			) : (
				<BackIcon style={styles.backBtn} color={Colors.primaryText} size={32} />
			),
		headerRight: navigation.getParam('selectNoneButtonDisplay', false) ? (
			Platform.OS === 'ios' ? (
				<TouchableOpacity activeOpacity={0.5} onPress={navigation.getParam('deselectAll')}>
					<SelectNone style={styles.rightBtn} color={Colors.primaryText} size={32} />
				</TouchableOpacity>
			) : (
				<TouchableNativeFeedback
					background={TouchableNativeFeedback.Ripple(Colors.primaryTextRipple, true)}
					onPress={navigation.getParam('deselectAll')}>
					<SelectNone style={styles.rightBtn} color={Colors.primaryText} size={32} />
				</TouchableNativeFeedback>
			)
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
			selected: (new Map(): Map<string, boolean>)
		};

		if (Platform.OS === 'android') {
			UIManager.setLayoutAnimationEnabledExperimental &&
				UIManager.setLayoutAnimationEnabledExperimental(true);
		}
	}

	debouncedSetSingleLightSliderValue = debounce((value, index) => {
		this.props.actions.setSingleLightSliderValue(value, index);
	}, 200);

	debouncedSetSingleLightSwitchValue = debounce((value, index) => {
		this.props.actions.setSingleLightSwitchValue(value, index);
	}, 200);

	debouncedSetSelectedLightSliderValue = debounce((value) => {
		this.props.actions.setSelectedLightsSliderValue(value);
	}, 200);

	debouncedSetSelectedLightSwitchValue = debounce((value) => {
		this.props.actions.setSelectedLightsSwitchValue(value);
	}, 200);

	componentDidMount() {
		this.props.navigation.setParams({ deselectAll: this.deselectAll });
		this.getData();

		this.interval = setInterval(() => {
			this.getData();
		}, 30000);
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

	componentWillUnmount() {
		clearInterval(this.interval);
		this.deselectAll();
	}

	deselectAll = () => {
		this.props.actions.setDeselectAll();

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
		const items = this.props.lightsData;
		const index = items.indexOf(item);
		this.props.actions.setSingleLightSelected(!item.selected, index);

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
			switchValue={item.UIswitchValue}
			sliderValue={item.UIsliderValue}
			isDimmable={item.isDimmable}
			item={item}
			onChildSliderValueChange={this.handleChildSliderValue}
			onChildSwitchValueChange={this.handleChildSwitchValue}
		/>
	);

	keyExtractor = (item) => item.id;

	handleMainSliderValue = (value) => {
		this.props.actions.setSelectedLightsUIsliderValue(value);
		this.props.lightsData.forEach((light, index) => {
			if (light.selected) {
				this.props.actions.setSingleLightUIsliderValue(value, index);
				this.debouncedSetSelectedLightSliderValue(value);
			}
		});
	};

	handleMainSwitchValue = (value) => {
		this.props.actions.setSelectedLightsUIswitchValue(value);
		this.props.lightsData.forEach((light, index) => {
			if (light.selected) {
				this.props.actions.setSingleLightUIswitchValue(value, index);
				this.debouncedSetSelectedLightSwitchValue(value);
			}
		});
	};

	handleChildSliderValue = (item, value) => {
		const items = this.props.lightsData;
		const index = items.indexOf(item);
		this.props.actions.setSingleLightUIsliderValue(value, index);
		this.debouncedSetSingleLightSliderValue(value, index);
	};

	handleChildSwitchValue = (item, value) => {
		const items = this.props.lightsData;
		const index = items.indexOf(item);
		this.props.actions.setSingleLightUIswitchValue(value, index);
		this.debouncedSetSingleLightSwitchValue(value, index);
	};
	getData() {
		this.props.actions.getAllLights();
		this.props.actions.getLightsAuto();
	}
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
							data={this.props.lightsData}
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
								value={this.props.selectedLights.UIswitchValue}
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
								value={this.props.selectedLights.UIsliderValue}
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

function mapStateToProps({ lightsScreenReducer }) {
	const { lightsData, selectedLights } = lightsScreenReducer;
	return {
		lightsData,
		selectedLights
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LightsListScreen);
