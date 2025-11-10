import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { TextInput } from "react-native-web";
import { db, auth } from "../firebase/config";

class Coments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comentario: "",
    };
  }

  onSubmit() {
    if (this.state.comentario !== "") {
      db.collection("comentarios").add({
        owner: auth.currentUser.email,
        comentario: this.state.comentario,
        createdAt: Date.now(),
        postId: this.props.route.params.postId
      })
        .then(() => {
            this.setState({ comentario: "" });
            this.props.navigation.Home();
        })
        .catch(e => console.log(e));
    }}

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Comentar post: </Text>

        <TextInput
          style={styles.input}
          placeholder="Escribe tu comentario..."
          value={this.state.comentario}
          onChangeText={(text) => this.setState({ comentario: text })}
        />

        <Pressable onPress={() => this.onSubmit()}>
          <Text>Publicar comentario</Text>
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
        justifyContent: "center",
        alignItems: "center"
    },
   
});

export default Coments;
