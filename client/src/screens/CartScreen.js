import React, { useContext, useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Text,
    ScrollView,
    Dimensions,
    Alert,
    AsyncStorage
} from 'react-native';
import CartItemComponent from '../components/CartItemComponent';
import ItemContext from '../context/ItemContext';
import UserContext from '../context/UserContext';
import Axios from 'axios';
import { getOrderURI } from '../Networking';

const windowWidth = Dimensions.get('window').width;

export default function CartScreen(props) {
    const userContext = useContext(UserContext);
    const itemContext = useContext(ItemContext);
    const [totalPrice, setTotalPrice] = useState(0);

    function formatNumber(number) {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

    function onPayPress() {
        Alert.alert(
            'Thanh toán',
            `Bạn muốn thanh toán đơn hàng này ?\nTổng giá trị đơn hàng là ${formatNumber(totalPrice)} đồng`,
            [
                {
                    text: 'Vâng',
                    onPress: () => {
                        async function pay() {
                            const data = {
                                userId: userContext.id,
                                name: userContext.name,
                                phone: userContext.phone,
                                address: userContext.address,
                                details: itemContext.cartItems
                            }

                            const res = await Axios.post(getOrderURI(), data);
                            await AsyncStorage.removeItem('cartItems');
                            return res.data;
                        }

                        pay()
                            .then(data => {
                                itemContext.setCartItems([]);
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

    useEffect(() => {
        let totalPrice = 0;

        for (item of itemContext.cartItems) {
            totalPrice += item.unitPrice * item.quantity;
        }

        setTotalPrice(totalPrice);
    });

    if (itemContext.cartItems.length > 0) {
        const cartItemComponents = itemContext.cartItems.map(item => <CartItemComponent {...item} key={item._id} />);
        return (
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {cartItemComponents}

                <Text style={styles.totalPrice}>Tổng: {formatNumber(totalPrice)}đ</Text>

                <TouchableHighlight
                    style={styles.payButton}
                    onPress={onPayPress}
                >
                    <Text style={{ fontSize: 18, color: 'white' }}>THANH TOÁN</Text>
                </TouchableHighlight>
            </ScrollView>
        );
    } else {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgb(248, 248, 248)'
            }}>
                <Text style={{ fontSize: 20 }}>Hiện tại không có sản phẩm</Text>
                <TouchableHighlight
                    style={styles.buyButton}
                    onPress={() => { props.navigation.navigate('ItemListScreen'); }}
                >
                    <Text style={{ fontSize: 20, color: 'white' }}>MUA</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

CartScreen.navigationOptions = () => {
    return {
        headerTitle: 'Giỏ hàng của bạn'
    };
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 5
    },
    totalPrice: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(30, 55, 153)'

    },
    payButton: {
        width: windowWidth * 0.8,
        borderRadius: 5,
        marginVertical: 20,
        paddingVertical: 10,
        backgroundColor: 'rgb(0, 184, 148)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buyButton: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'rgb(52, 73, 94)',
        borderRadius: 5
    }
});
