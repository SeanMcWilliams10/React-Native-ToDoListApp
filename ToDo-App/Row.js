import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from './Checkbox';
import Swipeout from 'react-native-swipeout';

function toDelete (myProps) {
    console.log('toDelete:');
    var id = myProps.rowData.id;
    myProps.onDelete(id);
}

function Row (props) {
    var swipeButton = [{
        text: 'Delete',
        backgroundColor: 'red',
        onPress: () => {toDelete(props)}
    }];
    return (
        <Swipeout right={swipeButton} autoClose={true} backgroundColor='transparent' >
        <View style={[styles.container, props.rowData.completed && styles.completed]} >
            <Checkbox rowData={props.rowData} onToggle={props.onToggle}/>
            <Text style={styles.text} >
                {props.rowData.text}
            </Text>
        </View>
        </Swipeout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 15,
        fontSize: 25,
    },
    completed: {
        backgroundColor: '#30819c'
    },
});

export default Row;