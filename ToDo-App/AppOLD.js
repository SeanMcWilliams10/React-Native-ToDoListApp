import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, ListView, ScrollView, KeyboardAvoidingView } from 'react-native';
import Row from './Row';
import Checkbox from './Checkbox';
import Footer from './Footer';
import { List, ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import MyListItem from './MyListItem';
import SortableList from 'react-native-sortable-list';
import { createStore, combineReducers } from 'redux';
import ToDoAppReducer from './Reducer';
//import store from './Reducer';
import {Provider} from 'react-redux';
import ToDoList from './ToDoList';


// React-Native-Elements, React-Native-Swipeout, Redux, React-Redux, React-Native-Sortable-List

export default class App extends React.Component {
  render() {
    //let store = createStore(ToDoAppReducer);
    return (
      <Provider store={createStore(ToDoAppReducer)}>
        <ToDoList />
      </Provider>
    );
  }
}

//Realm & Navigator, ramda
class ToDoList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userInput: '',
      nextId: 0,
      editable: false,
      showCompleted: true,
      orderIds: [],
      tasks: [
        {
          id: 0,
          text: 't',
          completed: false
        }
      ],
      taskObjectArray: {},
   /* dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
      }), //.cloneWithRows(['task1']), */
    };
    const store = props;
    //props.store.subscribe(render);
    //const store = createStore(ToDoAppReducer);
  }

  getIndex (value, arr) {
    for (var i=0; i<arr.length; i++) {
      if (arr[i].id === value) {
        return i;
      }
    }
    return -1;
  }

  handleChange (text) {
    this.setState({
      userInput: text
    });
  }

  newHandleAdd () {
    var myId = store.getState().nextId;
    var myText = this.state.userInput;
    store.dispatch({
      type: 'ADD_TODO',
      text: myText,
      id: myId
    });
  }

  handleAdd () {
    var taskList = this.state.tasks;
    var myId = this.state.nextId;
    var idList = this.state.orderIds;
    if (myId == 0) {
      taskList.pop();
    }
    var newText = this.state.userInput;
    if (newText != '') {
      const newTask = {
        id: myId,
        text: newText,
        completed: false
      };
      taskList.push(newTask);
      idList.push(myId);
      var objArray;
      if (myId == 0) {
        objArray = Object.assign({}, taskList);
      } else {
        objArray = this.state.taskObjectArray;
        objArray[myId] = newTask;
      }
      console.log(objArray);
      myId++;
      this.setState({
        userInput: '',
        tasks: taskList,
        nextId: myId,
        orderIds: idList,
        taskObjectArray: objArray,
        //dataSource: this.state.dataSource.cloneWithRows(taskList)
      });
    }
  }

  newHandleDelete (rowId) {
    store.dispatch({
      type: 'DELETE_TODO',
      id: rowId
    });
  }

  handleDelete (rowId) {
    //console.log('Handling Delete');
    var taskList = this.state.tasks;
    var objList = this.state.taskObjectArray;
    var ids = this.state.orderIds;
    var index = this.getIndex(rowId, taskList);
    taskList.splice(index, 1);
    ids.splice(index, 1);
    delete objList[rowId];
    //var newList = Object.assign({}, taskList);
    //objList.splice(index, 1);
    this.setState({
      tasks: taskList,
      taskObjectArray: objList,
      orderIds: ids,
      //dataSource: this.state.dataSource.cloneWithRows(taskList)
    });
  }

  newHandleCheckboxToggle (rowId) {
    store.dispatch({
      type: 'TOGGLE_TODO',
      id: rowId
    });
  }

  handleCheckboxToggle (rowId) {
    var taskList = this.state.tasks;
    var index = this.getIndex(rowId, taskList);
    taskList[index].completed = taskList[index].completed === false ? true : false;
    this.setState({tasks: taskList});
    //console.log(index);
    //!taskList[index].completed; 
  }

  newToggleComplete () {
    store.dispatch({
      type: 'TOGGLE_VISIBILITY'
    });
  }

  toggleCompleted () {
    //var taskList = this.state.tasks;
    var com = this.state.showCompleted;
    com = !com;
    this.setState({showCompleted: com});
  }

  newToggleEdit ( {store} ) {
    store.dispatch({
      type: 'TOGGLE_EDITING'
    });
  }
  
  toggleEdit () {
    var edit = this.state.editable;
    edit = !edit;
    this.setState({editable: edit});
  }

  componentWillMount () {
    //store = createStore(todoApp);
    
    if (this.state.nextId === 0) {
      var taskList = this.state.tasks;
      taskList.pop();
      this.setState({tasks: taskList});
    }
  }
