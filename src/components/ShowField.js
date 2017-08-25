import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel } from 'react-native-elements';

class ShowField extends Component {
  render() {
    const { name, value } = this.props;
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <FormLabel>{name.charAt(0).toUpperCase() + name.slice(1)}</FormLabel>
        <Text style={{ top: 4, fontSize: 25 }}>{value}</Text>
      </View>
    );
  }
}

export default ShowField;
