import React, { useContext } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Platform,
    AsyncStorage,
    Text,
    Dimensions,
    Alert
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import ItemContext from '../context/ItemContext';

const windowWidth = Dimensions.get('window').width;

export default function CartItemComponent(props) {
    const itemContext = useContext(ItemContext);

    function formatNumber(number) {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

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

        if (cartItems[index].quantity > 1) {
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
    }

    function onCartPress() {
        Alert.alert(
            `Bỏ ${props.name} khỏi giỏ hàng ?`, null,
            [
                {
                    text: 'Vâng',
                    onPress: () => {
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
                },
                {
                    text: 'Không',
                    style: 'cancel'
                }
            ]
        );

    }

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.price}>{formatNumber(props.unitPrice)}đ</Text>
            </View>

            <View style={styles.counter}>
                <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={onMinusPress}
                >
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-remove-circle' : 'md-remove-circle'}
                        size={25}
                        color='rgb(181, 52, 113)'
                        onPress={onMinusPress}
                    ></Ionicons>
                </TouchableOpacity>

                <Text style={{ fontSize: 18 }}>{props.quantity}</Text>

                <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={onAddPress}
                >
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'}
                        size={25}
                        color='rgb(181, 52, 113)'
                    ></Ionicons>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.remove}
                onPress={onCartPress}
            >
                <MaterialCommunityIcons
                    name='cart-arrow-up'
                    size={25}
                    color='black'
                ></MaterialCommunityIcons>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth - 5,
        paddingLeft: 10,
        height: 80,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderColor: 'rgb(127, 136, 151)',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 2,
        borderRadius: 10,
        marginBottom: 2.5
    },
    info: {
        flex: 50,
        justifyContent: 'center'
    },
    name: {
        fontSize: 18,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgb(30, 55, 153)'
    },
    counter: {
        flex: 35,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
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
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    }
});
