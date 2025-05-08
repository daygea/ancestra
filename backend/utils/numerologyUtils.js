// utils/numerologyUtils.js

// -------------------------
// 🎯 NUMEROLOGY CORE
// -------------------------
function reduceNumber(num) {
    while (num > 9 && num !== 11 && num !== 22) {
        num = num.toString().split('').reduce((sum, d) => sum + parseInt(d), 0);
    }
    return num;
}

function getNumerologyNumber(dateString) {
    const digits = dateString.replace(/[^0-9]/g, "");
    let sum = digits.split("").reduce((acc, num) => acc + parseInt(num), 0);
    return reduceNumber(sum);
}

function getNameNumerology(fullName) {
    const name = fullName.toUpperCase().replace(/[^A-Z]/g, "");
    let total = 0, vowelTotal = 0, consonantTotal = 0;

    const letterValues = {
        A: 1, J: 1, S: 1,
        B: 2, K: 11, T: 2,
        C: 3, L: 3, U: 3,
        D: 4, M: 4, V: 22,
        E: 5, N: 5, W: 5,
        F: 6, O: 6, X: 6,
        G: 7, P: 7, Y: 7,
        H: 8, Q: 8, Z: 8,
        I: 9, R: 9
    };

    const vowels = ["A", "E", "I", "O", "U"];

    for (let char of name) {
        const val = letterValues[char] || 0;
        total += val;
        if (vowels.includes(char)) vowelTotal += val;
        else consonantTotal += val;
    }

    return {
        destiny: reduceNumber(total),
        soulUrge: reduceNumber(vowelTotal),
        quiescent: reduceNumber(consonantTotal),
    };
}

function getBirthdayChallenge(day) {
    if (day < 10) return day;
    const digits = day.toString().split('').map(Number);
    return Math.abs(digits[0] - digits[1]); // Always positive
}

function getBirthdayGift(day) {
    const challenge = getBirthdayChallenge(day);
    return 9 - challenge;
}


// -------------------------
// 🔭 ASTROLOGY CORE
// -------------------------
const astrologyData = [
    {
        name: "Aries", symbol: "♈", animal: "Ram", element: "Fire", ruler: "Mars", start: "03-21", end: "04-19",
        traits: "Courageous, determined, confident, enthusiastic, passionate, impulsive.",
        strengths: "Leadership, bravery, high energy, strong willpower.",
        weaknesses: "Impatience, short temper, aggressive tendencies.",
        message: "Like the Ram, you charge forward with fearless energy. Your bold nature makes you a natural leader, but patience and balance will take you further.",
        planetaryInfluence: {
            planet: "Mars",
            effect: "Mars fuels your ambition, drive, and competitive spirit. It gives you a strong sense of initiative but can also make you impulsive and aggressive.",
            advice: "Use Mars' fiery energy for positive action rather than conflict. Channel your passion into productive goals."
        },
        transits: {
            majorInfluences: "Mars in Aries increases assertiveness and drive. However, be cautious of conflicts and impulsive decisions.",
            upcomingShift: "Venus entering Aries will bring balance, enhancing relationships and creativity."
        }
    },
    {
        name: "Taurus", symbol: "♉", animal: "Bull", element: "Earth", ruler: "Venus", start: "04-20", end: "05-20",
        traits: "Reliable, patient, practical, devoted, stable, stubborn.",
        strengths: "Determined, hardworking, loyal, sensual, financially wise.",
        weaknesses: "Stubborn, resistant to change, materialistic at times.",
        message: "Like the Bull, you are strong and persistent. Your patience leads to great achievements, but be open to new perspectives for greater growth.",
        planetaryInfluence: {
            planet: "Venus",
            effect: "Venus blesses you with a love for beauty, comfort, and stability. It makes you affectionate and loyal but also prone to materialism.",
            advice: "Balance your desire for security with flexibility. Appreciate beauty, but don't let it control your decisions."
        },
        transits: {
            majorInfluences: "Venus in Taurus enhances love and financial stability. It's a great time for personal growth and relationships.",
            upcomingShift: "Mercury retrograde may cause delays in communication and decision-making—stay patient and practical."
        }
    },
    {
        name: "Gemini", symbol: "♊", animal: "Twins", element: "Air", ruler: "Mercury", start: "05-21", end: "06-21",
        traits: "Adaptable, outgoing, intelligent, curious, communicative.",
        strengths: "Quick-witted, versatile, energetic, great conversationalist.",
        weaknesses: "Indecisive, inconsistent, restless, easily distracted.",
        message: "Like the Twins, you are dual-natured, adaptable, and quick-witted. Your curiosity fuels you, but learning to focus will amplify your success.",
        planetaryInfluence: {
            planet: "Mercury",
            effect: "Mercury enhances your intellect, curiosity, and communication skills. You excel in conversation and learning but may struggle with focus.",
            advice: "Use Mercury’s energy to your advantage by refining your ability to concentrate on one goal at a time."
        },
        transits: {
            majorInfluences: "Mercury in Gemini boosts communication and mental agility. Great time for learning, networking, and creative projects.",
            upcomingShift: "Mercury retrograde is coming—double-check details to avoid misunderstandings and confusion."
        }
    },
    {
        name: "Cancer", symbol: "♋", animal: "Crab", element: "Water", ruler: "Moon", start: "06-22", end: "07-22",
        traits: "Intuitive, nurturing, protective, emotional, loyal.",
        strengths: "Caring, deep emotional intelligence, strong family values.",
        weaknesses: "Moody, overly sensitive, defensive, sometimes manipulative.",
        message: "Like the Crab, you have a protective shell but a deeply sensitive heart. Trusting your intuition while managing emotions will bring you harmony.",
        planetaryInfluence: {
            planet: "Moon",
            effect: "The Moon governs emotions, intuition, and instincts. You are deeply in touch with your feelings but can be easily affected by mood swings.",
            advice: "Learn to balance your emotions and trust your inner wisdom without being overwhelmed by sensitivity."
        },
        transits: {
            majorInfluences: "Full Moon in Cancer intensifies emotions and personal revelations. A great time for deep reflection.",
            upcomingShift: "Mars entering Cancer soon may trigger emotional conflicts—stay grounded."
        }
    },
    {
        name: "Leo", symbol: "♌", animal: "Lion", element: "Fire", ruler: "Sun", start: "07-23", end: "08-22",
        traits: "Confident, ambitious, charismatic, creative, generous.",
        strengths: "Natural leader, strong-willed, inspiring, warm-hearted.",
        weaknesses: "Prideful, stubborn, attention-seeking, dramatic.",
        message: "Like the Lion, you radiate confidence and strength. Your charisma draws people in, but true greatness lies in humility and wisdom.",
        planetaryInfluence: {
            planet: "Sun",
            effect: "The Sun gives you confidence, vitality, and creativity. It makes you naturally radiant, but it can also lead to arrogance if not balanced.",
            advice: "Use the Sun’s warmth to uplift others rather than seeking constant validation."
        },
        transits: {
            majorInfluences: "Sun in Leo empowers self-expression, creativity, and leadership.",
            upcomingShift: "Saturn in opposition soon may bring challenges in responsibility—focus on patience."
        }
    },
    {
        name: "Virgo", symbol: "♍", animal: "Virgin", element: "Earth", ruler: "Mercury", start: "08-23", end: "09-22",
        traits: "Analytical, practical, detail-oriented, hardworking, kind.",
        strengths: "Highly organized, intelligent, perfectionist, service-driven.",
        weaknesses: "Overly critical, worry-prone, too detail-focused.",
        message: "Like the Virgin, you seek purity in thought and action. Your keen eye for detail is a gift, but learning to let go of perfection will set you free.",
        planetaryInfluence: {
            planet: "Mercury",
            effect: "Mercury sharpens your analytical skills and attention to detail. You are a problem-solver but can become overly critical of yourself and others.",
            advice: "Balance analysis with trust in the process. Not everything needs to be perfect."
        },
        transits: {
            majorInfluences: "Mercury in Virgo enhances analytical thinking and problem-solving. A great time for planning and organization.",
            upcomingShift: "Venus in Virgo may bring focus on self-care and health—nurture your well-being."
        }
    },
     {
        name: "Libra", symbol: "♎", animal: "Balance", element: "Air", ruler: "Venus", start: "09-23", end: "10-23",
        traits: "Diplomatic, charming, social, fair-minded, idealistic.",
        strengths: "Balanced, artistic, great mediator, relationship-focused.",
        weaknesses: "Indecisive, avoids confrontation, people-pleaser.",
        message: "Like the Balance, you seek harmony in all aspects of life. Your charm and diplomacy are your greatest strengths, but making firm decisions will help you grow.",
        planetaryInfluence: {
            planet: "Venus",
            effect: "Venus enhances your love for beauty, relationships, and diplomacy. It makes you social and charming but may cause indecisiveness.",
            advice: "Trust your judgment and make decisions with confidence. Seek balance without sacrificing your own needs."
        },
        transits: {
            majorInfluences: "Venus in Libra enhances relationships and social harmony. A great time for romance and creative projects.",
            upcomingShift: "Mars entering Libra may bring conflicts—stay calm and diplomatic in challenging situations."
        }
    },
    {
        name: "Scorpio", symbol: "♏", animal: "Scorpion", element: "Water", ruler: "Pluto & Mars", start: "10-24", end: "11-21",
        traits: "Passionate, intense, resourceful, determined, mysterious.",
        strengths: "Loyal, intuitive, fearless, emotionally deep.",
        weaknesses: "Jealous, secretive, possessive, sometimes manipulative.",
        message: "Like the Scorpion, you possess intense focus and deep emotions. Your ability to transform and rise from challenges makes you unstoppable.",
        planetaryInfluence: {
            planet: "Pluto & Mars",
            effect: "Pluto fuels your power of transformation and deep thinking. Mars gives you boldness and passion, but also intensity.",
            advice: "Use your emotional depth to heal and transform rather than control. Embrace vulnerability without fear."
        },
        transits: {
            majorInfluences: "Pluto in Scorpio deepens introspection and personal transformation.",
            upcomingShift: "Mars moving into Scorpio will amplify passion and ambition—use it wisely."
        }
    },
    {
        name: "Sagittarius", symbol: "♐", animal: "Archer", element: "Fire", ruler: "Jupiter", start: "11-22", end: "12-21",
        traits: "Adventurous, optimistic, independent, philosophical, free-spirited.",
        strengths: "Visionary, intelligent, open-minded, spontaneous.",
        weaknesses: "Impatient, tactless, overconfident, inconsistent.",
        message: "Like the Archer, your sights are set on new horizons. Your thirst for knowledge and adventure fuels you, but grounding yourself will bring greater fulfillment.",
        planetaryInfluence: {
            planet: "Jupiter",
            effect: "Jupiter expands your mind, opportunities, and luck. It makes you adventurous but can also lead to overindulgence or risk-taking.",
            advice: "Embrace your optimism but plan your journey wisely. Luck favors preparation."
        },
        transits: {
            majorInfluences: "Jupiter in Sagittarius brings expansion and opportunities for travel and education.",
            upcomingShift: "Saturn's influence may demand discipline—focus on long-term goals."
        }
    },
    {
        name: "Capricorn", symbol: "♑", animal: "Goat", element: "Earth", ruler: "Saturn", start: "12-22", end: "01-19",
        traits: "Disciplined, responsible, ambitious, practical, hardworking.",
        strengths: "Determined, patient, goal-oriented, wise.",
        weaknesses: "Workaholic, pessimistic, emotionally reserved.",
        message: "Like the Goat, you climb steadily toward your goals. Your patience and discipline are admirable, but balance is key to lasting success.",
        planetaryInfluence: {
            planet: "Saturn",
            effect: "Saturn instills discipline, structure, and wisdom. It teaches hard lessons but rewards perseverance.",
            advice: "Trust the process and stay disciplined, but remember to enjoy life along the way."
        },
        transits: {
            majorInfluences: "Saturn in Capricorn strengthens work ethic and goal-setting abilities.",
            upcomingShift: "Pluto’s influence may push you toward transformation in career or personal life—embrace growth."
        }
    },
    {
        name: "Aquarius", symbol: "♒", animal: "Water Bearer", element: "Air", ruler: "Uranus & Saturn", start: "01-20", end: "02-18",
        traits: "Innovative, independent, intellectual, humanitarian, unconventional.",
        strengths: "Visionary, open-minded, problem-solver, rebellious spirit.",
        weaknesses: "Detached, unpredictable, stubborn, emotionally distant.",
        message: "Like the Water Bearer, you bring new ideas to the world. Your intellect is your strength, but grounding in emotions will create deeper connections.",
        planetaryInfluence: {
            planet: "Uranus & Saturn",
            effect: "Uranus drives innovation and rebellion, while Saturn brings discipline and structure. This balance makes you a progressive thinker.",
            advice: "Use your originality to inspire others but stay connected to reality. Change should be meaningful, not chaotic."
        },
        transits: {
            majorInfluences: "Uranus in Aquarius fosters breakthroughs in technology and social causes.",
            upcomingShift: "Mercury retrograde may disrupt communication—double-check details in your plans."
        }
    },
    {
        name: "Pisces", symbol: "♓", animal: "Fish", element: "Water", ruler: "Neptune & Jupiter", start: "02-19", end: "03-20",
        traits: "Empathetic, intuitive, artistic, dreamy, compassionate.",
        strengths: "Highly creative, emotionally intelligent, spiritually connected.",
        weaknesses: "Overly idealistic, escapist, indecisive.",
        message: "Like the Fish, you flow with the tides of life. Your deep intuition guides you, but learning to set boundaries will protect your energy.",
        planetaryInfluence: {
            planet: "Neptune & Jupiter",
            effect: "Neptune enhances your imagination and spirituality, while Jupiter expands your dreams and wisdom. This makes you highly intuitive but also prone to illusion.",
            advice: "Trust your intuition but stay grounded in reality. Dream big, but take practical steps to manifest your vision."
        },
        transits: {
            majorInfluences: "Neptune in Pisces enhances creativity and spiritual insights.",
            upcomingShift: "Mars entering Pisces may heighten emotions—express feelings constructively."
        }
    }
];

