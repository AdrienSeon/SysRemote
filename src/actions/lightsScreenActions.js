import {
	GET_ALLLIGHTS_SUCCESS,
	GET_ALLLIGHTS_FAIL,
	GET_LIGHTS_AUTO_SUCCESS,
	GET_LIGHTS_AUTO_FAIL,
	SET_LIGHTS_AUTO_SUCCESS,
	GET_SINGLELIGHT_SUCCESS,
	SET_ALLLIGHTSSLIDERVALUE_SUCCESS,
	SET_ALLLIGHTSSWITCHVALUE_SUCCESS,
	SET_ALLLIGHTSUISLIDERVALUE_SUCCESS,
	SET_ALLLIGHTSUISWITCHVALUE_SUCCESS,
	SET_ALLLIGHTS_SUCCESS,
	SET_ALLLIGHTS_FAIL
} from './types';
import AppConfig from '../constants/AppConfig';
import axios from 'axios';

export const getAllLights = () => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectType1to4 = 'analogOutput';
		const objectType5to8 = 'binaryOutput';
		const objectInstanceLight1 = 8121;
		const objectInstanceLight2 = 8122;
		const objectInstanceLight3 = 8123;
		const objectInstanceLight4 = 8124;
		const objectInstanceLight5 = 8321;
		const objectInstanceLight6 = 8323;
		const objectInstanceLight7 = 8323;
		const objectInstanceLight8 = 8324;
		const url =
			'http://' + host + '/api/rest/v1/protocols/bacnet/local/objects/read-property-multiple';
		const data = {
			encode: 'text',
			propertyReferences: [
				{
					type: objectType1to4,
					instance: objectInstanceLight1,
					property: 'presentValue'
				},
				{
					type: objectType1to4,
					instance: objectInstanceLight1,
					property: 'units'
				},
				{
					type: objectType1to4,
					instance: objectInstanceLight2,
					property: 'presentValue'
				},
				{
					type: objectType1to4,
					instance: objectInstanceLight3,
					property: 'presentValue'
				},
				{
					type: objectType1to4,
					instance: objectInstanceLight4,
					property: 'presentValue'
				},
				{
					type: objectType5to8,
					instance: objectInstanceLight5,
					property: 'presentValue'
				},
				{
					type: objectType5to8,
					instance: objectInstanceLight6,
					property: 'presentValue'
				},
				{
					type: objectType5to8,
					instance: objectInstanceLight7,
					property: 'presentValue'
				},
				{
					type: objectType5to8,
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
				const light1Value = response.data[0].value;
				const light1Error = response.data[0].error;
				const unit = response.data[1].value;
				const light2Value = response.data[2].value;
				const light2Error = response.data[2].error;
				const light3Value = response.data[3].value;
				const light3Error = response.data[3].error;
				const light4Value = response.data[4].value;
				const light4Error = response.data[4].error;
				const light5Value = response.data[5].value;
				const light5Error = response.data[5].error;
				const light6Value = response.data[6].value;
				const light6Error = response.data[6].error;
				const light7Value = response.data[7].value;
				const light7Error = response.data[7].error;
				const light8Value = response.data[8].value;
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
						let dispatchedLight1Value;
						let dispatchedLight1isDimmable;
						if (light1Value === 'Active') {
							dispatchedLight1Value = 100;
							dispatchedLight1isDimmable = false;
						} else if (light1Value === 'Inactive') {
							dispatchedLight1Value = 0;
							dispatchedLight1isDimmable = false;
						} else {
							dispatchedLight1Value = parseFloat(light1Value);
							dispatchedLight1isDimmable = true;
						}
						lightValues.push(dispatchedLight1Value);
						dispatch(
							getSingleLightSuccess(
								dispatchedLight1Value,
								unit,
								1,
								dispatchedLight1isDimmable
							)
						);
					}
					if (!light2Error) {
						let dispatchedLight2Value;
						let dispatchedLight2isDimmable;
						if (light2Value === 'Active') {
							dispatchedLight2Value = 100;
							dispatchedLight2isDimmable = false;
						} else if (light2Value === 'Inactive') {
							dispatchedLight2Value = 0;
							dispatchedLight2isDimmable = false;
						} else {
							dispatchedLight2Value = parseFloat(light2Value);
							dispatchedLight2isDimmable = true;
						}
						lightValues.push(dispatchedLight2Value);
						dispatch(
							getSingleLightSuccess(
								dispatchedLight2Value,
								unit,
								2,
								dispatchedLight2isDimmable
							)
						);
					}
					if (!light3Error) {
						let dispatchedLight3Value;
						let dispatchedLight3isDimmable;
						if (light3Value === 'Active') {
							dispatchedLight3Value = 100;
							dispatchedLight3isDimmable = false;
						} else if (light3Value === 'Inactive') {
							dispatchedLight3Value = 0;
							dispatchedLight3isDimmable = false;
						} else {
							dispatchedLight3Value = parseFloat(light3Value);
							dispatchedLight3isDimmable = true;
						}
						lightValues.push(dispatchedLight3Value);
						dispatch(
							getSingleLightSuccess(
								dispatchedLight3Value,
								unit,
								3,
								dispatchedLight3isDimmable
							)
						);
					}
					if (!light4Error) {
						let dispatchedLight4Value;
						let dispatchedLight4isDimmable;
						if (light4Value === 'Active') {
							dispatchedLight4Value = 100;
							dispatchedLight4isDimmable = false;
						} else if (light4Value === 'Inactive') {
							dispatchedLight4Value = 0;
							dispatchedLight4isDimmable = false;
						} else {
							dispatchedLight4Value = parseFloat(light4Value);
							dispatchedLight4isDimmable = true;
						}
						lightValues.push(dispatchedLight4Value);
						dispatch(
							getSingleLightSuccess(
								dispatchedLight4Value,
								unit,
								4,
								dispatchedLight4isDimmable
							)
						);
					}
					if (!light5Error) {
						let dispatchedLight5Value;
						let dispatchedLight5isDimmable;
						if (light5Value === 'Active') {
							dispatchedLight5Value = 100;
							dispatchedLight5isDimmable = false;
						} else if (light5Value === 'Inactive') {
							dispatchedLight5Value = 0;
							dispatchedLight5isDimmable = false;
						} else {
							dispatchedLight5Value = parseFloat(light5Value);
							dispatchedLight5isDimmable = true;
						}
						lightValues.push(dispatchedLight5Value);
						dispatch(
							getSingleLightSuccess(
								dispatchedLight5Value,
								unit,
								5,
								dispatchedLight5isDimmable
							)
						);
					}
					if (!light6Error) {
						let dispatchedLight6Value;
						let dispatchedLight6isDimmable;
						if (light6Value === 'Active') {
							dispatchedLight6Value = 100;
							dispatchedLight6isDimmable = false;
						} else if (light6Value === 'Inactive') {
							dispatchedLight6Value = 0;
							dispatchedLight6isDimmable = false;
						} else {
							dispatchedLight6Value = parseFloat(light6Value);
							dispatchedLight6isDimmable = true;
						}
						lightValues.push(dispatchedLight6Value);
						dispatch(
							getSingleLightSuccess(
								dispatchedLight6Value,
								unit,
								6,
								dispatchedLight6isDimmable
							)
						);
					}
					if (!light7Error) {
						let dispatchedLight7Value;
						let dispatchedLight7isDimmable;
						if (light7Value === 'Active') {
							dispatchedLight7Value = 100;
							dispatchedLight7isDimmable = false;
						} else if (light7Value === 'Inactive') {
							dispatchedLight7Value = 0;
							dispatchedLight7isDimmable = false;
						} else {
							dispatchedLight7Value = parseFloat(light7Value);
							dispatchedLight7isDimmable = true;
						}
						lightValues.push(dispatchedLight7Value);
						dispatch(
							getSingleLightSuccess(
								dispatchedLight7Value,
								unit,
								7,
								dispatchedLight7isDimmable
							)
						);
					}
					if (!light8Error) {
						let dispatchedLight8Value;
						let dispatchedLight8isDimmable;
						if (light8Value === 'Active') {
							dispatchedLight8Value = 100;
							dispatchedLight8isDimmable = false;
						} else if (light8Value === 'Inactive') {
							dispatchedLight8Value = 0;
							dispatchedLight8isDimmable = false;
						} else {
							dispatchedLight8Value = parseFloat(light8Value);
							dispatchedLight8isDimmable = true;
						}
						lightValues.push(dispatchedLight8Value);
						dispatch(
							getSingleLightSuccess(
								dispatchedLight8Value,
								unit,
								8,
								dispatchedLight8isDimmable
							)
						);
					}
					dispatch(getAllLightsSuccess(lightValues, unit));
				}
			})
			.catch((error) => {
				console.log(error);
				dispatch(getAllLightsFail());
			});
	};
};

