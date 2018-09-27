import React, { Component } from "react";
import { StyleSheet, Alert,Text } from "react-native";
import { Container } from "native-base";
import TableView from "react-native-tableview";
const { Section, Item } = TableView;

import { localDB } from "../../src/res/constants/constants";
import SQLite from "react-native-sqlite-storage";
var db = SQLite.openDatabase(
  localDB.dbName,
  "1.0",
  "reactDemo Database",
  200000
);

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      session_tokne:''
    };
    this.insertValues = this.insertValues.bind(this);
  }

  componentWillMount() {
    this.connection_LoadQuestionJsonData();

    this.getLocalDBData();
  }

  insertValues(value) {
    Alert.alert(value);
  }

  //TODO: connection_LoadQuestionJsonData
  connection_LoadQuestionJsonData() {
    fetch("http://localhost:8080/questionandanwsers", {
      method: "Get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          data: responseJson.data
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getLocalDBData() {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM " + localDB.tableName.tblLogin,
        [],
        (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          var len = results.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              console.log("Employee Id:" + row.user_id);

              this.setState({
                session_tokne:row.session_token
              });
            }
          }
        }
      );
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <TableView
          style={{ flex: 1 }}
          tableViewStyle={TableView.Consts.Style.Plain}
          selectedValue="ES53"
          onPress={({ label }) => this.insertValues(label)}
        >
          {this.state.data.map(item => (
            <Section label={item.question}>
              {item.answer.map(row => (
                <Item key={row.choice}>{row.choice}</Item>
              ))}
            </Section>
          ))}
        </TableView>
  
        <Text>{this.state.session_tokne}</Text>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
