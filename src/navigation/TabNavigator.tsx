import React from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {normalize, isSmallScreen} from '../utils/responsive';
import HomeScreen from '../screens/HomeScreen';
import SavedScreen from '../screens/SavedScreen';
import MapScreen from '../screens/MapScreen';
import TipsScreen from '../screens/TipsScreen';
import QuizScreen from '../screens/QuizScreen';

const Tab = createBottomTabNavigator();

const TabIcon = ({name, focused}: {name: string; focused: boolean}) => {
  const icons: Record<string, string> = {
    Home: '⌂',
    Saved: '☆',
    Map: '◎',
    Tips: '✧',
    Quiz: '♕',
  };

  return (
    <View style={styles.iconContainer}>
      <Text style={[styles.iconEmoji, {color: focused ? '#D4A017' : '#666'}]}>
        {icons[name] || '●'}
      </Text>
    </View>
  );
};

const TabNavigator: React.FC = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon name={route.name} focused={focused} />
          ),
          tabBarActiveTintColor: '#D4A017',
          tabBarInactiveTintColor: '#666',
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
          tabBarItemStyle: styles.tabItem,
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Saved" component={SavedScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Tips" component={TipsScreen} />
        <Tab.Screen name="Quiz" component={QuizScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'android'
      ? (isSmallScreen ? 34 : 44)
      : (isSmallScreen ? 14 : 24),
    left: isSmallScreen ? 12 : 20,
    right: isSmallScreen ? 12 : 20,
    height: isSmallScreen ? 58 : 70,
    backgroundColor: '#1A1A1A',
    borderRadius: isSmallScreen ? 29 : 35,
    borderTopWidth: 0,
    paddingBottom: 0,
    paddingTop: isSmallScreen ? 6 : 10,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  tabLabel: {
    fontSize: normalize(isSmallScreen ? 9 : 11),
    fontWeight: '600',
    marginTop: 2,
  },
  tabItem: {
    paddingVertical: isSmallScreen ? 2 : 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: normalize(isSmallScreen ? 18 : 22),
  },
});

export default TabNavigator;