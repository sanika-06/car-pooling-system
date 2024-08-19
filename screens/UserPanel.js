import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import search from '../assets/search.png'
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import * as Location from 'expo-location';
import { UserContext } from '../Contexts/UserContext';


const UserPanel = () => {
    const [source, setSource] = useState('')
    const [destination, setDestination] = useState('')
    const [busNumber, setBusNumber] = useState('')
    const [destinations, setDestinations] = useState([])
    const [busNumberOption, setBusNumberOption] = useState(false)
    const navigation = useNavigation();
    const [fetch, setFetch] = useState(false)
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [city, setCity] = useState('');
    const { USER, DESTINATION ,SETDESTINATION } = useContext(UserContext);

    const [selectedDestination, setSelectedDestination] = useState('');

    const handleDestinationChange = (destination) => {
        setSelectedDestination(destination);
    };

    useEffect(() => {
        if (!fetch) {
            const fetchDestinations = async () => {
                const querySnapshot = await getDocs(collection(db, "drivers"));
                const fetchedDestinations = [];


                querySnapshot.forEach((doc) => {
                    fetchedDestinations.push({ id: doc.id, destination: doc.data().destination, departureTime: doc.data().departureTime, driverName: doc.data().driverName });
                });

                setDestinations(fetchedDestinations);
                setFetch(true);
            }

            fetchDestinations();
        }
    }, [fetch]);

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

    useEffect(() => {
        if (location) {
            fetchCityName();
        }
    }, [location]);

    const fetchCityName = async () => {
        try {
            const { coords } = location;
            const { latitude, longitude } = coords;
            const response = await Location.reverseGeocodeAsync({ latitude, longitude });
            if (response && response.length > 0) {
                const { city } = response[0];
                setCity(city);
            }
        } catch (error) {
            console.error('Error fetching city name: ', error);
        }
    };

    function searchDriver(){
        SETDESTINATION({
            destination: selectedDestination,
            source: city,
            username: USER.username, 
            name: USER.name, 
        })

        navigation.navigate('ViewDrivers')
    }

    return (
        <View style={{ display: 'flex', flex: 1, justifyContent: 'center', marginRight: 50, marginLeft: 50 }}>
       
            {errorMsg ? <Text>{errorMsg}</Text> : (
                <Text style={{ fontSize: 24, fontWeight: '600', color: 'green' , marginBottom: 20}} >{city ? `Source: ${city}` : 'Loading...'}</Text>
            )}
            <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 17 }}>Select Destination</Text>
            <Picker
                selectedValue={selectedDestination}
                style={{ height: 50, width: 200 }}
                onValueChange={(itemValue) => handleDestinationChange(itemValue)}
            >
                <Picker.Item label="Select One" value="" style={{ fontSize: 15 }} />
                {destinations.map((destination) => (
                    <Picker.Item key={destination.id} label={destination.destination} value={destination.destination} style={{ fontSize: 15 }} />
                ))}
            </Picker>

            <TouchableOpacity onPress={searchDriver} style={{ marginTop: 45, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10, padding: 3, backgroundColor: 'black', width: 250, height: 50 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Search Drivers</Text>
            </TouchableOpacity>





        </View >
    )
}

export default UserPanel