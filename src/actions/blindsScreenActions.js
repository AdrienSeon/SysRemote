import {
	GET_ALL_BLINDS_SUCCESS,
	GET_ALL_BLINDS_FAIL,
	GET_BLINDS_AUTO_SUCCESS,
	GET_BLINDS_AUTO_FAIL,
	SET_BLINDS_AUTO_SUCCESS,
	SET_ALL_BLINDS_SLIDER_VALUE_SUCCESS,
	SET_ALL_BLINDS_SWITCH_VALUE_SUCCESS,
	SET_ALL_BLINDS_UI_SLIDER_VALUE,
	SET_ALL_BLINDS_UI_SWITCH_VALUE,
	SET_ALL_BLINDS_SUCCESS,
	SET_ALL_BLINDS_FAIL,
	GET_SINGLE_BLIND_SUCCESS,
	SET_SINGLE_BLIND_SLIDER_VALUE_SUCCESS,
	SET_SINGLE_BLIND_SWITCH_VALUE_SUCCESS,
	SET_SINGLE_BLIND_UI_SLIDER_VALUE,
	SET_SINGLE_BLIND_UI_SWITCH_VALUE,
	SET_SINGLE_BLIND_FAIL,
	SET_SINGLE_BLIND_SELECTED,
	SET_DESELECT_ALL_BLINDS,
	SET_SELECTED_BLINDS_UI_SLIDER_VALUE,
	SET_SELECTED_BLINDS_UI_SWITCH_VALUE
} from './types';
import AppConfig from '../constants/AppConfig';
import axios from 'axios';

export const getAllBlinds = () => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectType = 'analogOutput';
		const objectInstanceBlindTrans1 = 8241;
		const objectInstanceBlindRot1 = 8251;
		const objectInstanceBlindTrans2 = 8242;
		const objectInstanceBlindRot2 = 8252;
		const objectInstanceBlindTrans3 = 8243;
		const objectInstanceBlindRot3 = 8253;
		const objectInstanceBlindTrans4 = 8244;
		const objectInstanceBlindRot4 = 8254;
		const objectInstanceBlindTrans5 = 8441;
		const objectInstanceBlindRot5 = 8451;
		const objectInstanceBlindTrans6 = 8442;
		const objectInstanceBlindRot6 = 8452;
		const objectInstanceBlindTrans7 = 8443;
		const objectInstanceBlindRot7 = 8453;
		const objectInstanceBlindTrans8 = 8444;
		const objectInstanceBlindRot8 = 8454;
		const url =
			'http://' + host + '/api/rest/v1/protocols/bacnet/local/objects/read-property-multiple';
		const data = {
			encode: 'text',
			propertyReferences: [
				{
					type: objectType,
					instance: objectInstanceBlindTrans1,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlindTrans1,
					property: 'units'
				},
				{
					type: objectType,
					instance: objectInstanceBlindRot1,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlindRot1,
					property: 'units'
				},
				{
					type: objectType,
					instance: objectInstanceBlindTrans2,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlindRot2,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlindTrans3,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlindRot3,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlindTrans4,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlindRot4,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlindTrans5,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlindRot5,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlindTrans6,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlindRot6,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlindTrans7,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlindRot7,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlindTrans8,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlindRot8,
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
				const responseResult = [
					{
						translation: {
							value: response.data[0].value,
							error: response.data[0].error,
							unit: response.data[1].value
						},
						rotation: {
							value: response.data[2].value,
							error: response.data[2].error,
							unit: response.data[3].value
						}
					},
					{
						translation: {
							value: response.data[4].value,
							error: response.data[4].error,
							unit: response.data[1].value
						},
						rotation: {
							value: response.data[5].value,
							error: response.data[5].error,
							unit: response.data[3].value
						}
					},
					{
						translation: {
							value: response.data[6].value,
							error: response.data[6].error,
							unit: response.data[1].value
						},
						rotation: {
							value: response.data[7].value,
							error: response.data[7].error,
							unit: response.data[3].value
						}
					},
					{
						translation: {
							value: response.data[8].value,
							error: response.data[8].error,
							unit: response.data[1].value
						},
						rotation: {
							value: response.data[9].value,
							error: response.data[9].error,
							unit: response.data[3].value
						}
					},
					{
						translation: {
							value: response.data[10].value,
							error: response.data[10].error,
							unit: response.data[1].value
						},
						rotation: {
							value: response.data[11].value,
							error: response.data[11].error,
							unit: response.data[3].value
						}
					},
					{
						translation: {
							value: response.data[12].value,
							error: response.data[12].error,
							unit: response.data[1].value
						},
						rotation: {
							value: response.data[13].value,
							error: response.data[13].error,
							unit: response.data[3].value
						}
					},
					{
						translation: {
							value: response.data[14].value,
							error: response.data[14].error,
							unit: response.data[1].value
						},
						rotation: {
							value: response.data[15].value,
							error: response.data[15].error,
							unit: response.data[3].value
						}
					},
					{
						translation: {
							value: response.data[16].value,
							error: response.data[16].error,
							unit: response.data[1].value
						},
						rotation: {
							value: response.data[17].value,
							error: response.data[17].error,
							unit: response.data[3].value
						}
					}
				];

				let blindTransAndRot = [];

				responseResult.forEach((blind, index) => {
					if (!(blind.translation.error || blind.rotation.error)) {
						blindTransAndRot.push({
							translation: parseFloat(blind.translation.value),
							rotation: parseFloat(blind.rotation.value)
						});
						dispatch(
							getSingleBlindSuccess(
								blind.translation.value,
								blind.translation.unit,
								blind.rotation.value,
								blind.rotation.unit,
								index
							)
						);
					}
				});
				if (blindTransAndRot.length > 0) {
					dispatch(
						getAllBlindsSuccess(
							blindTransAndRot,
							responseResult[0].translation.unit,
							responseResult[0].rotation.unit
						)
					);
				} else {
					dispatch(getAllBlindsFail());
				}
			})
			.catch((error) => {
				console.log(error);
				dispatch(getAllBlindsFail());
			});
	};
};

