import React, { useEffect, useContext } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    AsyncStorage
} from 'react-native';
import UserContext from '../context/UserContext';
import ItemContext from '../context/ItemContext';
import Axios from 'axios';
import { getItemURI } from '../Networking';

const windowWidth = Dimensions.get('window').width;

export default function Splash(props) {
    const userContext = useContext(UserContext);
    const itemContext = useContext(ItemContext);

    useEffect(() => {
        async function fetchData() {
            const [res, userData, cartItems] = await Promise.all([
                Axios.get(getItemURI()),
                AsyncStorage.getItem('user'),
                AsyncStorage.getItem('cartItems')
            ]);
            return [res.data, userData, cartItems];
        }

        fetchData()
            .then(([data, userData, cartItems]) => {
                if (userData) {
                    const user = JSON.parse(userData);
                    userContext.setId(user._id);
                    userContext.setPassword(user.password);
                    userContext.setName(user.name);
                    userContext.setGender(user.gender);
                    userContext.setPhone(user.phone);
                    userContext.setAddress(user.address);
                    userContext.setLoggedIn(true);
                }

                const items = data.data;
                itemContext.setItems(items);

                if (cartItems)
                    itemContext.setCartItems(JSON.parse(cartItems));

                props.navigation.navigate('MainNavigator');
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../images/milktea.png')}
                style={styles.image}
            ></Image>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(44, 62, 80)'
    },
    image: {
        width: windowWidth * 0.75,
        height: windowWidth * 0.75
    }
});
