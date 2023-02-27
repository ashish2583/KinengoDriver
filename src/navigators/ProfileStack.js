import React, { useEffect, useState } from  'react' ;
 import { createNativeStackNavigator} from '@react-navigation/native-stack'
import Myprofile from '../pages/MyProfile/Myprofile';
import EditProfile from '../pages/MyProfile/EditProfile';
import RcDetails from '../pages/MyDocuments/RcDetails';
import RegistrationDetails from '../pages/MyDocuments/RegistrationDetails';
import DrivingLicenceDetails from '../pages/MyDocuments/DrivingLicenceDetails';



const ProfileStack=(props)=>{
   
    const Stack = createNativeStackNavigator();


    return(
       
     
           <Stack.Navigator
            screenOptions={{ headerShown:false,}}
             >
            <Stack.Screen component = {Myprofile} name="Myprofile" />
            <Stack.Screen component = {EditProfile} name="EditProfile" />
            <Stack.Screen component = {RcDetails} name="RcDetails" />
            <Stack.Screen component = {RegistrationDetails} name="RegistrationDetails" />
            <Stack.Screen component = {DrivingLicenceDetails} name="DrivingLicenceDetails" />
          
        </Stack.Navigator>

)
}




export default ProfileStack