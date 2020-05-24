import React, { Component } from 'react';
import {Image} from 'react-native';
import {List,ListItem,InputGroup,Label, Form, Item,Input, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Thumbnail } from 'native-base';
import { authorize } from 'react-native-app-auth';

const config = {
  issuer: 'https://login.microsoftonline.com/3602e498-fd34-4a1e-a61b-b4639ceeaffd',
  clientId: '93a5c726-983f-4e8c-a330-f1b34e3d6752',
  redirectUrl: 'msauth://com.mobileapp/ga0RGNYHvNM5d0SLGQfpQWAPGJ8%3D',
};



export default class Login extends Component {
  //this.props.navigation.navigate('MainPage');
      //this.props.navigation.replace('MainPage')
      async componentDidMount() {
        console.log("Før trycatch")
        try {
          const result =await authorize(config);
          // result includes accessToken, accessTokenExpirationDate and refreshToken
          console.log("før result")
          console.log(JSON.stringify(result))
          
          console.log("etter result")
          
        } catch (error) {
          console.log(error);
        }
        console.log("etter trycatch")
      }

      
  render() {
    return (
      <Container>
        <Content>                                                                                                                                                    
          <Button primary style = {{alignSelf: 'center',flexDirection: "row", justifyContent: "center", width: 150, marginTop: 35 }} iconRight light >
            <Text>Logg Inn</Text>
            <Icon name='arrow-forward' />
             
          </Button>
        </Content>
      </Container>
    );
  }
}