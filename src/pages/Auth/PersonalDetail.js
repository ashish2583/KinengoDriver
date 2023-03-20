/* eslint-disable prettier/prettier */
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
import { baseUrl, login, auth_driver_signup, requestPostApi, common_countries, requestGetApi, common_state } from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';
// import Toast from 'react-native-simple-toast'
import MyAlert from '../../component/MyAlert';
import LinearGradient from 'react-native-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';

const PersonalDetail = (props) => {
  const dispatch = useDispatch();
  const auth_token = useSelector(state => state.user.auth_token)
  const [loading, setLoading] = useState(false)
  const [address, setaddress] = useState('')
  const [country, setcountry] = useState('')
  const [state, setstate] = useState('')
  const [city, setcity] = useState('')
  const [zip, setzip] = useState('')
  const [pass, setpass] = useState('')
  const [cpass, setcpass] = useState('')
  const [passView, setPassView] = useState(true)
  const [cpassView, setcPassView] = useState(true)
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')

  const [Countryitems, setCountryitems] = useState([]);
  const [opencountry, setopencountry] = useState(false);
  const [valuecountry, setvaluecountry] = useState('');
  const [Countrycode, setCountrycode] = useState('');

  const [openstate, setOpenstate] = useState(false);
  const [valuestate, setValuestate] = useState();
  const [Stateitems, setStateitems] = useState([]);

  useEffect(() => {
    countryclicked()
  }, [])


  const signupPressed = async () => {
    var EmailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (address == '') {
      Alert.alert('Enter address');
    } else if (Countrycode == '') {
      Alert.alert('Enter country');
    } else if (valuestate == '') {
      Alert.alert('Enter state');
    } else if (city == '') {
      Alert.alert('Enter city');
    } else if (zip == '') {
      Alert.alert('Enter zip code');
    } else if (pass == '') {
      Alert.alert('Enter password');
    } else if (cpass == '') {
      Alert.alert('Enter confirm password');
    } else if (cpass != pass) {
      Alert.alert('Password and confirm password should be same');
    } else {
      setLoading(true)
      var data = {
        "address": address,
        "country_id": Countrycode,
        "city": city,
        "state_id": valuestate,
        "zipcode": zip,
        "password": pass,
        "screen_name": 'PersonalDetail',
      }
      const { responseJson, err } = await requestPostApi(auth_driver_signup, data, 'POST', auth_token.token)
      setLoading(false)
      console.log('the res==>>', responseJson)
      if (responseJson.headers.success == 1) {
        props.navigation.navigate('VehicleDetail')
      } else {
        setalert_sms(err)
        setMy_Alert(true)
      }
    }
  }
  const countryclicked = async () => {

    setLoading(true)
    const { responseJson, err } = await requestGetApi(common_countries, 'GET')
    setLoading(false)
    console.log('the res countries==>>', responseJson)
    if (responseJson.headers.success == 1) {
      setCountryitems(responseJson.body)
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }

  }

  const stateclicked = async (ids) => {
    console.log("abjfgak//////", ids);

    setLoading(true)
    const { responseJson, err } = await requestGetApi(common_state + ids, '', 'GET', '')
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (responseJson.headers.success == 1) {
      setStateitems(responseJson.body)

    } else {
      setalert_sms(err)
      setMy_Alert(true)
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
      <MyButtons title="Sign Up" height={55} width={'100%'} alignSelf="center" imgpress={() => { resetStacks('SignUp') }} marginHorizontal={20}
        titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} img='left' imgtop={16} imgleft={10} imgheight={20} imgwidth={25} />

      <ImageBackground
        source={require('../../assets/LoginBackground-image.png')}
        style={StyleSheet.absoluteFill}
        width="100%"
        height="100%"
      />
      <ScrollView style={{ paddingHorizontal: 20 }}>


        <Text style={{ marginTop: 20, fontSize: 30, color: Mycolors.TEXT_COLOR ,fontWeight:'bold' }}>Personal Details</Text>
        <Text style={{ marginTop: 3, fontSize: 13, color: Mycolors.TEXT_COLOR }}>Enter Details to Sign up</Text>
        <View style={{ width: dimensions.SCREEN_WIDTH - 40, marginTop: 30 }}>

          <TextInput
            value={address}
            onChangeText={(text) => {
              setaddress(text)
            }}
            placeholder="Address"
            placeholderTextColor={Mycolors.GrayColor}
            style={styles.input}
          />

        </View>

        {/* <View style={{  width: dimensions.SCREEN_WIDTH - 40 ,marginTop:15}}>
         
         <TextInput
           value={country}
           onChangeText={(text) => {
             setcountry(text)
           }}
           placeholder="Country"
           placeholderTextColor={Mycolors.GrayColor}
           style={styles.input}
         />

       </View> */}
        <View style={{ width: dimensions.SCREEN_WIDTH - 40, marginTop: 15, zIndex: 2, alignSelf: 'center' }}>
          <DropDownPicker

            // onPress={() => countryclicked()}
            itemKey="value"
            open={opencountry}
            setOpen={setopencountry}
            items={Countryitems.map((item, id) => ({ label: item?.name, value: item?.id, id: item?.code }))}
            // setOpen={()=>{setDateOpen(!dateopen)}}
            // setValue={(v)=>{setDateValue(v)}}
            value={valuecountry}
            setValue={setvaluecountry}
            maxHeight={240}
            dropDownDirection="BOTTOM"
            listMode="MODAL"
            setItems={setCountryitems}
            placeholder="Select Country"
            placeholderTextColor={Mycolors.TEXT_COLOR}
            defaultValue={null}
            scrollViewProps={{
              decelerationRate: "medium", ScrollView: "#ffcc00"
            }}
            searchable={true}
            searchPlaceholder="Search Country..."
            searchContainerStyle={{
              borderBottomColor: "#dfdfdf"
            }}
            searchTextInputStyle={{
              color: "#000", borderColor: "#0000"
            }}
            onSelectItem={(itm) => {
              setCountrycode(itm.value)
              stateclicked(itm.value)

              console.log("yoyo item:", itm);
            }}
            // onChangeValue={(value) => {
            //   setDateValue(value)

            // }} 
            itemStyle={{ justifyContent: 'flex-start' }}
            placeholderStyle={{
              color: Mycolors.GrayColor,

              // fontWeight: "bold"
            }}
            textStyle={{
              color: Mycolors.TEXT_COLOR,
            }}
            style={{ borderColor: 'transparent', backgroundColor: Mycolors.BG_COLOR, paddingLeft: 18,paddingRight:15  }}
            containerStyle={{
              borderColor: 'red'
            }}
            disabledStyle={{
              opacity: 0.5
            }}
            dropDownContainerStyle={{
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
            }}
          />
        </View>

        {/* <View style={{ width: dimensions.SCREEN_WIDTH - 40, marginTop: 15 }}>

          <TextInput
            value={state}
            onChangeText={(text) => {
              setstate(text)
            }}
            placeholder="State"
            placeholderTextColor={Mycolors.GrayColor}
            style={styles.input}
          />

        </View> */}
        <View style={{ width: dimensions.SCREEN_WIDTH - 40, marginTop: 15, zIndex: 1, alignSelf: 'center' }}>
          <DropDownPicker
            // onPress={() => stateclicked()}
            open={openstate}
            setOpen={setOpenstate}
            items={Stateitems.map(item => ({ label: item?.name, value: item?.id }))}

            value={valuestate}
            setValue={setValuestate}
            maxHeight={240}
            dropDownDirection="BOTTOM"
            listMode="MODAL"
            setItems={setStateitems}
            placeholder="Select State"
            placeholderTextColor={Mycolors.TEXT_COLOR}
            defaultValue={null}
            scrollViewProps={{
              decelerationRate: "medium", ScrollView: "#ffcc00"
            }}
            searchable={true}
            searchPlaceholder="Search State..."
            searchContainerStyle={{
              borderBottomColor: "#dfdfdf"
            }}
            searchTextInputStyle={{
              color: "#000", borderColor: "#0000"
            }}
            // onSelectItem={(itm) => {
            //   setCountrycode(itm.value)

            //   console.log("yoyo item:", itm);
            // }}
            onChangeText={(item) => setValuestate(item)}
            itemStyle={{ justifyContent: 'flex-start' }}
            placeholderStyle={{
              color: Mycolors.GrayColor,

              // fontWeight: "bold"
            }}
            textStyle={{
              color: Mycolors.TEXT_COLOR,
              
            }}
            style={{ borderColor: 'transparent', backgroundColor: Mycolors.BG_COLOR, paddingLeft: 18,paddingRight:15 }}
            containerStyle={{
              borderColor: 'red'
            }}
            disabledStyle={{
              opacity: 0.5
            }}
            dropDownContainerStyle={{
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
            }}
          />
        </View>

        <View style={{ width: dimensions.SCREEN_WIDTH - 40, marginTop: 15 }}>

          <TextInput
            value={city}
            onChangeText={(text) => {
              setcity(text)
            }}
            placeholder="City"
            placeholderTextColor={Mycolors.GrayColor}
            style={styles.input}
          />

        </View>

        <View style={{ width: dimensions.SCREEN_WIDTH - 40, marginTop: 15 }}>

          <TextInput
            value={zip}
            onChangeText={(text) => {
              setzip(text)
            }}
            placeholder="Zip/pin code"
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
            placeholder="Create Password"
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

        <View style={{ width: dimensions.SCREEN_WIDTH - 40, marginTop: 15 }}>

          <TextInput
            value={cpass}
            onChangeText={(text) => {
              setcpass(text)
            }}
            placeholder="Confirm Password"
            placeholderTextColor={Mycolors.GrayColor}
            style={[styles.input, { paddingRight: 50 }]}
            secureTextEntry={cpassView ? true : false}
          />
          <View style={{ position: 'absolute', right: 17, top: 18 }}>
            <TouchableOpacity onPress={() => { setcPassView(!cpassView) }}>
              <Image source={cpassView ? require('../../assets/hide.png') : require('../../assets/view.png')} style={{ width: 22, height: 22 }} />
            </TouchableOpacity>
          </View>
        </View>

       

      </ScrollView>
      <View style={{ bottom: 10, width: '100%', paddingHorizontal: 20 }}>
        <MyButtons title="Continue" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => {
         
          signupPressed()
        }} marginHorizontal={20}
          titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.signupButton} marginVertical={20} />
</View>

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
export default PersonalDetail


