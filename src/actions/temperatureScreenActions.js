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
} from './types';
import AppConfig from '../constants/AppConfig';
import axios from 'axios';

export const getFanSpeed = () => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectType = 'multistate-value';
		const objectInstance = '16';
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
				dispatch(getFanSpeedSuccess(parseInt(response.data.value)));
			})
			.catch((error) => {
				console.log(error);
				dispatch(getFanSpeedFail());
			});
	};
};

export const getFanSpeedSuccess = (value) => {
	return {
		type: GET_FANSPEED_SUCCESS,
		payload: {
			isLoaded: true,
			value
		}
	};
};

export const getFanSpeedFail = () => {
	return {
		type: GET_FANSPEED_FAIL
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
				dispatch(setFanSpeedSuccess(ajustedValue - 1)); // ajust to match slider range
			})
			.catch((error) => {
				console.log(error);
				dispatch(setFanSpeedFail());
			});
	};
};

export const setFanSpeedSuccess = (value) => {
	return {
		type: SET_FANSPEED_SUCCESS,
		payload: {
			isLoaded: true,
			value
		}
	};
};

export const setFanSpeedFail = () => {
	return {
		type: SET_FANSPEED_FAIL
	};
};

export const getFanSpeedAuto = () => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectType = 'multistate-value';
		const objectInstance = '3';
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
				const autoState = parseInt(response.data.value) === 1 ? true : false;
				dispatch(getFanSpeedAutoSuccess(autoState));
			})
			.catch((error) => {
				console.log(error);
				dispatch(getFanSpeedAutoSuccess());
			});
	};
};

export const getFanSpeedAutoSuccess = (value) => {
	return {
		type: GET_FANSPEED_AUTO_SUCCESS,
		payload: {
			isLoaded: true,
			value
		}
	};
};

export const getFanSpeedAutoFail = () => {
	return {
		type: GET_FANSPEED_AUTO_FAIL
	};
};

export const setFanSpeedAuto = (value = true) => {
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
		const data = {
			value: '1' // Auto = 1 in FanSpeedCmd enum
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
				dispatch(setFanSpeedAutoSuccess(true));
			})
			.catch((error) => {
				console.log(error);
				dispatch(setFanSpeedAutoFail());
			});
	};
};

export const setFanSpeedAutoSuccess = (value) => {
	return {
		type: SET_FANSPEED_AUTO_SUCCESS,
		payload: {
			isLoaded: true,
			value
		}
	};
};

export const setFanSpeedAutoFail = () => {
	return {
		type: SET_FANSPEED_AUTO_FAIL
	};
};

export const getOutdoorTemperature = () => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectType = 'analogValue';
		const objectInstance = 999;
		const url =
			'http://' + host + '/api/rest/v1/protocols/bacnet/local/objects/read-property-multiple';
		const data = {
			encode: 'text',
			propertyReferences: [
				{
					type: objectType,
					instance: objectInstance,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstance,
					property: 'units'
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
				const value = parseFloat(response.data[0].value);
				const unit = response.data[1].value;
				const error = response.data[0].error;
				if (error) {
					dispatch(getOutdoorTemperatureFail());
				} else {
					dispatch(getOutdoorTemperatureSuccess(value, unit));
				}
			})
			.catch((error) => {
				console.log(error);
				dispatch(getOutdoorTemperatureFail());
			});
	};
};

export const getOutdoorTemperatureSuccess = (value, unit) => {
	return {
		type: GET_OUTDOORTEMPERATURE_SUCCESS,
		payload: {
			isLoaded: true,
			value,
			unit
		}
	};
};

export const getOutdoorTemperatureFail = () => {
	return {
		type: GET_OUTDOORTEMPERATURE_FAIL
	};
};

export const getOutdoorHumidity = () => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectType = 'analogValue';
		const objectInstance = 999;
		const url =
			'http://' + host + '/api/rest/v1/protocols/bacnet/local/objects/read-property-multiple';
		const data = {
			encode: 'text',
			propertyReferences: [
				{
					type: objectType,
					instance: objectInstance,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstance,
					property: 'units'
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
				const value = parseFloat(response.data[0].value);
				const unit = response.data[1].value;
				const error = response.data[0].error;
				if (error) {
					dispatch(getOutdoorHumidityFail());
				} else {
					dispatch(getOutdoorHumiditySuccess(value, unit));
				}
			})
			.catch((error) => {
				console.log(error);
				dispatch(getOutdoorHumidityFail());
			});
	};
};

export const getOutdoorHumiditySuccess = (value, unit) => {
	return {
		type: GET_OUTDOORHUMIDITY_SUCCESS,
		payload: {
			isLoaded: true,
			value,
			unit
		}
	};
};

export const getOutdoorHumidityFail = () => {
	return {
		type: GET_OUTDOORHUMIDITY_FAIL
	};
};

export const getSpaceTemperature = () => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectType = 'analogValue';
		const objectInstance = 1;
		const url =
			'http://' + host + '/api/rest/v1/protocols/bacnet/local/objects/read-property-multiple';
		const data = {
			encode: 'text',
			propertyReferences: [
				{
					type: objectType,
					instance: objectInstance,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstance,
					property: 'units'
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
				const value = parseFloat(response.data[0].value);
				const unit = response.data[1].value;
				const error = response.data[0].error;
				if (error) {
					dispatch(getSpaceTemperatureFail());
				} else {
					dispatch(getSpaceTemperatureSuccess(value, unit));
				}
			})
			.catch((error) => {
				console.log(error);
				dispatch(getSpaceTemperatureFail());
			});
	};
};

export const getSpaceTemperatureSuccess = (value, unit) => {
	return {
		type: GET_SPACETEMPERATURE_SUCCESS,
		payload: {
			isLoaded: true,
			value,
			unit
		}
	};
};

