import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import {Spinner, Button} from 'native-base';
import LottieView from 'lottie-react-native';



export default class CustomModal extends Component {
  constructor(props) {
    super(props);
  }
  
  
  render() {
    
    function setText(){
      if(success)
      {
        return 'Du har tilgang'
      }
      else if(error)
      {
        return 'Du har ikke tilgang'
      }
      else{
        return 'Klar for scanning'
      }
    }
    const  {scanning, success, cancelScan, error} = this.props
    const text = setText();
  

    return (
        <Modal animationType={'slide'} transparent={true}>
        <View style= {styles.outerContainer}>
        
        <Text style= {styles.responseText}> 
        {text}
        </Text> 
        

          {scanning
          ?
            <Spinner color={'blue'}></Spinner>
            :
            null
          }
          {success
          ?
            <LottieView style = {styles.lottie} source={require('./782-check-mark-success')} autoPlay loop={false} speed={1}/>
            :
            null
          }
          {error
          ?
            <LottieView style = {styles.lottie} source={require('./3932-error-cross')} autoPlay loop={false} speed={1}/>
            :
            null
          }
          
          <Button primary style = {styles.button}  onPress={() => cancelScan()} >
          <Text style= {styles.buttonText}>Avbryt</Text>
          </Button>

        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 25,
    position: 'absolute', 
    bottom:0,alignSelf: 'center',
    elevation: 5,shadowColor:'black', 
    backgroundColor: '#fff', 
    height: '45%', 
    width: '95%' 
  },
  responseText: {
    alignSelf:'center', 
    marginTop:'10%', 
    fontSize: 30
  },
  button:{
    alignSelf: 'center', 
    justifyContent: "center", 
    width: '35%', 
    bottom: '20%', 
    position: 'absolute'
  },
  buttonText:{
    color: 'white'
  },
  lottie:{
    alignSelf:'center'
  }
    
})