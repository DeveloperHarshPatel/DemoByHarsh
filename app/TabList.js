import React, {Component, Node, useEffect, useState} from 'react';

import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
  BackHandler,
  Image,
} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchAndStoreToDatabase, getDataFromDatabase} from './redux/HomeAction';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

import ProgressDialog from './components/ProgressDialog';
import Util from './utils/Util';
import AppStyle from './common/AppStyle';
import AppColors from './common/AppColor';

class TabList extends Component {
  constructor(props) {
    super(props);
    // this.props.actions.getDataFromDatabase();
  }

  componentDidMount() {
    if (!Util.isValidArray(this.props.dataList)) {
      // call api to get data
      console.log('local db is empty. Calling server api');
      this.props.actions.fetchAndStoreToDatabase();
    } else {
      console.log('loading data from local db.');
      this.props.actions.getDataFromDatabase();
    }
  }

  _renderRating = count => {
    let ratingBar = [];
    //Array to hold the filled or empty Stars
    for (var i = 1; i <= 5; i++) {
      ratingBar.push(
        <Image
          key={i}
          style={{
            width: 15,
            height: 15,
            resizeMode: 'cover',
          }}
          source={
            i <= count
              ? require('../assets/Star-fill.png')
              : require('../assets/Star-empty.png')
          }
        />,
      );
    }
    return ratingBar;
  };

  _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: AppColors.white,
          borderRadius: 7,
          padding: 10,
          marginHorizontal: 10,
          marginVertical: 7,
          flexDirection: 'row',
          elevation: 5,
        }}>
        <Image
          style={{
            width: 60,
            height: 60,
            margin: 7,
            borderRadius: 5,
          }}
          source={require('../assets/img.png')}
        />
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              ...AppStyle.TextStyle.titleNormal,
            }}>
            {item.title}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 2}}>
            {this._renderRating(item.rating)}
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            margin: 7,
            borderRadius: 5,
            backgroundColor: AppColors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
          onPress={() => {
            this.props.navigation.navigate('TabMap', {
              lat: item.latitude,
              lon: item.longitude,
            });
          }}>
          <Image
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
            source={require('../assets/map.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <PaperProvider theme={AppStyle.BaseTheme}>
        <SafeAreaView style={AppStyle.Parent}>
          {ProgressDialog.CustomProgressBar(this.props.loading)}
          <FlatList
            contentContainerStyle={{
              backgroundColor: AppColors.ghostWhite,
            }}
            data={this.props.dataList}
            renderItem={(item, index) => this._renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
      </PaperProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataList: state.homeReducer.dataList,
    loading: state.homeReducer.loading,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {fetchAndStoreToDatabase, getDataFromDatabase},
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TabList);
