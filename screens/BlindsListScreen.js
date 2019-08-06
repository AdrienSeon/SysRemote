import React from 'react';
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
import SingleBlindCommand from '../components/SingleBlindCommand';
import Slider from '../components/Slider';
import BlindsLeftIcon from '../components/icons/BlindsLeft';
import BlindsMiddleIcon from '../components/icons/BlindsMiddle';
import BlindsRightIcon from '../components/icons/BlindsRight';
import BlindsOrientationButton from '../components/BlindsOrientationButton';

const { width } = Dimensions.get('window');

class BlindsListScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Stores',
		headerBackImage: (
			<TouchableOpacity activeOpacity={0.5}>
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
			sliderValue: 80,
			orientationButtons: [
				{
					key: 'left',
					checked: true,
					icon: BlindsLeftIcon
				},
				{
					key: 'middle',
					checked: false,
					icon: BlindsMiddleIcon
				},
				{
					key: 'right',
					checked: false,
					icon: BlindsRightIcon
				}
			],
			collapsed: true,
			rightPannel: -100,
			width,
			selected: (new Map(): Map<string, boolean>),
			blindsData: [
				{
					id: 'blind1',
					name: 'Store 1',
					orientationButtons: [
						{
							key: 'left',
							checked: true,
							icon: BlindsLeftIcon
						},
						{
							key: 'middle',
							checked: false,
							icon: BlindsMiddleIcon
						},
						{
							key: 'right',
							checked: false,
							icon: BlindsRightIcon
						}
					],
					sliderValue: 80,
					selected: false
				},
				{
					id: 'blind2',
					name: 'Store 2',
					orientationButtons: [
						{
							key: 'left',
							checked: true,
							icon: BlindsLeftIcon
						},
						{
							key: 'middle',
							checked: false,
							icon: BlindsMiddleIcon
						},
						{
							key: 'right',
							checked: false,
							icon: BlindsRightIcon
						}
					],
					sliderValue: 80,
					selected: false
				},
				{
					id: 'blind3',
					name: 'Store 3',
					orientationButtons: [
						{
							key: 'left',
							checked: true,
							icon: BlindsLeftIcon
						},
						{
							key: 'middle',
							checked: false,
							icon: BlindsMiddleIcon
						},
						{
							key: 'right',
							checked: false,
							icon: BlindsRightIcon
						}
					],
					sliderValue: 80,
					selected: false
				},
				{
					id: 'blind4',
					name: 'Store 4',
					orientationButtons: [
						{
							key: 'left',
							checked: true,
							icon: BlindsLeftIcon
						},
						{
							key: 'middle',
							checked: false,
							icon: BlindsMiddleIcon
						},
						{
							key: 'right',
							checked: false,
							icon: BlindsRightIcon
						}
					],
					sliderValue: 80,
					selected: false
				},
				{
					id: 'blind5',
					name: 'Store 5',
					orientationButtons: [
						{
							key: 'left',
							checked: true,
							icon: BlindsLeftIcon
						},
						{
							key: 'middle',
							checked: false,
							icon: BlindsMiddleIcon
						},
						{
							key: 'right',
							checked: false,
							icon: BlindsRightIcon
						}
					],
					sliderValue: 80,
					selected: false
				},
				{
					id: 'blind6',
					name: 'Store 6',
					orientationButtons: [
						{
							key: 'left',
							checked: true,
							icon: BlindsLeftIcon
						},
						{
							key: 'middle',
							checked: false,
							icon: BlindsMiddleIcon
						},
						{
							key: 'right',
							checked: false,
							icon: BlindsRightIcon
						}
					],
					sliderValue: 80,
					selected: false
				},
				{
					id: 'blind7',
					name: 'Store 7',
					orientationButtons: [
						{
							key: 'left',
							checked: true,
							icon: BlindsLeftIcon
						},
						{
							key: 'middle',
							checked: false,
							icon: BlindsMiddleIcon
						},
						{
							key: 'right',
							checked: false,
							icon: BlindsRightIcon
						}
					],
					sliderValue: 80,
					selected: false
				},
				{
					id: 'blind8',
					name: 'Store 8',
					orientationButtons: [
						{
							key: 'left',
							checked: true,
							icon: BlindsLeftIcon
						},
						{
							key: 'middle',
							checked: false,
							icon: BlindsMiddleIcon
						},
						{
							key: 'right',
							checked: false,
							icon: BlindsRightIcon
						}
					],
					sliderValue: 80,
					selected: false
				}
			]
		};

		if (Platform.OS === 'android') {
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
		console.log(JSON.stringify(this.state.blindsData[0],0,4))
	}

	deselectAll = () => {
		const items = this.state.blindsData;
		items.forEach((item) => {
			item.selected = false;
		});
		this.setState({ blindsData: items });

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
		const items = this.state.blindsData;
		const index = items.indexOf(item);
		items[index].selected = !items[index].selected;
		this.setState({ blindsData: items });

		this.setState((state) => {
			const selected = new Map(state.selected);
			this.state.selected.has(item.id)
				? selected.delete(item.id, !selected.get(item.id))
				: selected.set(item.id, !selected.get(item.id));
			return { selected };
		});
	};

	renderItem = ({ item }) => (
		<SingleBlindCommand
			id={item.id}
			onPressItem={this.onPressItem}
			selected={item.selected}
			name={item.name}
			collapsed={this.state.collapsed}
			sliderValue={item.sliderValue}
			item={item}
			onChildSliderValueChange={this.handleChildSliderValue}
			orientationButtons={item.orientationButtons}
		/>
	);

	keyExtractor = (item) => item.id;

	handleMainSliderValue = (value) => {
		this.setState({ sliderValue: value });

		this.setState((state) => {
			const blinds = state.blindsData.map((blind) => {
				if (blind.selected) {
					blind.sliderValue = value;
				}
				return blind;
			});
			return { blinds };
		});
	};

	handleChildSliderValue = (item, value) => {
		const items = this.state.blindsData;
		const index = items.indexOf(item);

		items[index].sliderValue = value;

		this.setState({ blindsData: items });
	};

	handleMainOrientationPress = (mainButton) => {
		const mainButtons = this.state.orientationButtons;

		mainButtons.forEach((button) => {
			button.checked = false;
		});

		const index = mainButtons.indexOf(mainButton);
		mainButtons[index].checked = true;

		this.setState({ orientationButtons: mainButtons });

		this.setState((state) => {
			const blinds = state.blindsData.map((blind) => {
				if (blind.selected) {
					blind.orientationButtons.forEach((childButton) => {
						childButton.checked = false;
					});
					blind.orientationButtons[index].checked = true;
				}
				return blind;
			});
			return { blinds };
		});

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
							data={this.state.blindsData}
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
						<View style={styles.orientationContainer}>
							{this.state.orientationButtons.map((item) => {
								const Icon = item.icon;
								return (
									<BlindsOrientationButton
										key={item.key}
										onPressItem={this.handleMainOrientationPress}
										checked={item.checked}
										item={item}
										checkedComponent={
											<Icon
												backgroundColor={Colors.primaryBrand}
												iconColor={Colors.inverted}
												size={48}
											/>
										}
										uncheckedComponent={
											<Icon
												backgroundColor={Colors.inverted}
												iconColor={Colors.primaryBrand}
												size={48}
											/>
										}
									/>
								);
							})}
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
								trackSizeProp={40}
								thumbSizeProp={40}
								maximumTrackTintColor={Colors.inverted}
								blindsBackground
								orientation="vertical"
								showValueIndicator
								valueIndicatorPosition="left"
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
	backBtn: {
		marginLeft: Platform.OS === 'ios' ? 10 : 0
	},
	rightBtn: {
		marginRight: 10
	},
	orientationContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	sliderContainer: {
		flex: 1,
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

export default BlindsListScreen;
