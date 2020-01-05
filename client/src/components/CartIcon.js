import React, { useContext } from 'react';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ItemContext from '../context/ItemContext';

export default function CartIcon(props) {
    const itemContext = useContext(ItemContext);

    return (
        <TouchableOpacity onPress={() => { props.navigation.navigate('CartScreen'); }}>
            <Ionicons
                name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
                style={{ marginRight: 20 }}
                size={30}
                color='rgb(181, 52, 113)'
            ></Ionicons>
            {
                itemContext.cartItems.length > 0 &&
                (
                    <View style={styles.icon}>
                        <Text>{itemContext.cartItems.length}</Text>
                    </View>
                )
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
        backgroundColor: 'rgb(106, 176, 76)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        position: 'absolute',
        top: -6,
        left: -6
    }
})
