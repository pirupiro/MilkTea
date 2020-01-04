import React, { useContext } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    Text,
    ScrollView,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import UserContext from '../context/UserContext';
import { getImageURI } from '../Networking';

const { width: windowWith } = Dimensions.get('window');

export default function ItemScreen(props) {
    const { name, price, image, description, onCartPress, formatNumber } = props.navigation.state.params;

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
                        backgroundColor: 'rgb(223, 230, 233)',
                        borderRadius: 30
                    }}
                    onPress={onCartPress}
                >
                    <MaterialCommunityIcons
                        name='cart-arrow-down'
                        size={30}
                        color='rgb(19, 15, 64)'
                    ></MaterialCommunityIcons>
                </TouchableOpacity>
            </View>

            <Text style={styles.name}>
                {name}
            </Text>

            <Text style={styles.description}>{description}</Text>
        </ScrollView>
    );
}

ItemScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTransparent: true,
        headerRight: (
            <Ionicons
                name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
                style={{ marginRight: 15 }}
                size={30}
                onPress={() => { navigation.navigate('CartScreen'); }}
            ></Ionicons>
        )
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
