import React, { useEffect, useState } from 'react';
import {View,Image,Text,StyleSheet,SafeAreaView,TextInput,FlatList, TouchableOpacity,Platform, Alert, PermissionsAndroid, ScrollView, Linking} from 'react-native';
import MapView, { PROVIDER_GOOGLE,Marker,Polyline,AnimatedRegion, Animated } from 'react-native-maps';
import {Mycolors,dimensions} from '../../utility/Mycolors';
import Geolocation from "react-native-geolocation-service";
import Geocoder from "react-native-geocoding";
import MapViewDirections from 'react-native-maps-directions';
import {GoogleApiKey} from '../../WebApi/GoogleApiKey'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {  useSelector, useDispatch } from 'react-redux';
import {setCurentAdderss,setStartAddress,setStartPosition,setCurentPosition,setDestnationAddress,setDestnationPosition} from '../../redux/actions/latLongAction';
import MyButtons from '../../component/MyButtons';
import sendNotification from '../../component/SendNotification';
import Modal from 'react-native-modal';
import { Rating, AirbnbRating } from 'react-native-ratings';
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import {baseUrl,booking_cancel_ride,booking_complete_ride,driver_logout,requestGetApi,requestPostApi} from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';
// import Toast from 'react-native-simple-toast'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {onLogoutUser} from '../../redux/actions/user_action';
import MyMapView from '../../component/MyMapView'
import openMap from 'react-native-open-maps';
import messaging from '@react-native-firebase/messaging'; 
import MyAlert from '../../component/MyAlert'
// import Geolocation from '@react-native-community/geolocation';
 Geolocation.setRNConfiguration(GoogleApiKey);
// geolocation.watchPosition(success, [error], [options]);
 Geocoder.init(GoogleApiKey);

//Driver Side Home 5

