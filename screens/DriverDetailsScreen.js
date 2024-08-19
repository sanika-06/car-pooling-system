import { View, Text, TextInput, Image, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../Contexts/UserContext';
import { addDoc, collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DriverDetailsScreen = () => {

    const { VIEWDRIVERDETAILS, USER } = useContext(UserContext);
    const [requested, setRequested] = useState(false)
    const [accepted, setAccepted] = useState(false)
    const [latitude, setLatitude] = useState(0)
    const [passengerID, setPassengerID] = useState(0)

    const navigation = useNavigation();

    const requestRide = async () => {

        const docRef = collection(db, "drivers", VIEWDRIVERDETAILS.id, "passengers");
        const docRef2 = doc(db, "users", USER.id);

        try {
            const doc = await addDoc(docRef, {
                passenger: USER.name,
                passengerPhone: USER.phone,
                requestStatus: false
            });

            await updateDoc(docRef2, {
                requestStatus: false,
            });

            alert('Requested Driver Successfully');
            setRequested(true)

        } catch (error) {
            console.log(error)
            alert('Unable to update');
        }

    };
    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const value = await AsyncStorage.getItem("PassengerID");
    //             if (value !== null) {
    //                 setPassengerID(value)
    //             } else {
    //                 console.log('No data found for the given key:', key);
    //             }
    //         } catch (error) {
    //             console.log('Error retrieving data:', error);
    //         }
    //     };
    //     getData();

    // }, [])

    // if (passengerID) {
    //     const unsub = onSnapshot(doc(db, "drivers", VIEWDRIVERDETAILS.id, "passengers", passengerID), (doc) => {
    //         setAccepted(doc.data().requestStatus)
    //         if (doc.data().requestStatus) {
    //             navigation.navigate('UserTrackingScreen')
    //         }
    //     });
    // }
        const unsub = onSnapshot(doc(db, "users", USER.id), (doc) => {
            setAccepted(doc.data().requestStatus)
            if (doc.data().requestStatus) {
                navigation.navigate('UserTrackingScreen')
            }
        });






    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            <SafeAreaView style={{ paddingRight: 20, paddingLeft: 20, paddingTop: 10, display: 'flex', flex: 1, paddingBottom: 160 }}>
                {/* Top Section */}
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 250 }}>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('ViewDrivers')}>
                        <Image
                            source={require('../assets/back.png')}
                            resizeMode="contain"
                            style={{ width: 30, height: 30, padding: 20 }}
                        />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 25 }}>Driver Details</Text>

                </View>
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 50, paddingBottom: 10, }}>

                    {VIEWDRIVERDETAILS.profileUrl ? (
                        <Image
                            source={{ uri: VIEWDRIVERDETAILS?.profileUrl }}
                            resizeMode="cover"
                            style={{ width: 100, height: 100, borderRadius: 100, }}
                        />
                    )
                        :
                        (<Image
                            source={require('../assets/user.png')}
                            resizeMode="cover"
                            style={{ width: 100, height: 100, borderRadius: 100, }}
                        />)
                    }

                    <Text style={{ fontSize: 30, marginTop: 20 }}>{VIEWDRIVERDETAILS.name}</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    {/* Location */}
                    <Image
                        source={require('../assets/pin.png')}
                        resizeMode="contain"
                        style={{ width: 20, height: 20, tintColor: 'gray', marginTop: 10, marginRight: 10 }}
                    />
                    <Text style={{ fontSize: 18, marginTop: 10, color: 'gray' }}>{VIEWDRIVERDETAILS.destination}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    {/* Total Rides */}
                    <Image
                        source={require('../assets/car2.png')}
                        resizeMode="contain"
                        style={{ width: 20, height: 20, tintColor: 'gray', marginTop: 10, marginRight: 10 }}
                    />
                    <Text style={{ fontSize: 18, marginTop: 10, color: 'gray' }}>{VIEWDRIVERDETAILS.totalRides}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    {/* Total departureTime */}
                    <Image
                        source={require('../assets/time.png')}
                        resizeMode="contain"
                        style={{ width: 20, height: 20, tintColor: 'gray', marginTop: 10, marginRight: 10 }}
                    />
                    <Text style={{ fontSize: 18, marginTop: 10, color: 'gray' }}>{VIEWDRIVERDETAILS.departureTime}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    {/* Total noOfSeats */}
                    <Image
                        source={require('../assets/seats.png')}
                        resizeMode="contain"
                        style={{ width: 20, height: 20, tintColor: 'gray', marginTop: 10, marginRight: 10 }}
                    />
                    <Text style={{ fontSize: 18, marginTop: 10, color: 'gray' }}>{VIEWDRIVERDETAILS.noOfSeats}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    {/* Total fare */}
                    <Image
                        source={require('../assets/rupee-indian.png')}
                        resizeMode="contain"
                        style={{ width: 20, height: 20, tintColor: 'gray', marginTop: 10, marginRight: 10 }}
                    />
                    <Text style={{ fontSize: 18, marginTop: 10, color: 'gray' }}>{VIEWDRIVERDETAILS.fare}</Text>
                </View>

                {/* Profile Options */}


                {requested == true ? (<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={{ marginTop: 20, width: "70%", }} >
                        <Image
                            source={require('../assets/waiting.gif')}
                            resizeMode="contain"
                            style={{ width: 250, height: 200 }}
                        />
                        <Text style={{ color: 'white', fontSize: 20, color: 'black', marginTop: 20 }}>Waiting for Confirmation..</Text>

                    </TouchableOpacity>
                </View>)
                    : (
                        (<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                            <TouchableOpacity style={{ marginTop: 20, width: "70%", }} onPress={requestRide}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', padding: 15, borderRadius: 20 }}>
                                    <Text style={{ color: 'white', fontSize: 20, color: 'white' }}>Request for Ride</Text>
                                </View>
                            </TouchableOpacity>
                        </View>)
                    )
                }



            </SafeAreaView>
        </ScrollView>
    )
}

export default DriverDetailsScreen