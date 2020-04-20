import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import {Container,Content, Button, Text, Icon} from 'native-base';
import React, {useEffect ,useState, useCallback, } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { authorize, prefetchConfiguration } from 'react-native-app-auth';
import config from './authConfig';
import Drawer from './components/Drawer'

const defaultAuthState = {
  hasLoggedInOnce: false,
  provider: '',
  accessToken: '',
};

/*
export function getToken(){
  return authState.accessToken
}
*/

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

  /*
  useEffect( async () => {
      console.log('før try')
      try {
        await AsyncStorage.setItem('Token', authState.accessToken)
      } catch (e) {
        // saving error
      }
      console.log('etter try')
    },
    [authState],
  );
  */
  
  return (
    <Container>
      <Content contentContainerStyle= {styles.container}>
        {authState.accessToken ? ( //Klarte å logge inn/har token
        <NavigationContainer independent={true}>
          <Drawer></Drawer>
        </NavigationContainer>
        //<MainPage authState = {authState.accessToken} ></MainPage>
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