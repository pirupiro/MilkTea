import React, { useEffect } from 'react';
import {
    StyleSheet,
    Dimensions,
    FlatList,
    Text,
    View
} from 'react-native';
import orderDetails from '../../data/orderDetails';
import OrderDetailComponent from '../components/OrderDetailComponent';

const windowWidth = Dimensions.get('window').width;

export default function OrderScreen(props) {
    const { weekDay, date, time, totalPrice } = props.navigation.state.params;

    useEffect(() => {
        // User order id to fetch api and get order detail here.
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.date}>{weekDay + ', ngày ' + date}</Text>
            <FlatList
                data={orderDetails}
                keyExtractor={item => item._id.toString()}
                renderItem={({ item, index }) => <OrderDetailComponent {...item} index={index} />}
            ></FlatList>
            <View style={styles.right}>
                <Text style={styles.totalPrice}>Tổng: {totalPrice}đ</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    time: {
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold'
    },
    date: {
        fontSize: 20,
        marginBottom: 10,
        color: 'rgb(10, 61, 98)',
        fontWeight: 'bold'
    },
    separator: {
        width: windowWidth,
        borderWidth: 1,
        borderColor: 'black'
    },
    right: {
        padding: 10,
        width: windowWidth,
        flexDirection: 'row-reverse'
    },
    totalPrice: {
        fontSize: 22,
        color: 'rgb(159, 35, 93)',
        fontWeight: 'bold'
    }
});