export const getSpaceTemperatureFail = () => {
	return {
		type: GET_SPACETEMPERATURE_FAIL
	};
};

export const getSpaceHumidity = () => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectType = 'analogValue';
		const objectInstance = 34;
		const url =
			'http://' + host + '/api/rest/v1/protocols/bacnet/local/objects/read-property-multiple';
		const data = {
			encode: 'text',
			propertyReferences: [
				{
					type: objectType,
					instance: objectInstance,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstance,
					property: 'units'
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
				const value = parseFloat(response.data[0].value);
				const unit = response.data[1].value;
				const error = response.data[0].error;
				if (error) {
					dispatch(getSpaceHumidityFail());
				} else {
					dispatch(getSpaceHumiditySuccess(value, unit));
				}
			})
			.catch((error) => {
				console.log(error);
				dispatch(getSpaceHumidityFail());
			});
	};
};

export const getSpaceHumiditySuccess = (value, unit) => {
	return {
		type: GET_SPACEHUMIDITY_SUCCESS,
		payload: {
			isLoaded: true,
			value,
			unit
		}
	};
};

export const getSpaceHumidityFail = () => {
	return {
		type: GET_SPACEHUMIDITY_FAIL
	};
};

export const setSetpointOffset = (value = 0) => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectType = 'analog-value';
		const objectInstance = 28;
		const url =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstance.toString() +
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
			.post(url, data, params)
			.then((response) => {
				dispatch(setSetpointOffsetSuccess(value));
			})
			.catch((error) => {
				console.log(error);
				dispatch(setSetpointOffsetFail());
			});
	};
};

export const setSetpointOffsetSuccess = (value) => {
	return {
		type: SET_SETPOINTOFFSET_SUCCESS,
		payload: {
			isLoaded: true,
			value
		}
	};
};

export const setSetpointOffsetFail = () => {
	return {
		type: SET_SETPOINTOFFSET_FAIL
	};
};

export const getSetpoint = () => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectType = 'analogValue';
		const effectiveSetpointObjectInstance = 33;
		const setpointOffsetRangeObjectInstance = 27;
		const setpointOffsetObjectInstance = 28;
		const url =
			'http://' + host + '/api/rest/v1/protocols/bacnet/local/objects/read-property-multiple';
		const data = {
			encode: 'text',
			propertyReferences: [
				{
					type: objectType,
					instance: effectiveSetpointObjectInstance,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: effectiveSetpointObjectInstance,
					property: 'units'
				},
				{
					type: objectType,
					instance: setpointOffsetRangeObjectInstance,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: setpointOffsetObjectInstance,
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
				const effectiveSetpointValue = parseFloat(response.data[0].value);
				const unit = response.data[1].value;
				const setpointOffsetRangeValue = parseFloat(response.data[2].value);
				const setpointOffsetValue = parseFloat(response.data[3].value);
				const error = response.data[0].error;
				if (error) {
					dispatch(getSetpointFail());
				} else {
					dispatch(getEffectiveSetpointSuccess(effectiveSetpointValue, unit));
					dispatch(
						getUISetpoint(
							effectiveSetpointValue,
							effectiveSetpointValue - setpointOffsetValue,
							unit
						)
					);

					dispatch(getSetpointOffsetSuccess(setpointOffsetValue, unit));
					dispatch(getUISetpointOffset(setpointOffsetValue, unit));

					const setpointOffsetRangeMin =
						setpointOffsetRangeValue - setpointOffsetRangeValue * 2;
					const setpointOffsetRangeMax = setpointOffsetRangeValue;
					dispatch(
						getSetpointOffsetRangeSuccess(
							setpointOffsetRangeMin,
							setpointOffsetRangeMax,
							unit
						)
					);
				}
			})
			.catch((error) => {
				console.log(error);
				dispatch(getSetpointFail());
			});
	};
};

export const getSetpointFail = () => {
	return {
		type: GET_SETPOINT_FAIL
	};
};

export const getEffectiveSetpointSuccess = (value, unit) => {
	return {
		type: GET_EFFECTIVESETPOINT_SUCCESS,
		payload: {
			isLoaded: true,
			value,
			unit
		}
	};
};

export const getSetpointOffsetSuccess = (value, unit) => {
	return {
		type: GET_SETPOINTOFFSET_SUCCESS,
		payload: {
			isLoaded: true,
			value,
			unit
		}
	};
};

export const getSetpointOffsetRangeSuccess = (min, max, unit) => {
	return {
		type: GET_SETPOINTOFFSETRANGE_SUCCESS,
		payload: {
			isLoaded: true,
			min,
			max,
			unit
		}
	};
};

export const getUISetpointOffset = (value, unit) => {
	return {
		type: GET_UISETPOINTOFFSET,
		payload: {
			isLoaded: true,
			value,
			unit
		}
	};
};

export const setUISetpointOffset = (value) => {
	return {
		type: SET_UISETPOINTOFFSET,
		payload: {
			value
		}
	};
};

export const getUISetpoint = (effectiveSetpointValue, baseSetpointValue, unit) => {
	let formatedValue = baseSetpointValue;
	formatedValue = +formatedValue.toFixed(1);
	return {
		type: GET_UISETPOINT,
		payload: {
			isLoaded: true,
			effectiveValue: effectiveSetpointValue,
			baseValue: formatedValue,
			unit
		}
	};
};

export const setUISetpoint = (value) => {
	let formatedValue = value;
	formatedValue = +formatedValue.toFixed(1);
	return {
		isLoaded: true,
		type: SET_UISETPOINT,
		effectiveValue: formatedValue
	};
};
