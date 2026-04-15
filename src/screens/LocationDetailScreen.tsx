import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Share,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import locations from '../data/locations';
import {useSaved} from '../context/SavedContext';
import {normalize, isSmallScreen} from '../utils/responsive';

const {width} = Dimensions.get('window');

const LocationDetailScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const {toggleSaved, isSaved} = useSaved();

  const location = locations.find(l => l.id === route.params?.locationId);

  const imageScale = useRef(new Animated.Value(1.15)).current;
  const contentY = useRef(new Animated.Value(60)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const aboutY = useRef(new Animated.Value(40)).current;
  const aboutOpacity = useRef(new Animated.Value(0)).current;
  const tipsY = useRef(new Animated.Value(40)).current;
  const tipsOpacity = useRef(new Animated.Value(0)).current;
  const infoY = useRef(new Animated.Value(40)).current;
  const infoOpacity = useRef(new Animated.Value(0)).current;
  const btnScale = useRef(new Animated.Value(0.8)).current;
  const btnOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(imageScale, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();

    Animated.stagger(120, [
      Animated.parallel([
        Animated.timing(contentY, {toValue: 0, duration: 500, delay: 200, useNativeDriver: true, easing: Easing.out(Easing.cubic)}),
        Animated.timing(contentOpacity, {toValue: 1, duration: 500, delay: 200, useNativeDriver: true}),
      ]),
      Animated.parallel([
        Animated.timing(aboutY, {toValue: 0, duration: 450, useNativeDriver: true, easing: Easing.out(Easing.cubic)}),
        Animated.timing(aboutOpacity, {toValue: 1, duration: 450, useNativeDriver: true}),
      ]),
      Animated.parallel([
        Animated.timing(tipsY, {toValue: 0, duration: 450, useNativeDriver: true, easing: Easing.out(Easing.cubic)}),
        Animated.timing(tipsOpacity, {toValue: 1, duration: 450, useNativeDriver: true}),
      ]),
      Animated.parallel([
        Animated.timing(infoY, {toValue: 0, duration: 450, useNativeDriver: true, easing: Easing.out(Easing.cubic)}),
        Animated.timing(infoOpacity, {toValue: 1, duration: 450, useNativeDriver: true}),
      ]),
      Animated.parallel([
        Animated.spring(btnScale, {toValue: 1, friction: 5, useNativeDriver: true}),
        Animated.timing(btnOpacity, {toValue: 1, duration: 400, useNativeDriver: true}),
      ]),
    ]).start();
  }, []);

  if (!location) return null;
  const saved = isSaved(location.id);

  const getDirections = () => {
    const url = `maps://app?daddr=${location.latitude},${location.longitude}`;
    Linking.openURL(url).catch(() => {
      Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`,
      );
    });
  };

  const shareLocation = () => {
    Share.share({
      title: location.name,
      message: `${location.name}\n${location.description}\nCoordinates: ${location.latitude}, ${location.longitude}`,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrapper}>
          <Animated.Image
            source={location.image}
            style={[styles.image, {transform: [{scale: imageScale}]}]}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay} />
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.headerBtnText}>←</Text>
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.headerBtn} onPress={shareLocation}>
                <Text style={styles.headerBtnText}>↗</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerBtn}
                onPress={() => toggleSaved(location.id)}>
                <Text style={[styles.headerBtnText, saved && {color: '#D4A017'}]}>
                  {saved ? '★' : '☆'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.imageInfo}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{location.category}</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingStar}>★</Text>
              <Text style={styles.ratingText}>{location.rating}</Text>
            </View>
          </View>
          <Text style={styles.locationName}>{location.name}</Text>
          <View style={styles.coordsRow}>
            <Text style={styles.coordsIcon}>◎</Text>
            <Text style={styles.coordsText}>
              {location.latitude}, {location.longitude}
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Animated.View style={{opacity: contentOpacity, transform: [{translateY: contentY}]}}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{location.description}</Text>
          </Animated.View>

          <Animated.View style={{opacity: aboutOpacity, transform: [{translateY: aboutY}]}}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.descriptionText}>{location.fullInfo}</Text>
          </Animated.View>

          <Animated.View style={{opacity: tipsOpacity, transform: [{translateY: tipsY}]}}>
            <View style={styles.tipsRow}>
              <View style={styles.tipBox}>
                <Text style={styles.tipBoxTitle}>Best Time</Text>
                <Text style={styles.tipBoxText}>{location.bestTime}</Text>
              </View>
              <View style={styles.tipBox}>
                <Text style={styles.tipBoxTitle}>Local Tips</Text>
                <Text style={styles.tipBoxText}>{location.tips}</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View style={{opacity: infoOpacity, transform: [{translateY: infoY}]}}>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Information</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Category</Text>
                <Text style={styles.infoValue}>{location.category}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Group</Text>
                <Text style={styles.infoValue}>{location.categoryGroup}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Rating</Text>
                <View style={styles.ratingInline}>
                  <Text style={styles.ratingStarSmall}>★</Text>
                  <Text style={styles.infoValue}>{location.rating}</Text>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Coordinates</Text>
                <Text style={styles.infoValue}>
                  {location.latitude}, {location.longitude}
                </Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View style={{opacity: btnOpacity, transform: [{scale: btnScale}]}}>
            <TouchableOpacity style={styles.directionsButton} onPress={getDirections}>
              <Text style={styles.directionsIcon}>▷</Text>
              <Text style={styles.directionsText}>Get Directions</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0A0A0A'},
  imageWrapper: {position: 'relative', overflow: 'hidden'},
  image: {width, height: isSmallScreen ? 240 : 320},
  imageOverlay: {...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)'},
  headerButtons: {position: 'absolute', top: isSmallScreen ? 40 : 54, left: normalize(18), right: normalize(18), flexDirection: 'row', justifyContent: 'space-between'},
  headerRight: {flexDirection: 'row', gap: 10},
  headerBtn: {width: normalize(36), height: normalize(36), borderRadius: normalize(18), backgroundColor: 'rgba(26,26,26,0.7)', justifyContent: 'center', alignItems: 'center'},
  headerBtnText: {fontSize: normalize(18), color: '#D4A017'},
  imageInfo: {position: 'absolute', bottom: isSmallScreen ? 55 : 70, left: normalize(18), flexDirection: 'row', alignItems: 'center', gap: 8},
  categoryBadge: {backgroundColor: '#2E7D32', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8},
  categoryText: {fontSize: normalize(11), color: '#FFF', fontWeight: '600'},
  ratingBadge: {backgroundColor: 'rgba(26,26,26,0.8)', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8},
  ratingStar: {fontSize: normalize(11), color: '#D4A017', marginRight: 3},
  ratingText: {fontSize: normalize(11), color: '#FFF', fontWeight: '700'},
  locationName: {position: 'absolute', bottom: isSmallScreen ? 25 : 30, left: normalize(18), fontSize: normalize(isSmallScreen ? 22 : 28), fontWeight: '800', color: '#FFF', maxWidth: width - 40},
  coordsRow: {position: 'absolute', bottom: isSmallScreen ? 8 : 10, left: normalize(18), flexDirection: 'row', alignItems: 'center'},
  coordsIcon: {fontSize: normalize(11), color: '#AAA', marginRight: 5},
  coordsText: {fontSize: normalize(11), color: '#AAA'},
  content: {padding: normalize(18), paddingBottom: 40},
  sectionTitle: {fontSize: normalize(isSmallScreen ? 17 : 20), fontWeight: '700', color: '#D4A017', marginBottom: 8},
  descriptionText: {fontSize: normalize(isSmallScreen ? 13 : 15), color: '#CCC', lineHeight: normalize(isSmallScreen ? 19 : 22), marginBottom: 20},
  tipsRow: {gap: 10, marginBottom: 20},
  tipBox: {backgroundColor: '#1A1A1A', borderRadius: 12, padding: normalize(14), borderLeftWidth: 3, borderLeftColor: '#D4A017'},
  tipBoxTitle: {fontSize: normalize(isSmallScreen ? 13 : 15), fontWeight: '700', color: '#D4A017', marginBottom: 4},
  tipBoxText: {fontSize: normalize(isSmallScreen ? 12 : 13), color: '#BBB', lineHeight: normalize(isSmallScreen ? 17 : 19)},
  infoCard: {backgroundColor: '#1A1A1A', borderRadius: normalize(14), padding: normalize(16), marginBottom: 20},
  infoTitle: {fontSize: normalize(isSmallScreen ? 15 : 18), fontWeight: '700', color: '#D4A017', marginBottom: 12},
  infoRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 7},
  infoLabel: {fontSize: normalize(isSmallScreen ? 12 : 14), color: '#888'},
  infoValue: {fontSize: normalize(isSmallScreen ? 12 : 14), color: '#FFF', fontWeight: '600', maxWidth: '55%', textAlign: 'right'},
  ratingInline: {flexDirection: 'row', alignItems: 'center'},
  ratingStarSmall: {fontSize: normalize(13), color: '#D4A017', marginRight: 3},
  divider: {height: 1, backgroundColor: '#2A2A2A'},
  directionsButton: {backgroundColor: '#D4A017', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: normalize(isSmallScreen ? 13 : 16), borderRadius: 14},
  directionsIcon: {fontSize: normalize(16), color: '#1A1A1A', marginRight: 8},
  directionsText: {fontSize: normalize(isSmallScreen ? 14 : 16), fontWeight: '700', color: '#1A1A1A'},
});

export default LocationDetailScreen;
