import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default class HeaderComponent extends Component {
    render() {
        return (
            <View style={styles.header}>
                <Text style={styles.title}>
                    {this.props.section.title.toUpperCase()}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(48, 57, 82)',
        paddingVertical: 5,
        marginHorizontal: 5,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    title: {
        fontSize: 20,
        color: 'white'
    }
});
