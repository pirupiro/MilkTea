import React, { useEffect, useContext } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';
import UserContext from '../context/UserContext';

const windowWidth = Dimensions.get('window').width;

export default function Splash(props) {
    const user = useContext(UserContext);

    async function performTask() {
        return new Promise((resolve) => {
            setTimeout(
                () => { resolve('result'); },
                3000
            );
        });
    }

    useEffect(() => {
        async function fetchData() {
            // Preload data from an external API
            // Preload data using AsyncStorage
            const data = await performTask();

            if (data !== null) {
                props.navigation.navigate('MainNavigator');
            }
        }

        fetchData();
    });

    return (
        <View style={styles.container}>
            <Image
                source={require('../../images/milktea.png')}
                style={styles.image}
            ></Image>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(44, 62, 80)'
    },
    image: {
        width: windowWidth * 0.75,
        height: windowWidth * 0.75
    }
});
