import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import * as Location from 'expo-location';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import MapView, { Marker } from 'react-native-maps';
import pin from "../assets/pin.png"
import bus from "../assets/bus.png"


export default function App() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 });

            setLocation(location.coords);
        })();
    }, []);

    let text = 'Location not turned on..';
    // if (errorMsg) {
    //     text = errorMsg;
    // } else if (location) {
    //     text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
    // }

    let lat = 19.1397888
    let long = 19.1497888

    return (
        location ?

            (<MapView style={styles.container}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                {/* <Marker coordinate={location.coords} /> */}
                <Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }}
                    title="Worli Village-Dadar"
                >
                    <Image
                        source={bus}
                        style={{ height: 30, width: 30 }} />

                </Marker>
            </MapView>
            )
            :
            <View style={styles.container}>
                <Text style={styles.paragraph}>{text}</Text>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        padding: 10
    },
    map: {
        width: '100%',
        height: '100%',
    },
});