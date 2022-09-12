import React, {Node, useEffect, useState} from 'react';

import {SafeAreaView, StyleSheet, Text, Image} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

import AppStyle from './common/AppStyle';
import AppColors from './common/AppColor';

import {useIsFocused} from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (Platform.OS === 'android') {
        setTimeout(() => {
          nextScreen();
        }, 900);
      } else {
        nextScreen();
      }
    }
  });

  function nextScreen() {
    console.log('Login');
    navigation.navigate('Login');
  }

  return (
    <PaperProvider theme={AppStyle.BaseTheme}>
      <SafeAreaView
        style={{
          ...AppStyle.Parent,
          backgroundColor: AppColors.white,
          justifyContent: 'center',
        }}>
        <Image
          style={{
            width: 130,
            height: 130,
            alignSelf: 'center',
          }}
          source={require('../assets/map-img.png')}
        />
        <Text
          style={{
            ...AppStyle.TextStyle.titleSmall,
            position: 'absolute',
            bottom: 10,
            right: 0,
            left: 0,
            textAlign: 'center',
            color: AppColors.smokeWhite,
          }}>
          Demo By developer.harshpatel@gmail.com
        </Text>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({});

export default SplashScreen;
