import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, ListView, ScrollView, KeyboardAvoidingView } from 'react-native';
import MyListItem from './MyListItem';
import SortableList from 'react-native-sortable-list';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';

const MyList = ({
    tasks,
    showCompleted,
    editable,
    handleToggle,
    handleDelete
}) => (
    <ScrollView style={{alignSelf: 'stretch'}} >
        <List style={{alignSelf: 'stretch', flex:1}} >
        { /*
        <SortableList 
            style={{alignSelf: 'stretch', backgroundColor:'blue'}}
            data={this.state.taskObjectArray}
            
            renderRow={this.renderRow}
            sortingEnabled={this.state.editable}
            contentContainerStyle={{ alignSelf: 'stretch', backgroundColor:'purple'}}
        />
        */ }
            {
            tasks.map((task, i) => (
                (!showCompleted && task.completed) ? 
                    (<View key={-i} ></View>)
                :
                    <MyListItem
                        key={task.id}
                        rowData={task} 
                        editable={editable}
                        onToggle={() => handleToggle(task.id)}
                        onDelete={(rowId) => handleDelete(rowId)}
                    /> 
            ))
            }
        </List>
    </ScrollView>
);

function mapStateToMyListProps (state) {
    return {
        tasks: state.todos,
        showCompleted: state.showCompleted,
        editable: state.editability
    };
}
function mapDispatchToMyListProps (dispatch) {
    return {
        handleToggle: (rowId) => {
            dispatch({
                type: 'TOGGLE_TODO',
                id: rowId
            })
        },
        handleDelete: (rowId) => {
            dispatch({
                type: 'DELETE_TODO',
                id: rowId
            })
        }
    };
}
export default connect(
    mapStateToMyListProps,
    mapDispatchToMyListProps
)(MyList);

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