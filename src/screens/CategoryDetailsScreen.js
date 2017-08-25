import React, { Component } from 'react';
import { Platform, } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ShowField from '../components/ShowField';

class CategoriesScreen extends Component {
  static navigationOptions = () => ({
    title: 'Category Details',
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  });

  render() {
    return (
      <Card title='Properties'>
        <ShowField name='name' value={this.props.navigation.state.params.name} />
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return state.categories;
}

export default connect(mapStateToProps, actions)(CategoriesScreen);
