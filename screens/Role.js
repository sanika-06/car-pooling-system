import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import driver from "../assets/driver.png"
import user from "../assets/traveller.png"
import { useNavigation } from '@react-navigation/native'

const Role = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <View>
                <Text style={{ fontSize: 32, marginBottom: 36, fontWeight: 'bold' }}>What is your Role?</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', }}>
                <TouchableOpacity onPress={() => navigation.push('DriverLogin')} style={{ marginBottom: 20 }}>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderColor: '#ef2e46', borderWidth: 2, padding: 20, borderRadius: 20 }}>
                        <Image
                            source={driver}
                            resizeMode="contain"
                            style={{ width: 100, height: 120 }}
                        />
                        <Text style={{ fontSize: 20, marginTop: 10 }}>Looking for Passenger</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.push('UserLogin')}>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderColor: '#ef2e46', borderWidth: 2, padding: 20, borderRadius: 20 }}>
                        <Image
                            source={user}
                            resizeMode="contain"
                            style={{ width: 100, height: 120 }}
                        />
                        <Text style={{ fontSize: 20, marginTop: 10 }}>Looking for a Ride</Text>
                    </View>
                </TouchableOpacity>

            </View>


        </View>
    )
}

export default Role