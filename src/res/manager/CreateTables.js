
import React, { Component } from 'react';
import SQLite from 'react-native-sqlite-storage';
import { localDB } from '../constants/constants'

export default class CreateTables extends Component {  

    constructor(props) {
        super(props)
    }  
        
    
    componentDidMount() { 
       // const db = SQLite.openDatabase(localDB.dbName, '1.0', '', 1);
        var db = SQLite.openDatabase(localDB.dbName, "1.0", "reactDemo Database", 200000, this.openCB, this.errorCB);
        db.transaction(function (txn) {
            //txn.executeSql('DROP TABLE IF EXISTS ' + localDB.tableName.tblLogin, []);  
            txn.executeSql('CREATE TABLE IF NOT EXISTS ' + localDB.tableName.tblLogin + ' (id  INTEGER PRIMARY KEY AUTOINCREMENT,date TEXT,user_id INTEGER,code TEXT,session_token TEXT)', []);
            console.log('create databse success.')
        });      
    }

    errorCB(err) {
        console.log("SQL Error: " + err);
      }
      
      successCB() {
        console.log("SQL executed fine");
      }
      
      openCB() {
        console.log("Database OPENED");
      }   

    render() {
        return null
      }  

}
