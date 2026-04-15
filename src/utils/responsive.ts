import {Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

export const wp = (percentage: number) => {
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * percentage) / 100);
};

export const hp = (percentage: number) => {
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * percentage) / 100);
};

export const normalize = (size: number) => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const isSmallScreen = SCREEN_HEIGHT < 700;
export const isMediumScreen = SCREEN_HEIGHT >= 700 && SCREEN_HEIGHT < 812;

export {SCREEN_WIDTH, SCREEN_HEIGHT};
