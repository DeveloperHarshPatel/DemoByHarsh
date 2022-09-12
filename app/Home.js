import React, {Node, useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import AppColors from './common/AppColor';
import TabList from './TabList';
import TabMap from './TabMap';
import {RFValue} from 'react-native-responsive-fontsize';
import AppStyle from './common/AppStyle';

const Tab = createMaterialTopTabNavigator();

const Home = ({navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName="TabList"
      screenOptions={{
        tabBarActiveTintColor: AppColors.accent,
        tabBarLabelStyle: {...AppStyle.TextStyle.tabTitle},
        tabBarStyle: {backgroundColor: AppColors.primary},
        tabBarIndicatorStyle: {
          backgroundColor: AppColors.accent,
        },
      }}>
      <Tab.Screen
        name="TabList"
        component={TabList}
        options={{tabBarLabel: 'Restaurant List'}}
      />
      <Tab.Screen
        name="TabMap"
        component={TabMap}
        options={{tabBarLabel: 'Map View'}}
      />
    </Tab.Navigator>
  );
};

export default Home;
