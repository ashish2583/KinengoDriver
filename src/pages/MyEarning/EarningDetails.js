import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, TouchableOpacity, Platform, Alert, PermissionsAndroid, ScrollView ,Keyboard} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, AnimatedRegion, Animated } from 'react-native-maps';
import { Mycolors, dimensions } from '../../utility/Mycolors';
import Geolocation from "react-native-geolocation-service";
import Geocoder from "react-native-geocoding";
import MapViewDirections from 'react-native-maps-directions';
import { GoogleApiKey } from '../../WebApi/GoogleApiKey';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {  useSelector, useDispatch } from 'react-redux';
import {setCurentPosition,setBidAmount,setDestnationAddress,setStartPosition,setDestnationPosition} from '../../redux/actions/latLongAction';
import { Rating, AirbnbRating } from 'react-native-ratings';
import {baseUrl,booking_bid_ride,booking_get_bid_status,driver_fuel_cost,booking_bid_price,requestGetApi,requestPostApi} from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';
import HomeHeader from '../../component/HomeHeader';
import MyAlert from '../../component/MyAlert'
import Toggle from "react-native-toggle-element";
import MyButtons from '../../component/MyButtons';
import DropDownPicker from 'react-native-dropdown-picker';

Geocoder.init(GoogleApiKey);

const EarningDetails = (props) => {
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
  const [coordinates, setcoordinates] = useState([]);
  const [mymarker, setmymarker] = useState(null)
  const [mtype, setmType] = useState('standard')
  const [showtype, setShowType] = useState(false)
  const [destPos, setDestPos] = useState({ "latitude": 0, "longitude": 0 })
  const [startPos, setStartPos] = useState({ "latitude": 0, "longitude": 0 })
  const [c_cord,setC_Cord] = useState(false)
  const [myaddress,setMyaddress] = useState('')
  const [bid,setBid]=useState('')
  const [biddata,setbiddata]=useState([])
  const [bidCheck,setBidCheck]=useState(false)
  const [loading,setLoading]=useState(false)
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
  const [toggleValue, setToggleValue] = useState(false);
  const [loder,setLoder]=useState(false)
  const [modlevisual, setmodlevisual] = useState(false);
  const [dateopen, setDateOpen] = useState(false);
  const [datevalue, setDateValue] = useState(null);
  const [ridedate, setRideDate] = useState([
    {label: 'select Job Status', value: '00'},
    {label: 'Ongoing', value: '05'}, 
    {label: 'On Hold', value: '10'},
    {label: 'Not recived', value: '15'},
  ]);

  useEffect(() => {
    // 
  
  }, [])
 


const resetStacks=(page)=>{
  props.navigation.reset({
    index: 0,
    routes: [{name: page}],
    // routes:[NavigationActions.navigate({ routeName: page })],
    //  params: {items:data},
  });
 }


  return (
    <SafeAreaView style={styles.container}>
     <MyButtons title={props.route.params.data.time} height={55} width={'100%'} alignSelf="center" imgpress={() => { props.navigation.goBack() }} marginHorizontal={20} 
       titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} img='left' imgtop={16} imgleft={10} imgheight={20} imgwidth={25}/>

    
    <ScrollView style={{paddingHorizontal:15,flexGrow:1}} nestedScrollEnabled={true}>
   
    <View style={{borderRadius:15,marginTop:10,backgroundColor:'#fff',shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width:0, height:3}, shadowRadius: 5,shadowOpacity: 1.0,justifyContent: 'center',
    elevation: 5,width:'100%',padding:15}}>
        
      

<View style={{width:90,height:90,borderRadius:80,alignSelf:'center',backgroundColor:'#000',justifyContent:'center'}}>
<Image source={require('../../assets/cuate.png')} style={{width:35,height:35,alignSelf:'center'}}></Image>
</View>
<View style={{alignSelf:'center',flexDirection:'row',marginTop:5}}>
<Image source={require('../../assets/Star.png')} style={{width:20,height:20,alignSelf:'center'}}></Image>
<Text style={{fontSize:13,top:2,left:5,color:Mycolors.TEXT_COLOR}}>4.5</Text>
</View>

