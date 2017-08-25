import {
  SELECT_LOCATION,
  ADD_LOCATION,
  EDIT_LOCATION,
  REMOVE_LOCATION,
  SET_GROUP_MODE,
} from './types';

export const selectLocation = location => dispatch => dispatch({ payload: location, type: SELECT_LOCATION });
export const addLocation = location => dispatch => dispatch({ payload: location, type: ADD_LOCATION });
export const editLocation = payload => dispatch => dispatch({ payload, type: EDIT_LOCATION });
export const removeLocation = location => dispatch => dispatch({ payload: location, type: REMOVE_LOCATION });
export const setGroupMode = index => dispatch => dispatch({ payload: index, type: SET_GROUP_MODE });
