export interface PanchatantraStory {
    id: number;
    title: string;
    tale: string;
    moral: string;
    character: string;
    book: string;
    imageUrl?: string;
}

export const stories: PanchatantraStory[] = [
    {
        id: 1,
        title: "The Monkey and the Crocodile",
        tale: "A monkey lived on a jamun tree by the river and befriended a crocodile. Every day he shared sweet fruits with the crocodile, who carried some home to his wife. The wife grew jealous and told the crocodile, \"If the monkey eats such sweet fruits daily, his heart must be the sweetest of all. Bring me his heart.\" The crocodile, torn between loyalty to his wife and friendship, invited the monkey for dinner across the river. Midway, the crocodile revealed his wife's demand. The clever monkey replied calmly, \"Oh dear friend, I wish you had told me earlier! I left my heart hanging on the tree. Let us go back so I can fetch it.\" The foolish crocodile turned around, and the moment the monkey reached the tree, he leapt to safety, never to be tricked again.",
        moral: "Quick thinking and presence of mind can save you from the greatest dangers. True friendship should never be betrayed for selfish desires.",
        character: "🐒",
        book: "Mitra-Bheda (Loss of Friends)",
        imageUrl: "/images/panchatantra/monkey_and_crocodile.png",
    },
    {
        id: 2,
        title: "The Tortoise and the Geese",
        tale: "A tortoise named Kambugriva lived in a lake with two geese who were his dear friends. When a drought threatened to dry up the lake, the geese offered to carry the tortoise to a new home. They held a stick between their beaks and asked the tortoise to grip the middle with his mouth — but warned him not to speak a word during the flight. As they flew over a village, people below pointed and laughed, shouting, \"Look! Two geese carrying a tortoise on a stick!\" The tortoise, unable to contain his anger, opened his mouth to retort — and fell to his death.",
        moral: "Those who cannot control their tongue bring destruction upon themselves. Listen to the counsel of wise friends and exercise restraint.",
        character: "🐢",
        book: "Mitra-Bheda (Loss of Friends)",
        imageUrl: "/images/panchatantra/tortoise_and_geese.png",
    },
    {
        id: 3,
        title: "The Blue Jackal",
        tale: "A hungry jackal named Chandarava wandered into a town searching for food. Chased by dogs, he stumbled into a washerman's vat of blue dye. When he emerged, his fur was dyed a brilliant blue. Returning to the jungle, no animal recognized him. Seizing the opportunity, he declared himself \"Kakudruma,\" a divine creature sent by the gods to rule the forest. All animals — lions, tigers, and elephants — bowed before him. He lived royally until one night, hearing a pack of jackals howling at the moon, he could not resist joining in. His true howl revealed his identity, and the furious animals drove him away.",
        moral: "Deceit may bring temporary success, but your true nature will always reveal itself. Authenticity is more powerful than pretense.",
        character: "🐺",
        book: "Kakolukiyam (Of Crows and Owls)",
        imageUrl: "/images/panchatantra/blue_jackal.png",
    },
    {
        id: 4,
        title: "The Lion and the Rabbit",
        tale: "A fierce lion terrorized the forest, killing animals daily without need. The animals proposed a deal — each day, one animal would come willingly to the lion as food, so the rest could live in peace. The lion agreed. When it was the rabbit's turn, the clever rabbit arrived late. Enraged, the lion demanded an explanation. The rabbit said, \"O king, I was delayed by another lion who claims to be the true ruler of this forest. He tried to eat me!\" The furious lion demanded to see this rival. The rabbit led him to a deep well. The lion looked in, saw his own reflection, and roared. The echo roared back. Believing it to be a rival, the lion leapt into the well to fight — and drowned.",
        moral: "Intelligence and courage can defeat even the most powerful adversary. Brains will always triumph over brute strength.",
        character: "🐇",
        book: "Aparikshitakarakam (Ill-Considered Actions)",
        imageUrl: "/images/panchatantra/lion_and_rabbit.png",
    },
    {
        id: 5,
        title: "The Brahmin's Dream",
        tale: "A poor Brahmin named Svabhavakripana received a pot of rice flour as alms. That night, lying in bed with the pot beside him, he began to daydream. \"I will sell this flour and buy goats. The goats will multiply and I'll trade them for cows. The cows will give milk which I'll sell for gold. With the gold, I'll build a mansion and marry a beautiful bride. We'll have a son, and when he misbehaves, I'll raise my stick and strike him—\" In his excitement, he swung his arm and smashed the pot of flour. His dreams, and the flour, lay scattered on the floor.",
        moral: "Do not build castles in the air. Focus on what is real and present rather than getting lost in fantasies about an uncertain future.",
        character: "🏺",
        book: "Labdhapranasam (Loss of Gains)",
        imageUrl: "/images/panchatantra/brahmins_dream.png",
    },
    {
        id: 6,
        title: "The Musical Donkey",
        tale: "A washerman's donkey named Uddhata worked hard all day but was poorly fed. At night, the donkey would sneak into farmers' fields to eat. He befriended a jackal, and together they would feast. One moonlit night, intoxicated by the beauty of the fields and the full moon, the donkey felt an overwhelming urge to sing. The jackal warned him, \"Friend, we are thieves in this field! Your braying will wake the farmers and bring disaster.\" But the donkey, proud of his voice, insisted that the jackal simply lacked appreciation for music. He raised his head and brayed loudly. The farmers rushed out, caught the donkey, and beat him mercilessly.",
        moral: "There is a time and place for everything. Ignoring wise counsel and acting at the wrong moment leads to suffering.",
        character: "🫏",
        book: "Kakolukiyam (Of Crows and Owls)",
        imageUrl: "/images/panchatantra/musical_donkey.png",
    },
    {
        id: 7,
        title: "The Mice That Set Elephants Free",
        tale: "A colony of mice lived peacefully in an abandoned village. One day, a herd of elephants passed through on their way to a lake, accidentally crushing many mice underfoot. The king of mice bravely approached the elephant king and pleaded, \"Great lord, please take a different path. We are small, but one day we may repay your kindness.\" The elephant king, amused but kind-hearted, agreed. Months later, a king's hunters trapped the entire elephant herd in strong nets. Remembering the mice, the elephant king trumpeted for help. Thousands of mice came and gnawed through the ropes, setting every elephant free.",
        moral: "Never underestimate anyone based on their size. A friend in need is a friend indeed, and kindness is always repaid.",
        character: "🐘",
        book: "Mitra-Samprapti (Gaining of Friends)",
        imageUrl: "/images/panchatantra/mice_and_elephants.png",
    },
];

/**
 * Returns a deterministic "daily" story based on the current date.
 * Same story shows all day, changes at midnight.
 */
export function getDailyStory(): PanchatantraStory {
    const today = new Date();
    const dayOfYear = Math.floor(
        (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return stories[dayOfYear % stories.length];
}
