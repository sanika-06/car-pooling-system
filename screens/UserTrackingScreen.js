import React, { useState, useContext, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import pin from "../assets/pin.png"
import car from "../assets/car.png"
import person from "../assets/person.png"
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import { UserContext } from '../Contexts/UserContext';

import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

// export default function UserTrackingScreen() {

//     const [latitude, setLatitude] = useState(0)
//     const [longitude, setLongitude] = useState(0)
//     const [userLatitude, setUserLatitude] = useState(0)
//     const [userLongitude, setUserLongitude] = useState(0)
//     const { VIEWDRIVERDETAILS, SETVIEWDRIVERDETAILS, USER } = useContext(UserContext);
//     const navigation = useNavigation();


//     const [location, setLocation] = useState(null);
//     const [errorMsg, setErrorMsg] = useState(null);

//     // async function getLocation() {
//     //     let { status } = await Location.requestForegroundPermissionsAsync();
//     //     if (status !== 'granted') {
//     //         setErrorMsg('Permission to access location was denied');
//     //         return;
//     //     }

//     //     let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 });
//     //     setLocation(location);

//     //     const userRef = doc(db, "users", USER.id);

//     //     await updateDoc(userRef, {
//     //         latitude: location.coords.latitude,
//     //         longitude: location.coords.longitude
//     //     });

//     // }

//     // setTimeout(() => {
//     //     getLocation();
//     // }, 4);

// // console.log(VIEWDRIVERDETAILS.id)
//     const unsub = onSnapshot(doc(db, "drivers", VIEWDRIVERDETAILS.id), (doc) => {
//         setLatitude(doc.data().latitude)
//         setLongitude(doc.data().longitude)
//     });

//     return (
//         <View style={styles.container}>
//             <MapView style={styles.map}
//                 loadingEnabled={true}
//                 region={{
//                     longitude: 72.94938750388475,
//                     latitude: 19.198028039495775,
//                     latitudeDelta: 0.300,
//                     longitudeDelta: 0.300,
//                 }}
//             >
//                 <TouchableOpacity
//                     onPress={() => navigation.navigate('ViewDrivers')}>
//                     <Image
//                         source={require('../assets/back.png')}
//                         resizeMode="contain"
//                         style={{ width: 30, height: 30, padding: 25, marginLeft: 20, marginTop: 40 }}
//                     />
//                 </TouchableOpacity>



//                 {/* Driver Location */}
//                 <Marker
//                     coordinate={{
//                         latitude: 19.198028039495775,
//                         longitude: 72.94938750388475
//                     }}
//                     title={"Driver"}
//                     description={"Driver's Location"}
//                 >
//                     <Image
//                         source={car}
//                         style={{ height: 30, width: 30 }} />

//                 </Marker>

//                 {/* User Location */}
//                 {/* <Marker
//                     coordinate={{
//                         latitude: latitude,
//                         longitude: longitude
//                     }}
//                     title={"User"}
//                     description={"User's Location"}
//                 >
//                     <Image
//                         source={person}
//                         style={{ height: 30, width: 30 }} />

//                 </Marker> */}

//             </MapView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     map: {
//         width: Dimensions.get('window').width,
//         height: Dimensions.get('window').height,
//     },
// });

const UserTrackingScreen = () => {

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const { VIEWDRIVERDETAILS, SETVIEWDRIVERDETAILS, USER } = useContext(UserContext);

    const unsub = onSnapshot(doc(db, "drivers", VIEWDRIVERDETAILS.id), (doc) => {
        setLatitude(doc.data().latitude)
        setLongitude(doc.data().longitude)
    });


    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        >
            <View style={styles.container}>
                <MapView style={styles.map}
                    loadingEnabled={true}
                    region={{
                        longitude: 72.94938750388475,
                        latitude: 19.198028039495775,
                        latitudeDelta: 0.300,
                        longitudeDelta: 0.300,
                    }}
                >

                    <Marker
                        coordinate={{
                            latitude: latitude,
                            longitude: longitude
                        }}
                        title={"Driver"}
                        description={"Driver's Location"}
                    >
                        <Image
                            source={car}
                            style={{ height: 30, width: 30 }} />

                    </Marker>
                </MapView>
            </View>
        </View>
    )
}

export default UserTrackingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});