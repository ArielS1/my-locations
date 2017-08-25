import React, { Component } from 'react';
import { View, Platform, TextInput, StyleSheet } from 'react-native';
import { Icon, FormLabel, Card, FormValidationMessage, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { addCategory, editCategory } from '../actions';

class SetCategory extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.type} Category`,
    tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />,
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    },
    lazyLoad: true
  });

  componentWillMount() {
    this.nameValue = this.props.navigation.state.params.category.name;
  }

  onChangeText = text => {
    this.nameValue = text;
    this.nameValidation = text.length === 0 ?
      (<FormValidationMessage>Name is mandatory</FormValidationMessage>) : null;
    // Render to show/hide validation
    this.setState({ ...this.state });
  }

  type = this.props.navigation.state.params.type;
  validation = null;

  actionByType = {
    New: () => this.props.addCategory({ name: this.nameValue, key: this.nameValue }),
    Edit: () => this.props.editCategory({
      category: {
        name: this.nameValue,
        key: this.nameValue
      },
      previous: this.props.navigation.state.params.category
    })
  };

  render() {
    return (
      <View>
        <Card title='Fill Data'>
          <View style={{ flexDirection: 'row' }}>
            <FormLabel>Name</FormLabel>
            <TextInput
              style={styles.textInput}
              onChangeText={this.onChangeText}
              value={this.nameValue}
            />
          </View>
          {this.nameValidation}
        </Card>
        <Button
          large
          iconRight
          icon={{ name: 'save' }}
          title='Save'
          backgroundColor='green'
          style={{ top: 15 }}
          onPress={() => {
            const { nameValue } = this;
            if (nameValue) {
              this.actionByType[this.type]();
              this.props.navigation.goBack();
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    width: 200,
    height: 30,
    padding: 8,
    borderWidth: 1,
    top: 10,
    borderColor: '#ccc'
  }
});

function mapStateToProps(state) {
  return { categories: state.categories };
}

export default connect(mapStateToProps, { addCategory, editCategory })(SetCategory);
