import React, {useRef, useEffect} from 'react';
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
import locations from '../data/locations';
import {useSaved} from '../context/SavedContext';
import {normalize, isSmallScreen} from '../utils/responsive';

const AnimatedSavedCard = ({item, index, onRemove, onPress}: {item: any; index: number; onRemove: () => void; onPress: () => void}) => {
  const translateX = useRef(new Animated.Value(-60)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0, duration: 450, delay: index * 100,
        useNativeDriver: true, easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(opacity, {
        toValue: 1, duration: 450, delay: index * 100, useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const onPressIn = () => Animated.spring(scaleAnim, {toValue: 0.97, useNativeDriver: true}).start();
  const onPressOut = () => Animated.spring(scaleAnim, {toValue: 1, friction: 4, useNativeDriver: true}).start();

  return (
    <Animated.View style={{opacity, transform: [{translateX}, {scale: scaleAnim}]}}>
      <TouchableOpacity style={styles.card} activeOpacity={1} onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
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
          <Text style={styles.cardDescription} numberOfLines={2}>{item.description}</Text>
          <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
            <Text style={styles.removeIcon}>🗑</Text>
            <Text style={styles.removeText}>Remove from saved</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const SavedScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {savedIds, toggleSaved} = useSaved();
  const savedLocations = locations.filter(l => savedIds.includes(l.id));

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(-20)).current;
  const emptyScale = useRef(new Animated.Value(0)).current;
  const emptyOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(titleOpacity, {toValue: 1, duration: 500, useNativeDriver: true}),
      Animated.timing(titleY, {toValue: 0, duration: 500, useNativeDriver: true, easing: Easing.out(Easing.cubic)}),
    ]).start();

    if (savedLocations.length === 0) {
      Animated.parallel([
        Animated.spring(emptyScale, {toValue: 1, delay: 300, friction: 5, useNativeDriver: true}),
        Animated.timing(emptyOpacity, {toValue: 1, duration: 500, delay: 300, useNativeDriver: true}),
      ]).start();
    }
  }, [savedLocations.length]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={{opacity: titleOpacity, transform: [{translateY: titleY}]}}>
          <Text style={styles.title}>Saved Locations</Text>
          <Text style={styles.subtitle}>Your favorite places in Venice</Text>
        </Animated.View>

        {savedLocations.length === 0 ? (
          <Animated.View style={[styles.emptyContainer, {opacity: emptyOpacity, transform: [{scale: emptyScale}]}]}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>☆</Text>
            </View>
            <Text style={styles.emptyText}>No saved locations</Text>
          </Animated.View>
        ) : (
          savedLocations.map((item, index) => (
            <AnimatedSavedCard
              key={item.id}
              item={item}
              index={index}
              onRemove={() => toggleSaved(item.id)}
              onPress={() => navigation.navigate('LocationDetail', {locationId: item.id})}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0A0A0A'},
  scrollContent: {paddingHorizontal: normalize(18), paddingTop: isSmallScreen ? 44 : 60, paddingBottom: 120},
  title: {fontSize: normalize(isSmallScreen ? 24 : 28), fontWeight: '800', fontStyle: 'italic', color: '#D4A017', marginBottom: 4},
  subtitle: {fontSize: normalize(isSmallScreen ? 12 : 14), color: '#888', marginBottom: normalize(20)},
  emptyContainer: {alignItems: 'center', marginTop: isSmallScreen ? 50 : 80},
  emptyIcon: {width: normalize(isSmallScreen ? 80 : 100), height: normalize(isSmallScreen ? 80 : 100), borderRadius: normalize(50), backgroundColor: '#2A2A2A', justifyContent: 'center', alignItems: 'center', marginBottom: 16},
  emptyIconText: {fontSize: normalize(isSmallScreen ? 32 : 40), color: '#D4A017'},
  emptyText: {fontSize: normalize(isSmallScreen ? 14 : 16), color: '#888'},
  card: {backgroundColor: '#1A1A1A', borderRadius: normalize(14), marginBottom: normalize(14), overflow: 'hidden'},
  imageContainer: {position: 'relative'},
  cardImage: {width: '100%', height: isSmallScreen ? 140 : 180},
  ratingBadge: {position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(26,26,26,0.85)', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12},
  ratingStar: {fontSize: normalize(12), color: '#D4A017', marginRight: 3},
  ratingText: {fontSize: normalize(12), color: '#FFF', fontWeight: '700'},
  cardContent: {padding: normalize(14)},
  cardTitle: {fontSize: normalize(isSmallScreen ? 16 : 18), fontWeight: '700', color: '#FFF', marginBottom: 3},
  cardCategory: {fontSize: normalize(isSmallScreen ? 11 : 13), color: '#888', marginBottom: 6},
  cardDescription: {fontSize: normalize(isSmallScreen ? 11 : 13), color: '#AAA', lineHeight: normalize(isSmallScreen ? 16 : 18), marginBottom: 10},
  removeButton: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: normalize(isSmallScreen ? 8 : 10), borderRadius: 20, borderWidth: 1, borderColor: '#D4A017'},
  removeIcon: {fontSize: normalize(13), marginRight: 6},
  removeText: {fontSize: normalize(isSmallScreen ? 12 : 14), fontWeight: '600', color: '#D4A017'},
});

export default SavedScreen;
