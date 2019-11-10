import React, { Component, Fragment } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Header, Body, Title } from "native-base";

import DefineProductForm from "./DefineProductForm";

export default class index extends Component {
    render() {
        return (
            <Fragment>
                <Header>
                    <Body>
                        <Title>Define Product</Title>
                    </Body>
                </Header>

                <DefineProductForm />
            </Fragment>
        );
    }
}
