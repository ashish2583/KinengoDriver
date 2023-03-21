import React, { Component, useState } from 'react';
import { Alert, Text, Image,StatusBar, ScrollView, SafeAreaView, Platform, TextInput, View, StyleSheet, TouchableOpacity, ActivityIndicator, Keyboard, Dimensions, FlatList ,BackHandler} from 'react-native';
import { DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer ,StackActions,CommonActions} from '@react-navigation/native';
import { Mycolors,dimensions } from '../utility/Mycolors';
import {  useSelector, useDispatch } from 'react-redux';
import {onLogoutUser} from '../redux/actions/user_action';
import {baseUrl,booking_ride_status,booking_cancel_ride,driver_logout,driver_ride_details,booking_verify_ride,driver_current_location,requestPostApi,requestGetApi} from '../WebApi/Service'
import Loader from '../WebApi/Loader';
import MyAlert from './MyAlert';
import LinearGradient from 'react-native-linear-gradient'

const MyView=(props)=>{
  return(
    <>
   <TouchableOpacity style={{width:'100%',flexDirection:'row',alignItems:'center',marginTop:15,borderColor:'transparent',borderWidth:0,borderRadius:25}}onPress={props.touch}>
    <Image source={props.img} style={props.imgstyle}></Image>
    <View>
    <Text style={{color:Mycolors.TEXT_COLOR,fontSize:13,marginLeft:15}}>{props.name}</Text>
    <Text style={{color:Mycolors.GrayColor,fontSize:11,marginLeft:15,top:2}}>{props.desc}</Text>
    </View>
   </TouchableOpacity>
   </>
  );
}

 const MyDrawer =(props)=> {
  const dispatch =  useDispatch();
   const [name,setname]=useState('John Dev.')
   const person_Image = "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
   const userdetaile  = useSelector(state => state.user.user_details)
   const [loder, setLoder] = useState(false)
   const [My_Alert, setMy_Alert] = useState(false)
   const [alert_sms, setalert_sms] = useState('')

   const resetStacks=(page)=>{
    props.navigation.reset({
      index: 0,
      routes: [{name: page}],
    });
   }

   const logoutDriver=async()=>{
          AsyncStorage.clear(); 
          dispatch(onLogoutUser())
  //   setLoder(true)
  //  const{responseJson,err}  = await requestGetApi(driver_logout,'','GET',userdetaile.token) 
  //  setLoder(false)
  //  if(err==null){
  //       if(responseJson.status){
  //         AsyncStorage.clear(); 
  //         dispatch(onLogoutUser())
  //       }else{
  //         Toast.show(responseJson.message);
  //       }
  //   }else{
  //     Alert.alert(err)
  //   }
    
  }
  

    return (
      <SafeAreaView style={{flex:1,}}>
         <LinearGradient
          colors={['rgba(255, 255, 255, 0.97)', 'rgba(255, 250, 234, 0.97)']}
          style={{flex: 1,height:dimensions.SCREEN_HEIGHT,}}
         >
<View style={{backgroundColor:'#FFC40C',width:'100%'}}>
<View style={{width:28,height:26,justifyContent:'center',alignSelf:'flex-start',left:15,top:15}}>
  <TouchableOpacity onPress={()=>{props.navigation.closeDrawer()}}>
    <Image source={require('../assets/ArrowLeft.png')} style={{width:22,height:22,}}></Image>
  </TouchableOpacity>
</View>

<View style={{marginTop:25,alignSelf:'center',}}>
<TouchableOpacity onPress={()=>{props.navigation.navigate('Myprofile')}} style={{width:80,height:80,borderRadius:40,borderColor:Mycolors.BG_COLOR,borderWidth:3,alignSelf:'center'}}>
<Image source={{ uri: person_Image }} style={{width:'100%',height:'100%',alignSelf:'center',borderRadius:40}}></Image>
</TouchableOpacity>
<View style={{alignSelf:'center'}}>
<Text style={{color:Mycolors.BG_COLOR,fontSize:14,fontWeight:'600',textAlign:'center',marginTop:6}}>{userdetaile.first_name +' '+userdetaile.last_name}</Text>
<Text style={{color:Mycolors.BG_COLOR,fontSize:13,textAlign:'center',marginVertical:2,marginBottom:8}}>{userdetaile.emailid}</Text>
</View>
</View>

</View>
<ScrollView style={{flex:1, paddingLeft:30,paddingVertical:10,paddingRight:10}}> 

<View style={{width:'100%',alignSelf:'center',marginTop:0,}}>

 <MyView name="Earning" touch={()=>{props.navigation.navigate('Earning')}} img={require('../assets/CurrencyCircleDolar.png')} imgstyle={{width:27,height:26,}} desc={'See All Your Earnings In One Place'}/>  
 <MyView name="Money Transfer" touch={()=>{props.navigation.navigate('MonyTransfer')}} img={require('../assets/CurrencyCircleDolar.png')} imgstyle={{width:27,height:26,}} desc={'See All Your Earnings In One Place'}/>              
 <MyView name="Reward" touch={()=>{props.navigation.navigate('Reward')}} img={require('../assets/Group6541.png')} imgstyle={{width:26,height:27,}} desc={'Insurance And Discounts'}/>        
 <MyView name="Help" touch={()=>{props.navigation.navigate('Help')}} img={require('../assets/Group64164.png')} imgstyle={{width:27,height:26,}} desc={'Get Support, Accident Insurance'}/>        

</View>


</ScrollView>

<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',position:'absolute',bottom:30,width:'100%',paddingHorizontal:20}}>
<TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={()=>{
  setalert_sms('Are you sure want to logout?')
  setMy_Alert(true)
}}>
<Image source={require('../assets/Power.png')} style={{width:18,height:20}}></Image>
<Text style={{marginLeft:8,color:Mycolors.TEXT_COLOR,fontSize:13}}>Logout</Text>
</TouchableOpacity>
<View>
  <Text style={{marginLeft:8,color:Mycolors.TEXT_COLOR,fontSize:13}}>App Ver:- 1.0.0</Text>
</View>

</View>

{My_Alert ? <MyAlert sms={alert_sms} sms2={'Logout'} okPress={()=>{ logoutDriver() }} canclePress={()=>{setMy_Alert(false)}}/> : null }

{loder ? <Loader /> : null }
</LinearGradient>
      </SafeAreaView>
    );
    
  }

  export default MyDrawer
