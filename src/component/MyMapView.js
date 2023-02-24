import React, { useEffect, useState } from 'react';
import { View, Text,Image,StyleSheet, TouchableOpacity } from 'react-native'
import MapViewDirections from 'react-native-maps-directions';
import { GoogleApiKey } from '../WebApi/GoogleApiKey';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, AnimatedRegion, Animated } from 'react-native-maps';
import { Mycolors, dimensions } from '../utility/Mycolors';


const MyMapView = (props) => {
  const [my_color,setColor]=useState(Mycolors.ORANGE)
const mapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }],
    },
  ];

    useEffect(() => {
      

    },[])
  

    return (
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: props.latitude, 
            longitude: props.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={props.region}
          showsCompass={false}
          customMapStyle={mapStyle}
          showsUserLocation={true}
          userLocationCalloutEnabled={true}
          showsMyLocationButton={true}
          mapPadding={{ top: 0, right: 0, bottom:props.modlevisual ? props.modleHeight : 0, left: 0 }}
          showsScale={true}
          mapType={props.mapType}
          zoomEnabled={true}
          pitchEnabled={true}
          followsUserLocation={true}
          showsBuildings={true}
          showsIndoors={true}
          showsIndoorLevelPicker={true}
          onRegionChange={data=>props.onRegionChange ? props.onRegionChange(data) : null}
          rotateEnabled={true}
       
        >
      {props.markAPos ?
        <Marker
        coordinate={props.markAPos}
        // image={props.imageA ? props.imageA : null}
        >
         <Image
                source={props.imageA}
                style={{width: 26, height: 28,
                  }}
                resizeMode="contain"
               /> 
          </Marker>
       : 
       null
      }
     {props.markBPos ?
        <Marker
        coordinate={props.markBPos}
        // image={props.imageB ? props.imageB : null}
          >
                <Image
                source={props.imageB}
                style={{width: 26, height: 28,
                  }}
                resizeMode="contain"
               /> 
            </Marker>
       :
       null
      }
{props.mapDirectionOrigin ?
    <MapViewDirections
        origin={props.mapDirectionOrigin}
        destination={props.mapDirectionDest}
        apikey={GoogleApiKey}
         strokeWidth={4}
         strokeColor={my_color}
         optimizeWaypoints={true}
        //  onReady={res => { 
        //    // console.log('the ready responce is==>>',res) 
        //    console.log(`Duration: ${res.duration} min.`)
        //  }}
          // waypoints={[
          //   {"latitude": 25.47480787978605, "longitude": 82.77411449700594}, //start position
          // ]}
          // onReady={result => {
          //   console.log(`Distance: ${result} km`)
          //   setestimatedTime(result.duration)
          //   console.log(`Duration: ${result.duration} min.`)
          // }}
         precision="high"
         onError={(errorMessage) => {
          console.log('GOT AN ERROR',errorMessage);
         }}
       /> 
       :
       null
}
       </MapView>

    )
}

const styles = StyleSheet.create({

    mapStyle: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
 
    modalview: {
      width: dimensions.SCREEN_WIDTH,
      backgroundColor: Mycolors.BG_COLOR,
      position: 'absolute',
      bottom: 0,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      height: dimensions.SCREEN_HEIGHT * 42 / 100,
      padding: 20,
    },
  
  });
export default MyMapView
