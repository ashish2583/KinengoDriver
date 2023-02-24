import React, { useEffect, useState ,useRef} from 'react';
import {View,Image,Text,StyleSheet,SafeAreaView,TextInput,FlatList,Linking, TouchableOpacity,Platform, Alert, PermissionsAndroid, ScrollView} from 'react-native';
import {Mycolors,dimensions} from '../../utility/Mycolors';

import {GoogleApiKey} from '../../WebApi/GoogleApiKey'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {  useSelector, useDispatch } from 'react-redux';
import {setCurentAdderss,setStartAddress,setStartPosition,setCurentPosition,setDestnationAddress,setDestnationPosition} from '../../redux/actions/latLongAction';
import MyButtons from '../../component/MyButtons';
import Modal from 'react-native-modal';
import { Rating, AirbnbRating } from 'react-native-ratings';
// import SwipeButton from 'rn-swipe-button';
import {CodeField,Cursor,useBlurOnFulfill,useClearByFocusCell,} from 'react-native-confirmation-code-field';
import {baseUrl,booking_start_ride,booking_verify_ride,driver_logout,booking_cancel_ride,requestGetApi,requestPostApi} from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';
// import Toast from 'react-native-simple-toast'
 import MyMapView from '../../component/MyMapView'
// import firestore from '@react-native-firebase/firestore'
// import openMap from 'react-native-open-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {onLogoutUser} from '../../redux/actions/user_action';


import MyAlert from '../../component/MyAlert'
//  Geolocation.setRNConfiguration(GoogleApiKey);
//  Geocoder.init(GoogleApiKey);
 const CELL_COUNT = 4;

const Home3 = (props) => {
    const dispatch =  useDispatch();
    const mapdata  = useSelector(state => state.maplocation)
    const userdetaile  = useSelector(state => state.user.user_details)
    const person_Image = "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
   
      const [modlevisual, setmodlevisual] = useState(true);
      const [mtype,setmType]=useState('standard')
      const [showtype,setShowType]=useState(false)
      const [confirmRide, setconfirmRide] = useState(false)
      const [value, setValue] = useState('');
      const [loading,setLoading]=useState(false)
      const [angle,setangle]=useState(45)
      const [curentCord,setCurentCord]=useState('')
      const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
      const [watch,setWatch]=useState('1')
      const [reloade,setRelode] = useState(false)
      const [My_Alert, setMy_Alert] = useState(false)
      const [alert_sms, setalert_sms] = useState('')
      const [mprops, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
      });

      const [myreson,setmyReson]=useState({
        latitude: 26.4788922, 
        longitude: 83.7454171,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
     
      useEffect(()=>{
        console.log('hello ashish kumar verma',mapdata.startPosition);
        setmyReson({
          latitude: mapdata.startPosition.latitude, 
          longitude: mapdata.startPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
        // frist()

    },[])



    return(
    <SafeAreaView style={styles.container}>

  <View style={styles.mymapcontainer}>
  <MyMapView
  latitude={mapdata.curentPosition.latitude}
  longitude={mapdata.curentPosition.longitude}
  mapType={mtype}
  modlevisual={modlevisual}
  modleHeight={290}  
  markAPos={mapdata.curentPosition}
  markBPos={mapdata.startPosition}
  // mapDirectionOrigin={mapdata.startPosition}
  // mapDirectionDest={mapdata.destnationPosition}
  mapDirectionOrigin={mapdata.curentPosition}
  mapDirectionDest={mapdata.startPosition}
  imageA={require('../../assets/MapPin.png')}
  imageB={require('../../assets/MapPin.png')}
  // region={myreson}
  onRegionChange={(dd)=>{
    // myresonChange(dd)
    } }
   />

   </View>

<SafeAreaView>
  <TouchableOpacity style={{width:40,height:40,borderRadius:5,backgroundColor:'#fff',position:'absolute',left:15,top:15,justifyContent:'center'}}
  onPress={()=>{props.navigation.goBack()}}>
  <Image source={require('../../assets/ArrowLeft.png')} style={{ width: 25, height: 22,alignSelf:'center'}}></Image>
  </TouchableOpacity>
</SafeAreaView>
  
<SafeAreaView>
  <TouchableOpacity style={{width:'78%',height:40,borderRadius:5,backgroundColor:'#fff',position:'absolute',left:65,top:15,alignItems:'center',flexDirection:'row'}}
  onPress={()=>{}}>
  <Image source={require('../../assets/MapPin.png')} style={{ width: 25, height: 22,left:9}}></Image>
   <Text style={{left:15,color:'gray',fontSize:13}}>Varanasi India</Text>
  </TouchableOpacity>

</SafeAreaView>

<View style={{width:'92%',padding:20,borderRadius:15,backgroundColor:'#fff',position:'absolute',bottom:30,alignSelf:'center'}}>

     
          <View style={{width:'100%',height:60,flexDirection:'row'}}>
            <View>
              <Image source={require('../../assets/images/profileimg.png')} style={{ width: 60, height: 60,}}></Image>
            </View>
            <View style={{width:dimensions.SCREEN_WIDTH-100,left:20,top:8}}>
              <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 15,fontWeight:'600'}}>Geories Local</Text>
           <View style={{flexDirection:'row'}} >
           <Image source={require('../../assets/Star.png')} style={{ width: 16, height: 16,top:6}}></Image>
           <Text style={{color:Mycolors.TEXT_COLOR,fontSize:13,top:5,left:5,fontWeight:'600'}}>4.5</Text>
           </View>
          </View>
            </View>


          <View style={{height:39,width:80, borderRadius:15,flexDirection:'row',justifyContent:'space-between',position:'absolute',right:10,top:30}}>
          <MyButtons  height={35} width={35} borderRadius={5} press={()=>{}} 
          img={require('../../assets/Envelope.png')} imgheight={20} imgwidth={20}
            titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.ORANGE}  />
          
          <MyButtons height={35} width={35} borderRadius={5} press={()=>{}} 
          img={require('../../assets/call.png')} imgheight={20} imgwidth={20} 
            titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.GREEN}   />
          
          </View>

</View>

      {My_Alert ? <MyAlert sms={alert_sms} okPress={()=>{setMy_Alert(false)}} /> : null } 
{ loading ? <Loader /> : null }

    </SafeAreaView>
     );
  }
const styles = StyleSheet.create({

  container: {
    flex: 1,  
   // backgroundColor:Mycolors.BG_COLOR
  },
  mymapcontainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  input: {
    height: 45,
    width: '100%',
    fontSize: 13,
    borderColor: null,
    borderRadius: 10,
    color: Mycolors.TEXT_COLOR,
    paddingLeft: 50,
    paddingRight:10,
  },
  inputBoxStyle:{
    width: '100%',
    height: 47,
     borderRadius: 28, 
     marginTop: 10 ,
     backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
        width: 0,
        height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        justifyContent:'center',
        elevation: 5
  },
  textcolor:{
   color: Mycolors.TEXT_COLOR
  },
  modalview:{
    width:dimensions.SCREEN_WIDTH,
    backgroundColor:Mycolors.BG_COLOR,
    position:'absolute',
    bottom:0,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    height:dimensions.SCREEN_HEIGHT*42/100,
    padding:20,
  },
  root: {padding: 20, minHeight: 300},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {
    marginTop: 20,
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#B2BEC6',
    borderWidth: 0.3,
    borderRadius:30
    // backgroundColor:Mycolors.DrawerBGcolor
  },
  cellText: {
    color: Mycolors.TEXT_COLOR,
    fontSize: 18,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#007AFF',
    borderWidth: 1,
  },
});
export default Home3