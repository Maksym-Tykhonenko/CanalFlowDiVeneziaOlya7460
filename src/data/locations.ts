import {ImageSourcePropType} from 'react-native';

export type Location = {
  id: string;
  name: string;
  category: string;
  categoryGroup: string;
  description: string;
  fullInfo: string;
  bestTime: string;
  tips: string;
  latitude: number;
  longitude: number;
  rating: number;
  image: ImageSourcePropType;
};

const locations: Location[] = [

  {
    id: '1',
    name: 'Rialto Bridge',
    category: 'Bridges',
    categoryGroup: 'Primary Flow',
    description:
      'One of the most recognizable crossings over the Grand Canal, offering wide views of the water traffic and surrounding architecture. A central point where movement and perspective meet.',
    fullInfo:
      'Built in 1591, the Rialto Bridge is the oldest of the four bridges spanning the Grand Canal. Designed by Antonio da Ponte, it replaced a wooden bridge that collapsed in 1524. The bridge features shops on both sides and offers one of the most photographed views in Venice.',
    bestTime: 'Early morning or sunset for golden light and fewer crowds',
    tips: 'Visit the fish market nearby before 12pm. Stand in the center for the best canal panorama.',
    latitude: 45.438,
    longitude: 12.3359,
    rating: 4.8,
    image: require('../assets/image/rialto_bridge.png'),
  },
  {
    id: '2',
    name: "Ca' d'Oro",
    category: 'Historic Sites',
    categoryGroup: 'Primary Flow',
    description:
      'A refined example of Venetian Gothic architecture positioned directly on the canal. Its facade reflects the layered design traditions of the city.',
    fullInfo:
      'Known as the "Golden House" for its original gilded exterior, Ca\' d\'Oro was built between 1428-1430. Now the Galleria Giorgio Franchetti, it houses Renaissance art including works by Mantegna and Titian. The ornate facade with its tracery and marble is among the finest in Venice.',
    bestTime: 'Morning light illuminates the facade beautifully',
    tips: 'Take the traghetto across to see the facade from the water. The museum inside is worth the visit.',
    latitude: 45.4403,
    longitude: 12.3362,
    rating: 4.7,
    image: require('../assets/image/ca_doro.png'),
  },
  {
    id: '3',
    name: 'Palazzo Barbaro',
    category: 'Historic Sites',
    categoryGroup: 'Primary Flow',
    description:
      'A historic residence complex known for its artistic and cultural associations. Its position along the canal creates a strong visual presence.',
    fullInfo:
      'Two adjoining palaces dating from the 15th and 17th centuries. Once the salon of high society, hosting Henry James, Claude Monet, John Singer Sargent, and Robert Browning. The interior features ceiling paintings by Giambattista Tiepolo.',
    bestTime: 'Afternoon when the sunlight hits the facade',
    tips: 'Best viewed from the Accademia Bridge or a passing vaporetto. Look for the distinctive double facade.',
    latitude: 45.4337,
    longitude: 12.3329,
    rating: 4.5,
    image: require('../assets/image/palazzo_barbaro.png'),
  },
  {
    id: '4',
    name: 'Santa Maria della Salute',
    category: 'Historic Sites',
    categoryGroup: 'Primary Flow',
    description:
      'A monumental structure at the entrance of the Grand Canal. Its dome defines the skyline and acts as a visual anchor from multiple viewpoints.',
    fullInfo:
      'Built in 1631-1687 as a votive church after the plague. Designed by Baldassare Longhena in Baroque style, it features an octagonal plan with a massive dome visible from across the lagoon. Contains works by Titian and Tintoretto.',
    bestTime: 'Sunset creates a stunning silhouette; the Festa della Salute on November 21st is magical',
    tips: 'Free entry to the main church. The sacristy with Titian paintings has a small fee. Great photo spot from across the canal at San Marco.',
    latitude: 45.4306,
    longitude: 12.3347,
    rating: 4.6,
    image: require('../assets/image/santa_maria_della_salute.png'),
  },
  {
    id: '5',
    name: 'Accademia Bridge',
    category: 'Bridges',
    categoryGroup: 'Primary Flow',
    description:
      'A wooden bridge providing one of the most balanced panoramic views of the Grand Canal, often used as a visual reference point.',
    fullInfo:
      'Originally built as a temporary steel structure in 1933, it was replaced with the current wooden bridge in 1985. Despite debates about replacing it with stone, the wooden design has become beloved. It connects San Marco to Dorsoduro near the Gallerie dell\'Accademia.',
    bestTime: 'Sunrise and sunset are equally spectacular from here',
    tips: 'One of the few places where you can see both the Salute church and the Rialto Bridge. Lock your phone tightly — the railing is low!',
    latitude: 45.4318,
    longitude: 12.3325,
    rating: 4.7,
    image: require('../assets/image/accademia_bridge.png'),
  },

  {
    id: '6',
    name: 'Rio della Toletta',
    category: 'Canals',
    categoryGroup: 'Soft Drift',
    description:
      'A quieter canal branching away from the main flow, offering a slower atmosphere and softer reflections of nearby buildings.',
    fullInfo:
      'This canal runs through the heart of Dorsoduro, one of Venice\'s most charming neighborhoods. The name "Toletta" comes from the wooden boards that once covered the canal. The surrounding area is filled with artisan workshops and local bakeries.',
    bestTime: 'Late afternoon for soft reflections on the water',
    tips: 'Walk along the fondamenta for a peaceful stroll. Several excellent local restaurants are hidden nearby.',
    latitude: 45.4327,
    longitude: 12.3259,
    rating: 4.3,
    image: require('../assets/image/rio_della_toletta.png'),
  },
  {
    id: '7',
    name: 'Rio di San Barnaba',
    category: 'Canals',
    categoryGroup: 'Soft Drift',
    description:
      'A calm waterway surrounded by residential architecture, known for its relaxed pace and open space.',
    fullInfo:
      'Famous for its floating vegetable barge — one of the last in Venice. The area around Campo San Barnaba was featured in the Indiana Jones film "The Last Crusade." A genuine neighborhood feel with local shops and the beautiful 18th-century church.',
    bestTime: 'Morning to see the vegetable barge in action',
    tips: 'Look for the barge selling fresh produce near the bridge. The campo is perfect for a quiet coffee break.',
    latitude: 45.4324,
    longitude: 12.3275,
    rating: 4.4,
    image: require('../assets/image/rio_di_san_barnaba.png'),
  },
  {
    id: '8',
    name: 'Rio dei Ognissanti',
    category: 'Canals',
    categoryGroup: 'Soft Drift',
    description:
      'A narrow canal with minimal traffic, creating a more intimate environment away from the central routes.',
    fullInfo:
      'Located in the Dorsoduro district near the Zattere waterfront. The canal runs past the Church of Ognissanti (All Saints). This area offers authentic Venetian life away from tourist crowds, with laundry hanging over the canal and residents going about daily routines.',
    bestTime: 'Any time — it\'s always quiet here',
    tips: 'Combine with a walk along the Zattere for gelato with a lagoon view.',
    latitude: 45.4362,
    longitude: 12.3198,
    rating: 4.2,
    image: require('../assets/image/rio_dei_ognissanti.png'),
  },
  {
    id: '9',
    name: 'Rio di San Trovaso',
    category: 'Canals',
    categoryGroup: 'Soft Drift',
    description:
      'Located near traditional boat workshops, this canal blends quiet surroundings with subtle local activity.',
    fullInfo:
      'Home to the Squero di San Trovaso, one of the few remaining gondola workshops in Venice. You can often see craftsmen working on gondolas in the open yard. The squero has been active since the 17th century and looks like an alpine chalet — unusual for Venice.',
    bestTime: 'Weekday mornings to see gondola builders at work',
    tips: 'View the squero from across the canal — it\'s a private workshop. The nearby bar has excellent spritz.',
    latitude: 45.4312,
    longitude: 12.3271,
    rating: 4.5,
    image: require('../assets/image/rio_di_san_trovaso.png'),
  },
  {
    id: '10',
    name: 'Rio della Misericordia',
    category: 'Canals',
    categoryGroup: 'Soft Drift',
    description:
      'A wider canal with a calm, open feel, offering a different spatial experience compared to the Grand Canal.',
    fullInfo:
      'One of the widest canals in Cannaregio, it has become a favorite evening hangout for young Venetians. The fondamenta is lined with bars and restaurants that spill out onto the waterside. By day it\'s peaceful; by night it\'s the social heart of local Venice.',
    bestTime: 'Evening for aperitivo atmosphere along the fondamenta',
    tips: 'Perfect for an evening passeggiata. Try the local bars for authentic Venetian aperitivo culture.',
    latitude: 45.444,
    longitude: 12.333,
    rating: 4.6,
    image: require('../assets/image/rio_della_misericordia.png'),
  },

  {
    id: '11',
    name: 'Punta della Dogana',
    category: 'Viewpoints',
    categoryGroup: 'Open Views',
    description:
      'A triangular point where the Grand Canal meets the lagoon, offering expansive and uninterrupted views in multiple directions.',
    fullInfo:
      'The former customs house at the tip of Dorsoduro, now a contemporary art museum by Francois Pinault. The triangular point offers 180-degree views spanning San Marco, San Giorgio Maggiore, and the Giudecca. The golden globe sculpture on the tower is an iconic landmark.',
    bestTime: 'Sunset — the golden light across the basin is unforgettable',
    tips: 'Free to walk around the point. The art museum requires a ticket but is world-class.',
    latitude: 45.4295,
    longitude: 12.3348,
    rating: 4.8,
    image: require('../assets/image/punta_della_dogana.png'),
  },
  {
    id: '12',
    name: 'Scalzi Bridge',
    category: 'Bridges',
    categoryGroup: 'Open Views',
    description:
      'A stone bridge near the railway station that provides a broad perspective of the canal\'s northern section.',
    fullInfo:
      'Built in 1934 from Istrian stone, replacing an earlier iron Austrian bridge. Located right at the Santa Lucia train station, it\'s often the first Grand Canal view for visitors arriving by train. The bridge offers views towards the church of San Simeone Piccolo with its distinctive green dome.',
    bestTime: 'Morning when arriving by train — your first Venice moment',
    tips: 'Great first-impression spot. From here you can take Vaporetto Line 1 down the entire Grand Canal.',
    latitude: 45.441,
    longitude: 12.321,
    rating: 4.4,
    image: require('../assets/image/scalzi_bridge.png'),
  },
  {
    id: '13',
    name: 'Peggy Guggenheim Terrace',
    category: 'Viewpoints',
    categoryGroup: 'Open Views',
    description:
      'An open terrace facing the canal, combining artistic context with a clear visual connection to the water.',
    fullInfo:
      'The canal-side terrace of the Peggy Guggenheim Collection, housed in the unfinished Palazzo Venier dei Leoni. Peggy Guggenheim lived here from 1949 until her death in 1979. The terrace features Marino Marini\'s famous "Angel of the City" sculpture facing the Grand Canal.',
    bestTime: 'Afternoon with museum visit, terrace has wonderful light',
    tips: 'Museum ticket includes terrace access. Don\'t miss the sculpture garden behind the palazzo.',
    latitude: 45.4305,
    longitude: 12.3326,
    rating: 4.7,
    image: require('../assets/image/peggy_guggenheim.png'),
  },
  {
    id: '14',
    name: 'Palazzo Grassi Viewpoint',
    category: 'Viewpoints',
    categoryGroup: 'Open Views',
    description:
      'A location along the canal with a wide frontal view, allowing observation of passing boats and architectural alignment.',
    fullInfo:
      'An 18th-century neoclassical palace, now the second venue of the Pinault Collection. The wide campo in front provides an open perspective of the Grand Canal bend. Designed by Giorgio Massari, it was the last great palazzo built on the Grand Canal before the fall of the Republic.',
    bestTime: 'Late afternoon when the facade catches warm light',
    tips: 'The campo is a great spot to sit and watch boat traffic. Combined ticket available with Punta della Dogana.',
    latitude: 45.4333,
    longitude: 12.3322,
    rating: 4.5,
    image: require('../assets/image/palazzo_grassi.png'),
  },
  {
    id: '15',
    name: 'San Toma Stop Area',
    category: 'Viewpoints',
    categoryGroup: 'Open Views',
    description:
      'A vaporetto stop area that naturally opens up the view of the canal, offering a practical yet scenic perspective.',
    fullInfo:
      'A vaporetto landing that opens onto a wide stretch of the Grand Canal. The area around San Toma includes the Frari church (one of Venice\'s largest) and the Scuola Grande di San Rocco with its cycle of Tintoretto paintings, often called the "Venetian Sistine Chapel."',
    bestTime: 'Any time — the vaporetto stop gives you a natural pause to observe',
    tips: 'Don\'t just pass through — the Frari church and San Rocco nearby are absolute must-sees.',
    latitude: 45.437,
    longitude: 12.3333,
    rating: 4.3,
    image: require('../assets/image/san_toma_stop.png'),
  },

  {
    id: '16',
    name: 'Gondola Station Bacino Orseolo',
    category: 'Transport',
    categoryGroup: 'Living Water',
    description:
      'A compact gondola docking area where multiple boats gather, showing the rhythm and coordination of water transport.',
    fullInfo:
      'Hidden just behind St. Mark\'s Square, this small basin is the largest gondola station in Venice. Dozens of gondolas dock here in orderly rows, creating a mesmerizing visual pattern. It\'s where gondoliers wait for passengers and where you can negotiate rides.',
    bestTime: 'Morning when gondoliers are polishing and preparing their boats',
    tips: 'Negotiate the price before boarding. Standard rate is around \u20AC80 for 30 minutes. Sharing with others reduces cost.',
    latitude: 45.4342,
    longitude: 12.3359,
    rating: 4.6,
    image: require('../assets/image/gondola_station.png'),
  },
  {
    id: '17',
    name: 'Vaporetto Line 1 Route',
    category: 'Transport',
    categoryGroup: 'Living Water',
    description:
      'The main public transport line that travels the entire Grand Canal, offering a continuous moving view of the city.',
    fullInfo:
      'Line 1 is the slow boat that stops at every station along the Grand Canal, from Piazzale Roma to the Lido. It\'s effectively the cheapest and most comprehensive canal tour available. The 45-minute journey passes all major palazzi, bridges, and landmarks.',
    bestTime: 'Late afternoon for golden hour light on the palaces',
    tips: 'Sit at the back of the boat for the best views. A single ticket costs \u20AC9.50, but a 24-hour pass (\u20AC25) is better value.',
    latitude: 45.4408,
    longitude: 12.3155,
    rating: 4.9,
    image: require('../assets/image/vaporetto_line1.png'),
  },
  {
    id: '18',
    name: 'Traghetto Crossing Santa Sofia',
    category: 'Transport',
    categoryGroup: 'Living Water',
    description:
      'A simple crossing point where gondolas function as ferries, connecting both sides of the canal efficiently.',
    fullInfo:
      'One of the few remaining traghetto crossings on the Grand Canal. For just \u20AC2, you can stand in a gondola as it ferries you across the canal — a uniquely Venetian experience. Locals stand while tourists usually sit. Connects the Rialto Market area to Ca\' d\'Oro.',
    bestTime: 'Morning during market hours for the most authentic atmosphere',
    tips: 'Stand like a local if you dare! Hold the gondola\'s sides and keep your balance. It\'s a 2-minute crossing.',
    latitude: 45.4402,
    longitude: 12.336,
    rating: 4.4,
    image: require('../assets/image/traghetto_santa_sofia.png'),
  },
  {
    id: '19',
    name: 'San Marco Basin Edge',
    category: 'Viewpoints',
    categoryGroup: 'Living Water',
    description:
      'A wide water area near St. Mark\'s Square where canal traffic transitions into open lagoon movement.',
    fullInfo:
      'The grand water entrance to Venice, where the Grand Canal empties into the St. Mark\'s Basin. This is where you see the iconic view of San Giorgio Maggiore island across the water. Cruise ships, water taxis, gondolas, and vaporetti all converge in this dramatic open space.',
    bestTime: 'Dawn for the famous pink light, or dusk for city lights reflecting on the water',
    tips: 'Walk along the Riva degli Schiavoni for the full panorama. The waterfront cafes are pricey but the view is priceless.',
    latitude: 45.434,
    longitude: 12.3388,
    rating: 4.8,
    image: require('../assets/image/san_marco_basin.png'),
  },
  {
    id: '20',
    name: 'Rialto Market Canal Side',
    category: 'Markets',
    categoryGroup: 'Living Water',
    description:
      'A dynamic edge of the canal where local activity meets water transport, combining commerce and movement.',
    fullInfo:
      'The Rialto Market has operated in this location for over 1,000 years. The fish market (Pescheria) and produce market (Erberia) are supplied by boats that dock directly at the canal edge. It\'s one of the few places where you see Venice\'s commercial waterway tradition still alive.',
    bestTime: 'Tuesday through Saturday, 7:30-12:00 for the active market',
    tips: 'The fish market is closed on Sundays and Mondays. Try the cicchetti bars along the Ruga Rialto after shopping.',
    latitude: 45.4382,
    longitude: 12.3367,
    rating: 4.5,
    image: require('../assets/image/rialto_market.png'),
  },
];

export default locations;
