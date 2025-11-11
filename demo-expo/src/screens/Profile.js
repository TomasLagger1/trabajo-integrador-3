import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { auth, db } from "../firebase/config";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      postCount: 0,
    };
  }

  componentDidMount() {
    const userEmail = auth.currentUser.email;
    db.collection('users')
      .where('email', '==', userEmail)
      .onSnapshot(docs => {
        let username = '';
        docs.forEach(doc => {
          const data = doc.data();
          username = data.username || '';
        });
        this.setState({ username });
      });

    db.collection('posts')
      .where('owner', '==', userEmail)
      .onSnapshot(docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({ 
            id: doc.id, 
            data: doc.data() });
        });
        this.setState({ postCount: posts.length });
      });
  }

  signOut() {
    auth
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch((err) => {
        console.log("Error al cerrar sesión:", err);
      });
  }

  render() {
    const { username, postCount } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mi Perfil</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Nombre de usuario:</Text>
          <Text style={styles.info}>{username || '—'}</Text>

          <Text style={styles.label}>Correo electrónico</Text>
          <Text style={styles.info}>{auth.currentUser.email}</Text>

          <Text style={styles.label}>Cantidad de posteos</Text>
          <Text style={styles.info}>{postCount}</Text>
        </View>

        <Pressable style={styles.button} onPress={() => this.signOut()}>
          <Text style={styles.buttonText}>Salir de la app</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2f3640",
    marginBottom: 30,
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 25,
    marginBottom: 30,
    elevation: 5, 
  },
  label: {
    fontSize: 14,
    color: "#718093",
    marginTop: 10,
  },
  info: {
    fontSize: 18,
    color: "black",
    fontWeight: "500",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#8ecae6",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    width: "60%",
    marginVertical: 6
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    textAlign: "center"
   },
});

export default Profile;
