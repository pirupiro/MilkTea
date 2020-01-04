import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default function HeaderComponent(props) {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>
                {props.section.title.toUpperCase()}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(48, 57, 82)',
        paddingVertical: 5,
        marginHorizontal: 2.5,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    title: {
        fontSize: 20,
        color: 'white'
    }
});
