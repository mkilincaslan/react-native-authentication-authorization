import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

import { inject } from "mobx-react";

@inject('AuthStore')
export default class AuthLoading extends Component {
    async componentDidMount() {
        await this.props.AuthStore.setupAuth();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Loading</Text>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
