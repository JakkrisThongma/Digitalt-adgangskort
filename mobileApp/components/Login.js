import React, { Component } from 'react';
import {Image} from 'react-native';
import {List,ListItem,InputGroup,Label, Form, Item,Input, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Thumbnail } from 'native-base';
import { authorize } from 'react-native-app-auth';

const config = {
  issuer: 'https://login.microsoftonline.com/c39d49f7-9eed-4307-b032-bb28f3cf9d79',
  clientId: '91b8fdda-8936-463b-9940-5a49d875c229',
  redirectUrl: 'https://digitaladgangskortadminui-dev-web.azurewebsites.net/.auth/login/aad/callback',
};



export default class Login extends Component {
  //this.props.navigation.navigate('MainPage');
      //this.props.navigation.replace('MainPage')
      async componentDidMount() {
        try {
          const result = await authorize(config);
          // result includes accessToken, accessTokenExpirationDate and refreshToken
          console.log(result)
        } catch (error) {
          console.log(error);
        }
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