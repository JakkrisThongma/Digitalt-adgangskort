import React, { Component } from 'react';
import { Container,Content, Button, Text, Icon } from 'native-base';
import NfcManager, {NfcTech, NfcEvents} from 'react-native-nfc-manager';
import CustomModal from './CustomModal';
import { StyleSheet, TouchableOpacity, Image, View} from 'react-native'

export default class MainPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      scanning:true,
      isModalVisible:false,
      success: false,
      error: false
    }

    /*
    <Button
            style={{
            alignSelf: 'center', 

            width: '35%', 
            bottom: '40%', 
            position: 'absolute',


              borderWidth:1,
              borderColor:'rgba(0,0,0,0.2)',
              alignItems:'center',
              justifyContent:'center',
              width:200,
              height:200,
              backgroundColor:'red',
              borderRadius:100,
            }}>
          <Image style={{
              borderWidth:1,
              borderColor:'rgba(0,0,0,0.2)',
              alignItems:'center',
              justifyContent:'center',
              width:200,
              height:200,
              backgroundColor:'red',
              borderRadius:100,
            }}
          
          source={require('./coursehero-free-unlock.jpg')}
          />
          </Button>
    */
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
    setTimeout(() => {
      this.setState({
        success:false,
        error:false,
        scanning: true
      }); 
      }, 3050);
  }
  

  componentDidMount() {
    NfcManager.start();
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
      //Show modal when the scan starts00
      this.showModal()


      let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
      let resp = await NfcManager.requestTechnology(tech, {
        alertMessage: 'Ready to do some custom Mifare cmd!'
      });
      console.log(resp);

      // the NFC uid can be found in tag.id
      let tag = await NfcManager.getTag();
      console.log(tag.id);

      if (Platform.OS === 'ios') {
        resp = await NfcManager.sendMifareCommandIOS([0x30, 0x00]);
      } else {
        resp = await NfcManager.transceive([0x30, 0x00]);
      }
      console.log(resp);

      this._cleanUp();

      if(tag.id === '0437939A796381')
      {
        this.grantAccess();
      }else{
        this.accesDenied();
      }
      
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
          <Text style = {styles.text}>Velkommen bruker</Text>
          
          <Button  primary style = {styles.button}  onPress={()=>this.Scan()}>
            <Icon name = 'unlock'/>
            <Text>Lås opp dør</Text>
          </Button>
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
    backgroundColor: '#C6D6E3', 
    flex:1
  },

  text: {
    alignSelf: 'center'
  },

  button:{
    alignSelf: 'center', 
    justifyContent: "center", 
    width: '35%', 
    bottom: '40%', 
    position: 'absolute'
  }

})