import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { TextInput } from "react-native-web";
import { auth } from "../firebase/config";
import { db } from "../firebase/config";

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      password: '',
      registered: false,
      error: null
    }
  }

  onSubmit() {

    auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(response => {
        this.setState({ registered: true });
        return db.collection('users').add({
          email: this.state.email,
          username: this.state.username,
          createdAt: Date.now()
        });
      })
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch(error => {
        this.setState({ error: 'Fallo en el registro' });
        console.log(error);
      });
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.title}> Register </Text>

        <TextInput style={styles.input}
          keyboardType="email-address"
          placeholder="Email" 
          value={this.state.email}
          onChangeText={text => this.setState({ email: text })}
        />
        <TextInput style={styles.input}
          placeholder="Username"
          value={this.state.username}
          onChangeText={text => this.setState({ username: text })}
        />
        <TextInput style={styles.input}
          keyboardType="default"
          placeholder="Password"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
        />

        {this.state.error && <Text style={{color:'red', marginTop:10}}>{this.state.error}</Text>}

        <Pressable onPress={() => this.onSubmit()} style={styles.button}>
          <Text style={styles.buttonText}> Registrarse </Text>
        </Pressable>

        <Pressable onPress={ () => this.props.navigation.navigate('Login') } style={styles.button}>
          <Text style={styles.buttonText}> Ya tengo cuenta </Text>
        </Pressable>

        <Text style={styles.userInfo}> Email: {this.state.email} </Text>
        <Text style={styles.userInfo}> Usuario: {this.state.username} </Text>
        <Text style={styles.userInfo}> Contraseña: {this.state.password} </Text>
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