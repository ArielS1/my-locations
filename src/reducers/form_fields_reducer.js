import React from 'react';
import { FormValidationMessage } from 'react-native-elements';
import { CHANGE_FIELD } from '../actions/types';

const INITIAL_STATE = {
  fields: {
    name: {
      text: '',
      validation: null
    },
    address: {
      text: '',
      validation: null
    },
    latitude: {
      text: '',
      validation: null
    },
    longitude: {
      text: '',
      validation: null
    },
    category: {
      text: '',
      validation: null
    }
  }
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_FIELD: {
      const { field, value } = action.payload;
      console.log('change_field reducerrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
      console.log('action:');
      console.log(action);
      console.log('state:');
      console.log(state);
      const textField = state.fields[field];

      textField.text = value;
      textField.validation = value.length === 0;
      return JSON.parse(JSON.stringify(state));
    }

    default:
      return state;
  }
}
