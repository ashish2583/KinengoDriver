/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, ScrollView, useColorScheme, Alert, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import MyButtons from '../../component/MyButtons';
import MyInputText from '../../component/MyInputText';
import { dimensions, Mycolors } from '../../utility/Mycolors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { saveUserResult, saveUserToken, setUserType } from '../../redux/actions/user_action';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { baseUrl, login, password_forgot, requestPostApi } from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';

import MyAlert from '../../component/MyAlert';
import LinearGradient from 'react-native-linear-gradient'
import { longPressHandlerName } from 'react-native-gesture-handler/lib/typescript/handlers/LongPressGestureHandler';

const ForgotPassword = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const mapdata = useSelector(state => state.maplocation)
  const [email, setemail] = useState('')
  const [pass, setpass] = useState('')
  const [passView, setPassView] = useState(true)
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')

  useEffect(() => {

  }, [])

  const Login_Pressed = (data) => {
    AsyncStorage.setItem("kinengoDriver", JSON.stringify(data));
    dispatch(saveUserResult(data))
  }

  const ResetPressed = async () => {

    if (email == '') {
      Alert.alert('Enter Valid Email Id');
    }
    else {
      setLoading(true)
      var data = {
        "emailid": email
      }
      const { responseJson, err } = await requestPostApi(password_forgot, data, 'POST', '')
      setLoading(false)
      console.log('the res==>>', responseJson)
      if (responseJson.headers.success == 1) {
        props.navigation.navigate('Otp', { otp: responseJson.body.otp, email: responseJson.body.email, from: 'forgotPassword' })
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
      <MyButtons title="Forgot Password" height={55} width={'100%'} alignSelf="center" imgpress={() => { props.navigation.goBack() }} marginHorizontal={20}
        titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} img='left' imgtop={16} imgleft={10} imgheight={20} imgwidth={25} />

      <ScrollView style={{ paddingHorizontal: 20 }}>


        <Text style={{ marginTop: '15%', fontSize: 25, color: Mycolors.TEXT_COLOR }}>Forgot Password</Text>
        <Text style={{ marginTop: 15, fontSize: 13, color: Mycolors.TEXT_COLOR }}>Enter Email or Phone Number associated with this Account</Text>


        <View style={{ width: dimensions.SCREEN_WIDTH - 40, marginTop: 50 }}>

          <TextInput
            value={email}
            onChangeText={(text) => {
              setemail(text)
            }}
            placeholder="Email Address or Phone Number"
            placeholderTextColor={Mycolors.GrayColor}
            style={styles.input}
          />

        </View>


        <MyButtons title="Reset Password" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => { ResetPressed() }} marginHorizontal={20}
          titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.signupButton} marginVertical={40} />
      </ScrollView>


      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
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
export default ForgotPassword

