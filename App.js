import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
 
import firebase from 'firebase';
import {Headers, Button,Card} from './src/component/common';
import LoginForm from './src/component/loginForm';
 
export default class App extends Component {
  state = {loggedIn : null};
 
  componentDidMount(){
    const config = {
      apiKey: "AIzaSyB0OmxcGPHlQp3R_fjtzFFDbFOpd9cZpWg",
      authDomain: "laundromatch-ada09.firebaseapp.com",
      databaseURL: "https://laundromatch-ada09.firebaseio.com",
      projectId: "laundromatch-ada09",
      storageBucket: "laundromatch-ada09.appspot.com",
      messagingSenderId: "100338533266"
      };
    firebase.initializeApp(config);
      
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
       this.setState({loggedIn : true});
      }else{
        this.setState({loggedIn : false});
      }
    });
  }
 
  renderFormLogin(){
    if(this.state.loggedIn == true){
      return(<View>
        <Headers headerText='Welcome'/>
        <Card>
          <Text style={styles.textEmailStyle}>{firebase.auth().currentUser.email}</Text>
          <Button onPress={()=>firebase.auth().signOut()}>Logout</Button>
        </Card>
      </View>);
    }else{
      return(<View>
        <Headers headerText='Login'/>
        <LoginForm/>
      </View>);
    }
  }
 
  render(props) {
    return(<View>
      {this.renderFormLogin()}
      </View>);
  }
}
 
const styles = {
  textEmailStyle:{
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 6,
  }
}