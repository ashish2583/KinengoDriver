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

const Help = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const mapdata = useSelector(state => state.maplocation)
  const [email, setemail] = useState('')
  const [pass, setpass] = useState('')
  const[passView,setPassView]=useState(true)
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
      
       <MyButtons title="Support" height={55} width={'100%'} alignSelf="center" imgpress={() => { props.navigation.goBack() }} marginHorizontal={20} 
       titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} img='left' imgtop={16} imgleft={10} imgheight={20} imgwidth={25}/>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        

        <Text style={{ marginTop: 15, fontSize: 16, color: Mycolors.TEXT_COLOR }}>Wallet</Text>
        <View style={{  width: dimensions.SCREEN_WIDTH - 40 ,marginTop:15}}>
        
            
          </View>
  
          <View style={{width:'100%',alignSelf:'center',marginTop:10}}>
          <FlatList
                  data={upData}
                //  horizontal={true}
                 showsVerticalScrollIndicator={false}
                  // numColumns={2}
                  renderItem={({item,index})=>{
                    return(
                        <View style={{width:'100%',padding:15,marginHorizontal:5,backgroundColor:'#fff',marginTop:15,
                        shadowOffset: {
                        width: 0,
                        height: 3
                      },
                      shadowRadius: 1,
                      shadowOpacity: 0.3,
                     // justifyContent: 'center',
                      elevation: 5,borderRadius:8}}>
                     
                     <TouchableOpacity style={{width:'100%',flexDirection:'row',justifyContent:'space-between',paddingHorizontal:5}}>
                      <Text style={{color:Mycolors.GrayColor,fontSize:13,}}>Learn more about your earnings</Text>
                      <View style={{flexDirection:'row'}}>
                      <Image source={require('../../assets/Vector.png')} style={{width:15,height:18,}}></Image>
                      </View>
                        </TouchableOpacity>



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
export default Help


