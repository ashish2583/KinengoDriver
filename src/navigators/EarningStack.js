import React, { useEffect, useState } from  'react' ;
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import Earning from '../pages/MyEarning/Earning';
import EarningDetails from '../pages/MyEarning/EarningDetails';
import EarningFilter from '../pages/MyEarning/EarningFilter';



const EarningStack=(props)=>{
   
    const Stack = createNativeStackNavigator();


    return(
       
           <Stack.Navigator
            screenOptions={{ headerShown:false,}}
             >
            <Stack.Screen component = {Earning} name="Earning" />
            <Stack.Screen component = {EarningDetails} name="EarningDetails" />
            <Stack.Screen component = {EarningFilter} name="EarningFilter" />
        </Stack.Navigator>

)
}




export default EarningStack