import React, { Component } from 'react';
import {Spinner, Label, Form, Item,Input, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import NfcManager, {NfcTech, NfcEvents} from 'react-native-nfc-manager';
import CustomModal from './CustomModal';


export default class MainPage extends Component {
  SampleFunction1(){
 
    console.log('Hello') 
    
  }

  constructor(props){
    super(props)
    this.state = {
      isModalVisible:false,
      isSpinnerVisible: true,
      success: false,
    }
    
  } 

  changeModalVisibility = (bool) =>{
    if(bool == true)
    {
      this.setState({isModalVisible: bool});
    }
    else{
      setTimeout(() => {
        this.setState({isModalVisible: bool});
        this._cleanUp();
        }, 1500);
      
    } 
  }

  cancel =() =>{
    this.setState({isModalVisible: false})
    this._cleanUp();
  }

  
  reset = () =>{
    setTimeout(() => {
      this.setState({
        success:false,
        isSpinnerVisible: true
      }); 
      }, 1550);
  }

  componentDidMount() {
    NfcManager.start();
  }

  componentWillUnmount() {
    this._cleanUp;
  }
 
 

  render() {
    return (
      <Container>
        <Content contentContainerStyle= {{justifyContent: 'center', backgroundColor: '#C6D6E3', flex:1}}>
          <Text style = {{alignSelf: 'center'}}>Velkommen bruker</Text>
          <Button primary style = {{alignSelf: 'center', justifyContent: "center", width: 150, marginTop: 35 }}  onPress={()=>this.Scan()}>
            <Text>Scan dør</Text>
          </Button>
          {
          this.state.isModalVisible
          ?
            <CustomModal changeModalVisibility={this.changeModalVisibility} isSpinnerVisible ={this.state.isSpinnerVisible} success ={this.state.success} cancel ={this.cancel}/>
            :
            null
          }
        </Content>
         
      </Container>
    
    );
  }

  _cleanUp = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  }

  Scan = async () => {
    
    try {
      this.changeModalVisibility(true)
      let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
      let resp = await NfcManager.requestTechnology(tech, {
        alertMessage: 'Ready to do some custom Mifare cmd!'
      });
      console.warn(resp);

      // the NFC uid can be found in tag.id
      let tag = await NfcManager.getTag();
      console.warn(tag.id);

      if (Platform.OS === 'ios') {
        resp = await NfcManager.sendMifareCommandIOS([0x30, 0x00]);
      } else {
        resp = await NfcManager.transceive([0x30, 0x00]);
      }
      console.warn(resp);

      this._cleanUp();


      this.setState({
        success: true,
        isSpinnerVisible: false
      })
      

      this.changeModalVisibility(false);
      this.reset();
      
      
    } catch (ex) {
      if(ex !== 'cancelled')
      {
        console.warn('ex', ex);
      }
      this._cleanUp();
    }
  }
}