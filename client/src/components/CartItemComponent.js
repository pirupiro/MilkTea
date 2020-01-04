import React, { useContext } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Platform,
    AsyncStorage,
    Text,
    Dimensions
} from 'react-native';
import { MaterialCommunityIcons, Ionions } from '@expo/vector-icons';
import ItemContext from '../context/ItemContext';

const windowWidth = Dimensions.get('window').width;

export default function CartItemComponent(props) {
    const itemContext = useContext(ItemContext);

    function onAddPress() {
        let cartItems = itemContext.cartItems.slice();
        const index = cartItems.map(item => item._id).indexOf(props._id);
        cartItems[index].quantity++;

        async function increase() {
            await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
        }

        increase()
            .then(() => {
                itemContext.setCartItems(cartItems);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function onMinusPress() {
        let cartItems = itemContext.cartItems.slice();
        const index = cartItems.map(item => item._id).indexOf(props._id);
        cartItems[index].quantity--;

        async function decrease() {
            await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
        }

        decrease()
            .then(() => {
                itemContext.setCartItems(cartItems);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function onCartPress() {
        const cartItems = itemContext.cartItems.filter(item => item._id !== props._id);

        async function removeItem() {
            await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
        }

        removeItem()
            .then(() => {
                itemContext.setCartItems(cartItems);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.price}>{props.price}</Text>
            </View>

            <View style={styles.counter}>
                <Ionions
                    name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
                    size={15}
                    onPress={onAddPress}
                ></Ionions>
                <Text>{props.quantity}</Text>
                <Ionions
                    name={Platform.OS === 'ios' ? 'ios-remove-circle-outline' : 'md-remove-circle-outline'}
                    size={15}
                    onPress={onMinusPress}
                ></Ionions>
            </View>

            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.remove}
                onPress={onCartPress}
            >
                <MaterialCommunityIcons
                    name='cart-arrow-up'
                    size={30}
                    color='black'
                ></MaterialCommunityIcons>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        flexDirection: 'row',
        height: 120
    },
    info: {
        flex: 50
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    price: {
        fontSize: 18
    },
    counter: {
        flex: 35
    },
    quantity: {
        fontSize: 18
    },
    remove: {
        flex: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(210, 211, 215)',
        borderRadius: 5,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
    }
});
