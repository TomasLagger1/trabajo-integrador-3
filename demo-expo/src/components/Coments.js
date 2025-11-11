import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, FlatList } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";

class Coments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comentario: "",
            post: this.props.route.params.info,
        };
    }

    onSubmit() {
        const { comentario, post } = this.state;

        if (comentario !== "") {
            db.collection("posts").doc(post.id).update({
                    comentarios: firebase.firestore.FieldValue.arrayUnion({
                        owner: auth.currentUser.email,
                        texto: comentario,
                        createdAt: Date.now(),
                    }),
                })
                .then(() => {
                    this.setState({
                        comentario: "",
                    });
                })
                .catch((error) => console.log(error));
        }
    }

    render() {
        const { data } = this.state.post;

        return (
            <View style={styles.container}>
                <View style={styles.postCard}>
                    <Text >{data.owner}</Text>
                    <Text style={styles.description}>{data.description}</Text>
                    <Text style={styles.likes}> 🤍 {data.likes.length} likes</Text>
                </View>


                <View style={styles.commentsSection}>
                    <Text style={styles.sectionTitle}>Comentarios:</Text>
                    {data.comentarios.length > 0 ? (
                        <FlatList
                            data={data.comentarios}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.commentBox}>
                                    <Text>{item.owner}</Text>
                                    <Text>{item.texto}</Text>
                                </View>
                            )}
                        />) : (
                        <Text style={styles.noComments}>Todavia no hay comentarios</Text>
                    )}


                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Escribe tu comentario..."
                    value={this.state.comentario}
                    onChangeText={(text) => this.setState({ comentario: text })} />

                <Pressable style={styles.button} onPress={() => this.onSubmit()}>
                    <Text style={styles.buttonText}>Publicar comentario</Text>
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
    postCard: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    description: {
        marginVertical: 8,
    },
    likes: {
        color: "#f33",
    },
    commentsSection: {
        flex: 1,
        marginBottom: 20,
    },
    sectionTitle: {
        fontWeight: "bold",
        marginBottom: 8,
    },
    commentBox: {
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingVertical: 5,
    },
    commentOwner: {
        fontWeight: "bold",
    },
    noComments: {
        color: "#777",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#4da6ff",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default Coments;
