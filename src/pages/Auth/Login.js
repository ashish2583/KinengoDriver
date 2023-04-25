/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, ScrollView, useColorScheme, Alert, TextInput, Keyboard, TouchableOpacity, ImageBackground } from 'react-native';
import MyButtons from '../../component/MyButtons';
import MyInputText from '../../component/MyInputText';
import { dimensions, Mycolors } from '../../utility/Mycolors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { saveUserResult, saveUserToken, setUserType } from '../../redux/actions/user_action';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { baseUrl, login, requestPostApi, UserID_login } from '../../WebApi/Service'
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
  const [passView, setPassView] = useState(true)
  const [mobile, setmobile] = useState('')
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [modlevisual, setmodlevisual] = useState(false);

  useEffect(() => {

  }, [])

  const Login_Pressed = (data) => {
    AsyncStorage.setItem("kinengoDriver", JSON.stringify(data));
    dispatch(saveUserResult(data))
  }

  const LoginPressed = async () => {

    if (mobile == '') {
      Alert.alert('Enter Mobile Number');
    }
    else {
      setLoading(true)
      var data = {
        "phone": mobile,
        "device_id": mapdata.devicetoken
      }
      const { responseJson, err } = await requestPostApi(login, data, 'POST', '')
      setLoading(false)
      console.log('the res==>>', responseJson)
      if (responseJson.headers.success == 1) {
        props.navigation.navigate('Otp', { otp: responseJson.body.otp, number: mobile, c_code: '+91', from: 'Login' })
      } else {
        setalert_sms(err)
        setMy_Alert(true)
      }
    }
  }

  const LoginWithUserid = async () => {

    if (email == '') {
      Alert.alert('Enter Valid Email');
    } else if (pass == '') {
      Alert.alert('Enter Valid Password');
    }
    else {
      setLoading(true)
      var data = {
        "email": email,
        "password": pass,
        "device_id": mapdata.devicetoken
      }
      const { responseJson, err } = await requestPostApi(UserID_login, data, 'POST', '')
      setLoading(false)
      console.log('the res==>>', responseJson)
      if (responseJson.headers.success == 1) {
        // props.navigation.navigate('Login')
        LoginPress(responseJson.body)
      } else {
        setalert_sms(err)
        setMy_Alert(true)
      }
    }
  }
  const LoginPress = (data) => {
    AsyncStorage.setItem("kinengoDriver", JSON.stringify(data));
    dispatch(saveUserResult(data))
  }

  const resetStacks = (page) => {
    props.navigation.reset({
      index: 1,
      routes: [{ name: page }],
      params: { resentotp: false },
    });
    // props.navigation.navigate(page)
  }




  return (
    <SafeAreaView style={styles.container}>
      {/* <LinearGradient
          colors={[Mycolors.BG_LINEAR_START_COLOR, Mycolors.BG_LINEAR_END_COLOR]}
          style={{flex: 1,height:dimensions.SCREEN_HEIGHT}}
         > */}
      <ImageBackground
        source={require('../../assets/LoginBackground-image.png')}
        style={StyleSheet.absoluteFill}
        width="100%"
        height="100%"
      />
      <MyButtons title="Sign In" height={55} width={'100%'} alignSelf="center" imgpress={() => { props.navigation.goBack() }} marginHorizontal={20}
        titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} img='left' imgtop={16} imgleft={10} imgheight={20} imgwidth={25} />
      {/* <View style={{ borderColor: '#E8E7E9', borderWidth: 1, borderStyle: 'solid', }} /> */}

      <ScrollView style={{ paddingHorizontal: 20 }}>


        <Text style={{ marginTop: '20%', fontSize: 30, color: Mycolors.TEXT_COLOR, fontWeight: 'bold' }}>Welcome</Text>
        <Text style={{ marginTop: 0, fontSize: 13, color: Mycolors.TEXT_COLOR }}>Please sign in to continue.</Text>


        <View style={{ width: dimensions.SCREEN_WIDTH - 40, marginTop: 50 }}>

          <TextInput
            value={email}
            onChangeText={(text) => {
              setemail(text)
            }}
            placeholder="User Name"
           // keyboardType='number-pad'
            placeholderTextColor={Mycolors.GrayColor}
            style={styles.input}
          />

        </View>



        <View style={{ width: dimensions.SCREEN_WIDTH - 40, marginTop: 15 }}>

          <TextInput
            value={pass}
            onChangeText={(text) => {
              setpass(text)
            }}
            placeholder="Password"
            placeholderTextColor={Mycolors.GrayColor}
            style={[styles.input, { paddingRight: 50 }]}
            secureTextEntry={passView ? true : false}
          />
          <View style={{ position: 'absolute', right: 17, top: 18 }}>
            <TouchableOpacity onPress={() => { setPassView(!passView) }}>
              <Image source={passView ? require('../../assets/hide.png') : require('../../assets/view.png')} style={{ width: 22, height: 22 }} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{ marginTop: 25, fontSize: 13, color: Mycolors.TEXT_COLOR, textAlign: 'center' }} onPress={() => { props.navigation.navigate('ForgotPassword') }}>Forgot Password?</Text>
        {/* <Text style={{ marginTop: 0, fontSize: 13, color: Mycolors.TEXT_COLOR, textAlign: 'center' }} onPress={() => { }}></Text> */}


        <MyButtons title="Sign In" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => { LoginWithUserid() }} marginHorizontal={20} fontSize={16}
          titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.signupButton} marginVertical={20} />

        <Text style={{ marginTop: 1, fontSize: 13, color: Mycolors.GrayColor, textAlign: 'center' }}>--------or--------</Text>


        <MyButtons title="Login with Mobile Number" height={50} width={'100%'} borderRadius={5} borderColor={Mycolors.signupButton} borderWidth={0.6} alignSelf="center" press={() => { setmodlevisual(true) }} marginHorizontal={20} fontWeight={600}
          titlecolor={'black'} backgroundColor={Mycolors.BG_COLOR} marginVertical={20} fontSize={16} />
        {/* <TouchableOpacity onPress={() => { setmodlevisual(true) }} style={{}}>
          <Text style={{ marginTop: 20, fontSize: 13, color: 'blue', textAlign: 'center', textDecorationLine: "underline" }}>Login with Mobile Number</Text>
        </TouchableOpacity> */}
        {/* <View style={{ width: '100%', height: 40, flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', marginTop: 15 }}>
          <TouchableOpacity>
            <Image source={require('../../assets/gh.png')} style={{ width: 70, height: 70 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/facebook.png')} style={{ width: 70, height: 70 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/googlelogin.png')} style={{ width: 70, height: 70 }} />
          </TouchableOpacity>
        </View> */}

      </ScrollView>
      {/* <View style={{ flexDirection: 'row', alignSelf: 'center', top: -30 }}>
        <Text style={[styles.textStyle, { color: Mycolors.TEXT_COLOR }]}
          onPress={() => { resetStacks('SignUp') }}>New user ?</Text>

        <Text style={[styles.textStyle, { color: Mycolors.signupButton, fontWeight: '500' }]}
          onPress={() => { resetStacks('SignUp') }}> Register now</Text>


      </View> */}

      {modlevisual ?
        <View style={{ width: dimensions.SCREEN_WIDTH, height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', position: 'absolute', left: 0, bottom: 0, top: 0, right: 0, flex: 1 }}>
          <View style={{ height: dimensions.SCREEN_HEIGHT * 47 / 100, backgroundColor: '#F8F8F8', borderTopLeftRadius: 15, borderTopRightRadius: 15, position: 'absolute', bottom: 0, width: '99%', borderColor: '#fff', borderWidth: 0.3, alignSelf: 'center' }}>

            <TouchableOpacity onPress={(() => { setmodlevisual(false) })} style={{ position: 'absolute', right: 15, top: 15 }}>
              <Image resizeMode='cover' source={require('../../assets/cutRed.png')} style={{ width: 30, height: 30, overflow: 'hidden', alignSelf: 'center', }}></Image>
            </TouchableOpacity>

            <View style={{ position: 'absolute', right: 1, top: 75 }}>
              <Image resizeMode='cover' source={require('../../assets/mobile-icon.png')} style={{ width: 85, height: 42, overflow: 'hidden', alignSelf: 'center', }}></Image>
            </View>
            <Text style={{ marginLeft: 25, marginTop: '14%', fontSize: 21, color: '#B4B4B4', }}>Enter </Text>
            <Text style={{ marginLeft: 25, fontSize: 30, color: Mycolors.TEXT_COLOR, fontWeight: 'bold' }}>Mobile Number</Text>
            <View style={{ width: dimensions.SCREEN_WIDTH - 40, marginTop: 30, justifyContent: "center", alignItems: "center", marginHorizontal: 16, }}>

              <TextInput
                value={mobile}
                onChangeText={(text) => {
                  setmobile(text)
                }}
                placeholder="Mobile Number"
                keyboardType='number-pad'
                placeholderTextColor={Mycolors.GrayColor}
                style={{
                  height: 55,

                  width: '95%',
                  // fontSize: 12,
                  borderColor: '#B4B4B4',
                  borderWidth: 1,
                  borderRadius: 5,
                  color: Mycolors.TEXT_COLOR,
                  paddingLeft: 20,
                  paddingRight: 10,
                  backgroundColor: Mycolors.BG_COLOR,
                  top: 1
                }}
              />

            </View>

            <View style={{ marginTop: 10 ,}}>
              <MyButtons title="Verify with OTP" height={50} width={'87%'} borderRadius={5} alignSelf="center" press={() => { LoginPressed() }} marginHorizontal={20}
                titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.signupButton} marginVertical={20} />
            </View>





            <View style={{ width: '100%', height: 0.5, backgroundColor: '#fee1be', top: -5 }} />

          </View>

        </View>
        : null
      }
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
export default Login


