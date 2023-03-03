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
import { baseUrl, login, requestGetApi, driver_transaction_history } from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';
// import Toast from 'react-native-simple-toast'
import MyAlert from '../../component/MyAlert';
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment';

const TransectionHistory = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const userdetaile  = useSelector(state => state.user.user_details)
  const walletDetail  = useSelector(state => state.user.wallet_detail)
  const mapdata = useSelector(state => state.maplocation)
  const [email, setemail] = useState('')
  const [pass, setpass] = useState('')
  const[passView,setPassView]=useState(true)
   const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [upData,setupData]=useState([])
  useEffect(()=>{
    getTransactionHistory()
  },[]) 
  const getTransactionHistory = async () => {
    setLoading(true)
    try {
      const { responseJson, err } = await requestGetApi(
        driver_transaction_history,
        "",
        "GET",
        userdetaile.token
      );
      setLoading(false);
      console.log("getTransactionHistory the res==>>", responseJson);
      if (responseJson.headers.success == 1) {
        setupData(responseJson.body)
      } else {
      }
    } catch (error) {
      setLoading(false)
      console.log("getTransactionHistory error", error);
    }
  };
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
        {/* <LinearGradient
          colors={[Mycolors.BG_LINEAR_START_COLOR, Mycolors.BG_LINEAR_END_COLOR]}
          style={{flex: 1,height:dimensions.SCREEN_HEIGHT}}
         > */}
       <MyButtons title="Transection History" height={55} width={'100%'} alignSelf="center" imgpress={() => { props.navigation.goBack() }} marginHorizontal={20} 
       titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} img='left' imgtop={16} imgleft={10} imgheight={20} imgwidth={25}/>


<View style={{width:'92%',height:125,alignSelf:'center'}}>
<Image source={require('../../assets/TotalEarningsfrom.png')} style={{ width: '100%', height: '100%'}} />
<View style={{position:'absolute',top:'40%',left:30}}>
<Text style={{fontSize:20,color:Mycolors.BG_COLOR,fontWeight:'600'}}>${walletDetail}</Text>
   </View>
</View>

<Text style={{ fontSize: 16, color: Mycolors.TEXT_COLOR,fontWeight:'600',left:20,marginBottom:15}} >Transaction History</Text>

<View style={{  width: dimensions.SCREEN_WIDTH - 40 ,alignSelf:'center'}}>
         
         <TextInput
           value={pass}
           onChangeText={(text) => {
             setpass(text)
           }}
           placeholder="Search payment history"
           placeholderTextColor={Mycolors.GrayColor}
           style={[styles.input,{paddingRight: 50}]}
         
         />
         <View style={{position:'absolute',right:1,top:1,backgroundColor:Mycolors.filtercolor,width:50,height:55,justifyContent:'center',borderRadius:5}}>
           <TouchableOpacity onPress={()=>{props.navigation.navigate('TransectionFilter')}}>
           <Image source={require('../../assets/Vectorfilte.png')} style={{ width: 30, height: 30,alignSelf:'center'}} />
           </TouchableOpacity>
         </View>
       </View>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        

      <View style={{width:'100%',alignSelf:'center',marginTop:25}}>
          <FlatList
                  data={upData}
                //  horizontal={true}
                 showsVerticalScrollIndicator={false}
                  // numColumns={2}
                  renderItem={({item,index})=>{
                    return(
                        <View style={{width:'100%',padding:15,marginHorizontal:5,backgroundColor:'#fff',marginBottom:15,
                        shadowOffset: {
                        width: 0,
                        height: 3
                      },
                      shadowRadius: 1,
                      shadowOpacity: 0.3,
                     // justifyContent: 'center',
                      elevation: 5,borderRadius:15}}>
                     
                     <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',paddingHorizontal:5}}>
                      {/* <Text style={{color:Mycolors.filtercolor,fontSize:14,fontWeight:'600'}}>#JHF9085325466</Text> */}
                      <Text style={{color:Mycolors.filtercolor,fontSize:14,fontWeight:'600'}}>#{item.id}</Text>
                      <View style={{flexDirection:'row'}}>
                        <Text style={{color:Mycolors.GrayColor,fontSize:13,left:5}}>{moment(item.created_date).format('DD MMM YYYY')}</Text>
                      </View>
                        </View>


            <View style={{width:'100%',flexDirection:'row',marginVertical:5,paddingVertical:10}}>
            <View>
              <Image source={require('../../assets/images/Ellipse.png')} style={{ width: 50, height: 50, top: -2, }}></Image>
            </View>
            <View style={{width:dimensions.SCREEN_WIDTH-100,left:16,top:4}}>
            <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 14,fontWeight: '600',}}>Received From</Text>
            <Text style={{ color: Mycolors.GrayColor, fontSize: 13, marginVertical:5 }}>Geores Local</Text>
          </View>
          </View>

<View style={{position:'absolute',right:20,bottom:30}}>
{/* <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13, marginVertical:5,fontWeight: '600'}}>$20.89</Text> */}
<Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13, marginVertical:5,fontWeight: '600'}}>${item.amount === null ? 0 : item.amount}</Text>
    </View>

                </View>
                    )
                  }}
                  keyExtractor={item => item.id}
                />
         </View>


       
    
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
export default TransectionHistory


