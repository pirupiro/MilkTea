import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default class Splash extends Component {
    performTask = async () => {
        return new Promise((resolve) => {
            setTimeout(
                () => { resolve('result'); },
                3000
            );
        });
    };

    async componentDidMount() {
        // Preload data from an external API
        // Preload data using AsyncStorage
        const data = await this.performTask();

        if (data !== null) {
            this.props.navigation.navigate('MainNavigator');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../../images/milktea.png')}
                    style={styles.image}
                ></Image>
            </View>
        );
    }
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
