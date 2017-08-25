import _ from 'lodash';
import {
  SELECT_LOCATION,
  ADD_LOCATION,
  EDIT_LOCATION,
  REMOVE_LOCATION,
  SET_GROUP_MODE
} from '../actions/types';

const INITIAL_STATE = {
  locations: [
    {
      name: 'Palm Country Club',
      address: 'Kosovski 69, Tel-Aviv',
      coordinates: {
        latitude: '32.097299',
        longitude: '34.803908'
      },
      key: 'Tel-Aviv Country Club',
      category: 'Country Clubs'
    },
    {
      name: 'Hakantri Raanana',
      address: 'Hasadna 15, Raanana',
      coordinates: {
        latitude: '32.194124',
        longitude: '34.878862'
      },
      key: 'Hakantri Raanana',
      category: 'Country Clubs'
    },
    {
      name: 'Cinema-City',
      address: 'Glilot, Ramat Hasharon',
      coordinates: {
        latitude: '32.146420',
        longitude: '34.804751'
      },
      key: 'Cinema-City',
      category: 'Movie Theatres'
    },
    {
      name: 'Yes-Planet',
      address: 'Aba Hilel 301, Ramat Gan',
      coordinates: {
        latitude: '32.099440',
        longitude: '34.827054'
      },
      key: 'Yes-Planet',
      category: 'Movie Theatres'
    },
    {
      name: 'Agadir',
      address: 'Nahalat Benyamin 2, Tel-Aviv',
      coordinates: {
        latitude: '32.069361',
        longitude: '34.770153'
      },
      key: 'Agadir',
      category: 'Restaurants'
    },
    {
      name: 'Brasserie',
      address: 'Ibn Gabirol 70, Tel-Aviv',
      coordinates: {
        latitude: '32.080672',
        longitude: '34.781599'
      },
      key: 'Brasserie',
      category: 'Restaurants'
    }
  ].sort(sortByName),
  selectedLocation: {
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    category: ''
  },
  groupMode: 0
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
    case SELECT_LOCATION:
      return {
        locations: state.locations.slice(),
        selectedLocation: action.payload,
        groupMode: state.groupMode
      };
    case ADD_LOCATION:
      // _uniqBy() is used to prevent duplicates
      return {
        locations: _.uniqBy([action.payload, ...state.locations], 'name').sort(sortByName),
        categories: state.categories,
        groupMode: state.groupMode
      };
    case EDIT_LOCATION: {
      const { location, previous } = action.payload;
      const filtered = state.locations.filter(c => c.name !== previous);
      return {
        locations: _.uniqBy([location, ...filtered], 'name').sort(sortByName),
        selectedLocation: action.payload,
        groupMode: state.groupMode
      };
    }
    case REMOVE_LOCATION:
      return {
        locations: state.locations.filter(location => location.name !== action.payload.name),
        groupMode: state.groupMode
      };
    case SET_GROUP_MODE: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.groupMode = action.payload;
      return newState;
    }
    default:
      return state;
  }
}
