import { SET_FANSPEED } from './types';
import AppConfig from '../constants/AppConfig';
import axios from 'axios'

export const setFanSpeed = (value = 0) => {
	return (dispatch) => {
		//const url = 'http://' + AppConfig.device.host + '/api/rest/v1/protocols/bacnet/local/objects/' + objectType + '/' + objectInstance + '/properties/present-value';
		const url = 'https://' + AppConfig.device.host + '/api/rest/v1/protocols/bacnet/local/objects/' + 'multistate-value' + '/' + '3' + '/properties/present-value';
		console.log(url)
		console.log(AppConfig.device.username)
		console.log(AppConfig.device.password)
		return (
			axios.post(url, {
					auth: {
						username: AppConfig.device.username,
						password: AppConfig.device.password
					},
			})
			.then((response) => {
				 dispatch(setFanSpeedSuccess(response.data, value))
				 console.log(response.data)
			})
			.catch((error) => {
				console.log(error);
			})
		)
	};
}

export const setFanSpeedSuccess = (data, value) => {
	//console.log(value);
	return {
		type: SET_FANSPEED,
		payload: value
	};
}

export function getOutdoorTemperature(value = 0) {
	//console.log(value);
	return {
		type: GET_OUTDOORTEMPERATURE,
		value
	};
}
