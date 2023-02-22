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

const TransectionFilter = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const mapdata = useSelector(state => state.maplocation)
  const [email, setemail] = useState('')
  const [pass, setpass] = useState('')
  const[select,setselect]=useState('1')
   const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')

  useEffect(()=>{
   
  },[]) 

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




  return (
    <SafeAreaView style={styles.container}>
      
       <MyButtons title="Filters" height={55} width={'100%'} alignSelf="center" imgpress={() => { props.navigation.goBack() }} marginHorizontal={20} 
       titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} img='left' imgtop={16} imgleft={10} imgheight={20} imgwidth={25}/>

      <ScrollView style={{ paddingHorizontal: 20 }}>
        

        <Text style={{ marginTop: 20, fontSize: 17, color: Mycolors.TEXT_COLOR }}>Please Select a date range of 7 days</Text>


        <View style={{  width: dimensions.SCREEN_WIDTH - 40 ,marginTop:50}}>
         
          <TextInput
            value={email}
            onChangeText={(text) => {
              setemail(text)
            }}
            placeholder="Start Date"
            placeholderTextColor={Mycolors.GrayColor}
            style={styles.input}
            editable={false}
          />
            <View style={{position:'absolute',right:10,top:18}}>
              <TouchableOpacity onPress={()=>{}}>
              <Image source={require('../../assets/calendar.png')} style={{ width: 25, height: 25}} />
              </TouchableOpacity>
            </View>
        </View>

        <View style={{  width: dimensions.SCREEN_WIDTH - 40 ,marginTop:15}}>
            <TextInput
              value={pass}
              onChangeText={(text) => {
                setpass(text)
              }}
              placeholder="End Date"
              placeholderTextColor={Mycolors.GrayColor}
              style={[styles.input,{paddingRight: 50}]}
              editable={false}
            />
            <View style={{position:'absolute',right:10,top:18}}>
              <TouchableOpacity onPress={()=>{}}>
              <Image source={require('../../assets/calendar.png')} style={{ width: 25, height: 25}} />
              </TouchableOpacity>
            </View>
          </View>
     <Text style={{ marginTop: 25, fontSize: 16, color: Mycolors.TEXT_COLOR,fontWeight:'600'}} >Order Type</Text>

<View style={{marginVertical:20}}>

<View style={{flexDirection:'row',marginTop:10}}>
<TouchableOpacity style={{width:25,height:25,backgroundColor:select=='1'? Mycolors.filtercolor : 'transparent',borderRadius:5,justifyContent:'center',borderColor:'gray',borderWidth:1}}
onPress={()=>{setselect('1')}}>
{select=='1' ?
<Image source={require('../../assets/tickw.png')} style={{ width: 15, height: 14,alignSelf:'center'}} />
: null }
</TouchableOpacity>
<Text style={{color:Mycolors.TEXT_COLOR,left:10,top:2}}>Pending</Text>
</View>

<View style={{flexDirection:'row',marginTop:10}}>
<TouchableOpacity style={{width:25,height:25,backgroundColor:select=='2'? Mycolors.filtercolor : 'transparent',borderRadius:5,justifyContent:'center',borderColor:'gray',borderWidth:1}}
onPress={()=>{setselect('2')}}>
{select=='2' ?
<Image source={require('../../assets/tickw.png')} style={{ width: 15, height: 14,alignSelf:'center'}} />
: null }
</TouchableOpacity>
<Text style={{color:Mycolors.TEXT_COLOR,left:10,top:2}}>Completed</Text>
</View>

</View>

      <MyButtons title="Apply" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={()=>{}} marginHorizontal={20} 
      titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.signupButton} marginVertical={10} />
     <MyButtons title="Reset" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={()=>{}} marginHorizontal={20} 
      titlecolor={Mycolors.TEXT_COLOR} backgroundColor={Mycolors.BG_COLOR} />
      </ScrollView>
   
         {My_Alert ? <MyAlert sms={alert_sms} okPress={()=>{setMy_Alert(false)}} /> : null }
      {loading ? <Loader /> : null}
     
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
export default TransectionFilter


