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
	UIManager,
	Dimensions
} from 'react-native';
import { Header } from 'react-navigation';
import { FlatGrid } from 'react-native-super-grid';
import Colors from '../constants/Colors';
import BackIcon from '../components/icons/Back';
import SingleLightCommand from '../components/SingleLightCommand';
import Switch from '../components/Switch';
import Slider from '../components/Slider';

const { width } = Dimensions.get('window');

class LightsListScreen extends Component {
	static navigationOptions = () => ({
		title: 'Luminaires',
		headerBackImage: <BackIcon style={styles.backBtn} color={Colors.primaryText} size={32} />
	});

	constructor(props) {
		super(props);

		this.state = {
			switchValue: true,
			sliderValue: 80,
			collapsed: true,
			rightPannel: -100,
			width: width,
			selected: (new Map(): Map<string, boolean>),
			data: [
				{ id: 'light1', name: 'Luminaire 1' },
				{ id: 'light2', name: 'Luminaire 2' },
				{ id: 'light3', name: 'Luminaire 3' },
				{ id: 'light4', name: 'Luminaire 4' },
				{ id: 'light5', name: 'Luminaire 5' },
				{ id: 'light6', name: 'Luminaire 6' },
				{ id: 'light7', name: 'Luminaire 7' },
				{ id: 'light8', name: 'Luminaire 8' }
			]
		};

		if (Platform.OS === 'android') {
			UIManager.setLayoutAnimationEnabledExperimental(true);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.selected !== this.state.selected) {
			if (this.state.selected.size > 0 && this.state.collapsed) {
				this.setState({ collapsed: false });
				this.changeLayout();
			}
			if (this.state.selected.size == 0 && !this.state.collapsed) {
				this.setState({ collapsed: true });
				this.changeLayout();
			}
		}
	}

	changeLayout = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		if (this.state.collapsed) {
			this.setState({ rightPannel: 0 });
			this.setState({ width: width - 100 });
		} else {
			this.setState({ rightPannel: -100 });
			this.setState({ width: width });
		}
	};

	onPressItem = (id: string) => {
		this.setState((state) => {
			const selected = new Map(state.selected);
			this.state.selected.has(id)
				? selected.delete(id, !selected.get(id))
				: selected.set(id, !selected.get(id));
			return { selected };
		});
	};

	renderItem = ({ item }) => (
		<SingleLightCommand
			id={item.id}
			onPressItem={this.onPressItem}
			selected={!!this.state.selected.get(item.id)}
			name={item.name}
			collapsed={this.state.collapsed}
		/>
	);

	handleSliderValue(value) {
		this.setState({ sliderValue: value });

		if (value > 0) {
			this.setState({ switchValue: true });
		} else {
			this.setState({ switchValue: false });
		}
	}

	handleSwitchValue(value) {
		this.setState({ switchValue: value });

		if (value) {
			this.setState({ sliderValue: 100 });
		} else {
			this.setState({ sliderValue: 0 });
		}
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
						<FlatGrid
							itemDimension={this.state.collapsed ? 160 : 90}
							contentContainerStyle={{
								alignItems: 'center',
								//backgroundColor: 'green'
							}}
							//staticDimension={this.state.collapsed ? undefined : 200}
							items={this.state.data}
							extraData={this.state}
							renderItem={this.renderItem}
						/>
					</View>
					<View
						style={{
							//backgroundColor: 'red',
							paddingVertical: 30,
							width: 100,
							position: 'absolute',
							top: 10,
							bottom: 0,
							right: this.state.rightPannel
						}}>
						<View style={styles.switchContainer}>
							<Switch
								onChange={(value) => this.handleSwitchValue(value)}
								value={this.state.switchValue}
								trackOnColor={
									this.props.selected
										? Colors.primaryBrandDark
										: Colors.primaryBrand50
								}
								trackOffColor={
									this.props.selected
										? Colors.primaryBrandDark
										: Colors.primaryBrand50
								}
								knobOnColor={
									this.props.selected ? Colors.inverted : Colors.primaryBrand
								}
								knobOffColor={
									this.props.selected ? Colors.inverted : Colors.primaryBrand
								}
								knobSize={28}
								trackSize={32}
								trackStyle={styles.switchTrackStyle}
								knobStyle={styles.switchKnobStyle}
							/>
						</View>
						<View style={styles.sliderContainer}>
							<Slider
								value={this.state.sliderValue}
								onValueChange={(value) => this.handleSliderValue(value)}
								animateTransitions
								animationType="spring"
								minimumValue={0}
								maximumValue={100}
								step={1}
								orientation="vertical"
								trackSizeProp={50}
								thumbSizeProp={50}
								maximumTrackTintColor={Colors.inverted}
								gradientInnerTrack
								gradientColor={[Colors.inverted, Colors.tertiaryBrand]}
								showValueIndicator
								valueIndicatorPosition="top"
								valueIndicatorTextColor={Colors.tertiaryText}
								valueIndicatorStyle={styles.sliderValueIndicatorStyle}
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
	container: {},
	backBtn: {
		marginLeft: Platform.OS === 'ios' ? 10 : 0
	},
	switchContainer: {
		flex: 1,
		alignItems: 'center'
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
		flex: 3,
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
	lightSliderthumbStyle: {
		shadowColor: 'rgba(100, 100, 100, 0.2)',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 2,
		shadowOpacity: 1
	},
	lightSliderValueIndicatorStyle: {
		fontFamily: 'OpenSans',
		fontSize: 14,
		left: -10
	}
});

export default LightsListScreen;
