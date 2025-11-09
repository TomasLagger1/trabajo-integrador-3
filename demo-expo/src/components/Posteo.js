import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { TextInput } from "react-native-web";
import { db, auth } from "../firebase/config";

class Posteo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }



    render() {
        console.log(this.props)
        return (
            <View style={styles.container}>
                <Text>{this.props.info.data.owner}</Text>
                <Text>{this.props.info.data.description}</Text>
                <Text>Cantidad de likes:{this.props.info.data.likes.length}</Text>
                <Text>Cantidad de comentarios:{this.props.info.data.comentarios.length}</Text>
                < Pressable
                    onPress={() => this.props.navigation.navigate('Comentarios',{info: this.props.info})}>
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

});

export default Posteo;
