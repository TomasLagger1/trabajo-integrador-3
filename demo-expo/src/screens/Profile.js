import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { auth, db } from "../firebase/config";

class Profile extends Component {
  constructor(props) {
    super(props);

  }

  signOut() {
    auth.signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch(err => {
        console.log('Error al cerrar sesión:', err);
      });
  }


  render() {
    return (     
      <View style={styles.container}>
        <Text style={styles.title}>Mi Perfil</Text>
        <Text>nombre de usuario: {auth.currentUser.username}</Text>
        <Text>email: {auth.currentUser.email}</Text>
        <Text>cantidad de posteos: {auth.currentUser.posts}</Text>
        <Pressable
          style={styles.button}
          onPress={() => this.signOut()}
        >
          <Text style={styles.buttonText}>
            Salir de la app
          </Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    color: "black",
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Profile;