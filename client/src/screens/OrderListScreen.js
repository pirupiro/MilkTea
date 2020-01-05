import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    RefreshControl,
    TouchableOpacity,
    FlatList
} from 'react-native';
import OrderComponent from '../components/OrderComponent';
import UserContext from '../context/UserContext';
import Axios from 'axios';
import { getOrderURI } from '../Networking';

export default function OrderListScreen(props) {
    const userContext = useContext(UserContext);
    const [orders, setOrders] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const status = props.navigation.state.routeName.toLowerCase();

    useEffect(() => {
        async function getOrders() {
            const query = `?status=${status}&userId=${userContext.id}`;
            const res = await Axios.get(getOrderURI() + query);
            return res.data;
        }

        getOrders()
            .then(data => {
                setOrders(data.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
            });
    }, [isLoading, userContext.loggedIn]);

    function onRefresh() {
        setIsLoading(true);
    }

    if (userContext.loggedIn) {
        if (orders && orders.length > 0) {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={orders}
                        renderItem={({ item }) => <OrderComponent {...item} navigation={props.navigation} />}
                        keyExtractor={item => item._id.toString()}
                        numColumns={2}
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoading}
                                onRefresh={onRefresh}
                            />
                        }
                    ></FlatList>
                </View>
            );
        } else {
            return (
                <View style={styles.blank}>
                    {
                        !isLoading &&
                        (
                            <Text style={styles.text}>
                                Hiện tại không có đơn hàng
                            </Text>
                        )
                    }
                    {
                        !isLoading &&
                        (
                            <TouchableOpacity
                                style={{
                                    marginTop: 20,
                                    paddingHorizontal: 30,
                                    paddingVertical: 10,
                                    backgroundColor: 'rgb(52, 73, 94)',
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={onRefresh}
                            >
                                <Text style={{ fontSize: 20, color: 'white' }}>TẢI LẠI</Text>
                            </TouchableOpacity>
                        )
                    }
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
            <Text style={styles.text}>Đăng nhập để xem thông tin đơn hàng</Text>
            <TouchableOpacity
                style={{
                    marginTop: 20,
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                    backgroundColor: 'rgb(52, 73, 94)',
                    borderRadius: 5
                }}
                onPress={() => { props.navigation.navigate('InfoStack'); }}
            >
                <Text style={{ fontSize: 20, color: 'white' }}>LOG IN</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    blank: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
    }
});
