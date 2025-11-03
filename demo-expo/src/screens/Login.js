import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { TextInput } from "react-native-web";
import { auth } from "../firebase/config";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            logedIn: false
        };
    }

    login(email, password) {
        auth.signInWithEmailAndPassword(email, password)
        .then( response =>{
            this.setState({logedIn: true})
        })
        .catch( error => {
            this.setState({error: 'Fallo al iniciar sesión'})
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>

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
                    <Text> Login </Text>
                </Pressable>

                <Pressable
                    style={[styles.button, styles.registerButton]}
                    onPress={() => this.props.navigation.navigate("Register")}
                >
                    <Text style={styles.buttonText}>No tengo cuenta</Text>
                </Pressable>



                <Pressable
                    style={[styles.button, styles.loginButton]}
                    onPress={() => this.props.navigation.navigate("HomeMenu")}
                >
                    <Text style={styles.buttonText}>Entrar en la app.</Text>
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
    button: {
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: "center",
        marginBottom: 10,
    },
    registerButton: {
        backgroundColor: "#8ecae6", 
    },
    loginButton: {
        backgroundColor: "#f4a261", 
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

export default Login;
