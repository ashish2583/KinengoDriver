import React, { useEffect, useState } from  'react' ;
 import { createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from "../pages/Home/Home";
import Home2 from '../pages/Home/Home2'
import Home3 from '../pages/Home/Home3'
import Chat from '../pages/Messaging/Chat';
import PrivicyPolicy from '../pages/TermCondition/PrivicyPolicy';
import TermCondition from '../pages/TermCondition/TermCondition';
const HomeStack=(props)=>{
   
    const Stack = createNativeStackNavigator();


    return(
       
     
           <Stack.Navigator
            screenOptions={{ headerShown:false,}}
             >
            <Stack.Screen component = {Home} name="Home" />
            <Stack.Screen component = {Home2} name="Home2" options={{gestureEnabled: false}} />
            <Stack.Screen component = {Home3} name="Home3" />
            <Stack.Screen component = {Chat} name="Chat" />
            <Stack.Screen component = {PrivicyPolicy} name="PrivicyPolicy" />
            <Stack.Screen component = {TermCondition} name="TermCondition" />
 
          
        </Stack.Navigator>

)
}




export default HomeStack