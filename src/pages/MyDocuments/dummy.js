// //react components
// import React, {useEffect, useRef, useState} from 'react';
// import {
//   View,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   Keyboard,
//   PermissionsAndroid,
//   Image,
// } from 'react-native';
// import {CommonActions} from '@react-navigation/native';
// //custom components
// import DocumentViewer from 'modals/DocumentViewer/DocumentViewer';
// import DeleteCertification from 'modals/DeleteCertification/DeleteCertification';
// import SearchLocation from 'modals/SearchLocation/SearchLocation';
// import MyButton from 'components/MyButton/MyButton';
// import MyHeader from 'components/MyHeader/MyHeader';
// import MyText from 'components/MyText/MyText';
// import MyTextInput from 'components/MyTextInput/MyTextInput';
// import TextInputWithFlag from 'components/TextInputWithFlag/TextInputWithFlag';
// import DateSelector from 'components/DateSelector/DateSelector';
// import CustomLoader from 'components/CustomLoader/CustomLoader';
// import SelectAddress from 'modals/SelectAddress/SelectAddress';
// import SelectImageSource from 'modals/SelectImageSource/SelectImageSource';
// //import : third parties
// import {useNetInfo} from "@react-native-community/netinfo";
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import DatePicker from 'react-native-date-picker';
// import CountryPicker from 'react-native-country-codes-picker';
// import moment from 'moment';
// import Geolocation from 'react-native-geolocation-service';
// import Geocoder from 'react-native-geocoding';
// import Toast from 'react-native-simple-toast';
// import DocumentPicker from 'react-native-document-picker';
// // import Pdf from 'react-native-pdf';
// //globals
// import {Colors, Constant, MyIcon, ScreenNames, Service} from 'global/Index';
// //styles
// import {styles} from './ServiceEditProfileStyle';
// //redux
// import {connect, useDispatch, useSelector} from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {setUser} from 'src/reduxToolkit/reducer/user';
// import {showToast} from 'src/reduxToolkit/reducer/customToast';

// const getCertsLength = (one, two, three) => {
//   let len = 0
//   one && len++
//   two && len++
//   three && len++
//   return len
// }

// const isImage = (doc) =>{
//   // if(typeof doc === 'object' &&  (doc?.type == 'image/jpeg' || doc?.type == 'image/jpg' || doc?.type == 'image/png') ){
//   if(typeof doc === 'object' && doc?.type?.startsWith('image/') ){
//     return true
//   }else if(doc?.toString().endsWith('.jpeg') || doc?.toString().endsWith('.jpg') || doc?.toString().endsWith('.png')){
//     return true
//   }
//   return false
// }
// const isPdf = (doc) =>{
//   if(typeof doc === 'object' && doc?.type == 'application/pdf' ){
//     return true
//   }else if(doc?.toString().endsWith('.pdf')){
//     return true
//   }
//   return false
// }

