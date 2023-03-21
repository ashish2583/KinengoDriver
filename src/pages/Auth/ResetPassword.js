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
import { baseUrl, login, password_change, requestPostApi } from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';
// import Toast from 'react-native-simple-toast'
import MyAlert from '../../component/MyAlert';
import LinearGradient from 'react-native-linear-gradient'

const ResetPassword = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const mapdata = useSelector(state => state.maplocation)
  const [email, setemail] = useState('')
  const [pass, setpass] = useState('')
  const [cpass, setcpass] = useState('')
  const[passView,setPassView]=useState(true)
  const[cpassView,setcPassView]=useState(true)
   const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')

  useEffect(()=>{
    console.log("reset psswd:",props.route.params.emailid);
  },[]) 

  const Login_Pressed=(data)=>{
    AsyncStorage.setItem("kinengoDriver",JSON.stringify(data));
    dispatch(saveUserResult(data))
   }

  const LoginPressed = async () => {
    
    if (pass == '') {
      Alert.alert('Enter New Password');
    }else if (cpass == '') {
      Alert.alert('Enter Confirm Password');
    }
    else {
      setLoading(true)
      var data = {
        "emailid": props.route.params.emailid,
        "password" : pass,
        "confirm_password" : cpass
      }
      const { responseJson, err } = await requestPostApi(password_change, data, 'POST', '')
      setLoading(false)
      console.log('the res==>>', responseJson)
      if (responseJson.headers.success == 1) {
        Alert.alert('',responseJson.headers.message)
        props.navigation.navigate('Login')
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
       <MyButtons title="Change password" height={55} width={'100%'} alignSelf="center" imgpress={() => { props.navigation.goBack() }} marginHorizontal={20} 
       titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} img='left' imgtop={16} imgleft={10} imgheight={20} imgwidth={25}/>

      <ScrollView style={{ paddingHorizontal: 20 }}>
        

        <Text style={{ marginTop: '15%', fontSize: 30, color: Mycolors.TEXT_COLOR ,fontWeight: 'bold'}}>Reset Password</Text>
        <Text style={{ marginTop: 3, fontSize: 13, color: Mycolors.TEXT_COLOR }}>Enter your new password and confirm it</Text>


        <View style={{  width: dimensions.SCREEN_WIDTH - 40 ,marginTop:50}}>
         
            <TextInput
              value={pass}
              onChangeText={(text) => {
                setpass(text)
              }}
              placeholder="New Password"
              placeholderTextColor={Mycolors.GrayColor}
              style={[styles.input,{paddingRight: 50}]}
              secureTextEntry={passView ? true : false}
            />
            <View style={{position:'absolute',right:17,top:18}}>
              <TouchableOpacity onPress={()=>{setPassView(!passView)}}>
              <Image source={passView ? require('../../assets/hide.png') : require('../../assets/view.png')} style={{ width: 22, height: 22}} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{  width: dimensions.SCREEN_WIDTH - 40 ,marginTop:15}}>
         
         <TextInput
           value={cpass}
           onChangeText={(text) => {
             setcpass(text)
           }}
           placeholder="Confirm Password"
           placeholderTextColor={Mycolors.GrayColor}
           style={[styles.input,{paddingRight: 50}]}
           secureTextEntry={cpassView ? true : false}
         />
         <View style={{position:'absolute',right:17,top:18}}>
           <TouchableOpacity onPress={()=>{setcPassView(!cpassView)}}>
           <Image source={cpassView ? require('../../assets/hide.png') : require('../../assets/view.png')} style={{ width: 22, height: 22}} />
           </TouchableOpacity>
         </View>
       </View>
       
      </ScrollView>
      <View style={{ position: "absolute", bottom: 20, width: '100%', paddingHorizontal: 20 }}>
      <MyButtons title="Save password" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={()=>{LoginPressed()}} marginHorizontal={20} 
      titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.signupButton} marginVertical={40} />
   </View>

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
export default ResetPassword

