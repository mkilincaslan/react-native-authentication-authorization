import React, { Component } from 'react'
import { Content, Input, Item, Button, Text, Spinner } from 'native-base';
import {Formik} from "formik";
import { observer, inject } from "mobx-react";
import axios from "axios";

import validations from "./validations";

@inject('AuthStore')
@observer
export default class SignupForm extends Component {

    _handleSubmit = async ({ username, password }, bag) => {
        try {
            
            const { data } = await axios.post("https://nodejs-authentication-api.herokuapp.com/users/signin", { username, password });
            bag.setSubmitting(false);

            if (data.hasOwnProperty('errors')) {
                bag.setErrors(data.errors);
                return false;
            }

            this.props.AuthStore.saveToken(data.info.token);
        } catch (error) {
            bag.setSubmitting(false);
            bag.setErrors(error);   
        }
    };

    render() {
        return (
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={this._handleSubmit}
                validationSchema={validations}
            >
                {({ 
                    values, 
                    handleChange, 
                    handleSubmit, 
                    errors, 
                    touched, 
                    setFieldTouched, 
                    isValid, 
                    isSubmitting
                }) => (
                    <Content style={{ padding: 10, backgroundColor: '#fff' }}>
                        <Item error={errors.username && touched.username}>
                            <Input
                                returnKeyType={'next'}
                                onSubmitEditing={() => this.passwordRef._root.focus()} // for next button
                                onChangeText={handleChange("username")}
                                value={values.username}
                                placeholder="username" 
                                onBlur={() => setFieldTouched("username")}
                                autoCorrect={false}
                                autoCapitalize={"none"} 
                            />
                            { (errors.username && touched.username) && <Text style={{ color: "red" }}>{errors.username}</Text>}
                        </Item>

                        <Item error={errors.password && touched.password}>
                            <Input
                                ref={ref => this.passwordRef = ref} // for next button
                                returnKeyType={'go'}
                                onChangeText={handleChange("password")}
                                value={values.password}
                                placeholder="password" 
                                onBlur={() => setFieldTouched("password")}
                                autoCapitalize={"none"}
                                secureTextEntry={true}  
                            />
                            { (errors.password && touched.password) && <Text style={{ color: "red" }}>{errors.password}</Text>}
                        </Item>

                        <Button 
                            disabled={!isValid || isSubmitting}
                            onPress={handleSubmit}
                            style={{ marginTop: 10 }}
                            block
                        >
                            { isSubmitting && <Spinner size={"small"} color={"white"} /> }
                            
                            <Text>Login</Text>
                        </Button>
                    </Content>
                    )}
                </Formik>
        )
    }
}