export const getAllBlindsSuccess = (blindTransAndRot, transUnit, rotUnit) => {
	let valuesAvgTrans =
		blindTransAndRot.reduce((sum, blind) => sum + blind.translation, 0) /
		blindTransAndRot.length;
	valuesAvgTrans = +valuesAvgTrans.toFixed(0);
	let valuesAvgRot =
		blindTransAndRot.reduce((sum, blind) => sum + blind.rotation, 0) / blindTransAndRot.length;
	valuesAvgRot = +valuesAvgRot.toFixed(0);
	return {
		type: GET_ALL_BLINDS_SUCCESS,
		payload: {
			isLoaded: true,
			translationValue: valuesAvgTrans,
			rotationValue: valuesAvgRot,
			UIsliderValue: valuesAvgTrans,
			transUnit,
			rotUnit
		}
	};
};

export const getAllBlindsFail = () => {
	return {
		type: GET_ALL_BLINDS_FAIL
	};
};

export const setAllBlindsUIsliderValue = (value) => {
	const switchValue = value > 0;
	return {
		type: SET_ALL_BLINDS_UI_SLIDER_VALUE,
		payload: {
			UIsliderValue: value,
			UIswitchValue: switchValue
		}
	};
};

export const setAllBlindsSliderValue = (value = 0) => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectType = 'analogValue';
		const objectInstanceBlind1 = 200;
		const objectInstanceBlind2 = 201;
		const objectInstanceBlind3 = 202;
		const objectInstanceBlind4 = 203;
		const objectInstanceBlind5 = 214;
		const objectInstanceBlind6 = 215;
		const objectInstanceBlind7 = 216;
		const objectInstanceBlind8 = 217;
		const urlBlind1 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceBlind1.toString() +
			'/properties/present-value';
		const urlBlind2 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceBlind2.toString() +
			'/properties/present-value';
		const urlBlind3 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceBlind3.toString() +
			'/properties/present-value';
		const urlBlind4 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceBlind4.toString() +
			'/properties/present-value';
		const urlBlind5 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceBlind5.toString() +
			'/properties/present-value';
		const urlBlind6 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceBlind6.toString() +
			'/properties/present-value';
		const urlBlind7 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceBlind7.toString() +
			'/properties/present-value';
		const urlBlind8 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceBlind8.toString() +
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
				axios.post(urlBlind1, data, params),
				axios.post(urlBlind2, data, params),
				axios.post(urlBlind3, data, params),
				axios.post(urlBlind4, data, params),
				axios.post(urlBlind5, data, params),
				axios.post(urlBlind6, data, params),
				axios.post(urlBlind7, data, params),
				axios.post(urlBlind8, data, params)
			])
			.then((response) => {
				dispatch(setAllBlindsSliderValueSuccess(value));
			})
			.catch((error) => {
				console.log(error);
				dispatch(setAllBlindsFail());
			});
	};
};

