import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import OrderComponent from '../components/OrderComponent';
import orders from '../../data/orders';

export default class OrderListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedOn: false
        }

        if (!this.state.loggedOn) {
            this.props.navigation.navigate('LogInStack', { hasParent: true });
        }
    }

    static eng2vie = {
        Waiting: 'Chờ',
        Received: 'Tiếp nhận',
        Completed: 'Hoàn thành'
    };

    static navigationOptions = ({ navigation }) => {
        return {
            tabBarLabel: this.eng2vie[navigation.state.routeName]
        };
    };

    /*
    * Based on routeName (Waiting, Received, Completed) stored in `navigation.state.routeName`
    * we'll call APIs to fetch data (order in this case) whose status is corresponding to routeName.
    * Then, pass data to FlatList
    */
    render() {
        if (orders && orders.length > 0) {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={orders}
                        renderItem={({ item, index }) => <OrderComponent {...item} />}
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
    }
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
