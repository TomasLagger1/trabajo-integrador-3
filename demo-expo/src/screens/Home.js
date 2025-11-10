import React, {Component} from "react";
import { View, Text, StyleShee,FlatList } from "react-native";
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
            <View>
                <Text>Home</Text>
                <FlatList
                        data={this.state.posteos}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => <Posteo info={item} navigation={this.props.navigation} />}
                    />
            </View>
        );
    }
}

export default Home;