/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Node, useEffect, useState} from 'react';

import {
  Alert,
  BackHandler,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  Button,
  DefaultTheme,
  Provider as PaperProvider,
  TextInput,
  Surface,
} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import AppStyle from './common/AppStyle';
import AppColors from './common/AppColor';
import Util from './utils/Util';

const neededEmail = 'demo@gmail.com';
const neededPassword = '12345';

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'EXIT', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  async function doLogin() {
    if (!Util.isValidData(email)) {
      Util.showMsg('Please enter valid email');
      return;
    }
    if (!Util.isValidData(password)) {
      Util.showMsg('Please enter valid password');
      return;
    }

    if (email === neededEmail && password === neededPassword) {
      navigation.navigate('Home');
    } else if (email !== neededEmail) {
      Util.showMsg('Email not matched');
    } else if (password !== neededPassword) {
      Util.showMsg('Password not matched');
    }
  }

  return (
    <PaperProvider theme={AppStyle.BaseTheme}>
      <SafeAreaView
        style={{
          ...AppStyle.Parent,
          backgroundColor: AppColors.white,
        }}>
        <KeyboardAvoidingView
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: AppColors.white,
          }}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
            style={{
              width: '100%',
              height: '100%',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: AppColors.white,
                padding: 26,
              }}>
              <Text
                style={{
                  ...AppStyle.TextStyle.titleExtraLarge,
                  paddingHorizontal: 5,
                }}>
                Login
              </Text>
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <TextInput
                  label="Email"
                  value={email}
                  mode="flat"
                  keyboardType="email-address"
                  onChangeText={text => setEmail(text)}
                  underlineColor={AppColors.accent}
                  theme={{
                    colors: {
                      background: AppColors.accentWhite,
                      text: AppColors.textPrimary,
                      accent: AppColors.accent,
                    },
                    roundness: 5,
                  }}
                  style={{
                    marginTop: 20,
                  }}
                />
                <TextInput
                  label="Password"
                  value={password}
                  secureTextEntry
                  right={<TextInput.Icon name="eye" />}
                  mode="flat"
                  keyboardType="default"
                  onChangeText={text => setPassword(text)}
                  style={{
                    marginTop: 20,
                  }}
                  underlineColor={AppColors.accent}
                  theme={{
                    colors: {
                      background: AppColors.accentWhite,
                      text: AppColors.textPrimary,
                      accent: AppColors.accent,
                    },
                    roundness: 5,
                  }}
                />
                <Button
                  raised
                  mode="contained"
                  theme={{roundness: 5}}
                  labelStyle={{
                    color: AppColors.white,
                  }}
                  onPress={() => {
                    doLogin();
                  }}
                  style={{
                    marginTop: 25,
                    marginBottom: 25,
                  }}>
                  Login
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({});

export default Login;
