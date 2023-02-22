/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, { useState,useEffect } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, ScrollView,useColorScheme, Alert, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import MyButtons from '../../component/MyButtons';
import MyInputText from '../../component/MyInputText';
import { dimensions, Mycolors } from '../../utility/Mycolors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { saveUserResult, saveUserToken, setUserType } from '../../redux/actions/user_action';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { baseUrl,auth_driver_signup,add_vichle, login, requestPostApi } from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';
// import Toast from 'react-native-simple-toast'
import MyAlert from '../../component/MyAlert';
import LinearGradient from 'react-native-linear-gradient'

const VehicleDetail = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [registrationNo, setregistrationNo] = useState('')
  const [chechisNo, setchechisNo] = useState('')
  const auth_token = useSelector(state => state.user.auth_token)
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')

  useEffect(()=>{
   
  },[]) 

  const Login_Pressed=(data)=>{
    AsyncStorage.setItem("kinengoDriver",JSON.stringify(data));
    dispatch(saveUserResult(data))
   }

   const signupPressed = async () => {
    if (registrationNo == '') {
      Alert.alert('Enter registration no');
    } else if (chechisNo == '') {
      Alert.alert('Enter chechis no');
    }  else {
      setLoading(true)
      var data = {
        "vichel_type": "",
        "vichel_rc": registrationNo,
        "vichel_number": "",
        "vichel_model": "",
        "chassis_number": chechisNo,
        "screen_name": 'VehicleDetail',
      }
      const { responseJson, err } = await requestPostApi(add_vichle, data, 'POST', auth_token.token)
      setLoading(false)
      console.log('the res==>>', responseJson)
      if (responseJson.headers.success == 1) {
        props.navigation.navigate('Success')
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




  return (
    <SafeAreaView style={styles.container}>
        {/* <LinearGradient
          colors={[Mycolors.BG_LINEAR_START_COLOR, Mycolors.BG_LINEAR_END_COLOR]}
          style={{flex: 1,height:dimensions.SCREEN_HEIGHT}}
         > */}
       <MyButtons title="Sign Up" height={55} width={'100%'} alignSelf="center" imgpress={() => { props.navigation.goBack() }} marginHorizontal={20} 
       titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} img='left' imgtop={16} imgleft={10} imgheight={20} imgwidth={25}/>

      <ScrollView style={{ paddingHorizontal: 20 }}>
        

        <Text style={{ marginTop: 20, fontSize: 25, color: Mycolors.TEXT_COLOR }}>Vehicle Details</Text>
        <Text style={{ marginTop: 15, fontSize: 13, color: Mycolors.TEXT_COLOR }}>Enter Details to Sign up</Text>
        <View style={{  width: dimensions.SCREEN_WIDTH - 40 ,marginTop:30}}>
         
         <TextInput
           value={registrationNo}
           onChangeText={(text) => {
             setregistrationNo(text)
           }}
           placeholder="Registration Number"
           placeholderTextColor={Mycolors.GrayColor}
           style={styles.input}
         />

       </View>

       <View style={{  width: dimensions.SCREEN_WIDTH - 40 ,marginTop:15}}>
         
         <TextInput
           value={chechisNo}
           onChangeText={(text) => {
             setchechisNo(text)
           }}
           placeholder="Chassis Number"
           placeholderTextColor={Mycolors.GrayColor}
           style={styles.input}
         />

       </View>

       <TouchableOpacity style={{  width: dimensions.SCREEN_WIDTH - 40 ,marginTop:15,height:50,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#FFEDB5',paddingHorizontal:13}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../../assets/submit1.png')} style={{ width:35,height:35}} />
       <Text style={{fontSize:13,color:Mycolors.LoginButton,marginLeft:10,top:8}}>Upload Driving License</Text>
        </View>
        <View style={{width:12,height:18,}}>
        <Image source={require('../../assets/Vector.png')} style={{ width: '100%', height: '100%'}} />
        </View>
       </TouchableOpacity>

       <TouchableOpacity style={{  width: dimensions.SCREEN_WIDTH - 40 ,marginTop:15,height:50,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#FFEDB5',paddingHorizontal:13}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../../assets/submit1.png')} style={{ width:35,height:35}} />
       <Text style={{fontSize:13,color:Mycolors.LoginButton,marginLeft:10,top:8}}>Upload Vehicle Registration</Text>
        </View>
        <View style={{width:12,height:18,}}>
        <Image source={require('../../assets/Vector.png')} style={{ width: '100%', height: '100%'}} />
        </View>
       </TouchableOpacity>


      <MyButtons title="Continue" height={45} width={'100%'} borderRadius={5} alignSelf="center" press={()=>{signupPressed()}} marginHorizontal={20} 
      titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.signupButton} marginVertical={20} />
     
    
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
});
export default VehicleDetail

