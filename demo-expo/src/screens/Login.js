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
            logedIn: false,
            error: null
        };
    }

    onSubmit() {
    if(!this.state.email.includes('@')) {
        this.setState({error: 'falta @ en el email'});
        return;
    }

    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(response => {
            this.setState({
                loggedIn: true,
            });
            this.props.navigation.navigate('HomeMenu');
        })
        .catch(error => {
            this.setState({
                error: 'Credenciales inválidas',
            });
        });
}

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}> Login </Text>

                <TextInput style={styles.input}
                    keyboardType="email-address"
                    placeholder="Email" 
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}/>
                <TextInput style={styles.input}
                    keyboardType="default"
                    placeholder="Password"
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })}/>

                {this.state.error && <Text style={styles.errorText}>{this.state.error}</Text>}


                <Pressable onPress={() => this.onSubmit()} style={styles.button}>
                    <Text style={styles.buttonText}> Login </Text>
                </Pressable>

                <Pressable onPress={ () => this.props.navigation.navigate('Register') } style={styles.button}>
                    <Text style={styles.buttonText}> No tengo cuenta </Text>
                </Pressable>

        </View>
    )
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