// const ServiceEditProfile = ({navigation, userToken, userInfo}) => {
//   const {isInternetReachable} = useNetInfo();
//   Geocoder.init('AIzaSyBJqbxRoFBbpmwDrHOtVM26s9R1Fh5UWp0');
//   const GOOGLE_MAPS_APIKEY = 'AIzaSyACzgsZq8gI9VFkOw_fwLJdmezbc4iUxiM';
//   console.warn(userInfo);
//   //redux variables
//   //ref
//   const firstNameRef = useRef();
//   const lastNameRef = useRef();
//   const emailAddressRef = useRef();
//   const phoneNumberRef = useRef();
//   const addressRef = useRef();
//   //variables
//   const dispatch = useDispatch();
//   //states
//   const [showLoader, setShowLoader] = useState('');
//   const [firstName, setFirstName] = useState(
//     userInfo.first_name ? userInfo.first_name : '',
//   );
//   const [lastName, setLastName] = useState(
//     userInfo.last_name ? userInfo.last_name : '',
//   );
//   const [emailAddress, setEmailAddress] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState(
//     userInfo.phone ? userInfo.phone : '',
//   );
//   const [filePath, setFilePath] = useState('');
//   const [isProfilePicture, setIsProfilePicture] = useState(false);
//   const [whichIndex, setWhichIndex] = useState(null);
//   const [docFilePaths, setDocFilePaths] = useState(['','','']);
//   const [documentFiles, setDocumentFiles] = useState([userInfo?.certificate1, userInfo?.certificate2, userInfo?.certificate3,])
//   const [uploadedFiles, setUploadedFiles] = useState([{},{},{},])
//   const [certsLength, setCertsLength] = useState(getCertsLength(userInfo?.certificate1, userInfo?.certificate2, userInfo?.certificate3,));
//   const [originalCertsLength, setOriginalCertsLength] = useState(getCertsLength(userInfo?.certificate1, userInfo?.certificate2, userInfo?.certificate3,));
//   const [documentPaths, setDocumentPaths] = useState([...Array(certsLength).keys()].map(el=>''));
//   const [expiryStatuses] = useState([userInfo?.expiry_status1, userInfo?.expiry_status2, userInfo?.expiry_status3,])
//   const [approvedStatuses] = useState([userInfo?.approved_status1, userInfo?.approved_status2, userInfo?.approved_status3,])
//   const [gender, setGender] = useState(1);
//   const [oldAddress, setOldAddress] = useState(
//     userInfo.location ? userInfo.location : '',
//   );
//   const [address, setAddress] = useState('');
//   const [latLng, setLatLng] = useState({lat: userInfo.lat, lng: userInfo.long});
//   const [showSelectAddress, setShowSelectAddress] = useState(false);
//   const [allCurrentLocations, setAllCurrentLocations] = useState([]);
//   const [date, setDate] = useState(
//     userInfo.dob ? new Date(userInfo.dob) : new Date(),
//   );
//   // const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
//   const source = { uri: documentFiles[1], cache: true };
//   const [show, setShow] = useState(false);
//   const [showImageSourceModal, setShowImageSourceModal] = useState(false);
//   const [showDocumenteModal, setShowDocumenteModal] = useState(false);
//   const [showImage, setShowImage] = useState(false);
//   const [selectedDocument, setSelectedDocument] = useState('');
//   const [openDeleteCertModal, setOpenDeleteCertModal] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(null);
//   const [selectedCountry, setSelectedCountry] = useState({
//     dial_code: userInfo.country_code,
//     flag: userInfo.country_flag,
//   });
//   const [open, setOpen] = useState(false);
//   const [document1, setDocument1] = useState('');
//   const [document2, setDocument2] = useState('');
//   const [document3, setDocument3] = useState('');
//   const [showLocationModal, setShowLocationModal] = useState(false);
//   const [expiryDates, setExpiryDates] = useState([userInfo?.certificate1 ? new Date(userInfo?.expiry_date1) : new Date(), userInfo?.certificate2 ? new Date(userInfo?.expiry_date2) : new Date(), userInfo?.certificate3 ? new Date(userInfo?.expiry_date3) : new Date(), ]);
//   const [openExpiryDates, setOpenExpiryDates] = useState([false,false,false,]);
//   const [issueDates, setIssueDates] = useState([userInfo?.certificate1 ? new Date(userInfo?.issue_date1) : new Date(), userInfo?.certificate2 ? new Date(userInfo?.issue_date2) : new Date(), userInfo?.certificate3 ? new Date(userInfo?.issue_date3) : new Date()]);
//   const [openIssueDates, setOpenIssueDates] = useState([false,false,false,]);
//   const [currentIndex, setCurrentIndex] = useState(null);
//   const [spApprovedStatus, setSpApprovedStatus] = useState(userInfo?.is_approved);
//   //function : navigation function
//   const gotoProfile = () => navigation.navigate(ScreenNames.SERVICE_PROFILE);
//   //function : imp function
//   const resetIndexGoToNoConnection = CommonActions.reset({
//     index: 1,
//     routes: [{name: ScreenNames.NO_CONNECTION}],
//   });
//   const getDocApprovalStatus = async () => {
//     setShowLoader(true)
//     try {
//       const myData = new FormData();
//       myData.append('id', userInfo.id);
//       const resp = await Service.postApiWithToken(
//         userToken,
//         // Service.TOTAL_PAYMENT_RECEIVED,  
//         Service.SERVICE_APPROVED_STATUS,
//         myData
//       );
//       console.log('getDocApprovalStatus resp', resp.data.data);
//       if (resp.data.status) {
//         setSpApprovedStatus(resp.data.data?.is_approved)
//         const updatedUserInfo = {...userInfo, approved_status1: resp.data.data?.approved_status1, approved_status2: resp.data.data?.approved_status2, approved_status3: resp.data.data?.approved_status3, 
//           is_approved: resp.data.data?.is_approved, 
//         }
//         console.log('updatedUserInfo', updatedUserInfo);
//         await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
//         dispatch(setUser(updatedUserInfo));
//         // {approved_status1: '1', approved_status2: '0', approved_status3: '0'}
//         // if(typeof resp.data?.totalamount === 'number'){
//         //   await AsyncStorage.setItem('totalPaymentAmount', JSON.stringify(resp.data?.totalamount));
//         //   dispatch(setTotalPaymentAmount(resp.data?.totalamount));
//         // }
//         // setTotalPayment(resp.data?.totalamount);
//       }
//     } catch (error) {
//       console.log('error in getDocApprovalStatus', error);
//     }
//     setShowLoader(false)
//   };
//   useEffect(() => {
//     //only for checking when wifi or data is on
//     // if (isConnected === null) return;
//     // if (!isConnected) {
//     //   navigation?.navigate(ScreenNames.NETWORK_ERROR);
//     // } else {
//     //   if (navigation?.canGoBack()) {
//     //     navigation?.goBack();
//     //   }
//     // }
//     //actual checking of internet reachability
//     console.log('isInternetReachable', isInternetReachable);
//     if (isInternetReachable === undefined || isInternetReachable === null)
//       return;
//     if (!isInternetReachable) {
//       // navigation.navigate(ScreenNames.NO_CONNECTION);
//       navigation.dispatch(resetIndexGoToNoConnection);
//     } 
//     // else {
//     //   if (navigation?.canGoBack()) {
//     //     navigation?.goBack();
//     //   }
//     // }
//   }, [isInternetReachable]);
//   useEffect(()=>{
//     getDocApprovalStatus()
//   },[])
//   useEffect(()=>{
//     console.log('documentFiles', documentFiles);
//     console.log('edit profile userInfo', userInfo);
//   },[])
//   //function : imp function
//   const openLibrary = () => {
//     let options = {
//       title: 'Select Image',
//       customButtons: [
//         {
//           name: 'customOptionKey',
//           title: 'Choose Photo from Custom Option',
//         },
//       ],
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };
//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         // Alert.alert('User cancelled camera picker');
//         setShowImageSourceModal(false);
//         // dispatch(showToast({text: 'User cancelled picking image'}));
//         Toast.show('User cancelled picking image', Toast.SHORT)
//         // Alert.alert('User cancelled picking image');
//         return;
//       } else if (response.errorCode == 'camera_unavailable') {
//         setShowImageSourceModal(false);
//         // dispatch(showToast({text: 'Camera not available on device'}));
//         Toast.show('Camera not available on device', Toast.SHORT)
//         // Alert.alert('Camera not available on device');
//         return;
//       } else if (response.errorCode == 'permission') {
//         setShowImageSourceModal(false);
//         // dispatch(showToast({text: 'Permission not satisfied'}));
//         Toast.show('Permission not satisfied', Toast.SHORT)
//         // Alert.alert('Permission not satisfied');
//         return;
//       } else if (response.errorCode == 'others') {
//         setShowImageSourceModal(false);
//         // dispatch(showToast({text: response.errorMessage}));
//         Toast.show(response.errorMessage, Toast.SHORT)
//         // Alert.alert(response.errorMessage);
//         return;
//       }
//       console.log('Response = ', response.assets[0]);
//       if(isProfilePicture){
//         setFilePath(response.assets[0]);
//       }else{
//         const docFilePathsCopy = [...docFilePaths]
//         docFilePathsCopy[whichIndex] = response.assets[0]
//         setDocFilePaths(docFilePathsCopy)
//       }
//       setShowImageSourceModal(false);
//     });
//   };
//   //function : imp function
//   const openCamera = () => {
//     const options = {
//       width: 1080,
//       height: 1080,
//       cropping: true,
//       mediaType: 'photo',
//       compressImageQuality: 1,
//       compressImageMaxHeight: 1080 / 2,
//       compressImageMaxWidth: 1080 / 2,
//     };
//     launchCamera(options, response => {
//       if (response.didCancel) {
//         // Alert.alert('User cancelled camera picker');
//         setShowImageSourceModal(false);
//         // dispatch(showToast({text: 'User cancelled picking image'}));
//         Toast.show('User cancelled picking image', Toast.SHORT)
//         // Alert.alert('User cancelled picking image');
//         return;
//       } else if (response.errorCode == 'camera_unavailable') {
//         setShowImageSourceModal(false);
//         // dispatch(showToast({text: 'Camera not available on device'}));
//         Toast.show('Camera not available on device', Toast.SHORT)
//         // Alert.alert('Camera not available on device');
//         return;
//       } else if (response.errorCode == 'permission') {
//         setShowImageSourceModal(false);
//         // dispatch(showToast({text: 'Permission not satisfied'}));
//         Toast.show('Permission not satisfied', Toast.SHORT)
//         // Alert.alert('Permission not satisfied');
//         return;
//       } else if (response.errorCode == 'others') {
//         setShowImageSourceModal(false);
//         // dispatch(showToast({text: response.errorMessage}));
//         Toast.show('response.errorMessage', Toast.SHORT)
//         // Alert.alert(response.errorMessage);
//         return;
//       }
//       console.log('Response = ', response.assets[0]);
//       if(isProfilePicture){
//         setFilePath(response.assets[0]);
//       }else{
//         const docFilePathsCopy = [...docFilePaths]
//         docFilePathsCopy[whichIndex] = response.assets[0]
//         setDocFilePaths(docFilePathsCopy)
//       }
//       // setFilePath(response.assets[0]);
//       setShowImageSourceModal(false);
//     });
//   };
//   //function : imp function
//   const checkCameraPermission = async () => {
//     if (Platform.OS === 'ios') {
//       openCamera();
//     } else {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           {
//             title: 'Camera Permission Required',
//             message:
//               'Application needs access to your camera to click your profile image',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           openCamera();
//           console.log('Camera Permission Granted.');
//         } else {
//           // dispatch(showToast({Text: 'Camera Permission Not Granted'}));
//           Toast.show('Camera Permission Not Granted', Toast.SHORT)
//           // Alert.alert('Error', 'Camera Permission Not Granted');
//         }
//       } catch (err) {
//         // To handle permission related exception
//         console.log('ERROR' + err);
//       }
//     }
//   };
//   //function : imp function
//   const Validation = () => {
//     if (phoneNumber !== '' && phoneNumber?.length < 10) {
//       // dispatch(showToast({Text: 'Phone number should be 10 digits long'}));
//       Toast.show('Phone number should be 10 digits long', Toast.SHORT)
//       // Alert.alert('', 'Phone number should be 10 digits long');
//     }
//     // certification 1 validation
//     else if (userInfo.expiry_status1 === true && docFilePaths[0] != '' && moment(expiryDates[0]).isBefore(new Date(), 'day')) {
//       Toast.show('Expiry Date should be in future', Toast.SHORT)
//     }
//     else if (userInfo.expiry_status1 === true && docFilePaths[0] == '' && moment(expiryDates[0]).isAfter(new Date(), 'day')) {
//       Toast.show('For expired certification, you also need to change certification image along with Expiry Date', Toast.LONG)
//     }
//     // certification 2 validation
//     else if (userInfo.expiry_status2 === true && docFilePaths[1] != '' && moment(expiryDates[1]).isBefore(new Date(), 'day')) {
//       Toast.show('Expiry Date should be in future', Toast.SHORT)
//     }
//     else if (userInfo.expiry_status2 === true && docFilePaths[1] == '' && moment(expiryDates[1]).isAfter(new Date(), 'day')) {
//       Toast.show('For expired certification, you also need to change certification image along with Expiry Date', Toast.LONG)
//     }
//     // certification 3 validation
//     else if (userInfo.expiry_status3 === true && docFilePaths[2] != '' && moment(expiryDates[2]).isBefore(new Date(), 'day')) {
//       Toast.show('Expiry Date should be in future', Toast.SHORT)
//     }
//     else if (userInfo.expiry_status3 === true && docFilePaths[2] == '' && moment(expiryDates[2]).isAfter(new Date(), 'day')) {
//       Toast.show('For expired certification, you also need to change certification image along with Expiry Date', Toast.LONG)
//     }
//     else if(originalCertsLength === 1 && docFilePaths[1] != '' && moment(issueDates[1]).format('YYYY-MM-DD') == moment(new Date()).format('YYYY-MM-DD')){
//       Toast.show('Add Issue Date for certification 2', Toast.LONG)
//     } 
//     else if(originalCertsLength === 1 && docFilePaths[1] != '' && moment(expiryDates[1]).format('YYYY-MM-DD') == moment(new Date()).format('YYYY-MM-DD')){
//       Toast.show('Add Expiry Date for certification 2', Toast.LONG)
//     } 
//     else if((originalCertsLength === 1 || originalCertsLength === 2) && docFilePaths[2] != '' && moment(issueDates[2]).format('YYYY-MM-DD') == moment(new Date()).format('YYYY-MM-DD')){
//       Toast.show('Add Issue Date for certification 3', Toast.LONG)
//     } 
//     else if((originalCertsLength === 1 || originalCertsLength === 2) && docFilePaths[2] != '' && moment(expiryDates[2]).format('YYYY-MM-DD') == moment(new Date()).format('YYYY-MM-DD')){
//       Toast.show('Add Expiry Date for certification 3', Toast.LONG)
//     } 
//     else return true;
//   };
//   //function : service function
//   const editProfile = async () => {
//     if (Validation()) {
//       setShowLoader(true);
//       const editProfileData = new FormData();
//       editProfileData.append(
//         'first_name',
//         firstName == '' ? userInfo.first_name : firstName,
//       );
//       editProfileData.append(
//         'last_name',
//         lastName == '' ? userInfo.last_name : lastName,
//       );
//       editProfileData.append(
//         'phone',
//         phoneNumber == '' ? userInfo.phone : phoneNumber,
//       );
//       editProfileData.append('email', userInfo.email);
//       editProfileData.append('country_code', selectedCountry.dial_code);
//       editProfileData.append('country_flag', selectedCountry.flag);
//       editProfileData.append('dob', moment(date).format('YYYY-MM-DD'));
//       editProfileData.append('latitude', latLng.lat);
//       editProfileData.append('longtitude', latLng.lng);
//       if (filePath != '') {
//         const imageName = filePath.uri.slice(
//           filePath.uri.lastIndexOf('/'),
//           filePath.uri.length,
//         );
//         editProfileData.append('profile_image', {
//           name: imageName,
//           type: filePath.type,
//           uri: filePath.uri,
//         });
//       }
//       address?.trim()?.length > 0 && editProfileData.append('address', address);
//       editProfileData.append('gender', gender);
//       // append documents
//       // if (documentFiles[0] != '') {
//       if (documentFiles[0] != null || docFilePaths[0] != '') {
//         console.log(`docFilePaths[0] != ''`, docFilePaths[0] != '');
//         if (docFilePaths[0] != '') {
//           const imageName = docFilePaths[0].uri.slice(
//             docFilePaths[0].uri.lastIndexOf('/'),
//             docFilePaths[0].uri.length,
//           );
//           editProfileData.append('is_reupload1', 1)
//           editProfileData.append('certification1', {
//             name: imageName,
//             type: docFilePaths[0].type,
//             uri: docFilePaths[0].uri,
//           });
//         }else{
//           editProfileData.append('is_reupload1', 0)
//           editProfileData.append('certification1',documentFiles[0])
//         }
//       }
//       // if (documentFiles[1] != '') {
//       if (documentFiles[1] != null || docFilePaths[1] != '') {
//         if (docFilePaths[1] != '') {
//           const imageName = docFilePaths[1].uri.slice(
//             docFilePaths[1].uri.lastIndexOf('/'),
//             docFilePaths[1].uri.length,
//           );
//           editProfileData.append('is_reupload2', 1)
//           editProfileData.append('certification2', {
//             name: imageName,
//             type: docFilePaths[1].type,
//             uri: docFilePaths[1].uri,
//           });
//         }else{
//           editProfileData.append('is_reupload2', 0)
//           editProfileData.append('certification2',documentFiles[1])
//         }
//       }
//       // if (documentFiles[2] != '') {
//       if (documentFiles[2] != null || docFilePaths[2] != '') {
//         if (docFilePaths[2] != '') {
//           const imageName = docFilePaths[2].uri.slice(
//             docFilePaths[2].uri.lastIndexOf('/'),
//             docFilePaths[2].uri.length,
//           );
//           editProfileData.append('is_reupload3', 1)
//           editProfileData.append('certification3', {
//             name: imageName,
//             type: docFilePaths[2].type,
//             uri: docFilePaths[2].uri,
//           });
//         }else{
//           editProfileData.append('is_reupload3', 0)
//           editProfileData.append('certification3',documentFiles[2])
//         }
//       }
//       // if (documentFiles[0] !== null && (documentFiles[0] != '' || typeof documentFiles[0] === 'object')) {
//       //   editProfileData.append('certification1', 
//       //   typeof documentFiles[0] === 'object' ?
//       //   {
//       //     name: documentFiles[0]?.name,
//       //     type: documentFiles[0]?.type,
//       //     uri: documentFiles[0]?.uri,
//       //     // expiryDate: moment(expiryDate1).format('YYYY-MM-DD'),
//       //     // issueDate: moment(issueDate1).format('YYYY-MM-DD')
//       //   } : documentFiles[0])
//       // }
//       // if (documentFiles[1] !== null && (documentFiles[1] != '' || typeof documentFiles[1] === 'object')) {
//       //   editProfileData.append('certification2', 
//       //   typeof documentFiles[1] === 'object' ?
//       //   {
//       //     name: documentFiles[1]?.name,
//       //     type: documentFiles[1]?.type,
//       //     uri: documentFiles[1]?.uri,
//       //     // expiryDate: moment(expiryDate2).format('YYYY-MM-DD'),
//       //     // issueDate: moment(issueDate2).format('YYYY-MM-DD')
//       //   } : documentFiles[1]);
//       // }
//       // if (documentFiles[2] !== null && (documentFiles[2] != '' || typeof documentFiles[2] === 'object')) {
//       //   editProfileData.append('certification3', 
//       //   typeof documentFiles[2] === 'object' ?
//       //   {
//       //     name: documentFiles[2]?.name,
//       //     type: documentFiles[2]?.type,
//       //     uri: documentFiles[2]?.uri,
//       //     // expiryDate: moment(expiryDate3).format('YYYY-MM-DD'),
//       //     // issueDate: moment(issueDate3).format('YYYY-MM-DD')
//       //   } : documentFiles[2]);
//       // }

