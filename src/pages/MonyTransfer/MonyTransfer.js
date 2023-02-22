/* eslint-disable prettier/prettier */
import React, { useState,useEffect } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView,FlatList, ScrollView,useColorScheme, Alert, TextInput, Keyboard, TouchableOpacity } from 'react-native';
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

const MonyTransfer = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const mapdata = useSelector(state => state.maplocation)
  const [email, setemail] = useState('')
  const [pass, setpass] = useState('')
  const[select1,setselect1]=useState('1')
  const[select2,setselect2]=useState('1')
   const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [upData,setupData]=useState([
    {
      id: '1',
      title: 'Hair Cut',
      desc:'',
      time:'10:00AM',
      
    },
    {
      id: '2',
      title: 'Shaving',
      desc:'',
      time:'10:30AM',
      
    },
    {
      id: '3',
      title: 'Facial',
      desc:'',
      time:'11:00AM',
      
    },
    {
      id: '4',
      title: 'Hair Color',
      desc:'',
      time:'11:30AM',
      
    },
    {
      id: '5',
      title: 'Hair wash',
      desc:'',
      time:'12:00PM',
      
    },
    {
      id: '6',
      title: 'Beard style',
      desc:'',
      time:'12:30PM',
      
    },
    {
      id: '7',
      title: 'Facial',
      desc:'',
      time:'01:00PM',
      
    },
  ])
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
       
       <MyButtons title="Money Transfer" height={55} width={'100%'} alignSelf="center" imgpress={() => { props.navigation.goBack() }} marginHorizontal={20} 
       titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} img='left' imgtop={16} imgleft={10} imgheight={20} imgwidth={25}/>


<View style={{width:'92%',height:125,alignSelf:'center'}}>
<Image source={require('../../assets/TotalEarningsfrom.png')} style={{ width: '100%', height: '100%'}} />
<View style={{position:'absolute',top:'40%',left:30}}>
<Text style={{fontSize:20,color:Mycolors.BG_COLOR,fontWeight:'600'}}>$2345</Text>
</View>
<View style={{position:'absolute',top:'40%',right:30}}>
<Text style={{fontSize:20,color:Mycolors.BG_COLOR,fontWeight:'600'}} onPress={()=>{props.navigation.navigate('TransectionHistory')}}>History</Text>
</View>
</View>

      <ScrollView style={{ paddingHorizontal: 20 }}>
        
      <Text style={{ marginTop: 25, fontSize: 16, color: Mycolors.TEXT_COLOR,fontWeight:'600'}} >Cash-Out Option</Text>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>

              <TouchableOpacity style={{width:'30%',padding:5,backgroundColor:select1=='1' ? '#fff':'#FFF8E2',marginTop:15,justifyContent:'center',
                        shadowOffset: {
                        width: 0,
                        height: 3
                      },
                      shadowRadius: 1,
                      shadowOpacity: 0.3,
                     // justifyContent: 'center',
                      elevation: 5,borderRadius:8}} onPress={()=>{setselect1('1')}}>
              <Text style={{color:select1=='1' ? Mycolors.filtercolor : Mycolors.GrayColor,fontSize:13,textAlign:'center'}}>Weekly</Text>

                </TouchableOpacity>
                <TouchableOpacity style={{width:'30%',padding:5,backgroundColor:select1=='2' ? '#fff':'#FFF8E2',marginTop:15,justifyContent:'center',
                        shadowOffset: {
                        width: 0,
                        height: 3
                      },
                      shadowRadius: 1,
                      shadowOpacity: 0.3,
                     // justifyContent: 'center',
                      elevation: 5,borderRadius:8}} onPress={()=>{setselect1('2')}}>
                 <Text style={{color:select1=='2' ? Mycolors.filtercolor : Mycolors.GrayColor,fontSize:13,textAlign:'center'}}>Bi Weekly</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'30%',padding:5,backgroundColor:select1=='3' ? '#fff':'#FFF8E2',marginTop:15,height:40,justifyContent:'center',
                        shadowOffset: {
                        width: 0,
                        height: 3
                      },
                      shadowRadius: 1,
                      shadowOpacity: 0.3,
                     // justifyContent: 'center',
                      elevation: 5,borderRadius:8}} onPress={()=>{setselect1('3')}}>
                                           <Text style={{color:select1=='3' ? Mycolors.filtercolor : Mycolors.GrayColor,fontSize:13,textAlign:'center',}}>Monthly</Text>

                   

                </TouchableOpacity>
</View>
     
      <Text style={{ marginTop: 25, fontSize: 16, color: Mycolors.TEXT_COLOR,fontWeight:'600'}} >Deposit to</Text>

      <View style={{width:'100%',padding:5,backgroundColor:'#FFF',marginTop:15,justifyContent:'center',height:50,
                        shadowOffset: {
                        width: 0,
                        height: 3
                      },
                      shadowRadius: 1,
                      shadowOpacity: 0.3,
                     // justifyContent: 'center',
                      elevation: 5,borderRadius:8}}>
                 <Text style={{color:Mycolors.GrayColor,fontSize:15,left:5}}>****     ****    ****   9131</Text>
                </View>

      <Text style={{ marginTop: 25, fontSize: 16, color: Mycolors.TEXT_COLOR,fontWeight:'600'}} >Add New Payment Method</Text>
      <View style={{flexDirection:'row',marginBottom:20}}>

                <TouchableOpacity style={{width:'30%',padding:5,backgroundColor:select2=='1' ? '#fff':'#FFF8E2',marginTop:15,justifyContent:'center',
                        shadowOffset: {
                        width: 0,
                        height: 3
                      },
                      shadowRadius: 1,
                      shadowOpacity: 0.3,
                     // justifyContent: 'center',
                      elevation: 5,borderRadius:8}} onPress={()=>{setselect2('1')}}>
              <Text style={{color:select2=='1' ? Mycolors.filtercolor : Mycolors.GrayColor,fontSize:13,textAlign:'center'}}>Bank Account</Text>

                </TouchableOpacity>
              
                <TouchableOpacity style={{width:'30%',padding:5,backgroundColor:select2=='2' ? '#fff':'#FFF8E2',marginTop:15,height:40,justifyContent:'center',marginLeft:15,
                        shadowOffset: {
                        width: 0,
                        height: 3
                      },
                      shadowRadius: 1,
                      shadowOpacity: 0.3,
                     // justifyContent: 'center',
                      elevation: 5,borderRadius:8}} onPress={()=>{setselect2('2')}}>
                                           <Text style={{color:select2=='2' ? Mycolors.filtercolor : Mycolors.GrayColor,fontSize:13,textAlign:'center',}}>Paypal</Text>

                   

                </TouchableOpacity>
</View>
    
      <MyButtons title="Save" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={()=>{}} marginHorizontal={20} 
      titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.signupButton} marginVertical={20} />
     
      </ScrollView>
   
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
export default MonyTransfer


