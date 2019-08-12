import { GET_FANSPEED_VALUE, SET_FANSPEED_VALUE, GET_FANSPEED_AUTO, SET_FANSPEED_AUTO} from './types';
import AppConfig from '../constants/AppConfig';
import axios from 'axios'

export const setFanSpeedValue = (value = 0) => {
	return (dispatch) => {
		const url = 'http://' + AppConfig.device.host + '/api/rest/v1/protocols/bacnet/local/objects/' + 'multistate-value' + '/' + '3' + '/properties/present-value';

		// ajust to match FanSpeedCmd enum
		value = value + 1

		return (
			axios.post(url,
				{
					value: value.toString()
				},
				{
					auth: {
						username: AppConfig.device.username,
						password: AppConfig.device.password
					}
				})
			.then((response) => {
				 dispatch(setFanSpeedValueSuccess(response.status, value - 1)) // ajust to match slider range
			})
			.catch((error) => {
				console.log(error);
			})
		)
	};
}

export const setFanSpeedValueSuccess = (status, value) => {
	return {
		type: SET_FANSPEED_VALUE,
		payload: value
	};
}

export const getFanSpeedValue = () => {
	return (dispatch) => {
		const url = 'http://' + AppConfig.device.host + '/api/rest/v1/protocols/bacnet/local/objects/' + 'multistate-value' + '/' + '16' + '/properties/present-value';
		return (
			axios.get(url,
				{
					auth: {
						username: AppConfig.device.username,
						password: AppConfig.device.password
					}
				})
			.then((response) => {
				 dispatch(getFanSpeedValueSuccess(response.status, parseInt(response.data.value)))
			})
			.catch((error) => {
				console.log(error);
			})
		)
	};
}

export const getFanSpeedValueSuccess = (status, value) => {
	return {
		type: GET_FANSPEED_VALUE,
		payload: value
	};
}

export const setFanSpeedAuto = (value = true) => {
	return (dispatch) => {
		const url = 'http://' + AppConfig.device.host + '/api/rest/v1/protocols/bacnet/local/objects/' + 'multistate-value' + '/' + '3' + '/properties/present-value';

		return (
			axios.post(url,
				{
					value: '1' // Auto = 1 in FanSpeedCmd enum
				},
				{
					auth: {
						username: AppConfig.device.username,
						password: AppConfig.device.password
					}
				})
			.then((response) => {
				 dispatch(setFanSpeedAutoSuccess(response.status, true))
			})
			.catch((error) => {
				console.log(error);
			})
		)
	};
}

export const setFanSpeedAutoSuccess = (status, value) => {
	return {
		type: SET_FANSPEED_AUTO,
		payload: value
	};
}

export const getFanSpeedAuto = () => {
	return (dispatch) => {
		const url = 'http://' + AppConfig.device.host + '/api/rest/v1/protocols/bacnet/local/objects/' + 'multistate-value' + '/' + '3' + '/properties/present-value';
		return (
			axios.get(url,
				{
					auth: {
						username: AppConfig.device.username,
						password: AppConfig.device.password
					}
				})
			.then((response) => {
				const autoState = parseInt(response.data.value) === 1 ? true : false
				dispatch(getFanSpeedAutoSuccess(response.status, autoState))
			})
			.catch((error) => {
				console.log(error);
			})
		)
	};
}

export const getFanSpeedAutoSuccess = (status, value) => {
	return {
		type: GET_FANSPEED_AUTO,
		payload: value
	};
}

export function getOutdoorTemperature(value = 0) {
	return {
		type: GET_OUTDOORTEMPERATURE,
		value
	};
}
