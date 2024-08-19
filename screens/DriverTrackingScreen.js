import React, { useState, useEffect, useContext } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import * as Location from 'expo-location';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import MapView, { Marker } from 'react-native-maps';
import pin from "../assets/pin.png"
import car from "../assets/car.png"
import { UserContext } from '../Contexts/UserContext';

function DriverTrackingScreen() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const { DRIVER, SETDRIVER, USER, SETUSER } = useContext(UserContext);

    async function getLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 });
        setLocation(location);

        const driverRef = doc(db, "drivers", DRIVER.id);

        await updateDoc(driverRef, {
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude
        });

    }

    setTimeout(() => {
        getLocation();
    }, 4);



    return (
        <>

            {location && (
                <View style={styles.container}>

                    <MapView style={styles.map}
                        loadingEnabled={true}
                        region={{
                            latitude: location?.coords?.latitude,
                            longitude: location?.coords?.longitude,
                            latitudeDelta: 0.300,
                            longitudeDelta: 0.300,
                        }}

                    >
                        {/* Driver Location */}
                        <Marker
                            coordinate={{
                                latitude: location?.coords?.latitude,
                                longitude: location?.coords?.longitude
                            }}
                            title={"Your Location"}
                        >
                            <Image
                                source={car}
                                style={{ height: 30, width: 30 }} />

                        </Marker>


                    </MapView>
                </View>

            )}
        </>

    );
}

export default DriverTrackingScreen
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