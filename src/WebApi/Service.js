import React, { useEffect, useState, useRef } from 'react';
import { View, useColorScheme, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// import * as types  from '../redux/types';


export const baseUrl = 'http://54.153.75.225/backend/api/v1/'
// shop/eat
//API END POINT LISTS  

export const driver_signup = 'driver/signup'
export const login = 'auth/app-login'
export const verify_otp = 'auth/verify-otp'
export const auth_send_otp = 'auth/send-otp'
export const auth_driver_signup = 'driver/signup'
export const add_vichle = 'driver/add-vichle'
export const driver_update_driver_location = 'driver/update-driver/location'
export const driver_accept_ride_request = `driver/accept-ride-request`;
export const driver_ride_status = 'driver/ride-status'
export const driver_ride_check_status = 'driver/check-driver-status'
export const driver_current_status = 'driver/current-status/id/'
export const driver_transaction = 'driver/transaction'
export const driver_earning = 'driver/earning/'
export const driver_rides_history = 'driver/rides-history'
export const driver_wallet_history = 'driver/wallet-history'
export const driver_transaction_history = 'driver/transaction-history'

export const common_countries = `common/countries`;
export const common_state = `common/states?country_id=`;
export const driver_ID = 'driver/id/';
export const driver_profile_update = 'driver/profile-update/id/';
export const driver_change_password = 'driver/change-password/userid/';
export const driver_update_vehicle = 'driver/update-vichle/id/';
export const password_forgot = 'auth/password/forgot';
export const Password_otp = 'auth/password/otp';
export const password_change = 'auth/password/change'
export const UserID_login = 'auth/login';


export const GET_QUESTIONS=`common/driver_questions`;
export const GET_CAR_BRANDS=`common/vehicle_brand`;
export const GET_CAR_MODEL=`common/vehicle_model`;
export const UPDATE_CAR_TYPE=`driver/profile`;
export const GET_SUBSCRIPTION_PLAN=`driver/subscription_plan`;
export const GET_VEHICLES_TYPE=`common/vehicle_type`;
export const ADD_VEHICLE=`driver/vehicle`;
export const driver_license=`driver/license`;
export const driver_question=`driver/question`;
export const driver_profile=`driver/profile`;
export const common_page_content=`common/page_content`;
export const add_insurance=`driver/insurance`;
export const driver_add_profile=`driver/add_profile`;  
export const driver_update_corporate_profile=`driver/update_corporate_profile`; 
export const  common_vehicle_info=`common/vehicle_info`; 
export const  driver_get_drivers=`driver/get_drivers`;
export const  driver_corporate_vehicle=`driver/corporate_vehicle`;
export const  buy_subscription=`driver/buy_subscription`;
export const  buy_corporate_subscription=`driver/buy_corporate_subscription`; 
export const  auth_resend_otp=`auth/resend_otp`;
export const  driver_dashboard=`driver/dashboard`; 
export const  driver_corporate_dashboard=`driver/corporate_dashboard`; 
export const  booking_complete_ride=`booking/complete_ride`; 
export const  driver_rides=`driver/rides`; 
export const  driver_ride_details=`driver/ride_details?ride_id=`; 
export const user_notifications = 'user/notifications'
export const user_notification_change = 'user/notification_change'
export const driver_logout = 'driver/logout'
export const driver_change_status = 'driver/change_status'
export const booking_bid_price = 'booking/bid_price?ride_id='
export const driver_fuel_cost = 'driver/fuel_cost'   //
export const driver_referral_earning = 'driver/referral_earning'
export const driver_change_account_status = 'driver/change_account_status'



export const requestPostApi = async (endPoint, body, method, token) => {
  console.log('the token is :-', token)
  var header = {}
  if (token != '' && token != undefined) {
    header = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token, 'Cache-Control': 'no-cache' }
  } else {
    header = { "Content-Type": "application/json", 'Accept': 'application/json' }
  }

  var url = baseUrl + endPoint
  console.log('post Request Url:-' + url + '\n')
  console.log('the body data', body)
  // console.log(header + '\n')
  try {
    let response = await fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: header,
    }
    )
    let code = await response.status
    console.log('the api responce is', code)
    //  let responseJ = await response.json();
    //  console.log('the api responce is',responseJ.headers)
    if (code == 200) {
      let responseJson = await response.json();
      console.log(responseJson)
      return { responseJson: responseJson, err: null }
    } else if (code == 400 || code == 402) {
      let responseJson = await response.json();
      //Completion block 
      return { responseJson: responseJson, err: responseJson.headers.message }
    } else {
      let responseJson = await response.json();
      // console.log(responson)
      return { responseJson: responseJson, err: responseJson.headers.message }
    }
  } catch (error) {
    console.log('the error is', error)
    return { responseJson: null, err: 'Something Went Wrong! Please check your internet connection.' }
    // return {responseJson:null,err:error}
  }
}

