/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Node, useState, useEffect} from 'react';
 import {NavigationContainer} from '@react-navigation/native';
 import {createNativeStackNavigator} from '@react-navigation/native-stack';
 
 import {
   StyleSheet,
   StatusBar,
 } from 'react-native';
 import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
 
 import {Provider, useSelector, useDispatch} from 'react-redux';
 import {PersistGate} from 'redux-persist/integration/react';
 import {store, persistor} from './app/redux/store';
 
 import AppStyle from './app/common/AppStyle';
 
 import SplashScreen from './app/SplashScreen';
 import Login from './app/Login';
 import Home from './app/Home';
import AppColors from './app/common/AppColor';
 
 const Stack = createNativeStackNavigator();
 
 const AppWrapper = () => {
   return (
     <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
         <App />
       </PersistGate>
     </Provider>
   );
 };
 
 const App = () => {
   return (
         <PaperProvider theme={AppStyle.BaseTheme}>
          <StatusBar
          backgroundColor={AppColors.primary}
          barStyle={'default'}/>
           <NavigationContainer>
             <Stack.Navigator initialRouteName="SplashScreen">
               <Stack.Screen
                 name="SplashScreen"
                 component={SplashScreen}
                 options={{headerShown: false}}
               />
               <Stack.Screen
                 name="Login"
                 component={Login}
                 options={{headerShown: false}}
               />
               <Stack.Screen
                 name="Home"
                 component={Home}
                 options={{headerShown: false}}
               />
               
             </Stack.Navigator>
           </NavigationContainer>
         </PaperProvider>
   );
 };
 
 const styles = StyleSheet.create({});
 
 export default AppWrapper;
 