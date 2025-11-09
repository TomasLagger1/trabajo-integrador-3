import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { TextInput } from "react-native-web";
import { db, auth } from "../firebase/config";

class Coments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

   

    render() {
        console.log(this.props.route.params.info)

        return (
            <View style={styles.container}>
              <Text>hola</Text> 
              <Pressable>
                    <Text >Comentar</Text>
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
