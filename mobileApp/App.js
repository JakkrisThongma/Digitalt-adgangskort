import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import Login from './components/Login';
import MainPage from './components/MainPage';


/*
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#5834eb'}}>
      <Text>Home Screen</Text>
      <Button color ="#ff5c5c"
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}


function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'OverView' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options = {{headerLeft : false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/
const Stack = createStackNavigator();


export default class App extends React.Component{
  
  render(){
    return(
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login}></Stack.Screen>
        <Stack.Screen name='MainPage' component={MainPage}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    )
  }
}