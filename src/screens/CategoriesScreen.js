import React, { Component } from 'react';
import { View, Platform, FlatList, Dimensions, StyleSheet, Alert } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { selectCategory, addCategory, editCategory, removeCategory } from '../actions';

const { width } = Dimensions.get('window');

const newCategory = {
  category: {
    name: ''
  },
  type: 'New'
};

function editCategoryAction(category, previous) {
  return {
    category,
    previous,
    type: 'Edit'
  };
}

let categoriesRef;

class CategoriesScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />,
    headerRight: (
      <View style={styles.headerButtons}>
        <Icon
          name='mode-edit'
          size={30}
          onPress={() => {
            const selectedCategory = categoriesRef.getCategory();
            if (selectedCategory.name) {
              const payload = editCategoryAction({ name: selectedCategory.name, key: selectedCategory.key }, selectedCategory);
              navigation.navigate('set category', payload);
            } else {
              Alert.alert('You must select a category!');
            }
          }}
        />
        <Icon
          name='visibility'
          size={30}
          onPress={() => {
            const selectedCategory = categoriesRef.getCategory();
            if (selectedCategory.name) {
              navigation.navigate('category details', selectedCategory);
            } else {
              Alert.alert('You must select a category!');
            }
          }}
        />
        <Icon
          name='delete'
          size={30}
          onPress={() => {
            console.log('delete pressedddddddddddddddd');
            console.log(navigation);
            const selectedCategory = categoriesRef.getCategory();
            if (selectedCategory.name) {
              categoriesRef.props.removeCategory(selectedCategory);
            } else {
              Alert.alert('You must select a category!');
            }
          }}
        />
        <Icon
          name='playlist-add'
          size={30}
          onPress={() => navigation.navigate('set category', newCategory)}
        />
      </View>
    ),
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  });

  getCategory = () => this.props.categories.selectedCategory;

  render() {
    categoriesRef = this;
    console.log('render categoriessssssssssssss');
    console.log(this.props);
    const { categories, selectCategory } = this.props;
    const selectedCategory = this.props.categories.selectedCategory || categories.selectedCategory;
    return (
      <FlatList
        data={this.props.categories.categories}
        extraData={this.state}
        renderItem={({ item }) => (
          <ListItem
            key={item.key}
            title={item.name}
            containerStyle={selectedCategory && selectedCategory.name === item.name ? styles.selectedItem : null}
            onPress={() => selectCategory(item)}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  headerButtons: {
    width,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 30,
    paddingLeft: 30
  },
  selectedItem: {
    backgroundColor: 'lightblue'
  }
});

function mapStateToProps(state) {
  return { categories: state.categories };
}

export default connect(mapStateToProps, { selectCategory, editCategory, addCategory, removeCategory })(CategoriesScreen);
