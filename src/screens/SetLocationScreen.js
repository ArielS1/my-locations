import React, { Component } from 'react';
import { ScrollView, Platform, Picker, Alert, View } from 'react-native';
import { Icon, FormLabel, Card, Button, FormValidationMessage } from 'react-native-elements';
import { connect } from 'react-redux';
import { addLocation, editLocation, changeField } from '../actions';
import FormField from '../components/FormField';

const fieldKeys = ['name', 'address', 'latitude', 'longitude'];

function getValidationMessage(name, validation) {
  return validation ? <FormValidationMessage>{name.charAt(0).toUpperCase() + name.slice(1)} is mandatory</FormValidationMessage> : null;
}

class SetLocation extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.type} Location`,
    tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />,
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    },
    lazyLoad: false
  });

  componentDidMount() {
    console.log('setlocation component wil mounttttttttttttttttttttttttt');
    console.log(this.props.navigation.state.params.location);
    const { navigation, changeField } = this.props;
    const { name, address, coordinates, category } = navigation.state.params.location;
    this.setState({ category });
    changeField('name', name);
    changeField('address', address);
    changeField('latitude', coordinates.latitude);
    changeField('longitude', coordinates.longitude);
    changeField('category', category);
  }

  onButtonPress = () => {
    const { navigation, fields } = this.props;
    const { name, address, latitude, longitude, category } = fields;
    if (name.text && address.text && latitude.text && longitude.text && category.text) {
      this.actionByType[this.type](name.text, address.text, latitude.text, longitude.text, category.text);
      navigation.goBack();
    } else {
      Alert.alert('missing data!');
    }
  }

  actionByType = {
    New: (name, address, latitude, longitude, category) => this.props.addLocation({
      name,
      address,
      category,
      key: name,
      coordinates: {
        latitude,
        longitude
      }
    }),
    Edit: (name, address, latitude, longitude, category) => {
      console.log('editttttttttttttttttttttttttttttttttt');
      console.log(this.props);
      const { navigation, editLocation } = this.props;
      editLocation({
        location: {
          name,
          address,
          category,
          key: name,
          coordinates: {
            latitude,
            longitude
          },
        },
        previous: navigation.state.params.previous.name
      });
    }
  };

  type = this.props.navigation.state.params.type;

  render() {
    console.log('SetLocationScreen propsxxxxxxxxxxxxxxxx');
    console.log(this.props);
    const { navigation, fields } = this.props;
    const { categories } = navigation.state.params;
    const textFields = fieldKeys.map((field, index) => {
      const { text, validation } = fields[field];
      return (
        <View key={index}>
          <FormField
            name={field}
            value={text}
            onChangeText={newText => this.props.changeField(field, newText)}
          />
          {getValidationMessage(field, validation)}
        </View>
      );
    });

    return (
      <ScrollView>
        <Card title='Fill Data'>
          {textFields}
          <FormLabel>Category</FormLabel>
          <Picker
            selectedValue={this.props.fields.category.text || categories[0]}
            onValueChange={cat => this.props.changeField('category', cat)}
          >
            {categories.map((cat, index) => (
              <Picker.Item
                label={cat.name}
                value={cat.name}
                key={index}
              />
            ))}
          </Picker>
        </Card>
        <Button
          large
          iconRight
          icon={{ name: 'save' }}
          title='Save'
          backgroundColor='green'
          style={{ top: 15 }}
          onPress={this.onButtonPress}
        />
      </ScrollView>
    );
  }
}


function mapStateToProps(state) {
  return { fields: state.fields.fields };
}

export default connect(mapStateToProps, { addLocation, editLocation, changeField })(SetLocation);
