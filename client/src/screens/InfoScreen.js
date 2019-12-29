import React, { Component } from 'react';
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
    Image
} from 'react-native';
import PickerSelect from 'react-native-picker-select';

const windowWidth = Dimensions.get('window').width;

export default class Info extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerShown: false
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            loggedOn: false, // Value may vary
            fullName: 'Piru Piro',
            gender: 'male',
            phoneNumber: '0325306161',
            address: 'Blah blah blah',
            changePassword: false,
            password: '',
            newPassword: '',
            confirm: ''
        };

        if (!this.state.loggedOn) {
            this.props.navigation.navigate('LogInStack');
        }
    }

    /*
    * This button press event will call API to edit user profile
    * If successful, update components
    * If failed, show message
    */
    onSavePress = () => {
        alert('Pressed save button');
    };

    render() {
        return (
            <TouchableWithoutFeedback
                style={styles.container}
                onPress={Keyboard.dismiss}
            >
                <View style={styles.container}>
                    <View style={styles.section}>
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
                                value={this.state.fullName}
                            ></TextInput>
                        </View>

                        <View style={styles.separator}></View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Gender</Text>
                            <View style={[styles.input, { justifyContent: 'center' }]}>
                                <PickerSelect
                                    placeholder={{}}
                                    value={this.state.gender}
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
                                value={this.state.phoneNumber}
                            ></TextInput>
                        </View>

                        <View style={styles.separator}></View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Address</Text>
                            <TextInput // Address
                                ref='address'
                                style={styles.input}
                                placeholder='Enter your address'
                                autoCorrect={false}
                                autoCapitalize='none'
                                onChangeText={(text) => {
                                    this.setState({ address: text });
                                }}
                                value={this.state.address}
                            ></TextInput>
                        </View>
                    </View>

                    <View style={styles.switch}>
                        <Text style={{ fontSize: 16, color: 'rgb(237, 76, 103)' }}>
                            Change password ?
                        </Text>
                        <Switch
                            onValueChange={() => {
                                this.setState(prevState => {
                                    return {
                                        changePassword: !prevState.changePassword
                                    };
                                });
                            }}
                            value={this.state.changePassword}
                        ></Switch>
                    </View>

                    {
                        this.state.changePassword && (
                            <View style={styles.section}>
                                <View style={styles.field}>
                                    <Text style={styles.label}>Current</Text>
                                    <TextInput
                                        ref='password'
                                        style={styles.input}
                                        placeholder='Enter your current password'
                                        autoCorrect={false}
                                        autoCapitalize='none'
                                        onSubmitEditing={() => { this.refs.newPassword.focus() }}
                                        returnKeyType='next'
                                        secureTextEntry
                                        onChangeText={(text) => {
                                            this.setState({ password: text });
                                        }}
                                    ></TextInput>
                                </View>

                                <View style={styles.separator}></View>

                                <View style={styles.field}>
                                    <Text style={styles.label}>New</Text>
                                    <TextInput
                                        ref='newPassword'
                                        style={styles.input}
                                        placeholder='Enter your new password'
                                        autoCorrect={false}
                                        autoCapitalize='none'
                                        onSubmitEditing={() => { this.refs.confirm.focus() }}
                                        returnKeyType='next'
                                        secureTextEntry
                                        onChangeText={(text) => {
                                            this.setState({ newPassword: text });
                                        }}
                                    ></TextInput>
                                </View>

                                <View style={styles.separator}></View>

                                <View style={styles.field}>
                                    <Text style={styles.label}>Confirm</Text>
                                    <TextInput
                                        ref='confirm'
                                        style={styles.input}
                                        placeholder='Confirm your new password'
                                        autoCorrect={false}
                                        autoCapitalize='none'
                                        secureTextEntry
                                        onChangeText={(text) => {
                                            this.setState({ confirm: text });
                                        }}
                                    ></TextInput>
                                </View>
                            </View>
                        )
                    }

                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => {
                            this.onSavePress();
                        }}
                    >
                        <Text style={styles.saveText}>SAVE</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(44, 62, 80)'
    },
    message: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        width: windowWidth * 0.75
    },
    logo: {
        height: windowWidth * 0.5,
        width: windowWidth * 0.5
    },
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 24
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
    switch: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    saveButton: {
        marginTop: 10,
        width: windowWidth * 0.9,
        height: 40,
        backgroundColor: 'rgb(39, 174, 96)',
        justifyContent: 'center',
        marginBottom: 15
    },
    saveText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    }
});
