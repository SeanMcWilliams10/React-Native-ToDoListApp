import React from 'react';
import { StyleSheet, Text, Image, TextInput, Button, View, ListView, ScrollView, KeyboardAvoidingView } from 'react-native';
import Footer from './Footer';
import { List, ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import MyListItem from './MyListItem';
import { createStore, combineReducers } from 'redux';
import ToDoAppReducer from './Reducer';
import {Provider, connect} from 'react-redux';
import Header from './Header';
import MyList from './MyList';

class ToDoList extends React.Component {
  constructor (props) {
    super(props);
    const store = props.store;
  }

  render () {
    const store = this.props.store;
    return (
      <View style={styles.container}>
        <Header/>
        <MyList/>
        <KeyboardAvoidingView behavior='padding' style={{alignSelf: 'stretch'}}>
            <Footer/> 
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default ToDoList;

ToDoList.contextTypes = {
  store: React.PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});