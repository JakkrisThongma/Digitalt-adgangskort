import React, {useState, useEffect, useContext,} from "react";
import{ View, Text, StyleSheet, Image} from "react-native";
import Context from '../Context'

const Profile = (props) => {
    
   
    const token = useContext(Context)

    const [isLoading, setIsLoading] = useState(true);


    const [data, setData] = useState({});
 

    useEffect(() => {

        fetch('http://localhost:5000/api/users/current'
        ,{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        })
    .then((response) => response.json())
    .then((responseJson) => {

       setData(responseJson)

    })
    .catch((error) =>{
        console.error(error);
    })  
    }, [] )

  
    useEffect(() => {

        setIsLoading(false) 

    }, [data] )


    return(
      <View style={styles.container}> 
    { isLoading ?
    null :

    
            
    <View style={{alignItems:'center'}}>
        <View style={{ alignSelf: "center"}}>
        <View style={styles.profileImage}>
                <Image source ={require('../Images/profileicon.png')}
                style={styles.image}/>
            </View>
            
            <View style={styles.infoContainer}>
    <Text style={[styles.text, {fontWeight: "200", fontSize: 18}]}>{data.givenName+ " " + data.surname}</Text>
                <Text style={[styles.text, {color: "#3362b8", fontSize:15}]}>{data.jobTitle}</Text>
            </View>

            
            <View style={styles.rowContainer}>
                    <Image style = {{width:28, height:20}} source ={require('../Images/emailicon.png')}/>
                    <Text style={[styles.text, {marginLeft:20}]}>
                        {data.userPrincipalName}
                    </Text>
            </View>
            <View style={styles.rowContainer}>
            <Image style = {{width:28, height:30}} source ={require('../Images/homeicon.png')}/>
                    <Text style={[styles.text, {marginLeft:20}]}>
                        {data.officeLocation}
                    </Text>
            </View>
            
        </View>
    </View>
    }
    </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c6d6e3'
    },
    rowContainer:{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 25   
    },

    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },

    inColor: {
        fontFamily: "HelveticaNeue",
        color: "#ee3124",
        
    },

    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        alignContent:"center"
 
        
    
    },
    profileImage:{
        position: "absolute",
        alignSelf:"center",
        width: 200,
        height: 200,
        borderRadius: 100,
        marginTop: 70,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "#3362b8"
    },
    infoContainer: {
        alignSelf:"center",
        alignItems:"center",
        marginTop: 300,

    }
    

});
 
export default Profile