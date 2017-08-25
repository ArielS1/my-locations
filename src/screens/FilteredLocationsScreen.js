import React, { Component } from 'react';
import { Platform, FlatList, Vibration } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

class FilteredLocationsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params} Locations`,
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  });

  renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.name}
        onPress={() => {
          this.props.navigation.navigate('location details', item);
          Vibration.vibrate();
        }}
      />
    );
  }

  render() {
    const { locations } = this.props.locations;
    console.log('filtereddddddddddddddddddddddddddd');
    console.log(this.props.navigation);
    console.log(locations);
    return (
      <FlatList
        data={locations.filter(l => l.category === this.props.navigation.state.params)}
        extraData={this.state}
        renderItem={this.renderItem}
      />
    );
  }
}

function mapStateToProps(state) {
  return { locations: state.locations };
}

export default connect(mapStateToProps, {})(FilteredLocationsScreen);
