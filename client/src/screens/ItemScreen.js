import React, { Component } from 'react';
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

const { width: windowWith } = Dimensions.get('window');

export default class ItemScreen extends Component {
    static navigationOptions = () => {
        return {
            headerTransparent: true
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            loggedOn: false
        };
    }

    formatNumber(number) {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

    onCartPress = () => {
        if (this.state.loggedOn) {
            alert('Pressed cart');
        } else {
            this.props.navigation.navigate('LogInStack', { hasParent: true });
        }
    };

    render() {
        const { name, price, uri, description } = this.props.navigation.state.params;

        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    source={{ uri: uri }}
                    style={styles.image}
                ></Image>

                <View style={styles.priceSection}>
                    <Text style={styles.price}>
                        {this.formatNumber(price)} VNĐ
                    </Text>

                    <MaterialCommunityIcons
                        name='cart-arrow-down'
                        size={40}
                        color='rgb(19, 15, 64)'
                        onPress={() => {
                            this.onCartPress();
                        }}
                    ></MaterialCommunityIcons>
                </View>

                <Text style={styles.name}>
                    {name}
                </Text>

                <Text style={styles.description}>{description}</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: StatusBar.currentHeight
    },
    priceSection: {
        width: windowWith,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: windowWith / 10
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgb(44, 58, 71)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    price: {
        fontSize: 24,
        color: 'rgb(19, 15, 64)'
    },
    image: {
        width: windowWith,
        height: windowWith * 9 / 16
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: 'rgb(19, 15, 64)'
    },
    description: {
        color: 'gray',
        fontSize: 20,
        textAlign: 'justify',
        marginHorizontal: windowWith / 10
    },
});
