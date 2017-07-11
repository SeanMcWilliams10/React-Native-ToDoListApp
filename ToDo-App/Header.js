import React from 'react';
import { StyleSheet, Text, Button, View, } from 'react-native';
import { connect } from 'react-redux';

const Header = ({
    showCompleted,
    editable,
    toggleCompleted,
    toggleEdit
}) => (
    <View style={styles.topBar}>
        <View  >
            <Button
            title={showCompleted ? "Hide\nCompleted" : "Show\nCompleted"}
            onPress={toggleCompleted}
            style={{paddingTop: 20, alignSelf: 'flex-end'}}
            />
        </View>
        <View style={{alignSelf:'center', justifyContent: 'center', paddingRight: 40, paddingTop: 20}} >
            <Text style={{fontSize: 40,}} > ToDo: </Text>
        </View>
        <View style={{justifyContent: 'flex-end', alignSelf: 'flex-end'}} >
            <Button 
                title={editable ? "Done" : "Edit"}
                onPress={toggleEdit}
            />
        </View>
    </View>
);

function mapStateToHeaderProps (state) {
        return {
            showCompleted: state.showCompleted,
            editable: state.editability
        };
    }
function mapDispatchToHeaderProps (dispatch) {
        return {
            toggleCompleted: () => {
                dispatch({
                    type: 'TOGGLE_VISIBILITY'
                })
            },
            toggleEdit: () => {
                dispatch({
                    type: 'TOGGLE_EDITING'
                })
            }
        };
    }
export default connect(
    mapStateToHeaderProps,
    mapDispatchToHeaderProps
)(Header);


const styles = StyleSheet.create({
    topBar: {
        //flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})