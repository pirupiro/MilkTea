import React, { Component } from 'react';
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

const windowWidth = Dimensions.get('window').width;

export default class SignUp extends Component {
    static navigationOptions = {
        headerTitle: 'Sign up'
    };

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirm: '',
            gender: 'male',
            phoneNumber: '',
            address: ''
        };
    }

    /*
    * TODO: validate user's inputs before calling API
    * Example:
    * - username matchs [a-zA-Z](6,)
    * - check password field and confirm field if they match.
    */
    onSignUpPress = () => {
        alert(JSON.stringify(this.state));
    };

    render() {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                enableOnAndroid
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
                            onSubmitEditing={() => { this.refs.password.focus() }}
                            returnKeyType='next'
                            onChangeText={(text) => {
                                this.setState({ username: text });
                            }}
                        ></TextInput>
                    </View>

                    <View style={styles.separator}></View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            ref='password'
                            style={styles.input}
                            placeholder='Enter your password'
                            autoCorrect={false}
                            autoCapitalize='none'
                            onSubmitEditing={() => { this.refs.confirm.focus() }}
                            returnKeyType='next'
                            secureTextEntry
                            onChangeText={(text) => {
                                this.setState({ password: text });
                            }}
                        ></TextInput>
                    </View>

                    <View style={styles.separator}></View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Confirm</Text>
                        <TextInput
                            ref='confirm'
                            style={styles.input}
                            placeholder='Confirm your password'
                            autoCorrect={false}
                            autoCapitalize='none'
                            onSubmitEditing={() => { this.refs.fullName.focus() }}
                            returnKeyType='next'
                            secureTextEntry
                            onChangeText={(text) => {
                                this.setState({ confirm: text });
                            }}
                        ></TextInput>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.header}>PERSONAL INFO</Text>
                    <View style={styles.thickSeparator}></View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Full name</Text>
                        <TextInput
                            ref='fullName'
                            style={styles.input}
                            placeholder='Enter your full name'
                            autoCorrect={false}
                            autoCapitalize='words'
                            onSubmitEditing={() => { this.refs.phone.focus() }}
                            returnKeyType='next'
                            onChangeText={(text) => {
                                this.setState({ fullName: text });
                            }}
                        ></TextInput>
                    </View>

                    <View style={styles.separator}></View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Gender</Text>
                        <View style={[styles.input, { justifyContent: 'center' }]}>
                            <PickerSelect
                                placeholder={{}}
                                onValueChange={(value, index) => {
                                    this.setState({
                                        gender: value
                                    });
                                }}
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
                            ref='phone'
                            style={styles.input}
                            placeholder='Enter your phone number'
                            autoCorrect={false}
                            keyboardType='number-pad'
                            onSubmitEditing={() => { this.refs.address.focus() }}
                            returnKeyType='next'
                            onChangeText={(text) => {
                                this.setState({ phoneNumber: text });
                            }}
                        ></TextInput>
                    </View>

                    <View style={styles.separator}></View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Address</Text>
                        <TextInput
                            ref='address'
                            style={styles.input}
                            placeholder='Enter your address'
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={(text) => {
                                this.setState({ address: text });
                            }}
                        ></TextInput>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={() => {
                        this.onSignUpPress();
                    }}
                >
                    <Text style={styles.signUpText}>SIGN UP</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
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
        marginBottom: 15
    },
    signUpText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    }
});
