/**
 * Heritage-themed AI diary response engine.
 * Detects emotional "Rasa" from user text and returns
 * wisdom from Panchatantra, Raaga therapy, and Pranayama.
 */

export interface DiaryResponse {
    message: string;
    suggestion?: {
        type: "raga" | "pranayama" | "panchatantra";
        label: string;
        detail: string;
    };
    blessing: string;
}

/* ── Emotion keywords ──────────────────────────────────────────── */
const EMOTIONS: Record<string, string[]> = {
    stressed: ["stress", "anxious", "anxiety", "overwhelm", "pressure", "tense", "tension", "panic", "worried", "worry", "restless"],
    sad: ["sad", "lonely", "alone", "cry", "crying", "upset", "depressed", "depression", "loss", "grief", "miss", "missing", "empty", "heartbreak", "broke"],
    angry: ["angry", "anger", "frustrated", "frustration", "irritated", "mad", "furious", "annoyed", "hate", "fight", "conflict"],
    happy: ["happy", "joy", "grateful", "thankful", "blessed", "wonderful", "amazing", "love", "excited", "celebrate", "proud", "accomplish"],
    confused: ["confused", "lost", "direction", "purpose", "meaning", "uncertain", "unsure", "doubt", "dilemma", "choice", "decide"],
    tired: ["tired", "exhausted", "burn", "burnout", "drained", "fatigue", "sleep", "insomnia", "restless", "weary"],
    hopeful: ["hope", "dream", "aspire", "goal", "future", "wish", "believe", "faith", "new", "begin", "start", "fresh"],
    peaceful: ["peace", "calm", "serene", "grateful", "meditat", "quiet", "stillness", "content", "bliss", "harmony"],
};

function detectEmotion(text: string): string {
    const lower = text.toLowerCase();
    let maxScore = 0;
    let detected = "neutral";

    for (const [emotion, keywords] of Object.entries(EMOTIONS)) {
        const score = keywords.filter((kw) => lower.includes(kw)).length;
        if (score > maxScore) {
            maxScore = score;
            detected = emotion;
        }
    }
    return detected;
}

