import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import pin from "../assets/pin.png"
import bus from "../assets/bus.png"
// import MapViewDirections from 'react-native-maps-directions';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';

export default function App() {

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)


  const unsub = onSnapshot(doc(db, "driver", "3YPIokI5C6mD6yu9utE6"), (doc) => {
    setLatitude(doc.data().latitude)
    setLongitude(doc.data().longitude)
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


        {/* 
        <MapViewDirections

          origin={{
            longitude: 72.87091250543872,
            latitude: 19.02161745
          }}
          destination={{
            latitude: 19.016905216928386,
            longitude: 72.85891759428597
          }}

        /> */}
        {/* 
        <MapView.Marker
          coordinate={{
            longitude: 72.87091250543872,
            latitude: 19.02161745
          }}
          title={"Vidyalankar Polytechnic"}
          description={"Current Location"}
        >

          <Image
            source={pin}
            style={{ height: 30, width: 30 }} />


        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: 19.02152041274678,
            longitude: 72.86940177300747
          }}
          title={"Stop 1"}
          description={"Description 1"}
        >
          <Image
            source={pin}
            style={{ height: 30, width: 30 }} />

        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: 19.02181904276303,
            longitude: 72.86617329682444
          }}
          title={"Stop 2"}
          description={"Barkat Ali Darga"}
        >
          <Image
            source={pin}
            style={{ height: 30, width: 30 }} />

        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: 19.02181904276303,
            longitude: 72.86617329682444
          }}
          title={"Stop 3"}
          description={"Barkat Ali Naka"}
        >
          <Image
            source={pin}
            style={{ height: 30, width: 30 }} />

        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: 19.017349428205318,
            longitude: 72.86498178511765
          }}
          title={"Stop 4"}
          description={"Barkat Ali June"}
        >
          <Image
            source={pin}
            style={{ height: 30, width: 30 }} />

        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: 19.018552338564348,
            longitude: 72.86251737981269
          }}
          title={"Stop 5"}
          description={"Wadala Bridge"}
        >
          <Image
            source={pin}
            style={{ height: 30, width: 30 }} />

        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: 19.019353580599443,
            longitude: 72.85674130461476
          }}
          title={"Stop 6"}
          description={"Wadala Church"}
        >
          <Image
            source={pin}
            style={{ height: 30, width: 30 }} />

        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: 19.016905216928386,
            longitude: 72.85891759428597
          }}
          title={"Stop 7"}
          description={"Wadala Station"}
        >
          <Image
            source={pin}
            style={{ height: 30, width: 30 }} />

        </MapView.Marker> 

        */}

        {/* Vidyalankar to Dadar */}
        <MapView.Marker
          coordinate={{
            latitude: 19.02155218539231,
            longitude: 72.86941461460303
          }}
          title={"Stop 1"}
          description={"Sangam Nagar"}
        >
          <Image
            source={pin}
            style={{ height: 30, width: 30 }} />

        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: 19.02182253483895,
            longitude: 72.86617565053419
          }}
          title={"Stop 2"}
          description={"Indian Hume Pipe Company"}
        >
          <Image
            source={pin}
            style={{ height: 30, width: 30 }} />

        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: 19.02016712436521,
            longitude: 72.8656373423605
          }}
          title={"Stop 3"}
          description={"Barkat Ali Dargah"}
        >
          <Image
            source={pin}
            style={{ height: 30, width: 30 }} />

        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: 19.02016712436521,
            longitude: 72.8656373423605
          }}
          title={"Stop 4"}
          description={"Barkat Ali Dargah"}
        >
          <Image
            source={pin}
            style={{ height: 30, width: 30 }} />

        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: 19.017693613925005,
            longitude: 72.86413428877543
          }}
          title={"Stop 5"}
          description={"B.P.T Colony"}
        >
          <Image
            source={pin}
            style={{ height: 30, width: 30 }} />

        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: 19.018529322445588,
            longitude: 72.86252896530365
          }}
          title={"Stop 6"}
          description={"Wadala Bridge"}
        >
          <Image
            source={pin}
            style={{ height: 30, width: 30 }} />

        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: 19.018529322445588,
            longitude: 72.86252896530365
          }}
          title={"Stop 7"}
          description={"Wadala Bridge 2"}
        >
          <Image
            source={pin}
            style={{ height: 30, width: 30 }} />

        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: 19.01865255816091,
            longitude: 72.86046573530417
          }}
          title={"Stop 8"}
          description={"Wadala Bridge"}
        >
          <Image
            source={pin}
            style={{ height: 30, width: 30 }} />

        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: 19.019295629286674,
            longitude: 72.85674819064752
          }}
          title={"Stop 9"}
          description={"Wadala Church"}
        >
          <Image
            source={pin}
            style={{ height: 30, width: 30 }} />

        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude
          }}
          title={"Driver"}
          description={"Driver's Location"}
        >
          <Image
            source={bus}
            style={{ height: 30, width: 30 }} />

        </MapView.Marker>

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