export const getAllLightsSuccess = (lightValues, unit) => {
	// let valuesAvg = lightValues.reduce((a, b) => a + b, 0) / lightValues.length; // Average
	
	const switchValue = lightValues[0] > 0;
	return {
		type: GET_ALLLIGHTS_SUCCESS,
		payload: {
			isLoaded: true,
			sliderValue: lightValues[0],
			switchValue,
			UIsliderValue: lightValues[0],
			UIswitchValue: switchValue,
			unit
		}
	};
};

export const setAllLightsUIswitchValue = (value) => {
	const sliderValue = value ? 100 : 0;
	return {
		type: SET_ALLLIGHTSUISWITCHVALUE_SUCCESS,
		payload: {
			UIsliderValue: sliderValue,
			UIswitchValue: value
		}
	};
};

export const setAllLightsUIsliderValue = (value) => {
	const switchValue = value > 0;
	return {
		type: SET_ALLLIGHTSUISLIDERVALUE_SUCCESS,
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

export const getSingleLightSuccess = (value, unit, index, isDimmable) => {
	const switchValue = value > 0;
	return {
		type: GET_SINGLELIGHT_SUCCESS,
		payload: {
			index,
			isDimmable,
			sliderValue: value,
			switchValue,
			isLoaded: true,
			unit
		}
	};
};

export const setAllLightsSliderValue = (value = 0) => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectType = 'analogValue';
		const objectInstanceLight1 = 200;
		const objectInstanceLight2 = 201;
		const objectInstanceLight3 = 202;
		const objectInstanceLight4 = 203;
		const objectInstanceLight5 = 214;
		const objectInstanceLight6 = 215;
		const objectInstanceLight7 = 216;
		const objectInstanceLight8 = 217;
		const urlLight1 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight1.toString() +
			'/properties/present-value';
		const urlLight2 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight2.toString() +
			'/properties/present-value';
		const urlLight3 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight3.toString() +
			'/properties/present-value';
		const urlLight4 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight4.toString() +
			'/properties/present-value';
		const urlLight5 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight5.toString() +
			'/properties/present-value';
		const urlLight6 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight6.toString() +
			'/properties/present-value';
		const urlLight7 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight7.toString() +
			'/properties/present-value';
		const urlLight8 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight8.toString() +
			'/properties/present-value';
		const data = {
			value: value.toString()
		};
		const params = {
			auth: {
				username: AppConfig.device.username,
				password: AppConfig.device.password
			}
		};

		return axios
			.all([
				axios.post(urlLight1, data, params),
				axios.post(urlLight2, data, params),
				axios.post(urlLight3, data, params),
				axios.post(urlLight4, data, params),
				axios.post(urlLight5, data, params),
				axios.post(urlLight6, data, params),
				axios.post(urlLight7, data, params),
				axios.post(urlLight8, data, params)
			])
			.then((response) => {
				dispatch(setAllLightsSliderValueSuccess(value));
			})
			.catch((error) => {
				console.log(error);
				dispatch(setAllLightsFail());
			});
	};
};

