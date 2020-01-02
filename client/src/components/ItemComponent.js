import React, { useContext } from 'react';
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

export default function ItemComponent(props) {
    const user = useContext(UserContext);

    function formatNumber(number) {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

    function onItemPress() {
        props.navigation.navigate('ItemScreen', { ...props });
    };

    function onCartPress() {
        if (user.loggedIn) {
            alert('Pressed cart');
        } else {
            props.navigation.navigate('InfoStack');
        }
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
                    <Text style={styles.price}>{formatNumber(props.price)}</Text>
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
        borderBottomWidth: 3.5,
        borderLeftWidth: 2,
        borderRightWidth: 5,
        borderColor: 'rgb(209, 204, 192)',
        borderRadius: 15,
        marginHorizontal: 5,
        marginBottom: 5,
        padding: 3
    },
    image: {
        height: 90,
        width: 90,
        borderRadius: 10
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
        fontSize: 16
    },
    iconContainer: {
        flex: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(210, 211, 215)',
        borderRadius: 10
    }
});
