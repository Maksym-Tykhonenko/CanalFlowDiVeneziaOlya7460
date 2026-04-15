import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  Easing,
} from 'react-native';
import tips from '../data/tips';
import {normalize, isSmallScreen} from '../utils/responsive';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AnimatedTipItem = ({tip, index}: {tip: (typeof tips)[0]; index: number}) => {
  const [expanded, setExpanded] = useState(false);
  const translateX = useRef(new Animated.Value(-50)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0, duration: 400, delay: 100 + index * 70,
        useNativeDriver: true, easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(opacity, {
        toValue: 1, duration: 400, delay: 100 + index * 70, useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.timing(rotateAnim, {
      toValue: expanded ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
    setExpanded(!expanded);
  };

  const arrowRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Animated.View style={{opacity, transform: [{translateX}]}}>
      <TouchableOpacity
        style={[styles.tipCard, expanded && styles.tipCardExpanded]}
        activeOpacity={0.85}
        onPress={toggle}>
        <View style={styles.tipHeader}>
          <View style={styles.tipIconContainer}>
            <Text style={styles.tipIcon}>{tip.icon}</Text>
          </View>
          <View style={styles.tipTitleContainer}>
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipCategory}>{tip.category}</Text>
          </View>
          <Animated.Text style={[styles.tipArrow, {transform: [{rotate: arrowRotate}]}]}>
            ∨
          </Animated.Text>
        </View>
        {expanded && (
          <View style={styles.tipContent}>
            <Text style={styles.tipText}>{tip.content}</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const TipsScreen: React.FC = () => {
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(titleOpacity, {toValue: 1, duration: 500, useNativeDriver: true}),
      Animated.timing(titleY, {toValue: 0, duration: 500, useNativeDriver: true, easing: Easing.out(Easing.cubic)}),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={{opacity: titleOpacity, transform: [{translateY: titleY}]}}>
          <Text style={styles.title}>Travel Tips</Text>
          <Text style={styles.subtitle}>Helpful recommendations for visiting Venice</Text>
        </Animated.View>

        {tips.map((tip, index) => (
          <AnimatedTipItem key={tip.id} tip={tip} index={index} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0A0A0A'},
  scrollContent: {paddingHorizontal: normalize(18), paddingTop: isSmallScreen ? 44 : 60, paddingBottom: 120},
  title: {fontSize: normalize(isSmallScreen ? 24 : 28), fontWeight: '800', fontStyle: 'italic', color: '#D4A017', marginBottom: 4},
  subtitle: {fontSize: normalize(isSmallScreen ? 12 : 14), color: '#888', marginBottom: normalize(20)},
  tipCard: {backgroundColor: '#1A1A1A', borderRadius: normalize(12), marginBottom: 9, borderWidth: 1, borderColor: '#2A2A2A', overflow: 'hidden'},
  tipCardExpanded: {borderColor: '#D4A017'},
  tipHeader: {flexDirection: 'row', alignItems: 'center', padding: normalize(isSmallScreen ? 12 : 16)},
  tipIconContainer: {width: normalize(isSmallScreen ? 38 : 44), height: normalize(isSmallScreen ? 38 : 44), borderRadius: normalize(22), backgroundColor: '#2A2A2A', justifyContent: 'center', alignItems: 'center', marginRight: normalize(12)},
  tipIcon: {fontSize: normalize(isSmallScreen ? 17 : 20)},
  tipTitleContainer: {flex: 1},
  tipTitle: {fontSize: normalize(isSmallScreen ? 14 : 16), fontWeight: '700', color: '#FFF', marginBottom: 2},
  tipCategory: {fontSize: normalize(isSmallScreen ? 10 : 12), color: '#888'},
  tipArrow: {fontSize: normalize(14), color: '#D4A017', fontWeight: '700'},
  tipContent: {paddingHorizontal: normalize(isSmallScreen ? 12 : 16), paddingBottom: normalize(isSmallScreen ? 12 : 16), paddingTop: 2},
  tipText: {fontSize: normalize(isSmallScreen ? 12 : 14), color: '#CCC', lineHeight: normalize(isSmallScreen ? 18 : 22)},
});

export default TipsScreen;