/* ── Response templates ────────────────────────────────────────── */
const RESPONSES: Record<string, DiaryResponse[]> = {
    stressed: [
        {
            message: "I hear the weight in your heart today. The ancient sages understood that Ashanti — restlessness — is the mind's way of seeking balance. Like a river rushing over rocks, your thoughts seek calmer waters. Let us find them together.",
            suggestion: {
                type: "pranayama",
                label: "Nadi Shodhana – Alternate Nostril Breathing",
                detail: "Close your right nostril with your thumb. Inhale through the left for 4 counts. Switch and exhale through the right for 6 counts. This ancient technique balances the Ida and Pingala energy channels, bringing immediate calm.",
            },
            blessing: "May your breath untangle what the mind has knotted.",
        },
        {
            message: "Your words carry the vibration of a mind stretched too thin, dear soul. Remember — even the great Arjuna stood paralyzed on the battlefield of Kurukshetra, overwhelmed by the weight of it all. Yet Krishna did not ask him to fight harder. He asked him to breathe, to see clearly.",
            suggestion: {
                type: "raga",
                label: "Raga Ahir Bhairav – The Dawn of Clarity",
                detail: "This morning raga dispels mental fog and anxiety. Its ascending notes mirror the rising sun — a reminder that darkness is always followed by light. Listen softly and let the music breathe for you.",
            },
            blessing: "Like the lotus that rises unstained from muddy waters, so shall your peace return.",
        },
    ],
    sad: [
        {
            message: "I feel the ache beneath your words — a sadness that sits heavy, like the monsoon clouds before they release their burden. In the Vedic tradition, sorrow is not a weakness; it is Karuna — the deepest form of compassion, beginning with the self.",
            suggestion: {
                type: "raga",
                label: "Raga Malkauns – Deep Introspection",
                detail: "This pentatonic late-night raga has been prescribed by Ayurvedic healers for centuries to process deep emotions. Its gravity creates a safe space for the mind to feel, heal, and release.",
            },
            blessing: "Let the tears flow — they water the garden from which resilience grows.",
        },
        {
            message: "Dear one, your heart speaks of an emptiness that echoes. The Panchatantra teaches us that even the deepest well refills with patience. You are not running dry — you are making space for something new.",
            suggestion: {
                type: "panchatantra",
                label: "The Story of the Tortoise and the Geese",
                detail: "Two geese carried their friend Tortoise across the sky, but the Tortoise spoke too hastily and fell. Sometimes in sadness we try to \"fix\" things with words or actions. But silence and patience are the truest healers.",
            },
            blessing: "May the silence between your heartbeats carry you gently forward.",
        },
    ],
    angry: [
        {
            message: "There is fire in your words today — Krodha, the ancient texts call it. Anger is not your enemy; it is a messenger, telling you that a boundary has been crossed. The Bhagavad Gita says: 'From anger comes delusion.' Let us cool this flame before it consumes your peace.",
            suggestion: {
                type: "pranayama",
                label: "Sheetali Pranayama – The Cooling Breath",
                detail: "Roll your tongue into a tube and inhale slowly through it. Exhale through your nose. This Pranayama literally cools the body and calms the agni (fire) energy, dissolving anger at its root.",
            },
            blessing: "May the fire in your heart become the lamp that lights your path, not the blaze that burns it.",
        },
        {
            message: "I hear the storm within you. The Panchatantra reminds us of the wisdom of patience — even the mightiest lion was undone by a clever rabbit who used calm thinking over brute force.",
            suggestion: {
                type: "panchatantra",
                label: "The Lion and the Rabbit",
                detail: "A tyrannical lion was outsmarted by a small, calm rabbit who used his reflection in a well. The moral: brute force and rage are never a match for a composed mind. Let your intelligence lead, not your fury.",
            },
            blessing: "Like water that shapes the hardest stone, may your patience reshape this moment.",
        },
    ],
    happy: [
        {
            message: "What a radiant entry! I can feel the Ananda — pure bliss — pouring through your words. The Vedas say that joy is not something we find; it is our original nature. Today, you have remembered who you truly are.",
            suggestion: {
                type: "raga",
                label: "Raga Yaman – The Sound of Evening Joy",
                detail: "This beloved evening raga celebrates beauty and devotion. Its ascending notes soar like a heart set free. Play it softly as a soundtrack to your gratitude and let this moment echo longer.",
            },
            blessing: "May this Ananda ripple outward and touch every soul you meet today.",
        },
        {
            message: "Your joy is contagious, dear soul! The Taittiriya Upanishad declares: 'Ānando brahmeti vyajānāt' — Bliss itself is Brahman, the cosmic truth. What you feel right now is not just happiness; it is a glimpse of the infinite.",
            suggestion: {
                type: "pranayama",
                label: "Bhramari – The Humming Bee Breath",
                detail: "With eyes closed, inhale deeply and hum like a bee on the exhale. This vibration amplifies positive energy, turning a moment of joy into a lasting resonance within your nervous system.",
            },
            blessing: "May your joy become the music that others hum long after you've gone.",
        },
    ],
    confused: [
        {
            message: "Your mind is at a crossroads — like Arjuna on the field of Kurukshetra, unsure which path is righteous. The confusion you feel is not chaos; it is Viveka — the power of discernment awakening within you. You would not question if you did not already sense the answer.",
            suggestion: {
                type: "panchatantra",
                label: "The Brahmin's Dream",
                detail: "A Brahmin dreamed of riches from a pot of grain — castles in the air built on imagined futures. The teaching: don't build your life on 'what ifs.' Ground yourself in what is real, right now, and the path will reveal itself.",
            },
            blessing: "The path that confuses you today is the wisdom that will guide you tomorrow.",
        },
    ],
    tired: [
        {
            message: "Your body and mind have given much, and now they ask for rest — Vishrama. In the Ayurvedic tradition, exhaustion is not a sign of weakness but a sign that the body's Vata energy is imbalanced. Stillness is the medicine you need.",
            suggestion: {
                type: "pranayama",
                label: "Yoga Nidra Breath – 4-7-8 Technique",
                detail: "Inhale for 4 counts, hold for 7 counts, exhale slowly for 8 counts. This activates the parasympathetic nervous system and mimics the brain's pre-sleep pattern. Practice 3 cycles and let go.",
            },
            blessing: "Rest is not retreat — it is how the warrior sharpens the sword of the soul.",
        },
    ],
    hopeful: [
        {
            message: "Ah, what a beautiful seed of hope you carry! The Rig Veda begins with an invocation to Agni — the sacred fire of aspiration. Your words today carry that same flame. Nurture it gently, and it will illuminate your entire world.",
            suggestion: {
                type: "raga",
                label: "Raga Bhimpalasi – The Afternoon of Possibility",
                detail: "This raga of longing and anticipation mirrors the energy you carry. It builds slowly, like hope itself, from gentle phrases to soaring melodies that feel like the heart taking flight.",
            },
            blessing: "May your hope become the bridge between who you are and who you are becoming.",
        },
    ],
    peaceful: [
        {
            message: "What a gift — to sit in Shanti, true peace. The Mandukya Upanishad describes a state beyond waking, dreaming, and sleeping: Turiya, the fourth state, where consciousness simply IS. Your words today taste of that stillness.",
            suggestion: {
                type: "raga",
                label: "Raga Bihag – Serene Night Beauty",
                detail: "This late-evening raga embodies contentment and inner beauty. Let its notes wash over you like moonlight on still water, deepening the peace you have already found.",
            },
            blessing: "May this peace remain as your constant companion, through every season of life.",
        },
    ],
    neutral: [
        {
            message: "Thank you for sharing your thoughts, dear soul. Even in the ordinary, the Vedas find the divine. 'Aham Brahmasmi' — I am the universe — you carry infinite depth within each simple moment. Let us look a little deeper together.",
            suggestion: {
                type: "pranayama",
                label: "Sama Vritti – Equal Breathing",
                detail: "Inhale for 4 counts, exhale for 4 counts. This simple practice brings awareness to the miracle of breath — something ordinary that sustains all life. In its rhythm, find your center.",
            },
            blessing: "May the stillness between your breaths reveal the extraordinary within the ordinary.",
        },
    ],
};

/* ── Main function ─────────────────────────────────────────────── */
export function getHeritageResponse(entry: string): DiaryResponse {
    const emotion = detectEmotion(entry);
    const pool = RESPONSES[emotion] || RESPONSES.neutral;
    const index = Math.floor(Math.random() * pool.length);
    return pool[index];
}
