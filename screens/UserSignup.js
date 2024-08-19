import React, { useContext, useState } from 'react';
import { Button, Image, ScrollView, Text, TextInput, View, TouchableOpacity, Pressable } from 'react-native';
import hide from "../assets/hide.png"
import viewButton from "../assets/view.png"
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../firebase"
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../Contexts/UserContext';

const UserSignup = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [view, setView] = useState(false);
  const navigation = useNavigation();
  const { USER, SETUSER } = useContext(UserContext);

  const signup = async () => {
    if (username && password && phone && name) {
      try {
        const usernameQuerySnapshot = await getDocs(query(collection(db, 'users'), where('username', '==', username)));
        if (!usernameQuerySnapshot.empty) {
          alert('Username already exists');
          return;
        }
        const phoneQuerySnapshot = await getDocs(query(collection(db, 'users'), where('phone', '==', phone)));
        if (!phoneQuerySnapshot.empty) {
          alert('Phone number already exists');
          return;
        }
        const nameQuerySnapshot = await getDocs(query(collection(db, 'users'), where('name', '==', name)));
        if (!nameQuerySnapshot.empty) {
          alert('Name already exists');
          return;
        }
  
        await addDoc(collection(db, 'users'), {
          username: username,
          password: password,
          phone: phone,
          name: name,
        });
        alert('Profile created successfully');
        navigation.navigate('UserLogin');
      } catch (error) {
        console.error('Error signing up:', error);
        alert('Something went wrong');
      }
    } else {
      alert('Please fill in all fields');
    }
  };
  
  

  return (
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>User SignUp</Text>

      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 }}>
          <TextInput
            style={{
              paddingLeft: 20, width: 250, height: 50, backgroundColor: '#e1e6ed', borderRadius: 10
            }}
            onChangeText={setUsername}
            value={username}
            placeholder={'Enter username'}
            autoCorrect={false}
            autoCapitalize='none'
          />
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 }}>
          <TextInput
            style={{
              paddingLeft: 20, width: 250, height: 50, backgroundColor: '#e1e6ed', borderRadius: 10
            }}
            onChangeText={setName}
            value={name}
            placeholder={'Enter name'}
            autoCorrect={false}
            autoCapitalize='none'
          />
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 }}>
          <TextInput
            style={{
              paddingLeft: 20, width: 250, height: 50, backgroundColor: '#e1e6ed', borderRadius: 10
            }}
            onChangeText={setPhone}
            value={phone}
            placeholder={'Enter phone'}
            autoCorrect={false}
            autoCapitalize='none'
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
        <TouchableOpacity style={{ marginTop: 30 }} onPress={signup}>
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
            }} >Signup</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>


  )
}

export default UserSignup