export const setAllLightsSliderValueSuccess = (value) => {
	const switchValue = value > 0;
	return {
		type: SET_ALLLIGHTSSLIDERVALUE_SUCCESS,
		payload: {
			sliderValue: value,
			switchValue: switchValue
		}
	};
};

export const setAllLightsSwitchValue = (value = true) => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectType = 'analogValue';
		const objectInstanceLight1 = 200;
		const objectInstanceLight2 = 201;
		const objectInstanceLight3 = 202;
		const objectInstanceLight4 = 203;
		const objectInstanceLight5 = 214;
		const objectInstanceLight6 = 215;
		const objectInstanceLight7 = 215;
		const objectInstanceLight8 = 217;
		const urlLight1 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight1.toString() +
			'/properties/present-value';
		const urlLight2 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight2.toString() +
			'/properties/present-value';
		const urlLight3 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight3.toString() +
			'/properties/present-value';
		const urlLight4 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight4.toString() +
			'/properties/present-value';
		const urlLight5 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight5.toString() +
			'/properties/present-value';
		const urlLight6 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight6.toString() +
			'/properties/present-value';
		const urlLight7 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight7.toString() +
			'/properties/present-value';
		const urlLight8 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight8.toString() +
			'/properties/present-value';
		const sentValue = value ? 100 : 0
		const data = {
			value: sentValue.toString()
		};
		const params = {
			auth: {
				username: AppConfig.device.username,
				password: AppConfig.device.password
			}
		};

		return axios
			.all([
				axios.post(urlLight1, data, params),
				axios.post(urlLight2, data, params),
				axios.post(urlLight3, data, params),
				axios.post(urlLight4, data, params),
				axios.post(urlLight5, data, params),
				axios.post(urlLight6, data, params),
				axios.post(urlLight7, data, params),
				axios.post(urlLight8, data, params)
			])
			.then((response) => {
				dispatch(setAllLightsSwitchValueSuccess(value));
			})
			.catch((error) => {
				console.log(error);
				dispatch(setAllLightsFail());
			});
	};
};

