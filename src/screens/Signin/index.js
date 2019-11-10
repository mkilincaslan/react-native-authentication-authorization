import React, { Component, Fragment } from 'react';
import { Body, Header, Title } from 'native-base';

import SigninForm from "./SigninForm";

export default class Signin extends Component {
    render() {
        const { UserStore } = this.props;
        return (
            <Fragment>
                <Header>
                    <Body>
                        <Title>Login</Title>
                    </Body>
                </Header>

                <SigninForm />
            </Fragment>
        )
    }
}