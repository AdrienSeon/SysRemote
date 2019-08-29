import {
	GET_ALL_LIGHTS_SUCCESS,
	GET_ALL_LIGHTS_FAIL,
	GET_LIGHTS_AUTO_SUCCESS,
	GET_LIGHTS_AUTO_FAIL,
	SET_LIGHTS_AUTO_SUCCESS,
	SET_ALL_LIGHTS_SUCCESS,
	SET_ALL_LIGHTS_SLIDER_VALUE_SUCCESS,
	SET_ALL_LIGHTS_SWITCH_VALUE_SUCCESS,
	SET_ALL_LIGHTS_UI_SLIDER_VALUE,
	SET_ALL_LIGHTS_UI_SWITCH_VALUE,
	SET_ALL_LIGHTS_FAIL,
	GET_SINGLE_LIGHT_SUCCESS,
	SET_SINGLE_LIGHT_SLIDER_VALUE_SUCCESS,
	SET_SINGLE_LIGHT_SWITCH_VALUE_SUCCESS,
	SET_SINGLE_LIGHT_UI_SLIDER_VALUE,
	SET_SINGLE_LIGHT_UI_SWITCH_VALUE,
	SET_SINGLE_LIGHT_FAIL,
	SET_SINGLE_LIGHT_SELECTED,
	SET_DESELECT_ALL_LIGHTS,
	SET_SELECTED_LIGHTS_UI_SLIDER_VALUE,
	SET_SELECTED_LIGHTS_UI_SWITCH_VALUE
} from '../actions/types';
import update from 'immutability-helper';

const INITAL_STATE = {
	allLights: {
		isLoaded: false,
		auto: true,
		switchValue: false,
		sliderValue: '--',
		UIsliderValue: 0,
		UIswitchValue: false,
		unit: ''
	},
	selectedLights: {
		isLoaded: false,
		UIsliderValue: 0,
		UIswitchValue: false
	},
	lightsAuto: {
		isLoaded: false,
		value: false
	},
	lightsData: [
		{
			id: 'light1',
			name: 'Luminaire 1',
			isDimmable: true,
			switchValue: false,
			sliderValue: '--',
			UIsliderValue: 0,
			UIswitchValue: false,
			unit: '',
			objectInstance: 200,
			selected: false,
			isLoaded: false
		},
		{
			id: 'light2',
			name: 'Luminaire 2',
			isDimmable: true,
			switchValue: false,
			sliderValue: '--',
			UIsliderValue: 0,
			UIswitchValue: false,
			unit: '',
			objectInstance: 201,
			selected: false,
			isLoaded: false
		},
		{
			id: 'light3',
			name: 'Luminaire 3',
			isDimmable: true,
			switchValue: false,
			sliderValue: '--',
			UIsliderValue: 0,
			UIswitchValue: false,
			unit: '',
			objectInstance: 202,
			selected: false,
			isLoaded: false
		},
		{
			id: 'light4',
			name: 'Luminaire 4',
			isDimmable: true,
			switchValue: false,
			sliderValue: '--',
			UIsliderValue: 0,
			UIswitchValue: false,
			unit: '',
			objectInstance: 203,
			selected: false,
			isLoaded: false
		},
		{
			id: 'light5',
			name: 'Luminaire 5',
			isDimmable: true,
			switchValue: false,
			sliderValue: '--',
			UIsliderValue: 0,
			UIswitchValue: false,
			unit: '',
			objectInstance: 214,
			selected: false,
			isLoaded: false
		},
		{
			id: 'light6',
			name: 'Luminaire 6',
			isDimmable: true,
			switchValue: false,
			sliderValue: '--',
			UIsliderValue: 0,
			UIswitchValue: false,
			unit: '',
			objectInstance: 215,
			selected: false,
			isLoaded: false
		},
		{
			id: 'light7',
			name: 'Luminaire 7',
			isDimmable: true,
			switchValue: false,
			sliderValue: '--',
			UIsliderValue: 0,
			UIswitchValue: false,
			unit: '',
			objectInstance: 216,
			selected: false,
			isLoaded: false
		},
		{
			id: 'light8',
			name: 'Luminaire 8',
			isDimmable: true,
			switchValue: false,
			sliderValue: '--',
			UIsliderValue: 0,
			UIswitchValue: false,
			unit: '',
			objectInstance: 217,
			selected: false,
			isLoaded: false
		}
	]
};

