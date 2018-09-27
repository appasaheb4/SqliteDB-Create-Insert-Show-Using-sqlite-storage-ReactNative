import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,ScrollView,WebView
} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import SafariView from "react-native-safari-view";
import CreateTables from '../../src/res/manager/CreateTables'
import { localDB } from '../../src/res/constants/constants'
import SQLite from "react-native-sqlite-storage";
var db = SQLite.openDatabase(localDB.dbName, "1.0", "reactDemo Database", 200000);


var radio_props = [
  {label: 'Male   ', value: 0 },
  {label: 'Female', value: 1 }
];
export default class Login extends Component {  
  
  constructor(props) {
    super(props);
    state = {
      fullName: '',
      email   : '',
      password: '',
    }
    this.login = this.login.bind(this);
    this.pressHandler = this.pressHandler.bind(this);
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  login(){
    db.transaction(function(txn) {
      txn.executeSql(
        "INSERT INTO " +
          localDB.tableName.tblLogin +
          " (date,user_id,code,session_token) VALUES (:date,:user_id,:code,:session_token)",
        [
          "2018-09-27",
          1,
          "101",
          "s12345"
        ]
      );
    });
    console.log('insert values success');
    this.props.navigation.navigate("Home");
  }


  pressHandler() {
    SafariView.isAvailable()
      .then(
        SafariView.show({
          url: "https:www.google.com",
          tintColor: "#fff",
          barTintColor: "#AA0000"
        })
      )
      .catch(error => {
        // Fallback WebView code for iOS 8 and earlier
      });
  }   

  render() {
    return (
     
      <ScrollView style={{backgroundColor:'#000000'}}>
         <View style={styles.container}>
      <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Full name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(fullName) => this.setState({fullName})}/>
        </View>
        <View style={styles.inputContainerRadioButton}>
         
          <RadioForm style={styles.inputsRadio}
          radio_props={radio_props}  
          initial={0}
          animation={true}
          formHorizontal={true}  
          buttonSize={25}
          buttonOuterSize={30}
          buttonStyle={{}}
          buttonWrapStyle={{marginRight: 20}}
          borderWidth={1}
          labelStyle={{fontSize: 16, color: '#ffffff'}}    
          buttonInnerColor={'#ffffff'}
          onPress={(value) => {this.setState({value:value})}}
        />
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/phone-filled/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Mobile Number"
              keyboardType="number-pad"    
              underlineColorAndroid='transparent'
              onChangeText={(fullName) => this.setState({fullName})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"  
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>  

        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.login}>
          <Text style={styles.signUpText}>Login</Text>
        </TouchableHighlight>

           <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.pressHandler}>
          <Text style={styles.signUpText}>Privacy Policy</Text>
        </TouchableHighlight>
        </View>
        <CreateTables />
        </ScrollView>

   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',  
    marginTop: 20,
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      margin: 10,
      borderBottomWidth: 1,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputContainerRadioButton:{
    borderRadius:30,
    borderBottomWidth: 1,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputsRadio:{
      height:50,
      marginLeft:16,
      paddingTop: 10,
      borderBottomColor: '#000000',
      backgroundColor: '#000000',
      
      flex:1,
     
      
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  signupButton: {
    backgroundColor: "#FF4DFF",
  },
  signUpText: {
    color: 'white',
  }
});