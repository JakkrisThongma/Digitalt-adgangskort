import 'react-native-gesture-handler';

import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

import MainPage from './components/MainPage';


import {Container, Header, Title, Content, Footer, FooterTab, Button, Text, Icon} from 'native-base';

import React, { useState, useCallback, useMemo } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { authorize, prefetchConfiguration } from 'react-native-app-auth';


type State = {
  hasLoggedInOnce: boolean,
  provider: ?string,
  accessToken: ?string,
  accessTokenExpirationDate: ?string,
  refreshToken: ?string
};

const config = {
    issuer: 'https://login.microsoftonline.com/3602e498-fd34-4a1e-a61b-b4639ceeaffd',
    clientId: '61548776-8c50-40bc-9d95-23b1323ea7ff',
    redirectUrl: 'com.mobileapp://auth',
    additionalParameters: {
      resource: '61548776-8c50-40bc-9d95-23b1323ea7ff'
  
    // serviceConfiguration: {
    //   authorizationEndpoint: 'https://demo.identityserver.io/connect/authorize',
    //   tokenEndpoint: 'https://demo.identityserver.io/connect/token',
    //   revocationEndpoint: 'https://demo.identityserver.io/connect/revoke'
    // }
  }
};

const defaultAuthState = {
  hasLoggedInOnce: false,
  provider: '',
  accessToken: '',
};

export default () => {
  const [authState, setAuthState] = useState(defaultAuthState);
  React.useEffect(() => {
    prefetchConfiguration({
      warmAndPrefetchChrome: true,
      ...config
    });
  }, []);

  const handleAuthorize = useCallback(
    async provider => {
      try {
        const newAuthState = await authorize(config);
        console.log(newAuthState)
        setAuthState({
          hasLoggedInOnce: true,
          provider: provider,
          ...newAuthState
        });
      } catch (error) {
        Alert.alert('Failed to log in', error.message);
      }
    },
    [authState]
  );

  return (
    <Container>
      <Content contentContainerStyle= {styles.container}>
        {authState.accessToken ? ( //Klarte å logge inn/har token
        <MainPage></MainPage>
        ) :
          <Button primary style = {styles.button} onPress={() => handleAuthorize()} >
            <Text>Logg Inn</Text>
            <Icon name='arrow-forward' />
          </Button>
        }
      </Content>
    </Container>
  );
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