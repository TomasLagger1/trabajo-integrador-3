import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { TextInput } from "react-native-web";
import { auth } from "../firebase/config";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            registered: false
        };
    }

    register(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
        .then( response =>{
            this.setState({registered: true})
        })
        .catch( error => {
            this.setState({error: 'Fallo al registrar usuario'})
        })
    }

    

    onSubmit() {
        this.register(this.state.email, this.state.password)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>

                <TextInput style={styles.field}
                    keyboardType='email-address'
                    placeholder='email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email} />
                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password} />
                <Pressable style={styles.field} onPress={() => this.onSubmit()}>
                    <Text> Register </Text>
                </Pressable>

                <Pressable
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate("Login")}
                >
                    <Text style={styles.buttonText}>Ya tengo cuenta</Text>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#faf7f7",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#000",
    },
    description: {
        fontSize: 16,
        color: "#333",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#8ecae6", 
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: "center",
    },
    buttonText: {
        color: "#black",
        fontSize: 16,
    },
    field: {
        height: 40,
        borderColor: 'gray',
    }
});

export default Register;