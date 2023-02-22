import React, { useEffect, useState ,useRef} from 'react';
import HomeHeader from '../../component/HomeHeader';
import SerchInput from '../../component/SerchInput';
import LinearGradient from 'react-native-linear-gradient'
import MyButtons from '../../component/MyButtons';
import Toggle from "react-native-toggle-element";
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, TouchableOpacity, Platform, Alert, PermissionsAndroid, ScrollView ,Keyboard} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, AnimatedRegion, Animated } from 'react-native-maps';
import { Mycolors, dimensions } from '../../utility/Mycolors';
import Geolocation from "react-native-geolocation-service";
import Geocoder from "react-native-geocoding";
import MapViewDirections from 'react-native-maps-directions';
import { GoogleApiKey } from '../../WebApi/GoogleApiKey';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {  useSelector, useDispatch } from 'react-redux';
import {setCurentPosition,setBidAmount,setNotificationData,setStartAddress,setDestnationAddress,setStartPosition,setDestnationPosition} from '../../redux/actions/latLongAction';
import { Rating, AirbnbRating } from 'react-native-ratings';
// import MyNetinfo from '../../component/MyNetinfo'
import {baseUrl,driver_accept_ride_request,driver_update_driver_location,driver_current_status,driver_fuel_cost,booking_bid_price,requestGetApi,requestPostApi} from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';
// import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapDire from '../../component/MapDire';
import MyMapView from '../../component/MyMapView'
import MyAlert from '../../component/MyAlert'
import messaging from '@react-native-firebase/messaging';

