import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, PermissionsAndroid, Platform } from 'react-native';
import MyButtons from '../../component/MyButtons';
import { dimensions, Mycolors } from '../../utility/Mycolors';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import messaging from '@react-native-firebase/messaging';
import { useSelector, useDispatch } from 'react-redux';
import { requestPostApi, requestGetApi, driver_update_vehicle, driver_ID } from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyAlert from '../../component/MyAlert';
// import Toast from 'react-native-simple-toast';
import HomeHeader from '../../component/HomeHeader';
import SerchInput from '../../component/SerchInput';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const RegistrationDetails = (props) => {
  const userdetaile = useSelector(state => state.user.user_details)
  const dispatch = useDispatch();
  const person_Image = "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  const [datas, setdatas] = useState("");

  const [vehicleno, setVehicleno] = useState('');
  const [vehiclecolor, setVehiclecolor] = useState('');
  const [loading, setLoading] = useState(false)
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [pick, setpick] = useState('');
  const [filepath, setfilepath] = useState(null);
  const [pick1, setpick1] = useState('')
  const [filepath1, setfilepath1] = useState(null)
  console.log("datas---RegistrationDetails", datas.vichel_number);
  console.log("datas--->>", datas.vichel_color);
  useEffect(() => {
    getProfile()
  }, [])
  const opencamera = async () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option'
        },
      ],
      mediaType: 'image',
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };


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
  const opencamera2 = async () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option'
        },
      ],
      mediaType: 'image',
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };


    launchCamera(options, (image) => {
      if (!image.didCancel) {
        console.log('the ddd==', image)
        var photo = {
          uri: image.assets[0].uri,
          type: "image/jpeg",
          name: image.assets[0].fileName
        };
        setpick1(photo)
        setfilepath1(image)
      }

    })

  }

  const checkCameraPermission = async () => {
    if (Platform.OS === 'ios') {
      opencamera();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission Required',
            message:
              'Application needs access to your camera to click your profile image',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          opencamera();
          console.log('Camera Permission Granted.');
        } else {
          // dispatch(showToast({Text: 'Camera Permission Not Granted'}));
          //   Toast.show('Camera Permission Not Granted', Toast.SHORT)
          Alert.alert('Error', 'Camera Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('ERROR' + err);
      }
    }
  };
  // const design = (img, ti, tirateing, w, imgh, imgw, redious, press) => {
  //     return (
  //         <View style={{ alignItems: 'center', width: "32%", borderRadius: 15, height: 65, paddingHorizontal: 0 }}>
  //             <TouchableOpacity onPress={press ? press : () => { }}
  //                 style={{ width: 40, height: 40, justifyContent: 'center', borderRadius: redious }}>
  //                 <Image source={img} style={{ width: imgw, height: imgh, overflow: 'hidden', alignSelf: 'center' }}></Image>
  //             </TouchableOpacity>
  //             <View style={{ alignItems: 'center', }}>
  //                 <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#455A64' }}>{tirateing}</Text>
  //                 <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#C7C7C7' }}>{ti}</Text>
  //             </View>

  //         </View>

  //     )
  // }
  // const CustomButtonDesign = (img, title, imgw, imgh, press) => {
  //     return (
  //         <View style={{
  //             width: '99%', height: 65, padding: 15, marginHorizontal: 5, backgroundColor: '#fff', marginTop: 15,
  //             shadowOffset: {
  //                 width: 0,
  //                 height: 3
  //             },
  //             shadowRadius: 1,
  //             shadowOpacity: 0.3,
  //             //  justifyContent: 'center',
  //             //  alignItems:"flex-start",
  //             alignSelf: "center",
  //             elevation: 5, borderRadius: 10
  //         }}>

  //             <TouchableOpacity onPress={press ? press : () => { }} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
  //                 <Image source={img} style={{ width: imgw, height: imgh, overflow: 'hidden', alignSelf: 'center' }}></Image>
  //                 <View style={{ justifyContent: "center", alignItems: "flex-start", width: '75%' }}>
  //                     <Text style={{ color: '#455A64', fontSize: 13, }}>{title}</Text>
  //                 </View>

  //                 <View style={{ justifyContent: "center" }}>
  //                     <Image source={require('../../assets/Vector.png')} style={{ width: 15, height: 18, }}></Image>
  //                 </View>
  //             </TouchableOpacity>



  //         </View>
  //     )
  // }
  // const Boxdesign = (ti, boxh, onclick) => {
  //     return (
  //         <View style={{
  //             height: boxh,
  //             width: '100%',
  //             // fontSize: 12,
  //             flexDirectionL: 'row',
  //             justifyContent: 'space-between',
  //             // alignSelf: "center",
  //             borderColor: 'transparent',
  //             borderWidth: 1,
  //             borderRadius: 10,
  //             color: Mycolors.TEXT_COLOR,
  //             paddingLeft: 10,
  //             paddingRight: 10,
  //             backgroundColor: '#FFFFFF',
  //             top: 1
  //         }}>
  //             <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", height: 60, width: '90%' }}>
  //                 <Image source={require('../../assets/vechile-icon1.png')} style={{ width: 48, height: 48, borderRadius: 48 / 2 }}></Image>
  //                 <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", height: 60, }}>
  //                     <TextInput
  //                     value={vehicleno}
  //                     onChangeText={(text) => {
  //                         setVehicleno(text)
  //                     }}
  //                     placeholder="Address"
  //                     placeholderTextColor={Mycolors.GrayColor}
  //                     style={styles.inputbox}
  //                 />

  //                         {/* <TouchableOpacity onPress={() => { }} style={{ width: 41, height: 36, justifyContent: 'center', alignItems: "center" ,position:'absolute',right:0}}>
  //                             <Image source={require('../../assets/Details-edit-icon.png')} style={{ width: 60, height: 60, borderRadius: 60 / 2 }}></Image>
  //                         </TouchableOpacity> */}


  //                     </View>
  //                 {/* <Text style={{ fontSize: 14, fontWeight: '600', color: '#3E5869', width: '80%', marginLeft: 10 }}>{ti}</Text> */}
  //                 {/* <TouchableOpacity onPress={onclick ? onclick : () => { }} style={{ width: 41, height: 36, justifyContent: 'center', alignItems: "center" }}>
  //                     <Image source={require('../../assets/Details-edit-icon.png')} style={{ width: 60, height: 60, borderRadius: 60 / 2 }}></Image>
  //                 </TouchableOpacity> */}


  //             </View>


  //         </View>

  //     )
  // };

  const getProfile = async () => {
    console.log("userdetaile RC Details", userdetaile);
    setLoading(true)
    const { responseJson, err } = await requestGetApi(driver_ID + userdetaile.driver_id, '', 'GET', userdetaile.token)
    setLoading(false)
    console.log('User Profile data==>>', responseJson)
    if (responseJson.headers.success == 1) {
      console.log('objj==>>', responseJson.body)
      // setdatas(responseJson.body)
      setVehicleno(responseJson.body.vichel_number)
      setVehiclecolor(responseJson.body.vichel_color)
    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  }


  const Editdetail = async () => {
    console.log("userdetaile RC Details", userdetaile);
    setLoading(true)
    var data = {
      "driver_id": 1,
      "vichel_type": 'bike',
      "vichel_number": vehicleno,
      "vichel_rc": "",
      "vichel_model": userdetaile.vichel_model,
      "vichel_color": vehiclecolor
    }
    const { responseJson, err } = await requestPostApi(driver_update_vehicle + userdetaile.driver_id, data, 'PUT', userdetaile.token)
    setLoading(false)
    // console.log('User Profile1 ==>>', responseJson)
    if (responseJson.headers.success == 1) {
      props.navigation.goBack()
      console.log('objj==>>', responseJson.body)
      // AsyncStorage.setItem("kinengoDriver",JSON.stringify(responseJson.body));
      // dispatch(saveUserResult(responseJson.body))

    } else {

      setalert_sms(err)
      setMy_Alert(true)
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <MyButtons title="RC Detail" height={55} width={'100%'} alignSelf="center" imgpress={() => { props.navigation.goBack() }} marginHorizontal={20}
        titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} img='left' imgtop={16} imgleft={10} imgheight={20} imgwidth={25} />
      <ScrollView style={{ paddingHorizontal: 20 }}>

        {/* <View style={{ alignItems: 'center', marginTop: 10, justifyContent: "center" }}>
                    {CustomButtonDesign(require('../../assets/Gov-ID-card-icon.png'), 'Government ID card', 40, 40, () => { props.navigation.navigate('') })}

                </View> */}

        <View style={{ width: '100%', height: 45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#455A64', textAlign: "left" }}>RC Detail Front</Text>

        </View>
        <View style={{ width: 250, alignSelf: "flex-start", borderRadius: 10, height: 170, borderWidth: 1, borderColor: '#E0E0E0' }}>
          {
            pick == "" ? (
              <TouchableOpacity onPress={() => { checkCameraPermission() }} style={{ width: 250, alignSelf: "flex-start", borderRadius: 10, height: 170, borderWidth: 1, borderColor: '#E0E0E0', paddingVertical: 25 }}>
                <Image resizeMode='contain' source={require('../../assets/camera1.png')} style={{ width: 200, height: 100, overflow: 'hidden', alignSelf: 'center' }}></Image>
              </TouchableOpacity>
            )
              :
              (<View style={{ width: 250, alignSelf: "center", height: 170, borderRadius: 10, }}>
                <TouchableOpacity onPress={(() => { setpick('') })} style={{ position: 'absolute', right: -20, top: -24 }}>
                  <Image resizeMode='cover' source={require('../../assets/cutRed.png')} style={{ width: 30, height: 30, overflow: 'hidden', alignSelf: 'center', }}></Image>
                </TouchableOpacity>
                <Image resizeMode='cover' source={{ uri: pick.uri }} style={{ width: "100%", height: "100%", overflow: 'hidden', alignSelf: 'center', borderRadius: 10, }}></Image>
              </View>)
          }


        </View>
        <View style={{ width: '100%', height: 45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#455A64', textAlign: "left" }}>RC Detail Back</Text>

        </View>
        <View style={{ width: 250, alignSelf: "flex-start", borderRadius: 10, height: 170, borderWidth: 1, borderColor: '#E0E0E0' }}>
          {
            pick1 == "" ? (
              <TouchableOpacity onPress={() => { opencamera2() }} style={{ width: 250, alignSelf: "flex-start", borderRadius: 10, height: 170, borderWidth: 1, borderColor: '#E0E0E0', paddingVertical: 25 }}>
                <Image resizeMode='contain' source={require('../../assets/camera1.png')} style={{ width: 200, height: 100, overflow: 'hidden', alignSelf: 'center' }}></Image>
              </TouchableOpacity>
            )
              :
              (<View style={{ width: 250, alignSelf: "center", height: 170, borderRadius: 10, }}>
                <TouchableOpacity onPress={(() => { setpick1('') })} style={{ position: 'absolute', right: -20, top: -24 }}>
                  <Image resizeMode='cover' source={require('../../assets/cutRed.png')} style={{ width: 30, height: 30, overflow: 'hidden', alignSelf: 'center', }}></Image>
                </TouchableOpacity>
                <Image resizeMode='cover' source={{ uri: pick.uri }} style={{ width: "100%", height: "100%", overflow: 'hidden', alignSelf: 'center', borderRadius: 10, }}></Image>
              </View>)
          }


        </View>
        {/* <View style={{ width: 280, alignSelf: "flex-start", borderRadius: 10, height: 164, }}>
                    <Image source={require('../../assets/images/RC-Detail-image.png')} style={{ width: 300, height: 180, overflow: 'hidden', alignSelf: 'center' }}></Image>
                </View> */}


        <View style={{ width: '100%', height: 45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#455A64' }}>Vehicle Number</Text>

        </View>
        <View style={{
          height: 60,
          width: '100%',
          // fontSize: 12,
          flexDirectionL: 'row',
          justifyContent: 'space-between',
          // alignSelf: "center",
          borderColor: 'transparent',
          borderWidth: 1,
          borderRadius: 10,
          color: Mycolors.TEXT_COLOR,
          paddingLeft: 10,
          paddingRight: 10,
          backgroundColor: '#FFFFFF',
          top: 1
        }}>
          <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", height: 60, width: '90%' }}>
            <Image source={require('../../assets/vechile-icon1.png')} style={{ width: 48, height: 48, borderRadius: 48 / 2 }}></Image>
            <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", height: 60, }}>
              <TextInput
                value={vehicleno}
                onChangeText={(text) => {
                  setVehicleno(text)
                }}
                placeholder="Vehicle Number"
                placeholderTextColor={Mycolors.GrayColor}
                style={styles.inputbox}
              />

            </View>


          </View>


        </View>
        {/* {Boxdesign('MH43BZ9017', 60, () => { props.navigation.navigate('') })} */}
        <View style={{ width: '100%', height: 45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#455A64' }}>Vehicle Color</Text>

        </View>
        <View style={{
          height: 60,
          width: '100%',
          // fontSize: 12,
          flexDirectionL: 'row',
          justifyContent: 'space-between',
          // alignSelf: "center",
          borderColor: 'transparent',
          borderWidth: 1,
          borderRadius: 10,
          color: Mycolors.TEXT_COLOR,
          paddingLeft: 10,
          paddingRight: 10,
          backgroundColor: '#FFFFFF',
          top: 1
        }}>
          <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", height: 60, width: '90%' }}>
            <Image source={require('../../assets/vechile-icon1.png')} style={{ width: 48, height: 48, borderRadius: 48 / 2 }}></Image>
            <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", height: 60, }}>
              <TextInput
                value={vehiclecolor}
                onChangeText={(text) => {
                  setVehiclecolor(text)
                }}
                placeholder="Vehicle Color"
                placeholderTextColor={Mycolors.GrayColor}
                style={styles.inputbox}
              />

            </View>


          </View>


        </View>
        {/* {Boxdesign('Pearl White', 60, () => { props.navigation.navigate('') })} */}
        <View style={{ height: 40 }}></View>
        <MyButtons title="Save" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => { Editdetail() }} marginHorizontal={20}
          titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.signupButton} marginVertical={10} />
        <MyButtons title="Cancel" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => { }} marginHorizontal={20}
          titlecolor={Mycolors.TEXT_COLOR} backgroundColor={Mycolors.BG_COLOR} />


        <View style={{ height: 40 }}></View>


      </ScrollView>
      {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
      {loading ? <Loader /> : null}
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
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
  inputbox: {
    height: 60,
    width: '100%',
    // fontSize: 12,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 10,
    color: Mycolors.TEXT_COLOR,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FFFFFF',
    top: 1
  },
});
export default RegistrationDetails;