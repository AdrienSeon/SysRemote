import {
	GET_ALL_BLINDS_SUCCESS,
	GET_ALL_BLINDS_FAIL,
	GET_BLINDS_AUTO_SUCCESS,
	GET_BLINDS_AUTO_FAIL,
	SET_BLINDS_AUTO_SUCCESS,
	SET_ALL_BLINDS_SUCCESS,
	SET_ALL_BLINDS_SLIDER_VALUE_SUCCESS,
	SET_ALL_BLINDS_UI_SLIDER_VALUE,
	SET_ALL_BLINDS_FAIL,
	GET_SINGLE_BLIND_SUCCESS,
	SET_SINGLE_BLIND_SLIDER_VALUE_SUCCESS,
	SET_SINGLE_BLIND_UI_SLIDER_VALUE,
	SET_SINGLE_BLIND_FAIL,
	SET_SINGLE_BLIND_SELECTED,
	SET_DESELECT_ALL_BLINDS,
	SET_SELECTED_BLINDS_UI_SLIDER_VALUE,
} from '../actions/types';
import update from 'immutability-helper';

const INITAL_STATE = {
	allBlinds: {
		isLoaded: false,
		auto: true,
		translationValue: '--',
		rotationValue: '--',
		transUnit: '',
		rotUnit: '',
		UIsliderValue: 0
	},
	selectedBlinds: {
		isLoaded: false,
		UIsliderValue: 0,
	},
	blindsAuto: {
		isLoaded: false,
		value: false
	},
	blindsData: [
		{
			id: 'blind1',
			name: 'Store 1',
			translationValue: '--',
			rotationValue: '--',
			UIsliderValue: 0,
			transUnit: '',
			rotUnit: '',
			objectInstanceTrans: 204,
			objectInstanceRot: 51,
			selected: false,
			isLoaded: false
		},
		{
			id: 'blind2',
			name: 'Store 2',
			translationValue: '--',
			rotationValue: '--',
			UIsliderValue: 0,
			transUnit: '',
			rotUnit: '',
			objectInstanceTrans: 205,
			objectInstanceRot: 52,
			selected: false,
			isLoaded: false
		},
		{
			id: 'blind3',
			name: 'Store 3',
			translationValue: '--',
			rotationValue: '--',
			UIsliderValue: 0,
			transUnit: '',
			rotUnit: '',
			objectInstanceTrans: 206,
			objectInstanceRot: 53,
			selected: false,
			isLoaded: false
		},
		{
			id: 'blind4',
			name: 'Store 4',
			translationValue: '--',
			rotationValue: '--',
			UIsliderValue: 0,
			transUnit: '',
			rotUnit: '',
			objectInstanceTrans: 207,
			objectInstanceRot: 54,
			selected: false,
			isLoaded: false
		},
		{
			id: 'blind5',
			name: 'Store 5',
			translationValue: '--',
			rotationValue: '--',
			UIsliderValue: 0,
			transUnit: '',
			rotUnit: '',
			objectInstanceTrans: 999,
			objectInstanceRot: 999,
			selected: false,
			isLoaded: false
		},
		{
			id: 'blind6',
			name: 'Store 6',
			translationValue: '--',
			rotationValue: '--',
			UIsliderValue: 0,
			transUnit: '',
			rotUnit: '',
			objectInstanceTrans: 999,
			objectInstanceRot: 999,
			selected: false,
			isLoaded: false
		},
		{
			id: 'blind7',
			name: 'Store 7',
			translationValue: '--',
			rotationValue: '--',
			UIsliderValue: 0,
			transUnit: '',
			rotUnit: '',
			objectInstanceTrans: 999,
			objectInstanceRot: 999,
			selected: false,
			isLoaded: false
		},
		{
			id: 'blind8',
			name: 'Store 8',
			translationValue: '--',
			rotationValue: '--',
			UIsliderValue: 0,
			transUnit: '',
			rotUnit: '',
			objectInstanceTrans: 999,
			objectInstanceRot: 999,
			selected: false,
			isLoaded: false
		}
	]
};

