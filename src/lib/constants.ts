/*
 * This file holds unchanging themes throught
 * the app
 * */

export const THEMES = {
  mercy: {
    id: 'mercy',
    name: 'Divine Mercy',
    description: 'Verces about Allah\'s compassion and forgiveness',
    color: 'bg-blue-500',
    keywords: ['mercy', 'compassion', 'forgiveness', 'rahman', 'raheem'],
  },
  patience: {
    id: 'patience',
    name: 'Patience & Perseverance',
    description: 'Guidance on patience during trials',
    color: 'bg-green-500',
    keywords: ['patience', 'perseverance', 'sabr', 'endurance']
  },
} as const;
