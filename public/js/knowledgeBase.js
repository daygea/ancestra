let chatHistory = [
    { role: "system", content: "You are a helpful assistant specializing in Ifa divination and Yoruba spirituality." }
];

const ifaKnowledgeBase = {
    "hello": "Hello! How can I assist you today?",
    "hi": "Hi there! What would you like to know?",
    "good morning": "Good morning! May your day be filled with blessings.",
    "good afternoon": "Good afternoon! How may I help you?",
    "good evening": "Good evening! I’m here to answer your questions.",
    "how are you": "I’m just a bot, but I’m always here to help!",
    "thank you": "You’re welcome! Let me know if you have more questions.",
    "thanks": "You're welcome! If you need more guidance, feel free to ask.",
    "contact": "<p>You can reach us on Whatsapp <a style='color:green;' target='_blank' aria-label='Chat on WhatsApp' href='https://wa.me/2348034256265'> +2348034256265<a/>. Ire o.</p> ",
    "phone": "<p>You can reach us on Whatsapp <a style='color:green;' target='_blank' aria-label='Chat on WhatsApp' href='https://wa.me/2348034256265'> +2348034256265<a/>. Ire o.</p> ",
    "collaborate": "<p>You can reach us on Whatsapp <a style='color:green;' target='_blank' aria-label='Chat on WhatsApp' href='https://wa.me/2348034256265'> +2348034256265<a/>. Ire o.</p> ",


    
    
    "ajagunmale": "Ajagunmale refers to the Chief Priest (Oluwo) or head of celestial beings in heavern (Orun) who serve Olodumare and maintain cosmic order.",
    
    "awonomaja": "Awonomaja refers to the Chief Priest (Oluwo) or head of celestial beings on earth (Aye) who serve Olodumare and maintain cosmic order.",
    "babalawo": "A Babalawo is a high priest of Ifa who is trained in divination, ritual work, and spiritual guidance.",
    
    "consultation": "Consultation is a spiritual process in which a trained diviner (Babalawo) communicates with the divine to provide guidance. Done using sacred tools such as the Opele chain or palm nuts to reveal messages from the Odu Ifa. Before an Ifa consultation, you should have a clear mind, be open to guidance, and approach the process with sincerity. Kindly reach out to a competent babalawo for one.",
    "charms": "Charms are spiritual objects infused with energy to bring protection, luck, or influence events.",
    
    "creation story": "At the outset, Heaven (Orun) and Earth (Aye) was created, thereafter, Olodumare looked at his shadow on the ground (ile), commanded the shadow to be by Him, to open his mouth, to speak up, and continue speaking with Him. The shadow stood up as commanded and looked like Olodumare, and the shaow is called Ajagunmale. Olodumare became the King (Olu) in Heaven (Orun) and Ajagunmale became Oluwo (Chief Priest) in Heaven. They spoke together and created Odu and a similar situation happened for Odu, the shadow of Odu is Egan. Therefater, they all decided to create Orunmila (Shadow as Ibo), the other Eboras (Oshooshi/Orishanla, Sango/Oya Oriri, Ogun/Ota gborowo, Oduduwa/Osun Sengese) and Humans (Eniyan (Odu) - 256 in the house of Odu with their corresponding 256 Shadows) and (Eniyan (Egan) - 256 in the house of Egan with their corresponding 256 Shadows). The Humans were sent to Earth (Aye) to dominate. Earth was created on water (omi - olalore), therefore, the earth was shaky and the Humans complained and the Eboras (Ogun, Sango, Obatala, Orunmila) came to make the earth strong with their corresponding tools (Iron, Stones, Sand, Trees and so on.). In no time, Ogun, Sango and Obatala fought over ownership of Aye (earth) and Orunmila sought the invitation of Oduduwa from Heaven to become King (Oba) on Earth (Aye). This was not without hesitation from the three Eboras they were fighting. Earth eventually became peaceful with the wisdom of Orunmila and the emergence of Odu and Egan from Heaven. - Reference is Iwe mimo Olorun Olodumare from Ijo Apapo Odu Cultural Organization.",

    "destiny": "Destiny (Ori) is the divine path chosen before birth. In Ifa, it is believed that one must align with their Ori through wisdom, sacrifice (Ebo), and righteous living (Iwa Pele).",
    "divination": "Divination in Ifa is performed using sacred palm nuts (Ikin Ifa) or the Opele chain to reveal divine messages through Odu Ifa. Kindly reach out to a competent babalawo for one.",
    
    
    "ebo": "Ebo is a ritual offering or sacrifice performed to correct spiritual imbalances, remove obstacles, and attract blessings.",
    "eegun": "Egungun represents the spirits of the ancestors. They are honored through rituals and ceremonies for protection, wisdom, and blessings.",
   
    "egungun": "Egungun represents the spirits of the ancestors. They are honored through rituals and ceremonies for protection, wisdom, and blessings.",
    "esu": "Esu is the divine messenger and trickster. He governs communication, crossroads, and choices. Without Esu, no prayers or sacrifices can reach Olodumare.",
    "eshu": "Esu is the divine messenger and trickster. He governs communication, crossroads, and choices. Without Esu, no prayers or sacrifices can reach Olodumare.",
    
    "ifa": "Ifa is the sacred divination system of the Yoruba people, providing wisdom through Odu Ifa. It is the foundation of Yoruba spirituality and philosophy.",
    "incantations": "Incantations (Ofo) are powerful spoken words used to invoke spiritual forces.",
    
    
    "isefa": "Isefa is the first step in Ifa initiation, where a person receives their first Ifa reading and learns about their spiritual path.",
    "isese": "Isese refers to the traditional religious and cultural practices of the Yoruba people. It represents the worship of Olodumare and reverence for ancestors.",
    "itefa": "Itefa is the full initiation into Ifa, where an individual learns their Odu Ifa and becomes deeply connected with Ifa wisdom.",
    "iwure": "Iwure is a prayer or blessing, invoking divine favor and positive energy.",
    "iyanifa": "Iyanifa is a female Ifa priest, trained in divination, spiritual guidance, and healing.",
    
    "karma": "The Yoruba concept of karma (Esan) teaches that good and bad actions return to a person in time.",
    
    
    
    "numerology": "Numerology reveals hidden life patterns and spiritual insights through numbers.",
    "obatala": "Obatala is the Orisa of purity, and creation. He is regarded as the sculptor of human beings and the father of all Orisa.",
    
    
    
    "ogun": "Ogun is the Orisa of iron, war, technology, and perseverance. He is the spirit of progress, cutting through obstacles and ensuring success through hard work.",
    "olodumare": "Olodumare is the Supreme Creator in Yoruba spirituality, the source of all existence, and the ultimate force behind destiny.",
    
    "oogun": "Charms are spiritual objects infused with energy to bring protection, luck, or influence events.",
    "opele": "Opele is a divination chain used by Babalawos to quickly cast and interpret messages from Ifa.",
    
    
    "orunmila": "Orunmila is the deity of wisdom, knowledge, and divination. He is the custodian of Ifa and the guide for humanity in understanding fate and destiny.",
    "oshun": "Oshun is the Orisa of love, beauty, fertility, and prosperity. She rules over freshwaters and rivers, healing the sick and bringing abundance.",
    "oya": "Oya is the Orisa of transformation, wind, and storms. She governs sudden change, spiritual rebirth, and the transition between life and death.",
    
    
    "reincarnation": "Reincarnation (Atunwa) is the belief that souls return in a new body to complete their destiny and correct past mistakes.",
    
    
    "sacrifice": "Sacrifices (Ebo) depend on the Odu revealed and the guidance of the Babalawo. They help balance energies and remove obstacles.",
    "sango": "Sango is the Orisa of thunder, lightning, and justice. A powerful warrior, he represents strength, courage, and divine judgment.",
    
    "spirit world": "The spirit world (Orun) is the realm of ancestors, Orisa, and divine beings who guide and influence life on Earth.",

    
    "taboos": "Taboos (Eewo) are spiritual prohibitions revealed through Ifa divination. Avoiding them ensures alignment with one's destiny.",
    
    "witchcraft": "In Ifa, witchcraft (Aje) can be used for both positive and negative purposes. Good witches (Eleye) use their power for healing and protection.",

};
