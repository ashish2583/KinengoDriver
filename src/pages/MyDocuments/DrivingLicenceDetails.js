import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
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

const DrivingLicenceDetails = (props) => {
    const userdetaile = useSelector(state => state.user.user_details)
    const dispatch = useDispatch();
    const person_Image = "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    const [datas, setdatas] = useState([]);

    const [fullname, setFullName] = useState('');
    const [loading, setLoading] = useState(false)
    const [My_Alert, setMy_Alert] = useState(false)
    const [alert_sms, setalert_sms] = useState('')

    useEffect(() => {

    }, [])


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
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#3E5869', width: '80%', marginLeft: 10 }}>{ti}</Text>
                    <TouchableOpacity onPress={onclick ? onclick : () => { }} style={{ width: 41, height: 36, justifyContent: 'center', alignItems: "center" }}>
                        <Image source={require('../../assets/Details-edit-icon.png')} style={{ width: 60, height: 60, borderRadius: 60 / 2 }}></Image>
                    </TouchableOpacity>


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
                <View style={{ width: 280, alignSelf: "flex-start", borderRadius: 10, height: 164, }}>
                    <Image source={require('../../assets/images/licence-image.png')} style={{ width: 300, height: 180, overflow: 'hidden', alignSelf: 'center' }}></Image>
                </View>
                <View style={{ width: '100%', height: 45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#455A64', textAlign: "left" }}>License Detail Back</Text>

                </View>
                <View style={{ width: 280, alignSelf: "flex-start", borderRadius: 10, height: 164, }}>
                    <Image source={require('../../assets/images/licence-image.png')} style={{ width: 300, height: 180, overflow: 'hidden', alignSelf: 'center' }}></Image>
                </View>


                <View style={{ width: '100%', height: 45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#455A64' }}>Driving License Number</Text>

                </View>
                {Boxdesign(require('../../assets/licence-icon2.png'),'MH43BZ9017', 60, () => { props.navigation.navigate('') })}
                <View style={{ width: '100%', height: 45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#455A64' }}>Driving License Expiry Date</Text>

                </View>
                {Boxdesign(require('../../assets/licence-icon1.png'),'14/6/2025', 60, () => { props.navigation.navigate('') })}
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