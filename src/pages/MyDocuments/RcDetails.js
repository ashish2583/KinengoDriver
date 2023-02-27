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

const RcDetails = (props) => {
    const userdetaile = useSelector(state => state.user.user_details)
    const dispatch = useDispatch();
    const person_Image = "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    const [datas, setdatas] = useState([]);

    const [fullname, setFullName] = useState('');
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

    }, [])


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
const Boxdesign =(ti,boxh,onclick)=>{
    return( <View style={{ width: dimensions.SCREEN_WIDTH - 40,  flexDirectionL:'row', }}>
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
        <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", height: 60, }}> 
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#3E5869',width: '80%'}}>{ti}</Text>
         <TouchableOpacity onPress={onclick ? onclick : () => { }} style={{ width: 41, height: 36,justifyContent: 'center',alignItems:"center"}}>
         <Image source={require('../../assets/Details-edit-icon.png')} style={{ width: 60, height: 60, borderRadius: 60 / 2 }}></Image>
         </TouchableOpacity>
           
                 
            </View>
       
         
    </View>
    </View> 
    )
};
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
            <MyButtons title="RC Detail" height={55} width={'100%'} alignSelf="center" imgpress={() => { props.navigation.goBack() }} marginHorizontal={20}
                titlecolor={Mycolors.TEXT_COLOR} backgroundColor={'transparent'} img='left' imgtop={16} imgleft={10} imgheight={20} imgwidth={25} />
            <ScrollView style={{ paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: "center", width: '95%', marginHorizontal: 10, }}>

                    <View style={{
                        width: '49%', height: 160, padding: 10, marginTop: 30, borderRadius: 10, marginRight: 15,
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
                            <View style={{ alignItems: 'center', }}>
                                <Image source={require('../../assets/RC-icon1.png')} style={{ width: 60, height: 60, borderRadius: 60 / 2 }}></Image>

                            </View>
                            <View style={{ justifyContent: "center", width: '95%', alignItems: 'center', marginTop: 5 }}>
                                <Text style={{ color: Mycolors.TEXT_COLOR, fontSize: 13, fontWeight: '600', textAlign: "center" }}>Vehicle Registration Certificate
                                </Text>

                            </View>

                        </View>
                        <View style={{ height: 25, justifyContent: 'center', alignSelf: "center", marginTop: 7 }}>
                            <MyButtons title="Know More" height={25} width={80} borderRadius={5} press={() => {
                                props.navigation.navigate('RegistrationDetails')}} fontSize={13}
                                titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={'#FFD037'} />
                        </View>



                    </View>

                    <View style={{
                        width: '49%', height: 160, padding: 10, marginTop: 30, borderRadius: 10,
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
                            <View style={{ alignItems: 'center', }}>
                                <Image source={require('../../assets/RC-icon2.png')} style={{ width: 60, height: 60, borderRadius: 60 / 2 }}></Image>

                            </View>
                            <View style={{ justifyContent: "center", width: '95%', alignItems: 'center', marginTop: 5 }}>
                                <Text style={{ color: 'Mycolors.TEXT_COLOR', fontSize: 13, fontWeight: '600', textAlign: "center" }}>Vehicle Driving Licence
                                </Text>

                            </View>

                        </View>
                        <View style={{ height: 25, justifyContent: 'center', alignSelf: "center", marginTop: 7 }}>
                            <MyButtons title="Know More" height={25} width={80} borderRadius={5} press={() => {
                                props.navigation.navigate('DrivingLicenceDetails')}} fontSize={13}
                                titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={'#FFD037'} />
                        </View>
                        {/* <View style={{ flexDirection: "row", width: '100%', justifyContent: "center", alignSelf: "center", alignItems: "center", }}>
 <TouchableOpacity style={{ width: 160, height: 40, justifyContent: 'center', borderRadius: 5, backgroundColor: '#FFC40C', shadowColor: '#6D2F91', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.03, elevation: 4 }}
        onPress={() => {props.navigation.navigate(' ')}}>
        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", }}>
            <Image source={require('../../assets/ID-Card-icon.png')} style={{ width: 15, height: 20, }}></Image>
            <Text style={{ marginLeft: 6, fontSize: 13, color: Mycolors.BG_COLOR, textAlign: 'center', fontWeight: '400' }}>KinenGo ID card</Text>
        </View>
</TouchableOpacity>
 </View> */}

                    </View>
                </View>
                <View style={{ alignItems: 'center', marginTop: 10, justifyContent: "center" }}>
                    {CustomButtonDesign(require('../../assets/Gov-ID-card-icon.png'), 'Government ID card', 40, 40, () => { props.navigation.navigate('') })}

                </View>

                <View style={{ width: '100%', height: 45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginTop: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#455A64' }}>Full Name</Text>

                </View>
                {Boxdesign('Jane Smith',60,()=>{props.navigation.navigate('') })}

                <View style={{ width: '100%', height: 45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#455A64' }}>Mobile Number</Text>

                </View>
                {Boxdesign('+917983749857',60,()=>{props.navigation.navigate('') })}
                <View style={{ width: '100%', height: 45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#455A64' }}>Gender</Text>

                </View>
                {Boxdesign('Male',60,()=>{props.navigation.navigate('') })}
                <View style={{ width: '100%', height: 45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#455A64' }}>Address</Text>

                </View>
                {Boxdesign('37, Across Mahalaxmi Complex, Binod, 46, Parui Cantt., Bakultala, Andaman and Nicobar, Pincode-725651',80,()=>{props.navigation.navigate('') })}
                {/* <View style={{ width: dimensions.SCREEN_WIDTH - 40,  flexDirectionL:'row', }}>
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
                    <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", height: 60, }}> 
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#455A64' }}>Jane Smith</Text>
                     <TouchableOpacity style={{ width: 41, height: 36,justifyContent: 'center',alignItems:"center"}}>
                     <Image source={require('../../assets/Details-edit-icon.png')} style={{ width: 60, height: 60, borderRadius: 60 / 2 }}></Image>
                     </TouchableOpacity>
                       
                             
                        </View>
                   
                     
                </View>

                <TextInput
                        value={fullname}
                        onChangeText={(text) => {
                            setFullName(text)
                        }}
                        placeholder="Frist Name"
                        placeholderTextColor={Mycolors.GrayColor}
                        style={styles.inputbox}
                    />

            </View> */}
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
export default RcDetails