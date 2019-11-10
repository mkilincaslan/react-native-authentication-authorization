import React, { Component } from 'react';
import { FlatList, View, SafeAreaView, RefreshControl } from 'react-native';
import { Content, List, Spinner} from 'native-base';
import { inject, observer } from "mobx-react"; 

import LogoutButton from "../../components/LogoutButton";
import ProductListItem from "./ProductListItem";

@inject('ProductStore')
@observer
export default class Home extends Component {
    static navigationOptions = {
        headerRight: <LogoutButton />
    };

    state = {
        refreshing: false
    }

    componentDidMount() {
        this.props.ProductStore.getProducts();
    }

    onRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.props.ProductStore.getProducts();
            this.setState({
                refreshing: false
            });
        });
    };

    _refreshControl(){
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={()=>this._refreshListView()} />
        )
    };

    _refreshListView(){
        //Start Rendering Spinner
        this.setState({refreshing:true});
        this.props.ProductStore.getProducts();
        this.setState({refreshing:false}) //Stop Rendering Spinner
    };

    render() {
        const { ProductStore } = this.props;
        return (
            <View>
                { ProductStore.loading && <Spinner size={'small'}/> }
                <List
                    refreshControl={this._refreshControl()}
                >
                    <FlatList
                        data={ProductStore.products}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => <ProductListItem item={item}/>}
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />
                </List>
            </View>
        );
    }
}
