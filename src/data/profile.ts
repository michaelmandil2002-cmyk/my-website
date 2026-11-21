export interface TimelineItem {
  readonly title: string;
  readonly place: string;
  readonly period: string;
}

export const BIO: readonly string[] = [
  'A UX / UI & graphic designer who loves art, traveling the world, and meeting new people.',
  'When I’m not creating digital art, I’m putting art on people’s bodies as a tattoo artist. I also enjoy sculpting in clay and have a deep love for animals :)',
];

export const EXPERIENCE: readonly TimelineItem[] = [
  { title: 'Graphic Designer', place: 'Super Play · Disney Solitaire', period: '2025 — Present' },
  { title: 'Social Media Manager', place: 'Liat Raz’s Flamenco Studio', period: '2023 — Present' },
  { title: 'Tattoo Artist', place: 'Self-employed · @mink.tatts', period: '2022 — Present' },
  {
    title: 'Freelance Graphic Designer & Artist',
    place: 'Digital art, clay art and paintings',
    period: '2020 — Present',
  },
  {
    title: 'Combat Supporter',
    place: 'Oz Brigade, Special Operations Department',
    period: '2021',
  },
];

export const EDUCATION: readonly TimelineItem[] = [
  { title: 'Graphic Design, UX / UI', place: 'The Open University', period: '2022 — 2024' },
  { title: 'Visual Arts Masterclass', place: 'Teo Cultural Center', period: '2022' },
  {
    title: 'Economics, Business Administration & English',
    place: 'Harishonim High School, Herzliya',
    period: '2017 — 2020',
  },
];

export const SKILLS: readonly string[] = [
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Figma',
  'After Effects',
  'Illustration',
  'Typography',
  'UX / UI',
  'Social Media',
];

export const LANGUAGES: readonly string[] = ['English', 'Hebrew'];
