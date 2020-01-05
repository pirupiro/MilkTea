import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const numColumns = 2;
const margin = 2.5;

export default function OrderComponent(props) {
    function formatNumber(number) {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

    function onOrderPress() {
        props.navigation.navigate('OrderDetailScreen', { id: props._id, weekDay, date, time, totalPrice });
    }

    const numToWeekDay = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const createdAt = new Date(props.createdAt);
    const totalPrice = formatNumber(props.totalPrice);
    const weekDay = numToWeekDay[createdAt.getDay()];
    const date = `${createdAt.getDate()}/${createdAt.getMonth() + 1}/${createdAt.getFullYear()}`;
    const time = `${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;

    return (
        <TouchableHighlight
            style={styles.container}
            underlayColor='rgb(128, 128, 128)'
            onPress={onOrderPress}
        >
            <View style={styles.container}>
                <Text style={styles.totalPrice}>{totalPrice}</Text>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.weekDay}>{weekDay}</Text>
                    <Text style={styles.date}>{date}</Text>
                </View>
                <Text style={styles.time}>{time}</Text>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'rgb(248, 248, 248)',
        margin: margin,
        width: (windowWidth - numColumns * margin * 2) / numColumns,
        height: 200,
        borderRadius: 15,
        borderColor: 'rgb(199, 194, 182)',
        borderWidth: 1.5,
        borderBottomWidth: 3
    },
    totalPrice: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'rgb(214, 32, 39)'
    },
    weekDay: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(27, 20, 100)'
    },
    date: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(27, 20, 100)'
    },
    time: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
