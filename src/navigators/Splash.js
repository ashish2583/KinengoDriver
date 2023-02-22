import React, { Component } from 'react';
import {View,Image,Text, ImageBackground,StyleSheet,Animated,Easing,SafeAreaView, Alert,Dimensions} from 'react-native';
import { dimensions } from '../utility/Mycolors';
const Splash = (props) => {

     return(
    <View style={styles.container}>
   
      <ImageBackground
        source={require('../assets/images/Splash.png')}
        style={StyleSheet.absoluteFill}
        width="100%"
        height="100%"
      />
     
    </View>
        
     );
  }
const styles = StyleSheet.create({

  container: {
    backgroundColor:'#000',
    flex:1
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoOneStyle: {
    width: dimensions.SCREEN_WIDTH / 3,
    height: dimensions.SCREEN_WIDTH / 3,
  },
  logoTwoStyle: {
    width: dimensions.SCREEN_WIDTH / 1.2,
    height: 100,
  },
});
export default Splash