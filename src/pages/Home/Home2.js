import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, Linking, TextInput, FlatList, TouchableOpacity, Platform, Alert, PermissionsAndroid, ScrollView, Keyboard, BackHandler } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, AnimatedRegion, Animated } from 'react-native-maps';
import { Mycolors, dimensions } from '../../utility/Mycolors';
import Geolocation from "react-native-geolocation-service";
import Geocoder from "react-native-geocoding";
import MapViewDirections from 'react-native-maps-directions';
import { GoogleApiKey } from '../../WebApi/GoogleApiKey';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import { setCurentPosition, setDriverRideStatus, setNotificationData, setDestnationAddress, setStartPosition, setDestnationPosition } from '../../redux/actions/latLongAction';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { baseUrl, driver_ride_status, booking_get_bid_status, driver_fuel_cost, booking_bid_price, requestGetApi, requestPostApi } from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';
import HomeHeader from '../../component/HomeHeader';
import MyAlert from '../../component/MyAlert'
import Toggle from "react-native-toggle-element";
import MyButtons from '../../component/MyButtons';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore'
import Toast from 'react-native-toast-message';
import openMap from 'react-native-open-maps';

Geocoder.init(GoogleApiKey);

const Home2 = (props) => {
  const dispatch = useDispatch();
  const person_Image = "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  const mapdata = useSelector(state => state.maplocation)
  const userdetaile = useSelector(state => state.user.user_details)
  const dashboard = useSelector(state => state.user.dashdata)
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
  const [c_cord, setC_Cord] = useState(false)
  const [myaddress, setMyaddress] = useState('')
  const [bid, setBid] = useState('')
  const [biddata, setbiddata] = useState([])
  const [bidCheck, setBidCheck] = useState(false)
  const [loading, setLoading] = useState(false)
  const [estTime, setEstTime] = useState('')
  const [estDistance, setEstDistance] = useState('')
  const [myreson, setmyReson] = useState({
    latitude: 26.4788922,
    longitude: 83.7454171,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [distance, setdistance] = useState('')
  const [fuleCost, setfuleCost] = useState('');
  const [fuleModle, setfuleModle] = useState(false);
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [toggleValue, setToggleValue] = useState(false);
  const [loder, setLoder] = useState(false)
  const [modlevisual, setmodlevisual] = useState(false);
  const [dateopen, setDateOpen] = useState(false);
  const [datevalue, setDateValue] = useState(mapdata.driverridestatus);
  const [ridedate, setRideDate] = useState([
    // { label: 'select Job Status', value: '' },
    { label: 'On the way to restaurant', value: '0' },
    { label: 'Waiting at the restaurant', value: '3' },
    // {label: 'Food is not prepared', value: '4'},
    { label: 'On the way to deliver', value: '5' },
    // {label: 'On Hold', value: '5'},
    { label: 'Cancel', value: '1' },
    // {label: 'Not recived', value: '6'},
    { label: 'Delivered', value: '2' },
  ]);

  const [watch, setWatch] = useState('1')
  const [curentCord, setCurentCord] = useState({
    latitude: 26.4788922,
    longitude: 83.7454171,
  })
  const [angle, setangle] = useState(45)
  const [drvRideStatus, setdrvRideStatus] = useState('')
  const [reason, setReason] = useState('')
  useEffect(() => {
    frist()
    getPosition()
    calculateTravelTime2()
    console.log('mapdata.notificationdata', mapdata.notificationdata);
    // setDateValue(mapdata.driverridestatus)
    statusLable(mapdata.driverridestatus)
  }, [])

   useEffect(
    () =>
      props.navigation.addListener('beforeRemove', (e) => {
        if(datevalue == '1' || datevalue == '2'){
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Toast.show({text1:"Please deliver this order to receive new orders."})
       }),
    [props.navigation, datevalue]
  );
  //function : get api
  const googleGetApi = async (googleUrl = '') => {
    const response = await fetch(googleUrl, {
      method: "GET",
      body: "",
      headers: {},
    }
    )
    let responseJson = response.json();
    return { responseJson: responseJson, err: null }
  }
  const calculateTravelTime = async (originLat, originLong) => {
    const url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + originLat + "," + originLong + "&destinations=" + mapdata.destnationPosition.latitude + "," + mapdata.destnationPosition.longitude + "&mode=driving" + "&units=imperial&key=" + GoogleApiKey
    setLoading(true)
    const { responseJson, err } = await googleGetApi(url)
    setLoading(false)
    const promise1 = Promise.resolve(responseJson)
    promise1.then((value) => {
      console.log(value)
      console.log('calculateTravelTime responseJson', value);
      if (value.rows[0].elements[0].status === 'OK') {
        // value.rows[0].elements[0].duration['text']
        setEstTime(value.rows[0].elements[0].duration['text'])
      } else {
        // Alert.alert('Zero results found')
      }
    })
    // if(responseJson.rows[0].elements[0].status !== 'ZERO_RESULTS' || responseJson.rows[0].elements[0].status !== 'NOT_FOUND'){
    //   // responseJson.rows[0].elements[0].duration['text']
    //   setEstTime(responseJson.rows[0].elements[0].duration['text'])
    // }else{
    //   Alert.alert('Zero results found')
    // }
    console.log('calculateTravelTime res==>>', responseJson)
    if (responseJson.headers.success == 1) {
    } else {
    }

  }
  const calculateTravelTime2 = async () => {
    const url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + mapdata.notificationdata.lattitude + "," + mapdata.notificationdata.longitude + "&destinations=" + mapdata.notificationdata.destination_lat + "," + mapdata.notificationdata.destination_long + "&mode=driving" + "&units=imperial&key=" + GoogleApiKey
    setLoading(true)
    const { responseJson, err } = await googleGetApi(url)
    setLoading(false)
    const promise1 = Promise.resolve(responseJson)
    promise1.then((value) => {
      console.log(value)
      console.log('calculateTravelTime2 responseJson', value);
      if (value.rows[0].elements[0].status === 'OK') {
        // value.rows[0].elements[0].duration['text']
        setEstDistance(value.rows[0].elements[0].distance['text']?.replace(' mi', ''))
      } else {
        // Alert.alert('Zero results found')
      }
    })
    console.log('calculateTravelTime2 res==>>', responseJson)
    if (responseJson.headers.success == 1) {
    } else {
    }

  }
  const statusLable = (val) => {
    if (val == 0) {
      setdrvRideStatus('On the way to restaurant')
    } else if (val == 1) {
      setdrvRideStatus('Cancel')
    } else if (val == 2) {
      setdrvRideStatus('Delivered')
    } else if (val == 3) {
      setdrvRideStatus('Waiting at the restaurant')
    } else if (val == 5) {
      setdrvRideStatus('On the way to deliver')
    } else {
      setdrvRideStatus('')
    }
  }

  const ChangeRideStatus = async (val) => {

    var data = {
      "driver_id": userdetaile.driver_id,
      "notes": val == '1' ? reason : '',
      "ride_id": mapdata.notificationdata.ride_id,
      // "ride_id": '4',
      "status": val,
    }
    if (val === '2') {
      data['ride_distance'] = estDistance
    }
    console.log('ChangeRideStatus data==>>', data)
    setLoading(true)
    const { responseJson, err } = await requestPostApi(driver_ride_status, data, 'POST', userdetaile.token)
    setLoading(false)
    console.log('ChangeRideStatus the res==>>', responseJson)
    if (responseJson.headers.success == 1) {
      dispatch(setDriverRideStatus(val))
      setDateValue(val)
      statusLable(val)
      setmodlevisual(false)
      if (val == '2' || val == '1') {
        props.navigation.navigate('Home')
      }
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  const frist = () => {
    if (watch == '1') {
      myposition()
      second()
    }
  }

  const second = () => {
    setTimeout(() => {
      frist()
    }, 5000)
  }

  const setDriverLocation = (id, location, angle) => {
    firestore()
      .collection('DriverLocation')
      .doc(id)
      .set({
        DriverId: id,
        Location: location,
        Angle: angle,
      })
      .then(() => {
        // console.log('User added!');
      });
  }

  const dialCall = (num) => {
    console.log('numbers',num);
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${' + num + '}';
    }
    else {
      phoneNumber = 'telprompt:${' + num + '}';
    }
    Linking.openURL(phoneNumber);
  };

  const myposition = () => {
    Geolocation.getCurrentPosition(
      position => {
        let My_cord = { latitude: position.coords.latitude, longitude: position.coords.longitude }
        //  console.log('asdfggh',My_cord);
        setCurentCord(My_cord)
        setangle(position.coords.heading)
        setmyReson({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
        dispatch(setCurentPosition(My_cord))
        setDriverLocation(userdetaile.driver_id.toString(), My_cord, position.coords.heading)
      },
      error => {
        console.log('The curent error is', error);
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      }
    );
  }
  const getPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        let My_cord = { latitude: position.coords.latitude, longitude: position.coords.longitude }
        //  console.log('asdfggh',My_cord);
        // setCurentCord(My_cord)
        // setangle(position.coords.heading)
        // setmyReson({
        //   latitude: position.coords.latitude, 
        //   longitude: position.coords.longitude,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // })
        calculateTravelTime(My_cord.latitude, My_cord.longitude)
        //   dispatch(setCurentPosition(My_cord))
        //  setDriverLocation(userdetaile.driver_id.toString(),My_cord,position.coords.heading)
      },
      error => {
        console.log('The curent error is', error);
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      }
    );
  }

  const resetStacks = (page) => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: page }],
      // routes:[NavigationActions.navigate({ routeName: page })],
      //  params: {items:data},
    });
  }

  const openModalVisual = () => {
    if (mapdata.driverridestatus == '2') {
      Alert.alert('Cannot change status because already delivered')
      return
    }
    else if (mapdata.driverridestatus == '1') {
      Alert.alert('Cannot change status because order is cancelled')
      return
    }
    setmodlevisual(true)
  }

  const LatlongTo_address = async() => {
    var latlongs=''
    if(datevalue=='5')
     {
      latlongs=mapdata.destnationPosition
     }else{
      latlongs=mapdata.startPosition
     }
    Geocoder.from(latlongs.latitude, latlongs.longitude)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        console.log('The address is', json.results[0].formatted_address);
        goToMap(addressComponent)
      })
      .catch(error => {
        console.warn(error)
      });
  }

  const goToMap=(add)=> {

    console.log('mapdata.startPosition', mapdata.startPosition);
   
    openMap(
      { latitude: curentCord.latitude,
         longitude: curentCord.longitude ,
         provider:'google',
        //  start:'Noida ,Uttar Pradesh,India',
        // end : 'Noida ,Uttar Pradesh,India',
        end:add,
        }
        );
   }
  const sendEmail = (myMail) => {
      console.log('sendEmail email', myMail);
      Linking.openURL(`mailto:${myMail}`) 
    }
  return (
    <SafeAreaView style={styles.container}>

      <HomeHeader height={60} paddingHorizontal={15}
        press1={() => { props.navigation.openDrawer() }} img1={require('../../assets/List.png')} img1width={25} img1height={25}
        press2={() => { }} img2={require('../../assets/Kinengo_Green.png')} img2width={95} img2height={20}
        press3={() => { }} img3={require('../../assets/Bell.png')} img3width={25} img3height={25} />

      <ScrollView style={{ paddingHorizontal: 15, flexGrow: 1 }} nestedScrollEnabled={true}>
        <View style={{
          borderRadius: 7,
          marginTop: 10,
          backgroundColor: '#fff',
          borderColor: Mycolors.ORANGE,
          borderWidth: 1,
          // shadowColor: 'rgba(0, 0, 0, 0.5)',
          // shadowOffset: {
          //   width: 0,
          //   height: 3
          // },
          // shadowRadius: 5,
          // shadowOpacity: 1.0,
          justifyContent: 'center',
          // elevation: 5,

        }}>
          <TouchableOpacity style={{
            width: '100%', height: 50, flexDirection: 'row',
            justifyContent: 'space-between', alignItems: 'center',

            paddingHorizontal: 10, borderRadius: 5, overflow: 'hidden'
          }} onPress={() => { }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/cuate.png')} style={{ width: 35, height: 35, }}></Image>
              <Text style={{ left: 15, color: Mycolors.TEXT_COLOR, fontSize: 13, fontWeight: 'bold' }}>DUTY</Text>
            </View>

            <Text style={{ color: 'green' }}>Online</Text>

          </TouchableOpacity>

        </View>

        <View style={{
          borderRadius: 15, marginTop: 25, backgroundColor: '#FAF9FB', justifyContent: 'center',
          // shadowColor: 'rgba(0, 0, 0, 0.5)',

          // shadowOffset: { width: 0, height: 3 }, shadowRadius: 5, shadowOpacity: 1.0, 
          // elevation: 5,
          width: '100%', padding: 15
        }}>

          <View style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 14, fontWeight: '600' }}>Order number</Text>
              <Text style={{ color: Mycolors.ORANGE, fontSize: 13, marginTop: 3 }}>{mapdata.notificationdata.id}</Text>
            </View>
            <TouchableOpacity onPress={openModalVisual} style={{ backgroundColor: '#F2F5DE', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, borderColor: '#ADC430', borderWidth: 0.6 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 14, fontWeight: '600' }}>Job Status</Text>
                <Image source={require('../../assets/green-arrow.png')} style={{ width: 18, height: 18, alignSelf: 'center', right: 0 }}></Image>
              </View>

              <Text style={{ color: Mycolors.ORANGE, fontSize: 13, }}>{drvRideStatus} </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', width: '100%', marginTop: 15 }}>
            <View style={{ width: 90, height: 90, borderRadius: 80, backgroundColor: '#000', marginRight: 10, alignItems: 'center', justifyContent: 'center' }}>
              <Image source={require('../../assets/cuate.png')} style={{ width: 35, height: 35, alignSelf: 'center' }}></Image>
            </View>

            <View style={{ flexDirection: 'column', width: '70%', justifyContent: 'flex-start', alignItems: "flex-start" }}>
              <Text style={{ fontSize: 14, color: Mycolors.TEXT_COLOR, textAlign: 'center', fontWeight: '600', marginTop: 5 }}>{mapdata.notificationdata.business_name}</Text>
              <View style={{ flexDirection: 'row', marginTop: 10, ajustifyContent: 'flex-start', alignItems: "flex-start" }}>
                <Text style={{ fontSize: 13, color: Mycolors.TEXT_COLOR, fontWeight: '600' }}>Address: </Text>

                <Text style={{ fontSize: 13, color: Mycolors.GrayColor, }}>{mapdata.notificationdata.address}</Text>
                <Image source={require('../../assets/layer_9.png')} style={{ width: 9, height: 12, alignSelf: 'center', left: 5 }}></Image>
              </View>
              {mapdata.notificationdata.rating !== null ?
                <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'flex-start', alignItems: "flex-start" }}>
                  <Image source={require('../../assets/Star.png')} style={{ width: 20, height: 20, alignSelf: 'center' }}></Image>
                  <Text style={{ fontSize: 13, top: 2, left: 5, color: Mycolors.TEXT_COLOR }}>3.8</Text>
                </View>
                :
                <View style={{ height: 10 }} />
              }
            </View>
          </View>


          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <MyButtons title2="Send Email" height={30} width={'45%'} borderRadius={5} 
            press={() => {
              sendEmail(mapdata.notificationdata.business_email)
             }}
              img={require('../../assets/Envelope.png')} imgleft={10} imgheight={20} imgwidth={20} 
              titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.ORANGE} fontWeight={'500'} fontSize={13} marginVertical={10} />

            <MyButtons title2="Call Restaurant" height={30} width={'45%'} borderRadius={5} press={() => {
              dialCall(mapdata.notificationdata.business_phone)
             }}
              img={require('../../assets/call.png')} imgleft={10} imgheight={20} imgwidth={20} tit2left={10}
              titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.GREEN} fontWeight={'500'} fontSize={13} marginVertical={10} />
          </View>

          {/* <View style={{width:'100%',flexDirection:'row',marginTop:10}}>
            <View>
              <Image source={require('../../assets/Group6430.png')} style={{ width: 35, height: 25, top: 2,left:3 }}></Image>
            </View>
            <View style={{width:dimensions.SCREEN_WIDTH-100,left:20}}>
              <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 12, fontWeight: '600', }}>Order Status:</Text>
           <View style={{flexDirection:'row'}} >
           <Text style={{color:Mycolors.TEXT_COLOR,fontSize:11,top:2}}>Order will be ready for pickup in 15 mins</Text>
           </View>
          </View>
        </View> */}

          {/* <View style={{ width: '100%', flexDirection: 'row', marginTop: 25 }}> */}

          {/* {mapdata.notificationdata.items !=undefined  ?
          mapdata.notificationdata.items.map((item, index) => {
              return (
                <>
                  <View>
                  <Image source={{uri:baseUrl+item.product_image} } style={{ width: 50, height: 50, top: -2, }}></Image>
                  </View>
                  <View style={{width:dimensions.SCREEN_WIDTH-100,left:16}}>
                  <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 12,}}>{item.product_name}</Text>
                  <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 12, fontWeight: '600',marginVertical:5 }}>$ {item.item_total}</Text>
                  <View style={{flexDirection:'row'}} >
                  <Text style={{color:Mycolors.TEXT_COLOR,fontSize:11,top:2}}>Est Time: 09 mins</Text>
                  </View>
                  </View>
                </>
              )
            }
            )
            : null
        } */}


          {/* </View> */}

        </View>

        <View style={{
          borderRadius: 15, marginTop: 25, backgroundColor: '#FAF9FB',
          // shadowColor: 'rgba(0, 0, 0, 0.5)',
          // shadowOffset: { width: 0, height: 3 }, shadowRadius: 5, shadowOpacity: 1.0, 
          justifyContent: 'center',
          // elevation: 5, 
          width: '100%',
        }}>


          <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 15, }}>
            <View style={{ height: 30, borderRadius: 15, flexDirection: 'row', alignItems: 'center', }}>
              <Image source={require('../../assets/images/profileimg.png')} style={{ width: 39, height: 39, top: 0, left: 3 }}></Image>
              <Text style={{ color: Mycolors.TEXT_COLOR, fontWeight: 'bold', fontSize: 14, top: 2, left: 9 }}>{mapdata.notificationdata.user_name}</Text>
            </View>

            <View style={{ height: 39, width: 80, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
              <MyButtons height={35} width={35} borderRadius={5} 
              press={() => {
                Linking.openURL(`mailto:${mapdata.notificationdata.emailid}`) 
               }}
                img={require('../../assets/Envelope.png')} imgheight={20} imgwidth={20}
                titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.ORANGE} />

              <MyButtons height={35} width={35} borderRadius={5} press={() => {
                dialCall(mapdata.notificationdata.phone)
              }}
                img={require('../../assets/call.png')} imgheight={20} imgwidth={20}
                titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.GREEN} />

            </View>

          </View>
          <View style={{ width: '100%', height: 0.5, backgroundColor: '#fee1be', marginTop: 30, top: -30 }} />


          <View style={{
            width: '97%',
            // height: 60,
            top: -25,
            //  flexDirection: 'row', 
            borderRadius: 10,
            padding: 10,
            alignSelf: 'center',
            backgroundColor: Mycolors.BG_COLOR,
            borderColor: '#ADC430', borderWidth: 0.6
          }}>


            <View style={{ width: '100%', height: 50, flexDirection: 'row' }}>
              <View>
                <Image source={require('../../assets/Clock.png')} style={{ width: 24, height: 27, top: 0, left: 3 }}></Image>
              </View>
              <View style={{ width: dimensions.SCREEN_WIDTH - 100, left: 15 }}>
                <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 14, }}>Est. Time</Text>
                <View style={{ flexDirection: 'row' }} >
                  <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 11, top: 5 }}>{estTime}</Text>
                </View>
              </View>
            </View>


            <View style={{ width: '100%', flexDirection: 'row' }}>
              <View>
                <Image source={require('../../assets/MapPin.png')} style={{ width: 24, height: 27, top: 0, left: 3 }}></Image>
              </View>
              <View style={{ width: dimensions.SCREEN_WIDTH - 100, left: 15 }}>
                <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 14, }}>Order Pickup Location</Text>
                <View style={{ flexDirection: 'row' }} >
                  <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 11, top: 5 }}>{mapdata.notificationdata.address}</Text>
                </View>
              </View>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', marginTop:15 }}>
              <View>
                <Image source={require('../../assets/MapPin.png')} style={{ width: 24, height: 27, top: 0, left: 3 }}></Image>
              </View>
              <View style={{ width: dimensions.SCREEN_WIDTH - 100, left: 15 }}>
                <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 14, }}>Order Drop Location</Text>
                <View style={{ flexDirection: 'row' }} >
                  <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 11, top: 5 }}>{mapdata.notificationdata.destination_address}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* <View style={{ width: '100%', height: 0.9, backgroundColor: '#fee1be', top: -9 }} /> */}
          <TouchableOpacity style={{ top: -15, width: '100%', backgroundColor: '#fee1be', borderRadius: 10, flexDirection: "row", justifyContent: 'space-between' }}
          onPress={()=>{LatlongTo_address()}}>
            <MyButtons title2="Navigate" height={30} width={'46%'} borderRadius={10} 
           // press={() => { props.navigation.navigate('Home3') }}
             press={() => { LatlongTo_address() }}
              img={require('../../assets/layer_9.png')} imgleft={25} imgheight={23} imgwidth={16} tit2left={-2}
              titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} fontWeight={'500'} fontSize={13} marginVertical={10} />
            <Image source={require('../../assets/green-arrow.png')} style={{ width: 18, height: 18, alignSelf: 'center', right: 20 }}></Image>
          </TouchableOpacity>

        </View>




        <View style={{
          borderRadius: 15, marginTop: 25, backgroundColor: '#fff', borderColor: '#ADC430', borderWidth: 0.8,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowOffset: { width: 0, height: 3 }, shadowRadius: 15, shadowOpacity: 0.6, justifyContent: 'center',
          elevation: 5, width: '100%', padding: 15, paddingLeft: 12
        }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 12, }}>Order Amount</Text>
            <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 12, }}>$ {parseFloat(Number(mapdata.notificationdata.paid_amount).toFixed(3))}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 12, }}>Tip Amount</Text>
            <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 12, }}>$ 0</Text>
          </View>

          <View style={{ width: '100%', height: 0.9, backgroundColor: '#fee1be', marginTop: 10 }} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13, fontWeight: '600' }}>Total Amount</Text>
            <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13, fontWeight: '600' }}>$ {parseFloat(Number(mapdata.notificationdata.paid_amount).toFixed(3))}</Text>
          </View>


          <View style={{ width: '100%', flexDirection: 'row', marginTop: 20 }}>
            <View>
              <Image source={require('../../assets/Grouph2.png')} style={{ width: 19, height: 27, top: 5, left: 3 }}></Image>
            </View>
            <View style={{ width: dimensions.SCREEN_WIDTH - 100, left: 20 }}>
              <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13, }}>Payment Status:: </Text>
              <View style={{ flexDirection: 'row' }} >
                <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 11, top: 2 }}>Amount Paid $ {parseFloat(Number(mapdata.notificationdata.paid_amount).toFixed(3))} via online</Text>
              </View>
            </View>
          </View>

        </View>

        <View style={{ width: '100%', height: 60, backgroundColor: 'transparent', marginTop: 10 }} />


      </ScrollView>




      {modlevisual ?
        <View style={{ width: dimensions.SCREEN_WIDTH, height: dimensions.SCREEN_HEIGHT, backgroundColor: 'rgba(0,0,0,0.4)', position: 'absolute', left: 0, top: 0 }}>

          <View style={{ height: datevalue === '1' ? 500 : 400, backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15, position: 'absolute', bottom: 0, width: '100%', borderColor: '#fff', borderWidth: 0.3, alignSelf: 'center' }}>
        <ScrollView>

            <View style={{ marginTop: 5, width: '100%', alignItems: 'flex-start', justifyContent: 'flex-start', paddingHorizontal: 20, paddingVertical: 20, borderTopLeftRadius: 15, borderTopRightRadius: 15, }}>
              <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 14, }}>Job </Text>
              <Text style={{ fontSize: 20, color: Mycolors.TEXT_COLOR, fontWeight: 'bold' }}>Status</Text>
            </View>

            <View style={{ position: 'absolute', right: 1, top: 25 }}>
              <Image resizeMode='cover' source={require('../../assets/Status-icon.png')} style={{ width: 85, height: 55, overflow: 'hidden', alignSelf: 'center', }}></Image>
            </View>
            <View style={{ width: '90%', marginTop: 15, zIndex: 999, borderColor: 'gray', borderWidth: 0.4, borderRadius: 5, alignSelf: 'center' }}>
              <DropDownPicker
                open={dateopen}
                value={datevalue}
                items={ridedate}
                setOpen={() => { setDateOpen(!dateopen) }}
                setValue={(v) => { setDateValue(v) }}
                setItems={(i) => { setRideDate(i) }}
                placeholder="Select Status"
                onChangeValue={(value) => {
                  setDateValue(value)
                }}
                // dropDownDirection="TOP"
               // listMode="MODAL"
                placeholderStyle={{
                  color: Mycolors.TEXT_COLOR,
                  // fontWeight: "bold"
                }}
                textStyle={{
                  color: Mycolors.TEXT_COLOR,
                }}
                style={{ borderColor: 'transparent', backgroundColor: Mycolors.BG_COLOR, }}
                containerStyle={{
                  borderColor: 'red',
                  // height:400
                }}
                disabledStyle={{
                  opacity: 0.5
                }}
                // maxHeight={400}
                dropDownContainerStyle={{
                   height:400,
                  backgroundColor: Mycolors.BG_COLOR == '#fff' ? '#fff' : "rgb(50,50,50)",
                  borderColor: 'transparent',
                  shadowColor: '#000000',
                  shadowOffset: {
                    width: 0,
                    height: 3
                  },
                  shadowRadius: 5,
                  shadowOpacity: 1.0,
                  elevation: 5,
                  // zIndex:999,
                 
                }}
              />
            </View>
            {datevalue === '1' ?
              <TextInput
                value={reason}
                onChangeText={(text) => {
                  setReason(text)
                }}
                placeholder="Enter reason for cancellation"
                placeholderTextColor={Mycolors.GrayColor}
                multiline
                style={[styles.input,{borderColor:'gray',borderWidth:0.3,height:100,borderRadius:0}]}
              /> : null}
            <View style={{ alignSelf: 'center', width: '90%', marginTop: 36 }}>
            <MyButtons title="Save" height={50} width={'100%'} borderRadius={5} press={() => {
                if (datevalue == '0') {
                  Toast.show({ text1: 'The changed status cannot be same as the previous one.'});
                  ChangeRideStatus(datevalue)
                  return
                }
                if (datevalue === '2') {
                  Toast.show({ text1: 'Order Delivered Successfully!' });
                  setmodlevisual(false)
                  ChangeRideStatus(datevalue)
                  return
                }
                if (datevalue === '3') {
                  Toast.show({ text1: 'Status has been changed to Waiting at restaurant' });
                  setmodlevisual(false)
                  ChangeRideStatus(datevalue)
                  return
                }
                if (datevalue === '5') {
                  Toast.show({ text1: 'Status has been changed to On the way to deliver' });
                  setmodlevisual(false)
                  ChangeRideStatus(datevalue)
                  return
                }
                if (datevalue == '1') {
                  if (reason === '') {
                    Toast.show({ text1: 'Please enter the reason for cancellation' });
                    setmodlevisual(false)
                    return
                  }
                  ChangeRideStatus(datevalue)
                }
                else {
                  ChangeRideStatus(datevalue)
                }
                setmodlevisual(false)
              }}
                titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.signupButton} fontWeight={'600'} fontSize={14} marginVertical={10} />



              <MyButtons title="Cancel" height={50} width={'100%'} borderRadius={5} press={() => { setmodlevisual(false) }}
                titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} fontWeight={'600'} fontSize={14} marginVertical={10} borderColor={'gray'} borderWidth={1}/>

            </View>



{datevalue === '1' ?
<View style={{width:100,height:300}}></View>
: 
<View style={{width:100,height:300}}></View>
}

            </ScrollView> 

          </View>

        </View>
        : null
      }


      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
      {loder ? <Loader /> : null}


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
    height: 55,
    width: '90%',
    alignSelf: 'center',
    marginTop: 15,
    fontSize: 16,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: Mycolors.BG_COLOR,
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
export default Home2