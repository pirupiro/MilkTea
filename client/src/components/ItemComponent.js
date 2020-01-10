import React, { useContext, useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UserContext from '../context/UserContext';
import { getImageURI } from '../Networking';
import ModalBox from './ModalBox';

export default function ItemComponent(props) {
    const userContext = useContext(UserContext);
    const [isVisible, setIsVisible] = useState(false);

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
    function onItemPress() {
        props.navigation.navigate('ItemScreen', { ...props, formatNumber });
    }

    function onCartPress() {
        if (userContext.loggedIn) {
            setIsVisible(true);
        } else {
            props.navigation.navigate('InfoStack');
        }
    }

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
                    size={25}
                    color='black'
                ></MaterialCommunityIcons>
            </TouchableOpacity>

            <ModalBox
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 2,
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
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(7, 153, 146)'
    },
    iconContainer: {
        flex: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(213, 220, 223)',
        borderRadius: 5,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
    }
});
