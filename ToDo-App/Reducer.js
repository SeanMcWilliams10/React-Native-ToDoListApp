//ToDoAppReducer - Reducer.js
import React from 'react';
import { createStore, combineReducers } from 'redux';

//class ToDoAppReducer {
    function todo (state, action) {
        switch (action.type) {
            case 'ADD_TODO':
                return {
                id: action.id,
                text: action.text,
                completed: false
                };
            case 'TOGGLE_TODO':
                if (state.id !== action.id) {
                return state;
                }
                return Object.assign({}, state, {
                completed: !state.completed
                });
            default:
                return state;
    }
  }

  function todos (state = [], action) {
    switch (action.type) {
      case 'ADD_TODO':
        return [
            ...state,
            todo(undefined, action)   //appends todo() to end of new copy of state[]
        ];
      case 'DELETE_TODO':
        return state.filter(task => task.id !== action.id);
      case 'TOGGLE_TODO':
        return state.map(task => todo(task, action));
      default:
        return state;
    }
  }

  function nextId (state = 0, action) {
    switch (action.type) {
      case 'ADD_TODO':
        return state + 1;
      default:
        return state;
    }
  }

  function showCompleted (state = true, action) {
    switch (action.type) {
      case 'TOGGLE_VISIBILITY':
        return (state ? false : true);
      default:
        return state;
    }
  }

  function editability (state = false, action) {
    switch (action.type) {
      case 'TOGGLE_EDITING':
        return (state ? false : true);
      default:
        return state;
    }
  }
/*
    function todoList (state = {}, action) {
        return {
            todos: todos(
                state.todos,
                action
            ),
            nextId: nextId(
                state.nextId,
                action
            ),
            visibilityFilter: visibilityFilter(
                state.visibilityFilter,
                action
            ),
            editability: editability(
                state.editability,
                action
            )
        };
    }
    fn above equivalent to const below
*/
  const todoApp = combineReducers({
    todos: todos,
    nextId: nextId,
    showCompleted: showCompleted,
    editability: editability
  })

export default todoApp;