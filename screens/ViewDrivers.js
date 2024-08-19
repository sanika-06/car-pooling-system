import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { UserContext } from '../Contexts/UserContext';


const ViewDrivers = () => {

    const [drivers, setDrivers] = useState([])
    const { VIEWDRIVERDETAILS, SETVIEWDRIVERDETAILS, DESTINATION, SETDESTINATION } = useContext(UserContext);
    const navigation = useNavigation();
    const [fetch, setFetch] = useState(false)


    useEffect(() => {
        if (!fetch) {
            const fetchDrivers = async () => {
                const querySnapshot = await getDocs(collection(db, "drivers"));
                const fetchedDrivers = [];

                querySnapshot.forEach((doc) => {
                    fetchedDrivers.push({ id: doc.id, name: doc.data().name, totalRides: doc.data().totalRides, username: doc.data().username, profileUrl: doc.data().profileUrl, destination: doc.data().destination, departureTime: doc.data().departureTime, driverName: doc.data().driverName, fare: doc.data().fare, noOfSeats: doc.data().noOfSeats, departureTime: doc.data().departureTime });
                });

                setDrivers(fetchedDrivers);
                setFetch(true);
            }
            fetchDrivers();
        }
    }, [fetch]);


    function selectDriver(driver) {
        SETVIEWDRIVERDETAILS({
            id: driver.id,
            name: driver.name,
            username: driver.username,
            password: driver.password,
            latitude: driver.latitude,
            longitude: driver.longitude,
            destination: driver.destination,
            profileUrl: driver.profileUrl,
            totalRides: driver.totalRides,
            departureTime: driver.departureTime,
            noOfSeats: driver.noOfSeats,
            fare: driver.fare,
        })
        navigation.push('DriverDetailsScreen')
    }

    return (
        <>
            <TouchableOpacity
                onPress={() => navigation.navigate('UserPanel')}>
                <Image
                    source={require('../assets/back.png')}
                    resizeMode="contain"
                    style={{ width: 30, height: 30, padding: 20, marginLeft: 20, marginTop: 50 }}
                />
            </TouchableOpacity>
            <ScrollView style={{ display: 'flex',   }}>

                <View style={{ marginTop: 30,  }}>
                    <Text style={{ color: "black", fontSize: 24, textAlign: 'center', fontWeight: 'bold' }}>Available Drivers</Text>

                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                        {drivers.map((driver) => (
                            <TouchableOpacity key={driver.id} style={{ marginTop: 20 }} onPress={() => selectDriver(driver)}>

                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', backgroundColor: 'white', borderRadius: 20, width: 340, height: 90, paddingLeft: 20 }}>
                                    {driver.profileUrl ? (
                                        <Image
                                            source={{ uri: driver?.profileUrl }}
                                            resizeMode="cover"
                                            style={{ width: 60, height: 60, borderRadius: 40 }}
                                        />
                                    )
                                        :
                                        (<Image
                                            source={require('../assets/user.png')}
                                            resizeMode="cover"
                                            style={{ width: 60, height: 60, borderRadius: 40 }}
                                        />)
                                    }

                                    <Text style={{ color: 'white', fontSize: 20, marginLeft: 10, marginRight: 10, color: 'black' }}>{driver.name}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 20}}>
                                        <Image
                                            source={require('../assets/pin.png')}
                                            resizeMode="contain"
                                            style={{ width: 20, height: 20, tintColor: 'gray',  }}
                                        />

                                        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold',   color: 'black', backgroundColor: 'white',  }}>{driver.destination}</Text>
                                    </View>

                                </View>

                            </TouchableOpacity>

                        ))}



                        {/* <TouchableOpacity style={{ marginTop: 20 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 20, borderRadius: 20 }}>
                            <Image
                                source={require('../assets/driver2.jpeg')}
                                resizeMode="cover"
                                style={{ width: 60, height: 60, borderRadius: 40 }}
                            />
                            <Text style={{ color: 'white', fontSize: 20, marginLeft: 10, marginRight: 10, color: 'black' }}>Digvijay Patel</Text>

                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 20 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 20, borderRadius: 20 }}>
                            <Image
                                source={require('../assets/driver3.jpeg')}
                                resizeMode="cover"
                                style={{ width: 60, height: 60, borderRadius: 40 }}
                            />
                            <Text style={{ color: 'white', fontSize: 20, marginLeft: 10, marginRight: 10, color: 'black' }}>Sanjay Sharma</Text>

                        </View>

                    </TouchableOpacity> */}
                    </View>
                </View>
            </ScrollView >
        </>

    )
}

export default ViewDrivers