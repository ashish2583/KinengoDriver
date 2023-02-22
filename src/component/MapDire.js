import React, { useEffect, useState } from 'react';
import { View, Text,Image, TouchableOpacity } from 'react-native'
import { Mycolors } from '../utility/Mycolors'
import MapViewDirections from 'react-native-maps-directions';
import { GoogleApiKey } from '../WebApi/GoogleApiKey';
const MapDire = (props) => {

const [my_color,setColor]=useState(Mycolors.ORANGE)

    useEffect(() => {
        console.log('Dest',props.destination)
        console.log('origin',props.origin)
       
    },[])
  

    return (
        <MapViewDirections
        origin={props.origin}
        //origin={mapdata.startPosition} props.route.params.number
        //origin={mapdata.startPosition}
        destination={props.destination}
        apikey={GoogleApiKey}
         strokeWidth={4}
         strokeColor={props.routcolor}
         optimizeWaypoints={true}
         onReady={data=>props.onReady ? props.onReady(data) : null}
        //  onReady={res => { 
        //    // console.log('the ready responce is==>>',res) 
        //    console.log(`Duration: ${res.duration} min.`)
        //  }}
         precision="high"
         // onStart={(params) => {
         //   console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
         // }}
         // onReady={result => {
         //   console.log(`Distance: ${result} km`)
         //   console.log(`Duration: ${result.duration} min.`)
         // }}
         onError={(errorMessage) => {
          console.log('GOT AN ERROR',errorMessage);
         //  setTimeout(()=>{
         //   getresetStacks('Home2')
         //   console.log('HIHIIIIIIHIHI');
         //  },10000)
         }}
       /> 

    )
}

export default MapDire
