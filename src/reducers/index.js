import { combineReducers } from 'redux';
import temperatureScreenReducer from './temperatureScreenReducer';
import lightsScreenReducer from './lightsScreenReducer';
import blindsScreenReducer from './blindsScreenReducer';

export default combineReducers({
    temperatureScreenReducer,
    lightsScreenReducer,
    blindsScreenReducer
});