function getZodiacSign(dob) {
    const [year, month, day] = dob.split("-").map(num => parseInt(num, 10));
    const dobFormatted = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    for (const sign of astrologyData) {
        if ((dobFormatted >= sign.start && dobFormatted <= sign.end) ||
            (sign.start.startsWith("12") && dobFormatted >= sign.start) ||
            (sign.end.startsWith("01") && dobFormatted <= sign.end)) {
            return sign;
        }
    }

    return null;
}

// -------------------------
// 🧠 DESCRIPTIONS
// -------------------------
    const summaryNumerologyMeanings = {
    1: "Natural leader, independent, strong willed, and driven.",
    2: "Cooperative, diplomatic, and value harmony in relationships.",
    3: "Creative, expressive, joyful, and great at communication.",
    4: "Practical, disciplined, and hardworking with strong foundations.",
    5: "Adventurous, free spirited, and constantly seeking change.",
    6: "Caring, nurturing, responsible, and family oriented.",
    7: "Analytical, introspective, and spiritually curious.",
    8: "Ambitious, goal-oriented, and aligned with material success.",
    9: "Compassionate, wise, and humanitarian in nature.",
    11: "Visionary with deep intuition and spiritual insight. A master of inspiration and enlightenment.",
    22: "Master builder, capable of turning dreams into reality with great focus and global impact."
};