Geolocation.setRNConfiguration(GoogleApiKey); 
Geocoder.init(GoogleApiKey);
const Home = (props) => {
 
const [homeList,setHomeList]=useState([{id:'1',bgImage:require('../../assets/homeImg.png'),text:'We Repair All Makes & Models of Air Conditioners',title:'Add Service'},{id:'2',bgImage:require('../../assets/homeImg.png'),text:'We Repair All Makes & Models of Air Conditioners',title:'Add Service'},{id:'3',bgImage:require('../../assets/homeImg.png'),text:'We Repair All Makes & Models of Air Conditioners',title:'Add Service'}])
const [searchValue,setsearchValue]=useState('')
const [toggleValue, setToggleValue] = useState(false);
const dispatch =  useDispatch();
const person_Image = "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
const mapdata  = useSelector(state => state.maplocation)
const userdetaile  = useSelector(state => state.user.user_details)
const dashboard  = useSelector(state => state.user.dashdata)
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
const [modlevisual, setmodlevisual] = useState(false);
const [coordinates, setcoordinates] = useState([]);
const [mymarker, setmymarker] = useState(null)
const [mtype, setmType] = useState('standard')
const [showtype, setShowType] = useState(false)
const [destPos, setDestPos] = useState({ "latitude": 0, "longitude": 0 })
const [startPos, setStartPos] = useState({ "latitude": 0, "longitude": 0 })
const [c_cord,setC_Cord] = useState(false)
const [myaddress,setMyaddress] = useState('')
const [bid,setBid]=useState('')
const [curentCord,setCurentCord]=useState({
  latitude: 26.4788922, 
  longitude: 83.7454171,
})
const [angle,setangle]=useState(45)
const [biddata,setbiddata]=useState([])
const [bidCheck,setBidCheck]=useState(false)
const [loading,setLoading]=useState(false)
const [loder,setLoder]=useState(false)
const [myreson,setmyReson]=useState({
  latitude: 26.4788922, 
  longitude: 83.7454171,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
})
const [estTime,setestTime]=useState('')
const [distance,setdistance]=useState('')
const [fuleCost, setfuleCost] = useState('');
const [fuleModle, setfuleModle] = useState(false);
const [My_Alert, setMy_Alert] = useState(false)
const [alert_sms, setalert_sms] = useState('')
const [time, settime] = useState(20);
const timeCopy = useRef(20);
const intervalID = useRef(0);

  useEffect( () => { 
    console.log('userdetaileuserdetaile==>>',userdetaile);
    requestACCESS_FINE_LOCATIONPermission()
   
  }, [])


  function callAutoTimer() {
    intervalID.current = setInterval(() => {
      settime(timeCopy.current - 1)
      timeCopy.current = timeCopy.current - 1
      console.log('s', timeCopy.current)
      if (timeCopy.current <= 0) {
        console.log('Call Function !')
         setmodlevisual(false)
        clearInterval(intervalID.current);
      }
    }, 1000);
  }

  const AcceptRideClick = async () => {
    var data = {
      "driver_id": "24",
      "ride_id": "1",
      "status": "0",
      "created_date": "01-01-2023",
      "driver_arrived_time": "09:00",
      "ride_start_time": "09:05",
      "ride_end_time": "11:00",
      "payment_id": ""
    }
    const { responseJson, err } = await requestPostApi(driver_accept_ride_request, data, 'POST', userdetaile.token)
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (responseJson.headers.success == 1) {
      props.navigation.navigate('Home2', { from: 'home' })
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  }


  messaging().onNotificationOpenedApp(remoteMessage => {
    const data = remoteMessage.data
    console.log('Notification caused app to open from background state:',remoteMessage)
    if(remoteMessage.notification.body=='You have a new ride'){
      // checkRideStatus(remoteMessage.data.ride_id)
      dispatch(setDestnationAddress(data.end_location))
      dispatch(setStartAddress(data.start_location))
      dispatch(setNotificationData(data))
      // resetStacks('Home2')
    }
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );
        const data = remoteMessage.data
        console.log('Home Notification==>>',remoteMessage)
        if(remoteMessage.notification.body=='You have a new ride'){
          dispatch(setDestnationAddress(data.end_location))
          dispatch(setStartAddress(data.start_location))
          dispatch(setNotificationData(data))
          // resetStacks('Home2')
        }
      }
    });

  messaging().onMessage(async remoteMessage => {
  const data = remoteMessage.data
  console.log('Home Notification==>>',remoteMessage)
  // if(remoteMessage.notification.body=='You have a new ride'){
    if(remoteMessage.notification.title=='You have a new ride'){
  
    setmodlevisual(true)
    callAutoTimer()
    // if(remoteMessage.notification.body!='new message'  && remoteMessage.notification.body!='Ride Cancelled By Customer'){
    // var dest_pos={latitude: parseInt(data.end_latitude), longitude: parseInt(data.end_longitude)}
    // var st_pos={latitude: parseInt(data.start_latitude), longitude: parseInt(data.start_longitude)}  
    dispatch(setDestnationAddress(data.end_location))
    // dispatch(setDestnationPosition(dest_pos))
    // dispatch(setStartPosition(st_pos))
    dispatch(setStartAddress(data.start_location))
    dispatch(setNotificationData(data))
    // resetStacks('Home2')
  }else if(remoteMessage.notification.body=='new message'){
    // dispatch(setMessageCount(mapdata.messagecount+1))
   }
  }); 

  const OnOff = async (flex) => {
    setLoading(true)
    var data = {
      "on_duty": flex
       }
    const { responseJson, err } = await requestPostApi(driver_current_status+userdetaile.userid, data, 'PUT', userdetaile.token)
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (responseJson.headers.success == 1) {
      setToggleValue(!toggleValue)
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
}

  const UpdateLocation = async (datas,add) => {
      setLoading(true)
      var data = {
        "id": userdetaile.userid,
        "latitude": datas.latitude,
        "longitude":datas.longitude,
        "address" : add
          }
      const { responseJson, err } = await requestPostApi(driver_update_driver_location, data, 'POST', userdetaile.token)
      setLoading(false)
      console.log('the res==>>', responseJson)
      if (responseJson.headers.success == 1) {
       
      } else {
        setalert_sms(err)
        setMy_Alert(true)
      }
    
  }

  const requestACCESS_FINE_LOCATIONPermission = async () => {
    if(Platform.OS=='android'){
       try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Access Your Location',
          message:'Allow',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        myposition()
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
    }else{
      myposition()
    }
   
  };
  
  const myposition = () => {
    Geolocation.getCurrentPosition(
      position => {
        let My_cord = { latitude: position.coords.latitude, longitude: position.coords.longitude }
        setCurentCord(My_cord)
        setangle(position.coords.heading)
        setmyReson({
          latitude: position.coords.latitude, 
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
        LatlongTo_address(My_cord)
       
       // setDriverLocation('driver1',My_cord,position.coords.heading)
        console.log('The curent popsition is',position);
      },
      error => {
        console.log('The curent error is',error);
        // Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      }
    );
  }

  const addressToLatlong = (address) => {
    Geocoder.from(address)
      .then(json => {
        var location = json.results[0].geometry.location;
        console.log('Location==>', location);
        var latitude = location.lat
        var longitude = location.lng
        var destinationLatlon = { "latitude": latitude, "longitude": longitude }
        if (destSearch) {
          console.log('hiii', destinationLatlon)
          dispatch(setDestnationPosition(destinationLatlon))
          props.navigation.navigate('Home3',{from:'home2'})
        } else {
          dispatch(setStartPosition(destinationLatlon))
        }
      })
      .catch(error => console.warn(error));
  }

  const LatlongTo_address = async(latlong) => {
    // var courentlocation = mapdata.curentPosition
    // dispatch(setStartPosition(courentlocation))
    Geocoder.from(latlong.latitude, latlong.longitude)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        console.log('The address is', json.results[0].formatted_address);
        UpdateLocation(latlong,addressComponent)
      })
      .catch(error => console.warn(error));
  }

  return (
    <SafeAreaView style={styles.container}>
   <HomeHeader height={60}  paddingHorizontal={15}
   press1={()=>{props.navigation.openDrawer()}} img1={require('../../assets/List.png')} img1width={25} img1height={25} 
   press2={()=>{}} img2={require('../../assets/Kinengo_Green.png')} img2width={95} img2height={20}
   press3={()=>{}} img3={require('../../assets/Bell.png')} img3width={25} img3height={25} />

    <ScrollView style={{paddingHorizontal:15,flexGrow:1}} nestedScrollEnabled={true}>
    <View style={{
    borderRadius:7,
    marginTop:10,
    backgroundColor:'#fff',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width:0,
      height:3
    }, 
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: 'center',
    elevation: 5,
    
   }}>
   <TouchableOpacity style={{width:'100%',height:50,flexDirection:'row',
    justifyContent:'space-between',alignItems:'center',
   
    paddingHorizontal:10 ,borderRadius:5,overflow:'hidden'   
    }} onPress={()=>{}}>
    <View style={{flexDirection:'row',alignItems:'center'}}>
    <Image source={require('../../assets/cuate.png')} style={{width:35,height:35,}}></Image>
    <Text style={{left:15,color:Mycolors.TEXT_COLOR,fontSize:13,fontWeight:'bold'}}>DUTY</Text>
    </View>
 
    <Toggle
  value={toggleValue}
  onPress={(newState) => {
    OnOff(newState? 1 : 0)
    setToggleValue(newState)
    console.log(newState);
  }}
  //  leftTitle="Veg"
  // rightTitle="Non-Veg"
  trackBarStyle={{
    borderColor: "gray",
    width:55,height:25,
    backgroundColor:toggleValue?'gray':'green'
  }}
  
  trackBar={{
    backgroundColor:'#fff',
    width: 53,
  }}

  thumbButton={{
    width: 24,
    height: 24,
    radius: 24,
    backgroundColor:'#fff',

  }}
  thumbStyle={{
    left:2,
    right:2,
    backgroundColor:'#fff',
  }}
  containerStyle={{width:60,height:40}}
/>
  
    </TouchableOpacity>
   
    </View>
   
    <View style={{alignItems:'center',marginTop:20}}>
    <Image source={require('../../assets/TotalEarningsfromKarryGO.png')} style={{width:'100%',height:150,}}></Image>
   <View style={{position:'absolute',top:'32%',left:30}}>
<Text style={{fontSize:20,color:Mycolors.BG_COLOR,fontWeight:'600'}}>$2345</Text>
   </View>
    </View>
{toggleValue ?
    <View style={{alignItems:'center',width:'95%',alignSelf:'center'}}>
    <Image source={require('../../assets/homeGroup.png')} style={{width:'100%',height:260,}}></Image>
    <Text style={{color:Mycolors.TEXT_COLOR,fontSize:13,textAlign:'center',marginTop:20}}>You’re currently OFF DUTY, Please go ON DUTY to Start Earning</Text>
    </View>
    :
    <View style={{alignItems:'center',width:'95%',alignSelf:'center',borderRadius:10,overflow:'hidden'}}>
   
   
  <MapView
          style={{ height: 400,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',borderRadius:10}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: curentCord.latitude,
            longitude: curentCord.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyle}
          showsUserLocation={true}
          userLocationCalloutEnabled={true}
          showsMyLocationButton={true}
          mapPadding={{ top: 30, right: 30, bottom: 30  , left: 40 }}
          showsScale={true}
          showsCompass={true}
          rotateEnabled={true}
       // onRegionChange={data=>console.log('the resion change',data)}
       // onPress={(data)=>onMapPress(data)}
          mapType={mtype}
          zoomEnabled={true}
          pitchEnabled={true}
          followsUserLocation={true} 
          // showsCompass={true}
          showsBuildings={true}
          //showsTraffic={true}
          showsIndoors={true}
          showsIndoorLevelPicker={true}
            >
        
         
   
        </MapView>
  


    {/* <Image source={require('../../assets/Maskgroup.png')} style={{width:'100%',height:400,}}></Image> */}
   



    </View>
}

<View style={{width:100,height:100}}></View>
</ScrollView>


{modlevisual ?
<View style={{width:dimensions.SCREEN_WIDTH,height:'100%',backgroundColor:'rgba(0,0,0,0.4)',position:'absolute',left:0,bottom:0,top:0,right:0,flex:1}}>
        <View style={{ height: 300, backgroundColor: '#fff', borderRadius: 30, borderTopRightRadius: 30,position: 'absolute', bottom: 40, width: '95%',borderColor:'#fff',borderWidth:0.3,alignSelf:'center' }}>

          {/* <View style={{ width: 100, height: 30, position: 'absolute', top: 0, zIndex: 999, alignSelf: 'center', borderRadius: 5 }}>
            <TouchableOpacity onPress={() => { setmodlevisual(false) }}style={{ width: 50, height:4,backgroundColor:Mycolors.GrayColor,borderRadius:17,marginTop:10 ,alignSelf:'center'}}>
            </TouchableOpacity>
          </View> */}

           
<View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between',paddingHorizontal:20,paddingVertical:20,borderTopLeftRadius: 30, borderTopRightRadius: 30,}}>
<Text style={{color:Mycolors.TEXT_COLOR,fontWeight:'bold',fontSize:15}}>Please Accept Your Order</Text>
          <View style={{ width: '50%', alignItems: 'flex-end', paddingHorizontal: 20, }}>
                <Text style={{ color: Mycolors.TEXT_COLOR, fontWeight: 'bold', fontSize: 16 }}>{time}</Text>
              </View>
            <View style={{width:30,height:30,borderRadius:15,}}>

            </View>

</View>
<View style={{ width: '100%', height: 0.5, backgroundColor: '#fee1be',marginTop:35,top:-30 }} />


<View style={{
            width: '97%',
           // height: 60,
            top:-25,
            //  flexDirection: 'row', 
             borderRadius: 10,
             padding:10,
           alignSelf:'center',
            backgroundColor: Mycolors.BG_COLOR,
             }}>

         
<View style={{width:'100%',height:50,flexDirection:'row'}}>
            <View>
              <Image source={require('../../assets/Clock.png')} style={{ width: 24, height: 27, top: 5,left:3 }}></Image>
            </View>
            <View style={{width:dimensions.SCREEN_WIDTH-100,left:20}}>
              <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 14, fontWeight: '600', }}>Est. Time</Text>
           <View style={{flexDirection:'row'}} >
           <Text style={{color:Mycolors.TEXT_COLOR,fontSize:11,top:5}}>09 min</Text>
           </View>
          </View>
</View>

<View style={{width:'100%',flexDirection:'row'}}>
            <View>
              <Image source={require('../../assets/MapPin.png')} style={{ width: 24, height: 27, top: 5,left:3 }}></Image>
            </View>
            <View style={{width:dimensions.SCREEN_WIDTH-100,left:20}}>
              <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 14, fontWeight: '600', }}>Order Pickup Location</Text>
           <View style={{flexDirection:'row'}} >
           <Text style={{color:Mycolors.TEXT_COLOR,fontSize:11,top:5}}>dtv varanasi</Text>
           </View>
          </View>
