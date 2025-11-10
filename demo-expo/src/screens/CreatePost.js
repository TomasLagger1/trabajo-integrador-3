import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { TextInput } from "react-native-web";
import { db, auth } from "../firebase/config";

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: ""
        };
    }

    onSubmit() {
        if (this.state.description !== "") {
            db.collection("posts").add({
                owner: auth.currentUser.email,
                description: this.state.description,
                createdAt: Date.now(),
                likes: [],
                comentarios: []

            })
                .then(() => {
                    this.setState({ description: "" });
                    this.props.navigation.navigate('Home');
                })
                .catch(e => console.log(e));
        }

    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Crear post</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Escribe un posteo..."
                    value={this.state.description}
                    onChangeText={(text) => this.setState({ description: text })}
                />


                <Pressable style={styles.button} onPress={() => this.onSubmit()}>
                    <Text style={styles.buttonText}>Publicar</Text>
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
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 10,
        width: "80%",
        textAlignVertical: "top",
        marginBottom: 15
    },
    button: {
        backgroundColor: "#8ecae6",
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: "center",
        width: "60%"
    },
    buttonText: {
        color: "black",
        fontSize: 16
    }
});

export default CreatePost;