export default (state = INITAL_STATE, action) => {
	switch (action.type) {
		case GET_ALL_LIGHTS_SUCCESS:
			return {
				...state,
				allLights: action.payload,
				selectedLights: {
					...state.selectedLights,
					UIsliderValue: action.payload.UIsliderValue,
					UIswitchValue: action.payload.UIswitchValue
				}
			};
		case GET_ALL_LIGHTS_FAIL:
			return { ...state };
		case GET_LIGHTS_AUTO_SUCCESS:
			return {
				...state,
				lightsAuto: action.payload
			};
		case GET_LIGHTS_AUTO_FAIL:
			return { ...state };
		case SET_LIGHTS_AUTO_SUCCESS:
			return {
				...state,
				lightsAuto: {
					...state.lightsAuto,
					value: action.payload.value
				}
			};
		case SET_ALL_LIGHTS_SLIDER_VALUE_SUCCESS:
			return {
				...state,
				allLights: {
					...state.allLights,
					sliderValue: action.payload.sliderValue,
					switchValue: action.payload.switchValue
				}
			};
		case SET_ALL_LIGHTS_UI_SLIDER_VALUE:
			return {
				...state,
				allLights: {
					...state.allLights,
					UIsliderValue: action.payload.UIsliderValue,
					UIswitchValue: action.payload.UIswitchValue
				},
				lightsAuto: { ...state.lightsAuto, value: false },
				selectedLights: {
					...state.selectedLights,
					UIsliderValue: action.payload.UIsliderValue,
					UIswitchValue: action.payload.UIswitchValue
				}
			};
		case SET_ALL_LIGHTS_SWITCH_VALUE_SUCCESS:
			return {
				...state,
				allLights: {
					...state.allLights,
					sliderValue: action.payload.sliderValue,
					switchValue: action.payload.switchValue
				}
			};
		case SET_ALL_LIGHTS_UI_SWITCH_VALUE:
			return {
				...state,
				allLights: {
					...state.allLights,
					UIsliderValue: action.payload.UIsliderValue,
					UIswitchValue: action.payload.UIswitchValue
				},
				lightsAuto: { ...state.lightsAuto, value: false },
				selectedLights: {
					...state.selectedLights,
					UIsliderValue: action.payload.UIsliderValue,
					UIswitchValue: action.payload.UIswitchValue
				}
			};
		case SET_ALL_LIGHTS_SUCCESS:
			return { ...state, allLights: action.payload };
		case SET_ALL_LIGHTS_FAIL:
			return { ...state };
		case GET_SINGLE_LIGHT_SUCCESS:
			const newLightsData = update(state.lightsData, {
				[action.payload.index]: {
					isLoaded: { $set: action.payload.isLoaded },
					isDimmable: { $set: action.payload.isDimmable },
					switchValue: { $set: action.payload.switchValue },
					sliderValue: { $set: action.payload.sliderValue },
					UIswitchValue: { $set: action.payload.UIswitchValue },
					UIsliderValue: { $set: action.payload.UIsliderValue },
					unit: { $set: action.payload.unit }
				}
			});
			return { ...state, lightsData: newLightsData };
		case SET_SINGLE_LIGHT_SLIDER_VALUE_SUCCESS:
			const newSingleLightSliderData = update(state.lightsData, {
				[action.payload.index]: {
					sliderValue: { $set: action.payload.sliderValue },
					switchValue: { $set: action.payload.switchValue }
				}
			});
			return { ...state, lightsData: newSingleLightSliderData };
		case SET_SINGLE_LIGHT_SWITCH_VALUE_SUCCESS:
			const newSingleLightSwitchData = update(state.lightsData, {
				[action.payload.index]: {
					sliderValue: { $set: action.payload.sliderValue },
					switchValue: { $set: action.payload.switchValue }
				}
			});
			return { ...state, lightsData: newSingleLightSwitchData };
		case SET_SINGLE_LIGHT_UI_SLIDER_VALUE:
			const newUIsingleLightSliderData = update(state.lightsData, {
				[action.payload.index]: {
					UIsliderValue: { $set: action.payload.UIsliderValue },
					UIswitchValue: { $set: action.payload.UIswitchValue }
				}
			});
			return { ...state, lightsData: newUIsingleLightSliderData };
		case SET_SINGLE_LIGHT_UI_SWITCH_VALUE:
			const newUIsingleLightSwitchData = update(state.lightsData, {
				[action.payload.index]: {
					UIsliderValue: { $set: action.payload.UIsliderValue },
					UIswitchValue: { $set: action.payload.UIswitchValue }
				}
			});
			return { ...state, lightsData: newUIsingleLightSwitchData };
		case SET_SINGLE_LIGHT_FAIL:
			return { ...state };
		case SET_SINGLE_LIGHT_SELECTED:
			const newSingleLightSelectedData = update(state.lightsData, {
				[action.payload.index]: {
					selected: { $set: action.payload.selected }
				}
			});
			return { ...state, lightsData: newSingleLightSelectedData };
		case SET_DESELECT_ALL_LIGHTS:
			const newUnselectedData = update(state.lightsData, {
				$apply: (items) => {
					return items.map((item) => {
						return update(item, {
							selected: {
								$set: false
							}
						});
					});
				}
			});
			return { ...state, lightsData: newUnselectedData };
		case SET_SELECTED_LIGHTS_UI_SLIDER_VALUE:
			return {
				...state,
				selectedLights: {
					...state.selectedLights,
					UIsliderValue: action.payload.UIsliderValue,
					UIswitchValue: action.payload.UIswitchValue
				}
			};
		case SET_SELECTED_LIGHTS_UI_SWITCH_VALUE:
			return {
				...state,
				selectedLights: {
					...state.selectedLights,
					UIsliderValue: action.payload.UIsliderValue,
					UIswitchValue: action.payload.UIswitchValue
				}
			};
		default:
			return state;
	}
};

/*		case SET_DESELECT_ALL:
			const newUnselectedData = update(state.lightsData, {
				$apply: (items) => {
					return items.map((item) => {
						return update(item, {
							subItems: {
								$apply: (subItems) => {
									return subItems.map((subItem) => {
										return update(subItem, {
											val: {
												$set: false
											}
										});
									});
								}
							}
						});
					});
				}
			});
			return { ...state, lightsData: newUnselectedData };*/