//       if (documentFiles[0] != null || docFilePaths[0] != '') {
//         editProfileData.append('issueDate1', moment(issueDates[0]).format('YYYY-MM-DD'));
//         editProfileData.append('expiryDate1', moment(expiryDates[0]).format('YYYY-MM-DD'));
//       }
//       if (documentFiles[1] != null || docFilePaths[1] != '') {
//         editProfileData.append('issueDate2', moment(issueDates[1]).format('YYYY-MM-DD'));
//         editProfileData.append('expiryDate2', moment(expiryDates[1]).format('YYYY-MM-DD'));
//       }
//       if (documentFiles[2] != null || docFilePaths[2] != '') {
//         editProfileData.append('issueDate3', moment(issueDates[2]).format('YYYY-MM-DD'));
//         editProfileData.append('expiryDate3', moment(expiryDates[2]).format('YYYY-MM-DD'));
//       }
//       // if (documentFiles[0] !== null && (documentFiles[0] != '' || typeof documentFiles[0] === 'object')) {
//       //   editProfileData.append('issueDate1', moment(issueDates[0]).format('YYYY-MM-DD'));
//       //   editProfileData.append('expiryDate1', moment(expiryDates[0]).format('YYYY-MM-DD'));
//       // }
//       // if (documentFiles[1] !== null && (documentFiles[1] != '' || typeof documentFiles[1] === 'object')) {
//       //   editProfileData.append('issueDate2', moment(issueDates[1]).format('YYYY-MM-DD'));
//       //   editProfileData.append('expiryDate2', moment(expiryDates[1]).format('YYYY-MM-DD'));
//       // }
//       // if (documentFiles[2] !== null && (documentFiles[2] != '' || typeof documentFiles[2] === 'object')) {
//       //   editProfileData.append('issueDate3', moment(issueDates[2]).format('YYYY-MM-DD'));
//       //   editProfileData.append('expiryDate3', moment(expiryDates[2]).format('YYYY-MM-DD'));
//       // }
//       console.log('serv editProfileData', editProfileData);
//       // setShowLoader(false)
//       // return
//       console.warn(editProfileData);
//       try {
//         const resp = await Service.postApiWithToken(
//           userToken,
//           Service.SERVICE_UPDATE_PROFILE,
//           editProfileData,
//         );
//         console.log('serv edit resp', resp);
//         if (resp.data.status) {
//           // Alert.alert('', resp.data.message);
//           Toast.show(resp.data.message, Toast.SHORT);
//           const jsonValue = JSON.stringify(resp.data.data);
//           console.log('edit jsonValue', jsonValue);
//           await AsyncStorage.setItem('userInfo', jsonValue);
//           dispatch(setUser(resp.data.data));
//           gotoProfile();
//         } else {
//           // Alert.alert('', resp.data.message);
//           Toast.show(resp.data.message, Toast.SHORT);
//         }
//       } catch (error) {
//         console.log('error in editProfile', error);
//       }
//       setShowLoader(false);
//     }
//   };

