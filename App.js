import React, {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {Provider} from "mobx-react";

import store from "./src/store";
import Router from "./src/routes/route";
import NavigationService from './src/NavigationService';

class App extends Component {
    render() {
        return(
            <Provider {...store}>
                <Router 
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
            </Provider>
        );
    }
};

export default App;
