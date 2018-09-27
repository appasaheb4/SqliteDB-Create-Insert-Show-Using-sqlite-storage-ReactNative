import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Picker,
  Image,
  AsyncStorage
} from "react-native";
import {
  StackNavigator,
} from 'react-navigation';

import OnBoarding from './src/comp/OnBording';
import Login from './src/comp/Login'
import Home from './src/comp/Home'


const LoginStack = StackNavigator({
  Home:
  {
    screen: Home,
    navigationOptions: {
      header: null,
    }   
  },
  Login:
  {
    screen: Login,
    navigationOptions: { 
      header: null,
      gesturesEnabled: true,
    },
  
  },
},
  {
    initialRouteName: 'Login'  
  }
);



//const video = new Videos();

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (
      <LoginStack />
    );
   
  }
}
