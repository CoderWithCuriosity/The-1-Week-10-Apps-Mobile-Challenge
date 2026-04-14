export interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
  isFavorite?: boolean;
}

export const categories = [
  { id: "all", name: "All", color: theme.colors.brand.primary },
  { id: "inspiration", name: "Inspiration", color: "#06B6D4" },
  { id: "wisdom", name: "Wisdom", color: "#8B5CF6" },
  { id: "love", name: "Love", color: "#EC4899" },
  { id: "success", name: "Success", color: "#10B981" },
  { id: "life", name: "Life", color: "#F59E0B" },
  { id: "happiness", name: "Happiness", color: "#F97316" },
  { id: "courage", name: "Courage", color: "#EF4444" },
];

export const quotesData: Quote[] = [
  // Inspiration
  {
    id: 1,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "inspiration",
  },
  {
    id: 2,
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "inspiration",
  },
  {
    id: 3,
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "inspiration",
  },
  {
    id: 4,
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
    category: "inspiration",
  },
  {
    id: 5,
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair",
    category: "inspiration",
  },
  
  // Wisdom
  {
    id: 6,
    text: "The only true wisdom is in knowing you know nothing.",
    author: "Socrates",
    category: "wisdom",
  },
  {
    id: 7,
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: "wisdom",
  },
  {
    id: 8,
    text: "The mind is everything. What you think you become.",
    author: "Buddha",
    category: "wisdom",
  },
  {
    id: 9,
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
    category: "wisdom",
  },
  {
    id: 10,
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu",
    category: "wisdom",
  },
  
  // Love
  {
    id: 11,
    text: "Where there is love, there is life.",
    author: "Mahatma Gandhi",
    category: "love",
  },
  {
    id: 12,
    text: "The best thing to hold onto in life is each other.",
    author: "Audrey Hepburn",
    category: "love",
  },
  {
    id: 13,
    text: "Love all, trust a few, do wrong to none.",
    author: "William Shakespeare",
    category: "love",
  },
  {
    id: 14,
    text: "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
    author: "Dr. Seuss",
    category: "love",
  },
  {
    id: 15,
    text: "Love is not about how many days, months, or years you have been together. It is about how much you truly love each other every single day.",
    author: "Unknown",
    category: "love",
  },
  
  // Success
  {
    id: 16,
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "success",
  },
  {
    id: 17,
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
    category: "success",
  },
  {
    id: 18,
    text: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
    category: "success",
  },
  {
    id: 19,
    text: "Don't be afraid to give up the good to go for the great.",
    author: "John D. Rockefeller",
    category: "success",
  },
  {
    id: 20,
    text: "I find that the harder I work, the more luck I seem to have.",
    author: "Thomas Jefferson",
    category: "success",
  },
  
  // Life
  {
    id: 21,
    text: "In the end, it's not the years in your life that count. It's the life in your years.",
    author: "Abraham Lincoln",
    category: "life",
  },
  {
    id: 22,
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: "life",
  },
  {
    id: 23,
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    category: "life",
  },
  {
    id: 24,
    text: "You only live once, but if you do it right, once is enough.",
    author: "Mae West",
    category: "life",
  },
  {
    id: 25,
    text: "Life is really simple, but we insist on making it complicated.",
    author: "Confucius",
    category: "life",
  },
  
  // Happiness
  {
    id: 26,
    text: "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama",
    category: "happiness",
  },
  {
    id: 27,
    text: "For every minute you are angry you lose sixty seconds of happiness.",
    author: "Ralph Waldo Emerson",
    category: "happiness",
  },
  {
    id: 28,
    text: "Happiness is when what you think, what you say, and what you do are in harmony.",
    author: "Mahatma Gandhi",
    category: "happiness",
  },
  {
    id: 29,
    text: "The happiness of your life depends upon the quality of your thoughts.",
    author: "Marcus Aurelius",
    category: "happiness",
  },
  {
    id: 30,
    text: "Happiness is a journey, not a destination.",
    author: "Ben Sweetland",
    category: "happiness",
  },
  
  // Courage
  {
    id: 31,
    text: "Courage is not the absence of fear, but rather the assessment that something else is more important than fear.",
    author: "Franklin D. Roosevelt",
    category: "courage",
  },
  {
    id: 32,
    text: "You gain strength, courage, and confidence by every experience in which you really stop to look fear in the face.",
    author: "Eleanor Roosevelt",
    category: "courage",
  },
  {
    id: 33,
    text: "Courage is grace under pressure.",
    author: "Ernest Hemingway",
    category: "courage",
  },
  {
    id: 34,
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "courage",
  },
  {
    id: 35,
    text: "He who is not courageous enough to take risks will accomplish nothing in life.",
    author: "Muhammad Ali",
    category: "courage",
  },
];

import { theme } from "../theme/theme";