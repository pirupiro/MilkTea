import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Dimensions,
    FlatList,
    Text,
    View
} from 'react-native';
// import orderDetails from '../../data/orderDetails';
import OrderDetailComponent from '../components/OrderDetailComponent';
import { getOrderURI } from '../Networking';
import Axios from 'axios';

const windowWidth = Dimensions.get('window').width;

export default function OrderDetailScreen(props) {
    const { id, weekDay, date, time, totalPrice } = props.navigation.state.params;
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        async function getOrderDetail() {
            const res = await Axios.get(getOrderURI() + '/' + id);
            return res.data;
        }

        getOrderDetail()
            .then(data => {
                if (data.error) {
                    alert(data.message);
                } else {
                    setOrderDetails(data.data.details);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.date}>{weekDay + ', ngày ' + date}</Text>
            <FlatList
                data={orderDetails}
                keyExtractor={item => item._id}
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
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold'
    },
    date: {
        fontSize: 18,
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
        fontSize: 20,
        color: 'rgb(159, 35, 93)',
        fontWeight: 'bold'
    }
});