export const setAllBlindsSliderValueSuccess = (value) => {
	const switchValue = value > 0;
	return {
		type: SET_ALL_BLINDS_SLIDER_VALUE_SUCCESS,
		payload: {
			sliderValue: value,
			switchValue: switchValue
		}
	};
};

export const getBlindsAuto = () => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectType = 'analogValue';
		const objectInstanceBlind1 = 200;
		const objectInstanceBlind2 = 201;
		const objectInstanceBlind3 = 202;
		const objectInstanceBlind4 = 203;
		const objectInstanceBlind5 = 214;
		const objectInstanceBlind6 = 215;
		const objectInstanceBlind7 = 215;
		const objectInstanceBlind8 = 217;
		const url =
			'http://' + host + '/api/rest/v1/protocols/bacnet/local/objects/read-property-multiple';
		const data = {
			encode: 'text',
			propertyReferences: [
				{
					type: objectType,
					instance: objectInstanceBlind1,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind2,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind3,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind4,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind5,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind6,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind7,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind8,
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
				const autoState =
					response.data[0].value === 'NaN' &&
					response.data[1].value === 'NaN' &&
					response.data[2].value === 'NaN' &&
					response.data[3].value === 'NaN' &&
					response.data[4].value === 'NaN' &&
					response.data[5].value === 'NaN' &&
					response.data[6].value === 'NaN' &&
					response.data[7].value === 'NaN'
						? true
						: false;
				dispatch(getBlindsAutoSuccess(autoState));
			})
			.catch((error) => {
				console.log(error);
				dispatch(getBlindsAutoFail());
			});
	};
};

export const getBlindsAutoSuccess = (value) => {
	return {
		type: GET_BLINDS_AUTO_SUCCESS,
		payload: {
			isLoaded: true,
			value
		}
	};
};

export const getBlindsAutoFail = () => {
	return {
		type: GET_BLINDS_AUTO_FAIL
	};
};

export const setBlindsAuto = (value = true) => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectType = 'analogValue';
		const objectInstanceBlind1 = 200;
		const objectInstanceBlind2 = 201;
		const objectInstanceBlind3 = 202;
		const objectInstanceBlind4 = 203;
		const objectInstanceBlind5 = 214;
		const objectInstanceBlind6 = 215;
		const objectInstanceBlind7 = 216;
		const objectInstanceBlind8 = 217;
		const urlBlind1 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceBlind1.toString() +
			'/properties/present-value';
		const urlBlind2 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceBlind2.toString() +
			'/properties/present-value';
		const urlBlind3 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceBlind3.toString() +
			'/properties/present-value';
		const urlBlind4 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceBlind4.toString() +
			'/properties/present-value';
		const urlBlind5 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceBlind5.toString() +
			'/properties/present-value';
		const urlBlind6 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceBlind6.toString() +
			'/properties/present-value';
		const urlBlind7 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceBlind7.toString() +
			'/properties/present-value';
		const urlBlind8 =
			'http://' +
			host +
			'/api/rest/v1/protocols/bacnet/local/objects/' +
			objectType +
			'/' +
			objectInstanceBlind8.toString() +
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
				axios.post(urlBlind1, data, params),
				axios.post(urlBlind2, data, params),
				axios.post(urlBlind3, data, params),
				axios.post(urlBlind4, data, params),
				axios.post(urlBlind5, data, params),
				axios.post(urlBlind6, data, params),
				axios.post(urlBlind7, data, params),
				axios.post(urlBlind8, data, params)
			])
			.then((response) => {
				dispatch(setBlindsAutoSuccess(true));
			})
			.catch((error) => {
				console.log(error);
				dispatch(setAllBlindsFail());
			});
	};
};

