import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { collection, doc, getDoc, getDocs, increment, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { UserContext } from '../Contexts/UserContext';


const DriverPanel = () => {
    const [departureTime, setDepartureTime] = useState('');
    const [destination, setDestination] = useState('');
    const [fare, setFare] = useState(0);
    const [noOfSeats, setNoOfSeats] = useState(0);
    const [passenger, setPassenger] = useState('');
    const [passengerPhone, setPassengerPhone] = useState('');
    const [requested, setRequested] = useState(false);
    const [fetched, setFetched] = useState(false)
    const [fetch, setFetch] = useState(false)
    const [driverDetails, setDriverDetails] = useState([])
    const [passengersObj, setPassengersObj] = useState([])

    const { DRIVER, SETDRIVER, USER, SETUSER } = useContext(UserContext);


    const navigation = useNavigation();

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

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


    const handleSubmit = async () => {

        const docRef = doc(db, "drivers", DRIVER.id);

        try {
            await updateDoc(docRef, {
                departureTime: departureTime,
                destination: destination,
                fare: parseInt(fare),
                noOfSeats: parseInt(noOfSeats),

            });

            alert('Updated Preferences Successfully');
            setRequested(true)
        } catch (error) {
            alert('Unable to update');
        }

    };

    async function confirmPassenger(passenger) {
        const docRef = doc(db, "drivers", DRIVER.id, "passengers", passenger.id);
        const docRef2 = doc(db, "drivers", DRIVER.id);
        let userID = null;

        const userQuerySnapshot = await getDocs(query(collection(db, 'users'), where('phone', '==', passenger.phone)));
        if (!userQuerySnapshot.empty) {
            userQuerySnapshot.forEach((doc) => {
                userID = doc.id;
            });
        }
        if (userID !== null) {
            const docRef3 = doc(db, "users", userID);
            try {
                await updateDoc(docRef3, {
                    requestStatus: true,
                });
                await updateDoc(docRef, {
                    requestStatus: true,
                });
                await updateDoc(docRef2, {
                    noOfSeats: increment(-1),
                });
                alert('Confirmed Successfully');
            } catch (error) {
                alert('Unable to update');
            }
        }


    }


    // const unsub = onSnapshot(doc(db, "drivers", DRIVER.id), (doc) => {
    const unsub = onSnapshot(doc(db, "drivers", DRIVER.id), (doc) => {
        // setPassenger(doc.data().passenger)
        // setPassengerPhone(doc.data().passengerPhone)
        // setFetched(true)
        if (doc.data().destination) {
            setNoOfSeats(doc.data().noOfSeats)
            setDestination(doc.data().destination)
            setDepartureTime(doc.data().departureTime)
            setRequested(true)
        }
    });




    useEffect(() => {
        if (!fetch) {
            const fetchPassengers = async () => {
                const querySnapshot = await getDocs(collection(db, "drivers", DRIVER.id, "passengers"));
                const fetchedPassengers = [];

                querySnapshot.forEach((doc) => {
                    fetchedPassengers.push({ id: doc.id, name: doc.data().passenger, phone: doc.data().passengerPhone, requestStatus: doc.data().requestStatus });
                });
                console.log(fetchedPassengers)

                setPassengersObj(fetchedPassengers);
                setFetch(true);
            }
            fetchPassengers();
        }
    }, [fetch]);


    useEffect(() => {
        if (!fetch) {
            const fetchDriverDetails = async () => {
                try {
                    const docRef = doc(db, "drivers", DRIVER.id);
                    const docSnapshot = await getDoc(docRef);

                    if (docSnapshot.exists()) {
                        const data = docSnapshot.data();
                        const fetchedDriverDetails = [];
                        fetchedDriverDetails.push(data)
                        setDriverDetails(fetchedDriverDetails)
                    } else {
                        alert("Document not found!");
                    }
                } catch (error) {
                    alert("Error fetching document:", error);
                }
            };
            fetchDriverDetails();
        }
    }, [fetch]);




    return (

        <>

            {requested == false ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, marginBottom: 20, fontWeight: 'bold' }}>Enter Details about Trip</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300, paddingHorizontal: 10, marginBottom: 20 }}
                    onChangeText={setDestination}
                    value={destination}
                    placeholder="Enter Destination"
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300, paddingHorizontal: 10, marginBottom: 20 }}
                    onChangeText={setDepartureTime}
                    value={departureTime}
                    placeholder="Enter Departure Time (Ex. 10:30 PM)"
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300, paddingHorizontal: 10, marginBottom: 20 }}
                    onChangeText={setFare}
                    value={fare}
                    placeholder="Enter Fare"
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 300, paddingHorizontal: 10, marginBottom: 20 }}
                    onChangeText={setNoOfSeats}
                    value={noOfSeats}
                    placeholder="Enter No. of Seats"
                />

                <TouchableOpacity onPress={handleSubmit} style={{ marginTop: 20 }}>
                    <View style={{
                        backgroundColor: 'black',
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 5,
                    }}>
                        <Text style={{ color: 'white', fontSize: 16 }}>Submit</Text>
                    </View>
                </TouchableOpacity>
            </View>)
                : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, marginBottom: 20, fontWeight: 'bold' }}>Finding Passengers..</Text>
                        {
                            fetched && (
                                <View>
                                    q                                    <Text style={{ fontSize: 20, marginBottom: 20, fontWeight: 'normal' }}>Departure Time: {departureTime}</Text>
                                    <Text style={{ fontSize: 20, marginBottom: 20, fontWeight: 'normal' }}>Passenger Name: {passenger}</Text>
                                    <Text style={{ fontSize: 20, marginBottom: 20, fontWeight: 'normal' }}>Passenger Phone: {passengerPhone}</Text>
                                    <TouchableOpacity onPress={confirmPassenger} style={{ marginTop: 20 }}>
                                        <View style={{
                                            backgroundColor: 'black',
                                            paddingHorizontal: 20,
                                            paddingVertical: 10,
                                            borderRadius: 5,
                                            display: 'flex',
                                            alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <Text style={{ color: 'white', fontSize: 16 }}>Confirm</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }


                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'between', alignItems: 'center' }}>
                                <Text style={{ color: "black", fontSize: 24 }}>Available Seats</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 50 }}>
                                    <Image
                                        source={require('../assets/seats.png')}
                                        resizeMode="contain"
                                        style={{ width: 30, height: 30, marginRight: 5 }}
                                    />
                                    <Text style={{ color: "black", fontSize: 24 }}>{noOfSeats}</Text>
                                </View>

                            </View>

                            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                {passengersObj.map((passenger) => {
                                    return passenger.requestStatus === true ?
                                        (
                                            <TouchableOpacity key={passenger.id} style={{ marginTop: 20 }} >

                                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', backgroundColor: '#4ade80', borderRadius: 20, width: 340, height: 90, paddingLeft: 20 }}>
                                                    {passenger.profileUrl ? (
                                                        <Image
                                                            source={{ uri: passenger?.profileUrl }}
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
                                                    <View style={{}}>
                                                        <Text style={{ color: 'white', fontSize: 20, marginLeft: 10, marginRight: 10, color: 'black' }}>{passenger.name}</Text>
                                                        <Text>Tap to Confirm</Text>
                                                    </View>

                                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
                                                        <Image
                                                            source={require('../assets/phone.png')}
                                                            resizeMode="contain"
                                                            style={{ width: 20, height: 20, tintColor: 'gray', }}
                                                        />

                                                        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', marginRight: 10, color: 'black', padding: 10 }}>{passenger.phone}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>

                                        ) : (
                                            <TouchableOpacity key={passenger.id} style={{ marginTop: 20 }} onPress={() => confirmPassenger(passenger)}>

                                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', backgroundColor: 'white', borderRadius: 20, width: 340, height: 90, paddingLeft: 20 }}>
                                                    {passenger.profileUrl ? (
                                                        <Image
                                                            source={{ uri: passenger?.profileUrl }}
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
                                                    <View style={{}}>
                                                        <Text style={{ color: 'white', fontSize: 20, marginLeft: 10, marginRight: 10, color: 'black' }}>{passenger.name}</Text>
                                                        <Text>Tap to Confirm</Text>
                                                    </View>

                                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}>
                                                        <Image
                                                            source={require('../assets/phone.png')}
                                                            resizeMode="contain"
                                                            style={{ width: 20, height: 20, tintColor: 'gray', }}
                                                        />

                                                        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', marginRight: 10, color: 'black', backgroundColor: 'white', padding: 10 }}>{passenger.phone}</Text>
                                                    </View>


                                                </View>


                                            </TouchableOpacity>

                                        )
                                })}

                            </View>

                            <TouchableOpacity onPress={() => navigation.navigate('DriverTrackingScreen')} style={{ marginTop: 20 }}>
                                <View style={{
                                    backgroundColor: 'black',
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderRadius: 5,
                                }}>
                                    <Text style={{ color: 'white', fontSize: 16 }}>Stop Waiting for others. Proceed to MapScreen</Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                    </View>
                )}


        </>

    );
};

export default DriverPanel;
