import React from 'react';
import { ListItem, Text, Left, Right, Icon } from 'native-base';

import NavigationService from "../../NavigationService";

const ProductListItem = ({ item }) => (
    <ListItem noIndent onPress={() => NavigationService.navigate('Detail', {item})}>
        <Left>
            <Text>{item.name}</Text>
        </Left>
        <Right>
            <Icon name="arrow-forward" />
        </Right>
    </ListItem>
);

export default ProductListItem;
