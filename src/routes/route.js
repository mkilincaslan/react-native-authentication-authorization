import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from 'react-navigation-drawer';


/**
 * Icons
 */
import { Icon } from 'native-base';

import DrawerButton from "../components/DrawerButton";

/**
 * Screens
 */
import HomeScreen from "../screens/Home";
import DetailScreen from "../screens/Detail";
import DefineProductScreen from "../screens/NewProduct";
import AuthLoadingScreen from "../screens/AuthLoading"
import SigninScreen from '../screens/Signin';
import SignupScreen from '../screens/Signup';

const AppStack = createStackNavigator(
    { 
        Home: {
            screen: HomeScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Home',
                headerLeft: <DrawerButton navigation={navigation}/>
            })
        },
        Detail: {
            screen: DetailScreen,
            navigationOptions: {
                title: 'Detail',
            }
        }
    }
);

const ProductStack = createDrawerNavigator(
    {
        Home: {
            screen: AppStack,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon 
                        name="home"
                        size={22}
                        color={tintColor}
                    />
                )
            }
        },
        Product: {
            screen: DefineProductScreen,
            navigationOptions: {
                title: 'New Product',
                drawerIcon: ({ tintColor }) => (
                    <Icon 
                        name="add-circle"
                        size={22}
                        color={tintColor}
                    />
                )
            }
        }
    }
);
  
const AuthStack = createBottomTabNavigator(
    {
        Signin: {
            screen: SigninScreen,
            navigationOptions: {
                tabBarLabel: 'Login',
                tabBarIcon: ({ tintColor }) => (
                    <Icon 
                        name="log-in" 
                        style={{ color: tintColor }}
                    />
                )
            }
        },
        Signup: {
            screen: SignupScreen,
            navigationOptions: {
                tabBarLabel: 'Register',
                tabBarIcon: ({ tintColor }) => (
                    <Icon 
                        name="person-add" 
                        style={{ color: tintColor }}
                    />
                )
            }
        },
    },
    {
        initialRouteName: "Signin",
        tabBarOptions: {
            activeTintColor: '#fff',
            inactiveTintColor: '#586589',
            style: {
                backgroundColor: '#171f33'
            }
        }
    }
);

const SwitchNavigator = createSwitchNavigator(
    {
        AuthLoading: {
            screen: AuthLoadingScreen
        },
        App: ProductStack,
        Auth: AuthStack
    },
    {
        initialRouteName: 'AuthLoading',
    }
);
  
export default createAppContainer(SwitchNavigator);