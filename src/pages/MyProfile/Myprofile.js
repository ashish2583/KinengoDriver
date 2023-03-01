import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import MyButtons from '../../component/MyButtons';
import { dimensions, Mycolors } from '../../utility/Mycolors';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import messaging from '@react-native-firebase/messaging';
import { useSelector, useDispatch } from 'react-redux';
import { requestPostApi, requestGetApi, driver_ID } from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyAlert from '../../component/MyAlert';
// import Toast from 'react-native-simple-toast';
import HomeHeader from '../../component/HomeHeader';
import SerchInput from '../../component/SerchInput';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const Myprofile = (props) => {
  const userdetaile = useSelector(state => state.user.user_details)
  const dispatch = useDispatch();
  const person_Image = "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  const [datas, setdatas] = useState('');
  const [pick, setpick] = useState('')
  const [filepath, setfilepath] = useState(null)
  const [loading, setLoading] = useState(false)
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [flData, setFtData] = useState([
    { id: '1', img: person_Image, title: 'GRECA Vegetarian Greek', lable: 'Table Booking', price: '$140.00', desc: 'Booking date and time: 21 July 2021, 11:00 AM' },
    { id: '2', img: person_Image, title: 'GRECA Vegetarian Greek', lable: 'Table Booking', price: '$140.00', desc: 'Booking date and time: 21 July 2021, 11:00 AM' },
    { id: '3', img: person_Image, title: 'GRECA Vegetarian Greek', lable: 'Table Booking', price: '$140.00', desc: 'Booking date and time: 21 July 2021, 11:00 AM' },
    { id: '4', img: person_Image, title: 'GRECA Vegetarian Greek', lable: 'Table Booking', price: '$140.00', desc: 'Booking date and time: 21 July 2021, 11:00 AM' },
    { id: '5', img: person_Image, title: 'GRECA Vegetarian Greek', lable: 'Table Booking', price: '$140.00', desc: 'Booking date and time: 21 July 2021, 11:00 AM' },
  ])
  useEffect(() => {
    getProfile()
  }, [])
  const openLibrary = async () => {

    let options = {
        title: 'Select Image',
        customButtons: [
            {
                name: 'customOptionKey',
                title: 'Choose Photo from Custom Option'
            },
        ],
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    launchImageLibrary(options, (image) => {
        if (!image.didCancel) {
            console.log('the ddd==', image.assets[0].uri)
            var photo = {
                uri: image.assets[0].uri,
                type: "image/jpeg",
                name: image.assets[0].fileName
            };
            console.log("photo", photo);
            setpick(photo)
            setfilepath(image)
        }
    })


}
const opencamera = async () => {
  // setmodlevisual(false)

  let options = {
    title: 'Select Image',
    customButtons: [
      {
        name: 'customOptionKey',
        title: 'Choose Photo from Custom Option'
      },
    ],
    mediaType:'video',
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  
  if(true){
    launchCamera(options, (video) => {
      if (!video.didCancel) {
        console.log('the ddd==', video)
        var obj = {
          uri: video.assets[0].uri,
          type: "video/mp4",
          name: video.assets[0].fileName
        };
        setcapturedVideo(obj)
        setfilepath(video)
      }
  
    })
  }else{
    launchCamera(options, (image) => {
      if (!image.didCancel) {
        console.log('the ddd==', image)
        var photo = {
          uri: image.assets[0].uri,
          type: "image/jpeg",
          name: image.assets[0].fileName
        };
        setpick(photo)
        setfilepath(image)
      }
  
    })
  }
}
  const getProfile = async () => {

    setLoading(true)
    const { responseJson, err } = await requestGetApi(driver_ID + userdetaile.driver_id, '', 'GET', userdetaile.token)
    setLoading(false)
    console.log('User Profile data==>>', responseJson, userdetaile.driver_id)
    if (responseJson.headers.success == 1) {
      console.log('objj==>>', responseJson.body)
      setdatas(responseJson.body)

    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  const design = (img, ti, tirateing, w, imgh, imgw, redious, press) => {
    return (
      <View style={{ alignItems: 'center', width: "32%", borderRadius: 15, height: 65, paddingHorizontal: 0 }}>
        <TouchableOpacity onPress={press ? press : () => { }}
          style={{ width: 40, height: 40, justifyContent: 'center', borderRadius: redious }}>
          <Image source={img} style={{ width: imgw, height: imgh, overflow: 'hidden', alignSelf: 'center' }}></Image>
        </TouchableOpacity>
        <View style={{ alignItems: 'center', }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#455A64' }}>{tirateing}</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#C7C7C7' }}>{ti}</Text>
        </View>

      </View>

    )
  }
  const CustomButtonDesign = (img, title, imgw, imgh, press) => {
    return (
      <View style={{
        width: '99%', height: 65, padding: 15, marginHorizontal: 5, backgroundColor: '#fff', marginTop: 15,
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 1,
        shadowOpacity: 0.3,
        //  justifyContent: 'center',
        //  alignItems:"flex-start",
        alignSelf: "center",
        elevation: 5, borderRadius: 10
      }}>

        <TouchableOpacity onPress={press ? press : () => { }} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
          <Image source={img} style={{ width: imgw, height: imgh, overflow: 'hidden', alignSelf: 'center' }}></Image>
          <View style={{ justifyContent: "center", alignItems: "flex-start", width: '75%' }}>
            <Text style={{ color: '#455A64', fontSize: 13, }}>{title}</Text>
          </View>

          <View style={{ justifyContent: "center" }}>
            <Image source={require('../../assets/Vector.png')} style={{ width: 15, height: 18, }}></Image>
          </View>
        </TouchableOpacity>



      </View>
    )
  }

  const MyorderDesign = (item) => {
    return (
      <View style={{
        marginVertical: 10, marginHorizontal: 5, borderRadius: 5,
        backgroundColor: '#fff',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        justifyContent: 'center',
        elevation: 5
      }}>
        <View style={{ width: '100%', padding: 10, flexDirection: 'row', alignItems: 'center', borderRadius: 5, overflow: 'hidden' }}>
          <View>
            <Image source={{ uri: item.img }} style={{ width: 45, height: 45, borderRadius: 25 }}></Image>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 13, fontWeight: '500', color: Mycolors.TEXT_COLOR }}>{item.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
              <View style={{ paddingVertical: 3, paddingHorizontal: 8, borderRadius: 20, backgroundColor: '#D2F1CE', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 11, color: '#29913B' }}>{item.lable}</Text>
              </View>
              <Text style={{ marginLeft: 20, fontSize: 13, fontWeight: '500' }}>{item.price}</Text>
            </View>
            <Text style={{ fontSize: 10, fontWeight: '500', color: '#29913B', marginTop: 8 }}>{item.desc}</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <MyButtons title="My Profile" height={55} width={'100%'} alignSelf="center" imgpress={() => { props.navigation.goBack() }} marginHorizontal={20}
        titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} img='left' imgtop={16} imgleft={10} imgheight={20} imgwidth={25} />
      <ScrollView style={{ paddingHorizontal: 20 ,}}>
        <View style={{
          width: '99%', padding: 10, marginTop: 60, borderRadius: 30,
          backgroundColor: '#fff',
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 5,
          shadowOpacity: 1.0,
          justifyContent: 'center',
          elevation: 5, alignSelf: 'center'
        }}>

          <View style={{ justifyContent: 'space-between', alignItems: 'center', width: '95%', alignSelf: 'center' }}>
            <View style={{ alignItems: 'center', top: -60 }}>
              <Image source={require('../../assets/images/profileimg.png')} style={{ width: 100, height: 100, borderRadius: 100 / 2 }}></Image>
              <View style={{ alignItems: 'flex-end', top: -25, marginLeft: 50 }}>
                <Image source={require('../../assets/profile-upload.png')} style={{ width: 30, height: 30, }}></Image>
              </View>
            </View>
            <View style={{ justifyContent: "center", width: '95%', alignItems: 'center', top: -70 }}>
              <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 16, fontWeight: '600' }}>{datas.first_name + ' ' + datas.last_name}</Text>
              <View style={{ alignItems: 'center', marginTop: 5, width: '95%' }}>

                <Text style={{ color: "#8F93A0", fontSize: 14, left: 7 }}>{datas.emailid}</Text>
              </View>
            </View>

          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: "100%", top: -65 }}>

            {design(require('../../assets/star-rating.png'), 'Rating', '4.2', '45%', 25, 24, 20)}
            {design(require('../../assets/order-icon.png'), 'Orders Completed', '4.2', '45%', 22, 26, 20, () => { props.navigation.navigate('') })}
            {design(require('../../assets/cal-icon.png'), 'Years', '2.4', '45%', 21, 20, 20)}

          </View>
          <View style={{ flexDirection: "row", width: '100%', justifyContent: "center", alignSelf: "center", alignItems: "center", top: -20 }}>
            <TouchableOpacity style={{ width: 160, height: 40, justifyContent: 'center', borderRadius: 5, backgroundColor: '#FFC40C', shadowColor: '#6D2F91', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.03, elevation: 4 }}
              onPress={() => { props.navigation.navigate(' ') }}>
              <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", }}>
                <Image source={require('../../assets/ID-Card-icon.png')} style={{ width: 15, height: 20, }}></Image>
                <Text style={{ marginLeft: 6, fontSize: 13, color: Mycolors.BG_COLOR, textAlign: 'center', fontWeight: '400' }}>KinenGo ID card</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>

        <View style={{ alignItems: 'center', marginTop: 10, justifyContent: "center" }}>
          {CustomButtonDesign(require('../../assets/Files-icon.png'), 'Documents & Details', 40, 40, () => { props.navigation.navigate('RcDetails') })}
          {CustomButtonDesign(require('../../assets/performance-icon.png'), 'My Performance', 33, 33, () => { props.navigation.navigate('MyPerformance') })}
          {CustomButtonDesign(require('../../assets/LockOpen-icon.png'), 'Change Password', 40, 40, () => { props.navigation.navigate('ChangePassword') })}
        </View>

        <View style={{ height: 40 }}></View>

       
      </ScrollView>
      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
        {loading ? <Loader /> : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Mycolors.BG_COLOR
  },
  input: {
    height: 45,
    width: '100%',
    fontSize: 15,
    borderColor: null,
    borderRadius: 10,
    color: Mycolors.TEXT_COLOR,
    paddingLeft: 40,
    paddingRight: 5,
  },
});
export default Myprofile