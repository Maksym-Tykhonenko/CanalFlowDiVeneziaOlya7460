export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'When is the best time to visit canals for fewer crowds?',
    options: ['Midday', 'Late afternoon', 'Early morning', 'Noon'],
    correctIndex: 2,
  },
  {
    id: 2,
    question: 'What transport is commonly used along the Grand Canal?',
    options: ['Metro', 'Vaporetto', 'Tram', 'Bicycle'],
    correctIndex: 1,
  },
  {
    id: 3,
    question: 'Where should you stand for quick canal views?',
    options: ['Inside shops', 'On bridges', 'In alleys', 'On rooftops'],
    correctIndex: 1,
  },
  {
    id: 4,
    question: 'What should you avoid during peak hours?',
    options: [
      'Walking',
      'Eating',
      'Canal routes with heavy traffic',
      'Taking photos',
    ],
    correctIndex: 2,
  },
  {
    id: 5,
    question: 'What is recommended for walking around Venice?',
    options: ['Formal shoes', 'High heels', 'Comfortable shoes', 'Sandals only'],
    correctIndex: 2,
  },
  {
    id: 6,
    question: 'What side should you keep on narrow bridges?',
    options: ['Left', 'Center', 'Right', 'Any side'],
    correctIndex: 2,
  },
  {
    id: 7,
    question: 'Why should you be careful near canal edges?',
    options: ['Noise', 'Slippery surfaces', 'Traffic lights', 'Wind'],
    correctIndex: 1,
  },
  {
    id: 8,
    question: 'What is a good way to save money on canal transport?',
    options: ['Private boats', 'Taxi', 'Vaporetto', 'Gondola rides'],
    correctIndex: 2,
  },
  {
    id: 9,
    question: 'What helps with navigation in Venice?',
    options: ['Street numbers', 'Landmarks', 'Traffic signs', 'GPS only'],
    correctIndex: 1,
  },
  {
    id: 10,
    question: 'When is the canal atmosphere calmest?',
    options: ['Morning or late evening', 'Midday', 'Afternoon', 'Noon'],
    correctIndex: 0,
  },
  {
    id: 11,
    question: 'What improves canal photography?',
    options: ['Flash', 'Calm water reflections', 'Bright lights', 'Zoom only'],
    correctIndex: 1,
  },
  {
    id: 12,
    question: 'What should you do while taking photos?',
    options: [
      'Block the path',
      'Stand in the center',
      'Keep pathways clear',
      'Sit on bridges',
    ],
    correctIndex: 2,
  },
  {
    id: 13,
    question: 'What is "Acqua Alta"?',
    options: ['A Venetian dish', 'High tides', 'Traditional dance', 'Type of transport'],
    correctIndex: 1,
  },
  {
    id: 14,
    question: 'What should you do when boats pass by?',
    options: ['Leave immediately', 'Be patient', 'Run', 'Turn away'],
    correctIndex: 1,
  },
  {
    id: 15,
    question: 'What is recommended for exploring Venice?',
    options: [
      'Rush quickly',
      'Move slowly and observe',
      'Only follow maps',
      'Stay in one place',
    ],
    correctIndex: 1,
  },
  {
    id: 16,
    question: 'What can help you move efficiently?',
    options: [
      'Avoid planning',
      'Combine walking and water transport',
      'Only walk',
      'Only take boats',
    ],
    correctIndex: 1,
  },
  {
    id: 17,
    question: 'What should you respect in quiet canal areas?',
    options: ['Speed', 'Noise', 'Calm atmosphere', 'Bright lights'],
    correctIndex: 2,
  },
  {
    id: 18,
    question: 'What is useful if internet is unstable?',
    options: ['Social media', 'Offline maps', 'Videos', 'Streaming'],
    correctIndex: 1,
  },
  {
    id: 19,
    question: 'What is a good way to experience Venice?',
    options: [
      'Follow strict routes only',
      'Let the canal guide you',
      'Avoid exploring',
      'Stay inside',
    ],
    correctIndex: 1,
  },
  {
    id: 20,
    question: 'What should you do before starting your route?',
    options: [
      'Ignore everything',
      'Check weather conditions',
      'Walk randomly',
      'Wait for others',
    ],
    correctIndex: 1,
  },
];

export default quizQuestions;