const numerologyMeanings = {
    1: "<p>Core Symbolism and Spiritual Essence</p><p>The number 1 is the primal force of creation, the origin from which all other numbers emerge. It embodies the paradox of being 'Limited and Unlimited'—confined to its singular identity yet infinitely generative, as two 1s form 2, five 1s form 5, and so on. This duality reflects its Law of Opposites, a foundational principle in numerology. Unlike zero, which signifies void, the 1 represents the spark of existence, the unyielding energy that initiates growth and transformation. Spiritually, understanding the 1 is synonymous with enlightenment, as it holds the key to creation itself.</p><p>Energy and Leadership</p><p>The 1 vibrates with the energy of leadership, independence, and new beginnings. It symbolizes the archetype of a king—confident, self-reliant, and commanding. This energy governs inspiration, individuality, courage, and willpower. Those aligned with the 1 are natural pioneers, brimming with initiative and dynamism. However, their strength lies in starting ventures; they may struggle to see tasks to completion. This energy thrives in autonomy, making such individuals best suited to lead their own endeavors rather than collaborate in partnerships.</p><p>Personality Traits: The Warrior and Visionary</p><p>The 1 is a relentless doer—aggressive, focused, and unapologetically goal-oriented. It walks upright with pride, mirroring its symbolic shape, and charges forward like a spearhead, clearing obstacles with unwavering determination. Pragmatic and decisive, the 1 dismisses abstract distractions, trusting its innate ability to discern right from wrong. It is fiercely independent, often to a fault, refusing to accept external opinions while imposing its own values on others.</p><p>Yet, the 1 is not merely a conqueror. It embodies growth and balance akin to Mother Nature—transformative yet ruthless, creative yet unyielding. Like nature, it operates with a built-in equilibrium; tampering with its essence (e.g., forcing changes) risks unintended consequences.</p><p>Constructive and Destructive Aspects</p><p>Constructive:</p><ul><li><strong>Proactive Leadership:</strong>Embrace initiative, persistence, and creativity.</li><li><strong>Confidence and Ambition:</strong>Cultivate self-reliance and boldness while managing ego.</li><li><strong>Dynamic Vision:</strong>Lead with forward-thinking ideas, but prioritize self-establishment before aiding others.</li></ul><p>Destructive:</p><ul><li><strong>Ego Pitfalls:</strong>Avoid pride, impatience, intolerance, and greed.</li><li><strong>Weakness Traps:</strong>Guard against insecurity, cowardice, or allowing manipulation by others.</li><li><strong>Health Risks:</strong>Prone to headaches, eye/heart issues, and spinal/upper back strain.</li></ul><p>Relationships and Social Dynamics</p><p>As a friend or ally, the 1 is fiercely loyal, humorous, and unflinching in protection. Yet in love, it is demanding, jealous, and confrontational—a challenging partner who pushes others to their limits. Those under a 1’s influence often emerge stronger, though the journey is arduous. If the 1 becomes an enemy, it crushes opposition mercilessly.</p><p>For a person embodying the 1, fulfillment stems from work and achievement. However, a 'pure' 1 risks becoming overly intimidating, successful yet socially abrasive—a reminder of the need for balance.</p><p>Physical Associations</p><p>The 1 governs the right eye, heart, upper back, spinal cord, and resonates with the ocean’s boundless energy. To harmonize this energy, maintain physical discipline and avoid overexertion.</p><p>Conclusion</p><p>The number 1 is the archetype of primal power and leadership. Its energy demands respect for its clarity and force but warns against unchecked ego. To harness its potential, one must marry its pioneering spirit with humility, ensuring that its relentless drive uplifts rather than destroys. In numerology, the 1 is both a beginning and a test—the spark of creation and the challenge of balance.</p>",

    2: "<p>Core Symbolism and Spiritual Essence</p><p>The number 2 embodies harmony, partnership, and emotional depth. As the most feminine number, it thrives in duality, symbolized by its Roman numeral II and its association with pairs. While it appears submissive—bending toward the 1 in humility—its resilience lies in adaptability. Unlike the 11 (a higher vibration of 2 with leadership qualities), the 2 anchors itself firmly to the Earth, excelling in roles that require patience, diplomacy, and behind-the-scenes influence. Its shape, akin to a kneeling figure, belies an inner strength that bends under pressure but never breaks, mirroring nature’s balance of gentleness and tenacity.</p><p>Energy and Emotional Resonance</p><p>The 2’s energy governs emotion, harmony, and peace, emphasizing kindness, love, and togetherness. It rules sensitivity, teamwork, and partnerships (including marriage and divorce), thriving in nurturing roles. Those influenced by this energy are natural peacemakers, adept at fostering cooperation and understanding. They excel in rhythm-driven fields, hospitality, or food-related ventures, often working discreetly as the unseen foundation of success.</p><p>Personality Traits: The Diplomat and Nurturer</p><p>The 2 is a master of emotional intelligence—tactful, forgiving, and deeply intuitive. A born psychologist, she reads people effortlessly, using persuasion and grace to sway outcomes without seeking credit. Her sophistication, artistic taste, and loyalty make her an invaluable partner, though her emotional needs are high. She demands devotion and attention, morphing into a 'drama queen' if neglected. While fiercely protective, her shadows include jealousy, vengefulness, and illogical outbursts, requiring patience and thoughtful reconciliation (e.g., flowers and a smile).</p><p>Constructive and Destructive Aspects</p><p>Constructive:</p><ul><li><strong>Harmony Builder:</strong>Cultivate diplomacy, flexibility, and sincerity in relationships.</li><li><strong>Nurturing Presence:</strong>Be patient, hospitable, and compassionate, prioritizing teamwork.</li><li><strong>Financial Prudence:</strong>Save early to secure stability, especially in housing or family-oriented goals.</li></ul><p>Destructive:</p><ul><li><strong>Emotional Pitfalls:</strong>Avoid indecisiveness, dependency, or emotional detachment.</li><li><strong>Manipulative Tendencies:</strong>Steer clear of deceit, fault-finding, or cold-heartedness.</li><li><strong>Health Risks:</strong>Guard the left eye, breast, stomach, throat, tongue, and neck; prioritize digestive and vocal health.</li></ul><p>Relationships and Social Dynamics</p><p>As a partner, the 2 is devoted and sensual but expects reciprocal loyalty. She thrives in marriages and friendships, offering unwavering support while demanding to be cherished. Her intuitive prowess helps others understand themselves, though her need for validation can lead to tantrums. In conflicts, her indirect approach—sulking or illogical reasoning—requires gentle handling to restore harmony.</p><p>The Divine Balance</p><p>The 1 (masculine leader) and 2 (feminine nurturer) form a complementary pair, akin to father and mother. While the 1 charges ahead with boldness, the 2 provides the emotional and strategic backbone, ensuring balance. This duality underscores the 2’s quiet power: though underestimated, she is the unseen force that sustains empires.</p><p>Physical and Environmental Associations</p><p>The 2 resonates with lagoons (calm yet deep waters) and governs body parts tied to emotion and communication: the left eye, breast, stomach, throat, and neck. To harmonize this energy, foster environments of peace and avoid neglecting self-care.</p><p>Conclusion</p><p>The number 2 is the heartbeat of partnership and emotional intelligence. Its strength lies in humility, adaptability, and an unyielding commitment to harmony. Yet, its shadows—neediness and passive aggression—demand self-awareness. To thrive, the 2 must balance nurturing others with asserting its worth, proving that true power often whispers rather than shouts. In numerology, the 2 is both the glue of relationships and the quiet architect of enduring success.</p>",

    3: "<p>Core Symbolism and Spiritual Essence</p><p>The number 3 embodies the Creative Principle, merging the energies of 1 (individuality) and 2 (harmony) to birth artistic expression, joy, and divine inspiration. Symbolized by the triangle—unity of self, spirit, and the divine—it represents balance, destiny, and the spark of creation. This energy is deeply spiritual, offering divine insight and a connection to higher realms, allowing individuals to see beyond surface realities.</p><p>Energy and Creative Force</p><p>The 3 vibrates with artistic genius, optimism, and sociability. It governs imagination, philanthropy, and the ability to captivate others through talent. Often termed the 'social butterfly,' the 3 thrives in creative fields like music, writing, or performing arts. Its charisma and rhythm make it a natural in sports, politics, or clergy roles, where inspiration and public appeal are key. However, this energy warns against extravagance: money flows easily but can vanish if spent recklessly.</p><p>Personality Traits: The Charismatic Visionary</p><p>The 3 is akin to a gifted teenager—charming, playful, and magnetically attractive, yet scattered and in need of guidance. It radiates humor, wit, and a sunny disposition, drawing admirers effortlessly. However, its focus on external charm often masks a lack of depth. Superficiality, narcissism, and procrastination plague the 3, leaving it unprepared for life’s hardships. Without discipline, it may crumble under pressure, retreating into self-pity. Yet, adversity can catalyze transformation, turning the 3’s fleeting joy into profound wisdom rooted in gratitude and human connection.</p><p>Constructive and Destructive Aspects</p></p>Constructive:</p><ul><li><strong>Unleash Creativity:</strong>Embrace artistic talents, originality, and divine inspiration.</li><li><strong>Cultivate Joy:</strong>Foster optimism, social networks, and philanthropy—opportunities multiply with connections.</li><li><strong>Spiritual Awareness:</strong>Seek balance and align with destiny through mindfulness and kindness.</li></ul><p>Destructive:</p><ul><li><strong>Superficial Traps:</strong>Avoid vanity, gossip, and materialism. Resist hypocrisy and jealousy.</li><li><strong>Financial Caution:</strong>Money spent frivolously (luxury, reckless investments) may not return.</li><li><strong>Karmic Reckoning:</strong>Misuse in politics/government risks past-life karma resurfacing.</li></ul><p>Life Cycles and Challenges</p><p>The 3 governs pregnancy, abortion, and surgical interventions, reflecting its link to creation and ease-seeking tendencies. Those with this energy may experience unconventional paths to parenthood (e.g., surgical childbirth). Health-wise, it rules the sympathetic nervous system, migraines, ulcers, spleen, and white blood cells, demanding care for stress-related ailments.</p><p>Social and Professional Dynamics</p><p>In careers, the 3 excels in roles requiring charm and creativity—artists, athletes, politicians, or spiritual leaders. However, its aversion to routine and responsibility can hinder long-term success. Relationships thrive on the 3’s warmth and humor, but its need for admiration and tendency to exaggerate may strain bonds.</p><p>The Path to Depth</p><p>True fulfillment for the 3 lies beyond material pleasures. While fleeting happiness comes from new relationships or possessions, lasting serenity arises from appreciating life’s intangible beauty and fostering genuine human connections. Discipline and humility transform the 3 from a scattered dreamer into a wise, purpose-driven visionary.</p><p>Conclusion</p><p>The number 3 is a beacon of creativity and joy, bridging the mortal and divine. Its challenge is to transcend superficiality, embracing both its artistic gifts and spiritual depth. When balanced, the 3 becomes a force of inspiration, proving that true magic lies not in luck, but in the courage to grow beyond the spotlight.</p>",

    4: "<p>Core Symbolism and Spiritual Essence</p><p>The number 4 embodies structure, stability, and selfless service. Represented by the square—closed on all sides—it symbolizes boundaries, order, and the unyielding foundation of family, community, and tradition. Rooted in practicality, the 4 thrives in systems that demand discipline, such as law, law enforcement, or the judiciary. Spiritually, it connects to the Elders of the Night (Eleye), reflecting wisdom from unseen forces and the importance of enduring through life's imperfections.</p><p>Energy and Foundational Traits</p><p>The 4 radiates masculine energy, prioritizing dependability, patience, and meticulous effort. It is the backbone of society, valuing honesty, loyalty, and patriotism. While not visionary, the 4 excels in creating stability through hard work, often in roles like craftsmen, administrators, or military personnel. Its strength lies in methodical organization, though it risks becoming rigid if unbalanced.</p><p>Personality: The Pillar of Reliability</p><p>The 4 is the epitome of the steadfast worker—humble, conservative, and unremarkable in appearance, yet fiercely protective of its territory. It dresses simply, avoids attention, and finds fulfillment in tangible achievements rather than accolades. While socially reserved, it harbors a dry wit and deep devotion to family, willing to sacrifice everything for loved ones. However, its moral rigidity can morph into intolerance, especially toward unfamiliar cultures or ideas.</p><p>Constructive and Destructive Aspects</p><p>Constructive:</p><ul><li><strong>Disciplined Service:</strong>Cultivate patience, organization, and loyalty. Embrace lifelong learning and pragmatic problem-solving.</li><li><strong>Guardian of Justice:</strong>Uphold dignity, truthfulness, and patriotism. Excel in roles requiring structure, like law enforcement or engineering.</li><li><strong>Endurance:</strong>Persist through challenges without expecting recognition, aligning with the principle of selfless effort.</li></ul><p>Destructive:</p><ul><li><strong>Rigidity Traps:</strong>Avoid narrow-mindedness, dogmatism, and blunt communication. Flexibility is key to growth.</li><li><strong>Emotional Pitfalls:</strong>Resist cruelty, jealousy, or excessive seriousness. Balance work with moments of lightness.</li><li><strong>Health Risks:</strong>Protect the lungs, stomach, gall bladder, skin, bones, teeth, and ears—stress and rigidity manifest physically.</li></ul><p>Professional and Social Dynamics</p><p>In careers, the 4 shines in structured environments—military, administration, construction, herbal/pharmaceauticals or judiciary roles—where its discipline and attention to detail are assets. It struggles in creative or social fields, clashing with the free-spirited energy of the 3. While not a natural leader, it provides unwavering support as a team member or family provider.</p><p>Relationships: Loyalty Over Flair</p><p>The 4’s relationships are built on trust and duty, not romance. As a partner or parent, it is fiercely protective but may struggle with emotional expression. Its love is shown through actions—providing stability, upholding traditions, and ensuring security. However, its stubbornness and intolerance can strain bonds unless tempered with empathy.</p><p>Health and Wellbeing</p><p>Governed by the lungs, stomach, and skeletal system, the 4 must guard against stress-induced ailments (ulcers, migraines) and rigidity-related issues (joint pain, skin conditions). Regular routines and moderate physical activity (e.g., gardening, manual labor) harmonize its energy.</p><p>Conclusion</p><p>The number 4 is the bedrock of society—a testament to endurance, integrity, and quiet strength. Its challenge lies in balancing discipline with compassion, structure with adaptability. When grounded in humility and openness, the 4 evolves from a rigid traditionalist into a wise guardian, proving that true stability thrives not in perfection, but in resilience and service.</p>",

    5: "<p>Core Symbolism and Spiritual Essence</p><p>The number 5 embodies freedom, movement, and intellectual curiosity. Its open-ended shape, resembling a rocker, reflects adaptability and perpetual motion. A blend of masculine (3) and feminine (2) energies, the 5 is daringly androgynous—adventurous, rebellious, and unconfined by societal norms. It thrives on breaking boundaries, exploring the unknown, and embracing life's unpredictability. Symbolically, it opposes the rigidity of 4, trading structure for elasticity and spontaneity.</p><p>Energy and Key Traits</p><p>The 5 radiates restless, progressive energy, governing travel, communication, and sensuality. It rules advertisement, sales, writing, and intellectual pursuits, demanding constant stimulation. Those influenced by this energy are natural diplomats, charismatic speakers, and innovators. Their charm and resourcefulness make them adept at persuasion, though this talent risks veering into manipulation if misused.</p><p>Personality: The Adventurous Maverick</p><p>The 5 is a free-spirited explorer—curious, clever, and perpetually in motion. Socially magnetic, she thrives in eclectic circles, drawn to misfits and eccentrics. Her wit and adaptability make her a master of reinvention, excelling in careers like journalism, tourism, or entrepreneurship. However, routine suffocates her; she juggles multiple ventures, often leaving projects unfinished.</p><p>Strengths:</p><ul><li><strong>Intellectual Agility:</strong>Quick-thinking, articulate, and philosophically inclined.</li><li><strong>Fearless Adaptability:</strong>Thrives in chaos, turning challenges into opportunities.</li><li><strong>Social Fluidity:</strong>Builds diverse networks, excelling in roles requiring persuasion (e.g., sales, politics).</li></ul><p>Weaknesses:</p><ul><li><strong>Impulsiveness:</strong>Prone to recklessness, procrastination, and shallow commitments.</li><li><strong>Overindulgence:</strong>Risks addiction to thrill-seeking, sex, or materialism.</li><li><strong>Emotional Detachment:</strong>Struggles with loyalty, often prioritizing novelty over depth.</li></ul><p>Constructive and Destructive Aspects</p><p>Constructive:</p><ul><li>Embrace Change: Seek growth through travel, education, and unconventional paths.</li><li>Leverage Charm: Use charisma ethically in communication-driven careers (e.g., lecturing, media).</li><li>Stay Grounded: Balance adventure with strategic planning to avoid burnout.</li></ul><p>Destructive:</p><ul><li>Avoid Excess: Resist hedonism, deceit, or manipulative tactics—karma retaliates swiftly.</li><li>Combat Restlessness: Channel energy into focused goals rather than scattering efforts.</li><li>Trust Wisely: Guard against betrayal by vetting alliances carefully.</li></ul><p>Career and Social Dynamics</p><p>Career Paths:</p><ul><li>Exploration-Driven Roles: Travel guides, journalists, consultants, or entrepreneurs.</li><li>Communication Fields: Public speaking, lecturing, advertising, writing, or diplomacy.</li><li>Physical Expression: Dance, athletics, or careers emphasizing mobility.</li></ul><p>Social Life:</p><ul><li>Relationship Complexity: Drawn to multiple partners due to a craving for variety (e.g., multiple marriages).</li><li>Social Magnetism: Attracts admirers but polarizes traditionalists; clashes with judgmental types.</li></ul><p>Health and Physical Associations</p><p>The 5 governs the tongue, heart, lungs, and blood circulation. Key health risks include stress-related issues (heart ailments, respiratory problems) and consequences of excess (substance abuse). Physical activity—dance, sports, travel—harmonizes its restless energy.</p><p>Life Philosophy and Growth</p><p>The 5's mantra is 'Live fully, but mindfully.' While its thirst for freedom is invigorating, maturity demands discipline. Success comes when the 5 channels its curiosity into purposeful ventures, balancing spontaneity with responsibility. Its ultimate lesson: true liberation lies not in escaping boundaries, but in mastering self-control.</p><p>Conclusion</p><p>The number 5 is the universe's wildcard—unpredictable, electrifying, and endlessly transformative. Its challenge is to harness its kinetic energy without self-sabotage. When aligned with integrity, the 5 becomes a catalyst for innovation, proving that freedom flourishes not in chaos, but in the courage to evolve.</p>",

    6: "<p>Core Symbolism and Spiritual Essence</p><p>The number 6 embodies love, responsibility, and harmony, serving as the nurturer and cornerstone of family and community. Symbolized by the hexagon—a shape of balance and perfection—it governs regeneration, healing, and the cyclical nature of care. Known as the &ldquo;motherhood number,&rdquo; the 6 thrives in roles that demand compassion, teaching, and service. Spiritually, it is termed the lesser fortune, finding true fulfillment through selfless acts and impacting others&rsquo; lives.</p><p>Energy and Key Traits</p><p>The 6 radiates feminine energy, resonating with beauty, celebration, and social connection. It rules family, marriage, divorce, and karmic relationships, emphasizing devotion and emotional growth. This energy also governs aesthetics, hospitality, music, and the arts, drawing individuals toward environments of elegance and warmth. While inherently stable, its shadow emerges when imbalance disrupts its harmony.</p><p>Personality: The Nurturing Guardian</p><p>The 6 is the heart of the home—graceful, warm, and irresistibly charismatic. She excels as a counselor, healer, or teacher, offering wisdom and unwavering support. Her taste in fashion, décor, and music reflects her innate appreciation for beauty, making her a natural hostess who thrives in social gatherings. Yet, her idealism can blind her to others&rsquo; flaws, leading to misplaced loyalty or martyrdom.</p><p>Strengths</p><ul><li><strong>Empathic Leadership:</strong>A pillar of strength in crises, advocating for justice and the underprivileged.</li><li><strong>Aesthetic Mastery:</strong>Creates spaces and relationships steeped in harmony and elegance.</li><li><strong>Relational Depth:</strong>Builds enduring bonds through devotion and emotional authenticity.</li></ul><p>Weaknesses</p><ul><li><strong>Over-Sacrifice:</strong>Risks burnout by prioritizing others&rsquo; needs above her own.</li><li><strong>Judgmental Tendencies:</strong>Can become self-righteous, critical, or intolerant when threatened.</li><li><strong>Possessiveness:</strong>Jealousy and clinginess may sabotage relationships if unchecked.</li></ul><p>Constructive and Destructive Aspects</p><p><strong>Constructive:</strong></p><ul><li>Serve with Love: Channel energy into caregiving, teaching, or humanitarian work.</li><li>Cultivate Beauty: Embrace roles in design, hospitality, or the arts to harmonize surroundings.</li><li>Balance Devotion: Nurture relationships while maintaining personal boundaries.</li></ul><p><strong>Destructive:</strong></p><ul><li>Avoid Martyrdom: Protect your well-being; self-neglect invites resentment.</li><li>Combat Rigidity: Release the need to control others&rsquo; lives or moral choices.</li><li>Reject Superficiality: Prioritize genuine connection over societal approval or vanity.</li></ul><p>Relationships and Social Dynamics</p><ul><li><strong>In Love:</strong>Ideal Partner: The 6 seeks lasting commitment, offering loyalty and affection. However, karmic lessons may involve heartbreak to foster growth. Pitfalls: Over-involvement in others&rsquo; affairs or jealousy can strain bonds.</li><li><strong>Social Life:</strong>Celebration and Community: Hosts gatherings with flair, fostering inclusivity and joy. Reputation: Admired for generosity, yet polarizing if perceived as meddling or sanctimonious.</li></ul><p>Career and Life Purpose</p><p><strong>Career Paths:</strong></p><ul><li>Service-Oriented Roles: Teaching, nursing, counseling, or social work.</li><li>Creative Fields: Interior design, music, event planning, or hospitality management.</li><li>Justice Advocacy: Law, community leadership, or nonprofit work.</li></ul><p><strong>Life Lesson:</strong>Balance Giving and Receiving: True harmony arises when the 6 cares for herself as deeply as she cares for others.</p><p>Health and Physical Associations</p><p>The 6 governs the stomach, liver, and heart, with stress manifesting as digestive issues, fatigue, or emotional heaviness.</p><ul><li>Self-care rituals—artistic expression, mindful eating, and nature immersion—restore equilibrium.</li></ul><p>Conclusion</p><p>The number 6 is the universe&rsquo;s nurturer—a beacon of love, beauty, and responsibility. Its challenge lies in transcending the martyr complex to embrace balanced compassion. When aligned, the 6 becomes a force of healing, proving that true harmony blooms not in perfection, but in the courage to love unconditionally while honoring one&rsquo;s own light.</p>",

    7: "<p>Core Symbolism and Spiritual Essence</p><p>The number 7 embodies introspection, mysticism, and the pursuit of hidden truths. Pythagoras termed it the &ldquo;Crooked and the Straight,&rdquo; symbolizing its dual nature—rational yet deeply spiritual. Governed by a thirst for enlightenment, the 7 connects to higher consciousness, past-life wisdom, and metaphysical realms. It is the seeker of Truth (with a capital &ldquo;T&rdquo;), driven to unravel life&rsquo;s mysteries through solitude and analysis. Unlike organized religion, the 7&rsquo;s spirituality is personal, rooted in existential questions: Why are we here? What is our purpose?</p><p>Energy and Key Traits</p><p>The 7 radiates intellectual and intuitive energy, ruling over deep study, reflection, and solitude. It thrives in environments requiring precision—scientific research, spiritual healing, or academia. Linked to water spirits and saints, the 7 carries an aura of mysticism, often manifesting psychic sensitivities or telepathic abilities. Its physical domain includes the kidneys, emphasizing the need for purity and caution in lifestyle choices.</p><p>Personality: The Philosopher and Visionary</p><p>The 7 is the eternal student—introverted, dignified, and perpetually curious. Preferring quiet libraries to bustling crowds, they dissect reality through logic and intuition. Their penetrating gaze unnerves others, as if they&rsquo;re deciphering secrets hidden in plain sight. Though reserved, they radiate quiet authority, excelling as analysts, detectives, or spiritual guides.</p><p>Strengths</p><ul><li><strong>Intellectual Depth:</strong>Masters of analysis, specializing in fields like medicine, philosophy, or metaphysics.</li><li><strong>Intuitive Insight:</strong>Dreams vividly, remembers past lives, and senses underlying truths.</li><li><strong>Ethical Rigor:</strong>Champions justice, detesting gossip and superficiality.</li></ul><p>Weaknesses</p><ul><li><strong>Emotional Detachment:</strong>Struggles with empathy, appearing cold or aloof.</li><li><strong>Cynicism:</strong>Distrusts mainstream narratives, sometimes veering into arrogance.</li><li><strong>Secretiveness:</strong>Guards their inner world fiercely, risking isolation.</li></ul><p>Constructive and Destructive Aspects</p><p><strong>Constructive:</strong></p><ul><li>Pursue Enlightenment: Engage in meditation, research, or spiritual practices to unlock deeper wisdom.</li><li>Excel in Specialized Fields: Thrive in roles like surgeon, scientist, therapist, or mystic.</li><li>Harness Intuition: Use psychic gifts ethically to guide others or solve complex problems.</li></ul><p><strong>Destructive:</strong></p><ul><li>Avoid Substance Abuse: Alcohol and drugs disrupt the 7&rsquo;s mental clarity, inviting long-term harm.</li><li>Combat Paranoia: Overthinking breeds distrust; balance skepticism with openness.</li><li>Reject Superficiality: Dive beyond surface-level interactions to foster genuine connections.</li></ul><p>Career and Life Purpose</p><p><strong>Career Paths:</strong></p><ul><li>Science and Medicine: Surgeons, researchers, pharmacists, or psychologists.</li><li>Spiritual Roles: Mystics, therapists, clergy, or paranormal investigators.</li><li>Analytical Fields: Detectives, data scientists, or strategic military planners.</li></ul><p><strong>Life Lesson:</strong>Mind-Spirit Balance: True wisdom emerges when the 7 integrates logic with emotional and spiritual awareness.</p><p>Health and Karmic Warnings</p><p>The 7 governs the kidneys, necessitating hydration and detoxification.</p><ul><li>Avoid toxins—literal (poisons, alcohol) and metaphorical (toxic relationships).</li><li>Karmic warnings include risks of imprisonment (literal or metaphorical, like self-imposed isolation) if the 7 becomes overly secretive or detached.</li></ul><p>Conclusion</p><p>The number 7 is the bridge between the mortal and the divine—a thinker, a seer, and a solitary wanderer. Its journey is one of profound depth, demanding courage to confront both external mysteries and inner shadows. When the 7 learns to temper its intellect with compassion, it ascends from a mere scholar to an enlightened sage, proving that the greatest truths are felt as much as they are known.</p>",

    8: "<p>Core Symbolism and Spiritual Essence</p><p>The number 8 embodies power, discipline, and the interplay of material and spiritual realms. Symbolized by the infinity sign (&infin;), it represents balance, karma, and the law of &ldquo;As Above, So Below.&rdquo; The 8 transforms ideas into tangible success, bridging earthly ambition with higher purpose. It is the ultimate karmic equalizer—rewards and consequences stem directly from past actions. Governed by duality (light and darkness), the 8 can manifest as a ruthless capitalist or a spiritually attuned leader who uses wealth for communal uplift.</p><p>Energy and Key Traits</p><p>The 8 radiates masculine energy, channeling authority, resilience, and strategic vision. It rules finance, governance, and high-stakes ventures, thriving in fields like business, engineering, and law enforcement. This energy also connects to clairvoyance and intuition, allowing the 8 to perceive hidden opportunities and risks. While driven by material success, its spiritual side demands ethical integrity, recognizing money as a tool, not an end goal.</p><p>Personality: The Architect of Success</p><p>The 8 is a natural leader—commanding, pragmatic, and unafraid of confrontation. With a mind for strategy and a body built for endurance (often excelling in athletics or physically demanding roles), the 8 pursues goals methodically. They are savers, not spenders, with an innate sense of rhythm (many musicians and CEOs share this number). Yet, their true genius lies in balancing ambition with karma: they understand that wealth and power must serve a greater purpose.</p><p>Strengths</p><ul><li><strong>Strategic Vision:</strong>Excels in business, finance, and STEM fields (science, technology, engineering, mathematics).</li><li><strong>Karmic Wisdom:</strong>Learns from failures, rebuilding stronger after setbacks like bankruptcy.</li><li><strong>Leadership:</strong>Commands respect in military, government, or corporate roles through discipline and fairness.</li></ul><p>Weaknesses</p><ul><li><strong>Ruthlessness:</strong>Risks becoming cold, domineering, or obsessed with status.</li><li><strong>Material Tunnel Vision:</strong>May neglect relationships or spirituality in pursuit of success.</li><li><strong>Arrogance:</strong>Overconfidence can lead to ethical compromises or financial missteps.</li></ul><p>Constructive and Destructive Aspects</p><p><strong>Constructive:</strong></p><ul><li>Ethical Ambition: Build empires while uplifting others—philanthropy and fair practices amplify karma.</li><li>Financial Discipline: Master investments, savings, and risk management to ensure lasting prosperity.</li><li>Spiritual Pragmatism: Use intuition to align material goals with higher purpose, avoiding greed.</li></ul><p><strong>Destructive:</strong></p><ul><li>Corruption: Misuse of power for selfish gain invites karmic backlash (e.g., scandals, downfall).</li><li>Rigidity: Overemphasis on control stifles creativity and teamwork.</li><li>Health Neglect: Stress from high-pressure roles risks colon issues, reproductive health, or eye strain.</li></ul><p>Career and Life Purpose</p><p><strong>Career Paths:</strong></p><ul><li>Finance and Business: CEOs, investors, bankers, or entrepreneurs.</li><li>STEM Fields: Information Technology Consultants, Electrical and Electronic Engineers, data scientists, or researchers in electromagnetism/astrology.</li><li>Leadership Roles: Military strategists, politicians, or law enforcement.</li></ul><p><strong>Life Lesson:</strong>Balance Power and Humility: True success harmonizes material achievement with spiritual accountability.</p><p>Health and Physical Associations</p><p>The 8 governs the colon, reproductive organs, and eyes. Stress from relentless ambition can manifest as digestive issues, fertility challenges, or vision problems.</p><ul><li>Physical activities like weightlifting, martial arts, or rhythmic sports (boxing, rowing) channel its energy constructively.</li></ul><p>Karmic Warnings and Spiritual Growth</p><ul><li><strong>Rewards:</strong>Discipline and ethical choices bring wealth, respect, and legacy.</li><li><strong>Pitfalls:</strong>Greed, exploitation, or arrogance trigger cycles of loss and downfall.</li><li><strong>Spiritual Duty:</strong>Use clairvoyant insights and leadership to mentor others, ensuring prosperity ripples beyond the self.</li></ul><p>Conclusion</p><p>The number 8 is the universe’s CEO—a force of ambition, strategy, and karmic justice. Its power lies not in accumulation alone, but in the wisdom to wield resources for collective good. When the 8 masters balance, it transcends materialism, becoming a beacon of ethical leadership and enduring success. Remember: the infinity symbol has no end, but its loops demand integrity—what you sow, you reap, magnified.</p>",

    9: "<p>Core Symbolism and Spiritual Essence</p><p>The number 9 embodies global consciousness, selflessness, and the culmination of human experience. Its mathematical uniqueness—any number multiplied by 9 reduces back to 9—symbolizes its power to absorb and transform energies, making it the ultimate &ldquo;universal donor&rdquo; of numerology. As the last single-digit number, 9 integrates the wisdom of all preceding numbers, acting as a bridge between earthly existence and higher spiritual realms. Governed by the principle of &ldquo;As Within, So Without,&rdquo; it channels compassion into action, often sacrificing personal gain for collective good.</p><p>Energy and Key Traits</p><p>The 9 vibrates with humanitarian zeal and transformative power, resonating with both the nurturing empathy of Mother Theresa and the fiery intensity of Mars. This duality allows the 9 to lead with compassion or command with authority. It rules blood (life force) and nerves (resilience), symbolizing its dynamic, often volatile energy. The 9’s mission is to uplift humanity, advocating for justice, education, and protection of the vulnerable. However, its karmic nature delays tangible rewards, storing blessings for future lives or reincarnations as influential leaders.</p><p>Personality: The Empathetic Visionary</p><p>The 9 is a worldly sage—charismatic, eloquent, and deeply intuitive. With a queenly presence, she navigates diverse cultures and ideologies, seeing no distinction between a neighbor and a stranger across the globe. Her creativity and impeccable taste draw admiration, yet she remains aloof from petty conflicts, floating above societal trivialities.</p><p>Strengths</p><ul><li><strong>Global Empathy:</strong>Advocates for universal brotherhood, dedicating life to philanthropy, arts, or education.</li><li><strong>Transformative Leadership:</strong>Inspires change through quiet influence or assertive command, depending on the need.</li><li><strong>Karmic Wisdom:</strong>Understands that true impact transcends immediate rewards, trusting in future-life greatness.</li></ul><p>Weaknesses</p><ul><li><strong>Self-Sacrifice:</strong>Risks burnout by prioritizing others’ needs over self-care.</li><li><strong>Dark Side:</strong>When wronged, transforms into a vindictive force—cold, arrogant, and morally unyielding.</li><li><strong>Emotional Volatility:</strong>Mars’ influence fuels mood swings, aggression, and destructive outbursts if unchecked.</li></ul><p>Constructive and Destructive Aspects</p><p><strong>Constructive:</strong></p><ul><li>Humanitarian Action: Lead initiatives in charity, social justice, or environmental causes.</li><li>Balanced Leadership: Merge compassion with strategic assertiveness to drive systemic change.</li><li>Creative Expression: Use artistic talents (writing, music, design) to spread messages of unity.</li></ul><p><strong>Destructive:</strong></p><ul><li>Uncontrolled Fury: Mars’ energy can manifest as rage, leading to conflict or self-sabotage.</li><li>Martyr Complex: Over-giving breeds resentment; set boundaries to avoid exploitation.</li><li>Spiritual Arrogance: Avoid condescension toward those less &ldquo;enlightened.&rdquo;</li></ul><p>Career and Life Purpose</p><p><strong>Career Paths:</strong></p><ul><li>Humanitarian Work: NGO leadership, social work, or global health advocacy.</li><li>Creative Arts: Authors, musicians, or designers with a focus on social impact.</li><li>Education and Mentorship: Teaching, counseling, or spiritual guidance.</li><li>Contracting: Procurement and Supply Chain.</li></ul><p><strong>Life Lesson:</strong>Serve Without Losing Self: True humanitarianism requires balancing sacrifice with self-preservation.</p><p>Health and Physical Associations</p><p>The 9 governs blood, nerves, and the feet, symbolizing its connection to vitality and mobility. Key health risks include stress-related disorders (hypertension, nerve damage) and circulatory issues.</p><ul><li>Avoid smoking or substance abuse, which weaken its life force.</li></ul><p>Karmic and Reincarnative Legacy</p><ul><li><strong>Delayed Rewards:</strong>Efforts may not bear fruit in this lifetime, but secure future greatness—often reincarnating as rulers, visionaries, or transformative leaders.</li><li><strong>Ethical Imperative:</strong>Past actions heavily influence present opportunities; misuse of power invites severe karmic backlash.</li><li><strong>Spiritual Guardianship:</strong>Protects against negative energies but must guard against &ldquo;demon influence&rdquo; through ethical rigor.</li></ul><p>Conclusion</p><p>The number 9 is the universe’s paradox—both healer and warrior, giver and judge. Its power lies in its ability to transcend the self, transforming personal suffering into universal compassion. Yet, its shadow warns of the cost of imbalance: unchecked anger or self-negation. To master the 9 is to walk the razor’s edge between empathy and strength, knowing that true legacy is written not in accolades, but in lives uplifted. As the &ldquo;stage where the drama unfolds,&rdquo; the 9 reminds us that every ending is a seed for rebirth.</p>",

    11: "<p>Core Symbolism and Spiritual Essence</p><p>The number 11 is a Master Number, vibrating at a higher frequency of spiritual awakening and divine purpose. Known as &ldquo;The Psychic Master&rdquo; or &ldquo;The Lightbearer,&rdquo; it bridges the earthly and celestial realms, channeling intuitive insights and universal truths. Unlike its root number 2 (which seeks harmony through partnership), the 11 stands independently, radiating a magnetic charisma that inspires collective transformation. It embodies the paradox of human and divine—grounded yet transcendent, fragile yet infinitely powerful.</p><p>Energy and Key Traits</p><p>The 11 pulses with high-voltage intuition and creative genius, merging the leadership of 1 with the sensitivity of 2. It governs spiritual insight, artistic innovation, and prophetic vision. Those under this energy are conduits for divine messages, receiving flashes of understanding without rational processing. However, this gift comes with intense emotional and nervous energy, often manifesting as anxiety or overwhelm if ungrounded.</p><p>Personality: The Visionary Channel</p><p>The 11 is an ethereal trailblazer—mysterious, glamorous, and irresistibly magnetic. They walk among crowds yet remain detached, their minds tuned to higher frequencies. As teachers, artists, or spiritual leaders, they uplift others through inspired creations or revolutionary ideas. Their presence commands attention, yet they shun mundanity, thriving only in roles that align with their soul’s mission.</p><p>Strengths</p><ul><li><strong>Psychic Sensitivity:</strong>Receives visions, premonitions, and archetypal wisdom effortlessly.</li><li><strong>Artistic Brilliance:</strong>Excels in music, writing, or visual arts to translate divine inspiration into tangible forms.</li><li><strong>Empathic Leadership:</strong>Guides others through compassion and spiritual clarity, not authority.</li></ul><p>Weaknesses</p><ul><li><strong>Nervous Energy:</strong>Prone to anxiety, insomnia, or burnout from unregulated psychic downloads.</li><li><strong>Self-Doubt:</strong>Struggles with imposter syndrome, questioning their worthiness as a &ldquo;messenger of God.&rdquo;</li><li><strong>Emotional Overload:</strong>Absorbs others’ energies, risking detachment or emotional exhaustion.</li></ul><p>Constructive and Destructive Aspects</p><p><strong>Constructive:</strong></p><ul><li>Trust Intuition: Act as a vessel for divine inspiration in creative or healing professions.</li><li>Ground Spiritual Energy: Use meditation, nature, or art to balance ethereal insights with earthly stability.</li><li>Mentor Others: Share wisdom through teaching, counseling, or artistic expression to illuminate collective consciousness.</li></ul><p><strong>Destructive:</strong></p><ul><li>Avoid Isolation: Resist withdrawing into solitude due to fear of misunderstanding.</li><li>Combat Overwhelm: Set energetic boundaries to prevent psychic burnout.</li><li>Reject Ego Traps: Humility is key—avoid spiritual arrogance or savior complexes.</li></ul><p>Career and Life Purpose</p><p><strong>Career Paths:</strong></p><ul><li>Spiritual Leadership: Prophets, healers, mediums, or mindfulness coaches.</li><li>Creative Arts: Musicians, poets, painters, or visionary filmmakers.</li><li>Innovation: Inventors, philosophers, or tech pioneers merging spirituality with science.</li></ul><p><strong>Life Lesson:</strong>Embrace the Mastery: The 11’s path is not chosen—it is a calling. Balance service with self-care to avoid karmic exhaustion.</p><p>Health and Energetic Balance</p><p>The 11’s energy centers on the nervous system and heart chakra. Stress manifests as anxiety, migraines, or heart palpitations. Practices like yoga, journaling, or energy healing (Reiki, crystal work) help stabilize its intense vibrations.</p><ul><li>Avoid stimulants (caffeine, alcohol) that exacerbate nervous sensitivity.</li></ul><p>Karmic Duty and Spiritual Legacy</p><ul><li><strong>Past-Life Wisdom:</strong>Often old souls with accumulated spiritual knowledge, tasked with awakening others.</li><li><strong>Light in Darkness:</strong>Their presence disrupts stagnation, sparking revolutions in thought or art.</li><li><strong>Eternal Student:</strong>Mastery requires lifelong learning—esoteric studies, metaphysics, or mysticism deepen their gifts.</li></ul><p>Conclusion</p><p>The number 11 is a beacon of divine light in a world often shrouded in illusion. Its journey is one of sacred tension—between inspiration and overwhelm, genius and fragility. To embody the 11 is to walk a razor’s edge, channeling celestial fire without being consumed by it. When grounded in humility and purpose, the 11 transcends the mortal plane, leaving a legacy of awakened minds and transformed hearts. Remember: the brighter the light, the darker the shadow. Mastery lies not in avoiding the dark, but in illuminating it.</p>",

    22: "<p>The number 22, known as the Master Builder or Master Architect, embodies the profound ability to bridge the spiritual and material worlds. Rooted in the stability of the number 4, it channels divine inspiration ('As Above') into tangible creation ('So Below'), making it the most potent Life Path for manifesting grand visions. Here’s a synthesis of its essence:</p><p>Core Nature: The Architect of Reality</p><p>22 symbolizes the full circle of creation, merging idealism with practicality. Unlike its more spiritually attuned counterpart, 11, 22 thrives in the Earthly realm, transforming abstract ideas into enduring structures—be they physical, societal, or systemic. Its energy is dynamic and high-voltage, often evident from childhood as a drive to build (e.g., through blocks, tools, or imaginative projects). This vibration fosters hyperfocus and innovation, demanding constant engagement to avoid restlessness.</p><p>Strengths: The Alchemy of Ambition</p><ul><li><strong>Visionary Pragmatism:</strong>22s possess a rare duality: the foresight to dream expansively and the grounded skill to execute. They are master organizers, turning nebulous ideas into blueprints for progress.</li><li><strong>Impactful Achievements:</strong>Their work often leaves a legacy, whether through infrastructure, art, or societal change. Ambition is paired with discipline (rooted in 4), enabling them to withstand long-term efforts.</li><li><strong>Inspirational Leadership:</strong>Their power lies in rallying others through shared ideals. By harmonizing their spiritual wisdom with practical steps, they galvanize collective action.</li></ul><p>Challenges: The Tightrope of Power</p><ul><li><strong>Control vs. Collaboration:</strong>The 22’s clarity of vision can slip into rigidity or micromanagement, alienating allies. Trusting others’ contributions is vital.</li><li><strong>Overwhelm or Inertia:</strong>The weight of their potential may paralyze them—either through fear of imperfection or pressure to “save the world.” Balance requires prioritizing incremental progress over perfection.</li><li><strong>Spiritual Disconnection:</strong>While 22 excels in material realms, neglecting its spiritual roots risks hollow achievements. Without higher purpose, efforts may devolve into mere pragmatism.</li></ul><p>Path to Mastery: Integrating Dualities</p><p>To thrive, the 22 must:</p><ol><li>Fuse Spirit and Matter: Pair earthly efforts (practical skills, structure) with regular introspection to align with universal wisdom.</li><li>Lead Through Vision, Not Control: Inspire rather than dictate, fostering collaboration to avoid isolation.</li><li>Embrace Evolutionary Growth: Recognize that their path involves lifelong learning—balancing idealism with adaptability, and ambition with humility.</li></ol><p>Conclusion: The Delicate Power of Creation</p><p>The 22’s journey is one of cosmic responsibility. Its greatest triumph lies not in solitary achievement, but in elevating collective potential. By grounding spiritual insight in actionable steps and nurturing partnerships, the Master Builder erects monuments that transcend the self—transforming dreams into legacies that endure.</p>",
};

