import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import MapView, {Marker, PROVIDER_DEFAULT} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import locations, {Location} from '../data/locations';
import {normalize, isSmallScreen} from '../utils/responsive';

const MapScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const mapRef = useRef<MapView>(null);

  const selected = locations.find(l => l.id === selectedId);

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(-20)).current;
  const mapOpacity = useRef(new Animated.Value(0)).current;
  const mapScale = useRef(new Animated.Value(0.95)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;
  const listY = useRef(new Animated.Value(30)).current;
  const selectedAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(150, [
      Animated.parallel([
        Animated.timing(titleOpacity, {toValue: 1, duration: 500, useNativeDriver: true}),
        Animated.timing(titleY, {toValue: 0, duration: 500, useNativeDriver: true, easing: Easing.out(Easing.cubic)}),
      ]),
      Animated.parallel([
        Animated.timing(mapOpacity, {toValue: 1, duration: 500, useNativeDriver: true}),
        Animated.spring(mapScale, {toValue: 1, friction: 7, useNativeDriver: true}),
      ]),
      Animated.parallel([
        Animated.timing(listOpacity, {toValue: 1, duration: 500, useNativeDriver: true}),
        Animated.timing(listY, {toValue: 0, duration: 500, useNativeDriver: true, easing: Easing.out(Easing.cubic)}),
      ]),
    ]).start();
  }, []);

  useEffect(() => {
    if (selectedId) {
      selectedAnim.setValue(0);
      Animated.spring(selectedAnim, {toValue: 1, friction: 6, useNativeDriver: true}).start();
    }
  }, [selectedId]);

  const onMarkerPress = (loc: Location) => {
    setSelectedId(loc.id);
    mapRef.current?.animateToRegion({
      latitude: loc.latitude,
      longitude: loc.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={{opacity: titleOpacity, transform: [{translateY: titleY}]}}>
          <Text style={styles.title}>Map</Text>
          <Text style={styles.subtitle}>All Venice locations on the map</Text>
        </Animated.View>

        <Animated.View style={[styles.mapContainer, {opacity: mapOpacity, transform: [{scale: mapScale}]}]}>
          <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_DEFAULT}
            initialRegion={{latitude: 45.4371, longitude: 12.3326, latitudeDelta: 0.025, longitudeDelta: 0.025}}
            mapType="standard">
            {locations.map(loc => (
              <Marker
                key={loc.id}
                coordinate={{latitude: loc.latitude, longitude: loc.longitude}}
                title={loc.name}
                pinColor={selectedId === loc.id ? '#D4A017' : '#FF6B00'}
                onPress={() => onMarkerPress(loc)}
              />
            ))}
          </MapView>
          <TouchableOpacity
            style={styles.locateButton}
            onPress={() => mapRef.current?.animateToRegion({latitude: 45.4371, longitude: 12.3326, latitudeDelta: 0.025, longitudeDelta: 0.025})}>
            <Text style={styles.locateIcon}>◎</Text>
          </TouchableOpacity>
        </Animated.View>

        {selected && (
          <Animated.View style={{transform: [{scale: selectedAnim}], opacity: selectedAnim}}>
            <TouchableOpacity
              style={styles.selectedCard}
              onPress={() => navigation.navigate('LocationDetail', {locationId: selected.id})}>
              <View style={styles.selectedDot} />
              <View style={styles.selectedInfo}>
                <Text style={styles.selectedName}>{selected.name}</Text>
                <Text style={styles.selectedCategory}>{selected.category}</Text>
                <Text style={styles.selectedDesc} numberOfLines={2}>{selected.description}</Text>
                <Text style={styles.selectedCoords}>Lat: {selected.latitude} Lng: {selected.longitude}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}

        <Animated.View style={{opacity: listOpacity, transform: [{translateY: listY}]}}>
          <Text style={styles.listTitle}>Location List</Text>
          {locations.map(loc => (
            <TouchableOpacity
              key={loc.id}
              style={[styles.listItem, selectedId === loc.id && styles.listItemActive]}
              onPress={() => onMarkerPress(loc)}>
              <View style={[styles.listDot, selectedId === loc.id && styles.listDotActive]} />
              <View style={styles.listTextContainer}>
                <Text style={styles.listName}>{loc.name}</Text>
                <Text style={styles.listCategory}>{loc.category}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0A0A0A'},
  scrollContent: {paddingHorizontal: normalize(18), paddingTop: isSmallScreen ? 44 : 60, paddingBottom: 120},
  title: {fontSize: normalize(isSmallScreen ? 24 : 28), fontWeight: '800', fontStyle: 'italic', color: '#D4A017', marginBottom: 4},
  subtitle: {fontSize: normalize(isSmallScreen ? 12 : 14), color: '#888', marginBottom: normalize(14)},
  mapContainer: {borderRadius: normalize(14), overflow: 'hidden', marginBottom: normalize(14), position: 'relative'},
  map: {width: '100%', height: isSmallScreen ? 200 : 260},
  locateButton: {position: 'absolute', top: 10, right: 10, width: normalize(32), height: normalize(32), borderRadius: normalize(16), backgroundColor: 'rgba(26,26,26,0.8)', justifyContent: 'center', alignItems: 'center'},
  locateIcon: {fontSize: normalize(16), color: '#D4A017'},
  selectedCard: {backgroundColor: '#1A1A1A', borderRadius: normalize(12), padding: normalize(14), marginBottom: normalize(16), flexDirection: 'row', borderWidth: 1, borderColor: '#D4A017'},
  selectedDot: {width: 8, height: 8, borderRadius: 4, backgroundColor: '#D4A017', marginTop: 5, marginRight: 10},
  selectedInfo: {flex: 1},
  selectedName: {fontSize: normalize(isSmallScreen ? 14 : 16), fontWeight: '700', color: '#FFF', marginBottom: 2},
  selectedCategory: {fontSize: normalize(isSmallScreen ? 10 : 12), color: '#888', marginBottom: 4},
  selectedDesc: {fontSize: normalize(isSmallScreen ? 11 : 13), color: '#AAA', lineHeight: normalize(16), marginBottom: 4},
  selectedCoords: {fontSize: normalize(isSmallScreen ? 10 : 11), color: '#666'},
  listTitle: {fontSize: normalize(isSmallScreen ? 16 : 18), fontWeight: '700', color: '#D4A017', marginBottom: normalize(10)},
  listItem: {backgroundColor: '#1A1A1A', borderRadius: normalize(10), padding: normalize(12), marginBottom: 7, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#2A2A2A'},
  listItemActive: {borderColor: '#D4A017'},
  listDot: {width: 7, height: 7, borderRadius: 4, backgroundColor: '#666', marginRight: 10},
  listDotActive: {backgroundColor: '#D4A017'},
  listTextContainer: {flex: 1},
  listName: {fontSize: normalize(isSmallScreen ? 13 : 15), fontWeight: '600', color: '#FFF'},
  listCategory: {fontSize: normalize(isSmallScreen ? 10 : 12), color: '#888', marginTop: 1},
});

export default MapScreen;