//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Access Required',
//             message: 'This App needs to Access your location',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           getCurrentLocation();
//         } else {
//           // dispatch(showToast('Location permission denied'));
//           Toast.show('Location permission denied', Toast.SHORT)
//           // Alert.alert('', 'Location permission denied');
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     }
//   };
//   const getCurrentLocation = () => {
//     setShowLoader(true);
//     try {
//       Geolocation.getCurrentPosition(
//         position => {
//           Geocoder.from(position.coords.latitude, position.coords.longitude)
//             .then(json => {
//               if (json.status == 'OK') {
//                 // setAllCurrentLocations(json.results);
//                 var addressComponent = json.results[0].formatted_address;
//                 setAddress(json.results[0].formatted_address);
//                 setLatLng(json.results[0].geometry.location);
//                 setShowLocationModal(true);
//                 console.log(addressComponent);
//                 setShowLoader(false);
//                 // setShowSelectAddress(true);
//               }
//             })
//             .catch(error => console.warn(error));
//         },
//         error => {
//           setShowLoader(false);
//           // See error code charts below.
//           console.log(error.code, error.message);
//         },
//         {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//       );
//     } catch (error) {
//       setShowLoader(false);
//       console.log('error in updateLocation', error);
//     }
//   };
//   const changeOpenIssueDates = (value, index) => {
//     const openIssueDatesCopy = [...openIssueDates]
//     openIssueDatesCopy[index] = value
//     setOpenIssueDates(openIssueDatesCopy)
//   }
//   const changeOpenExpiryDates = (value, index) => {
//     const openExpiryDatesCopy = [...openExpiryDates]
//     openExpiryDatesCopy[index] = value
//     setOpenExpiryDates(openExpiryDatesCopy)
//   }
//   const changeIssueDates = (value, index) => {
//     const issueDatesCopy = [...issueDates]
//     issueDatesCopy[index] = value
//     setIssueDates(issueDatesCopy)
//   }
//   const changeExpiryDates = (value, index) => {
//     const expiryDatesCopy = [...expiryDates]
//     expiryDatesCopy[index] = value
//     setExpiryDates(expiryDatesCopy)
//   }
//   const openDocument = async ind => {
//     try {
//       const resp = await DocumentPicker.pickSingle({
//         // type: [DocumentPicker.types.allFiles]
//         type: [DocumentPicker.types.images],
//       });
//       console.log('docpicker resp', resp);
//       // const documentsCopy = [...uploadedFiles]
//       // documentsCopy[ind] = resp?.uri 
//       // console.log('documentsCopy', documentsCopy);
//       // setUploadedFiles(documentsCopy)
//       const documentsCopy = [...documentFiles]
//       // documentsCopy[ind] = resp?.uri 
//       documentsCopy[ind] = resp 
//       console.log('documentsCopy', documentsCopy);
//       setDocumentFiles(documentsCopy)
//       // setValue(resp);
//     } catch (error) {
//       console.log('error in openDocument', error);
//     }
//   };
//   const deleteCertificate = () => {
//     setCertsLength(certsLength-1);
//     // setDocumentFiles(documentFiles?.filter((el, docIndex)=>docIndex !== selectedIndex))
//     // setDocFilePaths(docFilePaths?.filter((el, docIndex)=>docIndex !== selectedIndex))
//     setDocFilePaths(docFilePaths?.map((el, docIndex)=>docIndex !== selectedIndex ? el: ''))
//     setOpenDeleteCertModal(false)
//     Toast.show('Certification deleted successfully', Toast.SHORT)
//   }
//   //UI
//   return (
//     <View style={styles.container}>
//       <MyHeader Title="Edit Profile" />
//       <KeyboardAvoidingView
//         style={styles.container}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//         <ScrollView
//           keyboardShouldPersistTaps="always"
//           contentContainerStyle={{paddingBottom: 40}}
//           style={styles.mainView}>
//           {filePath == '' ? (
//             <View style={styles.imageViewStyle}>
//               <Image
//                 resizeMode="cover"
//                 borderRadius={100}
//                 // source={require('assets/images/profile_pic.png')}
//                 source={
//                   userInfo.profile_image == '' ||
//                   userInfo.profile_image ==
//                     `${Service.BASE_URL.replace('api/', '')}public`
//                     ? require('assets/images/profile_pic.png')
//                     : {uri: userInfo.profile_image}
//                 }
//                 style={{
//                   height: '100%',
//                   width: '100%',
//                 }}
//               />
//               <TouchableOpacity
//                 // onPress={chooseFile}
//                 onPress={() => {
//                   setIsProfilePicture(true)
//                   setShowImageSourceModal(true);
//                 }}
//                 style={styles.addButtonStyle}>
//                 <MyIcon.AntDesign
//                   name="plus"
//                   color={Colors.THEME_GREEN}
//                   size={24}
//                 />
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <View style={styles.imageViewStyle}>
//               <Image
//                 resizeMode="cover"
//                 borderRadius={100}
//                 source={{uri: filePath.uri}}
//                 style={{height: '100%', width: '100%'}}
//               />
//               <TouchableOpacity
//                 onPress={() => setFilePath('')}
//                 style={styles.deleteButtonStyle}>
//                 <MyIcon.MaterialIcons
//                   name="delete"
//                   color={Colors.RED}
//                   size={24}
//                 />
//               </TouchableOpacity>
//             </View>
//           )}
//           <MyTextInput
//             inputRef={firstNameRef}
//             Title="First Name"
//             placeholder={'Enter First Name'}
//             value={firstName}
//             onChangeText={text => setFirstName(text)}
//             onSubmitEditing={() => lastNameRef.current.focus()}
//           />
//           <MyTextInput
//             inputRef={lastNameRef}
//             Title="Last Name"
//             placeholder={'Enter Last Name'}
//             value={lastName}
//             onChangeText={text => setLastName(text)}
//             onSubmitEditing={() => emailAddressRef.current.focus()}
//           />
//           <MyTextInput
//             inputRef={emailAddressRef}
//             Title="Email Address"
//             placeholder={
//               userInfo.email == '' ? 'Enter Email Address' : userInfo.email
//             }
//             editable={false}
//             onChangeText={text => setEmailAddress(text)}
//             onSubmitEditing={() => phoneNumberRef.current.focus()}
//             Icon={
//               <MyIcon.AntDesign
//                 name="checkcircleo"
//                 size={24}
//                 color={Colors.THEME_GREEN}
//               />
//             }
//           />
//           <TextInputWithFlag
//             inputRef={phoneNumberRef}
//             value={phoneNumber}
//             Flag={selectedCountry.flag}
//             CountryCode={selectedCountry.dial_code}
//             // placeholder={userInfo.phone == '' ? phoneNumber : userInfo.phone}
//             placeholder={'Enter phone number'}
//             onChangeText={text => setPhoneNumber(text)}
//             onSubmitEditing={() => Keyboard.dismiss()}
//             onPress={() => setShow(true)}
//             keyboardType="number-pad"
//             maxLength={10}
//           />
//           {/* {userInfo?.is_approved == 1 ? */}
//           {spApprovedStatus == 1 ?
//           [...Array(certsLength).keys()].map((ex, index)=> {
//             return [{type: 'iss', value: issueDates[index]}, {type: 'exp', value: expiryDates[index]}]
//             }).map((item, index2)=>{
//               return (
//             <View key={index2.toString()}>
//             {/* <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:20}}> */}
//               <MyButton onPress={()=>setCurrentIndex(index2 === currentIndex ? null : index2)} Title={`${currentIndex === index2 ? 'Hide' : 'View'} Certification ${index2+1}`}  fontFamily="bold" textAlign='center' fontSize={16}/>
//             {/* </View> */}
//             {currentIndex === index2 ?
//             <>
//             {/* {documentFiles[index2] && isImage(documentFiles[index2]) ? ( */}
//             {/* {documentFiles[index2] ? ( */}
//             {(documentFiles[index2] || docFilePaths[index2].uri) ? (
//             <View>
//             {/* <View style={{paddingHorizontal:30, borderWidth:1, borderColor: Colors.THEME_GREEN, borderRadius:20}}> */}
//             {/* {index2 > originalCertsLength - 1 ?
//             <MyButton
//               Title={'Delete Certification'}
//               width="70%"
//               fontSize={12}
//               marginTop={20}
//               backgroundColor={Colors.RED}
//               alignSelf='center'
//               // onPress={()=>{setCertsLength(certsLength-1); setDocumentFiles(documentFiles?.map((el, docIndex)=>docIndex === index2 ? '' : el))}}
//               onPress={()=>{setCertsLength(certsLength-1); setDocumentFiles(documentFiles?.filter((el, docIndex)=>docIndex !== index2))}}
//             />:null} */}
//             <View style={{flexDirection:'row', justifyContent:'space-between',backgroundColor:'#fff', borderRadius:10, marginTop:10, paddingHorizontal:20, paddingVertical:10}}>
//             <View style={styles.docImageStyle}>
//               <Image
//                 resizeMode="contain"
//                 // borderRadius={100}
//                 // source={require('assets/images/profile_pic.png')}
//                 // source={typeof documentFiles[index2] === 'object' ? {uri: documentFiles[index2]?.uri} : {uri: documentFiles[index2]}}
//                 source={{uri: docFilePaths[index2] === '' ? documentFiles[index2] : docFilePaths[index2].uri}}
//                 style={{
//                   height: '100%',
//                   width: '100%',
//                   borderRadius: 100 / 2,
//                 }}
//               />
//               </View>
//               <View style={{flexDirection:'row', alignItems:'center'}}>
//                 {/* <MyButton
//                   Title={'Open Image'}
//                   width="70%"
//                   fontSize={12}
//                   marginTop={20}
//                   borderColor={Colors.THEME_GREEN}
//                   backgroundColor={'transparent'}
//                   alignSelf='center'
//                   onPress={()=>{setShowImage(true);setSelectedDocument(typeof documentFiles[index2] === 'object' ? documentFiles[index2]?.uri : documentFiles[index2]);setShowDocumenteModal(true)}}
//                 /> */}
//                 <TouchableOpacity
//                   // onPress={chooseFile}
//                   onPress={()=>{setShowImage(true);setSelectedDocument(typeof docFilePaths[index2] === 'object' ? docFilePaths[index2]?.uri : documentFiles[index2]);setShowDocumenteModal(true)}}
//                   style={[styles.docAddButtonStyle, {marginRight:20, shadowColor: '#000',
//                   shadowOffset: {width: 0, height: 2},
//                   shadowOpacity: 0.1,
//                   backgroundColor: Colors.WHITE,
//                   shadowRadius: 15,
//                   elevation: 2,
//                   padding: 5,
//                   borderRadius: 20,}]}>
//                   <MyIcon.Entypo
//                     name="eye"
//                     // color={expiryStatuses[index2] || approvedStatuses[index2] == 0 ? Colors.THEME_GREEN : Colors.LITE_GREY}
//                     color={Colors.THEME_GREEN}
//                     size={24}
//                     />
//                 </TouchableOpacity>
//                 {/* index2 > originalCertsLength - 1 means it is a new document; we didn't get this from backend */}
//                 {expiryStatuses[index2] || index2 > originalCertsLength - 1 ?                
//                 <TouchableOpacity
//                   // onPress={chooseFile}
//                   onPress={() => {
//                     // (expiryStatuses[index2] || index2 > originalCertsLength - 1) ? openDocument(index2) : Toast.show('Only expired certificates can be updated', Toast.SHORT);
//                     if(expiryStatuses[index2] || index2 > originalCertsLength - 1) {
//                       setIsProfilePicture(false);
//                       setWhichIndex(index2)
//                       setShowImageSourceModal(true);
//                     }else{
//                       Toast.show('Only expired certificates can be updated', Toast.SHORT);
//                     } 
//                   }}
//                   style={[styles.docAddButtonStyle, {marginRight:20,shadowOffset: {width: 0, height: 2},
//                     shadowOpacity: 0.1,
//                     backgroundColor: Colors.WHITE,
//                     shadowRadius: 15,
//                     elevation: 2,
//                     padding: 5,
//                     borderRadius: 20,}]}>
//                   <MyIcon.MaterialCommunityIcons
//                     name="pencil-outline"
//                     // color={expiryStatuses[index2] || approvedStatuses[index2] == 0 ? Colors.THEME_GREEN : Colors.LITE_GREY}
//                     color={(expiryStatuses[index2] || index2 > originalCertsLength - 1) ? Colors.THEME_GREEN : Colors.LITE_GREY}
//                     size={24}
//                     />
//                 </TouchableOpacity>
//                 :null}
//                 {index2 > originalCertsLength - 1 ?
//                 <TouchableOpacity
//                   // onPress={chooseFile}
//                   onPress={() => {setSelectedIndex(index2); setOpenDeleteCertModal(true)}}
//                   style={[styles.docAddButtonStyle, {shadowOffset: {width: 0, height: 2},
//                     shadowOpacity: 0.1,
//                     backgroundColor: Colors.WHITE,
//                     shadowRadius: 15,
//                     elevation: 2,
//                     padding: 5,
//                     borderRadius: 20,}]}>
//                   <MyIcon.MaterialIcons
//                     name="delete-outline"
//                     color={Colors.RED}
//                     size={24}
//                   />
//                 </TouchableOpacity>
//                 :null}
//               </View>
//             </View>
//             {expiryStatuses[index2] || index2 > originalCertsLength - 1 ?
//             <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
//             <DateSelector
//             Title={
//               moment(item[0].value).format('YYYY-MM-DD') ==
//               moment(new Date()).format('YYYY-MM-DD')
//                 ? 'Issue Date'
//                 : // : moment(date).format('MMMM Do YYYY')
//                 moment(item[0].value).format('DD-MM-YYYY')
//               }
//               // onPress={() => expiryStatuses[index2] || approvedStatuses[index2] == 0 ? changeOpenIssueDates(true, index2) : Toast.show('Only expired certificates can be updated', Toast.SHORT)}
//               onPress={() => expiryStatuses[index2] || index2 > originalCertsLength - 1 ? changeOpenIssueDates(true, index2) : Toast.show('Only expired certificates can be updated', Toast.SHORT)}
//               calenderViewStyle={{width:'48%'}}
//               dateViewStyle={{borderWidth:0}}
//               />
//             <DateSelector
//             Title={
//               moment(item[1].value).format('YYYY-MM-DD') ==
//               moment(new Date()).format('YYYY-MM-DD')
//                 ? 'Expiry Date'
//                 : // : moment(date).format('MMMM Do YYYY')
//                 moment(item[1].value).format('DD-MM-YYYY')
//               }
//               // onPress={() => expiryStatuses[index2] || approvedStatuses[index2] == 0 ? changeOpenExpiryDates(true, index2) : Toast.show('Only expired certificates can be updated', Toast.SHORT)}
//               onPress={() => expiryStatuses[index2] || index2 > originalCertsLength - 1 ? changeOpenExpiryDates(true, index2) : Toast.show('Only expired certificates can be updated', Toast.SHORT)}
//               calenderViewStyle={{width:'48%'}}
//               dateViewStyle={{borderWidth:0}}
//               />
//               </View>
//             :null}
//             </View>
//           ) :
//           documentFiles[index2] && isPdf(documentFiles[index2]) ?
//           <View style={{paddingHorizontal:30, borderWidth:1, borderColor: Colors.THEME_GREEN, borderRadius:20}}>
//           <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
//             {/* <MyButton
//               Title={'Open PDF'}
//               width="30%"
//               fontSize={12}
//               marginTop={20}
//               borderColor={Colors.THEME_GREEN}
//               backgroundColor={'transparent'}
//               alignSelf='center'
//               onPress={()=>{setShowImage(false);setSelectedDocument(typeof documentFiles[index2] === 'object' ? documentFiles[index2]?.uri : documentFiles[index2]);setShowDocumenteModal(true)}}
//             /> */}
//             <TouchableOpacity
//               // onPress={chooseFile}
//               onPress={()=>{setShowImage(false);setSelectedDocument(typeof documentFiles[index2] === 'object' ? documentFiles[index2]?.uri : documentFiles[index2]);setShowDocumenteModal(true)}}
//               style={[styles.docAddButtonStyle, {marginTop:20}]}>
//               <MyIcon.Entypo
//                 name="eye"
//                 // color={expiryStatuses[index2] || approvedStatuses[index2] == 0 ? Colors.THEME_GREEN : Colors.LITE_GREY}
//                 color={Colors.THEME_GREEN}
//                 size={24}
//                 />
//             </TouchableOpacity>
//             {expiryStatuses[index2] || index2 > originalCertsLength - 1 ?
//             <TouchableOpacity
//               // onPress={chooseFile}
//               onPress={() => {
//                 (expiryStatuses[index2] || index2 > originalCertsLength - 1) ? openDocument(index2) : Toast.show('Only expired certificates can be updated', Toast.SHORT);
//               }}
//               style={[styles.docAddButtonStyle, {marginTop:20, marginLeft:20}]}>
//               <MyIcon.Entypo
//                 name="edit"
//                 // color={expiryStatuses[index2] || approvedStatuses[index2] == 0  ? Colors.THEME_GREEN : Colors.LITE_GREY}
//                 color={expiryStatuses[index2] || index2 > originalCertsLength - 1 ? Colors.THEME_GREEN : Colors.LITE_GREY}
//                 size={24}
//                 />
//             </TouchableOpacity>
//             :null}
//             {index2 > originalCertsLength - 1 ?
//             <TouchableOpacity
//               // onPress={chooseFile}
//               onPress={() => {setCertsLength(certsLength-1); setDocumentFiles(documentFiles?.filter((el, docIndex)=>docIndex !== index2))}}
//               style={[styles.docAddButtonStyle, {}]}>
//               <MyIcon.MaterialIcons
//                 name="delete"
//                 color={Colors.RED}
//                 size={24}
//               />
//             </TouchableOpacity>
//             :null} 
//           </View>
//           {expiryStatuses[index2] || index2 > originalCertsLength - 1 ?
//           <>
//           <DateSelector
//             Title={
//               moment(item[0].value).format('YYYY-MM-DD') ==
//               moment(new Date()).format('YYYY-MM-DD')
//                 ? 'Select Issue Date'
//                 : // : moment(date).format('MMMM Do YYYY')
//                 moment(item[0].value).format('DD-MM-YYYY')
//               }
//               // onPress={() => expiryStatuses[index2] || approvedStatuses[index2] == 0 ? changeOpenIssueDates(true, index2) : Toast.show('Only expired certificates can be updated', Toast.SHORT)}
//               onPress={() => expiryStatuses[index2] || index2 > originalCertsLength - 1 ? changeOpenIssueDates(true, index2) : Toast.show('Only expired certificates can be updated', Toast.SHORT)}
//               calenderViewStyle={{width:'48%'}}
//               dateViewStyle={{borderWidth:0}}
//               />
//             <DateSelector
//             Title={
//               moment(item[1].value).format('YYYY-MM-DD') ==
//               moment(new Date()).format('YYYY-MM-DD')
//                 ? 'Select Expiry Date'
//                 : // : moment(date).format('MMMM Do YYYY')
//                 moment(item[1].value).format('DD-MM-YYYY')
//               }
//               // onPress={() => expiryStatuses[index2] || approvedStatuses[index2] == 0 ? changeOpenExpiryDates(true, index2) : Toast.show('Only expired certificates can be updated', Toast.SHORT)}
//               onPress={() => expiryStatuses[index2] || index2 > originalCertsLength - 1 ? changeOpenExpiryDates(true, index2) : Toast.show('Only expired certificates can be updated', Toast.SHORT)}
//               calenderViewStyle={{width:'48%'}}
//               dateViewStyle={{borderWidth:0}}
//               />
//               </>
//               :null}
//           </View>
//           :
//           <MyTextInput
//           placeholder={
//             'Upload Certification'
//           }
//           // onPress={() => openDocument(index2)}
//           onPress={() => {setIsProfilePicture(false);setWhichIndex(index2);setShowImageSourceModal(true);}}
//           disabled={false}
//           editable={false}
//           Icon={
//               <MyIcon.AntDesign
//                 name="upload"
//                 size={24}
//                 color={Colors.THEME_GREEN}
//               />
//             }
//           />
//           }
//           {expiryStatuses[index2] ?
//           <>
//             {/* <DateSelector
//             Title={
//               moment(item[0].value).format('YYYY-MM-DD') ==
//               moment(new Date()).format('YYYY-MM-DD')
//                 ? 'Select Issue Date'
//                 : // : moment(date).format('MMMM Do YYYY')
//                 moment(item[0].value).format('DD-MM-YYYY')
//               }
//               // onPress={() => expiryStatuses[index2] || approvedStatuses[index2] == 0 ? changeOpenIssueDates(true, index2) : Toast.show('Only expired certificates can be updated', Toast.SHORT)}
//               onPress={() => expiryStatuses[index2] ? changeOpenIssueDates(true, index2) : Toast.show('Only expired certificates can be updated', Toast.SHORT)}
//               />
//             <DateSelector
//             Title={
//               moment(item[1].value).format('YYYY-MM-DD') ==
//               moment(new Date()).format('YYYY-MM-DD')
//                 ? 'Select Expiry Date'
//                 : // : moment(date).format('MMMM Do YYYY')
//                 moment(item[1].value).format('DD-MM-YYYY')
//               }
//               // onPress={() => expiryStatuses[index2] || approvedStatuses[index2] == 0 ? changeOpenExpiryDates(true, index2) : Toast.show('Only expired certificates can be updated', Toast.SHORT)}
//               onPress={() => expiryStatuses[index2] ? changeOpenExpiryDates(true, index2) : Toast.show('Only expired certificates can be updated', Toast.SHORT)}
//               /> */}
//               </>
//               :null}
//               </>
//               :null}
//               </View>
//           )
//         })
//         :null}
//         {/* {userInfo?.is_approved == 1  && certsLength < 3 ? */}
//         {spApprovedStatus == 1 && certsLength < 3 ?
//         <>
//         <TouchableOpacity
//           // onPress={() => {setCertsLength(certsLength+1)}}
//           onPress={() => {setCertsLength(certsLength+1); setCurrentIndex(certsLength)}}
//           style={[styles.deleteButtonContainer, {alignSelf:'flex-end', marginTop:10}]}>
//           <MyIcon.AntDesign
//             name="plus"
//             size={20}
//             color={Colors.THEME_GREEN}
//           />
//           <MyText text="Add Certification" fontFamily="bold" textColor='theme_green' fontSize={16}/>
//         </TouchableOpacity>
//         {/* <MyButton Title="Add" width={'20%'} alignSelf='flex-end' borderColor={Colors.THEME_GREEN} onPress={()=>{setCertsLength(certsLength+1); setCurrentIndex(certsLength)}} /> */}
//         </>
//         :null}
//           {/* {issueDates.map((item,index)=>{
//             return (
//             <DateSelector
//                 Title={
//                   moment(item).format('YYYY-MM-DD') ==
//                   moment(new Date()).format('YYYY-MM-DD')
//                     ? 'Select Issue Date'
//                     : // : moment(date).format('MMMM Do YYYY')
//                       moment(item).format('DD-MM-YYYY')
//                 }
//                 onPress={() => changeOpenIssueDates(true, index)}
//               />
//             )
//           })}  
//           {expiryDates.map((item,index)=>{
//             return (
//             <DateSelector
//                 Title={
//                   moment(item).format('YYYY-MM-DD') ==
//                   moment(new Date()).format('YYYY-MM-DD')
//                     ? 'Select Expiry Date'
//                     : // : moment(date).format('MMMM Do YYYY')
//                       moment(item).format('DD-MM-YYYY')
//                 }
//                 onPress={() => changeOpenExpiryDates(true, index)}
//               />
//             )
//           })}   */}
//           <MyText text="Gender" fontFamily="bold" />
//           <View style={styles.genderView}>
//             {Constant.Gender.map((item, index) => {
//               return (
//                 <TouchableOpacity
//                   onPress={() => setGender(index + 1)}
//                   key={item.id.toString()}
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                   }}>
//                   <MyIcon.Ionicons
//                     name={
//                       gender == index + 1
//                         ? 'radio-button-on'
//                         : 'radio-button-off'
//                     }
//                     size={24}
//                   />
//                   <MyText text={item.name} />
//                 </TouchableOpacity>
//               );
//             })}
//           </View>
//           <MyText text="Birthdate" fontFamily="bold" />
//           <DateSelector
//             Title={
//               moment(date).format('YYYY-MM-DD') ==
//               moment(new Date()).format('YYYY-MM-DD')
//                 ? 'Select Date'
//                 : // : moment(date).format('MMMM Do YYYY')
//                   moment(date).format('DD-MM-YYYY')
//             }
//             onPress={() => setOpen(true)}
//             dateViewStyle={{borderWidth:0}}
//           />
//           <MyText text="Location" fontFamily="bold" marginBottom={10} />
//           {/* <TouchableOpacity
//             onPress={requestLocationPermission}
//             style={{
//               backgroundColor: Colors.WHITE,
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'center',
//               shadowColor: '#000',
//               shadowOffset: {width: 0, height: 2},
//               shadowOpacity: 0.1,
//               elevation: 2,
//               padding: 10,
//               borderRadius: 10,
//           }}>
//             <MyIcon.FontAwesome5 name="map-marker-alt" size={20} />
//             <MyText
//               text="Change Location"
//               marginHorizontal={10}
//               fontFamily="bold"
//             />
//           </TouchableOpacity> */}
//           <GooglePlacesAutocomplete
//             placeholder={oldAddress}
//             textInputProps={{
//               // placeholderTextColor: '#c9c9c9',
//               placeholderTextColor: Colors.LITE_GREY,
//               returnKeyType: 'search',
//               // onFocus: () => setShowPlacesList(true),
//               // onBlur: () => setShowPlacesList(false),
//               multiline: true,
//               // onTouchStart: ()=>{downButtonHandler()}
//               height: 55,
//             }}
//             enablePoweredByContainer={false}
//             listViewDisplayed={'auto'}
//             styles={styles.searchbar}
//             onPress={(data, details = null) => {
//               // 'details' is provided when fetchDetails = true
//               // setShowPlacesList(false)
//               setLatLng({
//                 lat: details.geometry.location.lat,
//                 lng: details.geometry.location.lng,
//               });
//               setAddress(data?.description);
//             }}
//             GooglePlacesDetailsQuery={{
//               fields: 'geometry',
//             }}
//             fetchDetails={true}
//             query={{
//               key: GOOGLE_MAPS_APIKEY,
//               language: 'en',
//             }}
//           />
//           {/* <MyText text={"Current Location"} fontFamily="bold" marginBottom={10} marginTop={5}/>
//           <MyTextInput
//             inputRef={addressRef}
//             value={oldAddress}
//             placeholder={
//               // userInfo.location == '' ? 'Enter Address' : userInfo.location
//               userInfo.location
//             }
//             editable={false}
//             multiline={true}
//             onChangeText={text => setOldAddress(text)}
//             onSubmitEditing={() => passwordRef.current.focus()}
//           /> */}
//           <View style={{height: 20}} />
//           <MyButton Title="Save" onPress={editProfile} />
//         </ScrollView>
//       </KeyboardAvoidingView>
//       <CustomLoader showLoader={showLoader} />
//       <DatePicker
//         modal
//         mode="date"
//         open={open}
//         date={date}
//         onConfirm={date => {
//           if (
//             moment(date).format('YYYY-MM-DD') >=
//             moment(new Date()).format('YYYY-MM-DD')
//           ) {
//             setOpen(false);
//             // dispatch(showToast('Please select valid date of birth'));
//             Toast.show('Please select valid date of birth', Toast.SHORT)
//             // Alert.alert('', 'Please select valid date of birth');
//           } else if (
//             // moment(new Date()).format('YYYY') - moment(date).format('YYYY') <
//             // 18
//             moment().diff(date, 'years', true) < 18
//           ) {
//             setOpen(false);
//             // dispatch(showToast('Your age must be at least 18 years'));
//             Toast.show('Your age must be at least 18 years', Toast.SHORT)
//             // Alert.alert('', 'Your age must be at least 18 years');
//           } else {
//             setOpen(false);
//             setDate(date);
//           }
//         }}
//         onCancel={() => {
//           setOpen(false);
//         }}
//       />
//       {issueDates.map((item, index)=>{
//         return (
//           <DatePicker
//             key={index.toString()}
//             modal
//             mode="date"
//             open={openIssueDates[index]}
//             date={item}
//             onConfirm={date => {
//               changeOpenIssueDates(false, index);
//               changeIssueDates(date, index);
//             }}
//             onCancel={() => {
//               changeOpenIssueDates(false, index);
//             }}
//             maximumDate={new Date()}
//           />
//         )
//       })}
//       {expiryDates.map((item, index)=>{
//         return (
//           <DatePicker
//             key={index.toString()}
//             modal
//             mode="date"
//             open={openExpiryDates[index]}
//             date={item}
//             onConfirm={date => {
//               changeOpenExpiryDates(false, index);
//               changeExpiryDates(date, index);
//             }}
//             onCancel={() => {
//               changeOpenExpiryDates(false, index);
//             }}
//             minimumDate={new Date()}
//           />
//         )
//       })}
//       <SelectAddress
//         visible={showSelectAddress}
//         setVisibility={setShowSelectAddress}
//         Addresses={allCurrentLocations}
//         setValue={setAddress}
//         setLatLng={setLatLng}
//       />
//       <CountryPicker
//         show={show}
//         disableBackdrop={false}
//         style={styles.countrySilderStyle}
//         // when picker button press you will get the country object with dial code
//         pickerButtonOnPress={item => {
//           // console.warn('item', item);
//           // setCountryCode(item.dial_code);
//           setSelectedCountry(item);
//           setShow(false);
//         }}
//         placeholderTextColor={'#c9c9c9'}
//         color={Colors.BLACK}
//         onBackdropPress={() => setShow(false)}
//       />
//       <SelectImageSource
//         visible={showImageSourceModal}
//         setVisibility={setShowImageSourceModal}
//         openLibrary={openLibrary}
//         openCamera={checkCameraPermission}
//       />
//       <SearchLocation
//         visible={showLocationModal}
//         setVisibility={setShowLocationModal}
//         setAddress={setAddress}
//         setLatLng={setLatLng}
//       />
//       <DocumentViewer
//         visible={showDocumenteModal}
//         setVisibility={setShowDocumenteModal}
//         showImage={showImage}
//         selectedDocument={selectedDocument}
//       />
//       <DeleteCertification
//         visible={openDeleteCertModal}
//         setVisibility={setOpenDeleteCertModal}
//         deleteCertificate={deleteCertificate}
//         // deleteSlot={() => deleteSlot(selectedItem?.serviceUnavailableId)}
//       />
//     </View>
//   );
// };
// const mapStateToProps = state => ({
//   userToken: state.user.userToken,
//   userInfo: state.user.userInfo,
// });
// export default connect(mapStateToProps, null)(ServiceEditProfile);