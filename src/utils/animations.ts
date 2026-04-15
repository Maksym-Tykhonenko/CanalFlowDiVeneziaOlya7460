import {useRef, useEffect} from 'react';
import {Animated, Easing} from 'react-native';

export const useFadeIn = (delay: number = 0, duration: number = 500) => {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start();
  }, []);
  return opacity;
};

export const useSlideUp = (delay: number = 0, fromY: number = 30) => {
  const translateY = useRef(new Animated.Value(fromY)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }, []);
  return {translateY, opacity};
};

export const useScale = (delay: number = 0) => {
  const scale = useRef(new Animated.Value(0.85)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 7,
        tension: 40,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  return {scale, opacity};
};

export const staggerDelay = (index: number, base: number = 80) => index * base;

export const createCardAnimation = (index: number) => {
  const translateY = new Animated.Value(40);
  const opacity = new Animated.Value(0);
  const delay = 150 + index * 80;

  Animated.parallel([
    Animated.timing(translateY, {
      toValue: 0,
      duration: 450,
      delay,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }),
    Animated.timing(opacity, {
      toValue: 1,
      duration: 450,
      delay,
      useNativeDriver: true,
    }),
  ]).start();

  return {translateY, opacity};
};
