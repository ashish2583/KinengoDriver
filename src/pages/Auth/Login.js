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
import { baseUrl, login, requestPostApi } from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';
// import Toast from 'react-native-simple-toast'
import MyAlert from '../../component/MyAlert';
import LinearGradient from 'react-native-linear-gradient'

const Login = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const mapdata = useSelector(state => state.maplocation)
  const [email, setemail] = useState('')
  const [pass, setpass] = useState('')
  const[passView,setPassView]=useState(true)
  const [mobile, setmobile] = useState('')
   const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')

  useEffect(()=>{
   
  },[]) 

  const Login_Pressed=(data)=>{
    AsyncStorage.setItem("kinengoDriver",JSON.stringify(data));
    dispatch(saveUserResult(data))
   }

  const LoginPressed = async () => {
    
    if(mobile==''){
      Alert.alert('Enter Mobile Number');
    }
    else {
      setLoading(true)
      var data={
        "phone": mobile,
        "device_id": "Acghvhhjv67bjkhln67vIvg778bhjcycD"
          }
      const { responseJson, err } = await requestPostApi(login, data, 'POST', '')
      setLoading(false)
      console.log('the res==>>', responseJson)
      if (responseJson.headers.success == 1) {
        props.navigation.navigate('Otp',{otp:responseJson.body.otp,number:mobile,c_code:'+91',from:'Login'})
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
       <MyButtons title="Sign In" height={55} width={'100%'} alignSelf="center" imgpress={() => { props.navigation.goBack() }} marginHorizontal={20} 
       titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} img='left' imgtop={16} imgleft={10} imgheight={20} imgwidth={25}/>

      <ScrollView style={{ paddingHorizontal: 20 }}>
        

        <Text style={{ marginTop: '15%', fontSize: 25, color: Mycolors.TEXT_COLOR }}>Welcome</Text>
        <Text style={{ marginTop: 15, fontSize: 13, color: Mycolors.TEXT_COLOR }}>Please sign in to continue.</Text>


        <View style={{  width: dimensions.SCREEN_WIDTH - 40 ,marginTop:50}}>
         
          <TextInput
            value={mobile}
            onChangeText={(text) => {
              setmobile(text)
            }}
            placeholder="Mobile Number"
            keyboardType='number-pad'
            placeholderTextColor={Mycolors.GrayColor}
            style={styles.input}
          />

        </View>

        {/* <View style={{  width: dimensions.SCREEN_WIDTH - 40 ,marginTop:15}}>
         
            <TextInput
              value={pass}
              onChangeText={(text) => {
                setpass(text)
              }}
              placeholder="Password"
              placeholderTextColor={Mycolors.GrayColor}
              style={[styles.input,{paddingRight: 50}]}
              secureTextEntry={passView ? true : false}
            />
            <View style={{position:'absolute',right:10,top:18}}>
              <TouchableOpacity onPress={()=>{setPassView(!passView)}}>
              <Image source={passView ? require('../../assets/hide.png') : require('../../assets/view.png')} style={{ width: 35, height: 22}} />
              </TouchableOpacity>
            </View>
          </View> */}
     {/* <Text style={{ marginTop: 25, fontSize: 13, color: Mycolors.TEXT_COLOR,textAlign:'center' }} onPress={()=>{props.navigation.navigate('ForgotPassword')}}>Forgot Password?</Text> */}
     <Text style={{ marginTop: 25, fontSize: 13, color: Mycolors.TEXT_COLOR,textAlign:'center' }} onPress={()=>{}}></Text>

      <MyButtons title="Sign In" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={()=>{LoginPressed()}} marginHorizontal={20} 
      titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.signupButton} marginVertical={20} />
     
     <Text style={{ marginTop: 15, fontSize: 13, color: Mycolors.GrayColor,textAlign:'center' }}>--------or--------</Text>
 
<View style={{width:'100%',height:40,flexDirection:'row',alignSelf:'center',justifyContent:'center',marginTop:15}}>
<TouchableOpacity>
  <Image source={require('../../assets/gh.png')} style={{ width: 70, height: 70}} />
</TouchableOpacity>
<TouchableOpacity>
<Image source={require('../../assets/facebook.png')} style={{ width: 70, height: 70}} />
</TouchableOpacity>
<TouchableOpacity>
<Image source={require('../../assets/googlelogin.png')} style={{ width: 70, height: 70}} />
</TouchableOpacity>
</View>

      </ScrollView>
      <View style={{flexDirection:'row',alignSelf:'center',top:-30}}>
        <Text style={[styles.textStyle, { color: Mycolors.TEXT_COLOR }]}
          onPress={() => { resetStacks('SignUp') }}>New user?</Text>
          <Text style={[styles.textStyle, { color: Mycolors.signupButton ,textDecorationLine: 'underline'}]}
          onPress={() => { resetStacks('SignUp') }}> Register now</Text>
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
export default Login


