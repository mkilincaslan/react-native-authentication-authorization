import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { inject } from "mobx-react";

@inject('AuthStore')
export default class LogoutButton extends Component {
    render() {
        return (
            <TouchableOpacity 
                style={styles.button_container}
                onPress={() => this.props.AuthStore.removeToken()}
            >
                <Text style={styles.text}> Logout </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button_container: {
        marginRight: 5,
        padding: 10,
        backgroundColor: '#ff3300',
        borderRadius: 10
    },
    text: {
        fontSize: 14
    }
});
