import React, { Component} from 'react';
import { Container,Content,Text} from 'native-base';
import NfcManager, {NfcTech,Ndef} from 'react-native-nfc-manager';
import CustomModal from './CustomModal';
import { StyleSheet, TouchableOpacity, Image, View} from 'react-native'
import {getCurrentUserApi} from '../api'
import {accessRequestApi} from '../api'
import * as Animatable from 'react-native-animatable'
import Context from '../Context'

export default class MainPage extends Component {
  static contextType = Context;
  constructor(props){
    super(props)
    this.state = {
      scanning:true,
      isModalVisible:false,
      success: false,
      error: false,
      parsed: null,
      user: {},
    }
  } 
  showModal = () =>{
    this.setState({isModalVisible: true});
  }

  hideModal = () =>{
    setTimeout(() => {
      this.setState({isModalVisible: false});
      this._cleanUp();
      }, 3000);
  }

  cancelScan =() =>{
    this.setState({isModalVisible: false})
    this._cleanUp();
  }

  grantAccess= () =>{
    this.setState({
      success: true,
      scanning: false
    })
  }

  accesDenied = () =>{
    this.setState({
      error: true,
      scanning: false
    })
  }

  reset = () =>{
    this._cleanUp;
    setTimeout(() => {
      this.setState({
        success:false,
        error:false,
        scanning: true,
        parsed: null,  
      }); 
      }, 3050);
  }

  decode = () =>{
    let parsed = null;
      if (this.state.tag.ndefMessage && this.state.tag.ndefMessage.length > 0) {
          const ndefRecords = this.state.tag.ndefMessage;
  
          function decodeNdefRecord(record) {
              if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
                  return [Ndef.text.decodePayload(record.payload)];
              } else if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
                  return [Ndef.uri.decodePayload(record.payload)];
              }
  
              return ['unknown', '---']
          }
  
          parsed = ndefRecords.map(decodeNdefRecord);
      }
      this.setState({parsed});
  }
  
  componentDidMount() {
  NfcManager.start();
  const token = this.context;
  console.log(token)
  const headers = { Authorization: `Bearer ${token}` };
  getCurrentUserApi(headers).then(response =>this.setState({
    user: response.id
  }) ).catch(error=>console.log(error))
  
}

  componentWillUnmount() {
    this._cleanUp;
  }

  // NFC METHODS
  _cleanUp = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  }

  Scan = async () => {
   
    try {
      this.showModal()
      let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
      let resp = await NfcManager.requestTechnology(tech, {
        alertMessage: 'Ready to do some custom Mifare cmd!'
      });
    
      let tag = await NfcManager.getTag();

      if (Platform.OS === 'ios') {
        resp = await NfcManager.sendMifareCommandIOS([0x30, 0x00]);
      } else {
        resp = await NfcManager.transceive([0x30, 0x00]);
      }
    
      this.setState({ tag });
      
      this.decode();

      const data= {
        userId: this.state.user,
        smartLockId: this.state.parsed[0][0]
      }
      
      accessRequestApi(data).then(response =>{
      if(response.accessAuthorized == true)
      {
        this.grantAccess();
      }else{
        this.accesDenied();
      }}).catch(error=>console.log(error))
      
      this.hideModal();
      this.reset();
      
    } catch (ex) {
      if(ex !== 'cancelled')
      {
        console.log('ex', ex);
      }
      this._cleanUp();
    }
  }

  render() {
  
    return (
      
      <Container>
        <Content contentContainerStyle= {styles.container}>
        <Text style={styles.text}>LÅS OPP DØR</Text>
          <TouchableOpacity primary style = {styles.button} onPress={()=>this.Scan()}>
            <Animatable.View animation="zoomIn" easing="ease-out" iterationCount={1}>
              <Animatable.View animation="pulse" easing="ease-out" iterationCount={1}>
                <Image style={styles.image} source ={require('../Images/lockbutton.png')}/>
              </Animatable.View>
            </Animatable.View>
          </TouchableOpacity>
          {
          this.state.isModalVisible
          ?
            <CustomModal scanning ={this.state.scanning} success ={this.state.success} error = {this.state.error} cancelScan ={this.cancelScan}/>
            
            :
            null
          }
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center', 
    backgroundColor: '#c6d6e3', 
    flex:1
  },
  button:{
    alignSelf: 'center', 
    justifyContent: "center", 
    
  },
  image:{
    width:200,
    height:200,
    alignSelf:'center'

  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
    alignSelf:'center',
    fontWeight: "bold"
}

})