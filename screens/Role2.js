import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import driver from "../assets/driver.png"
import user from "../assets/traveller.png"
import { useNavigation } from '@react-navigation/native'

const Role2 = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>

            <View style={{ display: 'flex', flexDirection: 'row', }}>
                <TouchableOpacity onPress={() => navigation.push('DriverSignup')}>
                    <View style={{ display: 'flex', flexDirection: 'column', borderColor: '#ef2e46', borderWidth: 2, padding: 20, borderRadius: 20, marginRight: 20 }}>
                        <Image
                            source={driver}
                            resizeMode="contain"
                            style={{ width: 120, height: 120 }}
                        />
                        <Text style={{ marginLeft: 35, fontSize: 20, marginTop: 10 }}>Driver</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.push('UserSignup')}>
                    <View style={{ display: 'flex', flexDirection: 'column', borderColor: '#ef2e46', borderWidth: 2, padding: 20, borderRadius: 20 }}>
                        <Image
                            source={user}
                            resizeMode="contain"
                            style={{ width: 120, height: 120 }}
                        />
                        <Text style={{ marginLeft: 40, fontSize: 20, marginTop: 10 }}>User</Text>
                    </View>
                </TouchableOpacity>

            </View>
            <View>
                <Text style={{ fontSize: 20, marginTop: 36, fontWeight: 'bold' }}>What is your Role?</Text>
            </View>

        </View>
    )
}

export default Role2