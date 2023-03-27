import React, { useEffect } from 'react';
import {SafeAreaView,LogBox,StatusBar,Platform,useColorScheme,View, Linking,} from 'react-native';
import {Colors,} from 'react-native/Libraries/NewAppScreen';
import MainNav from './src/navigators/MainNav'
import store from './src/redux/store/store';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import { NavigationContainer,DefaultTheme,NavigationActions,useNavigation} from '@react-navigation/native'
 import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import { NotificationManagerAndroid } from './NotificationManagerAndroid';
import { NotificationManagerIOS } from './NotificationManagerIOS';
import Home2 from './src/pages/Home/Home2'
import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import dynamicLinks from '@react-native-firebase/dynamic-links';
// import Orientation from 'react-native-orientation';
import Toast from 'react-native-toast-message';

const App = (props) => {
  // const mynavigation = useNavigation();
  LogBox.ignoreAllLogs() 

  
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
          backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
           };

    async function requestUserPermission() {
      const authorizationStatus = await messaging().requestPermission({
        sound: false,
        announcement: true,
      });
    }
  
    async function requestUserPermissionIos() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
      }

      React.useEffect(() => {

        // dynamicLinks()
        // .getInitialLink() 
        // .then(link => {
        //   console.log('My url is in App js ==>>',link)
        //   // if (link.url === 'https://invertase.io/offer') {
        //   //   // ...set initial route as offers screen
        //   // }
        // });

        // Orientation.lockToPortrait();
            NotificationManagerAndroid.createChannel();
            NotificationManagerAndroid.configure();
        try {
          if(Platform.OS=='android'){
            requestUserPermission();
          }else{
            requestUserPermissionIos();
          }
          // PushNotificationIOS.getApplicationIconBadgeNumber(num => {
          //  console.log('the bedge number is===',num)
          // });
          const unsubscribe = messaging().onMessage(async remoteMessage => {
            JSON.stringify(remoteMessage.data);
            const { messageId } = remoteMessage;
            const data = remoteMessage.notification
            if (Platform.OS === 'android') {
              
              NotificationManagerAndroid.showNotification(data.title, data.body, data.subText, messageId, data);
            } 
            else {
               NotificationManagerIOS.showNotification(2, data.title, data.body, data, {})
            }
          });
          return unsubscribe;
        } catch (error) {
          console.log(error.message);
        }
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
          const { data, messageId } = remoteMessage;
          const { Title, notificationText, subText } = data;
          if (Platform.OS === 'android') {
            NotificationManagerAndroid.showNotification(Title, notificationText, subText, messageId);
          } 
          else {
            NotificationManagerIOS.showNotification(messageId, Title, notificationText, data, {})
  
            // PushNotification.getApplicationIconBadgeNumber(badgeNumber => {
            //   PushNotificationIOS.setApplicationIconBadgeNumber(badgeNumber + 1)
            // })
           
          }
        });
       
      }, []);

     
  //  messaging().onNotificationOpenedApp(remoteMessage => {
  //       console.log(
  //         'Notification caused app to open from background state:',
  //         remoteMessage.notification,
  //       );
  //       // props.navigation.navigate('Home2')
  //       // mynavigation.navigate('Homw2');
  //       // Linking.openURL('demo://app/Home2')
  //     });

      // messaging()
      // .getInitialNotification()
      // .then(remoteMessage => {
      //   if (remoteMessage) {
      //     console.log(
      //       'Notification caused app to open from quit state:',
      //       remoteMessage.notification,
      //     );
      //     // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      //   }
      // });


      // const config = {
      //   screens: {
      //     Home2: './src/pages/Home/Home2',
      //   },
      // };


      // const linking={
      //   prefixes: ["demo://app"],
      //   config,
      //   }
  return (
   
     <Provider store={store}>
       <NavigationContainer theme={DefaultTheme}>
                <MainNav/>
                <Toast />
      </NavigationContainer>
     </Provider>
   
  );
};


export default App;
