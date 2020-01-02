import React from 'react';
import {
    StyleSheet,
    Dimensions,
    FlatList,
    ScrollView,
    Text,
    View,
    StatusBar
} from 'react-native';
import orderDetails from '../../data/orderDetails';
import OrderDetailComponent from '../components/OrderDetailComponent';

const windowWidth = Dimensions.get('window').width;

export default function OrderScreen(props) {
    const { weekDay, date, time, totalPrice } = props.navigation.state.params;

    return (
        <View style={styles.container}>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.date}>{weekDay + ', ' + date}</Text>
            <FlatList
                data={orderDetails}
                keyExtractor={item => item._id.toString()}
                renderItem={({ item }) => <OrderDetailComponent {...item} />}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            ></FlatList>
            <View style={styles.skew}>
                <Text style={styles.totalPrice}>Tổng: {totalPrice}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        alignItems: 'center'
    },
    time: {
        fontSize: 18
    },
    date: {
        fontSize: 22,
        color: 'blue'
    },
    separator: {
        width: windowWidth,
        borderWidth: 1,
        borderColor: 'black'
    },
    skew: {
        padding: 20,
        width: windowWidth,
        flexDirection: 'row-reverse'
    },
    totalPrice: {
        fontSize: 24
    }
});
