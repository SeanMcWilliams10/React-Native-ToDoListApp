import React from 'react';
import { Text, AppState, AsyncStorage, Button, View } from 'react-native';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import ToDoAppReducer from './Reducer';
import ToDoList from './ToDoList';

//import massive from 'massive';
//import express from 'express';
/*
//const massive        = require('massive');
//const express        = require('express');
const app = express();
massive({
    host: 'localhost',
    port: 5432,
    database: 'todoappdb',
    user: 'postgres',
    password: 'password'
}).then(db => {
    app.set('db', db);
}).catch(console.log('connection failed'))
*/
let store = createStore(ToDoAppReducer);

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isStoreLoading: false,
      store: store
    }
  }

  getToDoLists () {
    //localhost:3000
    //165.156.39.32
    //10.84.164.58:19001
    return fetch('http://10.84.164.58:3000/todosapi/10', {
      method: 'GET',
    })
      .then(function (response) {
        console.log('GET BACK');
        //console.log(response);
        var json = response.json();
        return json;
        //console.log(json);
        //var r = json.data;
        //console.log(r);
      })
        .then(function (data) {
          //console.log(data);
          console.log(data.data);
          return data.data;
        })
      .catch(function (err) {
        console.log('ERROR');
        console.log(err);
      })
  }

  postToDoList () {
    var stringObj = JSON.stringify(this.state.store.getState());
    //console.log(stringObj);
    fetch('http://10.84.164.58:3000/todosapi', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        listTitle: 'Saved ToDo List',
        listObj: stringObj
      })
    })
      .then(function (response) {
        console.log(response);
      })
        .then(function (data) {
          console.log(data);
        })
      .catch(function (err) {
        console.log('ERROR');
        console.log(err);
      })
  }

  loadToDoList () {
    this.getToDoLists().then(function (list){
      console.log('THIS:' , list);
      var listObj = list["listobj"];
     // this.setState({store: listObj});
    });
    
    //console.log(list["listobj"]);
   // var json = JSON.parse(list);
    //var obj = json["listobj"];
    //console.log(obj);
    //var list1 = lists[0];
    //this.setState({store: list1});
  }

/*
  componentWillMount () {
    var self = this;
    const db = app.get('db');
    db.saveDoc('todoLists', { store }).then(list => {

    }).catch(console.log('saveDoc failed'))
    /*
    AppState.addEventListener('change', this.handleAppStateChange.bind(this));
    this.setState({isStoreLoading: true});
    try {
      const value = AsyncStorage.getItem('myFullStore');
      if (value !== null) {
        let savedStore = JSON.parse(value);
        self.setState({store: createStore(ToDoAppReducer, savedStore)});
      } else {
        console.log('was null');
        self.setState({store: store});
      }
      self.setState({isStoreLoading: false});
    }
    catch (error) {
      console.log('no good');
      console.log(error);
      self.setState({store: store, isStoreLoading: false});
    }
    * /
  }
/*
  componentWillUnmount () {
    AppState.removeEventListener('change', this.handleAppStateChange.bind(this));
  }

  handleAppStateChange () {
    let storeString = JSON.stringify(this.state.store.getState());
    AsyncStorage.setItem('myFullStore', storeString);
    console.log('store saved.');
  }
*/
  render() {
    return (
        <Provider store={this.state.store}>
          <View style={{flex:1, backgroundColor:'lightblue'}}>
          <ToDoList />
          <Button title="save ToDo List" onPress={this.postToDoList.bind(this)} />
          <Button title="load ToDo List" onPress={this.loadToDoList.bind(this)} />
          </View>
        </Provider>
      );
  }
/*
    if (this.state.isStoreLoading) {
      return <Text>Loading Saved List...</Text>
    } else {
      return (
        <Provider store={this.state.store}>
          <ToDoList store={this.state.store} />
        </Provider>
      );
    }
  }
}
*/
}
