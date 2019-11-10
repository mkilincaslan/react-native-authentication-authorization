import React, { Component, Fragment } from 'react';
import { Body, Header, Title } from 'native-base';

import SignupForm from "./SignupForm";

export default class Signup extends Component {
    render() {
        return (
            <Fragment>
                <Header>
                    <Body>
                        <Title>Register</Title>
                    </Body>
                </Header>

                <SignupForm navigation={this.props.navigation}/>
            </Fragment>
        )
    }
}