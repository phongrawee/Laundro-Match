import React, { Component } from 'react';

import firebase from '../database/firebase';

const Functions = {
    
        signOut:  function() {
        firebase.auth().signOut().then(() => {
          this.props.navigation.navigate('Login')
        })
        .catch(error => this.setState({ errorMessage: error.message }))
    },  
        GoHome: function() {
          this.props.navigation.navigate('Dashboard');
    },
        GoFeed:  function() {
        this.props.navigation.navigate('Feed');
    },
        GoOrder: function(){
        this.props.navigation.navigate('Order');
      }
    
    }
    export default Functions;
