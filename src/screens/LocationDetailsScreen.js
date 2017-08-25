import React, { Component } from 'react';
import { Platform, } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ShowField from '../components/ShowField';

function getLocationFields(location) {
  const { name, address, coordinates, category } = location;
  return {
    name,
    address,
    category,
    latitude: coordinates.latitude,
    longitude: coordinates.longitude
  };
}

class LocationsScreen extends Component {
  static navigationOptions = () => ({
    title: 'Location Details',
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  });

  location = getLocationFields(this.props.navigation.state.params);

  fields = ['name', 'address', 'latitude', 'longitude', 'category'].map((field, index) => (
    <ShowField key={index} name={field} value={this.location[field]} />
  ));

  render() {
    return <Card title='Properties'>{this.fields}</Card>;
  }
}

function mapStateToProps(state) {
  return state.locations;
}

export default connect(mapStateToProps, actions)(LocationsScreen);
