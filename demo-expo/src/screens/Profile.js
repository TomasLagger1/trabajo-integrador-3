import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mi Perfil</Text>

        <Pressable
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>
            Salir de la app. Hacer click aquí te lleva al login.
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