import React, { Component } from 'react';
import { View, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ShowLocationScreen extends Component {
  static navigationOptions = () => ({
    title: 'Location On Map',
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  });

  componentWillMount() {
    const { longitude, latitude } = this.props.navigation.state.params.coordinates;
    this.state = {
      mapLoaded: true,
      region: {
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
        longitudeDelta: 0.04,
        latitudeDelta: 0.09
      }
    };
  }

  onRegionChangeComplete = region => this.setState({ region });

  render() {
    let { longitude, latitude } = this.props.navigation.state.params.coordinates;
    return this.state.mapLoaded ?
    (
      // Expo built-in Airbnb's maps API
      <MapView
        region={this.state.region}
        style={styles.map}
        onRegionChangeComplete={this.onRegionChangeComplete}
      >
        <MapView.Marker
          key={0}
          coordinate={{ longitude: parseFloat(longitude), latitude: parseFloat(latitude) }}
          pinColor={'red'}
        />
      </MapView>
    ) :
    (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default connect(mapStateToProps, {})(ShowLocationScreen);
