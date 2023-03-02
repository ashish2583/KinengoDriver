/* eslint-disable prettier/prettier */
import React, { useState,useEffect } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView,FlatList, ScrollView,useColorScheme, Alert, TextInput, Keyboard, TouchableOpacity, ImageBackground } from 'react-native';
import MyButtons from '../../component/MyButtons';
import MyInputText from '../../component/MyInputText';
import { dimensions, Mycolors } from '../../utility/Mycolors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { saveUserResult, saveUserToken, setUserType } from '../../redux/actions/user_action';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { baseUrl, login, requestPostApi,driver_ride_status, requestGetApi, driver_rides_history} from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';
import { GoogleApiKey } from '../../WebApi/GoogleApiKey';
// import Toast from 'react-native-simple-toast'
import MyAlert from '../../component/MyAlert';
import LinearGradient from 'react-native-linear-gradient'
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';

const Earning = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const userdetaile  = useSelector(state => state.user.user_details)
  const walletDetail  = useSelector(state => state.user.wallet_detail)
  const mapdata = useSelector(state => state.maplocation)
  const [showDeliveryStatusModal, setShowDeliveryStatusModal] = useState(false);
  const [dateopen, setDateOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('0');
  const [rideStatuses, setRideStatuses] = useState([
    {label: 'Select Status', value: '00'},
    {label: 'Ongoing', value: '0'}, 
    {label: 'Cancel', value: '1'},
    {label: 'Delivered', value: '2'},
    {label: 'Waiting at restaurant', value: '3'},
    {label: 'Food is not prepared', value: '4'},
  ]);
  const [email, setemail] = useState('')
  const [reason, setReason] = useState('')
  const [selectedRideId, setSelectedRideId] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedNotes, setSelectedNotes] = useState('')
  const [pass, setpass] = useState('')
  const[passView,setPassView]=useState(true)
   const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [upData,setupData]=useState([
    {
      id: '1',
      title: 'Hair Cut',
      desc:'',
      time:'10:00AM',
      
    },
    {
      id: '2',
      title: 'Shaving',
      desc:'',
      time:'10:30AM',
      
    },
    {
      id: '3',
      title: 'Facial',
      desc:'',
      time:'11:00AM',
      
    },
    {
      id: '4',
      title: 'Hair Color',
      desc:'',
      time:'11:30AM',
      
    },
    {
      id: '5',
      title: 'Hair wash',
      desc:'',
      time:'12:00PM',
      
    },
    {
      id: '6',
      title: 'Beard style',
      desc:'',
      time:'12:30PM',
      
    },
    {
      id: '7',
      title: 'Facial',
      desc:'',
      time:'01:00PM',
      
    },
  ])
  useEffect(()=>{
    getRideHistory()
  },[]) 
  const getRideHistory = async () => {
    setLoading(true)
    try {
      const { responseJson, err } = await requestGetApi(
        driver_rides_history,
        "",
        "GET",
        userdetaile.token
      );
      setLoading(false);
      console.log("getRideHistory the res==>>", responseJson);
      if (responseJson.headers.success == 1) {
        setupData(responseJson.body)
      } else {
      }
    } catch (error) {
      setLoading(false)
      console.log("onMoneyTransfer error", error);
    }
  };
  const Login_Pressed=(data)=>{
    AsyncStorage.setItem("kinengoDriver",JSON.stringify(data));
    dispatch(saveUserResult(data))
   }

  const LoginPressed = async () => {
    Login_Pressed()
    var EmailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email == '') {
      Alert.alert('Enter email address');
    } else if (!EmailReg.test(email)) {
      Alert.alert('Enter valid email');
    } else if (pass == '') {
      Alert.alert('Enter password');
    } else {
      setLoading(true)
      let formdata = new FormData();
      formdata.append("email", email); 
      formdata.append("password", pass);
      // formdata.append("user_group", 3);
      var data={
        email:email,
        password:pass
      }
      const { responseJson, err } = await requestPostApi(login, data, 'POST', '')
      setLoading(false)
      console.log('the res==>>', responseJson)
      if (responseJson.headers.success == 1) {
        Login_Pressed(responseJson.body)
      } else {
         setalert_sms(err)
         setMy_Alert(true)
      }
    }
  }

  const resetStacks = (page) => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: page }],
      params: { resentotp: false },
    });
  }

  const getStatus = (id) => {
    if(id == '0'){
      return 'Ongoing'
    } else if(id == '1'){
      return 'Cancelled'
    } else if(id == '2'){
      return 'Delivered'
    } else if(id == '3'){
      return 'Waiting at restaurant'
    } else if(id == '4'){
      return 'Food is not prepared'
    }
  }
  const getColor = (id) => {
    if(id == '0'){
      // return 'Ongoing'
      return Mycolors.GREEN
    } else if(id == '1'){
      // return 'Cancel'
      return Mycolors.RED
    } else if(id == '2'){
      // return 'Delivered'
      return Mycolors.GREEN
    } else if(id == '3'){
      // return 'Waiting at restaurant'
      return Mycolors.filtercolor
    } else if(id == '4'){
      return Mycolors.RED
    }
  }

  const ChangeRideStatus = async (status, notes = '') => {
    // Alert.alert('ChangeRideStatus')
    setLoading(false)
    var data = {
      "status": status,
      "notes": notes,
      "driver_id": userdetaile.driver_id,
      "ride_id": selectedRideId,
    }
    // console.log('ChangeRideStatus data', data);
    // return
    const { responseJson, err } = await requestPostApi(driver_ride_status, data, 'POST', userdetaile.token)
    setLoading(false)
    console.log('ChangeRideStatus the res==>>', responseJson)
    if (responseJson.headers.success == 1) {
      setShowDeliveryStatusModal(false)
      getRideHistory()
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  const openChangeStatusModal = (item) => {
    if(item.status == '2'){
      Alert.alert('Cannot change status because already delivered')
      return
    }
    else if(item.status == '1'){
      Alert.alert('Cannot change status because order is cancelled')
      return
    }
    setStatusValue(item.status)
    setSelectedRideId(item.ride_id)
    setSelectedStatus(item.status)
    setSelectedNotes(item.notes)
    setShowDeliveryStatusModal(true)
  }

  return (
    <SafeAreaView style={styles.container}>
        {/* <LinearGradient
          colors={[Mycolors.BG_LINEAR_START_COLOR, Mycolors.BG_LINEAR_END_COLOR]}
          style={{flex: 1,height:dimensions.SCREEN_HEIGHT}}
         > */}
       <MyButtons title="Ride History" height={55} width={'100%'} alignSelf="center" imgpress={() => { props.navigation.goBack() }} marginHorizontal={20} 
       titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} img='left' imgtop={16} imgleft={10} imgheight={20} imgwidth={25}/>


<View style={{width:'92%',height:125,alignSelf:'center'}}>
{/* <Image source={require('../../assets/TotalE.png')} style={{ width: '100%', height: '100%'}} /> */}
<ImageBackground source={require('../../assets/images/yellow-header-image.png')} style={{ width: '100%', height: 113}} >
  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',padding:20}}>
    <View>
      <Text style={styles.totalEarnings}>Total Earnings</Text>
      <Text style={styles.totalAmount}>${walletDetail}</Text>
    </View>

    <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
      <TouchableOpacity onPress={()=>{props.navigation.navigate('MonyTransfer')}} style={styles.headerButton}>
        <Text style={styles.buttonText}>Cash-Out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{props.navigation.navigate('TransectionHistory')}} style={[styles.headerButton, {marginLeft:15}]}>
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>
    </View>
  </View>
</ImageBackground>

</View>
<View style={{  width: dimensions.SCREEN_WIDTH - 40 ,alignSelf:'center'}}>
         
         <TextInput
           value={pass}
           onChangeText={(text) => {
             setpass(text)
           }}
           placeholder="Search by  Name, Order Number"
           placeholderTextColor={Mycolors.GrayColor}
           style={[styles.input,{paddingRight: 50}]}
         
         />
         <View style={{position:'absolute',right:1,top:1,backgroundColor:Mycolors.filtercolor,width:50,height:55,justifyContent:'center',borderRadius:5}}>
           <TouchableOpacity onPress={()=>{props.navigation.navigate('EarningFilter')}}>
           <Image source={require('../../assets/Vectorfilte.png')} style={{ width: 30, height: 30,alignSelf:'center'}} />
           </TouchableOpacity>
         </View>
       </View>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        

      <View style={{width:'100%',alignSelf:'center',marginTop:25}}>
          <FlatList
                  data={upData}
                //  horizontal={true}
                 showsVerticalScrollIndicator={false}
                  // numColumns={2}
                  renderItem={({item,index})=>{
                    return(
                        <View style={{width:'100%',padding:15,marginHorizontal:5,backgroundColor:'#fff',marginBottom:15,
                        shadowOffset: {
                        width: 0,
                        height: 3
                      },
                      shadowRadius: 1,
                      shadowOpacity: 0.3,
                     // justifyContent: 'center',
                      elevation: 5,borderRadius:15}}>
                     
                     <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',paddingHorizontal:5}}>
                      {/* <Text style={{color:Mycolors.filtercolor,fontSize:14,fontWeight:'600'}}>#JHF9085325466</Text> */}
                      <Text style={{color:Mycolors.filtercolor,fontSize:14,fontWeight:'600'}}>#{item.id}</Text>
                      <TouchableOpacity onPress={()=>openChangeStatusModal(item)} style={{flexDirection:'row', alignItems:'center'}}>
                        <View style={{width:15,height:15,borderRadius:10,backgroundColor:getColor(item.status)}} />
                        <Text style={{color:getColor(item.status),fontSize:14,left:5}}>{getStatus(item.status)}</Text>
                      </TouchableOpacity>
                        </View>

     <View style={{ width: '100%', height: 1, backgroundColor: '#fee1be', marginTop:10}} />

            <View style={{width:'100%',flexDirection:'row',marginVertical:5,paddingVertical:10}}>
            <View>
              <Image source={require('../../assets/images/Ellipse.png')} style={{ width: 50, height: 50, top: -2, }}></Image>
            </View>
            <View style={{width:dimensions.SCREEN_WIDTH-100,left:16,top:4}}>
            <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 12,}}>{item.name}</Text>
            <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 12, fontWeight: '600',marginVertical:5 }}>${item.amount}</Text>
          </View>
          </View>

          <View style={{ width: '100%', height: 1, backgroundColor: '#fee1be',}} />


                  <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',paddingHorizontal:5,marginTop:10}}>
                     <View style={{flexDirection:'row',top:13}}>
                       <Text style={{color:Mycolors.TEXT_COLOR,fontSize:13,fontWeight:'600'}}>Delivered Time: </Text>
                        {/* <Text style={{color:Mycolors.GrayColor,fontSize:13,left:5}}>34 Mins</Text> */}
                        <Text style={{color:Mycolors.GrayColor,fontSize:13,left:5}}>{item.ride_time}</Text>
                      </View>
                   
                      <View style={{}}>
                      <MyButtons title="View Details" height={30} width={110} borderRadius={15}  press={()=>{props.navigation.navigate('EarningDetails',{data:item})}} borderColor={Mycolors.filtercolor} borderWidth={1} 
                      titlecolor={Mycolors.filtercolor} backgroundColor={'transparent'} />
     
                      </View>
                        </View>


                </View>
                    )
                  }}
                  keyExtractor={item => item.id}
                />
         </View>


       
    
      </ScrollView>
   
         {My_Alert ? <MyAlert sms={alert_sms} okPress={()=>{setMy_Alert(false)}} /> : null }
      {loading ? <Loader /> : null}

      <Modal
        isVisible={showDeliveryStatusModal}
        swipeDirection="down"
        onBackdropPress={()=>setShowDeliveryStatusModal(false)}
        onSwipeComplete={(e) => {
          setShowDeliveryStatusModal(false)
        }}
        
        onModalShow={()=>{
          if(statusValue === '1'){
            setReason(selectedNotes)
          }
        }}
        onModalHide={()=>{setDateOpen(false); setReason(''); setStatusValue(selectedStatus)}}
        
          scrollTo={() => {}}
          scrollOffset={1}
          propagateSwipe={true}
        coverScreen={false}
        backdropColor='transparent'
        style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View style={{ height: '50%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
          {/* <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}> */}
          
          <View style={{height:400}}>
          <DropDownPicker
    open={dateopen}
    value={statusValue}
    items={rideStatuses}
    setOpen={() => {
      setDateOpen(!dateopen);
    }}
    setValue={(v) => {
      setStatusValue(v);
    }}
    setItems={(i) => {
      setRideStatuses(i);
    }}
    placeholder="Select Status"
    onChangeValue={(value) => {
      setStatusValue(value);
    }}
    placeholderStyle={{
      color: Mycolors.TEXT_COLOR,
      // fontWeight: "bold"
    }}
    textStyle={{
      color: Mycolors.TEXT_COLOR,
    }}
    style={{ zIndex:1,borderColor: "transparent", backgroundColor: Mycolors.BG_COLOR }}
    containerStyle={{
      borderColor: "red",
    }}
    disabledStyle={{
      opacity: 0.5,
    }}
    // labelStyle={{backgroundColor:'yellow'}}
    dropDownContainerStyle={{
      backgroundColor: Mycolors.BG_COLOR == "#fff" ? "#fff" : "rgb(50,50,50)",
      borderColor: "transparent",
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 5,
      shadowOpacity: 1.0,
      elevation: 5,
    }}
  />
  
  {statusValue === '1' ?
  <TextInput
    value={reason}
    onChangeText={(text) => {
      setReason(text)
    }}
    placeholder="Enter reason for cancellation"
    placeholderTextColor={Mycolors.GrayColor}
    style={styles.input}
  />:null}

  {/* <View style={{zIndex:-999,alignSelf: "center", width: "90%", position:'absolute', bottom:80  }}> */}
  <View style={{zIndex:-999,alignSelf: "center", width: "90%", marginTop:30 }}>
    <MyButtons
      title="Save"
      height={40}
      width={"100%"}
      borderRadius={5}
      press={() => {
        if(statusValue == '0'){
          Alert.alert('Cannot change status to Default status (Ongoing)')
          return
        }
        if(statusValue == '1'){
          if(reason === ''){
            Alert.alert('Enter reason for cancellation')
            return
          }
          ChangeRideStatus(statusValue,reason)
        }else{
          ChangeRideStatus(statusValue)
        }
        // setShowDeliveryStatusModal(false);
      }}
      titlecolor={Mycolors.BG_COLOR}
      backgroundColor={Mycolors.signupButton}
      fontWeight={"600"}
      fontSize={14}
      marginVertical={10}
    />
    <MyButtons
      title="Cancel"
      height={40}
      width={"100%"}
      borderRadius={5}
      press={() => {
        setShowDeliveryStatusModal(false);
      }}
      titlecolor={Mycolors.TEXT_COLOR}
      backgroundColor={"transparent"}
      fontWeight={"600"}
      fontSize={14}
      marginVertical={10}
    />
  </View>
  </View>
            {/* <View style={{width:100,height:100}} /> */}
            {/* </ScrollView> */}
           
            </View>
</Modal>

      {/* </LinearGradient> */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
   // backgroundColor: Mycolors.BG_LINEAR_END_COLOR
  },
  textStyle: {
    marginTop: 10,
    fontSize: 17,
    alignSelf: 'center',
    color: Mycolors.ORANGE,
  },
  input: {
    height: 55,
    width: '100%',
    // fontSize: 12,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    color: Mycolors.TEXT_COLOR,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop:20,
    backgroundColor: Mycolors.BG_COLOR,
    top: 1,
    zIndex:-999
  },
  totalEarnings:{
    fontSize:14,
    fontWeight:'800',
    lineHeight:18
  },
  totalAmount:{
    fontSize:26,
    fontWeight:'700',
    lineHeight:44
  },
  headerButton:{
    backgroundColor:'#fff',
    width:90,
    height:29,
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText:{
    color:Mycolors.filtercolor,
    fontSize:12,
    fontWeight:'400',
    lineHeight:20
  }
});
export default Earning