const Home4 = (props) => {
    const dispatch =  useDispatch();
    const mapdata  = useSelector(state => state.maplocation)
    const userdetaile  = useSelector(state => state.user.user_details)
    const person_Image = "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    
      const [modlevisual, setmodlevisual] = useState(true);
      const [mtype,setmType]=useState('standard')
      const [showtype,setShowType]=useState(false)
      const [estimatedTime,setestimatedTime]=useState('')
      const [curentCord,setCurentCord]=useState('')
      const [angle,setangle]=useState(45)
      const [watch,setWatch]=useState('1')
      const [endRide, setendRide] = useState(false)
      const [loading,setLoading]=useState(false)
      const [My_Alert, setMy_Alert] = useState(false)
      const [alert_sms, setalert_sms] = useState('')

      const [myreson,setmyReson]=useState({
        latitude: 26.4788922, 
        longitude: 83.7454171,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
      useEffect(()=>{ 
        // myposition()
        setmyReson({
          latitude: mapdata.startPosition.latitude, 
          longitude: mapdata.startPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
       frist()
      //  getAllRealtimeLocation()
    },[])

 
   

 const getAllRealtimeLocation=()=>{
      const docid  ='12'
      const messageRef = firestore().collection('DriverLocation')
      .doc(docid)
      // .collection('messages')
      // .orderBy('createdAt',"desc")
          messageRef.onSnapshot((querySnap)=>{
          const allmsg =   querySnap.docs.map(docSanp=>{
           const data = docSanp.data()
          //  return {
          //           ...docSanp.data()
          //       }
          
          console.log('The location is==>',data)
              
          })
          console.log('The allmsg is==>',allmsg)
      })
    }
    
const setDriverLocation=(id,location,angle)=>{
  firestore()
  .collection('DriverLocation')
  .doc(id)
  .set({
    DriverId: id,
    Location: location,
    Angle: angle,
  })
  .then(() => {
    console.log('User added!');
  });
}

 const myposition = () => {
        Geolocation.getCurrentPosition(
          position => {
            let My_cord = { latitude: position.coords.latitude, longitude: position.coords.longitude }
            setCurentCord(My_cord)
            setangle(position.coords.heading)
            setDriverLocation(mapdata.notificationdata.driver_id,My_cord,position.coords.heading)
           // console.log('The curent popsition is',position);
          },
          error => {
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
    const frist=()=>{
      
       if(watch=='1'){
         myposition()
          second()  
       }
       
    }
    const second=()=>{
          setTimeout(()=>{
            frist()
          },20000)  
        }

const dialCall = () => {
 
  let phoneNumber = '';
   
  if (Platform.OS === 'android') {
    phoneNumber = 'tel:${'+mapdata.notificationdata.phone_no+'}';
  }
  else {
    phoneNumber = 'telprompt:${'+mapdata.notificationdata.phone_no+'}';
  }
  Linking.openURL(phoneNumber); 
  };

  const senNoti= async()=>{
    console.log('the user device id is',mapdata.notificationdata.device_id)
      let notidata={
        'data': {},
        'title':'Fling',
        'body': 'Ride Completed',
       // 'token':'cxHj6Y-nQla1KsGRx3LJDJ:APA91bGkoGHr_DHvfMIycmP_b5pKmjRXY4jzfLnGUGLni4QZg5rXaHWZWBrCzyTGEMZ-c31tOIJWvM3os6b1lI-MhTt9z1o-d97lCJmnPf26fZssGQ4pQwVcoAQbN9FT579TSWC77AiV'
       'token':mapdata.notificationdata.device_id
      }
      let result= await sendNotification.sendNotification(notidata)
       // console.log('result')
    }
 
    const LogoutDriver= async()=>{
      const{responseJson,err}  = await requestGetApi(driver_logout,'','GET',userdetaile.token) 
      if(err==null){
           if(responseJson.status){
             AsyncStorage.clear(); 
             dispatch(onLogoutUser())
           }else{
          // Toast.show(responseJson.message);
           }
       }else{
        setalert_sms(err)
            setMy_Alert(true)
            }
   }

const completeRide= async()=>{
  setLoading(true)
  let formdata = new FormData();
  formdata.append("ride_id",mapdata.notificationdata.ride_id);
  formdata.append("driver_id",mapdata.notificationdata.driver_id);
  formdata.append("current_screen",'CompleteRide');

    const{responseJson,err}  = await requestPostApi(booking_complete_ride,formdata,'POST',userdetaile.token) 
     setLoading(false)
    // console.log('the res==>>',responseJson)
    if(err==null){
        if(responseJson.status){
          senNoti()
         // Toast.show(responseJson.message);
          AsyncStorage.removeItem('ride');
          setendRide(true)
          if(responseJson.data.profile_status){
            if(responseJson.data.profile_status!='active'){
              console.log('false status==>>',responseJson)
              LogoutDriver()
            }
          }
        }else{
         // Toast.show(responseJson.message);
        }

    }else{
      setalert_sms(err)
            setMy_Alert(true)
    }

}
const c_pos_click=()=>{
  setmyReson({
    latitude: curentCord.latitude, 
    longitude: curentCord.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
}
const goToMap=()=> {
  openMap(
    { latitude: curentCord.latitude,
       longitude: curentCord.longitude ,
       provider:'google',
      //  start:'Noida ,Uttar Pradesh,India',
       end:mapdata.destnationAddress,
      }
      );
 }
 
    return(
    <SafeAreaView style={styles.container}>
        
  <View style={styles.mymapcontainer}>

  <MyMapView
  latitude={mapdata.startPosition.latitude}
  longitude={mapdata.startPosition.longitude}
  mapType={mtype}
  modlevisual={modlevisual}
  modleHeight={350}
  markAPos={mapdata.startPosition}
  markBPos={mapdata.destnationPosition}
  mapDirectionOrigin={mapdata.startPosition}
  mapDirectionDest={mapdata.destnationPosition}
  imageA={require('../../assets/MapPin.png')}
  imageB={require('../../assets/MapPin.png')}
  region={myreson}
   />

 
          {/* Driver Marker with rotation */}
          {/* <MapView.Marker.Animated 
            coordinate={curentCord!=''?curentCord:mapdata.curentPosition}
            title={'Start Address'}
            description={mapdata.startAddress}
            style={{ transform: [{
                rotate: angle === undefined ? '0deg' : `${angle}deg`
              }]
            }}
            >
             <Image
                source={require('../../assets/mapcar.png')}
                style={{width: 26, height: 28,
                    transform: [{
                    // rotate: '270deg'
                    rotate: angle === undefined ? '0deg' : `${angle}deg`
                    }]}}
                resizeMode="contain"
               /> 
              
             
            </MapView.Marker.Animated > */}
        {/* Start position Marker */}
         
      
    
      
   </View>
   <SafeAreaView>
<View style={{position:'absolute',top:10,right:15,backgroundColor:Mycolors.BG_COLOR,borderRadius:12,width:(dimensions.SCREEN_WIDTH*90/100)-45,height:40,justifyContent:'center',paddingHorizontal:5}}>
   <View style={{flexDirection:'row',justifyContent:'space-between'}}>
     <Text style={{fontSize:10,color:'#9FACBF',fontFamily:'OpenSans-Medium',paddingHorizontal:5}}>{mapdata.startAddress.substring(0,23)}</Text>
    <Image source={Mycolors.BG_COLOR=='#fff'? require('../../assets/rightArrowH3.png'):require('../../assets/rightArrow.png')} style={{ width: 15, height: 7,borderRadius:10,alignSelf:'center',left:-3}}></Image>
    <Text style={{fontSize:10,color:Mycolors.TEXT_COLOR,fontFamily:'OpenSans-Medium',paddingHorizontal:5}}>{mapdata.destnationAddress.substring(0,20)}</Text>
    </View>
    </View>
   </SafeAreaView> 
{/* <SafeAreaView>
   <View style={{position:'absolute',top:10,right:20,backgroundColor:Mycolors.BG_COLOR,borderRadius:5,width:(dimensions.SCREEN_WIDTH*90/100)-45,justifyContent:'center',paddingHorizontal:5}}>
  
   <View style={{flexDirection:'row',paddingHorizontal:10,alignItems:'center',marginTop:2}}>
  <Image source={require('../../assets/location-pinb.png')} style={{ width: 20, height: 20,alignSelf:'center',resizeMode:'contain'}}></Image>
  <View style={{marginLeft:15}}>
  <Text style={{color:Mycolors.GrayColor,fontSize:11,}}>Pickup Address</Text>
  <Text style={{color:Mycolors.TEXT_COLOR,fontSize:11,top:2}}>{mapdata.startAddress}</Text>
 </View>
  </View>

  <View style={{flexDirection:'row',paddingHorizontal:10,alignItems:'center',marginVertical:5,borderTopColor:Mycolors.GrayColor,borderTopWidth:0.3,paddingTop:2}}>
  <Image source={require('../../assets/location-pinb.png')} style={{ width: 20, height: 20,alignSelf:'center',resizeMode:'contain'}}></Image>
  <View style={{marginLeft:15}}>
  <Text style={{color:Mycolors.GrayColor,fontSize:11,}}>Drop Address</Text>
  <Text style={{color:Mycolors.TEXT_COLOR,fontSize:11,top:2}}>{mapdata.destnationAddress}</Text>
 </View>  
 </View>

    </View>
   </SafeAreaView>  */}
   <SafeAreaView>
     <View style={{position:'absolute',top:12,left:20,backgroundColor:Mycolors.BG_COLOR,borderRadius:10,width:40,height:40,justifyContent:'center'}}>
   <TouchableOpacity onPress={()=>{
       setWatch('0')
       props.navigation.navigate('Home2',{from:'home3'})
       }}>
    <Image source={Mycolors.BG_COLOR=='#fff'? require('../../assets/leftArrowH3.png'):require('../../assets/leftArrowW.png')} style={{ width: 20, height: 16,alignSelf:'center'}}></Image>
    </TouchableOpacity>
    </View> 
   </SafeAreaView>
{/*     
   <SafeAreaView>
    <View style={{position:'absolute',top:60,right:20,backgroundColor:'#fff',borderRadius:3,width:25,height:25,justifyContent:'center'}}>
   <TouchableOpacity onPress={()=>{setShowType(!showtype)}}>
    <Image source={require('../../assets/map.png')} style={{ width: 18, height: 18,alignSelf:'center'}}></Image>
    </TouchableOpacity>
    </View>
    </SafeAreaView> */}

{Platform.OS=='android'  ?
      <View style={{ position: 'absolute',bottom:modlevisual ? 350 : 10, right: 20, backgroundColor: '#fff', borderRadius: 10, width: 40, height: 40, justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => {c_pos_click()}}>
          <Image source={require('../../assets/currentposition.png')} style={{ width: 25, height: 25, alignSelf: 'center' }}></Image>
        </TouchableOpacity>
      </View>
      :
      null
}

   { !modlevisual?
<View style={{width:100,height:30,backgroundColor:'#fff',position:'absolute',bottom:10,zIndex:999,alignSelf:'center',borderRadius:5}}>
<TouchableOpacity onPress={()=>{setmodlevisual(true)}} style={{width:100,height:30}}>
<Image source={require('../../assets/upload.png')} style={{ width: 18, height: 18,alignSelf:'center'}}></Image>
</TouchableOpacity>
</View>
:
null
}

{modlevisual?

<View style={{ height: 340, backgroundColor: Mycolors.BG_COLOR, borderTopLeftRadius: 30,borderTopRightRadius:30, padding: 20,position:'absolute',bottom:0,width:'100%',alignSelf:'center' }}>

<View style={{width:100,height:30,position:'absolute',top:0,zIndex:999,alignSelf:'center',borderRadius:5}}>
<TouchableOpacity onPress={()=>{setmodlevisual(false)}} style={{ width: 50, height:4,backgroundColor:Mycolors.GrayColor,borderRadius:17,marginTop:10 ,alignSelf:'center'}}>
{/* <Image source={Mycolors.BG_COLOR=='#fff'? require('../../assets/download.png'): require('../../assets/down-arrowW.png')} style={{ width: 18, height: 18,alignSelf:'center'}}></Image> */}
</TouchableOpacity>
</View>
{/* 
<View style={{flexDirection:'row',width:'100%',alignItems:'center'}}>
                    <Image
                        source={{ uri: person_Image }}
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                        }}
                    />
              <View style={{marginLeft:15}}>
              <Text style={{color:Mycolors.TEXT_COLOR,fontWeight:'bold',fontSize:12}}>{mapdata.notificationdata.user_name}</Text>
              <View style={{marginTop:5}}>
                <Rating
                // type='heart'
                ratingCount={5}
                imageSize={12}
                // showRating
                // onFinishRating={this.ratingCompleted}
              />
              </View>
              <Text style={{fontSize:11,color:Mycolors.GrayColor,top:3}}>4/5 Stars</Text>
              </View> 


          <View style={{alignSelf:'flex-end',width:100,height:60,marginLeft:30}}>
          <Image source={require('../../assets/map.png')} style={{ width: 22, height: 22 }}></Image>
          </View>

 </View> */}

<View style={{flexDirection:'row',width:'100%',alignItems:'center'}}>
                    <Image
                         source={{ uri: mapdata.notificationdata.user_image }}
                        style={{
                            height: 64,
                            width: 64,
                            borderRadius: 35,
                            borderWidth:3,
                            borderColor:Mycolors.BG_COLOR
                        }}
                    />
              <View style={{marginLeft:15}}>
              <Text style={{color:Mycolors.TEXT_COLOR,fontWeight:'bold',fontSize:16}}>{mapdata.notificationdata.user_name}</Text>
              <View style={{marginTop:5,width:70,paddingHorizontal:5,backgroundColor:'#fff',borderRadius:5,left:Mycolors.BG_COLOR=='#fff' ? -5 : 0}}>
                <Rating
                 ratingCount={5}
                 imageSize={12}
                 startingValue={mapdata.notificationdata.user_rating}
                 readonly={true}
                style={{alignSelf:'flex-start'}}
              />
              </View>
              <Text style={{fontSize:11,color:Mycolors.GrayColor,top:3}}>{mapdata.notificationdata.user_rating} Stars</Text>
              </View> 
            
             
            </View>

  <View style={{flexDirection:'row',alignItems:'flex-end',position:'absolute',right:15,top:20}}>
          
            <TouchableOpacity style={{width: 38, height: 38,marginLeft:53,backgroundColor:'transparent',justifyContent:'center',borderRadius:5,borderColor:Mycolors.ORANGE,borderWidth:1}}
             onPress={()=>{props.navigation.navigate('Chat',{from:'home3'})}}
            >
            <Image source={require('../../assets/shapmessage.png')} style={{width: 25, height: 25,alignSelf:'center' }}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={{width: 38, height: 38,marginLeft:3,backgroundColor:'transparent',justifyContent:'center',borderRadius:5,borderColor:Mycolors.TEXT_COLOR,borderWidth:1}}
            onPress={()=>{dialCall()}}
            >
              {mapdata.messagecount > 0 ?
                <View style={{position:'absolute',width:18,height:18,backgroundColor:'red',borderRadius:9,justifyContent:'center',top:0,left:-22}}>
              <Text style={{fontSize:8,textAlign:'center',color:'white'}}>{mapdata.messagecount}</Text>
                </View>
                :
                null
              }
            <Image source={require('../../assets/shapeCall.png')} style={{width: 25, height: 25,alignSelf:'center' }}></Image>
            </TouchableOpacity>
           
              </View>


              {/* <View style={{width:'100%',height:45,flexDirection:'row',alignItems:'center',marginTop:10}}>
              <View style={{width:40,height:45}}>
              <Image source={require('../../assets/groupmap.png')} style={{width: 35, height: 45,alignSelf:'center' }}></Image>
              </View>
              <View style={{justifyContent:'center',marginLeft:10,width:'85%'}}>
              <Text style={{color:Mycolors.TEXT_COLOR,fontWeight:'bold',fontSize:13,marginTop:3}}>Pickup Location</Text>
              <Text style={{color:Mycolors.GrayColor,fontSize:12,top:3}}>{mapdata.startAddress}</Text>
              </View>
              </View> */}

<View style={{width:'100%',height:45,flexDirection:'row',alignItems:'center',marginTop:10}}>
<View style={{width:40,height:45}}>
<Image source={require('../../assets/location-pinb.png')} style={{width: 25, height: 25,alignSelf:'center',top:10 }}></Image>
</View>
<View style={{justifyContent:'center',marginLeft:10,width:'85%'}}>
<Text style={{color:Mycolors.TEXT_COLOR,fontWeight:'bold',fontSize:13,marginTop:3}}>Pickup Location</Text>
<Text style={{color:Mycolors.GrayColor,fontSize:12,top:3}}>{mapdata.startAddress}</Text>
</View>
</View>

<View style={{width:'100%',height:45,flexDirection:'row',alignItems:'center',marginTop:15}}>
<View style={{width:40,height:45}}>
<Image source={require('../../assets/location-pin.png')} style={{width: 25, height: 25,alignSelf:'center',top:10 }}></Image>
</View>
<View style={{justifyContent:'center',marginLeft:10,width:'85%'}}>
<Text style={{color:Mycolors.TEXT_COLOR,fontWeight:'bold',fontSize:13,marginTop:3}}>Drop Location</Text>
<Text style={{color:Mycolors.GrayColor,fontSize:12,top:3}}>{mapdata.destnationAddress}</Text>
</View>
</View>


            <TouchableOpacity style={{width: 38, height: 38,marginLeft:50,marginVertical:15,top:-2}} onPress={()=>{goToMap()}}>
            <Image source={require('../../assets/gmap.png')} style={{ width: 42, height: 42 }}></Image>
            </TouchableOpacity>
           
{/* 

 <View style={{width:'90%',height:40,flexDirection:'row',justifyContent:'space-between',alignSelf:'center',marginVertical:20}}>
<TouchableOpacity style={{flexDirection:'row',alignItems:'center',borderRadius:4,backgroundColor:Mycolors.ORANGE,paddingHorizontal:15,width:'47%',justifyContent:'center'}} 
onPress={()=>{props.navigation.navigate('Chat',{from:'home5'})}}>
<Image source={require('../../assets/messenger.png')} style={{ width: 18, height: 18,alignSelf:'center',resizeMode:'contain'}}></Image>
<Text style={{color:Mycolors.BG_COLOR,fontSize:11,fontWeight:'bold',marginLeft:5}}>Send Message</Text>
</TouchableOpacity>
{mapdata.messagecount > 0 ?
  <View style={{position:'absolute',width:18,height:18,backgroundColor:'red',borderRadius:9,justifyContent:'center'}}>
 <Text style={{fontSize:8,textAlign:'center',color:'white'}}>{mapdata.messagecount}</Text>
  </View>
  :
  null
}
<TouchableOpacity style={{flexDirection:'row',alignItems:'center',borderRadius:4,backgroundColor:Mycolors.BG_COLOR,paddingHorizontal:15,borderColor:Mycolors.ORANGE,borderWidth:0.5,width:'47%',justifyContent:'center'}} onPress={()=>{dialCall()}}>
<Image source={require('../../assets/telephone.png')} style={{ width: 18, height: 18,alignSelf:'center',resizeMode:'contain'}}></Image>
<Text style={{color:Mycolors.ORANGE,fontSize:11,fontWeight:'bold',marginLeft:3}}>Call User</Text>
</TouchableOpacity>

</View>
 */}

  <MyButtons title="Complete Ride" padding={15} width={'100%'} borderRadius={25} alignSelf="center" press={()=>{completeRide()}} marginHorizontal={5} titlecolor={Mycolors.BG_COLOR}/>

<View style={{width:10,height:10}}></View>
</View>

:null
 }


 
<Modal
        isVisible={endRide} 
        // swipeDirection="down"
        onSwipeComplete={(e) => {
          setendRideRide(false)
        }}
        hideModalContentWhileAnimating={true}
        coverScreen={false}
       // backdropColor='transparent'
        style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'transparent' }}
      >
        <View style={{ height: 290,width:'90%', backgroundColor: Mycolors.BG_COLOR, borderRadius: 20,alignSelf:'center',bottom:'7%',borderColor:'#fff',borderWidth:0.5}}>
   
        <Image source={require('../../assets/driving.png')} style={{ width: 100, height: 100,alignSelf:'center',resizeMode:'contain',top:15}}></Image>

     <Text style={{textAlign:'center',color:'#60D244',fontSize:18,marginVertical:10,fontWeight:'500',marginTop:20}}>Ride Completed Successfully</Text>
     {/* <Text style={{textAlign:'center',color:Mycolors.TEXT_COLOR,fontSize:13,width:'80%',alignSelf:'center'}}>Reference site about Loream Ipsum,giving information on its origins, as well as a</Text> */}
     {/* <Text style={{textAlign:'center',color:Mycolors.TEXT_COLOR,fontSize:35,fontWeight:'bold',marginTop:30}}>${mapdata.bidamount}</Text> */}
     {/* <Text style={{textAlign:'center',color:Mycolors.ORANGE,fontSize:13,fontWeight:'bold',marginTop:30}}>Payable Amount</Text> */}
     <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',alignSelf:'center',width:'90%',height:45,backgroundColor:Mycolors.DrawerBGcolor,paddingHorizontal:14,top:5}}>
<Text style={{color:Mycolors.TEXT_COLOR,fontSize:14,fontWeight:'500'}}>Payable amount :</Text>
<Text style={{color:Mycolors.TEXT_COLOR,fontSize:24,fontWeight:'500',fontWeight:'bold'}}>${mapdata.bidamount}</Text> 
</View>
    <View style={{width:10,height:15}} />
     <MyButtons title="Close" padding={15} width={'87%'} borderRadius={50} alignSelf="center" press={()=>{props.navigation.navigate('Home')}} marginHorizontal={5} titlecolor={Mycolors.BG_COLOR}/>
     </View>
      </Modal>
 {My_Alert ? <MyAlert sms={alert_sms} okPress={()=>{setMy_Alert(false)}} /> : null }
      { loading ? <Loader /> : null }
    </SafeAreaView>
     );
  }
const styles = StyleSheet.create({

  container: {
    flex: 1,  
    backgroundColor:Mycolors.BG_COLOR
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
  
});
export default Home4