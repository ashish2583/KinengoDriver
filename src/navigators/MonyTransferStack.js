import React, { useEffect, useState } from  'react' ;
 import { createNativeStackNavigator} from '@react-navigation/native-stack'
import MonyTransfer from '../pages/MonyTransfer/MonyTransfer';
import TransectionDetail from '../pages/MonyTransfer/TransectionDetail';
import TransectionFilter from '../pages/MonyTransfer/TransectionFilter';
import TransectionHistory from '../pages/MonyTransfer/TransectionHistory';
const MonyTransferStack=(props)=>{
    
    const Stack = createNativeStackNavigator();


    return(
       
     
           <Stack.Navigator
            screenOptions={{ headerShown:false,}}
             >
            <Stack.Screen component = {MonyTransfer} name="MonyTransfer" />
            <Stack.Screen component = {TransectionDetail} name="TransectionDetail" />
            <Stack.Screen component = {TransectionFilter} name="TransectionFilter" />
            <Stack.Screen component = {TransectionHistory} name="TransectionHistory" />
          
        </Stack.Navigator>

)
}




export default MonyTransferStack