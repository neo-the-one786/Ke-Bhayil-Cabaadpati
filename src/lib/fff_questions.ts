export interface FFFQuestion {
    text: string;
    items: { id: string, text: string }[];
    correctOrder: string[]; // IDs in correct order
}

export const FFF_QUESTIONS: FFFQuestion[] = [
    {
        text: "Arrange these stages of a standard cricket match in chronological order.",
        items: [
            { id: 'A', text: "Toss" },
            { id: 'B', text: "First Innings" },
            { id: 'C', text: "Innings Break" },
            { id: 'D', text: "Second Innings" },
        ],
        correctOrder: ['A', 'B', 'C', 'D']
    },
    {
        text: "Arrange these Indian Prime Ministers in chronological order of their first term.",
        items: [
            { id: 'A', text: "Jawaharlal Nehru" },
            { id: 'B', text: "Indira Gandhi" },
            { id: 'C', text: "Atal Bihari Vajpayee" },
            { id: 'D', text: "Narendra Modi" }
        ],
        correctOrder: ['A', 'B', 'C', 'D']
    },
    {
        text: "Arrange these festivals as they typically occur in a calendar year.",
        items: [
            { id: 'A', text: "Republic Day" },
            { id: 'B', text: "Holi" },
            { id: 'C', text: "Independence Day" },
            { id: 'D', text: "Diwali" }
        ],
        correctOrder: ['A', 'B', 'C', 'D']
    },
    {
        text: "Starting from the North, arrange these states in geographical order moving South.",
        items: [
            { id: 'A', text: "Himachal Pradesh" },
            { id: 'B', text: "Madhya Pradesh" },
            { id: 'C', text: "Telangana" },
            { id: 'D', text: "Tamil Nadu" }
        ],
        correctOrder: ['A', 'B', 'C', 'D']
    },
    {
        text: "Arrange these planets in increasing order of their distance from the Sun.",
        items: [
            { id: 'A', text: "Earth" },
            { id: 'B', text: "Mercury" },
            { id: 'C', text: "Mars" },
            { id: 'D', text: "Venus" }
        ],
        correctOrder: ['B', 'D', 'A', 'C']
    },
    {
        text: "Arrange these Indian freedom movements in chronological order.",
        items: [
            { id: 'A', text: "Non-Cooperation Movement" },
            { id: 'B', text: "Civil Disobedience Movement" },
            { id: 'C', text: "Quit India Movement" },
            { id: 'D', text: "Swadeshi Movement" }
        ],
        correctOrder: ['D', 'A', 'B', 'C']
    },
    {
        text: "Arrange these Mughal emperors in chronological order of their reign.",
        items: [
            { id: 'A', text: "Babur" },
            { id: 'B', text: "Akbar" },
            { id: 'C', text: "Aurangzeb" },
            { id: 'D', text: "Jahangir" }
        ],
        correctOrder: ['A', 'B', 'D', 'C']
    },
    {
        text: "Arrange these Indian states by the year of their formation (earliest to latest).",
        items: [
            { id: 'A', text: "Kerala" },
            { id: 'B', text: "Telangana" },
            { id: 'C', text: "Chhattisgarh" },
            { id: 'D', text: "Andhra Pradesh" }
        ],
        correctOrder: ['D', 'A', 'C', 'B']
    },
    {
        text: "Arrange these stages of law-making in India in the correct order.",
        items: [
            { id: 'A', text: "President’s Assent" },
            { id: 'B', text: "Introduction of Bill" },
            { id: 'C', text: "Parliamentary Debate and Voting" },
            { id: 'D', text: "Committee Scrutiny" }
        ],
        correctOrder: ['B', 'D', 'C', 'A']
    },
    {
        text: "Arrange these oceans from largest to smallest by surface area.",
        items: [
            { id: 'A', text: "Indian Ocean" },
            { id: 'B', text: "Atlantic Ocean" },
            { id: 'C', text: "Pacific Ocean" },
            { id: 'D', text: "Arctic Ocean" }
        ],
        correctOrder: ['C', 'B', 'A', 'D']
    },
    {
        text: "Arrange these Indian Presidents in chronological order of their tenure.",
        items: [
            { id: 'A', text: "Dr. Rajendra Prasad" },
            { id: 'B', text: "Dr. A. P. J. Abdul Kalam" },
            { id: 'C', text: "Pranab Mukherjee" },
            { id: 'D', text: "Ramnath Kovind" }
        ],
        correctOrder: ['A', 'B', 'C', 'D']
    },
    {
        text: "Arrange these currencies in descending order of their value (approximate).",
        items: [
            { id: 'A', text: "Japanese Yen" },
            { id: 'B', text: "US Dollar" },
            { id: 'C', text: "Kuwaiti Dinar" },
            { id: 'D', text: "Indian Rupee" }
        ],
        correctOrder: ['C', 'B', 'D', 'A']
    },
    {
        text: "Arrange these layers of the Earth from outermost to innermost.",
        items: [
            { id: 'A', text: "Crust" },
            { id: 'B', text: "Mantle" },
            { id: 'C', text: "Inner Core" },
            { id: 'D', text: "Outer Core" }
        ],
        correctOrder: ['A', 'B', 'D', 'C']
    },
    {
        text: "Arrange these Nobel Prize categories in the order they were instituted.",
        items: [
            { id: 'A', text: "Physics" },
            { id: 'B', text: "Chemistry" },
            { id: 'C', text: "Peace" },
            { id: 'D', text: "Economic Sciences" }
        ],
        correctOrder: ['A', 'B', 'C', 'D']
    },
    {
        text: "Arrange these Indian rivers according to the location of their mouths from West to East.", items: [
            { id: 'A', text: "Narmada" },
            { id: 'B', text: "Godavari" },
            { id: 'C', text: "Mahanadi" },
            { id: 'D', text: "Ganga" }
        ],
        correctOrder: ['A', 'D', 'B', 'C']
    },
    {
        text: "Arrange these events of a typical general election in India in order.",
        items: [
            { id: 'A', text: "Model Code of Conduct" },
            { id: 'B', text: "Announcement of Results" },
            { id: 'C', text: "Polling" },
            { id: 'D', text: "Announcement of Election Schedule" }
        ],
        correctOrder: ['D', 'A', 'C', 'B']
    },
    {
        text: "Arrange these scientists in chronological order of their birth.",
        items: [
            { id: 'A', text: "Isaac Newton" },
            { id: 'B', text: "Albert Einstein" },
            { id: 'C', text: "Galileo Galilei" },
            { id: 'D', text: "Stephen Hawking" }
        ],
        correctOrder: ['C', 'A', 'B', 'D']
    },
    {
        text: "Arrange these Indian space missions in chronological order of launch.",
        items: [
            { id: 'A', text: "Chandrayaan-2" },
            { id: 'B', text: "Mangalyaan" },
            { id: 'C', text: "Chandrayaan-1" },
            { id: 'D', text: "Aditya-L1" }
        ],
        correctOrder: ['C', 'B', 'A', 'D']
    },
    {
        text: "Arrange these mountain ranges from North to South in India.",
        items: [
            { id: 'A', text: "Himalayas" },
            { id: 'B', text: "Aravalli Range" },
            { id: 'C', text: "Vindhya Range" },
            { id: 'D', text: "Western Ghats" }
        ],
        correctOrder: ['A', 'B', 'C', 'D']
    },
    {
        text: "Arrange these economic sectors in the order of their development historically.",
        items: [
            { id: 'A', text: "Primary Sector" },
            { id: 'B', text: "Secondary Sector" },
            { id: 'C', text: "Tertiary Sector" },
            { id: 'D', text: "Quaternary Sector" }
        ],
        correctOrder: ['A', 'B', 'C', 'D']
    },
    {
        text: "Arrange these major Indian dynasties in chronological order of their establishment.",
        items: [
            { id: 'A', text: "The Gupta Dynasty" },
            { id: 'B', text: "The Maurya Dynasty" },
            { id: 'C', text: "The Mughal Dynasty" },
            { id: 'D', text: "The Slave Dynasty (Mamluk)" }
        ],
        correctOrder: ['B', 'A', 'D', 'C']
    },
    {
        text: "Arrange these historic events in chronological order.",
        items: [
            { id: 'A', text: "World War I" },
            { id: 'B', text: "American War of Independence" },
            { id: 'C', text: "French Revolution" },
            { id: 'D', text: "First Moon Landing" }
        ],
        correctOrder: ['B', 'C', 'A', 'D']
    },
    {
        text: "Arrange these Indian cities from North to South.",
        items: [
            { id: 'A', text: "Bengaluru" },
            { id: 'B', text: "Srinagar" },
            { id: 'C', text: "Bhopal" },
            { id: 'D', text: "Chandigarh" }
        ],
        correctOrder: ['B', 'D', 'C', 'A']
    },
    {
        text: "Arrange these Presidents of India in chronological order of their term in office.",
        items: [
            { id: 'A', text: "Dr. A.P.J. Abdul Kalam" },
            { id: 'B', text: "Dr. Rajendra Prasad" },
            { id: 'C', text: "Smt. Droupadi Murmu" },
            { id: 'D', text: "Shri Pranab Mukherjee" }
        ],
        correctOrder: ['B', 'A', 'D', 'C']
    },
    {
        text: "Arrange these key events in the history of the Indian Economy in chronological order.",
        items: [
            { id: 'A', text: "Nationalisation of 14 major banks" },
            { id: 'B', text: "Introduction of GST" },
            { id: 'C', text: "LPG Reforms" },
            { id: 'D', text: "Demonetisation" }
        ],
        correctOrder: ['A', 'C', 'D', 'B']
    },
    {
        text: "Arrange these inventions in the order they were introduced to the world.",
        items: [
            { id: 'A', text: "The World Wide Web (WWW)" },
            { id: 'B', text: "The Printing Press" },
            { id: 'C', text: "The Telephone" },
            { id: 'D', text: "The Television" }
        ],
        correctOrder: ['B', 'C', 'D', 'A']
    },
    {
        text: "Arrange these mammals in ascending order of their average gestation (pregnancy) period.",
        items: [
            { id: 'A', text: "Human" },
            { id: 'B', text: "Rat" },
            { id: 'C', text: "Elephant" },
            { id: 'D', text: "Dog" }
        ],
        correctOrder: ['B', 'D', 'A', 'C']
    },
    {
        text: "Arrange these events hosted by India in chronological order.",
        items: [
            { id: 'A', text: "Commonwealth Games (Delhi)" },
            { id: 'B', text: "Asian Games (First ever)" },
            { id: 'C', text: "ICC Men's Cricket World Cup (Won at home)" },
            { id: 'D', text: "G20 Summit (New Delhi)" }
        ],
        correctOrder: ['B', 'A', 'C', 'D']
    },
    {
        text: "Arrange these balls according to their diameter from smallest to largest.",
        items: [
            { id: 'A', text: "Football" },
            { id: 'B', text: "Golf Ball" },
            { id: 'C', text: "Tennis Ball" },
            { id: 'D', text: "Basketball" }
        ],
        correctOrder: ['B', 'C', 'A', 'D']
    },
    {
        text: "Arrange these Indian civilian awards in descending order of precedence.",
        items: [
            { id: 'A', text: "Padma Bhushan" },
            { id: 'B', text: "Bharat Ratna" },
            { id: 'C', text: "Padma Shri" },
            { id: 'D', text: "Padma Vibhushan" }
        ],
        correctOrder: ['B', 'D', 'A', 'C']
    },
    {
        text: "Arrange these Harry Potter books in the order of their release.",
        items: [
            { id: 'A', text: "The Order of the Phoenix" },
            { id: 'B', text: "The Philosopher's Stone" },
            { id: 'C', text: "The Deathly Hallows" },
            { id: 'D', text: "The Prisoner of Azkaban" }
        ],
        correctOrder: ['B', 'D', 'A', 'C']
    },
    {
        text: "Arrange these actors who have played 'James Bond' in order of their first appearance.",
        items: [
            { id: 'A', text: "Daniel Craig" },
            { id: 'B', text: "Sean Connery" },
            { id: 'C', text: "Pierce Brosnan" },
            { id: 'D', text: "Roger Moore" }
        ],
        correctOrder: ['B', 'D', 'C', 'A']
    },
    {
        text: "Arrange these capital cities from West to East based on their geographical location.",
        items: [
            { id: 'A', text: "Tokyo" },
            { id: 'B', text: "London" },
            { id: 'C', text: "New York" },
            { id: 'D', text: "New Delhi" }
        ],
        correctOrder: ['C', 'B', 'D', 'A']
    },
    {
        text: "Arrange these countries in decreasing order of the number of stars found on their national flags.",
        items: [
            { id: 'A', text: "China" },
            { id: 'B', text: "USA" },
            { id: 'C', text: "Israel" },
            { id: 'D', text: "Australia" }
        ],
        correctOrder: ['B', 'D', 'A', 'C']
    },
    {
        text: "Arrange the following Yugas in the correct cycle according to Hindu Mythology.",
        items: [
            { id: 'A', text: "Dvapara Yuga" },
            { id: 'B', text: "Kali Yuga" },
            { id: 'C', text: "Satya Yuga" },
            { id: 'D', text: "Treta Yuga" }
        ],
        correctOrder: ['C', 'D', 'A', 'B']
    },
    {
        text: "Arrange these geometric shapes in ascending order of the number of their sides.",
        items: [
            { id: 'A', text: "Octagon" },
            { id: 'B', text: "Triangle" },
            { id: 'C', text: "Hexagon" },
            { id: 'D', text: "Pentagon" }
        ],
        correctOrder: ['B', 'D', 'C', 'A']
    },
    {
        text: "Arrange these layers of the Earth's atmosphere starting from the surface moving upwards.",
        items: [
            { id: 'A', text: "Stratosphere" },
            { id: 'B', text: "Troposphere" },
            { id: 'C', text: "Exosphere" },
            { id: 'D', text: "Mesosphere" }
        ],
        correctOrder: ['B', 'A', 'D', 'C']
    },
    {
        text: "Arrange these famous scientists in chronological order of their birth.",
        items: [
            { id: 'A', text: "Albert Einstein" },
            { id: 'B', text: "Isaac Newton" },
            { id: 'C', text: "Stephen Hawking" },
            { id: 'D', text: "Galileo Galilei" }
        ],
        correctOrder: ['D', 'B', 'A', 'C']
    },
    {
        text: "Arrange these portable music storage devices in the order of their popular usage over time.",
        items: [
            { id: 'A', text: "MP3 Player" },
            { id: 'B', text: "Cassette Tape" },
            { id: 'C', text: "CD (Compact Disc)" },
            { id: 'D', text: "Gramophone Record" }
        ],
        correctOrder: ['D', 'B', 'C', 'A']
    },
    {
        text: "Arrange these words to form a common phrase related to filmmaking.",
        items: [
            { id: 'A', text: "ACTION" },
            { id: 'B', text: "LIGHTS" },
            { id: 'C', text: "CAMERA" },
            { id: 'D', text: "AND" }
        ],
        correctOrder: ['B', 'C', 'D', 'A']
    },
    {
        text: "Arrange these Roman Numerals in ascending order of their value.",
        items: [
            { id: 'A', text: "V" },
            { id: 'B', text: "L" },
            { id: 'C', text: "X" },
            { id: 'D', text: "C" }
        ],
        correctOrder: ['A', 'C', 'B', 'D']
    },
    {
        text: "Arrange these planets in increasing order of their distance from the Sun.",
        items: [
            { id: 'A', text: "Venus" },
            { id: 'B', text: "Mars" },
            { id: 'C', text: "Neptune" },
            { id: 'D', text: "Jupiter" }
        ],
        correctOrder: ['A', 'B', 'D', 'C']
    },
    {
        text: "Arrange these units of digital storage capacity from smallest to largest.",
        items: [
            { id: 'A', text: "Gigabyte (GB)" },
            { id: 'B', text: "Kilobyte (KB)" },
            { id: 'C', text: "Terabyte (TB)" },
            { id: 'D', text: "Megabyte (MB)" }
        ],
        correctOrder: ['B', 'D', 'A', 'C']
    },
    {
        text: "Arrange these stages of human life in chronological order.",
        items: [
            { id: 'A', text: "Adolescence" },
            { id: 'B', text: "Infancy" },
            { id: 'C', text: "Adulthood" },
            { id: 'D', text: "Childhood" }
        ],
        correctOrder: ['B', 'D', 'A', 'C']
    },
    {
        text: "Arrange these Tennis Grand Slam tournaments in the order they occur in a calendar year.",
        items: [
            { id: 'A', text: "Wimbledon" },
            { id: 'B', text: "US Open" },
            { id: 'C', text: "French Open" },
            { id: 'D', text: "Australian Open" }
        ],
        correctOrder: ['D', 'C', 'A', 'B']
    },
    {
        text: "Arrange these events from the life of Mahatma Gandhi in chronological order.",
        items: [
            { id: 'A', text: "The Dandi March" },
            { id: 'B', text: "The Non-Cooperation Movement" },
            { id: 'C', text: "Assassination" },
            { id: 'D', text: "The Quit India Movement" }
        ],
        correctOrder: ['B', 'A', 'D', 'C']
    },
    {
        text: "Arrange these geometric concepts by their dimensions (0D to 3D).",
        items: [
            { id: 'A', text: "Plane (Square)" },
            { id: 'B', text: "Solid (Cube)" },
            { id: 'C', text: "Point" },
            { id: 'D', text: "Line" }
        ],
        correctOrder: ['C', 'D', 'A', 'B']
    },
    {
        text: "Arrange these Prime Ministers of India in chronological order of their first term.",
        items: [
            { id: 'A', text: "Indira Gandhi" },
            { id: 'B', text: "Jawaharlal Nehru" },
            { id: 'C', text: "Narendra Modi" },
            { id: 'D', text: "Atal Bihari Vajpayee" }
        ],
        correctOrder: ['B', 'A', 'D', 'C']
    },
    {
        text: "Arrange these layers of the Earth from the surface to the center.",
        items: [
            { id: 'A', text: "Inner Core" },
            { id: 'B', text: "Mantle" },
            { id: 'C', text: "Crust" },
            { id: 'D', text: "Outer Core" }
        ],
        correctOrder: ['C', 'B', 'D', 'A']
    },
    {
        text: "Arrange these numerical quantities in ascending order of their value.",
        items: [
            { id: 'A', text: "One Score" },
            { id: 'B', text: "One Dozen" },
            { id: 'C', text: "One Gross" },
            { id: 'D', text: "One Baker's Dozen" }
        ],
        correctOrder: ['B', 'D', 'A', 'C']
    },
    {
        text: "Arrange these ranks of the Indian Army in ascending order of hierarchy.",
        items: [
            { id: 'A', text: "Major" },
            { id: 'B', text: "Captain" },
            { id: 'C', text: "Colonel" },
            { id: 'D', text: "Lieutenant" }
        ],
        correctOrder: ['D', 'B', 'A', 'C']
    },
    {
        text: "Arrange these chemical structures from smallest to largest complexity.",
        items: [
            { id: 'A', text: "Atom" },
            { id: 'B', text: "Proton" },
            { id: 'C', text: "Compound" },
            { id: 'D', text: "Molecule" }
        ],
        correctOrder: ['B', 'A', 'D', 'C']
    },
    {
        text: "Arrange these Indian state capitals from North to South.",
        items: [
            { id: 'A', text: "Mumbai" },
            { id: 'B', text: "Shimla" },
            { id: 'C', text: "Jaipur" },
            { id: 'D', text: "Srinagar" }
        ],
        correctOrder: ['D', 'B', 'C', 'A']
    },
    {
        text: "Arrange these standard playing cards in ascending order of rank (Ace high).",
        items: [
            { id: 'A', text: "King" },
            { id: 'B', text: "Jack" },
            { id: 'C', text: "Ace" },
            { id: 'D', text: "Queen" }
        ],
        correctOrder: ['B', 'D', 'A', 'C']
    },
    {
        text: "Arrange these social media platforms in the order of their launch.",
        items: [
            { id: 'A', text: "Instagram" },
            { id: 'B', text: "Facebook" },
            { id: 'C', text: "TikTok" },
            { id: 'D', text: "WhatsApp" }
        ],
        correctOrder: ['B', 'D', 'A', 'C']
    },
    {
        text: "Arrange these steps of the water cycle starting from water in the ocean.",
        items: [
            { id: 'A', text: "Precipitation (Rain)" },
            { id: 'B', text: "Condensation (Clouds)" },
            { id: 'C', text: "Evaporation" },
            { id: 'D', text: "Collection (Runoff)" }
        ],
        correctOrder: ['C', 'B', 'A', 'D']
    },
    {
        text: "Arrange these Marvel Cinematic Universe (Avengers) movies in order of their release.",
        items: [
            { id: 'A', text: "Avengers: Endgame" },
            { id: 'B', text: "The Avengers" },
            { id: 'C', text: "Avengers: Infinity War" },
            { id: 'D', text: "Avengers: Age of Ultron" }
        ],
        correctOrder: ['B', 'D', 'C', 'A']
    },
    {
        text: "Arrange these oceans in descending order of their area (Largest to Smallest).",
        items: [
            { id: 'A', text: "Indian Ocean" },
            { id: 'B', text: "Arctic Ocean" },
            { id: 'C', text: "Pacific Ocean" },
            { id: 'D', text: "Atlantic Ocean" }
        ],
        correctOrder: ['C', 'D', 'A', 'B']
    },
    {
        text: "Arrange these Dashavatars (Avatars of Vishnu) in their mythological chronological order.",
        items: [
            { id: 'A', text: "Narasimha (Lion-man)" },
            { id: 'B', text: "Matsya (Fish)" },
            { id: 'C', text: "Varaha (Boar)" },
            { id: 'D', text: "Kurma (Turtle)" }
        ],
        correctOrder: ['B', 'D', 'C', 'A']
    },
    {
        text: "Arrange these mobile network generations in the order they were introduced.",
        items: [
            { id: 'A', text: "4G" },
            { id: 'B', text: "2G" },
            { id: 'C', text: "5G" },
            { id: 'D', text: "3G" }
        ],
        correctOrder: ['B', 'D', 'A', 'C']
    },
];
