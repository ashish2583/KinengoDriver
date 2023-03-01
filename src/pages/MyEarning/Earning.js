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
import { baseUrl, login, requestPostApi, requestGetApi, driver_rides_history} from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';
// import Toast from 'react-native-simple-toast'
import MyAlert from '../../component/MyAlert';
import LinearGradient from 'react-native-linear-gradient'

const Earning = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const userdetaile  = useSelector(state => state.user.user_details)
  const mapdata = useSelector(state => state.maplocation)
  const [email, setemail] = useState('')
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
      return 'Cancel'
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
      <Text style={styles.totalAmount}>${userdetaile.wallet_detail}</Text>
    </View>

    <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
      <TouchableOpacity style={styles.headerButton}>
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
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                        <View style={{width:15,height:15,borderRadius:10,backgroundColor:getColor(item.status)}} />
                        <Text style={{color:getColor(item.status),fontSize:14,left:5}}>{getStatus(item.status)}</Text>
                      </View>
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
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: Mycolors.BG_COLOR,
    top: 1
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


