import React, { useState, useContext, useRef } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    Dimensions,
    TextInput,
    Switch,
    Image,
    StatusBar
} from 'react-native';
import PickerSelect from 'react-native-picker-select';
import UserContext from '../context/UserContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LogInScreen from '../screens/LogInScreen';

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

    const user = useContext(UserContext);

    /*
    * This button press event will call API to edit user profile
    * If successful, update components
    * If failed, show message
    */
    function onSavePress() {
        alert('Pressed save button');
    }

    function onLogOutPress() {
        user.setLoggedIn(false);
    }

    if (user.loggedIn) {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                enableOnAndroid
                extraScrollHeight={100}
            >
                <View style={styles.container}>
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
                                onChangeText={text => { user.setName(text); }}
                                value={user.name}
                            ></TextInput>
                        </View>

                        <View style={styles.separator}></View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Gender</Text>
                            <View style={[styles.input, { justifyContent: 'center' }]}>
                                <PickerSelect
                                    placeholder={{}}
                                    value={user.gender}
                                    onValueChange={(value, index) => { user.setGender(value); }}
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
                                onChangeText={text => { user.setPhone(text); }}
                                value={user.phone}
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
                                onChangeText={text => { user.setAddress(text); }}
                                value={user.address}
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
                </View>
            </KeyboardAwareScrollView>
        );
    } else {
        return <LogInScreen navigation={props.navigation} />;
    }
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
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    }
});
