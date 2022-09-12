import Snackbar from 'react-native-snackbar';
import AppColors from '../common/AppColor';

function showMsg(message) {
  setTimeout(() => {
    Snackbar.show({
      text: message,
      textColor: AppColors.white,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: AppColors.accentDarker,
    });
  }, 100);
}

function isValidData(data) {
  if (data === undefined) {
    return false;
  } else if (data === null) {
    return false;
  } else if (data === '') {
    return false;
  } else {
    return true;
  }
}

function isValidArray(array) {
  if (array === undefined) {
    return false;
  } else if (array === null) {
    return false;
  } else if (array === '') {
    return false;
  } else if (array === []) {
    return false;
  } else if (array.length === 0) {
    return false;
  } else {
    return true;
  }
}

export default {
  isValidData,
  showMsg,
  isValidArray,
};
