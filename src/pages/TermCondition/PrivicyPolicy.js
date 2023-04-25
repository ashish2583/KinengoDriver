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
import {setCurentPosition,setBidAmount,setNotificationData,setStartAddress,setDriverRideStatus,setDestnationAddress,setStartPosition,setDestnationPosition} from '../../redux/actions/latLongAction';
import {setWalletDetails} from '../../redux/actions/user_action';
import { Rating, AirbnbRating } from 'react-native-ratings';
// import MyNetinfo from '../../component/MyNetinfo'
import {baseUrl,driver_earning,driver_ride_check_status,driver_accept_ride_request,driver_update_driver_location,driver_current_status,driver_fuel_cost,booking_bid_price,requestGetApi,requestPostApi} from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';
// import Toast from 'react-native-toast-message';
// import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapDire from '../../component/MapDire';
import MyMapView from '../../component/MyMapView'
import MyAlert from '../../component/MyAlert'
import messaging from '@react-native-firebase/messaging';
import SendNotification from '../../component/SendNotification';
import moment from 'moment';

Geolocation.setRNConfiguration(GoogleApiKey); 
Geocoder.init(GoogleApiKey);
const PrivicyPolicy = (props) => {
 
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
const walletDetail  = useSelector(state => state.user.wallet_detail)
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
const [estTime,setEstTime]=useState('')
const [distance,setdistance]=useState('')
const [fuleCost, setfuleCost] = useState('');
const [fuleModle, setfuleModle] = useState(false);
const [My_Alert, setMy_Alert] = useState(false)
const [alert_sms, setalert_sms] = useState('')
const [time, settime] = useState(30);
const timeCopy = useRef(60);
const intervalID = useRef(0);
const [estDistance, setEstDistance] = useState('')

  useEffect( () => {
   
  }, [])
  
 
 

  return (
    <SafeAreaView style={styles.container}>
   <HomeHeader height={60}  paddingHorizontal={15}
   press1={()=>{props.navigation.goBack()}} img1={require('../../assets/arrow.png')} img1width={25} img1height={25} 
   press2={()=>{}} img2={require('../../assets/Kinengo_Green.png')} img2width={95} img2height={20}
  //  props.navigation.navigate('Chat')
   press3={()=>{}}  img3width={25} img3height={25} />
<ScrollView style={{paddingHorizontal:20}}>
  <Text style={{color:'#000',fontSize:15,fontWeight:'bold',alignSelf:'center',textAlign:'center'}}>Privacy Policy</Text>
  <Text style={{textAlign:'center',marginTop:10,lineHeight:18,}}>A privacy policy is a statement or legal document (in privacy law) that discloses some or all of the ways a party gathers, uses, discloses, and manages a customer or client's data.[1] Personal information can be anything that can be used to identify an individual, not limited to the person's name, address, date of birth, marital status, contact information, ID issue, and expiry date, financial records, credit information, medical history, where one travels, and intentions to acquire goods and services.[2] In the case of a business, it is often a statement that declares a party's policy on how it collects, stores, and releases personal information it collects. It informs the client what specific information is collected, and whether it is kept confidential, shared with partners, or sold to other firms or enterprises.[3][4] Privacy policies typically represent a broader, more generalized treatment, as opposed to data use statements, which tend to be more detailed and specific.

The exact contents of a certain privacy policy will depend upon the applicable law and may need to address requirements across geographical boundaries and legal jurisdictions. Most countries have own legislation and guidelines of who is covered, what information can be collected, and what it can be used for. In general, data protection laws in Europe cover the private sector, as well as the public sector. Their privacy laws apply not only to government operations but also to private enterprises and commercial transactions.[5]

California Business and Professions Code, Internet Privacy Requirements (CalOPPA) mandate that websites collecting Personally Identifiable Information (PII) from California residents must conspicuously post their privacy policy.[6] (See also Online Privacy Protection Act)</Text>


</ScrollView>





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
export default PrivicyPolicy