import React, { useState, useRef, useContext, useEffect } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    TouchableOpacity,
    Text,
    Dimensions,
    AsyncStorage
} from 'react-native';
import UserContext from '../context/UserContext';
import { getUserURI } from '../Networking';
import Axios from 'axios';

const windowWidth = Dimensions.get('window').width;

export default function LogInScreen(props) {
    // Use states
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Use refs
    const passwordRef = useRef();

    const userContext = useContext(UserContext);

    function validate() {
        if (!username || !password) {
            return {
                error: true,
                message: 'Vui lòng nhập tài khoản và mật khẩu'
            };
        }
        else {
            return {
                error: false
            };
        }
    }

    function onLogInPress() {
        const validation = validate();

        if (validation.error) {
            alert(validation.message);
        } else {
            async function logIn() {
                const res = await Axios.post(getUserURI() + '/login', { username, password });
                return res.data;
            }

            logIn()
                .then(data => {
                    if (data.error) {
                        alert(data.message);
                    } else {
                        const user = data.data;
                        userContext.setId(user._id);
                        userContext.setPassword(user.password);
                        userContext.setName(user.name);
                        userContext.setGender(user.gender);
                        userContext.setPhone(user.phone);
                        userContext.setAddress(user.address);
                        userContext.setLoggedIn(true);

                        AsyncStorage.setItem('user', JSON.stringify(user))
                            .catch(error => {
                                console.error(error);
                            });
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

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
                        onSubmitEditing={() => { passwordRef.current.focus() }}
                        returnKeyType='next'
                        onChangeText={text => { setUsername(text); }}
                    ></TextInput>

                    <TextInput
                        ref={passwordRef}
                        style={styles.input}
                        placeholder='Password'
                        placeholderTextColor='rgba(255, 255, 255, 0.5)'
                        autoCorrect={false}
                        autoCapitalize='none'
                        secureTextEntry
                        onChangeText={text => { setPassword(text); }}
                    ></TextInput>

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={onLogInPress}
                    >
                        <Text style={styles.loginText}>
                            LOG IN
                        </Text>
                    </TouchableOpacity>

                    <Text style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                        Don't have an account ? <Text
                            style={styles.signUpLabel}
                            onPress={() => { props.navigation.navigate('SignUpScreen'); }}
                        >
                            Sign up
                        </Text>
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
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
        marginVertical: 15,
        borderRadius: 20
    },
    loginText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    },
    signUpLabel: {
        color: 'rgb(52, 152, 219)',
        fontSize: 15
    }
});
