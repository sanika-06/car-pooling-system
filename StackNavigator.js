import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useMemo } from "react";
import Role from './screens/Role';
import Role2 from './screens/Role2';
import Signup from './screens/Signup';
import Starter from './screens/Starter';
import DriverLogin from './screens/DriverLogin';
import UserLogin from './screens/UserLogin';
import DriverPanel from './screens/DriverPanel';
import { UserContext } from "./Contexts/UserContext.js"
import UserPanel from './screens/UserPanel';
import LiveLocation from './screens/LiveLocation';
import ViewDrivers from './screens/ViewDrivers.js';
import DriverDetailsScreen from './screens/DriverDetailsScreen.js';
import UserTrackingScreen from './screens/UserTrackingScreen.js';
import DriverTrackingScreen from './screens/DriverTrackingScreen.js';
import DriverSignup from './screens/DriverSignup.js';
import UserSignup from './screens/UserSignup.js';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const [DRIVER, SETDRIVER] = useState(false)
    const [USER, SETUSER] = useState(false)
    const [DESTINATION, SETDESTINATION] = useState()
    const [VIEWDRIVERDETAILS, SETVIEWDRIVERDETAILS] = useState()

    const providerValue = useMemo(() => ({ DRIVER, SETDRIVER, USER, SETUSER, DESTINATION, SETDESTINATION, VIEWDRIVERDETAILS, SETVIEWDRIVERDETAILS }))

    return (
        <UserContext.Provider value={providerValue}>
            <Stack.Navigator initialRouteName='Starter'>
                {USER && (
                    <>
                        <Stack.Screen name="UserPanel" component={UserPanel} options={{ headerShown: false }} />
                        <Stack.Screen name="LiveLocation" component={LiveLocation} options={{ headerShown: false }} />
                        <Stack.Screen name="ViewDrivers" component={ViewDrivers} options={{ headerShown: false }} />
                        <Stack.Screen name="DriverDetailsScreen" component={DriverDetailsScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="UserTrackingScreen" component={UserTrackingScreen} options={{ headerShown: false }} />
                    </>
                )
                }
                {DRIVER && (
                    <>
                        <Stack.Screen name="DriverPanel" component={DriverPanel} options={{ headerShown: false }} />
                        <Stack.Screen name="DriverTrackingScreen" component={DriverTrackingScreen} options={{ headerShown: false }} />
                    </>
                )
                }
                {!USER && !DRIVER && (
                    <>
                        <Stack.Screen name="Starter" component={Starter} options={{ headerShown: false }} />
                        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                        <Stack.Screen name="Role" component={Role} options={{ headerShown: false }} />
                        <Stack.Screen name="Role2" component={Role2} options={{ headerShown: false }} />
                        <Stack.Screen name="DriverSignup" component={DriverSignup} options={{ headerShown: false }} />
                        <Stack.Screen name="UserSignup" component={UserSignup} options={{ headerShown: false }} />
                        <Stack.Screen name="DriverLogin" component={DriverLogin} options={{ headerShown: false }} />
                        <Stack.Screen name="UserLogin" component={UserLogin} options={{ headerShown: false }} />
                    </>
                )
                }
            </Stack.Navigator>
        </UserContext.Provider>
    )
}

export default StackNavigator;
