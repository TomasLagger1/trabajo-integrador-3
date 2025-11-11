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
        this.setState({ error: 'Fallo en el registro, revisa que tu mail este bien escrito y la contraseña tenga al menos 6 caracteres' });
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Register </Text>

        <TextInput style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          value={this.state.email}
          onChangeText={text => this.setState({ email: text })}
        />
        <TextInput style={styles.input}
          placeholder="Usuario"
          value={this.state.username}
          onChangeText={text => this.setState({ username: text })}
        />
        <TextInput style={styles.input}
          keyboardType="default"
          placeholder="Contraseña"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
        />

    
      {this.state.error && <Text style={styles.errorText}>{this.state.error}</Text>}



        <View style={styles.buttonsContainer}>
          <Pressable onPress={() => this.onSubmit()} style={styles.button}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </Pressable>

          <Pressable
            onPress={() => this.props.navigation.navigate("Login")}
            style={styles.buttonYaTengo}
          >
            <Text style={styles.buttonText}>Ya tengo cuenta</Text>
          </Pressable>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
    textAlign: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    width: "80%",
  },
  buttonsContainer: {
    marginTop: 15,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    backgroundColor: "#8ecae6",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    width: "60%",
    marginVertical: 6
  },
  buttonYaTengo: {
    backgroundColor: "#a8dadc",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    width: "60%",
    marginVertical: 6
  },
  buttonText: {
    color: "black",
    fontSize: 16
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center"
  },
});

export default Register;