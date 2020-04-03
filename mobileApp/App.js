import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import Login from './components/Login';
import MainPage from './components/MainPage';

const Stack = createStackNavigator();


export default class App extends React.Component{
  
  render(){
    return(
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={MainPage}></Stack.Screen>
        <Stack.Screen name='MainPage' component={MainPage}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    )
  }
}