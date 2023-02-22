import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TextInput, Keyboard, Alert, TouchableOpacity } from 'react-native';
import MyButtons from '../../component/MyButtons';
import MyInputText from '../../component/MyInputText';
import { dimensions, Mycolors } from '../../utility/Mycolors';
import MyAlert from '../../component/MyAlert';
// import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient'
import CountryPicker, { getAllCountries, getCallingCode, DARK_THEME } from 'react-native-country-picker-modal';
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import { SvgCssUri, Rect, Circle } from 'react-native-svg';
import { useSelector, useDispatch } from 'react-redux';
import { saveUserResult, saveUserToken, setUserType } from '../../redux/actions/user_action';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { baseUrl, login, auth_send_otp, driver_signup, requestPostApi } from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';
const SignUp = (props) => {
  const dispatch = useDispatch();
  const auth_token = useSelector(state => state.user.auth_token)
  const [flag, setFlag] = useState('http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg')
  const [code, setcode] = useState('+1')
  const [isvisuable, setisvisuable] = useState(false)
  const [fristname, setfristname] = useState('')
  const [lastname, setlastname] = useState('')
  const [dob, setdob] = useState('')
  const [number, setnumber] = useState('')
  const [email, setemail] = useState('')
  const [address, setaddress] = useState('')
  const [pass, setpass] = useState('')
  const [confPass, setconfPass] = useState('')
  const [passView, setPassView] = useState(true)
  const [cpassView, setcPassView] = useState(true)
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('auth_token', auth_token);
  })
  const SendOtps = async (f) => {
    setLoading(true)
    //   var data={
    //     "phone": number,
    //     "device_id": "Acghvhhjv67bjkhln67vIvg778bhjcycD",
    //     "user_type": 4
    // }
    var data = {
      "country_code": code,
      "phone": number,
      "device_id": "Acghvhhjv67bjkhln67vIvg778bhjcycD",
      "user_type": 4,
      "screen_name": "SignUp"
    }
    const { responseJson, err } = await requestPostApi(auth_send_otp, data, 'POST', '')
    setLoading(false)
    console.log('the res SendOtps==>>', responseJson)
    if (responseJson.headers.success == 1) {
      props.navigation.navigate('Otp', { otp: responseJson.body.otp, number: number, c_code: code, from: f })
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }

  }


  const signupPressed = async () => {
    // props.navigation.navigate('PersonalDetail') 
    var EmailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (fristname == '') {
      Alert.alert('Enter first name');
    } else if (lastname == '') {
      Alert.alert('Enter last name');
    } else if (number == '') {
      Alert.alert('Enter mobile number');
    } else if (email == '') {
      Alert.alert('Enter email address');
    } else if (!EmailReg.test(email)) {
      Alert.alert('Enter valid email');
    } else if (auth_token == null) {
      Alert.alert('Please Verify Phone');
    } else {
      setLoading(true)
      var data = {
        first_name: fristname,
        last_name: lastname,
        emailid: email,
        screen_name: 'SignUp',
        mobile: '+91' + number,
      }
      const { responseJson, err } = await requestPostApi(driver_signup, data, 'POST', auth_token.token)
      setLoading(false)
      console.log('the res==>>', responseJson)
      if (responseJson.headers.success == 1) {
        props.navigation.navigate('PersonalDetail')
      } else {
        setalert_sms(err)
        setMy_Alert(true)
      }
    }
  }

  const countryselect = (cod) => {
    setcode('+' + cod.callingCode.toString())
    var unc = getUnicodeFlagIcon(cod.cca2)
    console.log('the cca=>', unc)
    const url = "http://purecatamphetamine.github.io/country-flag-icons/3x2/" + cod.cca2 + ".svg"
    //setFlag(unc) //cca2
    console.log('URL==>', url)
    setFlag(url) //cca2
    console.log(cod)
  }

  const Mypicker = () => {
    return (
      <CountryPicker
        withEmoji
        withCallingCode
        onSelect={(cod) => countryselect(cod)}
        // withAlphaFilter
        // placeholder="CC"
        withFlagButton
        theme={DARK_THEME}
        visible={true}
        // withCountryNameButton={true}
        // renderFlagButton={(FlagButton['props'])}
        //   renderFlagButton={
        // // (prp)=>
        // {
        //   // console.log(prp)
        //     withEmoji=true,
        //     withFlagButton=true,
        //     // withCountryNameButton?: boolean, 
        //     // withCurrencyButton?: boolean,
        //     // withCallingCodeButton?: boolean,
        //     // withFlagButton?: boolean,
        //     // containerButtonStyle?: StyleProp<ViewStyle>,
        //      countryCode='+91',
        //     // placeholder: string,
        onClose={() => { setisvisuable(false) }}
      //   }
      //    } 
      />
    )
  }


  return (
    <SafeAreaView style={styles.container}>

      <MyButtons title="Sign Up" height={55} width={'100%'} alignSelf="center" imgpress={() => { props.navigation.goBack() }} marginHorizontal={20}
        titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} img='left' imgtop={16} imgleft={10} imgheight={20} imgwidth={25} />

      <ScrollView style={{ paddingHorizontal: 20 }}>


        <Text style={{ marginTop: '15%', fontSize: 25, color: Mycolors.TEXT_COLOR }}>Create your account</Text>
        <Text style={{ marginTop: 15, fontSize: 13, color: Mycolors.TEXT_COLOR }}>Enter details to sign up</Text>


        <View style={{ width: dimensions.SCREEN_WIDTH - 40, marginTop: 20 }}>

          <TextInput
            value={fristname}
            onChangeText={(text) => {
              setfristname(text)
            }}
            placeholder="Frist Name"
            placeholderTextColor={Mycolors.GrayColor}
            style={styles.input}
          />

        </View>
        <View style={{ width: dimensions.SCREEN_WIDTH - 40, marginTop: 20 }}>

          <TextInput
            value={lastname}
            onChangeText={(text) => {
              setlastname(text)
            }}
            placeholder="Last Name"
            placeholderTextColor={Mycolors.GrayColor}
            style={styles.input}
          />

        </View>
        <View style={{ width: dimensions.SCREEN_WIDTH - 40, marginTop: 15 }}>

          <TextInput
            value={email}
            onChangeText={(text) => {
              setemail(text)
            }}
            placeholder="Email"
            placeholderTextColor={Mycolors.GrayColor}
            style={styles.input}
          />
          {/* <View style={{ position: 'absolute', right: 10, top: 18 }}>
            <TouchableOpacity onPress={() => {
              props.navigation.navigate('Otp',{otp:'',number:number,c_code:'+91',from:'email'})
              }} style={{ backgroundColor: Mycolors.LoginButton, paddingHorizontal: 8, borderRadius: 3 }}>
              <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13 }}>Verify</Text>
            </TouchableOpacity>
          </View> */}
        </View>

        <View style={{ flexDirection: 'row', width: dimensions.SCREEN_WIDTH - 40, marginTop: 20, alignItems: 'center', borderRadius: 5, alignSelf: 'center', backgroundColor: "white",height:55 }}>

          <View style={{ width: 120, height: 50, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, zIndex: 999, }}>
            {isvisuable ?
              Mypicker()
              : null
            }
            <View style={{ position: 'absolute', height: 49, backgroundColor: "white", alignItems: 'center', zIndex: 999, flexDirection: 'row', width: 100, borderRadius: 30, padding: 10 }}>
              <TouchableOpacity onPress={() => { setisvisuable(true) }}
                style={{ width: 15, height: 27, flexDirection: 'row', alignItems: 'center' }}>
                {/* <SvgCssUri 
                                  width="100%"
                                  height="100%"
                                  uri={flag}
                                /> */}
                <Image style={{ width: 12, height: 12, }} source={"white" == '#fff' ? require('../../assets/arrow-point-to-down.png') : require('../../assets/arrow-point-to-down.png')} />
              </TouchableOpacity>
              {/* <ScrollView style={{   }}> */}
              <View style={{ justifyContent: "center", alignSelf: "center", alignItems: "center", marginLeft: 10 }}>
                <Text style={{ color: "black", fontWeight: 'bold', alignSelf: 'flex-end', }}>{code}</Text>
              </View>

              {/* </ScrollView> */}
            </View>
          </View>
          <View style={{ width: dimensions.SCREEN_WIDTH *0.60,flexDirection:"row",left:-20 }}>

            <TextInput
              value={number}
              onChangeText={(text) => {
                setnumber(text)
              }}
              placeholder="Phone"
              placeholderTextColor={Mycolors.GrayColor}
              keyboardType="number-pad"
              maxLength={10}
              style={{ height: 55,
                width: '100%',
                // fontSize: 12,
                borderColor: 'transparent',
                borderWidth: 1,
                borderRadius: 5,
                color: Mycolors.TEXT_COLOR,
                // paddingLeft: 10,
                // paddingRight: 10,
                backgroundColor: Mycolors.BG_COLOR,
                top: 0}}
            />
            <View style={{ position: 'absolute', right: 10, top: 18 }}>
              <TouchableOpacity onPress={() => {
                SendOtps('phone')
              }} style={{ backgroundColor: Mycolors.LoginButton, paddingHorizontal: 8, borderRadius: 3 }}>
                <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13 }}>Verify</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <MyButtons title="Continue" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => {
          // props.navigation.navigate('PersonalDetail') 
          signupPressed()
        }} marginHorizontal={20}
          titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.signupButton} marginVertical={20} />


      </ScrollView>


      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
      {loading ? <Loader /> : null}

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Mycolors.DrawerBGcolor
  },
  inputView: {
    width: dimensions.SCREEN_WIDTH - 40, marginTop: 10
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
    backgroundColor: Mycolors.BG_COLOR,
    top: 1
  },
});
export default SignUp