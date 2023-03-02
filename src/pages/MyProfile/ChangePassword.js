import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import MyButtons from '../../component/MyButtons';
import { dimensions, Mycolors } from '../../utility/Mycolors';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import messaging from '@react-native-firebase/messaging';
import { useSelector, useDispatch } from 'react-redux';
import { requestPostApi, requestGetApi, driver_change_password } from '../../WebApi/Service'
import Loader from '../../WebApi/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyAlert from '../../component/MyAlert';
// import Toast from 'react-native-simple-toast';
import HomeHeader from '../../component/HomeHeader';
import SerchInput from '../../component/SerchInput';

const ChangePassword = (props) => {
    const userdetaile = useSelector(state => state.user.user_details)
    const dispatch = useDispatch();
    const person_Image = "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    const [datas, setdatas] = useState([]);
    const [passView, setPassView] = useState(true);
    const [passView1, setPassView1] = useState(true);
    const [passView2, setPassView2] = useState(true);
    const [fullname, setFullName] = useState('');
    const [loading, setLoading] = useState(false)
    const [My_Alert, setMy_Alert] = useState(false)
    const [alert_sms, setalert_sms] = useState('')
    const [oldpass, setOldpass] = useState('');
    const [newpass, setNewpass] = useState('');
    const [confrmpass, setConfrmpass] = useState('');

    useEffect(() => {
        // console.log("userdetaile",userdetaile);
    }, [])

    const ChangePassword = async () => {
        console.log("userdetaile_userid", userdetaile);
        if (oldpass == '') {
            Alert.alert('Enter old Password');
        } else if (newpass == '') {
            Alert.alert('Enter New Password');
        } else if (confrmpass == '') {
            Alert.alert('Confirm New Password');
        } else {
            setLoading(true)
            var data = {
                "oldPassword": oldpass,
                "password": newpass,
                "confirm_password": confrmpass
            }
            const { responseJson, err } = await requestPostApi(driver_change_password + userdetaile.userid, data, 'PUT', userdetaile.token)
            setLoading(false)
            console.log('the res==>>', responseJson)
            if (responseJson.headers.success == 1) {
                console.warn('the status message==>>', responseJson.headers.message)
                // props.navigation.goBack();
                Alert.alert('',responseJson.headers.message)
              
            } else {
                setalert_sms(err)
                setMy_Alert(true)
            }
        }
    }




    return (
        <SafeAreaView style={styles.container}>
            <MyButtons title="Change Password" height={55} width={'100%'} alignSelf="center" imgpress={() => { props.navigation.goBack() }} marginHorizontal={20}
                titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} img='left' imgtop={16} imgleft={10} imgheight={20} imgwidth={25} />
            <ScrollView style={{ paddingHorizontal: 20 }}>

                <View style={{ width: dimensions.SCREEN_WIDTH - 40, marginTop: 25 }}>

                    <TextInput
                        value={oldpass}
                        onChangeText={(text) => {
                            setOldpass(text)
                        }}
                        placeholder="Enter old Password"
                        placeholderTextColor={Mycolors.GrayColor}
                        style={[styles.input, { paddingRight: 50 }]}
                        secureTextEntry={passView ? true : false}
                    />
                    <View style={{ position: 'absolute', right: 10, top: 18 }}>
                        <TouchableOpacity onPress={() => { setPassView(!passView) }}>
                            <Image source={passView ? require('../../assets/hide.png') : require('../../assets/view.png')} style={{ width: 35, height: 22 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ width: dimensions.SCREEN_WIDTH - 40, marginTop: 15 }}>

                    <TextInput
                        value={newpass}
                        onChangeText={(text) => {
                            setNewpass(text)
                        }}
                        placeholder="Enter New password"
                        placeholderTextColor={Mycolors.GrayColor}
                        style={[styles.input, { paddingRight: 50 }]}
                        secureTextEntry={passView1 ? true : false}
                    />
                    <View style={{ position: 'absolute', right: 10, top: 18 }}>
                        <TouchableOpacity onPress={() => { setPassView1(!passView1) }}>
                            <Image source={passView1 ? require('../../assets/hide.png') : require('../../assets/view.png')} style={{ width: 35, height: 22 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ width: dimensions.SCREEN_WIDTH - 40, marginTop: 15 }}>

                    <TextInput
                        value={confrmpass}
                        onChangeText={(text) => {
                            setConfrmpass(text)
                        }}
                        placeholder="Confirm New Password"
                        placeholderTextColor={Mycolors.GrayColor}
                        style={[styles.input, { paddingRight: 50 }]}
                        secureTextEntry={passView2 ? true : false}
                    />
                    <View style={{ position: 'absolute', right: 10, top: 18 }}>
                        <TouchableOpacity onPress={() => { setPassView2(!passView2) }}>
                            <Image source={passView2 ? require('../../assets/hide.png') : require('../../assets/view.png')} style={{ width: 35, height: 22 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ height: 50 }}></View>
                <MyButtons title="Change Password" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => { ChangePassword() }} marginHorizontal={20}
                    titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.signupButton} marginVertical={10} />
                <MyButtons title="Cancel" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => { }} marginHorizontal={20}
                    titlecolor={Mycolors.TEXT_COLOR} backgroundColor={Mycolors.BG_COLOR} />

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
        height: 60,
        width: '100%',
        // fontSize: 12,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 5,
        color: Mycolors.TEXT_COLOR,
        paddingLeft: 20,
        paddingRight: 10,
        backgroundColor: Mycolors.BG_COLOR,
        top: 1
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
export default ChangePassword;