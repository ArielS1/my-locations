import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

//FormInput was replaced by TextInput due to a bug in package on Android version
import { FormLabel/*, FormInput*/ } from 'react-native-elements';

const numericField = {
  latitude: 'numeric',
  longitude: 'numeric'
};

class FormField extends Component {
  render() {
    const { name, value, validation, onChangeText } = this.props;
    return (
      <View>
        <View style={styles.fieldRow}>
          <FormLabel>{name.charAt(0).toUpperCase() + name.slice(1)}</FormLabel>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeText}
            value={value}
            keyboardType={numericField[name]}
          />
        </View>
        {validation}
      </View>
    );
  }
}

export default FormField;

const styles = StyleSheet.create({
  textInput: {
    width: 200,
    height: 30,
    padding: 8,
    borderWidth: 1,
    top: 10,
    borderColor: '#ccc'
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
