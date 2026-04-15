export type Tip = {
  id: string;
  title: string;
  category: string;
  icon: string;
  content: string;
};

const tips: Tip[] = [
  {
    id: '1',
    title: 'Best Time to Visit',
    category: 'Planning',
    icon: '❄️',
    content:
      'Visit early in the morning for fewer crowds. Late evening offers softer light and calmer canals. Avoid peak midday hours if possible.',
  },
  {
    id: '2',
    title: 'Gondolas: How to Save',
    category: 'Transport',
    icon: '🚣',
    content:
      'Official gondola price is €80-100 for 30 minutes. Share the cost with other tourists (up to 6 people). Or use Traghetto - public gondola for €2.',
  },
  {
    id: '3',
    title: 'Vaporetto - Water Transport',
    category: 'Transport',
    icon: '🚢',
    content:
      'Use vaporetto instead of private boats to save money. Buy tickets in advance to avoid queues. Sit on the outside seats for better visibility. Check routes before boarding.',
  },
  {
    id: '4',
    title: 'Get Lost on Purpose',
    category: 'Exploration',
    icon: '🗺️',
    content:
      'Explore side canals for a quieter atmosphere. Use landmarks instead of street names for navigation. Give yourself time to explore without a plan. Let the canal guide your direction.',
  },
  {
    id: '5',
    title: 'Acqua Alta - High Tides',
    category: 'Safety',
    icon: '🌊',
    content:
      'Be mindful of rising water levels. Check weather before planning routes. Watch your step — surfaces can be slippery. Wear comfortable shoes for walking between canals.',
  },
  {
    id: '6',
    title: 'Eat Like a Local',
    category: 'Food',
    icon: '🍽️',
    content:
      'Avoid restaurants directly on St. Mark\'s Square — prices are inflated. Look for "bacari" — local wine bars with small plates called "cicchetti". Try fresh seafood from Rialto Market area.',
  },
  {
    id: '7',
    title: 'Photography Tips',
    category: 'Photography',
    icon: '📸',
    content:
      'Bridges are often the best photo spots. Use natural light instead of flash. Reflections look best in calm water. Overcast weather creates softer tones. Sunset offers warm highlights on buildings.',
  },
  {
    id: '8',
    title: 'Canal Etiquette',
    category: 'Culture',
    icon: '🎭',
    content:
      'Stay to the right on narrow bridges. Keep pathways clear for others. Avoid loud behavior in quiet areas. Respect the pace of the city. Respect private property along canals.',
  },
  {
    id: '9',
    title: 'Practical Essentials',
    category: 'Planning',
    icon: '🎒',
    content:
      'Stay hydrated, especially in warm weather. Bring a small bag for essentials only. Travel light — space is limited in transport. Use offline maps if internet is unstable. Save locations in advance for quick access.',
  },
  {
    id: '10',
    title: 'Observation Skills',
    category: 'Exploration',
    icon: '👁️',
    content:
      'Look up — many details are above eye level. Listen to the sounds of water movement. Notice how buildings interact with water. Look for small docks and entrances. Pay attention to textures of walls and facades.',
  },
];

export default tips;
