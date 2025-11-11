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
        const createdAt = this.props.info.data.createdAt;
        const fecha = new Date(createdAt).toLocaleString();
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.owner}>{this.props.info.data.owner}</Text>
                    </View>

                    {fecha && <Text style={styles.fechaCrea}>Creado: {fecha}</Text>}
                    <Text style={styles.description}>{this.props.info.data.description}</Text>

                    <View style={styles.metaRow}>
                        <Text style={styles.counts}>Cantidad de likes: {this.props.info.data.likes.length}</Text>
                        <Text style={styles.counts}>Cantidad de comentarios: {this.props.info.data.comentarios.length}</Text>
                    </View>

                    <View style={styles.actions}>
                        <Pressable onPress={() => this.likes()} style={[styles.botonLikear, likeado ? styles.liked : styles.notLiked]}>
                            <Text style={styles.likeText}>{likeado ? '❤️' : '🤍'}</Text>
                        </Pressable>

                        <Pressable onPress={() => this.props.navigation.navigate('Comentarios', { info: this.props.info })} style={styles.commentsBtn}>
                            <Text style={styles.commentsLink}>Ver comentarios</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: '#eaf6ff',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#e6f2fb',
    },
    header: {
        backgroundColor: '#d9f0ff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignSelf: 'center',
        marginBottom: 10,
    },
    owner: {
        color: '#05629a',
        fontWeight: '600',
        textAlign: 'center'
    },
    description: {
        color: '#222',
        lineHeight: 20,
        textAlign: 'left',
        marginBottom: 12,
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    counts: {
        color: '#555',
        fontSize: 13,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    botonLikear: {
        marginRight: 12,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    liked: {
        backgroundColor: '#ffd6e0',
    },
    notLiked: {
        backgroundColor: '#e6f5ff',
    },
    likeText: {
        fontSize: 18,
    },
    commentsBtn: {
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
    commentsLink: {
        color: '#2a9df4',
        fontWeight: '500'
    },
    fechaCrea: {
        color: '#3a7bb8',
        fontSize: 12,
        marginBottom: 8,
        textAlign: 'left'
    },
});

export default Posteo;
