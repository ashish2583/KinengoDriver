import React, { useEffect } from 'react';
import {View,Image,Text,StyleSheet,SafeAreaView} from 'react-native';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import MyDrawer from '../component/MyDrawer';
import HomeStack from './HomeStack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { dimensions } from '../utility/Mycolors';
import EarningStack from './EarningStack';
import ProfileStack from './ProfileStack';
import MonyTransferStack from './MonyTransferStack';
import Help from '../pages/Help/Help';
import Reward from '../pages/Reward/Reward';
const DrawerNav = (props) => {
  const Drawer = createDrawerNavigator();
     return(
      <Drawer.Navigator 
      initialRouteName="HomeStack"
      headerMode={null}
      screenOptions={{ headerShown: false ,drawerWidth:dimensions.SCREEN_WIDTH}}
      drawerWidth={dimensions.SCREEN_WIDTH}
      drawerContent={(props) => <MyDrawer {...props} />}
      >
      <Drawer.Screen name="HomeStack" component={HomeStack}  options={{drawerLabel: () => null,title: null,drawerIcon: () => null }} />
      <Drawer.Screen name="Earning" component={EarningStack} />
      <Drawer.Screen name="Myprofile" component={ProfileStack} />
      <Drawer.Screen name="MonyTransfer" component={MonyTransferStack} />
      <Drawer.Screen name="Reward" component={Reward} />
      <Drawer.Screen name="Help" component={Help} />
    </Drawer.Navigator>
     );
  }


export default DrawerNav
