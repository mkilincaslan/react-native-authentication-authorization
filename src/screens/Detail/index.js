import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';

import axios from "axios";
import { H1, Text } from 'native-base';
import { inject, observer } from "mobx-react";
import NavigationService from "../../NavigationService";

@inject('AuthStore')
@observer
export default class Detail extends Component {
    constructor (props) {
        super(props);
        this.item = props.navigation.getParam('item');
    }

    deleteItem = async () => {
        try {
            const { data } = await axios.delete(
                "https://nodejs-authentication-api.herokuapp.com/products/delete",
                {
                    headers: {
                        Authorization: `Bearer ${this.props.AuthStore.token}`
                },
                params:{
                    item_id: this.item._id
                }}
            );

            console.log(data);

            if (data.hasOwnProperty('errors')) {
                alert(data.errors);
                return false;
            }

            NavigationService.navigate('Home');
        }catch  (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <H1> {this.item.name} </H1>
                <Text> {this.item.description} </Text>
                <Text> Have {this.item.stock_quantity} </Text>
                <Image 
                    source={{ uri: this.item.photo }}
                    style={{ width: 200, height: 200 }}
                />
                <TouchableOpacity 
                    onPress={this.deleteItem}
                    style={styles.delete}>
                    <Text>Delete This Item</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    delete: {
        margin: 10,
        padding: 10,
        backgroundColor: '#ff3300',
        borderRadius: 15
    }
});
