import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import pin from "../assets/pin.png"
import bus from "../assets/bus.png"
// import MapViewDirections from 'react-native-maps-directions';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';

export default function LiveLocation() {

    const [latitude, setLatitude] = useState(0)
    const [latitude2, setLatitude2] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [longitude2, setLongitude2] = useState(0)


    const unsub = onSnapshot(doc(db, "driver", "3YPIokI5C6mD6yu9utE6"), (doc) => {
        setLatitude(doc.data().latitude)
        setLongitude(doc.data().longitude)
    });
    const unsub2 = onSnapshot(doc(db, "driver", "eq2Cu2SBAUXMkSy29MV6"), (doc) => {
        setLatitude2(doc.data().latitude)
        setLongitude2(doc.data().longitude)
    });

    return (
        <View style={styles.container}>

            <MapView style={styles.map}
                loadingEnabled={true}
                region={{
                    longitude: longitude,
                    latitude: latitude,
                    latitudeDelta: 0.300,
                    longitudeDelta: 0.300,
                }}

            >
                {/* Driver Location */}
                <Marker
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude
                    }}
                    title={"Worli Village-Dadar"}
                >
                    <Image
                        source={bus}
                        style={{ height: 30, width: 30 }} />

                </Marker>
                <Marker
                    coordinate={{
                        latitude: latitude2,
                        longitude: longitude2
                    }}
                    title={"Sangam Nagar-Wadala Station"}
                >
                    <Image
                        source={bus}
                        style={{ height: 30, width: 30 }} />

                </Marker>

            </MapView>
        </View>
    );
}

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