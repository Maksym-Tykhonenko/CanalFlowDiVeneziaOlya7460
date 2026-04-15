import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import locations, {Location} from '../data/locations';
import {useSaved} from '../context/SavedContext';
import {normalize, isSmallScreen} from '../utils/responsive';

const AnimatedCard = ({item, index}: {item: Location; index: number}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {toggleSaved, isSaved} = useSaved();
  const saved = isSaved(item.id);
  const translateY = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay: 200 + index * 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.1)),
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 450,
        delay: 200 + index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{opacity, transform: [{translateY}, {scale: scaleAnim}]}}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() =>
          navigation.navigate('LocationDetail', {locationId: item.id})
        }>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingStar}>★</Text>
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardCategory}>{item.category}</Text>
          <Text style={styles.cardDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <TouchableOpacity
            style={[styles.saveButton, saved && styles.saveButtonActive]}
            onPress={() => toggleSaved(item.id)}>
            <Text style={[styles.saveIcon, saved && {color: '#1A1A1A'}]}>
              {saved ? '★' : '☆'}
            </Text>
            <Text style={[styles.saveText, saved && styles.saveTextActive]}>
              {saved ? 'Saved' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [showAll, setShowAll] = useState(false);

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(-20)).current;
  const btnOpacity = useRef(new Animated.Value(0)).current;
  const btnScale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.stagger(100, [
      Animated.parallel([
        Animated.timing(titleOpacity, {toValue: 1, duration: 500, useNativeDriver: true}),
        Animated.timing(titleY, {toValue: 0, duration: 500, useNativeDriver: true, easing: Easing.out(Easing.cubic)}),
      ]),
      Animated.parallel([
        Animated.timing(btnOpacity, {toValue: 1, duration: 400, useNativeDriver: true}),
        Animated.spring(btnScale, {toValue: 1, friction: 6, useNativeDriver: true}),
      ]),
    ]).start();
  }, []);

  const randomLocation = () => {
    const item = locations[Math.floor(Math.random() * locations.length)];
    navigation.navigate('LocationDetail', {locationId: item.id});
  };

  const displayedLocations = showAll ? locations : locations.slice(0, 5);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Animated.View style={{opacity: titleOpacity, transform: [{translateY: titleY}]}}>
          <Text style={styles.title}>Canal Flow Di Venezia</Text>
          <Text style={styles.subtitle}>Explore enchanting Venice</Text>
        </Animated.View>

        <Animated.View style={{opacity: btnOpacity, transform: [{scale: btnScale}]}}>
          <TouchableOpacity style={styles.randomButton} onPress={randomLocation}>
            <Text style={styles.randomIcon}>⇄</Text>
            <Text style={styles.randomText}>Random Location</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.allButton}
            onPress={() => setShowAll(!showAll)}>
            <Text style={styles.allButtonText}>
              {showAll ? 'Show Less' : 'All Locations'}
            </Text>
            <Text style={styles.allButtonArrow}>›</Text>
          </TouchableOpacity>
        </Animated.View>

        {displayedLocations.map((item, index) => (
          <AnimatedCard key={item.id} item={item} index={index} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  scrollContent: {
    paddingHorizontal: normalize(18),
    paddingTop: isSmallScreen ? 44 : 60,
    paddingBottom: 120,
  },
  title: {
    fontSize: normalize(isSmallScreen ? 24 : 28),
    fontWeight: '800',
    fontStyle: 'italic',
    color: '#D4A017',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: normalize(isSmallScreen ? 12 : 14),
    color: '#888',
    marginBottom: normalize(16),
  },
  randomButton: {
    backgroundColor: '#D4A017',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(isSmallScreen ? 12 : 14),
    borderRadius: 12,
    marginBottom: 12,
  },
  randomIcon: {
    fontSize: normalize(16),
    color: '#1A1A1A',
    marginRight: 8,
    fontWeight: '700',
  },
  randomText: {
    fontSize: normalize(isSmallScreen ? 14 : 16),
    fontWeight: '700',
    color: '#1A1A1A',
  },
  allButton: {
    backgroundColor: '#1A1A1A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(isSmallScreen ? 12 : 14),
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: normalize(16),
    borderWidth: 1,
    borderColor: '#333',
  },
  allButtonText: {
    fontSize: normalize(isSmallScreen ? 13 : 15),
    fontWeight: '600',
    color: '#D4A017',
  },
  allButtonArrow: {
    fontSize: normalize(18),
    color: '#D4A017',
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: normalize(14),
    marginBottom: normalize(14),
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: isSmallScreen ? 140 : 180,
  },
  ratingBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(26,26,26,0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  ratingStar: {
    fontSize: normalize(12),
    color: '#D4A017',
    marginRight: 3,
  },
  ratingText: {
    fontSize: normalize(12),
    color: '#FFF',
    fontWeight: '700',
  },
  cardContent: {
    padding: normalize(14),
  },
  cardTitle: {
    fontSize: normalize(isSmallScreen ? 16 : 18),
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 3,
  },
  cardCategory: {
    fontSize: normalize(isSmallScreen ? 11 : 13),
    color: '#888',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: normalize(isSmallScreen ? 11 : 13),
    color: '#AAA',
    lineHeight: normalize(isSmallScreen ? 16 : 18),
    marginBottom: 10,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(isSmallScreen ? 8 : 10),
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
  },
  saveButtonActive: {
    backgroundColor: '#D4A017',
  },
  saveIcon: {
    fontSize: normalize(14),
    color: '#D4A017',
    marginRight: 6,
  },
  saveText: {
    fontSize: normalize(isSmallScreen ? 12 : 14),
    fontWeight: '600',
    color: '#AAA',
  },
  saveTextActive: {
    color: '#1A1A1A',
  },
});

export default HomeScreen;
