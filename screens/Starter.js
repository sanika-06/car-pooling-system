import { View, Text, Image, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Starter = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.view}>
            <Image
                source={require('../assets/carpooling.gif')}
                resizeMode="contain"
                style={{ width: 280, height: 350 }}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Carpooling App</Text>
            <Text style={{ fontSize: 17, marginTop: 10}}>Sharing Rides, Sharing Smiles</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40 }}>
                <TouchableOpacity onPress={() => navigation.push('Role')}>
                    <View style={styles.view3}>
                        <Text style={styles.login} >Login</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.push('Role2')}>
                    <View style={styles.view4}>
                        <Text style={styles.signup} >Sign Up</Text>
                    </View>
                </TouchableOpacity>

            </View>

        </View >
    )
}

export default Starter

const styles = StyleSheet.create({
    view: {
        display: 'flex',
        flex: 1,
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    view2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 90,
        width: 200,
        height: 50,
        borderRadius: 15,
        backgroundColor: "transparent",
        borderColor: 'red',
        borderWidth: 1,
    },
    view3: {
        borderColor: 'red',
        borderWidth: 2,
        width: 120,
        height: 50,
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginRight: 40
    },
    view4: {
        borderColor: 'red',
        borderWidth: 2,
        width: 120,
        height: 50,
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    text: {
        marginTop: 50,
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold'
    },
    divider: {
        backgroundColor: 'red',
        width: 1,
        height: 30,
    },
    signup: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    login: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold'
    },
    button: {
        padding: 10,
        color: 'white',
    },
    text2: {
        marginTop: 10,
        color: 'black',
        fontSize: 20,
        fontWeight: '800'
    },
});