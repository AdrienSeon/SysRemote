import {
	GET_ALL_BLINDS_SUCCESS,
	GET_ALL_BLINDS_FAIL,
	GET_BLINDS_AUTO_SUCCESS,
	GET_BLINDS_AUTO_FAIL,
	SET_BLINDS_AUTO_SUCCESS,
	SET_ALL_BLINDS_SLIDER_VALUE_SUCCESS,
	SET_ALL_BLINDS_UI_SLIDER_VALUE,
	SET_ALL_BLINDS_SUCCESS,
	SET_ALL_BLINDS_FAIL,
	GET_SINGLE_BLIND_SUCCESS,
	SET_SINGLE_BLIND_SLIDER_VALUE_SUCCESS,
	SET_SINGLE_BLIND_UI_SLIDER_VALUE,
	SET_SINGLE_BLIND_FAIL,
	SET_SINGLE_BLIND_SELECTED,
	SET_DESELECT_ALL_BLINDS,
	SET_SELECTED_BLINDS_UI_SLIDER_VALUE
} from './types';
import AppConfig from '../constants/AppConfig';
import axios from 'axios';

export const getAllBlinds = () => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectType = 'analogOutput';
		const objectInstanceBlind1Trans = 8241;
		const objectInstanceBlind1Rot = 8251;
		const objectInstanceBlind2Trans = 8242;
		const objectInstanceBlind2Rot = 8252;
		const objectInstanceBlind3Trans = 8243;
		const objectInstanceBlind3Rot = 8253;
		const objectInstanceBlind4Trans = 8244;
		const objectInstanceBlind4Rot = 8254;
		const objectInstanceBlind5Trans = 999;
		const objectInstanceBlind5Rot = 999;
		const objectInstanceBlind6Trans = 999;
		const objectInstanceBlind6Rot = 999;
		const objectInstanceBlind7Trans = 999;
		const objectInstanceBlind7Rot = 999;
		const objectInstanceBlind8Trans = 999;
		const objectInstanceBlind8Rot = 999;
		/*		const objectInstanceBlind5Trans = 8441;
		const objectInstanceBlind5Rot = 8451;
		const objectInstanceBlind6Trans = 8442;
		const objectInstanceBlind6Rot = 8452;
		const objectInstanceBlind7Trans = 8443;
		const objectInstanceBlind7Rot = 8453;
		const objectInstanceBlind8Trans = 8444;
		const objectInstanceBlind8Rot = 8454;*/
		const url =
			'http://' + host + '/api/rest/v1/protocols/bacnet/local/objects/read-property-multiple';
		const data = {
			encode: 'text',
			propertyReferences: [
				{
					type: objectType,
					instance: objectInstanceBlind1Trans,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind1Trans,
					property: 'units'
				},
				{
					type: objectType,
					instance: objectInstanceBlind1Rot,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind1Rot,
					property: 'units'
				},
				{
					type: objectType,
					instance: objectInstanceBlind2Trans,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind2Rot,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind3Trans,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind3Rot,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind4Trans,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind4Rot,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind5Trans,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind5Rot,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind6Trans,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind6Rot,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind7Trans,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind7Rot,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind8Trans,
					property: 'presentValue'
				},
				{
					type: objectType,
					instance: objectInstanceBlind8Rot,
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
				const responseResults = [
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

				responseResults.forEach((blind, index) => {
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
							responseResults[0].translation.unit,
							responseResults[0].rotation.unit
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

export const setAllBlindsSliderValue = (value = 0) => {
	return (dispatch, getState) => {
		const host = AppConfig.device.host;
		const objectTypeTrans = 'analogValue';
		const { blindsData } = getState().blindsScreenReducer;
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
		blindsData.forEach((blind) => {
			if (blind.isLoaded) {
				const urlTrans =
					'http://' +
					host +
					'/api/rest/v1/protocols/bacnet/local/objects/' +
					objectTypeTrans +
					'/' +
					blind.objectInstanceTrans.toString() +
					'/properties/present-value';
				urlOfBlindsToUpdate.push(urlTrans);
			}
		});

		let promiseArray = urlOfBlindsToUpdate.map((url) => axios.post(url, data, params));

		return axios
			.all(promiseArray)
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
	return {
		type: SET_ALL_BLINDS_SLIDER_VALUE_SUCCESS,
		payload: {
			sliderValue: value
		}
	};
};

export const setAllBlindsUIsliderValue = (value) => {
	return {
		type: SET_ALL_BLINDS_UI_SLIDER_VALUE,
		payload: {
			UIsliderValue: value
		}
	};
};

export const getBlindsAuto = () => {
	return (dispatch) => {
		const host = AppConfig.device.host;
		const objectTypeTrans = 'analogValue';
		const objectTypeRot = 'multistateValue';
		const objectInstanceBlind1Trans = 204;
		const objectInstanceBlind1Rot = 51;
		const objectInstanceBlind2Trans = 205;
		const objectInstanceBlind2Rot = 52;
		const objectInstanceBlind3Trans = 206;
		const objectInstanceBlind3Rot = 53;
		const objectInstanceBlind4Trans = 207;
		const objectInstanceBlind4Rot = 54;
		const objectInstanceBlind5Trans = 999;
		const objectInstanceBlind5Rot = 999;
		const objectInstanceBlind6Trans = 999;
		const objectInstanceBlind6Rot = 999;
		const objectInstanceBlind7Trans = 999;
		const objectInstanceBlind7Rot = 999;
		const objectInstanceBlind8Trans = 999;
		const objectInstanceBlind8Rot = 999;
		const url =
			'http://' + host + '/api/rest/v1/protocols/bacnet/local/objects/read-property-multiple';
		const data = {
			encode: 'text',
			propertyReferences: [
				{
					type: objectTypeTrans,
					instance: objectInstanceBlind1Trans,
					property: 'presentValue'
				},
				{
					type: objectTypeTrans,
					instance: objectInstanceBlind2Trans,
					property: 'presentValue'
				},
				{
					type: objectTypeTrans,
					instance: objectInstanceBlind3Trans,
					property: 'presentValue'
				},
				{
					type: objectTypeTrans,
					instance: objectInstanceBlind4Trans,
					property: 'presentValue'
				},
				{
					type: objectTypeTrans,
					instance: objectInstanceBlind5Trans,
					property: 'presentValue'
				},
				{
					type: objectTypeTrans,
					instance: objectInstanceBlind6Trans,
					property: 'presentValue'
				},
				{
					type: objectTypeTrans,
					instance: objectInstanceBlind7Trans,
					property: 'presentValue'
				},
				{
					type: objectTypeTrans,
					instance: objectInstanceBlind8Trans,
					property: 'presentValue'
				},
				{
					type: objectTypeRot,
					instance: objectInstanceBlind1Rot,
					property: 'presentValue'
				},
				{
					type: objectTypeRot,
					instance: objectInstanceBlind2Rot,
					property: 'presentValue'
				},
				{
					type: objectTypeRot,
					instance: objectInstanceBlind3Rot,
					property: 'presentValue'
				},
				{
					type: objectTypeRot,
					instance: objectInstanceBlind4Rot,
					property: 'presentValue'
				},
				{
					type: objectTypeRot,
					instance: objectInstanceBlind5Rot,
					property: 'presentValue'
				},
				{
					type: objectTypeRot,
					instance: objectInstanceBlind6Rot,
					property: 'presentValue'
				},
				{
					type: objectTypeRot,
					instance: objectInstanceBlind7Rot,
					property: 'presentValue'
				},
				{
					type: objectTypeRot,
					instance: objectInstanceBlind8Rot,
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
				const responseResults = [
					{
						translation: {
							value: response.data[0].value,
							error: response.data[0].error
						},
						rotation: {
							value: response.data[8].value,
							error: response.data[8].error
						}
					},
					{
						translation: {
							value: response.data[1].value,
							error: response.data[1].error
						},
						rotation: {
							value: response.data[9].value,
							error: response.data[9].error
						}
					},
					{
						translation: {
							value: response.data[2].value,
							error: response.data[2].error
						},
						rotation: {
							value: response.data[10].value,
							error: response.data[10].error
						}
					},
					{
						translation: {
							value: response.data[3].value,
							error: response.data[3].error
						},
						rotation: {
							value: response.data[11].value,
							error: response.data[11].error
						}
					},
					{
						translation: {
							value: response.data[4].value,
							error: response.data[4].error
						},
						rotation: {
							value: response.data[12].value,
							error: response.data[12].error
						}
					},
					{
						translation: {
							value: response.data[5].value,
							error: response.data[5].error
						},
						rotation: {
							value: response.data[13].value,
							error: response.data[13].error
						}
					},
					{
						translation: {
							value: response.data[6].value,
							error: response.data[6].error
						},
						rotation: {
							value: response.data[14].value,
							error: response.data[14].error
						}
					},
					{
						translation: {
							value: response.data[7].value,
							error: response.data[7].error
						},
						rotation: {
							value: response.data[15].value,
							error: response.data[15].error
						}
					}
				];

				const autoState =
					(responseResults[0].translation.value === 'NaN' ||
						responseResults[0].translation.error) &&
					(responseResults[1].translation.value === 'NaN' ||
						responseResults[1].translation.error) &&
					(responseResults[2].translation.value === 'NaN' ||
						responseResults[2].translation.error) &&
					(responseResults[3].translation.value === 'NaN' ||
						responseResults[3].translation.error) &&
					(responseResults[4].translation.value === 'NaN' ||
						responseResults[4].translation.error) &&
					(responseResults[5].translation.value === 'NaN' ||
						responseResults[5].translation.error) &&
					(responseResults[6].translation.value === 'NaN' ||
						responseResults[6].translation.error) &&
					(responseResults[7].translation.value === 'NaN' ||
						responseResults[7].translation.error) &&
					(responseResults[0].rotation.value === 1 ||
						responseResults[0].rotation.error) &&
					(responseResults[1].rotation.value === 1 ||
						responseResults[1].rotation.error) &&
					(responseResults[2].rotation.value === 1 ||
						responseResults[2].rotation.error) &&
					(responseResults[3].rotation.value === 1 ||
						responseResults[3].rotation.error) &&
					(responseResults[4].rotation.value === 1 ||
						responseResults[4].rotation.error) &&
					(responseResults[5].rotation.value === 1 ||
						responseResults[5].rotation.error) &&
					(responseResults[6].rotation.value === 1 ||
						responseResults[6].rotation.error) &&
					(responseResults[7].rotation.value === 1 || responseResults[7].rotation.error)
						? true
						: false;
				dispatch(getBlindsAutoSuccess(autoState, responseResults));
			})
			.catch((error) => {
				console.log(error);
				dispatch(getBlindsAutoFail());
			});
	};
};

export const getBlindsAutoSuccess = (value, test) => {
	return {
		type: GET_BLINDS_AUTO_SUCCESS,
		payload: {
			isLoaded: test,
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
	return (dispatch, getState) => {
		const host = AppConfig.device.host;
		const objectTypeTrans = 'analogValue';
		const objectTypeRot = 'multistateValue';
		const { blindsData } = getState().blindsScreenReducer;
		const data = {
			value: 'null'
		};
		const params = {
			auth: {
				username: AppConfig.device.username,
				password: AppConfig.device.password
			}
		};

		let urlOfBlindsToUpdate = [];
		blindsData.forEach((blind) => {
			if (blind.isLoaded) {
				const urlTrans =
					'http://' +
					host +
					'/api/rest/v1/protocols/bacnet/local/objects/' +
					objectTypeTrans +
					'/' +
					blind.objectInstanceTrans.toString() +
					'/properties/present-value';
				urlOfBlindsToUpdate.push(urlTrans);

				const urlRot =
					'http://' +
					host +
					'/api/rest/v1/protocols/bacnet/local/objects/' +
					objectTypeRot +
					'/' +
					blind.objectInstanceRot.toString() +
					'/properties/present-value';
				urlOfBlindsToUpdate.push(urlRot);
			}
		});

		let promiseArray = urlOfBlindsToUpdate.map((url) => axios.post(url, data, params));

		return axios
			.all(promiseArray)
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
	return {
		type: SET_SELECTED_BLINDS_UI_SLIDER_VALUE,
		payload: {
			UIsliderValue: value
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
