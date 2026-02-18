
type Experience = {
  title: string
  image: string
  location: string
  duration: string
  difficulty: 'Easy' | 'Moderate' | 'Scenic' | 'Heritage'
  short: string
  overview: string
  highlights: string[]
  bestTime: string
  distance: string
  tip: string
}

export const experiences: Experience[] = [
  {
    title: 'Great Himalayan National Park (GHNP)',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80',
    location: 'Tirthan Valley',
    duration: 'Full Day / Multi-Day',
    difficulty: 'Moderate',
    short: 'A UNESCO World Heritage Site known for alpine meadows and rare wildlife.',
    overview: 'Explore untouched Himalayan wilderness with guided treks through alpine forests, rivers and high-altitude meadows.',
    highlights: [
      'UNESCO World Heritage Site',
      'Alpine biodiversity',
      'Multi-day trekking options',
      'Wild Himalayan landscapes'
    ],
    bestTime: 'April – June & September – November',
    distance: '15 mins from Cottage',
    tip: 'Hire a certified local guide for deeper trails.'
  },

  {
    title: 'Chhoie Waterfall Trek',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1400&q=80',
    location: 'Near Gushaini',
    duration: '2–3 Hours',
    difficulty: 'Easy',
    short: 'Short forest trek leading to a hidden waterfall.',
    overview: 'A peaceful morning trek through pine forests ending at a scenic waterfall.',
    highlights: [
      'Family-friendly',
      'Forest trail',
      'Waterfall viewpoint'
    ],
    bestTime: 'March – October',
    distance: '10 mins drive',
    tip: 'Best visited early morning.'
  },

  {
    title: 'Jalori Pass',
    image: 'https://images.unsplash.com/photo-1605538883669-825d2d5b1e36?auto=format&fit=crop&w=1400&q=80',
    location: 'Jalori Top',
    duration: 'Half Day',
    difficulty: 'Scenic',
    short: 'High-altitude mountain pass with 360° views.',
    overview: 'Drive up to Jalori Pass and enjoy panoramic Himalayan views and cool mountain air.',
    highlights: [
      'Snow views in winter',
      'Mountain photography',
      'Scenic drive'
    ],
    bestTime: 'May – November',
    distance: '1.5 hrs drive',
    tip: 'Weather changes quickly — carry a jacket.'
  },

  {
    title: 'Serolsar Lake',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    location: 'Near Jalori',
    duration: '3–4 Hour Trek',
    difficulty: 'Moderate',
    short: 'Sacred forest lake accessible via scenic trek.',
    overview: 'A gentle trek from Jalori Pass leads to this peaceful high-altitude lake surrounded by dense forest.',
    highlights: [
      'Sacred lake',
      'Forest trail',
      'Peaceful environment'
    ],
    bestTime: 'May – October',
    distance: '1.5 hrs + 5km trek',
    tip: 'Perfect picnic spot.'
  },

  {
    title: 'Raghupur Fort Trek',
    image: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1400&q=80',
    location: 'Shoja',
    duration: '3–4 Hours',
    difficulty: 'Moderate',
    short: 'Trek to ancient fort ruins with panoramic views.',
    overview: 'A beautiful meadow trek leading to the ruins of Raghupur Fort with breathtaking mountain views.',
    highlights: [
      'Panoramic valley views',
      'Ancient ruins',
      'Meadow landscapes'
    ],
    bestTime: 'April – November',
    distance: '1.5 hrs drive',
    tip: 'Sunset views are magical.'
  },

  {
    title: 'Chehni Kothi',
    image: 'https://images.unsplash.com/photo-1599887268726-41cce9ad03e5?auto=format&fit=crop&w=1400&q=80',
    location: 'Shringa Rishi Temple',
    duration: 'Half Day',
    difficulty: 'Heritage',
    short: 'Ancient 1500-year-old Kath-Kuni tower.',
    overview: 'A remarkable example of traditional Himachali architecture built without cement.',
    highlights: [
      'Ancient architecture',
      'Village culture',
      'Mountain views'
    ],
    bestTime: 'All year',
    distance: '1 hour drive',
    tip: 'Combine with village walk.'
  },

  {
    title: 'Jibhi Waterfall',
    image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1400&q=80',
    location: 'Jibhi',
    duration: '1 Hour',
    difficulty: 'Easy',
    short: 'Hidden waterfall near Jibhi village.',
    overview: 'Short walk from Jibhi market leads to this charming waterfall.',
    highlights: [
      'Short easy walk',
      'Photogenic spot',
      'Relaxed outing'
    ],
    bestTime: 'March – October',
    distance: '30 mins drive',
    tip: 'Great stop after café hopping in Jibhi.'
  },

  {
    title: 'Shangarh Meadows',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80',
    location: 'Sainj Valley',
    duration: 'Half Day',
    difficulty: 'Scenic',
    short: 'Wide open Himalayan meadow with dramatic views.',
    overview: 'A serene meadow perfect for slow walks and mountain photography.',
    highlights: [
      'Wide open landscapes',
      'Peaceful village',
      'Great for families'
    ],
    bestTime: 'April – October',
    distance: '1.5 hrs drive',
    tip: 'Visit early for fewer crowds.'
  }
]
