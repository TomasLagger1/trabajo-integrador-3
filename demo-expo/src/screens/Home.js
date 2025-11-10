import React, {Component} from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { db } from "../firebase/config";
import Posteo from "../components/Posteo";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posteos: []
        };
    }

    componentDidMount(){
        db.collection("posts").orderBy("createdAt","desc").onSnapshot(posteos=>{
            let arPosteos = []
            posteos.forEach(unPost=>{
                arPosteos.push({
                    id: unPost.id,
                    data: unPost.data()
                })
            })
            console.log (arPosteos)
            this.setState({posteos:arPosteos})
        })
    }
    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Posts:</Text>
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => <Posteo info={item} navigation={this.props.navigation} />}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={<Text style={styles.emptyText}>No hay posteos aún.</Text>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },
  list: {
    paddingBottom: 24,
  },
  emptyText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
});

export default Home;