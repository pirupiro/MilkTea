import React, { useState, useContext } from 'react';
import {
    Platform,
    AsyncStorage,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Modal from 'react-native-modal';
import ItemContext from '../context/ItemContext';
import { Ionicons } from '@expo/vector-icons';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export default function ModalBox(props) {
    const itemContext = useContext(ItemContext);
    const [quantity, setQuantity] = useState(1);

    function onMinusPress() {
        if (quantity > 1)
            setQuantity(quantity - 1);
    }

    function onAddPress() {
        setQuantity(quantity + 1);
    }

    function onAddToCartPress() {
        let cartItems = itemContext.cartItems.slice();

        async function addToCart() {
            const index = cartItems.map(item => item._id).indexOf(props._id);

            if (index < 0) { // Newly added item
                const newItem = {
                    _id: props._id,
                    name: props.name,
                    unitPrice: props.price,
                    quantity: quantity
                };

                cartItems.push(newItem);
            } else { // Increase quantity of the selected item
                cartItems[index].quantity += quantity;
            }

            await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
        }

        addToCart()
            .then(() => {
                itemContext.setCartItems(cartItems);
                props.setIsVisible(false);
                setQuantity(1);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <Modal
            isVisible={props.isVisible}
            style={styles.modal}
            onBackdropPress={() => {
                props.setIsVisible(false);
                setQuantity(1);
            }}
        >
            <View style={styles.quantityLabel}>
                <Text style={{ fontSize: 22 }}>Số lượng</Text>
            </View>

            <View style={styles.quantityField}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onMinusPress}
                >
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-remove' : 'md-remove'}
                        size={25}
                        color='gray'
                    ></Ionicons>
                </TouchableOpacity>

                <Text style={styles.quantity}>{quantity}</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={onAddPress}
                >
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
                        size={25}
                        color='gray'
                    ></Ionicons>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.addToCartButton}
                onPress={onAddToCartPress}
            >
                <Text style={{ fontSize: 22 }}>Cho vào giỏ</Text>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        flex: 0,
        height: 200,
        marginTop: windowHeight / 2 - 100,
        width: windowWidth * 2 / 3,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'center',
        borderRadius: 20
    },
    quantityLabel: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },
    quantityField: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    quantity: {
        fontSize: 25,
    },
    button: {
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'gray'
    },
    addToCartButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: 'rgb(56, 173, 169)',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    }
});

