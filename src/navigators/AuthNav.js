import React, { useEffect, useState } from  'react' ;
 import { createNativeStackNavigator} from '@react-navigation/native-stack'
import Welcome from "../pages/Auth/Welcome";
import Login from "../pages/Auth/Login";
import Otp from "../pages/Auth/Otp";
import SignUp from '../pages/Auth/SignUp';
import ForgotPassword from '../pages/Auth/ForgotPassword'
import PersonalDetail from '../pages/Auth/PersonalDetail';
import VehicleDetail from '../pages/Auth/VehicleDetail';
import Success from '../pages/Auth/Success';
import ResetPassword from '../pages/Auth/ResetPassword';

const AuthNav=(props)=>{
   
    const Stack = createNativeStackNavigator();


    return(
       
     
           <Stack.Navigator
            screenOptions={{ headerShown:false,}}
             >
            <Stack.Screen component = {Welcome} name="Welcome" />
            <Stack.Screen component = {Login}  name="Login" />
            <Stack.Screen component = {Otp}  name="Otp" />
            <Stack.Screen component={SignUp} name={'SignUp'}/>
            <Stack.Screen component={ForgotPassword} name={'ForgotPassword'}/>
            <Stack.Screen component={PersonalDetail} name={'PersonalDetail'}/>
            <Stack.Screen component={VehicleDetail} name={'VehicleDetail'}/>
            <Stack.Screen component={Success} name={'Success'}/>
            <Stack.Screen component={ResetPassword} name={'ResetPassword'}/>

        </Stack.Navigator>

)
}




export default AuthNav