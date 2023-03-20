/* eslint-disable prettier/prettier */
import React, { Component, useEffect, useState } from 'react';
import { SafeAreaView, Image, ImageBackground, ScrollView, StatusBar, useColorScheme, View, StyleSheet, Text, Alert } from 'react-native';
import { dimensions, Mycolors, } from '../../utility/Mycolors';
import MyButtons from '../../component/MyButtons';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import SendNotification from '../../component/SendNotification';

const Welcome = (props) => {
  
  const [index, setIndex] = useState('1')

 
  useEffect(() => {
    gettoken()
  }, []);

  const gettoken = () => {
    messaging().getToken().then((token) => {
        // adddata(token)
      // dispatch(setDeviceToken(token))
      console.log('Device token is:==>>',token)
      // senNoti(token)
   });
    };

  const senNoti= async(tok)=>{
    console.log('hiihiiii')
      let notidata={
        'data': {},
        'title':'Message from kiningo driver',
        'body': 'new message',
       // 'token':'cxHj6Y-nQla1KsGRx3LJDJ:APA91bGkoGHr_DHvfMIycmP_b5pKmjRXY4jzfLnGUGLni4QZg5rXaHWZWBrCzyTGEMZ-c31tOIJWvM3os6b1lI-MhTt9z1o-d97lCJmnPf26fZssGQ4pQwVcoAQbN9FT579TSWC77AiV'
      //  'token':mapdata.notificationdata.device_id
      'token':tok

      }
  
      let result= await SendNotification.SendNotification(notidata)
       // console.log('result')
    }

  return (
  
<View style={styles.container}>
   
   <ImageBackground
     source={require('../../assets/images/Group6363.png')}
     style={StyleSheet.absoluteFill}
     width="100%"
     height="100%"
   />
  <View style={{width:dimensions.SCREEN_WIDTH,height:dimensions.SCREEN_HEIGHT,backgroundColor:'transparent',position:'absolute',bottom:0}}>
  <ImageBackground
     source={require('../../assets/images/Rectangle1012.png')}
     style={StyleSheet.absoluteFill}
     width="100%"
     height="100%"
   />
  </View>
  <View style={{width:90,height:80,alignSelf:'center',marginTop:80}}>
    <Image source={require('../../assets/images/sp1.png')} style={{width:'100%',height:'100%',}}></Image>
    </View>
    <View style={{width:250,height:55,alignSelf:'center',marginTop:10}}>
    <Image source={require('../../assets/images/sp2.png')} style={{width:'100%',height:'100%',}}></Image>
    </View>
<View style={{alignSelf:'center',position:'absolute',bottom:120,width:'90%'}}>
  <MyButtons title="Sign In" height={50} width={'100%'} borderRadius={5} press={()=>{
   
    props.navigation.navigate('Login')
    }} 
   titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.LoginButton} fontWeight={'600'} fontSize={14} marginVertical={10}/>
   
</View>
    
<View style={{alignSelf:'center',position:'absolute',bottom:60,width:'90%'}}>
  <MyButtons title="Sign Up" height={50} width={'100%'} borderRadius={5} press={()=>{props.navigation.navigate('SignUp')}} 
   titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.signupButton} fontWeight={'600'} fontSize={14} marginVertical={10}/>
   
</View>

 </View>

  );
}
const styles = StyleSheet.create({

  container: {
    backgroundColor:'#000',
    flex:1
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoOneStyle: {
    width: dimensions.SCREEN_WIDTH / 3,
    height: dimensions.SCREEN_WIDTH / 3,
  },
  logoTwoStyle: {
    width: dimensions.SCREEN_WIDTH / 1.2,
    height: 100,
  },
});
export default Welcome
