import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const numColumns = 2;
const margin = 5;

export default function OrderComponent(props) {
    function formatNumber(number) {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

    function onOrderPress() {
        props.navigation.navigate('OrderScreen', { weekDay, date, time, totalPrice });
    }

    const numToWeekDay = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
    const createdAt = props.createdAt;
    const totalPrice = formatNumber(props.totalPrice);
    const weekDay = numToWeekDay[createdAt.getDay()];
    const date = `${createdAt.getDate()}-${createdAt.getMonth()}-${createdAt.getFullYear()}`;
    const time = `${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;

    return (
        <TouchableHighlight
            style={styles.container}
            underlayColor='rgb(192, 192, 192)'
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
        marginHorizontal: margin,
        marginVertical: 5,
        width: (windowWidth - numColumns * margin * 2) / numColumns,
        height: 200,
        borderRadius: 20,
        borderColor: 'rgb(199, 194, 182)',
        borderLeftWidth: 2.5,
        borderRightWidth: 2.5,
        borderBottomWidth: 5,
        borderTopWidth: 2.5
    },
    totalPrice: {
        fontSize: 22,
        color: 'rgb(234, 32, 39)'
    },
    weekDay: {
        fontSize: 20,
        color: 'rgb(27, 20, 100)'
    },
    date: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(27, 20, 100)'
    },
    time: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
