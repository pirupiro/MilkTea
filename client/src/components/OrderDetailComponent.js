import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function OrderDetailComponent(props) {
    function formatNumber(number) {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

    const color = props.index % 2 ? styles.odd : styles.even;

    return (
        <View style={{ ...styles.container, ...color }}>
            <Text style={styles.name}>{props.name}</Text>
            <View style={styles.numberField}>
                <Text style={[styles.number, styles.left]}>{formatNumber(props.unitPrice)}đ</Text>
                <Text style={[styles.number, styles.center]}>x{props.quantity}</Text>
                <Text style={[styles.number, styles.right]}>{formatNumber(props.totalPrice)}đ</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        height: 80,
        width: windowWidth,
        paddingHorizontal: 10
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(159, 35, 93)'
    },
    numberField: {
        flexDirection: 'row',
    },
    number: {
        fontSize: 18,
        color: 'black'
    },
    left: {
        flex: 1,
        textAlign: 'left'
    },
    center: {
        flex: 1,
        textAlign: 'center'
    },
    right: {
        flex: 1,
        textAlign: 'right'
    },
    odd: {
        backgroundColor: 'rgb(223, 249, 251)'
    },
    even: {
        backgroundColor: 'rgb(199, 236, 238)'
    }
})
