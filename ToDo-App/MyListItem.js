import React from 'react';
import { StyleSheet, Text, Button, View, ListView, TouchableWithoutFeedback } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { List, ListItem } from 'react-native-elements';
import Checkbox from './Checkbox';

class MySwipeout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRightOpen: false
        }
        this.tags = [];
    }

    toDelete () {
        var rowId = this.props.rowData.id;
        this.props.onDelete(rowId);
    }

    toggleOpen () {
        this.setState({isRightOpen: true});
    }

    render () {
        var rightBttn = [{
            text: 'Delete',
            backgroundColor: 'red',
            onPress: this.toDelete.bind(this)
        }];
        return (
            <Swipeout
                style={{flex:1, alignSelf: 'stretch'}}
                right={rightBttn}
                autoClose={true}
                backgroundColor='transparent'
                onClose={() => this.setState({isRightOpen: false})}
                openRight={this.state.isRightOpen}
            >
            <ListItem
                key={this.props.rowData.id}
                title={this.props.rowData.text}
                leftIcon={
                  this.props.editable ? 
                  (
                    <TouchableWithoutFeedback onPress={this.toggleOpen.bind(this)}> 
                      <View style={styles.deleteCircle} >
                        <Text style={{color: 'white', backgroundColor: 'transparent', textAlign: 'center', textAlignVertical: 'center', paddingTop: 3}} >-</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )
                    :
                    <Checkbox rowData={this.props.rowData} onToggle={this.props.onToggle} />
                } 
                hideChevron={true}
                titleStyle= {[
                    this.props.rowData.completed && {textDecorationLine: 'line-through'},
                    {
                        marginLeft: 15,
                        fontSize: 25,
                    } ]}
                containerStyle= {[
                    styles.container,
                  this.props.rowData.completed && styles.completed
                ]}
            />
            </Swipeout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'lightblue',
        alignItems: 'center',
    },
    deleteCircle: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        backgroundColor: 'red',
    },
    completed: {
        backgroundColor: '#3ca1c3' //'#30819c'
    },
});

export default MySwipeout;