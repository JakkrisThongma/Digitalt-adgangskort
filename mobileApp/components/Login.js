import React, { Component } from 'react';
import {Image} from 'react-native';
import {List,ListItem,InputGroup,Label, Form, Item,Input, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Thumbnail } from 'native-base';

export default class Login extends Component {
  
  SampleFunction1(){
 
    if(this.state.userInput == 'Admin' && this.state.passwordInput == 'Admin')
    {
      this.props.navigation.navigate('MainPage');
      //this.props.navigation.replace('MainPage')
    }else{
      return false;
    }
  }

  constructor(props){
    super(props)
    this.state = {
      userInput: '',
      passwordInput: '',
    }
  }

  
  render() {
    return (
      <Container>
        <Content>
        <List>
          <ListItem>
            <InputGroup>
              <Icon name='ios-person' />

              <Input placeholder='EMAIL' 
              value={this.state.userInput} 
              onChangeText ={(userInput) => {this.setState({userInput})}}
              />
            </InputGroup>
          </ListItem>
                    
          <ListItem>
            <InputGroup>
                <Icon name='ios-unlock' />
               <Input placeholder='PASSWORD' secureTextEntry={true}
               value={this.state.passwordInput}
               onChangeText ={(passwordInput) => {this.setState({passwordInput})}}
               />
            </InputGroup>
          </ListItem>
        </List>                                                                                                                                                               
          <Button primary style = {{alignSelf: 'center',flexDirection: "row", justifyContent: "center", width: 150, marginTop: 35 }} iconRight light onPress={() => this.SampleFunction1()} >
            <Text>Logg Inn</Text>
            <Icon name='arrow-forward' />
             
          </Button>
          <Text>{this.state.userInput}</Text>
          <Text>{this.state.passwordInput}</Text>
          
          
        </Content>
      </Container>
    );
  }
}