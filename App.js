import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './src/store';
import CategoriesScreen from './src/screens/CategoriesScreen';
import LocationsScreen from './src/screens/LocationsScreen';
import SetCategoryScreen from './src/screens/SetCategoryScreen';
import SetLocationScreen from './src/screens/SetLocationScreen';
import CategoryDetailsScreen from './src/screens/CategoryDetailsScreen';
import LocationDetailsScreen from './src/screens/LocationDetailsScreen';
import ShowLocationScreen from './src/screens/ShowLocationScreen';
import FilteredLocationScreen from './src/screens/FilteredLocationsScreen';

class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      Categories: {
        screen: StackNavigator({
          categories: { screen: CategoriesScreen },
          'set category': { screen: SetCategoryScreen },
          'category details': { screen: CategoryDetailsScreen }
        })
      },
      Locations: {
        screen: StackNavigator({
          locations: { screen: LocationsScreen },
          'set location': { screen: SetLocationScreen },
          'location details': { screen: LocationDetailsScreen },
          'show location': { screen: ShowLocationScreen },
          'filtered locations': { screen: FilteredLocationScreen }
        })
      }
    }, {
      lazyLoad: true,
      tabBarPosition: 'bottom',
      tabBarOptions: {
        showIcon: true,
      }
    });

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

export default App;
