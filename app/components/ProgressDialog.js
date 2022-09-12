import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Overlay} from 'react-native-elements';
import AppColors from '../common/AppColor';
import LottieView from 'lottie-react-native';

function CustomProgressBar(visible) {
  return (
    <Overlay
      isVisible={visible}
      overlayStyle={{backgroundColor: 'transparent', elevation: 0}}>
      <LottieView
        autoSize={false}
        autoPlay
        loop
        style={{
          width: 250,
          height: 250,
        }}
        source={require('../../assets/animation/loading.json')}
      />
    </Overlay>
  );
}

export default {CustomProgressBar};
