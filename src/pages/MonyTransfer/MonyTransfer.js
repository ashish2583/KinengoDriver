/* eslint-disable prettier/prettier */
import React, { useState,useEffect } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView,FlatList, ScrollView,useColorScheme, Alert, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import MyButtons from '../../component/MyButtons';
import MyInputText from '../../component/MyInputText';
import { dimensions, Mycolors } from '../../utility/Mycolors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setWalletDetails } from '../../redux/actions/user_action';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { baseUrl, driver_transaction, driver_earning, requestGetApi, requestPostApi } from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';
// import Toast from 'react-native-simple-toast'
import MyAlert from '../../component/MyAlert';
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment';

const MonyTransfer = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const userdetaile  = useSelector(state => state.user.user_details)
  const[select1,setselect1]=useState('1')
  const[select2,setselect2]=useState('1')
  const [amount, setAmount] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
   const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  useEffect( () => {
    updateWalletData()
  }, [])

  const updateWalletData = async () => {
    setLoading(true)
    // const endPoint = `${driver_earning}/userid/${userdetaile?.driver_id}`
    try {
      const { responseJson, err } = await requestGetApi(
        driver_earning,
        '',
        "GET",
        userdetaile.token
      );
      setLoading(false);
      console.log("updateWalletData the res==>>", responseJson);
      if (responseJson.headers.success == 1) {
        setTotalAmount(responseJson.body.total)
        dispatch(setWalletDetails(responseJson.body.total))
      } else {
      }
    } catch (error) {
      setLoading(false)
      console.log("updateWalletData error", error);
    }
  
}

  const Validation = () => {
    if (amount === "") {
      Alert.alert("Please enter Amount");
      return false;
    } else {
      return true;
    }
  };
  const onMoneyTransfer = async () => {
    if (!Validation()) {
      return;
    }
    setLoading(true)
    var data = {
      // userid: userdetaile.driver_id,
      // wallet_id: "1",
      transaction_type: "",
      transaction_date: moment().format("YYYY-MM-DD"),
      transaction_detaills: "",
      amount: amount,
      status: "0",
    };
    console.log("onMoneyTransfer data", data);
    try {
      const { responseJson, err } = await requestPostApi(
        driver_transaction,
        data,
        "POST",
        userdetaile.token
      );
      setLoading(false);
      console.log("the res==>>", responseJson);
      if (responseJson.headers.success == 1) {
      } else {
      }
    } catch (error) {
      setLoading(false)
      console.log("onMoneyTransfer error", error);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
       
       <MyButtons title="Money Transfer" height={55} width={'100%'} alignSelf="center" imgpress={() => { props.navigation.goBack() }} marginHorizontal={20} 
       titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} img='left' imgtop={16} imgleft={10} imgheight={20} imgwidth={25}/>


<View style={{width:'92%',height:125,alignSelf:'center'}}>
<Image source={require('../../assets/TotalEarningsfrom.png')} style={{ width: '100%', height: '100%'}} />
<View style={{position:'absolute',top:'40%',left:30}}>
<Text style={{fontSize:20,color:Mycolors.BG_COLOR,fontWeight:'600'}}>${totalAmount}</Text>
</View>
<View style={{position:'absolute',top:'40%',right:30}}>
<Text style={{fontSize:20,color:Mycolors.BG_COLOR,fontWeight:'600'}} onPress={()=>{props.navigation.navigate('TransectionHistory')}}>History</Text>
</View>
</View>

      <ScrollView style={{ paddingHorizontal: 20 }}>
        
      <TextInput
            value={amount}
            onChangeText={(text) => {
              setAmount(text)
            }}
            placeholder="Amount"
            keyboardType='number-pad'
            maxLength={6}
            placeholderTextColor={Mycolors.GrayColor}
            style={styles.input}
          />
      {/* <Text style={{ marginTop: 25, fontSize: 16, color: Mycolors.TEXT_COLOR,fontWeight:'600'}} >Cash-Out Option</Text>
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
</View> */}
    
      <MyButtons title="Submit" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={onMoneyTransfer} marginHorizontal={20} 
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


