import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, ScrollView, Alert, TextInput } from 'react-native';
import MyButtons from '../../component/MyButtons';
import MyInputText from '../../component/MyInputText';
import { dimensions, Mycolors } from '../../utility/Mycolors';
import {CodeField,Cursor,useBlurOnFulfill,useClearByFocusCell,} from 'react-native-confirmation-code-field';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  useSelector, useDispatch } from 'react-redux';
import { setLoading,saveUserToken,saveUserResult,saveCorporateUserResult} from '../../redux/actions/user_action';
import {baseUrl,login,auth_send_otp,verify_otp,requestPostApi} from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';
import * as types from '../../redux/types'

// import Toast from 'react-native-simple-toast'
import MyAlert from '../../component/MyAlert';
import LinearGradient from 'react-native-linear-gradient'

const CELL_COUNT = 4;
const Otp = (props) => {
  const dispatch =  useDispatch();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [mprops, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [loading,setLoading]=useState(false)
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [resendOtps,setresendOtps]=useState('')
  const SendOtps = async (f) => {
    setLoading(true)
    var data={
      "phone": props.route.params.number,
      "device_id": "Acghvhhjv67bjkhln67vIvg778bhjcycD",
      "user_type": 4
       } 
    const { responseJson, err } = await requestPostApi(auth_send_otp, data, 'POST', '')
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (responseJson.headers.success == 1) {
      setalert_sms('OTP Sent Successfully')
      setresendOtps(responseJson.body.otp)
      setValue('')
      setMy_Alert(true)
    } else {
       setalert_sms(err)
       setMy_Alert(true)
    }
}

  const optclicked=async()=>{
    if(props.route.params.otp==value || resendOtps==value){
      var data={
          "phone": props.route.params.number,
          "otp": value
        }
        console.log("data",data);
        setLoading(true)
   const{responseJson,err}  = await requestPostApi(verify_otp,data,'POST','') 
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (responseJson.headers.success == 1) {
      if(props.route.params.from=='forgotPassword'){
        props.navigation.navigate('ResetPassword')
       }else if (props.route.params.from=='Login'){
        LoginPressed(responseJson.body)
       }else{
        dispatch( 
          {
          type:types.AUTHTOKEN,
          auth_token:responseJson.body
          }
          )
          props.navigation.navigate('SignUp')
       }
      
    } else {
       setalert_sms(err)
       setMy_Alert(true)
           }
  }else{
    Alert.alert("Please Enter OTP")

  } 
  }

  const LoginPressed=(data)=>{
    AsyncStorage.setItem("kinengoDriver",JSON.stringify(data));
    dispatch(saveUserResult(data))
   }

     return(
    <SafeAreaView style={styles.container}>
      
       <MyButtons title={props.route.params.from=='forgotPassword' ? "Verification Code" :"Sign Up"} height={55} width={'100%'} alignSelf="center" imgpress={() => { props.navigation.goBack() }} marginHorizontal={20} 
       titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} img='left' imgtop={16} imgleft={10} imgheight={20} imgwidth={25}/>

    <ScrollView style={{ paddingHorizontal: 20 }}>
     
        <Text style={{ marginTop: '15%', fontSize: 25, color: Mycolors.TEXT_COLOR ,textAlign:'center'}}>{props.route.params.from=='email' ? 'Verify Email Address': props.route.params.from=='phone' ? 'Verify Phone Number' : props.route.params.from=='forgotPassword' ? 'Verification Code' : ''}</Text>
        <Text style={{ marginTop: 15, fontSize: 13, color: Mycolors.TEXT_COLOR,textAlign:'center' }}>{props.route.params.from=='email' ? 'Please enter 4 digit verification code we sent to your register Email' : props.route.params.from=='phone' ? 'Please enter 4 digit verification code we sent to your  Phone Number' : props.route.params.from=='forgotPassword' ? 'Please enter 4 digit verification code we sent to your register Email and Phone Number' : ''} OTP {props.route.params.otp}</Text>

        <View style={{width:'100%',height:100,marginTop:20,zIndex:999}}>
          <CodeField
        ref={ref}
        {...mprops}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        // placeholder="-"
        // placeholderTextColor={Mycolors.TEXT_COLOR}
        renderCell={({index, symbol, isFocused}) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      /> 
      </View>

 <View style={{flexDirection:'row',alignSelf:'center',marginVertical:20}}>
        <Text style={[styles.textStyle, { color: Mycolors.TEXT_COLOR }]}
          onPress={() => {  }}>Didn't get OTP?</Text>
          <Text style={[styles.textStyle, { color: Mycolors.signupButton ,textDecorationLine: 'underline'}]}
          onPress={() => { SendOtps() }}> Resend</Text>
      </View>
<MyButtons title="Verify" height={45} width={'100%'} borderRadius={5} press={()=>{
 optclicked()
}} 
   titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.signupButton} fontWeight={'600'} fontSize={14} marginVertical={20}/>
   

        </ScrollView>
       
  
 {My_Alert ? <MyAlert sms={alert_sms} okPress={()=>{setMy_Alert(false)}} /> : null }
  { loading ? <Loader /> : null }

    </SafeAreaView>
     );
  }
const styles = StyleSheet.create({

  container: {
    flex: 1,  
   // backgroundColor:Mycolors.DrawerBGcolor
  },
  root: {padding: 20, minHeight: 300},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: Mycolors.TEXT_COLOR,
    // borderWidth: 1,
    backgroundColor:Mycolors.OTPBOX_Color,

  },
  cellText: {
    color: Mycolors.BTN_LINEAR_START_COLOR,
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    // borderBottomColor: '#007AFF',55
    // borderBottomWidth: 2,
    backgroundColor:Mycolors.BG_COLOR
  },
});
export default Otp