const birthdayChallengeMeanings = {
  0: "You face no external challenges—only those you create for yourself. This is both a freedom and a responsibility.",
  
  1: "Leadership comes with opposition. Expect backbiting and undermining, even within your household. You may lack the power to command and control effectively. Partner with your spouse for balance and success. Speak positively, pray often, and take good care of your head and right eye.",
  
  2: "You may experience health issues related to the stomach, blood pressure, back, and diabetes. Help and sympathy from others may be lacking. Avoid reckless eating and drinking, particularly to protect the stomach and breast. Monitor cholesterol levels and avoid excessive spending on romantic interests. Your weakness lies in the breast area. Stay close to your spiritual mentor and regularly perform Etutu or Ipese rituals. Pay special attention to your left eye.",
  
  3: "Guard your head and mental health. Avoid negative thinking. You may miss opportunities due to poor preparation or communication challenges. Even when surrounded by greatness, you may feel unfulfilled. Take care of your liver and blood—avoid anything that could harm them. Beware of wasteful spending. Stay prayerful and constantly seek out opportunities.",
  
  4: "Disappointments may be frequent. The 'Eleye' (spiritual forces) may not favor you—appease them to avoid blockages. Reduce pride and ego. Health concerns may include teeth, bones, and general body aches. Increase calcium intake, reduce fatigue, and manage stress. Keep searching for opportunities; they are around you.",
  
  5: "You may lack knowledge—ask others and seek wisdom actively. Avoid excessive talking, especially in crowds. Be mindful of tendencies toward dishonesty or theft. Take care of your bowel and be cautious of prostate-related issues. Stay neat and hygienic at all times.",
  
  6: "Avoid partying, even if tempted. You may struggle with honesty—always speak the truth and shun craftiness. Steer clear of multiple partners and beauty-related businesses (e.g., salons, barbershops), as they may not bring profit. Manage your relationships with women carefully to avoid spiritual consequences from the Eleye. Watch out for overwhelming responsibilities and be prudent with spending. Health areas of concern include the liver, tongue, skin, and esophagus. There's a high risk of divorce.",
  
  7: "Wisdom is essential—things may rarely go as planned. Beware of prison, poison, or kidnapping. Avoid drugs and alcohol to protect your kidneys and future success. Stay away from illegal activities. The spiritual realm may be misaligned with you, so seek spiritual knowledge. Be cautious with trust, as betrayal is likely. Refrain from using negative or harmful words.",
  
  8: "Your intuition may often mislead you. Struggles with arithmetic/calculations. Governmental matters may arise, seek power and authority, but remain grounded. Take care of your cholesterol levels and bones, as you're prone to stroke and rheumatism. Bathe regularly with warm water to support your health.",
  
  9: "Be cautious when helping others. Avoid overspeeding when driving and manage your anger carefully to avoid setbacks. Uncontrolled anger may lead to severe consequences, even loss of life. Refrain from negative speech and stay away from people who might pull you down. Cultivate patience and calmness to preserve your progress."
};


