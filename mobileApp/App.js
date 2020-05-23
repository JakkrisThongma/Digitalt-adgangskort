import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import {Container,Content} from 'native-base';
import React, {useState, useCallback} from 'react';
import { Alert, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import { authorize, prefetchConfiguration } from 'react-native-app-auth';
import config from './authConfig';
import Drawer from './components/Drawer';
import {ContextProvider} from './Context'
import * as Animatable from 'react-native-animatable'

const defaultAuthState = {
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
        setAuthState({
          provider: provider,
          ...newAuthState
        });
        //newAuthState har token
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
      <ContextProvider value={authState.accessToken}>
      <NavigationContainer independent={true} authState>

        
        <Drawer></Drawer>
      </NavigationContainer>
      </ContextProvider>
      ) :
      //<View style={{height: height/ 9}}>
      <View style={{alignSelf:'center'}}>
        <Animatable.View animation="fadeIn" easing="ease-in" delay={400} iterationCount={1}>
        <Image style={styles.image} source ={require('./Images/inlogo.png')}/>
        </Animatable.View>

        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" iterationDelay={1500}>
        <TouchableOpacity primary style = {styles.button} onPress={() => handleAuthorize()} >
          <Animatable.View animation="fadeIn" easing="ease-in">
            <Animatable.Text style={styles.text}>SIGN IN</Animatable.Text>
          </Animatable.View>
        </TouchableOpacity>
        </Animatable.View>
      </View>
      }
    </Content>
  </Container>
);
}



const styles = StyleSheet.create({
  container:{
    justifyContent: 'center', 
    backgroundColor: '#c6d6e3', 
    flex:1,
    flexDirection: 'column'
  },

  image:{
    width:200,
    height:200,
    marginBottom: 300,
    alignSelf:'center',

  },

  text: {
    alignSelf: 'center',
    color:'white',
    fontWeight:'bold'
  },

  button:{
    flexDirection: "row",
    backgroundColor: '#3362b8',
    alignItems: 'center',
    justifyContent: 'center', 
    height: 70,
    width: 250,
    marginHorizontal: 20,
    borderRadius: 35, 
  },
})