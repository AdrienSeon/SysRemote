import { 
	GET_FANSPEED_VALUE,
	SET_FANSPEED_VALUE,
	GET_FANSPEED_AUTO,
	SET_FANSPEED_AUTO,
	GET_OUTDOORTEMPERATURE,
} from '../actions/types';

const INITAL_STATE = {
/*	setpoint: 23,
	minSetpoint: 15,
	maxSetpoint: 30,
	startCoord: 70,
	maxCoord: 290,
	thermostatSliderValue: 70,*/
	fanSpeedValue: 2,
	outdooTemperatureValue: 27,
}

export default (state = INITAL_STATE, action) => {
	switch (action.type) {
		case SET_FANSPEED_VALUE: 
			return {...state, fanSpeedValue: action.payload};
		case GET_FANSPEED_VALUE: 
			return {...state, fanSpeedValue: action.payload};
		case GET_FANSPEED_AUTO: 
			return {...state, fanSpeedAuto: action.payload};
		case SET_FANSPEED_AUTO: 
			return {...state, fanSpeedAuto: action.payload};
		case GET_OUTDOORTEMPERATURE:
			return {...state, outdooTemperatureValue: 27};
		default:
			return state;
	}
}