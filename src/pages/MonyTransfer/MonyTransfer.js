/* eslint-disable prettier/prettier */
import React, { useState,useEffect } from 'react';
import { View, Image, Text, StyleSheet,RefreshControl, SafeAreaView,FlatList, ScrollView,useColorScheme, Alert, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import MyButtons from '../../component/MyButtons';
import MyInputText from '../../component/MyInputText';
import { dimensions, Mycolors } from '../../utility/Mycolors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setWalletDetails } from '../../redux/actions/user_action';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { baseUrl, driver_transaction, driver_earning, requestGetApi, requestPostApi, driver_transaction_history } from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';
// import Toast from 'react-native-simple-toast'
import MyAlert from '../../component/MyAlert';
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment';

const MonyTransfer = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const userdetaile  = useSelector(state => state.user.user_details)
  const walletDetail  = useSelector(state => state.user.wallet_detail)
  const[select1,setselect1]=useState('1')
  const[select2,setselect2]=useState('1')
  const [amount, setAmount] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
   const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [upData,setupData]=useState([])
  useEffect(()=>{
    getTransactionHistory()
  },[]) 

  const [refreshing, setRefreshing] = React.useState(false);
  const checkcon = () => {
    getTransactionHistory()
  }
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    checkcon()
    wait(2000).then(() => {

      setRefreshing(false)

    });
  }, []);

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
      console.log("getTransactionHistory the res==>>", responseJson.body);
      if (responseJson.headers.success == 1) {
        setupData(responseJson.body?.slice(0, 3))
      } else {
      }
    } catch (error) {
      setLoading(false)
      console.log("getTransactionHistory error", error);
    }
  };


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
  
  const getStatus = (id) => {
    if(id == '0'){
      return 'Pending'
    } else if(id == '1'){
      return 'Successful'
    } else if(id == '2'){
      return 'Rejected'
    } 
  }
  const getColor = (id) => {
    if(id == '0'){
      // return 'Ongoing'
      return Mycolors.filtercolor
    } else if(id == '1'){
      // return 'Cancel'
      return Mycolors.GREEN
    } else if(id == '2'){
      // return 'Delivered'
      return Mycolors.RED
    }
  }
  return (
    <SafeAreaView style={styles.container}>
       
       <MyButtons title="Money Transfer" height={55} width={'100%'} alignSelf="center" imgpress={() => { props.navigation.goBack() }} marginHorizontal={20} 
       titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} img='left' imgtop={16} imgleft={10} imgheight={20} imgwidth={25}/>


<View style={{width:'92%',height:125,alignSelf:'center'}}>
<Image source={require('../../assets/TotalEarningsfrom.png')} style={{ width: '100%', height: '100%'}} />
<View style={{position:'absolute',top:'40%',left:30}}>
<Text style={{fontSize:20,color:Mycolors.BG_COLOR,fontWeight:'600'}}>${parseFloat(Number(walletDetail).toFixed(3))}</Text>
</View>
<View style={{position:'absolute',top:'40%',right:30}}>
<Text style={{fontSize:20,color:Mycolors.BG_COLOR,fontWeight:'600'}} onPress={()=>{props.navigation.navigate('TransectionHistory')}}>History</Text>
</View>
</View>

      <ScrollView style={{ paddingHorizontal: 20 }}
       refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}

          />
        }
      >
        
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
    
    <View style={{height:10}}></View>

      <MyButtons title="Send Request" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={onMoneyTransfer} marginHorizontal={20} 
      titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.signupButton} />


<View style={{width:'100%',alignSelf:'center',marginTop:25}}>
<View style={styles.viewAllContainer}>
<Text style={{ fontSize: 16, color: Mycolors.TEXT_COLOR,fontWeight:'600'}} >Transaction History</Text>
<TouchableOpacity onPress={()=>{props.navigation.navigate('TransectionHistory')}}>
  <Text style={{color:Mycolors.filtercolor,fontSize:14,fontWeight:'600', textDecorationLine: 'underline'}} >View All</Text>
</TouchableOpacity>
</View>
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

<View style={{position:'absolute',right:20,bottom:25}}>
{/* <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13, marginVertical:5,fontWeight: '600'}}>$20.89</Text> */}
<View style={{flexDirection:'row', alignItems:'center'}}>
<View style={{width:15,height:15,borderRadius:10,backgroundColor:getColor(item.status)}} />
<Text style={{color:getColor(item.status),fontSize:14,left:5}}>{getStatus(item.status)}</Text>
</View>
<Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13, marginVertical:5,fontWeight: '600'}}>${item.amount === null ? 0 :  parseFloat(Number(item.amount).toFixed(3))}</Text>
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
  viewAllContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:10
  }
});
export default MonyTransfer


