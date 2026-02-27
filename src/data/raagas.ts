export interface Raaga {
  id: string;
  name: string;
  timeOfDay: string;
  healingProperties: string;
  description: string;
  frequency: number;
  color: string;
  gradient: string;
}

export const raagas: Raaga[] = [
  {
    id: "bhairavi",
    name: "Raag Bhairavi",
    timeOfDay: "Early Morning",
    healingProperties:
      "Alleviates anxiety and emotional turbulence. Known as the queen of raagas, it invokes deep compassion and devotion.",
    description:
      "Bhairavi is traditionally performed at dawn, creating a meditative atmosphere that calms the restless mind and opens the heart to inner peace.",
    frequency: 261.63, // C4
    color: "#E8902E",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: "yaman",
    name: "Raag Yaman",
    timeOfDay: "Early Evening",
    healingProperties:
      "Elevates mood and inspires creativity. Traditionally used to ease feelings of melancholy and bring a sense of romantic devotion.",
    description:
      "Yaman is the first raag taught to students and is associated with the serene beauty of dusk. Its ascending notes create a feeling of aspiration and upliftment.",
    frequency: 392.0, // G4
    color: "#C9A94E",
    gradient: "from-yellow-500 to-amber-600",
  },
  {
    id: "darbari",
    name: "Raag Darbari Kanada",
    timeOfDay: "Late Night",
    healingProperties:
      "Provides deep relaxation and relieves insomnia. Its grave, majestic movements pacify an overactive mind and promote restful sleep.",
    description:
      "Originally performed in the court (darbar) of Emperor Akbar by Tansen. Its slow, weighty phrases create a sense of regal calm and profound stillness.",
    frequency: 293.66, // D4
    color: "#2C2450",
    gradient: "from-indigo-700 to-purple-900",
  },
  {
    id: "todi",
    name: "Raag Todi",
    timeOfDay: "Late Morning",
    healingProperties:
      "Sharpens focus and mental clarity. Ancient texts describe it as a cure for scattered thoughts and cognitive fatigue.",
    description:
      "Todi is a powerful morning raag with a contemplative character. Its unique combination of flats creates an intensely focused, introspective mood.",
    frequency: 329.63, // E4
    color: "#6B1D2A",
    gradient: "from-rose-700 to-red-900",
  },
  {
    id: "malkauns",
    name: "Raag Malkauns",
    timeOfDay: "Midnight",
    healingProperties:
      "Grounds the spirit and combats fear. One of the most ancient raagas, it is believed to invoke courage and dispel darkness from the mind.",
    description:
      "Malkauns uses only five notes in a pentatonic scale, creating a hypnotic, powerful atmosphere. It is traditionally associated with meditation and inner strength.",
    frequency: 349.23, // F4
    color: "#4A3728",
    gradient: "from-stone-700 to-stone-900",
  },
  {
    id: "desh",
    name: "Raag Desh",
    timeOfDay: "Late Evening",
    healingProperties:
      "Evokes joy, nostalgia, and a feeling of homecoming. Used to relieve homesickness and connect with one's roots and sense of belonging.",
    description:
      "Desh is the raag of the monsoon, evoking the beauty of rain-soaked landscapes. Its light, sweet character brings warmth and an unmistakable sense of joy.",
    frequency: 440.0, // A4
    color: "#2D7D46",
    gradient: "from-emerald-600 to-green-800",
  },
];
