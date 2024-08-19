import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState, useContext } from 'react';
import { Button, Image, ScrollView, Text, TextInput, View, TouchableOpacity, Pressable } from 'react-native';
import hide from "../assets/hide.png"
import viewButton from "../assets/view.png"
import { UserContext } from '../Contexts/UserContext';
import { db } from '../firebase';


const UserLogin = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [view, setView] = useState(false);

    const navigation = useNavigation();
    const { DRIVER, SETDRIVER, USER, SETUSER } = useContext(UserContext);

    const UserLogin = (e) => {
        if (username && password) {
            const verifyUser = async () => {
                const q = query(collection(db, "users"), where("username", "==", username), where("password", "==", password));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {

                    SETUSER({
                        id: doc.id,
                        name: doc.data().name,
                        username: doc.data().username,
                        password: doc.data().password,
                        phone: doc.data().phone
                    })
                    navigation.push('UserPanel')
                });
            }
            verifyUser()

        }
        else if (!username && password) {
            alert("Please enter username")
        }
        else if (username && !password) {
            alert("Please enter password")
        }
        else {
            alert("Missing details")
        }

    }





    return (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text style={{ fontSize: 20, marginBottom: 20, fontWeight: 'bold' }}>Rider Login</Text>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 }}>
                    <TextInput

                        style={{
                            paddingLeft: 20, width: 250, height: 50, backgroundColor: '#e1e6ed', borderRadius: 10
                        }}
                        onChangeText={setUsername}
                        value={username}
                        placeholder='Enter username'
                        autoCorrect={false}
                        autoCapitalize='none'
                        placeholderTextColor="#000"


                    />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                    <TextInput
                        secureTextEntry={view ? false : true}
                        style={{
                            paddingLeft: 20, width: 250, height: 50, backgroundColor: '#e1e6ed', borderRadius: 10, borderColor: '#d8dce3', borderWidth: 1
                        }}
                        onChangeText={setPassword}
                        value={password}
                        placeholder={'Password'}
                        autoCorrect={false}
                        autoCapitalize='none'
                        placeholderTextColor="#000"

                    />
                    <TouchableOpacity style={{ position: 'absolute', zIndex: 10, marginLeft: 220 }} onPress={() => { view ? setView(false) : setView(true) }}>
                        {view ?
                            <Image
                                source={viewButton}
                                resizeMode="contain"
                                style={{ width: 20, height: 20 }}
                            />
                            :
                            <Image
                                source={hide}
                                resizeMode="contain"
                                style={{ width: 20, height: 20 }}
                            />
                        }
                    </TouchableOpacity>
                </View>
                <Pressable style={{ marginLeft: 120, marginTop: 10 }}>
                    <Text style={{ color: 'gray', fontSize: 14 }}>Forgot Password?</Text>
                </Pressable>
                <TouchableOpacity onPress={UserLogin} style={{ marginTop: 30 }}>
                    <View style={{
                        borderColor: 'black',
                        borderWidth: 2,
                        width: 200,
                        height: 50,
                        borderRadius: 15,
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        backgroundColor: 'black'
                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 15,
                            fontWeight: 'bold'
                        }} >Login</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>


    )
}

export default UserLogin