export default (state = INITAL_STATE, action) => {
	switch (action.type) {
		case GET_ALL_BLINDS_SUCCESS:
			return {
				...state,
				allBlinds: action.payload,
				selectedBlinds: {
					...state.selectedBlinds,
					UIsliderValue: action.payload.UIsliderValue,
				}
			};
		case GET_ALL_BLINDS_FAIL:
			return { ...state };
		case GET_BLINDS_AUTO_SUCCESS:
			return {
				...state,
				blindsAuto: action.payload
			};
		case GET_BLINDS_AUTO_FAIL:
			return { ...state };
		case SET_BLINDS_AUTO_SUCCESS:
			return {
				...state,
				blindsAuto: {
					...state.blindsAuto,
					value: action.payload.value
				}
			};
		case SET_ALL_BLINDS_SLIDER_VALUE_SUCCESS:
			return {
				...state,
				allBlinds: {
					...state.allBlinds,
					sliderValue: action.payload.sliderValue,
				}
			};
		case SET_ALL_BLINDS_UI_SLIDER_VALUE:
			return {
				...state,
				allBlinds: {
					...state.allBlinds,
					UIsliderValue: action.payload.UIsliderValue,
				},
				blindsAuto: { ...state.blindsAuto, value: false },
				selectedBlinds: {
					...state.selectedBlinds,
					UIsliderValue: action.payload.UIsliderValue,
				}
			};
		case SET_ALL_BLINDS_SUCCESS:
			return { ...state, allBlinds: action.payload };
		case SET_ALL_BLINDS_FAIL:
			return { ...state };
		case GET_SINGLE_BLIND_SUCCESS:
			const newBlindsData = update(state.blindsData, {
				[action.payload.index]: {
					isLoaded: { $set: action.payload.isLoaded },
					translationValue: { $set: action.payload.translationValue },
					rotationValue: { $set: action.payload.rotationValue },
					UIsliderValue: { $set: action.payload.UIsliderValue },
					transUnit: { $set: action.payload.transUnit },
					rotUnit: { $set: action.payload.rotUnit }
				}
			});
			return { ...state, blindsData: newBlindsData };
		case SET_SINGLE_BLIND_SLIDER_VALUE_SUCCESS:
			const newSingleBlindSliderData = update(state.blindsData, {
				[action.payload.index]: {
					sliderValue: { $set: action.payload.sliderValue },
				}
			});
			return { ...state, blindsData: newSingleBlindSliderData };
		case SET_SINGLE_BLIND_UI_SLIDER_VALUE:
			const newUIsingleBlindSliderData = update(state.blindsData, {
				[action.payload.index]: {
					UIsliderValue: { $set: action.payload.UIsliderValue },
				}
			});
			return { ...state, blindsData: newUIsingleBlindSliderData };
		case SET_SINGLE_BLIND_FAIL:
			return { ...state };
		case SET_SINGLE_BLIND_SELECTED:
			const newSingleBlindSelectedData = update(state.blindsData, {
				[action.payload.index]: {
					selected: { $set: action.payload.selected }
				}
			});
			return { ...state, blindsData: newSingleBlindSelectedData };
		case SET_DESELECT_ALL_BLINDS:
			const newUnselectedData = update(state.blindsData, {
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
			return { ...state, blindsData: newUnselectedData };
		case SET_SELECTED_BLINDS_UI_SLIDER_VALUE:
			return {
				...state,
				selectedBlinds: {
					...state.selectedBlinds,
					UIsliderValue: action.payload.UIsliderValue,
				}
			};
		default:
			return state;
	}
};

/*		case SET_DESELECT_ALL:
			const newUnselectedData = update(state.blindsData, {
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
			return { ...state, blindsData: newUnselectedData };*/
