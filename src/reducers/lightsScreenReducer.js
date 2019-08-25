import {
	GET_ALLLIGHTS_SUCCESS,
	GET_SINGLELIGHT_SUCCESS,
	GET_ALLLIGHTS_FAIL,
	GET_LIGHTS_AUTO_SUCCESS,
	GET_LIGHTS_AUTO_FAIL,
	SET_LIGHTS_AUTO_SUCCESS,
	SET_ALLLIGHTS_SUCCESS,
	SET_ALLLIGHTSSLIDERVALUE_SUCCESS,
	SET_ALLLIGHTSSWITCHVALUE_SUCCESS,
	SET_ALLLIGHTSUISLIDERVALUE_SUCCESS,
	SET_ALLLIGHTSUISWITCHVALUE_SUCCESS,
	SET_ALLLIGHTS_FAIL
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
			selected: false,
			isLoaded: false
		}
	]
};

export default (state = INITAL_STATE, action) => {
	switch (action.type) {
		case GET_ALLLIGHTS_SUCCESS:
			return { ...state, allLights: action.payload };
		case GET_ALLLIGHTS_FAIL:
			return { ...state };
		case GET_SINGLELIGHT_SUCCESS:
			const index = action.payload.index - 1;
			const newLightsData = update(state.lightsData, {
				[index]: {
					isLoaded: { $set: action.payload.isLoaded },
					isDimmable: { $set: action.payload.isDimmable },
					switchValue: { $set: action.payload.switchValue },
					sliderValue: { $set: action.payload.sliderValue },
					unit: { $set: action.payload.unit }
				}
			});
			return { ...state, lightsData: newLightsData };
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
		case SET_ALLLIGHTSSLIDERVALUE_SUCCESS:
			return {
				...state,
				allLights: {
					...state.allLights,
					sliderValue: action.payload.sliderValue,
					switchValue: action.payload.switchValue
				}
			};
		case SET_ALLLIGHTSUISLIDERVALUE_SUCCESS:
			return {
				...state,
				allLights: {
					...state.allLights,
					UIsliderValue: action.payload.UIsliderValue,
					UIswitchValue: action.payload.UIswitchValue
				},
				lightsAuto: { ...state.lightsAuto, value: false }
			};
		case SET_ALLLIGHTSSWITCHVALUE_SUCCESS:
			return {
				...state,
				allLights: {
					...state.allLights,
					sliderValue: action.payload.sliderValue,
					switchValue: action.payload.switchValue
				}
			};
		case SET_ALLLIGHTSUISWITCHVALUE_SUCCESS:
			return {
				...state,
				allLights: {
					...state.allLights,
					UIsliderValue: action.payload.UIsliderValue,
					UIswitchValue: action.payload.UIswitchValue
				},
				lightsAuto: { ...state.lightsAuto, value: false }
			};
		case SET_ALLLIGHTS_SUCCESS:
			return { ...state, allLights: action.payload };
		case SET_ALLLIGHTS_FAIL:
			return { ...state };
		default:
			return state;
	}
};
