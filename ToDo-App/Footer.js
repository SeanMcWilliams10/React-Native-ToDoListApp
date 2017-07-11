import React from 'react';
import { StyleSheet, TextInput, Button, View, ListView, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: ''
        };
    }

    handleChange (text) {
        this.setState({userInput: text});
    }

    handleSubmit () {
        let newText = this.state.userInput;
        if (newText != '') {
            this.props.dispatch({
                type: 'ADD_TODO',
                text: newText,
                id: this.props.nextId
            })
            this.setState({userInput: ''});
        }
    }

    render () {
        return (
            <View style={styles.container} >
                <View style={styles.button}>
                    <Button title="+" color='white' onPress={this.handleSubmit.bind(this)} />
                </View>
                <TextInput 
                    style={styles.text}
                    placeholder="New Task..." 
                    onChangeText={this.handleChange.bind(this)}
                    value={this.state.userInput}
                    onSubmitEditing={this.handleSubmit.bind(this)}
                />
            </View>
        );
    }
}

function mapStateToFooterProps (state) {
    return {
        nextId: state.nextId
    };
}
export default connect(
    mapStateToFooterProps,
    null
)(Footer);

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    text: {
        flex: 1,
        marginLeft: 15,
        fontSize: 25,
    },
      button: {
        borderRadius: 10,
        backgroundColor: 'blue',
        padding: 10,
    },
});
