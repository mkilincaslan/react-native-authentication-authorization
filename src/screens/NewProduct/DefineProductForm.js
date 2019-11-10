import React, { Component } from 'react'
import { Content, Input, Item, Button, Text, Spinner } from 'native-base';
import {Formik} from "formik";
import axios from "axios";
import { inject, observer } from "mobx-react";

import NavigationService from "../../NavigationService";
import validations from "./validations";

@inject('AuthStore')
@observer
export default class DefineProductForm extends Component {

    _handleSubmit = async ({ name, description, photo, stock_quantity }, bag) => {
        try {
            const { data } = await axios.post(
                "https://nodejs-authentication-api.herokuapp.com/products/new", 
                { name, description, photo, stock_quantity }, 
                { headers: { Authorization: `Bearer ${this.props.AuthStore.token}`} }
            );
            bag.setSubmitting(false);

            if (data.hasOwnProperty('errors')) {
                bag.setErrors(data.errors);
                return false;
            }

            NavigationService.navigate('Home');
        } catch (error) {
            console.log(error);
            bag.setSubmitting(false);
            bag.setErrors(error);   
        }
    };

    render() {
        return (
            <Formik
                initialValues={{ name: "", description: "", photo: "", stock_quantity: null }}
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
                        <Item error={errors.name && touched.name}>
                            <Input
                                returnKeyType={'next'}
                                onSubmitEditing={() => this.description._root.focus()} // for next button
                                onChangeText={handleChange("name")}
                                value={values.name}
                                placeholder="Product Name" 
                                onBlur={() => setFieldTouched("name")}
                                autoCorrect={false}
                                autoCapitalize={"none"} 
                            />
                            { (errors.name && touched.name) && <Text style={{ color: "red" }}>{errors.name}</Text>}
                        </Item>

                        <Item error={errors.description && touched.description}>
                            <Input
                                ref={ref => this.description = ref} // for next button
                                returnKeyType={'next'}
                                onSubmitEditing={() => this.photo._root.focus()} // for next button
                                onChangeText={handleChange("description")}
                                value={values.description}
                                placeholder="Product Description" 
                                onBlur={() => setFieldTouched("description")}
                                autoCapitalize={"none"}
                            />
                            { (errors.description && touched.description) && <Text style={{ color: "red" }}>{errors.description}</Text>}
                        </Item>

                        <Item error={errors.photo && touched.photo}>
                            <Input
                                ref={ref => this.photo = ref} // for next button
                                returnKeyType={'next'}
                                onSubmitEditing={() => this.stock_quantity._root.focus()} // for next button
                                onChangeText={handleChange("photo")}
                                value={values.photo}
                                placeholder="Product Photo" 
                                onBlur={() => setFieldTouched("photo")}
                                autoCapitalize={"none"}
                            />
                            { (errors.photo && touched.photo) && <Text style={{ color: "red" }}>{errors.photo}</Text>}
                        </Item>

                        <Item error={errors.stock_quantity && touched.stock_quantity}>
                            <Input
                                ref={ref => this.stock_quantity = ref} // for next button
                                returnKeyType={'go'}
                                onChangeText={handleChange("stock_quantity")}
                                value={values.stock_quantity}
                                placeholder="Product Stock Quantity" 
                                onBlur={() => setFieldTouched("stock_quantity")}
                                autoCapitalize={"none"}
                            />
                            { (errors.stock_quantity && touched.stock_quantity) && <Text style={{ color: "red" }}>{errors.stock_quantity}</Text>}
                        </Item>

                        <Button 
                            // disabled={!isValid || isSubmitting}
                            onPress={handleSubmit}
                            style={{ marginTop: 10 }}
                            block
                        >
                            { isSubmitting && <Spinner size={"small"} color={"white"} /> }
                            
                            <Text>Define</Text>
                        </Button>
                    </Content>
                    )}
                </Formik>
        )
    }
}