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
        <TouchableOpacity
            onPress={() => { props.navigation.navigate('CartScreen'); }}
            style={{ marginRight: 20 }}
        >
            <Ionicons
                name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
                size={30}
                color='rgb(181, 52, 113)'
            ></Ionicons>
            {
                itemContext.cartItems.length > 0 &&
                (
                    <View style={styles.badge}>
                        <Text style={styles.quantiy}>{itemContext.cartItems.length}</Text>
                    </View>
                )
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    badge: {
        width: 22,
        height: 20,
        backgroundColor: 'rgb(106, 176, 76)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 11,
        position: 'absolute',
        top: -6,
        left: -8
    },
    quantiy: {
        fontSize: 12,
        color: 'white'
    }
})
