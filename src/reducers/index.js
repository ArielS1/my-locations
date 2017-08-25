import { combineReducers } from 'redux';
import categories from './categories_reducer';
import locations from './locations_reducer';
import fields from './form_fields_reducer';

export default combineReducers({ locations, categories, fields });
