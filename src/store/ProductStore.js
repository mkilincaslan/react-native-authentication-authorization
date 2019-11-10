import { observable, action, configure, runInAction } from "mobx";
import axios from "axios";

configure({
    enforceActions: 'observed'
});

/**
 * Auth Store
 */
import AuthStore from "./AuthStore";

class ProductStore {
    @observable products = [];
    @observable loading = false;

    @action async getProducts () {
        this.loading = true;
        try {
            const { data } = await axios.get("https://nodejs-authentication-api.herokuapp.com/products", {
                headers: {
                    Authorization: `Bearer ${AuthStore.token}`
                }
            });

            runInAction(() => {
                this.products = data;
                this.loading = false;
            });
        }catch(err) {
            this.loading = false;
            console.error(err);
        }
    }
}

export default new ProductStore();