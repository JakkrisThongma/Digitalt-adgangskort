import React, { Component } from 'react';
import { View, Text, Modal } from 'react-native';
import {Spinner, Label, Form, Item,Input, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon} from 'native-base';
import LottieView from 'lottie-react-native';


export default class CustomModal extends Component {
  constructor(props) {
    super(props);
  }

  


  render() {
    const  {changeModalVisibility, isSpinnerVisible, success, cancel} = this.props
    const text = 'Klar for scanning';
    const successText = 'Suksess';
    return (
        <Modal animationType={'slide'} transparent={true}>
        <View style= {{borderRadius: 25,position: 'absolute', bottom:0,alignSelf: 'center',elevation: 5,shadowColor:'black', backgroundColor: '#fff', height: '45%', width: '95%' /*Dimensions.get('window').width / 1.19,*/ }}>
        <Text style= {{alignSelf:'center', marginTop:'10%', fontSize: 30}}> {success ? successText: text}.</Text> 
          {isSpinnerVisible
          ?
            <Spinner color={'blue'}></Spinner>
            :
            null
          }
          {success
          ?
            <LottieView style = {{alignSelf:'center', }} source={require('./782-check-mark-success')} autoPlay loop={false} speed={1}/>
            :
            null
          }
          
          <Button primary style = {{alignSelf: 'center', justifyContent: "center", width: '35%', bottom: '20%', position: 'absolute'}}  onPress={() => cancel()} >
          <Text>Avbryt</Text>
          </Button>
        </View>
      </Modal>
    );
  }
}
