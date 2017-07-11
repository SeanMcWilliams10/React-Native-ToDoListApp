import React from 'react';
import { StyleSheet, TextInput, Button, View, ListView, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }

    handlePress () {
        
    }

    render () {
        return (
            <View >
                <View style={styles.top}>
                    <View style={styles.button} >
                        <Button title="+" color='white' onPress={this.handlePress.bind(this)} />
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    top: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'm
    },
     button: {
        borderRadius: 10,
        backgroundColor: 'blue',
        padding: 10,
     },
});