<Text style={{fontSize:14,color:Mycolors.TEXT_COLOR,textAlign:'center',fontWeight:'600',marginTop:5}}>Georie's Local</Text>
<View style={{flexDirection:'row',marginTop:10,alignSelf:'center'}}>
<Text style={{fontSize:13,color:Mycolors.TEXT_COLOR,fontWeight:'600'}}>Address: </Text>
<Text style={{fontSize:13,color:Mycolors.GrayColor,}}>Dallipur Tari Varanasi,UP,India</Text>
<Image source={require('../../assets/layer_9.png')} style={{width:9,height:12,alignSelf:'center',left:5}}></Image>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
<MyButtons title2="Send Message" height={30} width={'45%'} borderRadius={5} press={()=>{}} 
img={require('../../assets/Envelope.png')}imgleft={10} imgheight={20} imgwidth={20} tit2left={10}
   titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.ORANGE} fontWeight={'500'} fontSize={13} marginVertical={10}/>
 
 <MyButtons title2="Call Restaurant" height={30} width={'45%'} borderRadius={5} press={()=>{}} 
img={require('../../assets/call.png')}imgleft={10} imgheight={20} imgwidth={20} tit2left={10}
   titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.GREEN} fontWeight={'500'} fontSize={13} marginVertical={10}/>
 
</View>


        <View style={{width:'100%',flexDirection:'row',marginTop:10}}>
            <View>
              <Image source={require('../../assets/Group6430.png')} style={{ width: 35, height: 25, top: 2,left:3 }}></Image>
            </View>
            <View style={{width:dimensions.SCREEN_WIDTH-100,left:20}}>
              <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 12, fontWeight: '600', }}>Order Status:</Text>
           <View style={{flexDirection:'row'}} >
           <Text style={{color:Mycolors.TEXT_COLOR,fontSize:11,top:2}}>Order will be ready for pickup in 15 mins</Text>
           </View>
          </View>
        </View>

        <View style={{width:'100%',flexDirection:'row',marginTop:25}}>
            <View>
              <Image source={require('../../assets/images/Ellipse.png')} style={{ width: 50, height: 50, top: -2, }}></Image>
            </View>
            <View style={{width:dimensions.SCREEN_WIDTH-100,left:16}}>
            <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 12,}}>Spicy Momos</Text>
            <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 12, fontWeight: '600',marginVertical:5 }}>$19.89</Text>
           <View style={{flexDirection:'row'}} >
           <Text style={{color:Mycolors.TEXT_COLOR,fontSize:11,top:2}}>Est Time: 09 mins</Text>
           </View>
          </View>
        </View>
   
    </View>


    <View style={{borderRadius:15,marginTop:10,backgroundColor:'#fff',shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width:0, height:3}, shadowRadius: 5,shadowOpacity: 1.0,justifyContent: 'center',
    elevation: 5,width:'100%',}}>

        
<View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between',paddingHorizontal:15,paddingVertical:15,}}>
<View style={{height:30,borderRadius:15,flexDirection:'row',alignItems:'center',}}>
<Image source={require('../../assets/images/profileimg.png')} style={{ width: 30, height: 30, top: 5,left:3 }}></Image>
<Text style={{color:Mycolors.TEXT_COLOR,fontWeight:'bold',fontSize:14,top:4,left:9}}>Jane Doe</Text>
            </View>

<View style={{height:39,width:80, borderRadius:15,flexDirection:'row',justifyContent:'space-between'}}>
<MyButtons  height={35} width={35} borderRadius={5} press={()=>{}} 
img={require('../../assets/Envelope.png')} imgheight={20} imgwidth={20}
   titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.ORANGE}  />
 
<MyButtons height={35} width={35} borderRadius={5} press={()=>{}} 
img={require('../../assets/call.png')} imgheight={20} imgwidth={20} 
   titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.GREEN}   />
 
</View>

</View>
<View style={{ width: '100%', height: 0.5, backgroundColor: '#fee1be',marginTop:30,top:-30 }} />


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
              <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 14,}}>Est. Time</Text>
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
              <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 14, }}>Order Pickup Location</Text>
           <View style={{flexDirection:'row'}} >
           <Text style={{color:Mycolors.TEXT_COLOR,fontSize:11,top:5}}>dtv varanasi</Text>
           </View>
          </View>
</View>
        </View>

  <View style={{ width: '100%', height: 0.9, backgroundColor: '#fee1be',top:-9 }} />

  <MyButtons title2="Navigate" height={30} width={'46%'} borderRadius={5} press={()=>{props.navigation.navigate('Home3')}} 
  img={require('../../assets/layer_9.png')}imgleft={25} imgheight={23} imgwidth={16} tit2left={10}
  titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} fontWeight={'500'} fontSize={13} marginVertical={10}/>
 
      </View>




      <View style={{borderRadius:15,marginTop:10,backgroundColor:'#fff',shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width:0, height:3}, shadowRadius: 5,shadowOpacity: 1.0,justifyContent: 'center',
    elevation: 5,width:'100%',padding:15}}>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 12,}}>Order Amount</Text>
<Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 12, }}>$19.89</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:8}}>
<Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 12,}}>Tip Amount</Text>
<Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 12, }}>$1.89</Text>
</View>

<View style={{ width: '100%', height: 0.9, backgroundColor: '#fee1be',marginTop:10}} />

<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:8}}>
<Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13,fontWeight:'600'}}>Total Amount</Text>
<Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13,fontWeight:'600' }}>$1.89</Text>
</View>


<View style={{width:'100%',flexDirection:'row',marginTop:20}}>
            <View>
              <Image source={require('../../assets/Grouph2.png')} style={{ width: 19, height: 27, top: 5,left:3 }}></Image>
            </View>
            <View style={{width:dimensions.SCREEN_WIDTH-100,left:20}}>
              <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13, }}>Payment Status:: </Text>
           <View style={{flexDirection:'row'}} >
           <Text style={{color:Mycolors.TEXT_COLOR,fontSize:11,top:2}}>Amount Paid $20.89 via online</Text>
           </View>
          </View>
</View>

      </View>







      <View style={{ width: '100%', height:60, backgroundColor: 'transparent',marginTop:10}} />


     </ScrollView>
    

     

     {modlevisual ?
<View style={{width:dimensions.SCREEN_WIDTH,height:dimensions.SCREEN_HEIGHT,backgroundColor:'rgba(0,0,0,0.4)',position:'absolute',left:0,top:0}}>
        <View style={{ height: 300, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30,position: 'absolute', bottom: 0, width: '100%',borderColor:'#fff',borderWidth:0.3,alignSelf:'center' }}>

         
<View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between',paddingHorizontal:20,paddingVertical:20,borderTopLeftRadius: 30, borderTopRightRadius: 30,}}>
<Text style={{color:Mycolors.TEXT_COLOR,fontSize:14}}>Job Status</Text>
</View>

<View style={{width:'90%',marginTop:5,zIndex:999,borderColor:'gray',borderWidth:0.4,borderRadius:5,alignSelf:'center'}}> 
   <DropDownPicker
    open={dateopen}
    value={datevalue}
    items={ridedate}
    setOpen={()=>{setDateOpen(!dateopen)}}
    setValue={(v)=>{setDateValue(v)}}
    setItems={(i)=>{setRideDate(i)}}
    placeholder="Select Status"
    onChangeValue={(value) => {
      setDateValue(value)
     
    }} 
    placeholderStyle={{
      color: Mycolors.TEXT_COLOR,
      // fontWeight: "bold"
    }}
    textStyle={{
      color: Mycolors.TEXT_COLOR,
    }}
    style={{borderColor:'transparent',backgroundColor:Mycolors.BG_COLOR,}}
    containerStyle={{
      borderColor:'red'
    }} 
    disabledStyle={{
      opacity: 0.5
    }}
    dropDownContainerStyle={{
      backgroundColor: Mycolors.BG_COLOR =='#fff' ? '#fff' :"rgb(50,50,50)",
      borderColor:'transparent',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 1.0,
      elevation: 5,
    }}
  />
   </View>

<View style={{alignSelf:'center',width:'90%',marginTop:15}}>
  <MyButtons title="Save" height={40} width={'100%'} borderRadius={5} press={()=>{setmodlevisual(false)}} 
   titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.signupButton} fontWeight={'600'} fontSize={14} marginVertical={10}/>
    <MyButtons title="Cancel" height={40} width={'100%'} borderRadius={5} press={()=>{setmodlevisual(false)}} 
   titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} fontWeight={'600'} fontSize={14} marginVertical={10}/>
  
</View>





{/* </KeyboardAwareScrollView> */}

        </View>

</View>
        : null
      }
     
     


{My_Alert ? <MyAlert sms={alert_sms} okPress={()=>{setMy_Alert(false)}} /> : null }
{ loder ? <Loader /> : null }


    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Mycolors.BG_COLOR
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
  inputf: {
    height: 45,
    width: '100%',
    fontSize: 15,
    borderColor: null,
    borderRadius: 10,
    color: Mycolors.TEXT_COLOR,
    paddingLeft: 40,
    paddingRight: 5,

  },
  input: {
    height: 45,
    width: '100%',
    fontSize: 16,
    borderColor: null,
    borderRadius: 10,
    color: Mycolors.TEXT_COLOR,
     paddingLeft: 7,
    paddingRight: 5,
  },
  inputBoxStyle: {
    width: '100%',
    height: 47,
    borderRadius: 28,
    marginTop: 10,
    backgroundColor: Mycolors.BG_COLOR,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: 'center',
    elevation: 5
  },
  textcolor: {
    color: Mycolors.TEXT_COLOR
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
export default EarningDetails