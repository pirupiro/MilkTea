import React, { useContext, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import OrderComponent from '../components/OrderComponent';
import orders from '../../data/orders';
import UserContext from '../context/UserContext';

export default function OrderListScreen(props) {
    const user = useContext(UserContext);
    const status = props.navigation.state.routeName.toLowerCase();
    let filteredOrders = orders.filter((order, index) => order.status === status);

    useEffect(() => {

    });

    if (user.loggedIn) {
        if (filteredOrders && filteredOrders.length > 0) {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={filteredOrders}
                        renderItem={({ item }) => <OrderComponent {...item} navigation={props.navigation} />}
                        keyExtractor={item => item._id.toString()}
                        numColumns={2}
                    ></FlatList>
                </View>
            );
        } else {
            return (
                <View style={styles.blank}>
                    <Text style={styles.text}>
                        Hiện tại không có đơn hàng
                    </Text>
                </View>
            );
        }
    } else {
        return <ToLogin navigation={props.navigation} />;
    }
}

function ToLogin(props) {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(236, 240, 241)'
        }}>
            <Text style={{ fontSize: 20 }}>Đăng nhập để xem thông tin đơn hàng</Text>
            <TouchableHighlight
                style={{
                    marginTop: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: 'rgb(22, 160, 133)'
                }}
                onPress={() => { props.navigation.navigate('InfoStack'); }}
            >
                <Text style={{ fontSize: 20 }}>LOG IN</Text>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    blank: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
