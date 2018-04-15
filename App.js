import React from 'react';
import { Text, View, Platform, TouchableOpacity, StyleSheet, Button, WebView } from 'react-native';
import { Constants, WebBrowser } from "expo";
import { StackNavigator } from 'react-navigation';
import { FlatList, ActivityIndicator } from 'react-native';

 class Fetch extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://mjaay.com/jwtBackend-1.0-SNAPSHOT/api/info/starships')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.results,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
      <Text style={{fontSize: 20, fontWeight: "bold"}}>
        Fetched data from mjaay.com
        {"\n"}
      </Text>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text style={{fontWeight:"bold"}}>Name of starship: {item.name} {"\n"}Model of starship: {item.model}{"\n"}{"\n"}</Text>}
          
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}


const Touchable = (props) => (
  <TouchableOpacity style={styles.button} onPress={props.onPress}>
    <Text style={styles.buttonText}>{props.title}</Text>
  </TouchableOpacity>)



class HomeScreen extends React.Component {
  static navigationOptions = { title: 'Fetching in React App' };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View >
        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold"}}>Welcome to our React Native App</Text>
        <Touchable onPress={() => navigate('fetch')} title="Fetch" />
      
      </View>
    )
  }
}

export default App = () => <RouteStack style={{ marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight / 2 }} />

const RouteStack = StackNavigator({
  Home: { screen: HomeScreen },
  fetch: { screen: Fetch },
 
});

const styles = StyleSheet.create({
  button: {
    margin: 3,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 7,
    fontSize: 18,
    fontWeight: "bold",
    color: 'white'
  }
})