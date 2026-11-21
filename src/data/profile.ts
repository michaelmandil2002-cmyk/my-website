export const BIO: readonly string[] = [
  'A graphic designer who loves art, travel and meeting new people. I’m also a tattoo artist, a clay sculptor and a big animal lover :)',
];

export interface CareerItem {
  readonly role: string;
  readonly place: string;
  readonly details?: readonly string[];
  readonly period: string;
}

/** Work experience, newest first. */
export const CAREER: readonly CareerItem[] = [
  {
    role: 'Monetization & Social Artist',
    place: 'Superplay · Disney Solitaire',
    details: [
      'Sole artist behind the game’s social media, with over 700K followers',
      'Monetization art and in-game visuals for live events and offers',
    ],
    period: '2025 — Present',
  },
  {
    role: 'Content & AI Marketing Strategist',
    place: 'Singular One',
    details: [
      'Planned and optimized multilingual ad campaigns across Facebook, Google, Taboola and Outbrain',
      '14.8M+ sessions, $25K/month profit and 114% average ROI, with AI-made creatives',
    ],
    period: '2024 — 2025',
  },
  {
    role: 'Social Media Manager & Graphic Designer',
    place: 'Liat Raz’s Flamenco Studio',
    details: ['Created, designed and marketed Facebook and Instagram content to grow engagement'],
    period: '2023',
  },
  { role: 'Tattoo Artist', place: 'Self-employed', period: '2022 — Present' },
  {
    role: 'Freelance Graphic Designer & Artist',
    place: 'Digital art, clay art and paintings',
    period: '2020 — 2024',
  },
];
