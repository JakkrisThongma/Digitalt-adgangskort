import React, {useState, useEffect} from "react";
import{ View, Text, StyleSheet, SafeAreaView, Image, Button} from "react-native";


const Profile = (props) => {

    const [isLoading, setIsLoading] = useState(true);


    const [data, setData] = useState({});
 

    useEffect(() => {

        fetch('http://127.0.0.1:5000/api/users/b0568c49-a276-4eeb-9000-6555c0bc3801'
        ,{
          method: 'GET',
          headers: {
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

    <SafeAreaView >
        <View style={{ alignSelf: "center"}}>
            <View style={styles.profileImage}>
                <Image source ={{ uri:"https://haas.berkeley.edu/wp-content/uploads/410-767f3e6a3c673281e0d59f3324a17a71-600x600.jpg"}}
                style={styles.image} resizeMode="center"/>
            </View>
            <View style={styles.infoContainer}>
    <Text style={[styles.text, {fontWeight: "200", fontSize: 18}]}>{data.givenName+ " " + data.surname}</Text>
                <Text style={[styles.text, {color: "#ee3124", fontSize:15}]}>{data.jobTitle}</Text>
            </View>
            <View style={styles.rowContainer}>
                    <Image source ={{ uri:"https://pluspng.com/img-png/email-icon-png-download-icons-logos-emojis-email-icons-2400.png", width:28, height:20}}/>
                    <Text style={[styles.text, {marginLeft:20}]}>
                        {data.mail}
                    </Text>
            </View>
            <View style={styles.rowContainer}>
                    <Image source ={{ uri:"https://cdn2.iconfinder.com/data/icons/font-awesome/1792/phone-512.png", width:28, height:23}}/>
                    <Text style={[styles.text, {marginLeft:20}]}>
                        {"48383012"}
                    </Text>
            </View>
            <View style={styles.rowContainer}>
                    <Image source ={{ uri:"https://image.flaticon.com/icons/png/512/1239/1239525.png", width:28, height:30}}/>
                    <Text style={[styles.text, {marginLeft:20}]}>
                        {data.officeLocation}
                    </Text>
            </View>
        </View>
    </SafeAreaView>
    }
    
    </View>



    );
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
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
        height: undefined
    },
    profileImage:{
        width: 200,
        height: 200,
        borderRadius: 100,
        marginTop: 70,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "#ee3124"
    },
    infoContainer: {
        alignSelf:"center",
        alignItems:"center",
        marginTop: 16,

    }


});
 
export default Profile