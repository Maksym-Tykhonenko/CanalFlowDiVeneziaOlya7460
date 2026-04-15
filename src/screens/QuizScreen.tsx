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
import quizQuestions from '../data/quiz';
import {normalize, isSmallScreen} from '../utils/responsive';

const TOTAL_QUESTIONS = 10;

const QuizScreen: React.FC = () => {
  const [questions] = useState(() =>
    [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, TOTAL_QUESTIONS),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = questions[currentIndex];


  const questionY = useRef(new Animated.Value(40)).current;
  const questionOpacity = useRef(new Animated.Value(0)).current;
  const optionAnims = useRef(
    current.options.map(() => ({
      translateX: new Animated.Value(60),
      opacity: new Animated.Value(0),
    })),
  ).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerY = useRef(new Animated.Value(-20)).current;

  const trophyScale = useRef(new Animated.Value(0)).current;
  const finishOpacity = useRef(new Animated.Value(0)).current;
  const finishY = useRef(new Animated.Value(30)).current;

  const animateQuestion = () => {
    questionY.setValue(40);
    questionOpacity.setValue(0);
    optionAnims.forEach(a => {
      a.translateX.setValue(60);
      a.opacity.setValue(0);
    });

    Animated.parallel([
      Animated.timing(questionY, {toValue: 0, duration: 400, useNativeDriver: true, easing: Easing.out(Easing.cubic)}),
      Animated.timing(questionOpacity, {toValue: 1, duration: 400, useNativeDriver: true}),
    ]).start();

    optionAnims.forEach((a, i) => {
      Animated.parallel([
        Animated.timing(a.translateX, {toValue: 0, duration: 350, delay: 150 + i * 80, useNativeDriver: true, easing: Easing.out(Easing.cubic)}),
        Animated.timing(a.opacity, {toValue: 1, duration: 350, delay: 150 + i * 80, useNativeDriver: true}),
      ]).start();
    });
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, {toValue: 1, duration: 500, useNativeDriver: true}),
      Animated.timing(headerY, {toValue: 0, duration: 500, useNativeDriver: true, easing: Easing.out(Easing.cubic)}),
    ]).start();
    animateQuestion();
  }, []);

  const selectAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === current.correctIndex) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeout(animateQuestion, 50);
    } else {
      setFinished(true);
      trophyScale.setValue(0);
      finishOpacity.setValue(0);
      finishY.setValue(30);
      Animated.stagger(200, [
        Animated.spring(trophyScale, {toValue: 1, friction: 4, useNativeDriver: true}),
        Animated.parallel([
          Animated.timing(finishOpacity, {toValue: 1, duration: 500, useNativeDriver: true}),
          Animated.timing(finishY, {toValue: 0, duration: 500, useNativeDriver: true, easing: Easing.out(Easing.cubic)}),
        ]),
      ]).start();
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setFinished(false);
    setTimeout(animateQuestion, 50);
  };

  const getResultMessage = () => {
    if (score >= 9) return 'Venice expert! 🏆';
    if (score >= 7) return 'Great knowledge! 🌟';
    if (score >= 5) return 'Good start! 👍';
    return 'Worth learning more about Venice! 🎓';
  };

  const progress = (currentIndex + 1) / TOTAL_QUESTIONS;

  if (finished) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
        <View style={styles.finishContainer}>
          <Animated.View style={[styles.trophyContainer, {transform: [{scale: trophyScale}]}]}>
            <Text style={styles.trophy}>🏆</Text>
          </Animated.View>
          <Animated.View style={{opacity: finishOpacity, transform: [{translateY: finishY}], alignItems: 'center'}}>
            <Text style={styles.finishTitle}>Quiz Complete!</Text>
            <Text style={styles.finishScore}>Your score: {score} out of {TOTAL_QUESTIONS}</Text>
            <Text style={styles.finishMessage}>{getResultMessage()}</Text>
            <TouchableOpacity style={styles.restartButton} onPress={restart}>
              <Text style={styles.restartIcon}>↻</Text>
              <Text style={styles.restartText}>Take Again</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.header, {opacity: headerOpacity, transform: [{translateY: headerY}]}]}>
          <View>
            <Text style={styles.title}>Quiz</Text>
            <Text style={styles.subtitle}>Question {currentIndex + 1} of {TOTAL_QUESTIONS}</Text>
          </View>
          <View style={styles.scoreBadge}>
            <Text style={styles.scoreText}>Score: {score}</Text>
          </View>
        </Animated.View>

        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressFill, {width: `${progress * 100}%`}]} />
        </View>

        <Animated.View style={[styles.questionCard, {opacity: questionOpacity, transform: [{translateY: questionY}]}]}>
          <Text style={styles.questionText}>{current.question}</Text>
        </Animated.View>

        {current.options.map((option, index) => {
          let optionStyle = styles.optionDefault;
          let textStyle = styles.optionTextDefault;
          let icon = null;

          if (showResult) {
            if (index === current.correctIndex) {
              optionStyle = styles.optionCorrect;
              textStyle = styles.optionTextCorrect;
              icon = <Text style={styles.optionIcon}>✓</Text>;
            } else if (index === selectedAnswer && index !== current.correctIndex) {
              optionStyle = styles.optionWrong;
              textStyle = styles.optionTextWrong;
              icon = <Text style={styles.optionIconWrong}>✗</Text>;
            }
          }

          const anim = optionAnims[index];
          return (
            <Animated.View key={index} style={{opacity: anim?.opacity || 1, transform: [{translateX: anim?.translateX || 0}]}}>
              <TouchableOpacity
                style={[styles.option, optionStyle]}
                activeOpacity={0.8}
                onPress={() => selectAnswer(index)}>
                <Text style={[styles.optionText, textStyle]}>{option}</Text>
                {icon}
              </TouchableOpacity>
            </Animated.View>
          );
        })}

        <TouchableOpacity
          style={[styles.nextButton, !showResult && styles.nextButtonDisabled]}
          disabled={!showResult}
          onPress={nextQuestion}>
          <Text style={styles.nextButtonText}>
            {currentIndex < TOTAL_QUESTIONS - 1 ? 'Next Question' : 'See Results'}
          </Text>
        </TouchableOpacity>

        <View style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <Text style={styles.tipIconText}>🏆</Text>
            <Text style={styles.tipTitle}>Tip</Text>
          </View>
          <Text style={styles.tipText}>
            Answer calmly and read questions carefully. All answers are based on tips and information about Venice.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0A0A0A'},
  scrollContent: {paddingHorizontal: normalize(18), paddingTop: isSmallScreen ? 44 : 60, paddingBottom: 120},
  header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: normalize(10)},
  title: {fontSize: normalize(isSmallScreen ? 24 : 28), fontWeight: '800', fontStyle: 'italic', color: '#D4A017'},
  subtitle: {fontSize: normalize(isSmallScreen ? 12 : 14), color: '#888', marginTop: 2},
  scoreBadge: {backgroundColor: '#1A1A1A', paddingHorizontal: normalize(12), paddingVertical: normalize(6), borderRadius: 14, borderWidth: 1, borderColor: '#D4A017'},
  scoreText: {fontSize: normalize(isSmallScreen ? 11 : 13), fontWeight: '700', color: '#D4A017'},
  progressBar: {height: 4, backgroundColor: '#2A2A2A', borderRadius: 2, marginBottom: normalize(16)},
  progressFill: {height: 4, backgroundColor: '#D4A017', borderRadius: 2},
  questionCard: {backgroundColor: '#1A1A1A', borderRadius: normalize(12), padding: normalize(isSmallScreen ? 16 : 20), marginBottom: normalize(14), borderWidth: 1, borderColor: '#2A2A2A'},
  questionText: {fontSize: normalize(isSmallScreen ? 15 : 18), fontWeight: '700', color: '#FFF', lineHeight: normalize(isSmallScreen ? 22 : 26)},
  option: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: normalize(isSmallScreen ? 13 : 16), borderRadius: normalize(10), marginBottom: 7},
  optionDefault: {backgroundColor: '#1A1A1A', borderWidth: 1, borderColor: '#2A2A2A'},
  optionCorrect: {backgroundColor: 'rgba(46,125,50,0.2)', borderWidth: 2, borderColor: '#2E7D32'},
  optionWrong: {backgroundColor: 'rgba(198,40,40,0.2)', borderWidth: 2, borderColor: '#C62828'},
  optionText: {fontSize: normalize(isSmallScreen ? 13 : 15), flex: 1},
  optionTextDefault: {color: '#FFF'},
  optionTextCorrect: {color: '#4CAF50', fontWeight: '700'},
  optionTextWrong: {color: '#EF5350', fontWeight: '700'},
  optionIcon: {fontSize: normalize(16), color: '#4CAF50', fontWeight: '700', marginLeft: 8, width: normalize(22), height: normalize(22), textAlign: 'center', lineHeight: normalize(22), borderRadius: normalize(11), borderWidth: 2, borderColor: '#4CAF50', overflow: 'hidden'},
  optionIconWrong: {fontSize: normalize(16), color: '#EF5350', fontWeight: '700', marginLeft: 8, width: normalize(22), height: normalize(22), textAlign: 'center', lineHeight: normalize(22), borderRadius: normalize(11), borderWidth: 2, borderColor: '#EF5350', overflow: 'hidden'},
  nextButton: {backgroundColor: '#D4A017', paddingVertical: normalize(isSmallScreen ? 13 : 16), borderRadius: 14, alignItems: 'center', marginTop: 6, marginBottom: normalize(16)},
  nextButtonDisabled: {opacity: 0.4},
  nextButtonText: {fontSize: normalize(isSmallScreen ? 14 : 16), fontWeight: '700', color: '#1A1A1A'},
  tipCard: {backgroundColor: '#1A1A1A', borderRadius: normalize(12), padding: normalize(14), borderWidth: 1, borderColor: '#2A2A2A'},
  tipHeader: {flexDirection: 'row', alignItems: 'center', marginBottom: 6},
  tipIconText: {fontSize: normalize(16), marginRight: 7},
  tipTitle: {fontSize: normalize(isSmallScreen ? 14 : 16), fontWeight: '700', color: '#D4A017'},
  tipText: {fontSize: normalize(isSmallScreen ? 11 : 13), color: '#AAA', lineHeight: normalize(isSmallScreen ? 17 : 20)},
  finishContainer: {flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: normalize(36)},
  trophyContainer: {width: normalize(isSmallScreen ? 80 : 100), height: normalize(isSmallScreen ? 80 : 100), borderRadius: normalize(50), backgroundColor: '#1A1A1A', borderWidth: 3, borderColor: '#D4A017', justifyContent: 'center', alignItems: 'center', marginBottom: normalize(20)},
  trophy: {fontSize: normalize(isSmallScreen ? 36 : 44)},
  finishTitle: {fontSize: normalize(isSmallScreen ? 26 : 32), fontWeight: '800', fontStyle: 'italic', color: '#D4A017', marginBottom: 10},
  finishScore: {fontSize: normalize(isSmallScreen ? 16 : 18), color: '#FFF', marginBottom: 6},
  finishMessage: {fontSize: normalize(isSmallScreen ? 14 : 16), color: '#AAA', marginBottom: normalize(32), textAlign: 'center'},
  restartButton: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1A1A1A', borderWidth: 2, borderColor: '#D4A017', paddingVertical: normalize(isSmallScreen ? 13 : 16), paddingHorizontal: normalize(isSmallScreen ? 36 : 50), borderRadius: 14},
  restartIcon: {fontSize: normalize(16), color: '#D4A017', marginRight: 8},
  restartText: {fontSize: normalize(isSmallScreen ? 14 : 16), fontWeight: '700', color: '#D4A017'},
});

export default QuizScreen;
