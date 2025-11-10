import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { TextInput } from "react-native-web";
import { db, auth } from "../firebase/config";
import firebase from 'firebase';

class Posteo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    likes() {
        const userEmail = auth.currentUser.email;
        const publicacion = db.collection('posts').doc(this.props.info.id);
        const likeado = this.props.info.data.likes.includes(userEmail);
        if (likeado) {
            publicacion.update({
                likes: firebase.firestore.FieldValue.arrayRemove(userEmail)
            });
        } else {
            publicacion.update({
                likes: firebase.firestore.FieldValue.arrayUnion(userEmail)
            });
        }
    }

    render() {
        console.log(this.props.info)
        const userEmail = auth.currentUser ? auth.currentUser.email : null;
        const likeado = userEmail && this.props.info.data.likes.includes(userEmail);
        return (
            <View style={styles.container}>
                <Text>{this.props.info.data.owner}</Text>
                <Text>{this.props.info.data.description}</Text>
                <Text>Cantidad de likes: {this.props.info.data.likes.length}</Text>
                <Text>Cantidad de comentarios: {this.props.info.data.comentarios.length}</Text>
                <Pressable onPress={()=> this.likes()} style={styles.botonLikear}>
                    <Text>
                        {likeado ? '❤️' : '🤍'}
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => this.props.navigation.navigate('Comentarios', { info: this.props.info })}>
                    <Text>Ver comentarios</Text>
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
    botonLikear: {
        marginVertical: 8,
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#f1f1f1',
    },
});

export default Posteo;