const birthdayGiftMeanings = {
    1: "Take care of your head, as your spirit head is supporting you. You are a leader — go and start a business as an entrepreneur. Don't be self-centred. Compatible with birthday gifts 2, 7, and 8.",
    2: "Care for people a lot, but not at your own expense. Be kind. You can start a worship centre. Compatible with birthday gifts 1, 3, and 4.",
    3: "You will do well as a politician and a businessperson. Compatible with birthday gifts 1, 5, and 9.",
    4: "You will get lots of opportunities. Be flexible, harmonious, and down-to-earth with people. Always have a good imagination. Compatible with birthday gifts 1, 5, and 7.",
    5: "You should be diplomatic, adaptable, and know how to deal with people. Compatible with birthday gifts 1, 3, and 7.",
    6: "Balanced, harmonious, compassionate, and stable. Compatible with all birthday gift numbers.",
    7: "You possess wisdom, knowledge, and are highly spiritual and intelligent, with a deep understanding of the world. A natural problem-solver and willing to help others. You take time to make decisions. Compatible with birthday gifts 2, 4, and 8.",
    8: "Powerful and successful, with lots of opportunities. Have confidence and be determined. Avoid arrogance and materialism. Compatible with all birthday gift numbers, but sometimes not with 4, 7, and 8.",
    9: "The universe worships you. Be kind and care for people without showing off. Highly intuitive with a strong connection to the spirit. Highly motivated and supportive during difficult times. Compatible with birthday gift 9."
};