export const setBlindsAutoSuccess = (value) => {
	return {
		type: SET_BLINDS_AUTO_SUCCESS,
		payload: {
			value
		}
	};
};

export const setAllBlindsFail = () => {
	return {
		type: SET_ALL_BLINDS_FAIL
	};
};

export const getSingleBlindSuccess = (
	translationValue,
	transUnit,
	rotationValue,
	rotUnit,
	index
) => {
	return {
		type: GET_SINGLE_BLIND_SUCCESS,
		payload: {
			index,
			translationValue,
			rotationValue,
			UIsliderValue: translationValue,
			isLoaded: true,
			transUnit,
			rotUnit
		}
	};
};

export const setSingleBlindSliderValue = (value = 0, index = 0) => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectType = 'analogValue';
		let objectInstance;
		switch (index) {
			case 0:
				objectInstance = 200;
				break;
			case 1:
				objectInstance = 201;
				break;
			case 2:
				objectInstance = 202;
				break;
			case 3:
				objectInstance = 203;
				break;
			case 4:
				objectInstance = 214;
				break;
			case 5:
				objectInstance = 215;
				break;
			case 6:
				objectInstance = 216;
				break;
			case 7:
				objectInstance = 217;
				break;
			default:
				objectInstance = 200;
				break;
		}
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
				dispatch(setSingleBlindSliderValueSuccess(value, index));
			})
			.catch((error) => {
				console.log(error);
				dispatch(setSingleBlindFail());
			});
	};
};

export const setSingleBlindSliderValueSuccess = (value, index) => {
	const switchValue = value > 0;
	return {
		type: SET_SINGLE_BLIND_SLIDER_VALUE_SUCCESS,
		payload: {
			index,
			sliderValue: value,
			switchValue: switchValue
		}
	};
};

export const setSingleBlindUIsliderValue = (value, index) => {
	const switchValue = value > 0;
	return {
		type: SET_SINGLE_BLIND_UI_SLIDER_VALUE,
		payload: {
			index,
			UIsliderValue: value,
			UIswitchValue: switchValue
		}
	};
};

export const setSingleBlindFail = () => {
	return {
		type: SET_SINGLE_BLIND_FAIL
	};
};

export const setSingleBlindSelected = (value, index) => {
	return {
		type: SET_SINGLE_BLIND_SELECTED,
		payload: {
			index,
			selected: value
		}
	};
};

export const setDeselectAllBlinds = () => {
	return {
		type: SET_DESELECT_ALL_BLINDS,
		payload: {
			selected: false
		}
	};
};

export const setSelectedBlindsUIsliderValue = (value) => {
	const switchValue = value > 0;
	return {
		type: SET_SELECTED_BLINDS_UI_SLIDER_VALUE,
		payload: {
			UIsliderValue: value,
			UIswitchValue: switchValue
		}
	};
};

export const setSelectedBlindsSliderValue = (value = 0) => {
	return (dispatch, getState) => {
		const host = AppConfig.device.host;
		const objectType = 'analogValue';
		const data = {
			value: value.toString()
		};
		const params = {
			auth: {
				username: AppConfig.device.username,
				password: AppConfig.device.password
			}
		};

		let urlOfBlindsToUpdate = [];
		const { blindsData } = getState().blindsScreenReducer;

		blindsData.forEach((blind) => {
			if (blind.selected) {
				const objectInstance = blind.objectInstance;
				const url =
					'http://' +
					host +
					'/api/rest/v1/protocols/bacnet/local/objects/' +
					objectType +
					'/' +
					objectInstance.toString() +
					'/properties/present-value';

				urlOfBlindsToUpdate.push(url);
			}
		});

		let promiseArray = urlOfBlindsToUpdate.map((url) => axios.post(url, data, params));

		return axios
			.all(promiseArray)
			.then((response) => {
				blindsData.forEach((blind, index) => {
					if (blind.selected) {
						dispatch(setSingleBlindSliderValueSuccess(value, index));
					}
				});
			})
			.catch((error) => {
				console.log(error);
				dispatch(setSelectedBlindsFail());
			});
	};
};

export const setSelectedBlindsFail = () => {
	return {
		type: SET_SELECTED_BLINDS_FAIL
	};
};
