import { combineReducers } from 'redux';
import temperatureScreenReducer from './temperatureScreenReducer';
import lightsScreenReducer from './lightsScreenReducer';

export default combineReducers({
    temperatureScreenReducer,
    lightsScreenReducer
});