export const requestGetApi = async (endPoint, body, method, token) => {
  console.log('the token is :-', token)
  var header = {}
  var url = baseUrl + endPoint

  if (token != '' && token != undefined) {
    header = { 'Content-Type': 'multipart/form-data', 'Accept': 'application/json', 'Authorization': 'Bearer ' + token, 'Cache-Control': 'no-cache' }
  } else {
    header = {}
  }

  //url = url + objToQueryString(body)
  console.log('Request Url:-' + url + '\n')
  try {
    let response = await fetch(url, {
      method: method,
      headers: header,
    }
    )
    let code = await response.status
    console.log(code)
    if (code == 200) {
      let responseJson = await response.json();
      console.log('Code 200==>>', responseJson)
      return { responseJson: responseJson, err: null, code: code }
    } else if (code == 400) {
      return { responseJson: null, err: responseJson.message, code: code }

    } else if (code == 500) {
      console.log(response)

      return { responseJson: null, err: 'Something Went Wrong', code: code }

    } else {
      console.log(response)

      return { responseJson: null, err: 'Something went wrong!', code: code }
    }
  } catch (error) {
    console.error(error);
    return { responseJson: null, err: 'Something Went Wrong! Please check your internet connection.', code: 500 }

  }
}

export const requestPostApiMedia = async (endPoint, formData, method, token) => {
  var header = {}

  if (token != '' && token != undefined) {
    header = {
      'Content-type': 'multipart/form-data', 'apitoken': token, 'Cache-Control': 'no-cache'
    }
  } else {
    if (endPoint != signUpApi) {
      header = {
        'Content-type': 'multipart/form-data', 'Cache-Control': 'no-cache'
      }
    }
  }

  var url = baseUrl + endPoint
  console.log('Request Url:-' + url + '\n')
  console.log(formData + '\n')

  try {
    let response = await fetch(url, {
      method: method,
      body: formData,

      headers: header,

    }
    )

    let code = await response.status
    console.log(code)

    if (code == 200) {
      let responseJson = await response.json();
      console.log(responseJson)
      return { responseJson: responseJson, err: null }
    } else if (code == 400) {
      let responseJson = await response.json();
      return { responseJson: null, err: responseJson.message }

    } else {

      return { responseJson: null, err: 'Something went wrong!' }
    }
  } catch (error) {
    console.error('the error of the uploade image is ==>>', error);
    return { responseJson: null, err: 'Something Went Wrong! Please check your internet connection.' }

  }
}

export const requestPostApiSignUp = async (endPoint, formData, method) => {
  var url = baseUrl + endPoint
  console.log('Request Url:-' + url + '\n')
  console.log(formData + '\n')

  try {
    let response = await fetch(url, {
      method: method,
      body: formData,
    }
    )

    let code = await response.status
    console.log(code)

    if (code == 200) {
      let responseJson = await response.json();
      console.log(responseJson)
      return { responseJson: responseJson, err: null }
    } else if (code == 400 || 402) {
      let responseJson = await response.json();
      console.log(responseJson)

      return { responseJson: null, err: responseJson.msg }

    } else {

      return { responseJson: null, err: 'Something went wrong!' }
    }
  } catch (error) {

    return { responseJson: null, err: 'Something Went Wrong! Please check your internet connection.' }
    console.error(error);
  }
}

const objToQueryString = (obj) => {

  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.length == 0 ? '' : '?' + keyValuePairs.join('&');
}



//function : get api
export const getApi = endPoint =>
  axios
    .get(`${baseUrl}${endPoint}`)
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error == `Error: Network Error`) {
        Alert.alert(
          '',
          `Internet connection appears to be offline. Please check your internet connection and try again.`,
        );
      }
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      console.log('headers', error.response.headers);
      return error;
    });
//function : post api
export const postApi = (endPoint, data) =>
  axios
    .post(`${baseUrl}${endPoint}`, data)
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error == `Error: Network Error`) {
        Alert.alert(
          '',
          `Internet connection appears to be offline. Please check your internet connection and try again.`,
        );
      }
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      console.log('headers', error.response.headers);
      return error;
    });
//function : get api with token
export const getApiWithToken = (token, endPoint) =>
  axios
    .get(`${baseUrl}${endPoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error == `Error: Network Error`) {
        Alert.alert(
          '',
          `Internet connection appears to be offline. Please check your internet connection and try again.`,
        );
      }
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      console.log('headers', error.response.headers);
      return error;
    });
//function : post api with token
export const postApiWithToken = (token, endPoint, data) =>
  axios
    .post(`${baseUrl}${endPoint}`, data, {
      headers: {
        Authorization: `Bearer${token}`,
      },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error == `Error: Network Error`) {
        Alert.alert(
          '',
          `Internet connection appears to be offline. Please check your internet connection and try again.`,
        );
      }
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      console.log('headers', error.response.headers);
      return error;
    });
//function : put api with token
export const putApiWithToken = (token, endPoint, data) =>
  axios
    .put(`${baseUrl}${endPoint}`, data, {
      headers: {
        Authorization: `Bearer${token}`,
      },
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error == `Error: Network Error`) {
        Alert.alert(
          '',
          `Internet connection appears to be offline. Please check your internet connection and try again.`,
        );
      }
      console.log('data', error.response.data);
      console.log('status', error.response.status);
      console.log('headers', error.response.headers);
      return error;
    });