</View>





        </View>

  <View style={{ width: '100%', height: 0.5, backgroundColor: '#fee1be',top:-5 }} />







<View style={{width:'80%',height:40,flexDirection:'row',justifyContent:'space-between',alignSelf:'center',marginTop:20}}>
<TouchableOpacity style={{flexDirection:'row',alignItems:'center',borderRadius:50,backgroundColor:'#60D244',paddingHorizontal:15,width:'47%',justifyContent:'center'
,            shadowColor: Mycolors.TEXT_COLOR,
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowRadius: 5,
            shadowOpacity: 1.0,
          
            elevation: 5
}} onPress={()=>{
//  getBidAmount()
//  setBidCheck(true)
AcceptRideClick()
// props.navigation.navigate('Home2',{from:'home'})
  }}>
<Text style={{color:Mycolors.BG_COLOR,fontSize:13,fontWeight:'bold',marginLeft:5}}>Accept</Text>
</TouchableOpacity>

<TouchableOpacity style={{flexDirection:'row',alignItems:'center',borderRadius:50,backgroundColor:'#F3392B',paddingHorizontal:15,width:'47%',justifyContent:'center',borderColor:Mycolors.ORANGE,borderWidth:0.5
, shadowColor: Mycolors.TEXT_COLOR,
shadowOffset: {
  width: 0,
  height: 3
},
shadowRadius: 5,
shadowOpacity: 1.0,

elevation: 5
}}
 onPress={()=>{
  setmodlevisual(false)
  // resetStacks('Home')
  //  props.navigation.navigate('Home3',{from:'home2'})
   }}> 
<Text style={{color:Mycolors.BG_COLOR,fontSize:13,fontWeight:'bold',marginLeft:5}}>Reject</Text>
</TouchableOpacity>

</View>


        </View>

</View>
        : null
      }

{loading ? <Loader /> : null}

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Mycolors.BG_COLOR
  },

});
export default Home