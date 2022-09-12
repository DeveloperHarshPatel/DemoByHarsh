import {StyleSheet} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import AppColors from './AppColor';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const BaseTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: AppColors.primary,
    accent: AppColors.accent,
    text: AppColors.textSecondary,
  },
};

const Parent = {
  backgroundColor: AppColors.colorGhostWhite,
  flex: 1,
};

const TextStyle = StyleSheet.create({
  tabTitle: {
    fontSize: RFValue(14),
    fontWeight: '700',
  },
  titleExtraLarge: {
    fontSize: RFValue(24),
    fontWeight: '700',
    color: AppColors.textPrimary,
  },
  titleLarge: {
    fontSize: RFValue(20),
    fontWeight: '700',
    color: AppColors.textPrimary,
  },
  titleNormal: {
    fontSize: RFValue(16),
    fontWeight: '700',
    color: AppColors.textPrimary,
  },
  titleSmall: {
    fontSize: RFValue(15),
    fontWeight: '700',
    color: AppColors.textPrimary,
  },
  descNormalPrimary: {
    fontSize: RFValue(16),
    color: AppColors.textPrimary,
  },
  descNormal: {
    fontSize: RFValue(16),
    color: AppColors.textSecondary,
  },
  descSmallPrimary: {
    fontSize: RFValue(15),
    color: AppColors.textPrimary,
  },
  descSmall: {
    fontSize: RFValue(15),
    color: AppColors.textSecondary,
  },
  optionMenuTitle: {
    fontSize: RFValue(20),
    fontWeight: '500',
    color: AppColors.textPrimary,
    textAlign: 'center',
    textAlignVertical: 'center',
  }
});

export default {
  BaseTheme,
  Parent,
  TextStyle,
};
