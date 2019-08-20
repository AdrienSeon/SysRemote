import {
	GET_ALLLIGHTS_SUCCESS,
	GET_ALLLIGHTS_FAIL,
	GET_SINGLELIGHT_SUCCESS,
	SET_ALLLIGHTSSLIDERVALUE_SUCCESS,
	SET_ALLLIGHTSSWITCHVALUE_SUCCESS,
	SET_ALLLIGHTS_SUCCESS,
	SET_ALLLIGHTS_FAIL
} from './types';
import AppConfig from '../constants/AppConfig';
import axios from 'axios';

export const getAllLights = () => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectType = 'analogValue';
		const objectInstanceLight1 = 23;
		const objectInstanceLight2 = 24;
		const objectInstanceLight3 = 25;
		const objectInstanceLight4 = 104;
		const objectInstanceLight5 = 105;
		const objectInstanceLight6 = 106;
		const objectInstanceLight7 = 107;
		const objectInstanceLight8 = 108;
		const url =
			'http://' + host + '/api/rest/v1/protocols/bacnet/local/objects/read-property-multiple';
		const data = {
			encode: 'text',
			propertyReferences: [
				{
					type: objectType,
					instance: objectInstanceLight1,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceLight1,
					property: 'units'
				},
				{
					type: objectType,
					instance: objectInstanceLight2,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceLight3,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceLight4,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceLight5,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceLight6,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceLight7,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceLight8,
					property: 'presentValue'
				}
			]
		};
		const params = {
			auth: {
				username: AppConfig.device.username,
				password: AppConfig.device.password
			}
		};

		return axios
			.post(url, data, params)
			.then((response) => {
				const light1Value = parseFloat(response.data[0].value);
				const light1Error = response.data[0].error;
				const unit = response.data[1].value;
				const light2Value = parseFloat(response.data[2].value);
				const light2Error = response.data[2].error;
				const light3Value = parseFloat(response.data[3].value);
				const light3Error = response.data[3].error;
				const light4Value = parseFloat(response.data[4].value);
				const light4Error = response.data[4].error;
				const light5Value = parseFloat(response.data[5].value);
				const light5Error = response.data[5].error;
				const light6Value = parseFloat(response.data[6].value);
				const light6Error = response.data[6].error;
				const light7Value = parseFloat(response.data[7].value);
				const light7Error = response.data[7].error;
				const light8Value = parseFloat(response.data[8].value);
				const light8Error = response.data[8].error;

				if (
					light1Error &&
					light2Error &&
					light3Error &&
					light4Error &&
					light5Error &&
					light6Error &&
					light7Error &&
					light8Error
				) {
					dispatch(getAllLightsFail());
				} else {
					let lightValues = [];
					if (!light1Error) {
						lightValues.push(light1Value);
					}
					if (!light2Error) {
						lightValues.push(light2Value);
					}
					if (!light3Error) {
						lightValues.push(light3Value);
					}
					if (!light4Error) {
						lightValues.push(light4Value);
					}
					if (!light5Error) {
						lightValues.push(light5Value);
					}
					if (!light6Error) {
						lightValues.push(light6Value);
					}
					if (!light7Error) {
						lightValues.push(light7Value);
					}
					if (!light8Error) {
						lightValues.push(light8Value);
					}
					dispatch(getAllLightsSuccess(lightValues, unit));

					if (!light1Error) {
						dispatch(getSingleLightSuccess(light1Value, unit, 1));
					}
					if (!light2Error) {
						dispatch(getSingleLightSuccess(light2Value, unit, 2));
					}
					if (!light3Error) {
						dispatch(getSingleLightSuccess(light3Value, unit, 3));
					}
					if (!light4Error) {
						dispatch(getSingleLightSuccess(light4Value, unit, 4));
					}
					if (!light5Error) {
						dispatch(getSingleLightSuccess(light5Value, unit, 5));
					}
					if (!light6Error) {
						dispatch(getSingleLightSuccess(light6Value, unit, 6));
					}
					if (!light7Error) {
						dispatch(getSingleLightSuccess(light7Value, unit, 7));
					}
					if (!light8Error) {
						dispatch(getSingleLightSuccess(light8Value, unit, 8));
					}
				}
			})
			.catch((error) => {
				console.log(error);
				dispatch(getAllLightsFail());
			});
	};
};

export const getAllLightsSuccess = (lightValues, unit) => {
	let valuesAvg = lightValues.reduce((a, b) => a + b, 0) / lightValues.length;
	const switchValue = valuesAvg > 0;
	return {
		type: GET_ALLLIGHTS_SUCCESS,
		payload: {
			isLoaded: true,
			switchValue,
			sliderValue: valuesAvg,
			UIsliderValue: valuesAvg,
			UIswitchValue: switchValue,
			unit
		}
	};
};

export const setAllLightsUIswitchValue = (value) => {
	const sliderValue = value ? 100 : 0;
	return {
		type: SET_ALLLIGHTSSWITCHVALUE_SUCCESS,
		payload: {
			UIsliderValue: sliderValue,
			UIswitchValue: value
		}
	};
};

export const setAllLightsUIsliderValue = (value) => {
	const switchValue = value > 0;
	return {
		type: SET_ALLLIGHTSSLIDERVALUE_SUCCESS,
		payload: {
			UIsliderValue: value,
			UIswitchValue: switchValue
		}
	};
};

export const getAllLightsFail = () => {
	return {
		type: GET_ALLLIGHTS_FAIL
	};
};

export const getSingleLightSuccess = (value, unit, index) => {
	const switchValue = value > 0;
	return {
		type: GET_SINGLELIGHT_SUCCESS,
		payload: {
			index,
			isLoaded: true,
			switchValue,
			sliderValue: value,
			unit
		}
	};
};

export const setFanSpeed = (value = 0) => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectType = 'multistate-value';
		const objectInstance = 3;
		const url =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstance.toString() +
			'/properties/present-value';
		// ajust to match FanSpeedCmd enum
		const ajustedValue = value + 1;
		const data = {
			value: ajustedValue.toString()
		};
		const params = {
			auth: {
				username: AppConfig.device.username,
				password: AppConfig.device.password
			}
		};

		return axios
			.post(url, data, params)
			.then((response) => {
				dispatch(setAllLightsSuccess(ajustedValue - 1)); // ajust to match slider range
			})
			.catch((error) => {
				console.log(error);
				dispatch(setAllLightsFail());
			});
	};
};

export const setAllLightsSuccess = (value) => {
	return {
		type: SET_ALLLIGHTS_SUCCESS,
		payload: {
			isLoaded: true,
			value
		}
	};
};

export const setAllLightsFail = () => {
	return {
		type: SET_ALLLIGHTS_FAIL
	};
};
