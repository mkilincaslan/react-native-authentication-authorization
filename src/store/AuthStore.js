import { observable, action } from "mobx";
import AsyncStorage from "@react-native-community/async-storage";

/**
 * navigation service
 */
import NavigationService from "../NavigationService";

class UserStore {
    @observable token = null;

    @action async saveToken(token) {
        try {
            await AsyncStorage.setItem('token', token);
            await this.setupAuth();
        }catch(err) {
            console.error(err);
        }
    }

    @action async removeToken() {
        try {
            await AsyncStorage.removeItem('token');
            this.token = null;
            await this.setupAuth();
        }catch(err) {
            console.error(err);
        }
    }

    @action async setupAuth () {
        await this.getToken();
    }

    @action async getToken () {
        try {
            const token = await AsyncStorage.getItem('token');

            if(!token) {
                NavigationService.navigate('Auth');
                return false;
            }

            this.token = token;
            NavigationService.navigate('App');
        }catch(err) {
            console.error(err);
        }
    }
}

export default new UserStore();