export const setAllLightsSwitchValueSuccess = (value) => {
	const sliderValue = value ? 100 : 0;
	return {
		type: SET_ALLLIGHTSSWITCHVALUE_SUCCESS,
		payload: {
			sliderValue: sliderValue,
			switchValue: value
		}
	};
};

export const getLightsAuto = () => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectType = 'analog-value';
		const objectInstance = '200';
		const url =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstance +
			'/properties/present-value';
		const params = {
			auth: {
				username: AppConfig.device.username,
				password: AppConfig.device.password
			}
		};

		return axios
			.get(url, params)
			.then((response) => {
				const autoState = response.data.value === 'NaN' ? true : false;
				dispatch(getLightsAutoSuccess(autoState));
			})
			.catch((error) => {
				console.log(error);
				dispatch(getLightsAutoFail());
			});
	};
};

export const getLightsAutoSuccess = (value) => {
	return {
		type: GET_LIGHTS_AUTO_SUCCESS,
		payload: {
			isLoaded: true,
			value
		}
	};
};

export const getLightsAutoFail = () => {
	return {
		type: GET_LIGHTS_AUTO_FAIL
	};
};

export const setLightsAuto = (value = true) => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectType = 'analogValue';
		const objectInstanceLight1 = 200;
		const objectInstanceLight2 = 201;
		const objectInstanceLight3 = 202;
		const objectInstanceLight4 = 203;
		const objectInstanceLight5 = 214;
		const objectInstanceLight6 = 215;
		const objectInstanceLight7 = 216;
		const objectInstanceLight8 = 217;
		const urlLight1 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight1.toString() +
			'/properties/present-value';
		const urlLight2 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight2.toString() +
			'/properties/present-value';
		const urlLight3 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight3.toString() +
			'/properties/present-value';
		const urlLight4 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight4.toString() +
			'/properties/present-value';
		const urlLight5 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight5.toString() +
			'/properties/present-value';
		const urlLight6 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight6.toString() +
			'/properties/present-value';
		const urlLight7 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight7.toString() +
			'/properties/present-value';
		const urlLight8 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceLight8.toString() +
			'/properties/present-value';
		const data = {
			value: 'null'
		};
		const params = {
			auth: {
				username: AppConfig.device.username,
				password: AppConfig.device.password
			}
		};

		return axios
			.all([
				axios.post(urlLight1, data, params),
				axios.post(urlLight2, data, params),
				axios.post(urlLight3, data, params),
				axios.post(urlLight4, data, params),
				axios.post(urlLight5, data, params),
				axios.post(urlLight6, data, params),
				axios.post(urlLight7, data, params),
				axios.post(urlLight8, data, params)
			])
			.then((response) => {
				dispatch(setLightsAutoSuccess(true));
			})
			.catch((error) => {
				console.log(error);
				dispatch(setAllLightsFail());
			});
	};
};

export const setLightsAutoSuccess = (value) => {
	return {
		type: SET_LIGHTS_AUTO_SUCCESS,
		payload: {
			value
		}
	};
};

export const setAllLightsFail = () => {
	return {
		type: SET_ALLLIGHTS_FAIL
	};
};
