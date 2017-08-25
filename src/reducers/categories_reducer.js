import _ from 'lodash';
import {
  SELECT_CATEGORY,
  ADD_CATEGORY,
  EDIT_CATEGORY,
  REMOVE_CATEGORY,
} from '../actions/types';

const INITIAL_STATE = {
  categories: [
    { name: 'Country Clubs', key: 'Country Clubs' },
    { name: 'Movie Theatres', key: 'Movie Theatres' },
    { name: 'Restaurants', key: 'Restaurants' },
  ],
  selectedCategory: {
    name: ''
  }
};

const sortByName = (a, b) => {
  const nameA = a.name.toUpperCase(); // ignore upper and lowercase
  const nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return {
        categories: state.categories.slice(),
        selectedCategory: action.payload
      };
    case ADD_CATEGORY:
      // _uniqBy() is used to prevent duplicates
      return {
        categories: _.uniqBy([action.payload, ...state.categories], 'name').sort(sortByName),
        updated: true
      };
    case EDIT_CATEGORY: {
      const { category, previous } = action.payload;
      const filtered = state.categories.filter(c => c.name !== previous.name);
      return {
        categories: _.uniqBy([category, ...filtered], 'name').sort(sortByName),
        selectedCategory: action.payload.category
      };
    }
    case REMOVE_CATEGORY:
      return {
        categories: state.categories.filter(category => category.name !== action.payload.name),
        updated: true
      };
    default:
      return state;
  }
}
