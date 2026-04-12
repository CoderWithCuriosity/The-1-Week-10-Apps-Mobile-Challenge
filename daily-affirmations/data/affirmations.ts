// data/affirmations.ts
export interface Affirmation {
  id: number;
  text: string;
  category: string;
  author?: string;
  tags: string[];
  isFavorite?: boolean;
}

export const categories = [
  { id: "all", name: "All", icon: "✨", color: theme.colors.brand.primary },
  { id: "success", name: "Success", icon: "🏆", color: "#FFB800" },
  { id: "love", name: "Love", icon: "❤️", color: "#FF4D4D" },
  { id: "discipline", name: "Discipline", icon: "💪", color: "#20D1FD" },
  { id: "peace", name: "Peace", icon: "🕊️", color: "#87D748" },
  { id: "gratitude", name: "Gratitude", icon: "🙏", color: "#FF9A00" },
  { id: "confidence", name: "Confidence", icon: "⭐", color: "#4A6FA5" },
  { id: "healing", name: "Healing", icon: "🌿", color: "#17B978" },
];

export const affirmationsData: Affirmation[] = [
  // Success Affirmations
  {
    id: 1,
    text: "I am capable of achieving great things. Every step I take brings me closer to my goals.",
    category: "success",
    tags: ["achievement", "goals", "motivation"],
  },
  {
    id: 2,
    text: "Success flows to me naturally. I attract opportunities that align with my purpose.",
    category: "success",
    tags: ["abundance", "opportunity", "purpose"],
  },
  {
    id: 3,
    text: "I am worthy of success and all the abundance life has to offer.",
    category: "success",
    tags: ["worth", "abundance", "self-worth"],
  },
  {
    id: 4,
    text: "Every challenge I face is an opportunity to grow and become stronger.",
    category: "success",
    tags: ["growth", "challenge", "resilience"],
  },
  {
    id: 5,
    text: "I am the architect of my life. I build its foundation and choose its contents.",
    category: "success",
    tags: ["empowerment", "choice", "creation"],
  },

  // Love Affirmations
  {
    id: 6,
    text: "I am worthy of love and respect. I give and receive love freely.",
    category: "love",
    tags: ["self-love", "respect", "giving"],
  },
  {
    id: 7,
    text: "Love surrounds me everywhere I go. I attract loving and supportive relationships.",
    category: "love",
    tags: ["attraction", "support", "relationships"],
  },
  {
    id: 8,
    text: "I love myself unconditionally. My heart is open to giving and receiving love.",
    category: "love",
    tags: ["self-love", "openness", "compassion"],
  },
  {
    id: 9,
    text: "Every day, I choose love over fear. Love guides my actions and thoughts.",
    category: "love",
    tags: ["choice", "courage", "guidance"],
  },
  {
    id: 10,
    text: "I am grateful for the love that flows through my life from family, friends, and the universe.",
    category: "love",
    tags: ["gratitude", "family", "universe"],
  },

  // Discipline Affirmations
  {
    id: 11,
    text: "I am disciplined and focused. I take consistent action toward my goals every day.",
    category: "discipline",
    tags: ["focus", "action", "consistency"],
  },
  {
    id: 12,
    text: "I have the power to overcome procrastination. I choose action over hesitation.",
    category: "discipline",
    tags: ["procrastination", "action", "power"],
  },
  {
    id: 13,
    text: "My self-discipline grows stronger with every choice I make.",
    category: "discipline",
    tags: ["growth", "choice", "strength"],
  },
  {
    id: 14,
    text: "I am committed to my personal growth and show up for myself every day.",
    category: "discipline",
    tags: ["commitment", "growth", "consistency"],
  },
  {
    id: 15,
    text: "I embrace the discomfort of growth. Every disciplined effort brings me closer to my best self.",
    category: "discipline",
    tags: ["growth", "discomfort", "effort"],
  },

  // Peace Affirmations
  {
    id: 16,
    text: "I am calm and centered. Peace flows through me like a gentle river.",
    category: "peace",
    tags: ["calm", "center", "serenity"],
  },
  {
    id: 17,
    text: "I release what I cannot control. I find peace in acceptance.",
    category: "peace",
    tags: ["release", "control", "acceptance"],
  },
  {
    id: 18,
    text: "My mind is quiet and peaceful. I let go of anxious thoughts.",
    category: "peace",
    tags: ["mindfulness", "anxiety", "quiet"],
  },
  {
    id: 19,
    text: "I breathe in peace and exhale tension. I am relaxed and present.",
    category: "peace",
    tags: ["breath", "relaxation", "presence"],
  },
  {
    id: 20,
    text: "Peace begins with me. I choose to respond to life with calmness and wisdom.",
    category: "peace",
    tags: ["choice", "response", "wisdom"],
  },

  // Gratitude Affirmations
  {
    id: 21,
    text: "I am grateful for this moment. Every breath is a gift.",
    category: "gratitude",
    tags: ["moment", "breath", "gift"],
  },
  {
    id: 22,
    text: "I appreciate all that I have. Gratitude opens doors to more abundance.",
    category: "gratitude",
    tags: ["appreciation", "abundance", "openness"],
  },
  {
    id: 23,
    text: "I give thanks for the challenges that have made me stronger and wiser.",
    category: "gratitude",
    tags: ["challenges", "strength", "wisdom"],
  },
  {
    id: 24,
    text: "My heart overflows with gratitude for the love and support in my life.",
    category: "gratitude",
    tags: ["heart", "love", "support"],
  },
  {
    id: 25,
    text: "I wake up grateful and go to sleep thankful. Gratitude is my attitude.",
    category: "gratitude",
    tags: ["morning", "evening", "attitude"],
  },

  // Confidence Affirmations
  {
    id: 26,
    text: "I believe in myself and my abilities. I am confident and capable.",
    category: "confidence",
    tags: ["belief", "ability", "capability"],
  },
  {
    id: 27,
    text: "I radiate confidence and self-assurance. People respect my presence.",
    category: "confidence",
    tags: ["presence", "respect", "radiance"],
  },
  {
    id: 28,
    text: "I trust my decisions and stand by them with conviction.",
    category: "confidence",
    tags: ["decisions", "trust", "conviction"],
  },
  {
    id: 29,
    text: "I am enough, exactly as I am. I don't need to prove anything to anyone.",
    category: "confidence",
    tags: ["enough", "self-acceptance", "authenticity"],
  },
  {
    id: 30,
    text: "My voice matters. I speak my truth with confidence and clarity.",
    category: "confidence",
    tags: ["voice", "truth", "clarity"],
  },

  // Healing Affirmations
  {
    id: 31,
    text: "I am healing every day. My body and mind know how to restore balance.",
    category: "healing",
    tags: ["restoration", "balance", "body"],
  },
  {
    id: 32,
    text: "I release past hurts and embrace the possibility of a bright future.",
    category: "healing",
    tags: ["release", "past", "future"],
  },
  {
    id: 33,
    text: "I am worthy of healing and wholeness. I deserve to feel good.",
    category: "healing",
    tags: ["worth", "wholeness", "deserving"],
  },
  {
    id: 34,
    text: "Every cell in my body vibrates with health and vitality.",
    category: "healing",
    tags: ["health", "vitality", "energy"],
  },
  {
    id: 35,
    text: "I am patient with my healing journey. Every small step forward is progress.",
    category: "healing",
    tags: ["patience", "journey", "progress"],
  },
];

import { theme } from "../theme/theme";

