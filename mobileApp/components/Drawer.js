import React from "react";
import{ View, Text, Image, Button, TouchableOpacity } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator, HeaderTitle, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';

import MainPage from "./MainPage";
import Profile from "./Profile";


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Screens = ({ navigation }) => {
    return(
    
    <Stack.Navigator 
    screenOptions={{
        headerTransparent: true,
        headerTitle: null,
        headerLeft: () =>(

            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{marginLeft:10}}>
                 <Image source ={{ uri:"https://i.ya-webdesign.com/images/3-bar-menu-png-3.png", height: 30, width:30}}/>
            </TouchableOpacity>
            ),
            cardStyleInterpolator:CardStyleInterpolators.forFadeFromBottomAndroid



    }}>
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="Profile" component={Profile} />
        
    </Stack.Navigator>

    )
}

//CustomDrawer Item Labels
const DrawerContent = props =>{
    return(
        <DrawerContentScrollView {...props}>
        <View>
            <View flex={0.} marginBottom={15} marginLeft={10}>
                
                <Image source ={{ uri:"https://kommunikasjon.ntb.no/data/images/00516/9839f3c7-16c5-4fd4-9320-c1e7cf817ed9-w_960_h_960.png", height: 70, width:200 }}
                
                //Dette er om vi skal ha profil bilde i menyen
                //<Image source ={{ uri:"https://thepowerofthedream.org/wp-content/uploads/2015/09/generic-profile-picture.jpg", height: 60, width:60 }}
                //resizeMode="center"
                //style={{ borderRadius: 30}} 

                />

                {/* <Text>Username</Text> */}

            </View>
      <DrawerItem
        label="Mainpage"
        labelStyle={{ marginLeft: -10}}
        onPress={() => props.navigation.navigate("MainPage")}
        icon={() => <Image source ={{ uri:"https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_home_48px-512.png", height: 20, width:20 }}/> } 
        //Annen mulighet er import av vector icons and ta i bruk dette senere, dette er beste option
      />
      <DrawerItem
        label="Profile"
        labelStyle={{ marginLeft: -10}}
        onPress={() => props.navigation.navigate("Profile")}
        icon={() => <Image source ={{ uri:"https://cdn4.iconfinder.com/data/icons/standard-free-icons/139/Profile01-512.png", height: 20, width:20 }}/> } 
      />
      </View>
    </DrawerContentScrollView>

    )
}


const Drawers = () => {
    return(
    <Drawer.Navigator initialRouteName="MainPage" drawerContent={props => <DrawerContent {...props}/>}
    >
        <Drawer.Screen name="Screens" component={Screens} />
    </Drawer.Navigator>
    );
};

export default Drawers