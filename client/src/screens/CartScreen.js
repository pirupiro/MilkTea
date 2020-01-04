import React, { useContext } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Text,
    ScrollView
} from 'react-native';
import ItemContext from '../context/ItemContext';
import CartItemComponent from '../components/CartItemComponent';

export default function CartScreen(props) {
    const itemContext = useContext(ItemContext);
    console.log(itemContext.cartItems);

    function onPayPress() {

    }

    if (itemContext.cartItems.length > 0) {
        // const cartItemComponents = itemContext.cartItems.map(item => <CartItemComponent {...item} key={item._id} />);
        // console.log(cartItemComponents);
        return (
            <View style={styles.container}>
                {/* {cartItemComponents} */}

                <Text>Tổng: {props.quantity * props.price}</Text>

                <TouchableHighlight
                    style={styles.payButton}
                    onPress={onPayPress}
                >
                    <Text>THANH TOÁN</Text>
                </TouchableHighlight>
            </View>
        );
    } else {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgb(236, 240, 241)'
            }}>
                <Text style={{ fontSize: 20 }}>Hiện tại không có sản phẩm</Text>
                <TouchableHighlight
                    style={{
                        marginTop: 20,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        backgroundColor: 'rgb(52, 73, 94)',
                        borderRadius: 5
                    }}
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
        flex: 1,
        alignItems: 'center'
    },
    button: {

    }
});
