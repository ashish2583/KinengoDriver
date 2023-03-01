import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground,Platform,PermissionsAndroid } from 'react-native';
import MyButtons from '../../component/MyButtons';
import { dimensions, Mycolors } from '../../utility/Mycolors';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import messaging from '@react-native-firebase/messaging';
import { useSelector, useDispatch } from 'react-redux';
import { requestPostApi, requestGetApi } from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyAlert from '../../component/MyAlert';
// import Toast from 'react-native-simple-toast';
import HomeHeader from '../../component/HomeHeader';
import SerchInput from '../../component/SerchInput';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const DrivingLicenceDetails = (props) => {
    const userdetaile = useSelector(state => state.user.user_details)
    const dispatch = useDispatch();
    const person_Image = "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    const [datas, setdatas] = useState([]);

    const [licenceno, setLicenceno] = useState('');
    const[licenceExpiryDate,setLicenceExpiryDate]=useState('');
    const [loading, setLoading] = useState(false)
    const [My_Alert, setMy_Alert] = useState(false)
    const [alert_sms, setalert_sms] = useState('')
    const [pick, setpick] = useState('');
    const [filepath, setfilepath] = useState(null);
    const [pick1, setpick1] = useState('')
    const [filepath1, setfilepath1] = useState(null)

    useEffect(() => {

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
          mediaType:'image',
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
          mediaType:'image',
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
    

    const Boxdesign = (img,ti, boxh, onclick) => {
        return (
            <View style={{
                height: boxh,
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
                    <Image source={img} style={{ width: 48, height: 48, borderRadius: 48 / 2 }}></Image>
                    <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", height: 60, }}>
                        <TextInput
                        value={licenceno}
                        onChangeText={(text) => {
                          setLicenceno(text)
                        }}
                        placeholder="Vehicle Number"
                        placeholderTextColor={Mycolors.GrayColor}
                        style={styles.inputbox}
                    />
                            
                        </View>
                    {/* <Text style={{ fontSize: 14, fontWeight: '600', color: '#3E5869', width: '80%', marginLeft: 10 }}>{ti}</Text> */}
                    {/* <TouchableOpacity onPress={onclick ? onclick : () => { }} style={{ width: 41, height: 36, justifyContent: 'center', alignItems: "center" }}>
                        <Image source={require('../../assets/Details-edit-icon.png')} style={{ width: 60, height: 60, borderRadius: 60 / 2 }}></Image>
                    </TouchableOpacity> */}


                </View>


            </View>

        )
    };


    return (
        <SafeAreaView style={styles.container}>
            <MyButtons title="License Detail" height={55} width={'100%'} alignSelf="center" imgpress={() => { props.navigation.goBack() }} marginHorizontal={20}
                titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} img='left' imgtop={16} imgleft={10} imgheight={20} imgwidth={25} />
            <ScrollView style={{ paddingHorizontal: 20 }}>
                <View style={{ width: '100%', height: 45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginTop: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#455A64', textAlign: "left" }}>License Detail Front</Text>

                </View>
                <View style={{ width: 250, alignSelf: "flex-start", borderRadius: 10, height: 170,borderWidth:1,borderColor:'#E0E0E0' }}>
                    {
                        pick == "" ? (
                            <TouchableOpacity onPress={()=>{checkCameraPermission()}} style={{ width: 250, alignSelf: "flex-start", borderRadius: 10, height: 170,borderWidth:1,borderColor:'#E0E0E0',paddingVertical:25 }}>
                    <Image resizeMode='contain' source={require('../../assets/camera1.png')} style={{ width: 200, height: 100, overflow: 'hidden', alignSelf: 'center'}}></Image>
                    </TouchableOpacity>
                        )
                        :
                        ( <View style={{ width: 250, alignSelf: "center", height: 170,borderRadius: 10,   }}>
                        <TouchableOpacity onPress={(()=>{setpick('')})} style={{position:'absolute',right:-20,top:-24 }}>
                        <Image resizeMode='cover' source={require('../../assets/cutRed.png')} style={{ width:30, height: 30, overflow: 'hidden', alignSelf: 'center',}}></Image>
                        </TouchableOpacity>
                       <Image resizeMode='cover' source={{uri:pick.uri}} style={{ width: "100%", height: "100%", overflow: 'hidden', alignSelf: 'center',borderRadius: 10,}}></Image>
                       </View>)
                    }
              
                    
                </View>
                {/* <View style={{ width: 280, alignSelf: "flex-start", borderRadius: 10, height: 164, }}>
                    <Image source={require('../../assets/images/licence-image.png')} style={{ width: 300, height: 180, overflow: 'hidden', alignSelf: 'center' }}></Image>
                </View> */}
                <View style={{ width: '100%', height: 45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#455A64', textAlign: "left" }}>License Detail Back</Text>

                </View>
                <View style={{ width: 250, alignSelf: "flex-start", borderRadius: 10, height: 170,borderWidth:1,borderColor:'#E0E0E0' }}>
                    {
                        pick1 == "" ? (
                            <TouchableOpacity onPress={()=>{opencamera2()}} style={{ width: 250, alignSelf: "flex-start", borderRadius: 10, height: 170,borderWidth:1,borderColor:'#E0E0E0',paddingVertical:25 }}>
                    <Image resizeMode='contain' source={require('../../assets/camera1.png')} style={{ width: 200, height: 100, overflow: 'hidden', alignSelf: 'center'}}></Image>
                    </TouchableOpacity>
                        )
                        :
                        ( <View style={{ width: 250, alignSelf: "center", height: 170,borderRadius: 10,   }}>
                        <TouchableOpacity onPress={(()=>{setpick1('')})} style={{position:'absolute',right:-20,top:-24 }}>
                        <Image resizeMode='cover' source={require('../../assets/cutRed.png')} style={{ width:30, height: 30, overflow: 'hidden', alignSelf: 'center',}}></Image>
                        </TouchableOpacity>
                       <Image resizeMode='cover' source={{uri:pick.uri}} style={{ width: "100%", height: "100%", overflow: 'hidden', alignSelf: 'center',borderRadius: 10,}}></Image>
                       </View>)
                    }
              
                    
                </View>
                {/* <View style={{ width: 280, alignSelf: "flex-start", borderRadius: 10, height: 164, }}>
                    <Image source={require('../../assets/images/licence-image.png')} style={{ width: 300, height: 180, overflow: 'hidden', alignSelf: 'center' }}></Image>
                </View> */}


                <View style={{ width: '100%', height: 45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#455A64' }}>Driving License Number</Text>

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
                    <Image source={require('../../assets/licence-icon2.png')} style={{ width: 48, height: 48, borderRadius: 48 / 2 }}></Image>
                    <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", height: 60, }}>
                        <TextInput
                        value={licenceno}
                        onChangeText={(text) => {
                          setLicenceno(text)
                        }}
                        placeholder="License Number"
                        placeholderTextColor={Mycolors.GrayColor}
                        style={styles.inputbox}
                    />
                            
                        </View>
                    


                </View>


            </View>
                {/* {Boxdesign(require('../../assets/licence-icon2.png'),'MH43BZ9017', 60, () => { props.navigation.navigate('') })} */}
                <View style={{ width: '100%', height: 45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#455A64' }}>Driving License Expiry Date</Text>

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
                    <Image source={require('../../assets/licence-icon1.png')} style={{ width: 48, height: 48, borderRadius: 48 / 2 }}></Image>
                    <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", height: 60, }}>
                        <TextInput
                        value={licenceExpiryDate}
                        onChangeText={(text) => {
                          setLicenceExpiryDate(text)
                        }}
                        placeholder="License Expiry Date"
                        placeholderTextColor={Mycolors.GrayColor}
                        style={styles.inputbox}
                    />
                            
                        </View>
                    


                </View>


            </View>
                {/* {Boxdesign(require('../../assets/licence-icon1.png'),'14/6/2025', 60, () => { props.navigation.navigate('') })} */}
                <View style={{ height: 40 }}></View>
                <MyButtons title="Save" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => { }} marginHorizontal={20}
                    titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.signupButton} marginVertical={10} />
                <MyButtons title="Cancel" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => { }} marginHorizontal={20}
                    titlecolor={Mycolors.TEXT_COLOR} backgroundColor={Mycolors.BG_COLOR} />


                <View style={{ height: 40 }}></View>

                {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
                {loading ? <Loader /> : null}
            </ScrollView>
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
export default DrivingLicenceDetails;