const planetaryTransits = {
    "Sun": {
        yorubaName: "Orun",
        currentInfluence: "Illuminating your purpose and inner strength. A period of clarity and leadership.",
        upcomingShift: "Moving into a phase where your destiny aligns with spiritual growth.",
        ifaProverb: "Orun lo ran wa si aiye – The Sun sent us into the world (your destiny is divine)."
    },
    "Moon": {
        yorubaName: "Oṣupa",
        currentInfluence: "Emotional tides are strong. Trust your intuition and connect with your ancestors.",
        upcomingShift: "A time of deep reflection, heightened spiritual insight, and dream revelations.",
        ifaProverb: "Oṣupa tan imole si ona – The Moon lights the path of wisdom."
    },
    "Mercury": {
        yorubaName: "Èsù",
        currentInfluence: "Your communication skills are heightened. A good time for negotiations and decisions.",
        upcomingShift: "Expect unexpected changes—be flexible and adapt at life’s crossroads.",
        ifaProverb: "Èsù máa gba àlàbí, ki a má ṣe ìdàgbà – Èsù grants clarity so we do not lose direction."
    },
    "Venus": {
        yorubaName: "Oshun",
        currentInfluence: "Relationships, creativity, and love are flourishing. Beauty and harmony are in focus.",
        upcomingShift: "An emotional phase where self-love and deep connections take priority.",
        ifaProverb: "Omi ni Oshun, o gbodo ma kun – Oshun is water, she must never run dry."
    },
    "Mars": {
        yorubaName: "Ogun",
        currentInfluence: "Energy and ambition are at their peak. A time for action, but avoid unnecessary conflict.",
        upcomingShift: "Prepare for transformation—channel strength wisely to build, not destroy.",
        ifaProverb: "Ogun l’ogun, a fi ogun se ogun – Ogun is war; it takes battle to win battles."
    },
    "Jupiter": {
        yorubaName: "Obatala",
        currentInfluence: "Wisdom and expansion are guiding your journey. Great for learning and career growth.",
        upcomingShift: "A period of mentorship and spiritual awakening. Be open to new opportunities.",
        ifaProverb: "Obatala ni a fi mo ise aye – Obatala is the one who shaped the world."
    },
    "Saturn": {
        yorubaName: "Sango",
        currentInfluence: "Discipline and justice are in focus. Time to take responsibility and act with integrity.",
        upcomingShift: "Expect trials that will test your patience but ultimately strengthen your foundation.",
        ifaProverb: "Sango ti ko ni idariji – Sango does not tolerate injustice."
    },
    "Uranus": {
        yorubaName: "Oya",
        currentInfluence: "Sudden change and innovation are on the horizon. Break free from old limitations.",
        upcomingShift: "Transformation is coming. Embrace the winds of change for personal evolution.",
        ifaProverb: "Oya ni afefe aye – Oya is the wind that brings transformation."
    },
    "Neptune": {
        yorubaName: "Olokun",
        currentInfluence: "Spiritual enlightenment and dreams are heightened. Trust your intuition.",
        upcomingShift: "A deeper connection to the unseen world is unfolding. Listen to the whispers of the universe.",
        ifaProverb: "Olokun ni omi jin – Olokun is the deep ocean of mysteries."
    }
};


// -------------------------
// 🚀 EXPORT MODULE
// -------------------------
module.exports = {
    reduceNumber,
    getNumerologyNumber,
    getNameNumerology,
    getZodiacSign,
    summaryNumerologyMeanings,
    numerologyMeanings,
    getBirthdayChallenge,
    getBirthdayGift,
    birthdayChallengeMeanings,
    birthdayGiftMeanings,
    astrologyData,
    planetaryTransits
};
