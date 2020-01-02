import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function OrderDetailComponent(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{props.name}</Text>
            <View style={styles.numberField}>
                <Text style={styles.number}>{props.unitPrice}</Text>
                <Text style={styles.number}>x{props.quantity}</Text>
                <Text style={styles.number}>{props.totalPrice}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        height: 100,
        paddingHorizontal: 10
    },
    name: {
        fontSize: 22,
    },
    numberField: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    number: {
        fontSize: 18,
        color: 'blue'
    }
})
