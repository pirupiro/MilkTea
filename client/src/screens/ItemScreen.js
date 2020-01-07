import React, { useContext } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    Text,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import UserContext from '../context/UserContext';
import ItemContext from '../context/ItemContext';
import { getImageURI } from '../Networking';
import CartIcon from '../components/CartIcon';

const { width: windowWith } = Dimensions.get('window');

export default function ItemScreen(props) {
    const { _id, name, price, image, description, formatNumber } = props.navigation.state.params;
    const userContext = useContext(UserContext);
    const itemContext = useContext(ItemContext);

    function onCartPress() {
        if (userContext.loggedIn) {
            let cartItems = itemContext.cartItems.slice();

            async function addToCart() {
                const index = cartItems.map(item => item._id).indexOf(_id);

                if (index < 0) { // Newly added item
                    const newItem = {
                        _id: _id,
                        name: name,
                        unitPrice: price,
                        quantity: 1
                    };

                    cartItems.push(newItem);
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

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: getImageURI(image) }}
                style={styles.image}
            ></Image>

            <View style={styles.priceSection}>
                <Text style={styles.price}>
                    {formatNumber(price)} đồng
                </Text>

                <TouchableOpacity
                    style={{
                        padding: 10,
                        backgroundColor: 'rgb(213, 220, 223)',
                        borderRadius: 10
                    }}
                    onPress={onCartPress}
                >
                    <MaterialCommunityIcons
                        name='cart-arrow-down'
                        size={25}
                        color='rgb(19, 15, 64)'
                    ></MaterialCommunityIcons>
                </TouchableOpacity>
            </View>

            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
        </ScrollView>
    );
}

ItemScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTransparent: true,
        headerRight: <CartIcon navigation={navigation} />
    };
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: StatusBar.currentHeight
    },
    priceSection: {
        width: windowWith * 0.75,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 30
    },
    price: {
        fontSize: 22,
        color: 'rgb(19, 15, 64)'
    },
    image: {
        width: windowWith,
        height: windowWith * 9 / 16
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'rgb(19, 15, 64)'
    },
    description: {
        color: 'gray',
        fontSize: 18,
        textAlign: 'justify',
        width: windowWith * 0.75,
        marginVertical: 30
    },
});
