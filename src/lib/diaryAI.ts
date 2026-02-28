/**
 * Heritage-themed AI diary response engine.
 * Detects emotional "Rasa" from user text and returns deeply human,
 * bilingual (English/Hindi) wisdom with feature recommendations.
 */

export interface FeatureRecommendation {
    feature: string;
    route: string;
    reason: string;
}

export interface DiaryResponse {
    message: string;
    messageHi?: string; // Hindi version
    suggestion?: {
        type: "raga" | "pranayama" | "panchatantra";
        label: string;
        detail: string;
        detailHi?: string;
    };
    blessing: string;
    blessingHi?: string;
    featureRecommendation?: FeatureRecommendation;
}

/* ── Emotion keywords (English + Hindi) ────────────────────────── */
const EMOTIONS: Record<string, string[]> = {
    stressed: ["stress", "anxious", "anxiety", "overwhelm", "pressure", "tense", "tension", "panic", "worried", "worry", "restless", "nervous", "exam", "deadline", "work", "pareshaan", "ghabra", "tension", "pareshan", "darr", "fikar"],
    sad: ["sad", "lonely", "alone", "cry", "crying", "upset", "depressed", "depression", "loss", "grief", "miss", "missing", "empty", "heartbreak", "broke", "hurt", "pain", "udaas", "dukhi", "rona", "akela", "tanha", "dard", "takleef"],
    angry: ["angry", "anger", "frustrated", "frustration", "irritated", "mad", "furious", "annoyed", "hate", "fight", "conflict", "rage", "gussa", "nafrat", "jhagda", "chid", "paagal"],
    happy: ["happy", "joy", "grateful", "thankful", "blessed", "wonderful", "amazing", "love", "excited", "celebrate", "proud", "accomplish", "promotion", "success", "khush", "anand", "pyaar", "maza", "badhai", "jeeta"],
    confused: ["confused", "lost", "direction", "purpose", "meaning", "uncertain", "unsure", "doubt", "dilemma", "choice", "decide", "career", "path", "samajh", "kya karu", "sochna", "faisla"],
    tired: ["tired", "exhausted", "burn", "burnout", "drained", "fatigue", "sleep", "insomnia", "restless", "weary", "energy", "thak", "neend", "thaka", "sust"],
    hopeful: ["hope", "dream", "aspire", "goal", "future", "wish", "believe", "faith", "new", "begin", "start", "fresh", "tomorrow", "umeed", "sapna", "naya", "shuru", "vishwas"],
    peaceful: ["peace", "calm", "serene", "grateful", "meditat", "quiet", "stillness", "content", "bliss", "harmony", "relax", "shanti", "sukoon", "chain", "dhyan"],
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

function detectLanguage(text: string): "hi" | "en" {
    const hindiPatterns = [
        /[\u0900-\u097F]/, // Devanagari
        /\b(mujhe|kya|hai|main|mera|meri|aaj|kal|tum|aap|hum|kaise|bahut|accha|nahi|kuch|bhi|se|ka|ki|ko|par|ye|wo|koi|bohot|pareshaan|khush|udaas|thak|neend|pyaar|dard|gussa|darr|sapna|umeed|shanti|sukoon|rona|akela)\b/i,
    ];
    return hindiPatterns.some((p) => p.test(text)) ? "hi" : "en";
}

/* ── Response templates — deeply human, conversational ─────────── */
const RESPONSES: Record<string, DiaryResponse[]> = {
    stressed: [
        {
            message: "Hey... I can feel that heaviness in your words. You know what? It's okay to feel this way — the ancient rishis called it Ashanti, and even they dealt with it. Here's what I think would really help you right now — just close your eyes for 2 minutes and try this breathing technique. It's been helping people for literally thousands of years, and honestly? It works like magic.",
            messageHi: "Arre yaar... main samajh sakta hoon ki tum kitne pareshaan ho. Suno, ye bilkul normal hai — purane rishiyon ne ise 'Ashanti' kaha tha, aur unhone bhi isse deal kiya. Ek kaam karo — 2 minute ke liye aankhein band karo aur ye breathing technique try karo. Hazaaron saalon se log ise use kar rahe hain, aur sach mein... jadoo jaisi kaam karti hai.",
            suggestion: {
                type: "pranayama",
                label: "Nadi Shodhana – Alternate Nostril Breathing",
                detail: "Close your right nostril → inhale left (4 counts) → switch → exhale right (6 counts). Just 3 rounds. It literally resets your nervous system. The rishis weren't kidding about this one!",
                detailHi: "Daayein naak ko band karo → baayein se saans lo (4 ginti) → badlo → daayein se chhodo (6 ginti). Bas 3 baar karo. Ye sachmuch nervous system ko reset kar deta hai!",
            },
            blessing: "Jaise uljhi hui dhun bhi sahi sur mein laut aati hai, tumhari shaanti bhi lautegi.",
            blessingHi: "Jaise uljhi hui dhun bhi sahi sur mein laut aati hai, tumhari shaanti bhi lautegi.",
            featureRecommendation: {
                feature: "Pranayama Guide",
                route: "#tools",
                reason: "I've got a guided breathing exercise on the site — it visually coaches you through each breath. Way easier than doing it on your own.",
            },
        },
        {
            message: "I hear you, friend. That racing mind, the sleepless nights — I've heard this story from so many souls across the centuries. But here's what Krishna told Arjuna when he was overwhelmed on the battlefield: 'Yogasthah kuru karmani' — first find your center, then act. Don't try to solve everything. Just breathe first.",
            messageHi: "Main sun raha hoon, dost. Ye bhaagta hua mann, neend na aana — kayi logon ki ye kahani hai. Lekin jab Arjun yudh ke maidaan mein pareshaan tha, Krishna ne kya kaha? 'Yogasthah kuru karmani' — pehle apna center dhoondo, phir kuch karo. Sab kuch solve karne ki koshish mat karo. Pehle bas saans lo.",
            suggestion: {
                type: "raga",
                label: "Raga Ahir Bhairav – For Mental Clarity",
                detail: "Put this on softly while you work or study. This morning raga is scientifically shown to reduce cortisol. It's like a warm hug for your nervous system — the sitar notes gently untangle your thoughts.",
                detailHi: "Ise dheere se lagao jab padhai ya kaam kar rahe ho. Ye subah ka raag cortisol kam karta hai. Ye tumhare nervous system ke liye ek garam jhappi jaisa hai — sitar ki dhun se sochein khud suljh jaati hain.",
            },
            blessing: "May the morning light remind you: every new breath is a fresh beginning.",
            blessingHi: "Subah ki roshni yaad dilaaye: har nayi saans ek nayi shuruat hai.",
            featureRecommendation: {
                feature: "Raaga Player",
                route: "#features",
                reason: "Come try our Raaga Player — pick Ahir Bhairav and let it play softly. It's been healing stressed minds since the Vedic era.",
            },
        },
    ],
    sad: [
        {
            message: "Oh, sweetheart... I can feel the ache in your words. You know, the Vedas have a beautiful word for what you're carrying — Karuna. It means the deepest kind of compassion, and it always starts with being gentle to yourself first. You don't need to be strong right now. Just be.",
            messageHi: "Arre yaar... tere alfaazon mein dard mehsoos ho raha hai mujhe. Vedon mein ek sundar shabd hai iskeliye — Karuna. Iska matlab hai sabse gehri compassion, aur ye hamesha khud se shuru hoti hai. Abhi strong hone ki zaroorat nahi hai. Bas reh... jaise ho.",
            suggestion: {
                type: "raga",
                label: "Raga Malkauns – For Deep Healing",
                detail: "This ancient night raga has been prescribed by Ayurvedic healers for centuries specifically for processing heavy emotions. Put it on, lie down, and just... let it hold you. No judgment, no fixing — just feeling.",
                detailHi: "Ye purana raat ka raag Ayurvedic vaidyon ne specifically bhaari emotions ke liye prescribe kiya hai. Ise lagao, let jaao, aur bas... ise apne ko sambhalne do. Koi judgment nahi, koi fix karna nahi — bas mehsoos karo.",
            },
            blessing: "Aansu woh baarish hain jo dil ke bageeche ko phir se haraa kar deti hai.",
            blessingHi: "Aansu woh baarish hain jo dil ke bageeche ko phir se haraa kar deti hai.",
            featureRecommendation: {
                feature: "Panchatantra Stories",
                route: "#tools",
                reason: "Sometimes a beautiful old story can heal better than a hundred words. Check out today's Panchatantra tale — there's one about patience and hope I think you'd love.",
            },
        },
        {
            message: "I'm not going to tell you 'everything will be fine' because you've probably heard that a hundred times. What I will tell you is this — in the Panchatantra, there's a story about a tortoise who lost everything but found strength in the friends who carried him across the sky. You're not alone in this. Even reaching out here took courage.",
            messageHi: "Main ye nahi kahunga ki 'sab theek ho jayega' — ye toh tumne sau baar suna hoga. Lekin ye zaroor kahunga — Panchatantra mein ek kachhue ki kahani hai jisne sab kuch khoya lekin doston mein taqat paayi jo use aasmaan mein lekar ude. Tum akele nahi ho. Yahan tak pahunchna bhi himmat ka kaam tha.",
            suggestion: {
                type: "panchatantra",
                label: "The Tortoise and the Geese",
                detail: "A tortoise asked his geese friends to carry him to a new lake. They held a stick in their beaks and he held on with his mouth. The key? Knowing when to hold on and when to let go. Sometimes sadness is our grip on something that needs releasing.",
                detailHi: "Ek kachhue ne apne hans doston se kaha ek nayi jheel tak le chalo. Unhone ek lakdi apni chonch mein pakdi aur usne muh se. Raaz? Ye jaanna ki kab pakdna hai aur kab chhod dena hai. Kabhi kabhi dukh humara kisi cheez ko pakde rehna hai jo chhodni chahiye.",
            },
            blessing: "The deepest rivers carved the most beautiful valleys. Your depth is your beauty.",
            blessingHi: "Sabse gehri nadiyaan sabse sundar ghatiyan banaati hain. Tumhari gehraai tumhari khoobsurti hai.",
            featureRecommendation: {
                feature: "Raaga Player",
                route: "#features",
                reason: "Music heals what words can't. Try Raga Malkauns on our player — it's like a warm embrace for the soul.",
            },
        },
    ],
    angry: [
        {
            message: "Whoa, I can feel that fire. And you know what? Anger isn't wrong. The Gita calls it Krodha — and it's actually energy that can be channeled. But unchecked? It burns YOU first. So before you act on it, let's cool that fire down. I've got the perfect thing.",
            messageHi: "Arre, main wo aag mehsoos kar sakta hoon. Aur suno — gussa galat nahi hai. Gita mein ise Krodha kaha hai — ye actually energy hai jo channel ho sakti hai. Lekin agar check na karo? Ye pehle TUMHE jalaata hai. Toh pehle ye aag thandi karte hain. Mere paas ekdum sahi cheez hai.",
            suggestion: {
                type: "pranayama",
                label: "Sheetali Pranayama – The Cooling Breath",
                detail: "Roll your tongue into a tube → inhale slowly through it → exhale through your nose. Feel the cool air. Do this 5 times. It literally cools your body temperature and calms the fire element. Ancient AC, basically!",
                detailHi: "Zubaan ko tube jaisa modhao → dheere se saans lo → naak se chhodo. Thandi hawa mehsoos karo. 5 baar karo. Ye sach mein body temperature kam karta hai aur agni tatva ko shaant karta hai. Ancient AC hai basically!",
            },
            blessing: "True strength isn't in the loudest roar — it's in the silence that follows.",
            blessingHi: "Asli taqat sabse unchi dahad mein nahi — uske baad ki khamoshi mein hai.",
            featureRecommendation: {
                feature: "Pranayama Guide",
                route: "#tools",
                reason: "Go to our Pranayama section — the guided breathing with the visual circle really helps when you need to cool down fast.",
            },
        },
    ],
    happy: [
        {
            message: "YES!! I love this energy! You know, the Taittiriya Upanishad says 'Ānando brahmeti vyajānāt' — Bliss itself is the divine truth. What you're feeling right now? That's not just happiness — that's a glimpse of your true nature. The universe is literally smiling through you right now!",
            messageHi: "YESSS!! Mujhe ye energy bohot pasand hai! Suno, Taittiriya Upanishad kehta hai 'Ānando brahmeti vyajānāt' — Anand khud divya satya hai. Jo tum abhi mehsoos kar rahe ho? Ye sirf happiness nahi — ye tumhare asli swaroop ki jhalak hai. Brahmand abhi tumhare through muskura raha hai!",
            suggestion: {
                type: "raga",
                label: "Raga Yaman – Evening Celebration",
                detail: "This gorgeous evening raga is pure celebration. Put it on, maybe light a diya, and just marinate in this feeling. Joy is a muscle — the more you savor it, the stronger it gets. You deserve this moment!",
                detailHi: "Ye sundar shaam ka raag pure celebration hai. Ise lagao, ek diya jalao, aur bas is feeling mein doob jaao. Khushi ek muscle hai — jitna zyada savor karoge, utni strong hogi. Tum is pal ke haqdaar ho!",
            },
            blessing: "May your joy become the melody that others hum long after you've walked by.",
            blessingHi: "Tumhari khushi wo dhun bane jo log tab bhi gungunaayein jab tum nikal chuke ho.",
            featureRecommendation: {
                feature: "Raaga Player",
                route: "#features",
                reason: "This is the PERFECT time to try our Raaga Player! Put on Yaman and amplify this beautiful vibe.",
            },
        },
    ],
    confused: [
        {
            message: "Okay, I hear you. That feeling of standing at a crossroads where every path looks equally scary and equally tempting? Even Arjuna — the greatest warrior ever — froze at his crossroads. And you know what helped? Not a battle plan. Just clarity. One thought at a time. Let's start there.",
            messageHi: "Theek hai, main sun raha hoon. Wo feeling jab har raaste pe khade ho aur sab equally darawne aur tempting lagein? Arjuna — ab tak ka sabse bada warrior — who bhi apni crossroads pe jam gaya tha. Aur kya help kiya? Koi battle plan nahi. Bas clarity. Ek soch ek baar. Wahin se shuru karte hain.",
            suggestion: {
                type: "panchatantra",
                label: "The Brahmin's Dream",
                detail: "A Brahmin had a pot of grain and dreamed up his entire future — a wife, kids, a mansion — all from imaginary grain. Then he kicked the pot in his dream and POOF! All gone. Moral? Stop building castles on 'what ifs.' What's real right NOW? Start there.",
                detailHi: "Ek Brahmin ke paas ek handi anaaj ki thi. Usne apna poora future imagine kar liya — biwi, bachche, mahal — sab imaginary anaaj se. Phir sapne mein handi ko laat maari aur POOF! Sab gayab! Seekh? 'Agar-magar' pe mahal mat banao. Abhi kya REAL hai? Wahin se shuru karo.",
            },
            blessing: "The path that confuses you today is the wisdom that will guide you tomorrow.",
            blessingHi: "Jo raasta aaj confuse karta hai woh kal ki wisdom ban jaata hai.",
            featureRecommendation: {
                feature: "Dear Diary (Full)",
                route: "/diary",
                reason: "Sometimes writing it ALL out helps. Open the full diary — pour out every 'what if' — and I'll be here with clearer eyes.",
            },
        },
    ],
    tired: [
        {
            message: "Oh friend... your body and mind are literally telling you: 'We gave everything. Please let us rest.' In Ayurveda, this is Vata imbalance — too much movement, too much thinking, not enough grounding. Stop pushing. Rest isn't laziness — it's how warriors sharpen their swords.",
            messageHi: "Arre dost... tumhara sharir aur mann literally keh raha hai: 'Humne sab de diya. Please humein aaram karne do.' Ayurveda mein ise Vata ka asantulan kahte hain — bahut zyada bhaag daur, bahut zyada sochna, grounding kam. Dhakka maarna band karo. Aaram aalas nahi hai — ye warriors ka talwar tez karna hai.",
            suggestion: {
                type: "pranayama",
                label: "4-7-8 Sleep Breath",
                detail: "Inhale 4 counts → hold 7 counts → exhale slooowly 8 counts. This is basically a natural sleeping pill. Your brain literally switches into sleep mode after 3 rounds. Trust the ancient science on this one!",
                detailHi: "4 ginti mein saans lo → 7 ginti rok ke rakho → dheeeeere se 8 ginti mein chhodo. Ye basically natural sleeping pill hai. 3 baar ke baad brain literally sleep mode mein chala jaata hai. Ancient science pe bharosa rakho!",
            },
            blessing: "Rest is not retreat — it is how the warrior sharpens the sword of the soul.",
            blessingHi: "Vishram peeche hatna nahi — ye aatma ki talwar tez karna hai.",
            featureRecommendation: {
                feature: "Pranayama Guide",
                route: "#tools",
                reason: "Try the visual breathing guide — follow the expanding circle and let your body sync with the rhythm. It's better than counting sheep, trust me!",
            },
        },
    ],
    hopeful: [
        {
            message: "I love love LOVE this energy! The Rig Veda starts with an invocation to Agni — the sacred fire of aspiration. That fire I'm feeling in your words? THAT is what the ancient sages wrote hymns about. Nurture it. Feed it. Don't let anyone dim this flame!",
            messageHi: "Mujhe ye energy BOHOT pasand hai! Rig Veda Agni ke invocation se shuru hota hai — aspiration ki pavitra agni. Jo aag main tumhare shabdon mein mehsoos kar raha hoon? YAHI woh hai jiske baare mein purane rishiyon ne bhajan likhe. Ise poso. Ise badhao. Kisi ko ye lau mandh mat karne do!",
            suggestion: {
                type: "raga",
                label: "Raga Bhimpalasi – Afternoon of Possibility",
                detail: "This raga builds slowly, like hope itself — gentle phrases that grow into soaring melodies. It mirrors exactly what you're feeling. Play it while you plan your next move. The universe is conspiring for you!",
                detailHi: "Ye raag dheere dheere badhta hai, umeed ki tarah — halke sur jo oonchaiyon tak pahunchte hain. Ye bilkul wahi mirror karta hai jo tum mehsoos kar rahe ho. Ise bajao jab agla kadam plan karo. Brahmand tumhare saath hai!",
            },
            blessing: "May your hope become the bridge between who you are and who you were born to be.",
            blessingHi: "Tumhari umeed wo pul bane jo tumhe abhi se tumhari takdeer tak le jaaye.",
            featureRecommendation: {
                feature: "Start Healing",
                route: "/",
                reason: "Go to the main page and hit 'Start Healing' — immerse yourself in the mandala and breathing meditation. It'll amplify this beautiful energy!",
            },
        },
    ],
    peaceful: [
        {
            message: "Ahh... I can literally feel the stillness in your words. The Mandukya Upanishad describes a state called Turiya — beyond waking, dreaming, and sleeping. Just pure consciousness, just... IS. What you're touching right now? That's it. That's the space the sages spent lifetimes seeking.",
            messageHi: "Ahh... main sachchi mein tumhare shabdon mein thaharaav mehsoos kar raha hoon. Mandukya Upanishad mein ek avastha hai — Turiya — jaagne, sapne, aur neend ke paar. Bas shuddh chetna, bas... HAI. Jo tum abhi chhoo rahe ho? Yahi hai. Yahi wo jagah hai jise rishiyon ne poora jeevan dhoondha.",
            suggestion: {
                type: "raga",
                label: "Raga Bihag – Serene Night Beauty",
                detail: "This late-night raga is like moonlight on still water. Since you're already in such a beautiful space, let this music deepen it. Just... float. You've earned this peace.",
                detailHi: "Ye raat ka raag jaisa chaandni shaant paani pe. Tum pehle se itni sundar jagah pe ho, ye sangeet ise aur gehri kar dega. Bas... baho. Tumne ye shaanti kamaayi hai.",
            },
            blessing: "May this peace be your companion through every season of life, in sunrise and in storm.",
            blessingHi: "Ye shaanti tumhari saathi rahe har mausam mein, suraj mein aur toofaan mein.",
            featureRecommendation: {
                feature: "Raaga Player",
                route: "#features",
                reason: "Perfect moment for Raga Bihag on our player. Let the music take you even deeper into this beautiful stillness.",
            },
        },
    ],
    neutral: [
        {
            message: "Hey there! Thanks for sharing your thoughts. You know, not every day has to be a rollercoaster. The Vedas say 'Aham Brahmasmi' — I am the universe. There's infinite depth in your simplest moments. Want to explore what's beneath the surface?",
            messageHi: "Hey! Sochein share karne ke liye shukriya. Har din rollercoaster nahi hona chahiye. Veda kehte hain 'Aham Brahmasmi' — Main brahmand hoon. Tumhare sabse simple moments mein ananta gehraai hai. Surface ke neeche kya hai dekhna chahoge?",
            suggestion: {
                type: "pranayama",
                label: "Sama Vritti – Equal Breathing",
                detail: "Just inhale 4, exhale 4. Nice and simple. Sometimes the most ordinary practice reveals the most extraordinary insights. Try it for 1 minute — I dare you to NOT feel different after!",
                detailHi: "Bas 4 mein saans lo, 4 mein chhodo. Simple aur sundar. Kabhi kabhi sabse saadharan practice sabse asadharan insights deti hai. 1 minute try karo — main challenge karta hoon iske baad kuch alag na mehsoos hoga!",
            },
            blessing: "In the stillness between breaths lives the extraordinary hiding within the ordinary.",
            blessingHi: "Saanson ke beech ki khamoshi mein chhupi hai woh asadharan cheez jo saadharan mein rehti hai.",
            featureRecommendation: {
                feature: "Mood Check-in",
                route: "#about",
                reason: "Try our Mood Check-in on the homepage — sometimes naming your emotion reveals what's really going on inside.",
            },
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

export function detectEntryLanguage(text: string): "hi" | "en" {
    return detectLanguage(text);
}
