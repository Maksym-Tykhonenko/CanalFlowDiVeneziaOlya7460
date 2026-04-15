import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {isSmallScreen, normalize, hp} from '../utils/responsive';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const {width, height} = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Discover Venice',
    subtitle: 'Experience the beauty of canals',
    info: '20 unique locations across 4 themed routes — from iconic landmarks to hidden gems only locals know.',
    image: require('../assets/image/onboard1.png'),
  },
  {
    id: '2',
    title: 'Historic Architecture',
    subtitle: 'Facades of timeless beauty',
    info: 'Gothic palaces, Renaissance churches, and Baroque masterpieces line every canal. Each building tells a story spanning centuries.',
    image: require('../assets/image/onboard2.png'),
  },
  {
    id: '3',
    title: 'Romantic Canals',
    subtitle: 'Navigate the floating city',
    info: 'Explore quiet side canals and wide waterways. Use our interactive map with all locations, coordinates, and directions.',
    image: require('../assets/image/onboard3.png'),
  },
  {
    id: '4',
    title: 'Venetian Charm',
    subtitle: 'Unique atmosphere of the city',
    info: '50 travel tips, local recommendations, and practical advice to make your Venice experience unforgettable.',
    image: require('../assets/image/onboard4.png'),
  },
  {
    id: '5',
    title: 'Start Your\nJourney',
    subtitle: 'Your guide to Venice',
    info: 'Test your knowledge with a 20-question quiz, save your favorite spots, and let the canals guide your adventure.',
    image: require('../assets/image/onboard5.png'),
  },
];

const OnboardingScreen: React.FC<Props> = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const goNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({index: currentIndex + 1});
    } else {
      navigation.replace('Main');
    }
  };

  const skip = () => {
    navigation.replace('Main');
  };

  const renderSlide = ({item}: {item: (typeof slides)[0]}) => (
    <ImageBackground source={item.image} style={styles.slide} resizeMode="cover">
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{item.info}</Text>
        </View>
      </View>
    </ImageBackground>
  );

  const isLast = currentIndex === slides.length - 1;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />

      {!isLast && (
        <TouchableOpacity style={styles.skipButton} onPress={skip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      <View style={styles.bottomContainer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={goNext}>
          <Text style={styles.nextButtonText}>
            {isLast ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  slide: {
    width,
    height,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    paddingHorizontal: normalize(24),
    paddingBottom: isSmallScreen ? hp(22) : hp(25),
  },
  title: {
    fontSize: normalize(isSmallScreen ? 28 : 36),
    fontWeight: '800',
    fontStyle: 'italic',
    color: '#D4A017',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: normalize(isSmallScreen ? 14 : 16),
    color: '#CCCCCC',
    marginBottom: 12,
  },
  infoBox: {
    backgroundColor: 'rgba(10, 10, 10, 0.6)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#D4A017',
  },
  infoText: {
    fontSize: normalize(isSmallScreen ? 12 : 13),
    color: '#DDD',
    lineHeight: normalize(isSmallScreen ? 17 : 20),
  },
  skipButton: {
    position: 'absolute',
    top: isSmallScreen ? 40 : 56,
    right: 24,
    zIndex: 10,
  },
  skipText: {
    fontSize: normalize(16),
    color: '#D4A017',
    fontWeight: '600',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: isSmallScreen ? 30 : 60,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: isSmallScreen ? 16 : 24,
  },
  dot: {
    height: 4,
    borderRadius: 2,
    marginHorizontal: 4,
  },
  dotActive: {
    width: 28,
    backgroundColor: '#D4A017',
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#666',
  },
  nextButton: {
    backgroundColor: '#D4A017',
    paddingVertical: normalize(isSmallScreen ? 13 : 16),
    paddingHorizontal: normalize(isSmallScreen ? 60 : 80),
    borderRadius: 30,
  },
  nextButtonText: {
    fontSize: normalize(isSmallScreen ? 15 : 17),
    fontWeight: '700',
    color: '#1A1A1A',
  },
});

export default OnboardingScreen;
