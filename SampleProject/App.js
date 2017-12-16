import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView,FlatList } from 'react-native';
import Canvas from 'react-native-canvas';

export default class App extends React.Component {

  state = {
      data: [],
      textName:'',
      textAddress:''
     };

     handleCanvas = (canvas) => {
         const ctx = canvas.getContext('2d');
         ctx.fillStyle = 'gray';
         ctx.fillRect(0, 0, 400, 100);
       }

  render() {

    return (

      <View style={styles.container}>
        <View style={styles.textInputView}>
          <Text style={styles.textName}>Name</Text>
          <TextInput
          style={styles.textInput}
          onChangeText={(textName) => this.setState({textName})}
          />
        </View>
        <View style={styles.view}>
          <Text style={styles.textAddress}>Address</Text>
          <TextInput
          style={styles.textInput}
          onChangeText={(textAddress) => this.setState({textAddress})}
          />
        </View>
        <View style={styles.signatureView}>
          <Text style={styles.textAddress}>Signature</Text>
          <Canvas ref={this.handleCanvas}/>
        </View>
        <View style={styles.view}>
          <View style={styles.btnViewSave}>
            <Button
            onPress={() => this.saveData()}
            title="Save"
            color="#841584"/>
          </View>
          <View  style={styles.btnViewDetail}>
            <Button
            onPress={() => this.fetchData()}
            title="View Details"
            color="#841584"/>
          </View>
        </View>

        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i}
          renderItem={({ item }) =>
            <Text>
               Customer {`${item.id}`}  : {`${item.name}`} ( {` ${item.address}`} )
            </Text>}
        />
      </View>
    );
  }

  // Get Saved Customer Data
  fetchData = async () => {
    const response = await fetch("http://192.168.56.1:8080/api/customer.json");
    const json = await response.json();
    this.setState({ data: json });
  }

  // Save Customer Data
  saveData = async () => {
  fetch('http://192.168.56.1:8080/api/save', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
        {"customer":
          {
            "name":this.state.textName,
            "address":this.state.textAddress
          }
        }
    ),
  });
alert("Successfully Saved..!");
};

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: { height: 40, width: 200, backgroundColor: '#f1f8ff' },
  text: { marginLeft: 5 },
  row: { height: 30 },
  view: { flexDirection: 'row', marginBottom:5},
  textInputView: { flexDirection: 'row', marginBottom:10,  marginTop:40 },
  textInput: { height: 40, width: 200, borderColor: 'gray', borderWidth: 1 },
  textName: {fontWeight: 'bold', marginTop: 10, marginLeft: 20, marginRight:5,fontSize: 16 },
  textAddress: {fontWeight: 'bold', marginTop: 10,marginRight:6, fontSize: 16},
  btnViewSave: {marginLeft:33, marginRight:10, marginTop:-30},
  btnViewDetail: {marginTop:-30},
  signatureView: { alignItems: 'center'},
});
