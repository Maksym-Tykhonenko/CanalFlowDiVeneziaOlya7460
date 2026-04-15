import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  StatusBar,
  Dimensions,
} from 'react-native';
import {WebView} from 'react-native-webview';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const SPINNER_HTML = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { margin: 0; padding: 0; }
  body {
    background: #0A0A0A;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
  }
  .spinner {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 2px solid #444;
    box-shadow:
      -10px -10px 10px #6359f8,
      0px -10px 10px 0px #9c32e2,
      10px -10px 10px #f36896,
      10px 0 10px #ff0b0b,
      10px 10px 10px 0px #ff5500,
      0 10px 10px 0px #ff9500,
      -10px 10px 10px 0px #ffb700;
    animation: rot55 0.7s linear infinite;
    position: relative;
  }
  .spinnerin {
    border: 2px solid #444;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @keyframes rot55 {
    to { transform: rotate(360deg); }
  }
</style>
</head>
<body>
  <div class="spinner">
    <div class="spinnerin"></div>
  </div>
</body>
</html>
`;

const {width} = Dimensions.get('window');

const LoaderScreen: React.FC<Props> = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      <Animated.View
        style={[
          styles.webviewContainer,
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}>
        <WebView
          source={{html: SPINNER_HTML}}
          style={styles.webview}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          javaScriptEnabled={true}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  webviewContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
  },
  webview: {
    backgroundColor: '#0A0A0A',
  },
});

export default LoaderScreen;
