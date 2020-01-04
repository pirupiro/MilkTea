import React, { useContext } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UserContext from '../context/UserContext';
import ItemContext from '../context/ItemContext';
import { getImageURI } from '../Networking';

export default function ItemComponent(props) {
    const userContext = useContext(UserContext);
    const itemContext = useContext(ItemContext);

    function formatNumber(number) {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

    /*
    *   itemContext.cartItems = [
    *       {
    *           _id: String,
    *           name: String,
    *           unitPrice: Number,
    *           quantity: Number
    *       },
    *       ...
    *   ]
    */
    function onCartPress() {
        if (userContext.loggedIn) {
            let cartItems = itemContext.cartItems.slice();

            async function addToCart() {
                const index = cartItems.map(item => item._id).indexOf(props._id);

                if (index < 0) { // Newly added item
                    const newItem = {
                        _id: props._id,
                        name: props.name,
                        unitPrice: props.price,
                        quantity: 1
                    };

                    cartItems = itemContext.cartItems.concat(newItem);
                } else { // Increase quantity of the selected item by 1
                    cartItems[index].quantity++;
                }

                await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
            }

            addToCart()
                .then(() => {
                    itemContext.setCartItems(cartItems);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            props.navigation.navigate('InfoStack');
        }
    }

    function onItemPress() {
        props.navigation.navigate('ItemScreen', { ...props, onCartPress, formatNumber });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.subContainer}
                onPress={onItemPress}
            >
                <Image
                    source={{ uri: getImageURI(props.image) }}
                    style={styles.image}
                ></Image>

                <View style={styles.info}>
                    <Text style={styles.name}>{props.name}</Text>
                    <Text style={styles.price}>{formatNumber(props.price)}đ</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.iconContainer}
                onPress={onCartPress}
            >
                <MaterialCommunityIcons
                    name='cart-arrow-down'
                    size={30}
                    color='black'
                ></MaterialCommunityIcons>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 3,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgb(209, 204, 192)',
        borderRadius: 20,
        marginHorizontal: 2.5,
        marginBottom: 2.5,
        padding: 2.5
    },
    image: {
        height: 90,
        width: 90,
        borderRadius: 5,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15
    },
    subContainer: {
        flexDirection: 'row',
        flex: 85,
        alignItems: 'center',
    },
    info: {
        flexDirection: 'column',
        flexShrink: 1,
        paddingHorizontal: 10
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    price: {
        fontSize: 18
    },
    iconContainer: {
        flex: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(210, 211, 215)',
        borderRadius: 5,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
    }
});
