import React from 'react';
import { StyleSheet, Button, View, ListView, TouchableWithoutFeedback } from 'react-native';
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
        this.props.onDelete(this.props.rowData.id);
    }

    render() {
        var rightBttn = [{
            text: 'Delete',
            backgroundColor: 'red',
            onPress: () => {this.toDelete}
        }];
        return (
            <Swipeout
                right={rightBttn}
                autoClose={true}
                backgroundColor='transparent'
                onClose={() => this.setState({isRightOpen: false})}
                openRight={this.state.isRightOpen}
            >
            <ListItem
                key={this.props.rowData.id}
                //title={<Text>{task.text}</Text>}
                title={this.props.rowData.text}
                leftIcon={
                  this.props.editable ? 
                    <TouchableWithoutFeedback onPress={this.setState({isRightOpen: true})}> 
                      <View 
                          style={styles.deleteCircle}
                      ></View>
                    </TouchableWithoutFeedback>
                    :
                    <Checkbox rowData={this.props.rowData} onToggle={this.props.onToggle} />
                } 
                hideChevron={true}
                titleStyle= {{
                  marginLeft: 15,
                  fontSize: 25,
                }}
                containerStyle= {
                  this.props.rowData.completed && styles.completed
                }
            />
            </Swipeout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue', //#fff
        alignItems: 'center',
        //justifyContent: 'center',
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

export default MySwipeout;