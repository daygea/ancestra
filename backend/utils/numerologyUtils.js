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
    1: "The energy represents leadership, independence, and new beginnings. It carries the vibration of a king or a potential leader, symbolizing initiative, confidence, and self-reliance. Those influenced by this energy are natural starters but may struggle with finishing tasks. It governs inspiration, individuality, courage, willpower, and command. People aligned with this energy are best suited to running their own business rather than engaging in partnerships.Physically, the energy is associated with the right eye, heart, upper back, spinal cord, and the ocean. Constructive Aspects: Always take the initiative and be proactive. Stay energetic, persistent, and creative.Develop confidence, ambition, and self-reliance. Be bold, dynamic, and forward-thinking, but learn to manage your ego. Avoid helping others at your own expense—first establish yourself before lifting others. Destructive Aspects to Avoid: Do not have a weak will or be cowardly, insecure, or helpless. Maintain self-respect and confidence; don't allow others to manipulate or discard you. Avoid constant mood changes and selfish, impatient, intolerant, or prideful behavior. Refrain from being headstrong, greedy, or addicted to anything. Prone to headaches or head related problems including, eye, nose, mouth and ear. Also care for your heart and upper back, shoulder, spinal cord.",

    2: "The core essence of this energy is emotion and harmony, emphasizing peace of mind, kindness, love, and togetherness. Those influenced by this energy are naturally caring, nurturing, and excellent in relationships, making them ideal partners in marriage and friendships. This energy governs sensitivity, teamwork, friendship, partnership, and marriage, while also influencing divorce, detailed explanations, public recognition, tolerance, modesty, and receptivity. Those under this energy tend to work behind the scenes, acting as the foundation for success in various endeavors. It also rules rhythm, cooperation, mercy, house construction, food-related businesses, crying, compassion, and peace. Physically, the energy is associated with the lagoon, left eye, breast, and stomach. Constructive Aspects of the Energy: Cultivate sensitivity, tact, and flexibility in your interactions. Strive for harmony, diplomacy, and cooperation in relationships. Be helpful, patient, sincere, and modest in all endeavors. Show courage, caution, and care in decision-making. Be warm and hospitable, especially toward visitors. Destructive Aspects to Avoid: Avoid being unresponsive, sluggish, cowardly, or overly dependent. Do not fall into indecisiveness, inactivity, or excessive self-doubt. Steer clear of dishonesty, manipulation, fault-finding, and unnecessary interference. Do not become condescending, deceitful, or emotionally detached—care for others, or risk becoming cold-hearted. Prioritize financial planning—save money early to build or own a house, as this is essential for stability under this energy. Care for parts needed for speach (throat, tongue and neck)",

    3: "The energy represents a powerful force of artistic expression, joy, inspiration, and divine creativity. It represents a gift that captivates and amazes people, allowing individuals to bring forth their talents in ways that inspire others. However, in its destructive aspect, a person may recognize their potential but struggle to express it, watching others achieve what they know they are capable of but cannot accomplish themselves. This energy governs optimism, imagination, sociability, and good taste. It brings divine insight, as though guided by a higher power, allowing individuals to see the true nature of things. It symbolizes a balanced life, both positive and negative, much like a triangle representing the unity of creation, Oneself, the Holy Spirits (Esu), and the Divine itself. The energy is spiritual and deeply connected to destiny. It also rules philanthropy, fortune, and extravagance, cautioning that money spent recklessly may not return. It governs pregnancy, abortion, and surgical operations—those who have had multiple abortions may have a normal delivery, while those who haven’t may experience childbirth through surgery, as this energy often seeks the easiest way out. Additionally, it is linked to the clergy (being spiritually aware), sports (a reason why athletes often become wealthy), politics, and government affairs. However, if used negatively, one should avoid government dealings, as past actions—possibly even from a past life—may come back for repayment. Constructive Aspects of the Energy: Embrace your artistic and creative talents, allowing them to flourish. Cultivate joy, optimism, and freedom from worry. Maintain good social connections—the more friends, the more opportunities. Be kind, philanthropic, and spiritually aware. Use your imagination, stay original, and strive for balance in life. Destructive Aspects to Avoid: Beware of worry, whining, and excessive criticism. Avoid gossip, vanity, and unnecessary luxury. Keep pride and aggression in check, and do not exaggerate or deceive. Do not waste resources, as karma will demand accountability. Learn to be tolerant and accommodating, resisting jealousy and hypocrisy. Care for your sympathetic nervous system, nervous indigestion, migraine, ulcer, solar plexus, sleen, white blood cells",

    4: "The energy is rooted in selfless service, discipline, and endurance. It is the energy of knowledge and structure, but it also teaches that solutions to problems are never absolute—one must learn to accept imperfection. This energy demands selflessness without expecting gratitude, as efforts may go unappreciated or even ridiculed. Those under this influence often work in law, law enforcement, or the judiciary, as it is tied to justice, discipline, and order. Spiritually, it is linked to the Elders of the Night (Eleye), emphasizing deep wisdom and unseen forces at play. Physically, the energy governs the lungs, stomach, gall bladder, skin, bones, teeth, and ears. Constructive Aspects of the Energy. Cultivate practicality, patience, and organization—learn to put things together methodically. Apply knowledge diligently and seek continuous learning. Uphold dignity, economy, devotion, patriotism, and pragmatism. Value trust, loyalty, endurance, and truthfulness in all dealings. Embrace seriousness and deep thought, but avoid excessive overthinking. Destructive Aspects to Avoid: Steer clear of narrow-mindedness, blunt speech, and negativity. Avoid clumsiness, dogmatism, discrimination, and rigidity in your beliefs. Beware of dullness, excessive seriousness, and financial struggles. Resist the pull towards violence, hatred, jealousy, inhumanity, and cruelty. Care for your health, especially your lungs, stomach, gall bladder, skin, bones, teeth, and ears.",

    5: "The energy is a force of freedom, movement, adaptability, and knowledge. This energy is about breaking boundaries, embracing change, and experiencing life to the fullest. It thrives on adventure, excitement, and intellectual curiosity. The energy governs advertisement, promotion, sales, sensuality, sex, long sightedness and long journeys. Those influenced by this energy are restless, adaptable, and diplomatic, always seeking new experiences, travel, and expansion. To achieve success, they must move beyond their place of birth and explore new opportunities in different locations. This energy also has strong connections to communication, unpredictability, lecturing, training, writing, driving, and intellectual pursuits. It fosters charm, curiosity, cleverness, and resourcefulness, making those under its influence natural speakers, news anchors, or public figures. It even extends to dancing and physical expression, often leading to a well-shaped body, particularly a prominent backside. In relationships, the energy brings complexity—it often suggests that men will marry multiple wives, and women may end up with more than one husband due to their strong need for variety and excitement. Constructive Aspects of the Energy. Embrace change and adaptability—stagnation is not an option. Cultivate independence and resourcefulness to maintain success. Utilize intelligence, charm, and curiosity to explore new ideas. Be adventurous, forward-thinking, and innovative in career and personal life. Maintain a sense of excitement and unpredictability while staying grounded. Destructive Aspects to Avoid: Beware of fear of change, stagnation, and dependency—these can hold you back. Avoid recklessness, impatience, and insatiability, as they may lead to poor decisions. Be mindful of overindulgence, especially in sex, material things, or unhealthy habits. Do not engage in fraud or deception—while this energy makes one good at persuasion, dishonesty will bring severe consequences. Avoid quick disassociation from friends and colleagues, as this can lead to social isolation. Be cautious of people speaking ill or ganging up against you, as 5 is positioned at the center of the universe (between 1 and 9), making it a point of attention and influence. Do not procrastinate—juggling too many things at once can lead to unfinished projects. Learn to trust wisely, as being deceived once may cause permanent distrust in others. Care for your tongue, heart, lungs, blood circulation.",

    6: "The energy is rooted in beauty, harmony, and responsibility. It is known for celebration, relaxation, and social gatherings. This energy brings a strong connection to love, entertainment, and humanitarian service. The energy is called the 'lesser fortune', meaning that true fulfillment comes from helping others and making an impact in people’s lives. It governs family, home life, domestic matters, relationships, marriage, and even divorce. It also influences flirting, romance, and karmic lessons, meaning that those under this energy may experience both love and heartbreak as part of their spiritual growth. This energy extends to balanced living, enjoyment, and the hospitality industry, ruling over hotels, management, music, perfume, and aesthetics. Those influenced by it tend to be neat, well-decorated, and stylish, ensuring both their homes and personal appearance reflect beauty. They are naturally drawn to social gatherings, friendships, and celebrations, making them tolerant, supportive, and appreciative individuals. Constructive Aspects of the Energy: Embrace responsibility—caring for family, relationships, and home brings fulfillment. Be kind, loving, and emotionally supportive—this energy thrives on humanitarianism. Maintain balance in relationships—devotion and affection bring lasting happiness. Appreciate beauty and harmony—whether in music, fashion, or home décor. Use your natural charisma to create a warm and welcoming environment. Destructive Aspects to Avoid: Avoid instability and lack of commitment—this energy thrives on devotion. Do not be overly critical, stubborn, or interfering in other people’s affairs. Jealousy and possessiveness can destroy relationships if not controlled. Avoid being overly sacrificing—help others, but not at the cost of your well-being. Do not become detached, unforgiving, or emotionally cold—this energy is meant for connection and love. To truly align with the energy, be seriously responsible and kind to people, as the blessings from love, beauty, and service will always return to you. Care for stomach problems and the liver.",

    7: "The energy is deeply connected to spirituality, intuition, and inner wisdom. Its rules introspection, dreams, and higher consciousness. This energy is known for deep thinking, mysticism, and personal growth, making it a path for those who seek truth and enlightenment. People influenced by the energy are often highly intellectual, analytical, and introspective, carrying knowledge from past lives. It rules examination, studying, analysis, reflection, and solitude—traits that drive deep spiritual and intellectual pursuits. This energy encourages planning, conserving assets, and seeking assistance when needed, as well as specialization in fields that require deep study. Physically, the energy governs vitality, mental activity, and health, particularly influencing the kidneys. It is linked to professions like medicine, surgery, pharmacy, nursing, and optometry, as well as roles related to spirituality, mysticism, and psychic abilities. It is also connected to water spirits, saints, and deep traditions, giving those under this energy a natural inclination toward the metaphysical. This energy demands discipline in lifestyle choices, requiring individuals to avoid brain-enhancing drugs and alcohol, as these substances can cause serious issues later in life. It also carries warnings related to poison and imprisonment, urging those influenced by it to stay cautious and guard themselves. Constructive Aspects of the Energy: Develop deep interest in spirituality and metaphysical knowledge. Pursue professions in medicine, nursing, spiritual healing, or scientific research. Engage in meditation, reflection, and truth-seeking to enhance wisdom. Utilize extrasensory perception and telepathic abilities for positive transformation. Be poised, intellectual, and visionary in approach to life. Destructive Aspects to Avoid: Avoid ignorance, lack of depth, and blind trust in others. Do not be overly secretive, emotionally repressed, or distrustful. Steer clear of paranoia, nervousness, and overcritical thinking. Avoid superficiality and lack of faith—seek deeper knowledge instead. Guard against imprisonment and poisoning by making wise choices. The energy is a path of enlightenment, wisdom, and reflection. By embracing its strengths and avoiding its pitfalls, one can achieve spiritual fulfillment, intellectual mastery, and deep insight into life’s mysteries. Care for the kidney.",

    8: "The energy represents achievement, determination, and financial success. Its rules discipline, ambition, and karmic rewards. This energy carries the power of control, leadership, and material success, making it one of the most influential and authoritative vibrations. People influenced by the energy are often drawn to business, finance, administration, and leadership. It governs wealth creation, savings, investments, interest on money, and high-risk ventures. It is a governmental energy, linked to management, power, and status, but also comes with the challenge of high success and failure cycles. With determination and persistence, success is always within reach. This energy also rules science, mathematics, electricity, electromagnetism, and astrology, making it favorable for careers in engineering, technology, and research. However, it also brings delays, rise and fall experiences, and lessons in patience and resilience. Spiritually, the energy is karmic, meaning one's past actions strongly influence present and future outcomes. It is also connected to clairvoyance and deep intuition, making those under this energy naturally perceptive. Constructive Aspects of the Energy: Master financial success through discipline, savings, and investments. Embrace leadership, ambition, and commanding presence in governance or business. Develop confidence, stamina, and strong decision-making skills. Use power and status wisely for honorable and enterprising pursuits. Maintain a clear head, financial awareness, and material freedom. Destructive Aspects to Avoid: Do not seek power and money at all costs—practice ethical ambition. Avoid poor judgment, misusing power, or being overly materialistic. Refrain from arrogance, cold-blooded behavior, or scheming tendencies. Watch out for shortsightedness, eye problems, and errors in communication. Do not be over-demanding, domineering, unsympathetic, or preoccupied with status. The energy is a powerful force of prosperity, ambition, and karmic balance. When used wisely, it brings financial freedom, leadership success, and material stability. However, if misused, it can lead to corruption, loss, and downfall. Care for the reproductive organs and the colon.",

    9: "The energy is deeply connected to humanitarianism, compassion, and universal love. It is associated with passion, action, and leadership. This energy embodies sacrifice, philanthropy, wisdom, and the pursuit of justice. The energy rules blood, nerves, and the life force, making it a powerful and dynamic vibration. People under this energy are intellectual, tolerant, sympathetic, and understanding, often dedicating themselves to helping the aged, the sick, and the less privileged. However, they must learn when to stop giving, as they tend to sacrifice their own well-being for others. This energy is linked to brotherhood and idealism, meaning those under its influence crave love and deep connections but often struggle to receive them. Their role in life is to manage people and activities, offering protection, comfort, and education to others. They are also strong-willed leaders with a natural ability to command respect and handle responsibilities. However, the energy is also known for its aggressiveness, anger, and mood swings. People may avoid them due to their strong emotions and unpredictable reactions. Their association with Mars, the God of War, gives them destructive power when angry, but when controlled, it can be channeled into constructive leadership, justice, and noble causes. Additionally, the energy often delays blessings until the next life, meaning those under its influence may feel that their efforts do not immediately yield rewards. However, they are destined for greatness in their future lives, often reincarnating as kings, rulers, or powerful leaders. Constructive Aspects of the Energy: Use kindness, sympathy, and generosity to uplift others. Lead with wisdom, justice, and fairness in managing people. Embrace humanitarian work, charity, and protection of the weak. Develop emotional balance and control over anger. Utilize intellectual depth for learning, teaching, and guiding others. Strive for selflessness while maintaining personal boundaries. Destructive Aspects to Avoid: Uncontrolled anger and aggression can lead to destruction. Over-sacrificing for others may result in personal suffering. Moodiness, uncertainty, and jealousy can create inner turmoil. Be mindful of demon influence and negative spiritual energies. Avoid smoking and harmful habits that can weaken the life force. Ensure proof before reacting to disagreements. The energy is one of both construction and destruction, carrying immense power, passion, and potential. When used positively, it creates legacies and transforms lives. However, when misused, it can lead to self-destruction, conflict, and emotional instability. Rules the feet and all other areas and diseases that are hard to control.",

    11: "The energy symbolizes spiritual insight, illumination, intuition, and enlightenment. It combines the traits of diplomacy, sensitivity with divine inspiration and higher purpose. Strengths: Deeply intuitive, spiritually aware, creative, empathetic, visionary. Challenges: Prone to anxiety, nervous energy, self-doubt, or emotional overwhelm when unbalanced. You are a lightbearer—born to inspire others through your insight and spiritual depth. Trust your intuition, and use your inner knowing to uplift those around you.",

    22: "The energy is the most powerful in nature, symbolizing the ability to turn dreams into reality with grounded effort and spiritual wisdom. Strengths: Ambitious, practical, visionary, master organizer, capable of great achievements that impact the world. Challenges: Can become overly controlling, overwhelmed by pressure, or hesitant to act on big dreams. You have the rare ability to manifest grand visions. Combine your practical skills with spiritual wisdom to build something meaningful and lasting.",
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
    astrologyData,
    planetaryTransits
};
