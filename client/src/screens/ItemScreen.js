import React, { useContext } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    Text,
    ScrollView,
    StatusBar
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UserContext from '../context/UserContext';
import { getImageURI } from '../Networking';

const { width: windowWith } = Dimensions.get('window');

export default function ItemScreen(props) {
    const user = useContext(UserContext);
    const { _id, name, price, image, description } = props.navigation.state.params;

    function formatNumber(number) {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

    function onCartPress() {
        if (user.loggedIn) {
            alert('Pressed cart');
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
                    {formatNumber(price)} VNĐ
                </Text>

                <MaterialCommunityIcons
                    name='cart-arrow-down'
                    size={35}
                    color='rgb(19, 15, 64)'
                    onPress={onCartPress}
                ></MaterialCommunityIcons>
            </View>

            <Text style={styles.name}>
                {name}
            </Text>

            <Text style={styles.description}>{description}</Text>
        </ScrollView>
    );
}

ItemScreen.navigationOptions = () => {
    return {
        headerTransparent: true
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
        marginBottom: 30,
        color: 'rgb(19, 15, 64)'
    },
    description: {
        color: 'gray',
        fontSize: 18,
        textAlign: 'justify',
        width: windowWith * 0.75
    },
});
