import {
	GET_FANSPEED_SUCCESS,
	GET_FANSPEED_FAIL,
	SET_FANSPEED_SUCCESS,
	SET_FANSPEED_FAIL,
	GET_FANSPEED_AUTO_SUCCESS,
	GET_FANSPEED_AUTO_FAIL,
	SET_FANSPEED_AUTO_SUCCESS,
	SET_FANSPEED_AUTO_FAIL,
	GET_OUTDOORTEMPERATURE_SUCCESS,
	GET_OUTDOORTEMPERATURE_FAIL,
	GET_OUTDOORHUMIDITY_SUCCESS,
	GET_OUTDOORHUMIDITY_FAIL,
	GET_SPACETEMPERATURE_SUCCESS,
	GET_SPACETEMPERATURE_FAIL,
	GET_SPACEHUMIDITY_SUCCESS,
	GET_SPACEHUMIDITY_FAIL,
	SET_SETPOINTOFFSET_SUCCESS,
	SET_SETPOINTOFFSET_FAIL,
	GET_SETPOINTOFFSET_SUCCESS,
	GET_SETPOINTOFFSETRANGE_SUCCESS,
	GET_EFFECTIVESETPOINT_SUCCESS,
	GET_UISETPOINTOFFSET,
	SET_UISETPOINTOFFSET,
	GET_UISETPOINT,
	SET_UISETPOINT,
	GET_SETPOINT_FAIL
} from '../actions/types';

const INITAL_STATE = {
	fanSpeed: {
		isLoaded: false,
		value: '--',
		unit: ''
	},
	fanSpeedAuto: {
		isLoaded: false,
		value: false
	},
	outdoorTemperature: {
		isLoaded: false,
		value: '--',
		unit: ''
	},
	outdoorHumidity: {
		isLoaded: false,
		value: '--',
		unit: ''
	},
	spaceTemperature: {
		isLoaded: false,
		value: '--',
		unit: ''
	},
	spaceHumidity: {
		isLoaded: false,
		value: '--',
		unit: ''
	},
	setpointOffset: {
		isLoaded: false,
		value: '--',
		unit: ''
	},
	setpointOffsetRange: {
		isLoaded: false,
		min: -3,
		max: 3,
		unit: ''
	},
	effectiveSetpoint: {
		isLoaded: false,
		value: '--',
		unit: ''
	},
	UISetpointOffset: {
		isLoaded: false,
		value: 0,
		unit: ''
	},
	UISetpoint: {
		isLoaded: false,
		effectiveValue: 22.5,
		baseValue: 22.5,
		unit: '°C'
	}
};

export default (state = INITAL_STATE, action) => {
	switch (action.type) {
		case GET_FANSPEED_SUCCESS:
			return { ...state, fanSpeed: action.payload };
		case GET_FANSPEED_FAIL:
			return { ...state };
		case SET_FANSPEED_SUCCESS:
			return { ...state, fanSpeed: action.payload };
		case SET_FANSPEED_FAIL:
			return { ...state };
		case GET_FANSPEED_AUTO_SUCCESS:
			return { ...state, fanSpeedAuto: action.payload };
		case GET_FANSPEED_AUTO_FAIL:
			return { ...state };
		case SET_FANSPEED_AUTO_SUCCESS:
			return { ...state, fanSpeedAuto: action.payload };
		case SET_FANSPEED_AUTO_FAIL:
			return { ...state };
		case GET_OUTDOORTEMPERATURE_SUCCESS:
			return { ...state, outdoorTemperature: action.payload };
		case GET_OUTDOORTEMPERATURE_FAIL:
			return { ...state };
		case GET_OUTDOORHUMIDITY_SUCCESS:
			return { ...state, outdoorHumidity: action.payload };
		case GET_OUTDOORHUMIDITY_FAIL:
			return { ...state };
		case GET_SPACETEMPERATURE_SUCCESS:
			return { ...state, spaceTemperature: action.payload };
		case GET_SPACETEMPERATURE_FAIL:
			return { ...state };
		case GET_SPACEHUMIDITY_SUCCESS:
			return { ...state, spaceHumidity: action.payload };
		case GET_SPACEHUMIDITY_FAIL:
			return { ...state };
		case SET_SETPOINTOFFSET_SUCCESS:
			return { ...state, setpointOffset: action.payload };
		case SET_SETPOINTOFFSET_FAIL:
			return { ...state };
		case GET_SETPOINTOFFSET_SUCCESS:
			return { ...state, setpointOffset: action.payload };
		case GET_SETPOINTOFFSETRANGE_SUCCESS:
			return { ...state, setpointOffsetRange: action.payload };
		case GET_EFFECTIVESETPOINT_SUCCESS:
			return { ...state, effectiveSetpoint: action.payload };
		case GET_UISETPOINTOFFSET:
			return { ...state, UISetpointOffset: action.payload };
		case SET_UISETPOINTOFFSET:
			return { ...state, UISetpointOffset: action.payload };
		case GET_UISETPOINT:
			return { ...state, UISetpoint: action.payload };
		case SET_UISETPOINT:
			return {
				...state,
				UISetpoint: { ...state.UISetpoint, effectiveValue: action.effectiveValue }
			};
		case GET_SETPOINT_FAIL:
			return { ...state };
		default:
			return state;
	}
};
