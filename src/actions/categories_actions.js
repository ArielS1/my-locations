import {
  INITIALIZE_CATEGORIES,
  SELECT_CATEGORY,
  ADD_CATEGORY,
  EDIT_CATEGORY,
  REMOVE_CATEGORY
} from './types';

export const initializeCategories = () => ({ type: INITIALIZE_CATEGORIES });
export const selectCategory = category => dispatch => dispatch({ payload: category, type: SELECT_CATEGORY });
export const addCategory = category => dispatch => dispatch({ payload: category, type: ADD_CATEGORY });
export const editCategory = payload => dispatch => dispatch({ payload, type: EDIT_CATEGORY });
export const removeCategory = category => dispatch => dispatch({ payload: category, type: REMOVE_CATEGORY });