/*
  componentDidMount () {
    const props = this.props;
    const store = props;
    console.log(store);
    //const state = store.getState();
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }
*/
/*
  renderRow (rowData, active) {
    //console.log(rowData);
    if (this.state.showCompleted || !rowData.data.completed) {
      return (
        <MyListItem
          key={rowData.data.id}
          rowData={rowData.data} 
          active={active}
          editable={this.state.editable}
          onToggle={this.handleCheckboxToggle}
          onDelete={this.handleDelete}
        /> 
      );
    }
  }
*/
  render () {
    var me = this;
    const { store } = this.props;

    return (
      <View style={styles.container}>
        <Header 
        /* Header Props:
            ?completedTitle={}
            state.visibilityFilter
            dispatch({type: 'TOGGLE_VISIBILITY'})

            state.editability
            dispatch({type: 'TOGGLE_EDITING'})
          */
        />
        <View style={styles.topBar}>
          <View  >
            <Button
            //mStateToProps: state.visibilityFilter
            //mDispatchToProps: type: 'TOGGLE_VISIBILITY'
              title={this.state.showCompleted ? "Hide\nCompleted" : "Show\nCompleted"}
              onPress={this.toggleCompleted.bind(this)}
              style={{paddingTop: 20, alignSelf: 'flex-end'}}
            />
          </View>
          <View style={{alignSelf:'center', justifyContent: 'center', paddingRight: 40, paddingTop: 20}} >
            <Text style={{fontSize: 40,}} > ToDo: </Text>
          </View>
          <View style={{justifyContent: 'flex-end', alignSelf: 'flex-end'}} >
            <Button 
            //mStateToProps: state.editability
            //mDispatchToProps: type: 'TOGGLE_EDITING'
              title={this.state.editable ? "Done" : "Edit"}
              //title={store.getState().editability ? "Done" : "Edit"}
              onPress={this.toggleEdit.bind(this)}
              //onPress={() => {store.dispatch({type: 'TOGGLE_EDITING'})}}
            />
          </View>
        </View>
        <MyList 
        /*
          MyList Props:
            state.todos
            state.visibilityFilter
            state.editability
            onToggle = 
              dispatch({
                type: 'TOGGLE_TODO',
                id: rowId})
            onDelete =
              dispatch({
                type: 'DELETE_TODO',
                id: rowId
            })
        */
        />
        <ScrollView style={{alignSelf: 'stretch'}} >
        <List style={{alignSelf: 'stretch', flex:1}} >
          {/*
          <SortableList 
            style={{alignSelf: 'stretch', backgroundColor:'blue'}}
            data={this.state.taskObjectArray}
            
            renderRow={this.renderRow}
            sortingEnabled={this.state.editable}
            contentContainerStyle={{ alignSelf: 'stretch', backgroundColor:'purple'}}
          />
         */ } 
            {
            this.state.tasks.map((task, i) => (
              (!this.state.showCompleted && task.completed) ? 
                (<View key={-i} ></View>)
              :
                <MyListItem
                  key={task.id}
                  rowData={task} 
                  editable={this.state.editable}
                  //editable={store.getState().editability}
                  onToggle={this.handleCheckboxToggle.bind(this)}
                  onDelete={this.handleDelete.bind(this)}
                /> 
            ))
            }
        </List>
        </ScrollView>
        <KeyboardAvoidingView behavior='padding' style={{alignSelf: 'stretch'}}>
        <Footer
          onChange={this.handleChange.bind(this)} 
          onSubmit={this.handleAdd.bind(this)} 
        /> 
        </KeyboardAvoidingView>
      </View>
    );
  }

//let s = store.subscribe(render);
//render();
}
ToDoList.contextTypes = {
  store: React.PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue', //#fff
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topBar: {
    //flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    backgroundColor: 'blue',
    padding: 10
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  deleteCircle: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        backgroundColor: 'red',
  },
  completed: {
        backgroundColor: '#30819c'
  },
});

/*
        <ListView 
          style={{alignSelf: 'stretch'}}
          dataSource={this.state.dataSource}
          renderRow= {
            (rowData, sectionId, rowId) => 
              <Row 
                key={rowData.id} 
                rowData={rowData} 
                onToggle={me.handleCheckboxToggle}
                onDelete={me.handleDelete}
              />
          }
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          renderFooter={() => 
              <Footer 
                onChange={this.handleChange} 
                onSubmit={this.handleAdd} 
              /> 
          }
        />
  */