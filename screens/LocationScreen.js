import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

function LocationScreen() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
        // text = location;
    }

    return (
        <View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {location && (
                <View>
                    <Text>Latitude: {location.coords["latitude"]}</Text>
                    <Text>Longitude: {location.coords["longitude"]}</Text>
                </View>
            )}
            <Text>{text}</Text>
        </View>
    );
}

export default LocationScreen
