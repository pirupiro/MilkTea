import React, { useState, useContext, useRef } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Switch,
    StatusBar,
    AsyncStorage
} from 'react-native';
import PickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UserContext from '../context/UserContext';
import ItemContext from '../context/ItemContext';
import { getUserURI } from '../Networking';
import Axios from 'axios';

const windowWidth = Dimensions.get('window').width;

export default function InfoScreen(props) {
    // Use states
    const [changePassword, setChangePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    // Use refs
    const phoneRef = useRef();
    const addressRef = useRef();
    const newPasswordRef = useRef();
    const confirmRef = useRef();

    const userContext = useContext(UserContext);
    const itemContext = useContext(ItemContext);

    function validate() {
        const wordPattern = /^[a-zA-z0-9]+$/;
        const numberPattern = /^\d+$/;

        if (!userContext.name || !userContext.phone || !userContext.address)
            return {
                error: true,
                message: 'Các trường thông tin không được phép để trống'
            };

        if (!numberPattern.test(userContext.phone))
            return {
                error: true,
                message: 'Số điện thoại không hợp lệ, chỉ được sử dụng các ký tự số'
            };

        if (changePassword) {
            if (!password || !newPassword || !confirm)
                return {
                    error: true,
                    message: 'Các trường thông tin không được phép để trống'
                };

            if (!wordPattern.test(password) || !wordPattern.test(newPassword) || !wordPattern.test(confirm))
                return {
                    error: true,
                    message: 'Mật khẩu không hợp lệ, chỉ được sử dụng các ký tự a-z, A-Z, 0-9'
                };

            if (userContext.password !== password)
                return {
                    error: true,
                    message: 'Mật khẩu hiện tại không chính xác'
                };

            if (newPassword !== confirm)
                return {
                    error: true,
                    message: 'Mật khẩu mới và xác nhận không trùng khớp'
                };
        }

        return { error: false };
    }

    function onSavePress() {
        const validation = validate();

        if (validation.error) {
            alert(validation.message);
        } else {
            async function saveInfo() {
                const { id, name, gender, phone, address } = userContext;
                const password = changePassword ? newPassword : userContext.password;
                const userData = { name, password, gender, phone, address };
                const res = await Axios.put(getUserURI() + '/' + id, userData);
                return res.data;
            }

            saveInfo()
                .then(data => {
                    if (data.error) {
                        alert(data.message);
                    } else {
                        AsyncStorage.setItem('user', JSON.stringify(data.data))
                            .catch(error => {
                                console.error(error);
                            });

                        alert(data.message);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    function onLogOutPress() {
        async function removeItems() {
            await Promise.all([
                AsyncStorage.removeItem('user'),
                AsyncStorage.removeItem('cartItems')
            ]);
        }

        removeItems()
            .then(() => {
                userContext.setLoggedIn(false);
                itemContext.setCartItems([]);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            enableOnAndroid
        >
            <View style={styles.section}>
                <View style={styles.field}>
                    <Text style={styles.label}>Full name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter your full name'
                        autoCorrect={false}
                        autoCapitalize='words'
                        onSubmitEditing={() => { phoneRef.current.focus() }}
                        returnKeyType='next'
                        onChangeText={text => { userContext.setName(text); }}
                        value={userContext.name}
                    ></TextInput>
                </View>

                <View style={styles.separator}></View>

                <View style={styles.field}>
                    <Text style={styles.label}>Gender</Text>
                    <View style={[styles.input, { justifyContent: 'center' }]}>
                        <PickerSelect
                            placeholder={{}}
                            value={userContext.gender}
                            onValueChange={(value, index) => { userContext.setGender(value); }}
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
                        onChangeText={text => { userContext.setPhone(text); }}
                        value={userContext.phone}
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
                        onChangeText={text => { userContext.setAddress(text); }}
                        value={userContext.address}
                    ></TextInput>
                </View>
            </View>

            <View style={styles.switch}>
                <Text style={{ fontSize: 16, color: 'rgb(237, 76, 103)' }}>
                    Change password ?
                </Text>
                <Switch
                    onValueChange={() => { setChangePassword(!changePassword); }}
                    value={changePassword}
                ></Switch>
            </View>

            {
                changePassword &&
                (
                    <View style={styles.section}>
                        <View style={styles.field}>
                            <Text style={styles.label}>Current</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Enter your current password'
                                autoCorrect={false}
                                autoCapitalize='none'
                                onSubmitEditing={() => { newPasswordRef.current.focus() }}
                                returnKeyType='next'
                                secureTextEntry
                                onChangeText={text => { setPassword(text); }}
                            ></TextInput>
                        </View>

                        <View style={styles.separator}></View>

                        <View style={styles.field}>
                            <Text style={styles.label}>New</Text>
                            <TextInput
                                ref={newPasswordRef}
                                style={styles.input}
                                placeholder='Enter your new password'
                                autoCorrect={false}
                                autoCapitalize='none'
                                onSubmitEditing={() => { confirmRef.current.focus() }}
                                returnKeyType='next'
                                secureTextEntry
                                onChangeText={text => { setNewPassword(text); }}
                            ></TextInput>
                        </View>

                        <View style={styles.separator}></View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Confirm</Text>
                            <TextInput
                                ref={confirmRef}
                                style={styles.input}
                                placeholder='Confirm your new password'
                                autoCorrect={false}
                                autoCapitalize='none'
                                secureTextEntry
                                onChangeText={text => { setConfirm(text); }}
                            ></TextInput>
                        </View>
                    </View>
                )
            }

            <View style={styles.buttonField}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onSavePress}
                >
                    <Text style={styles.buttonText}>SAVE</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={onLogOutPress}
                >
                    <Text style={styles.buttonText}>LOG OUT</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: StatusBar.currentHeight
    },
    section: {
        paddingVertical: 10,
        width: windowWidth * 0.9,
        backgroundColor: 'white'
    },
    field: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50
    },
    label: {
        fontSize: 16,
        color: 'rgb(0, 98, 102)'
    },
    input: {
        height: 50,
        width: windowWidth * 0.6
    },
    separator: {
        backgroundColor: 'rgb(192, 192, 192)',
        height: 2
    },
    switch: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    buttonField: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: windowWidth * 0.9,
        marginTop: 30
    },
    button: {
        width: windowWidth * 0.4,
        height: 40,
        backgroundColor: 'rgb(39, 174, 96)',
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    }
});
