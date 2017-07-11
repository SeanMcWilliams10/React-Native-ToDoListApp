import React from 'react';
import { StyleSheet, Button, View, ListView, TouchableWithoutFeedback } from 'react-native';

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        var rowId = this.props.rowData.id;
    }
    
    toggle () {
        var rowId = this.props.rowData.id;
        this.props.onToggle(rowId);
    }

    render () {
        return (
            <TouchableWithoutFeedback onPress={this.toggle.bind(this)}> 
                <View 
                    style={[
                        styles.container, 
                        this.props.rowData.completed ? styles.checkedBox : styles.uncheckedBox
                        ]}
                ></View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
    },
    checkedBox: {
        backgroundColor: 'blue',
    },
    uncheckedBox: {
        backgroundColor: 'white',
    },
});

export default Checkbox;