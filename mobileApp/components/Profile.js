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
                <Image source ={{ uri:"https://lh3.googleusercontent.com/proxy/nPVkz_vmQEadWeSMebMni_irJwY7cax4ZL0a0v0IrsV6lAq00eNlCld5PaA2k5W_YCRvLuTu9-oBsOfV4Sbd_Kd7xof9adrkWDq8BAL7LKjm"}}
                style={styles.image}/>
            </View>
            
            <View style={styles.infoContainer}>
    <Text style={[styles.text, {fontWeight: "200", fontSize: 18}]}>{data.givenName+ " " + data.surname}</Text>
                <Text style={[styles.text, {color: "#3362b8", fontSize:15}]}>{data.jobTitle}</Text>
            </View>
            <View style={styles.rowContainer}>
                    <Image source ={{ uri:"https://pluspng.com/img-png/email-icon-png-download-icons-logos-emojis-email-icons-2400.png", width:28, height:20}}/>
                    <Text style={[styles.text, {marginLeft:20}]}>
                        {data.userPrincipalName}
                    </Text>
            </View>
            <View style={styles.rowContainer}>
                    <Image source ={{ uri:"https://image.flaticon.com/icons/png/512/1239/1239525.png", width:28, height:30}}/>
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