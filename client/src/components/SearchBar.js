import React, { useState, useRef } from 'react';
import {
    View,
    Platform,
    TextInput,
    StyleSheet,
    Dimensions
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

export default function SearchBar(props) {
    const [doSearch, setDoSearch] = useState(false);
    const input = useRef();

    return (
        <View style={styles.container}>
            <Ionicons
                name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
                size={25}
                color='gray'
            ></Ionicons>
            <TextInput
                ref={input}
                style={styles.input}
                onChangeText={text => {
                    props.setSearchStr(text);
                    setDoSearch(true);
                }}
                autoCapitalize='none'
                placeholder='Tìm kiếm...'
                placeholderTextColor='gray'
            ></TextInput>
            {
                doSearch &&
                (
                    <Feather
                        name='x'
                        size={25}
                        color='gray'
                        onPress={() => {
                            props.setSearchStr('');
                            input.current.clear();
                            setDoSearch(false);
                        }}
                    ></Feather>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        width: windowWidth * 3/4,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: windowWidth,
        backgroundColor: 'rgb(213, 220, 223)'
    },
    input: {
        flex: 1,
        marginHorizontal: 10,
        fontSize: 16
    }
})
