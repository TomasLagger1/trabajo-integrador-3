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


        <Pressable onPress={() => this.onSubmit()} style ={styles.buttonLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </Pressable>

        <Pressable
          onPress ={()=> this.props.navigation.navigate("Register")}
          style={styles.buttonRegister}>

          <Text style={styles.buttonText}>No tengo cuenta</Text>

        </Pressable>

        </View>
    )
}
}

const styles = StyleSheet.create({

container: {

      backgroundColor: "white",
      padding: 20,
      justifyContent: "center"
    },

    title:{
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 20,
      color: "#45abbf",
      textAlign: "center"
    },

    input:{
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10
    },
    
    buttonLogin: {
    backgroundColor: "#8ecae6",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10
    },

    buttonRegister: {
      backgroundColor: "#a8dadc",
      paddingVertical: 10,
      borderRadius: 6,
      alignItems: "center",
      marginTop: 10
    } ,
    buttonText: {
      color: "#000",
      fontSize: 16
    },

    errorText: {
      color: "red",
      marginTop: 10,
      textAlign: "center"
    }


});

export default Login;
