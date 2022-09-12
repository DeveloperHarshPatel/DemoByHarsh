import React, {Node, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
  BackHandler,
  Image,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';

import {Provider as PaperProvider} from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import AppStyle from './common/AppStyle';
import AppColors from './common/AppColor';
import Util from './utils/Util';

const TabMap = ({route, navigation}) => {
  const [restaurentLat, setRestaurentLat] = useState(0.0);
  const [restaurentLon, setRestaurentLon] = useState(0.0);

  const [currentLat, setCurrentLat] = useState(0.0);
  const [currentLon, setCurrentLon] = useState(0.0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      requestPermissions();
    });
    return unsubscribe;
  });

  useEffect(() => {
    console.log(route?.params);
    if (Util.isValidData(route?.params?.lat)) {
      setRestaurentLat(route.params.lat);
    }
    if (Util.isValidData(route?.params?.lon)) {
      setRestaurentLon(route.params.lon);
    }
  }, [route.params]);

  useEffect(() => {
    if (Util.isValidData(restaurentLat) && Util.isValidData(restaurentLon)) {
      console.log(parseFloat(restaurentLat));
      console.log(parseFloat(restaurentLon));
    }
  }, [restaurentLat, restaurentLon]);

  const requestPermissions = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
      const status = await Geolocation.requestAuthorization('whenInUse');
      if (status === 'granted') {
        getLocation();
      }
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use location');
        getLocation();
      } else {
        Util.showMsg('Location permission denied');
        console.log('Location permission denied');
      }
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setCurrentLat(position.coords.latitude);
        setCurrentLon(position.coords.longitude);
      },
      error => {
        Util.showMsg(error?.message);
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 100000,
      },
    );
  };

  return (
    <PaperProvider theme={AppStyle.BaseTheme}>
      <SafeAreaView style={AppStyle.Parent}>
        <View
          style={{
            flex: 1,
            backgroundColor: AppColors.accentDark,
          }}>
          <MapView
            region={{
              latitude: parseFloat(restaurentLat),
              longitude: parseFloat(restaurentLon),
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            provider={PROVIDER_GOOGLE}
            style={{
              width: '100%',
              height: '100%',
            }}>
            {Util.isValidData(currentLat) && Util.isValidData(currentLon) && (
              <Marker
                coordinate={{
                  latitude: parseFloat(currentLat),
                  longitude: parseFloat(currentLon),
                }}
                title="You're here"
              />
            )}
            <Marker
              coordinate={{
                latitude: parseFloat(restaurentLat),
                longitude: parseFloat(restaurentLon),
              }}
              image={require('../assets/shop-pin.png')}
              style={{width: 35, height: 35}}
              resizeMode="contain"
            />
            {/* Uncomment below code and use api key with Google Direction API enable to draw route on map*/}
            {/* <MapViewDirections
              origin={{latitude: parseFloat(currentLat), longitude: parseFloat(currentLon)}}
              destination={{latitude: 22.4606577, longitude: 71.0562409}}
              apikey={'AIzaSyDdCKz2yQ3fehSNjgnTpVPb-GdbbClj14I'}
            /> */}
          </MapView>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    padding: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default TabMap;
