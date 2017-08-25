import React, { Component } from 'react';
import { View, Platform, FlatList, Dimensions, StyleSheet, Vibration, Alert,
        SectionList, Text } from 'react-native';
import { Icon, ListItem, Button, ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import { selectLocation, addLocation, editLocation, removeLocation, setGroupMode } from '../actions';

const { width } = Dimensions.get('window');

const newLocation = categories => {
  return {
    categories,
    location: {
      name: '',
      address: '',
      coordinates: {
        latitude: '32',
        longitude: '32'
      },
      category: categories[0].name
    },
    type: 'New'
  };
};

function editLocationAction(location, previous, categories) {
  return {
    location,
    previous,
    categories,
    type: 'Edit'
  };
}

const buttons = ['Grouped', 'All'];

class LocationsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => <Icon name="place" size={30} color={tintColor} />,
    headerRight: (
      <View style={styles.headerButtons}>
        <ButtonGroup
          onPress={index => {
            navigation.state.params.setGroupMode(index);
            navigation.setParams(params => params); // render GroupButton
          }}
          selectedIndex={navigation.state.params ? navigation.state.params.getGroupMode() : 0}
          buttons={buttons}
          containerStyle={{ height: 30, width: 140, top: 10 }}
        />
        <Icon
          name='mode-edit'
          size={30}
          onPress={() => {
            const { getLocation, getCategories } = navigation.state.params;
            const selectedLocation = getLocation();
            if (selectedLocation.name) {
              const payload = editLocationAction(selectedLocation, selectedLocation, getCategories());
              navigation.navigate('set location', payload);
            } else {
              Alert.alert('You must select a location!');
            }
          }}
        />
        <Icon
          name='place'
          size={30}
          onPress={() => {
            const selectedLocation = navigation.state.params.getLocation();
            if (selectedLocation.name) {
              navigation.navigate('show location', selectedLocation);
            } else {
              Alert.alert('You must select a location!');
            }
          }}
        />
        <Icon
          name='visibility'
          size={30}
          onPress={() => {
            const selectedLocation = navigation.state.params.getLocation();
            if (selectedLocation.name) {
              navigation.navigate('location details', selectedLocation);
            } else {
              Alert.alert('You must select a location!');
            }
          }}
        />
        <Icon
          name='delete'
          size={30}
          onPress={() => {
            const selectedLocation = navigation.state.params.getLocation();
            if (selectedLocation.name) {
              navigation.state.params.removeLocation(selectedLocation);
            } else {
              Alert.alert('You must select a location!');
            }
          }}
        />
        <Icon
          name='add-location'
          size={30}
          onPress={() => navigation.navigate('set location', newLocation(navigation.state.params.getCategories()))}
        />
      </View>
    ),
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  });

  componentWillMount() {
    const { navigation, removeLocation, setGroupMode } = this.props;
    const { getLocation, getCategories, getGroupMode } = this;
    navigation.setParams({
      removeLocation,
      getLocation,
      getCategories,
      getGroupMode,
      setGroupMode
    });
  }

  getLocation = () => this.props.locations.selectedLocation;
  getCategories = () => this.props.categories.categories;
  getGroupMode = () => this.props.locations.groupMode;

  renderItem = ({ item }) => {
    const { locations, selectLocation } = this.props;
    const { selectedLocation } = locations;
    return (
      <ListItem
        title={item.name}
        containerStyle={selectedLocation && selectedLocation.name === item.name ? styles.selectedItem : null}
        onPress={() => {
          selectLocation(item);
          Vibration.vibrate();
        }}
      />
    );
  }

  renderSectionHeader = ({ section }) => (
    <Button
      iconRight
      icon={{ name: 'view-list' }}
      title={section.category}
      backgroundColor='blue'
      style={{ padding: 20, top: 20 }}
      onPress={() => {
        this.props.navigation.navigate('filtered locations', section.category);
      }}
    />
  );

  renderByGroupMode = [
    locations => {
      let dataSource = _.groupBy(locations.locations, item => item.category);
      dataSource = _.reduce(dataSource, (acc, next, index) => {
        acc.push({
          category: index,
          data: next
        });
        return acc;
      }, []);
      return (
        <SectionList
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          sections={dataSource}
        />
      );
    },
    (locations, selectedLocation) => (
      <FlatList
        data={locations.locations}
        extraData={this.state}
        renderItem={({ item }) => (
          <ListItem
            key={item.key}
            title={item.name}
            containerStyle={selectedLocation && selectedLocation.name === item.name ? styles.selectedItem : null}
            onPress={() => {
              this.props.selectLocation(item);
              Vibration.vibrate();
            }}
          />
        )}
      />
    )
  ];

  render() {
    const { locations, groupMode, categories } = this.props;
    return this.renderByGroupMode[locations.groupMode](locations, locations.selectedLocation);
  }
}

const styles = StyleSheet.create({
  headerButtons: {
    width,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  selectedItem: {
    backgroundColor: 'lightblue'
  },
  sectionItem: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 23,
    padding: 10,
    top: 10
  }
});

function mapStateToProps(state) {
  return {
    locations: state.locations,
    selectedLocation: state.selectedLocation,
    categories: state.categories,
    groupMode: state.groupMode
  };
}

export default connect(mapStateToProps, { selectLocation, editLocation, addLocation, removeLocation, setGroupMode })(LocationsScreen);
