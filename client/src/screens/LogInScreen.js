import React, { Component } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Text,
    Dimensions,
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

export default class LogInScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerShown: false
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    onLogInPress = () => {
        alert('Pressed log in button');
    };

    render() {
        const hasParent = this.props.navigation.getParam('hasParent', false);

        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior='padding'
            >
                <TouchableWithoutFeedback
                    style={styles.container}
                    onPress={Keyboard.dismiss}
                >
                    <View style={styles.container}>
                        <Image
                            style={styles.logo}
                            source={require('../../images/pirutea.png')}
                        ></Image>

                        <TextInput
                            style={styles.input}
                            placeholder='Username'
                            placeholderTextColor='rgba(255, 255, 255, 0.5)'
                            autoCorrect={false}
                            autoCapitalize='none'
                            onSubmitEditing={() => { this.refs.password.focus() }}
                            returnKeyType='next'
                            onChangeText={(text) => {
                                this.setState({ username: text })
                            }}
                        ></TextInput>

                        <TextInput
                            ref='password'
                            style={styles.input}
                            placeholder='Password'
                            placeholderTextColor='rgba(255, 255, 255, 0.5)'
                            autoCorrect={false}
                            autoCapitalize='none'
                            secureTextEntry
                            onChangeText={(text) => {
                                this.setState({ password: text })
                            }}
                        ></TextInput>

                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={() => {
                                this.onLogInPress();
                            }}
                        >
                            <Text style={styles.loginText}>
                                LOG IN
                            </Text>
                        </TouchableOpacity>

                        <Text style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                            Don't have an account ? <Text
                                style={styles.signUpLabel}
                                onPress={() => {
                                    const { navigate } = this.props.navigation;
                                    navigate('SignUpScreen');
                                }}
                            >
                                Sign up
                            </Text>
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                {
                    hasParent && (
                        <TouchableHighlight
                            style={styles.goBackButton}
                            underlayColor='rgba(0, 0, 0, 0.5)'
                            onPress={() => {
                                this.props.navigation.goBack(null);
                            }}
                        >
                            <Ionicons
                                name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                                size={25}
                                color='white'
                            ></Ionicons>
                        </TouchableHighlight>
                    )
                }
            </KeyboardAvoidingView >
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
    logo: {
        height: windowWidth * 0.5,
        width: windowWidth * 0.5
    },
    input: {
        width: windowWidth * 0.8,
        height: 40,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderBottomColor: 'rgb(52, 152, 219)',
        borderBottomWidth: 1,
        color: 'white'
    },
    loginButton: {
        width: windowWidth * 0.8,
        height: 40,
        backgroundColor: 'rgb(39, 174, 96)',
        justifyContent: 'center',
        marginVertical: 15
    },
    loginText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    },
    signUpLabel: {
        color: 'rgb(52, 152, 219)',
        fontSize: 15
    },
    goBackButton: {
        position: 'absolute',
        top: 30,
        left: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 30
    }
});
