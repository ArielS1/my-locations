import { CHANGE_FIELD } from './types';

export const changeField = (field, value, fields) => dispatch => dispatch({ payload: { field, value }, type: CHANGE_FIELD });
