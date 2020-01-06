import React, { useState, useRef, useContext, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native';
import PickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UserContext from '../context/UserContext';
import Axios from 'axios';
import { getUserURI } from '../Networking';

const windowWidth = Dimensions.get('window').width;

export default function SignUpScreen(props) {
    // Use states
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('male');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    // Use refs
    const passwordRef = useRef();
    const confirmRef = useRef();
    const nameRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();

    function validate() {
        const wordPattern = /^[a-zA-z0-9]+$/;
        const numberPattern = /^\d+$/;

        if (!username || !password || !confirm || !name || !phone || !address)
            return {
                error: true,
                message: 'Các trường thông tin không được phép để trống'
            };

        if (!wordPattern.test(username))
            return {
                error: true,
                message: 'Username không hợp lệ, chỉ được sử dụng các ký tự a-z, A-Z, 0-9'
            };

        if (!wordPattern.test(password) || !wordPattern.test(confirm))
            return {
                error: true,
                message: 'Mật khẩu không hợp lệ, chỉ được sử dụng các ký tự a-z, A-Z, 0-9'
            };

        if (!numberPattern.test(phone))
            return {
                error: true,
                message: 'Số điện thoại không hợp lệ, chỉ được sử dụng các ký tự số'
            };

        if (password !== confirm)
            return {
                error: true,
                message: 'Mật khẩu và xác nhận không trùng khớp'
            };

        return { error: false };
    }

    function onSignUpPress() {
        const validation = validate();

        if (validation.error) {
            alert(validation.message);
        } else {
            async function signUp() {
                const userData = { username, password, name, gender, phone, address };
                const res = await Axios.post(getUserURI(), userData);
                return res.data;
            }

            signUp()
                .then(data => {
                    if (data.error) {
                        alert(data.message);
                    } else {
                        alert(data.message);
                        props.navigation.goBack();
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            enableOnAndroid
            extraScrollHeight={100}
        >
            <View style={styles.section}>
                <Text style={styles.header}>ACCOUNT</Text>
                <View style={styles.thickSeparator}></View>

                <View style={styles.field}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter your username'
                        autoCorrect={false}
                        autoCapitalize='none'
                        onSubmitEditing={() => { passwordRef.current.focus() }}
                        returnKeyType='next'
                        onChangeText={text => { setUsername(text); }}
                    ></TextInput>
                </View>

                <View style={styles.separator}></View>

                <View style={styles.field}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        ref={passwordRef}
                        style={styles.input}
                        placeholder='Enter your password'
                        autoCorrect={false}
                        autoCapitalize='none'
                        onSubmitEditing={() => { confirmRef.current.focus() }}
                        returnKeyType='next'
                        secureTextEntry
                        onChangeText={text => { setPassword(text); }}
                    ></TextInput>
                </View>

                <View style={styles.separator}></View>

                <View style={styles.field}>
                    <Text style={styles.label}>Confirm</Text>
                    <TextInput
                        ref={confirmRef}
                        style={styles.input}
                        placeholder='Confirm your password'
                        autoCorrect={false}
                        autoCapitalize='none'
                        onSubmitEditing={() => { nameRef.current.focus() }}
                        returnKeyType='next'
                        secureTextEntry
                        onChangeText={text => { setConfirm(text); }}
                    ></TextInput>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.header}>PERSONAL INFO</Text>
                <View style={styles.thickSeparator}></View>

                <View style={styles.field}>
                    <Text style={styles.label}>Full name</Text>
                    <TextInput
                        ref={nameRef}
                        style={styles.input}
                        placeholder='Enter your full name'
                        autoCorrect={false}
                        autoCapitalize='words'
                        onSubmitEditing={() => { phoneRef.current.focus() }}
                        returnKeyType='next'
                        onChangeText={text => { setName(text); }}
                    ></TextInput>
                </View>

                <View style={styles.separator}></View>

                <View style={styles.field}>
                    <Text style={styles.label}>Gender</Text>
                    <View style={[styles.input, { justifyContent: 'center' }]}>
                        <PickerSelect
                            placeholder={{}}
                            onValueChange={(value, index) => { setGender(value); }}
                            items={[
                                { label: 'Male', value: 'male' },
                                { label: 'Female', value: 'female' },
                                { label: 'Other', value: 'other' },
                            ]}
                        ></PickerSelect>
                    </View>
                </View>

                <View style={styles.separator}></View>

                <View style={styles.field}>
                    <Text style={styles.label}>Phone</Text>
                    <TextInput
                        ref={phoneRef}
                        style={styles.input}
                        placeholder='Enter your phone number'
                        autoCorrect={false}
                        keyboardType='number-pad'
                        onSubmitEditing={() => { addressRef.current.focus() }}
                        returnKeyType='next'
                        onChangeText={text => { setPhone(text); }}
                    ></TextInput>
                </View>

                <View style={styles.separator}></View>

                <View style={styles.field}>
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        ref={addressRef}
                        style={styles.input}
                        placeholder='Enter your address'
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={text => { setAddress(text); }}
                    ></TextInput>
                </View>
            </View>
            <TouchableOpacity
                style={styles.signUpButton}
                onPress={onSignUpPress}
            >
                <Text style={styles.signUpText}>SIGN UP</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    );
}

SignUpScreen.navigationOptions = () => {
    return {
        headerTitle: 'Sign up'
    };
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    section: {
        paddingVertical: 10,
        width: windowWidth * 0.9,
        backgroundColor: 'white'
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(181, 52, 113)'
    },
    thickSeparator: {
        height: 5,
        backgroundColor: 'rgb(192, 192, 192)'
    },
    field: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 35,
        marginVertical: 10
    },
    label: {
        fontSize: 16,
        color: 'rgb(0, 98, 102)'
    },
    input: {
        height: 40,
        width: windowWidth * 0.6
    },
    separator: {
        backgroundColor: 'rgb(192, 192, 192)',
        height: 2
    },
    signUpButton: {
        marginTop: 10,
        width: windowWidth * 0.9,
        height: 40,
        backgroundColor: 'rgb(39, 174, 96)',
        justifyContent: 'center',
        marginBottom: 15,
        borderRadius: 5
    },
    signUpText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    }
});
