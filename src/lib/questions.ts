export interface Question {
    id: string;
    text: string;
    options: [string, string, string, string]; // A, B, C, D
    correctAnswer: 0 | 1 | 2 | 3;
    price: number;
    level: number; // 1-20
    hint?: string;
}

// Helper to easy create questions
const q = (id: string, level: number, price: number, text: string, options: [string, string, string, string], correctAnswer: 0 | 1 | 2 | 3, hint?: string): Question => ({
    id, level, price, text, options, correctAnswer, hint
});

export const QUESTION_POOL: Record<number, Question[]> = {
    // --- SEGMENT I: LINEAR GROWTH (Q1-Q5) ---
    // Ends at Milestone 1 (10,000)
    1: [
        // Indian History | Answer: B (1)
        q('q1_1', 1, 1000, "Which Mughal emperor is famous for building the Taj Mahal?",
            ["Aurangzeb", "Shah Jahan", "Akbar", "Humayun"],
            1, "He built it in memory of his wife, Mumtaz Mahal."),

        // World History | Answer: C (2)
        q('q1_2', 1, 1000, "Who was the very first President of the United States of America?",
            ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John F. Kennedy"],
            2, "His face appears on the US one-dollar bill."),

        // Geography | Answer: A (0)
        q('q1_3', 1, 1000, "Which is the longest river in India that flows entirely within the country?",
            ["Ganga", "Yamuna", "Brahmaputra", "Indus"],
            0, "It is considered the holiest river by Hindus."),

        // Indian Polity | Answer: C (2)
        q('q1_4', 1, 1000, "Who is popularly known as the 'Father of the Indian Constitution'?",
            ["Mahatma Gandhi", "Jawaharlal Nehru", "Dr. B.R. Ambedkar", "Sardar Patel"],
            2, "He was the Chairman of the Drafting Committee."),

        // Economics | Answer: B (1)
        q('q1_5', 1, 1000, "What does 'GST' stand for in the Indian taxation system?",
            ["General Sales Tax", "Goods and Services Tax", "Global Service Tax", "Government Sales Tax"],
            1, "It is a single tax on the supply of goods and services."),

        // Science and Technology | Answer: A (0)
        q('q1_6', 1, 1000, "Which planet in our solar system is known as the 'Red Planet'?",
            ["Mars", "Venus", "Jupiter", "Saturn"],
            0, "Elon Musk’s SpaceX is planning to send humans here."),

        // Biology | Answer: D (3)
        q('q1_7', 1, 1000, "Which gas do humans primarily release when they exhale?",
            ["Oxygen", "Hydrogen", "Helium", "Carbon Dioxide"],
            3, "Plants absorb this gas to perform photosynthesis."),

        // Current Affairs | Answer: B (1)
        q('q1_8', 1, 1000, "Who is the current Prime Minister of India (as of 2024)?",
            ["Amit Shah", "Narendra Modi", "Rahul Gandhi", "Yogi Adityanath"],
            1, "He previously served as the Chief Minister of Gujarat."),

        // Sports and Games | Answer: C (2)
        q('q1_9', 1, 1000, "With which sport is the legend Sachin Tendulkar associated?",
            ["Hockey", "Football", "Cricket", "Tennis"],
            2, "He is known as the 'God of Cricket' in India."),

        // Arts and Culture | Answer: D (3)
        q('q1_10', 1, 1000, "'Bhangra' is a famous high-energy folk dance of which Indian state?",
            ["Kerala", "Gujarat", "Rajasthan", "Punjab"],
            3, "This state is known for its five rivers and the Golden Temple."),

        // Literature | Answer: A (0)
        q('q1_11', 1, 1000, "Who wrote India’s national anthem, 'Jana Gana Mana'?",
            ["Rabindranath Tagore", "Bankim Chandra Chatterjee", "Sarojini Naidu", "Munshi Premchand"],
            0, "He was the first Asian to win a Nobel Prize."),

        // Film and Entertainment | Answer: C (2)
        q('q1_12', 1, 1000, "In the classic movie 'Sholay', what was the name of the dacoit villain?",
            ["Mogambo", "Shakaal", "Gabbar Singh", "Kancha Cheena"],
            2, "He asked the famous question, 'Kitne aadmi the?'"),

        // World Capitals | Answer: D (3)
        q('q1_13', 1, 1000, "What is the capital city of France?",
            ["London", "Berlin", "Rome", "Paris"],
            3, "This city is home to the famous Eiffel Tower."),

        // Flags, Currencies and Symbols | Answer: A (0)
        q('q1_14', 1, 1000, "How many spokes are there in the Ashoka Chakra on the Indian national flag?",
            ["24", "20", "12", "50"],
            0, "It represents the wheel of dharma or law."),

        // Mythology | Answer: B (1)
        q('q1_15', 1, 1000, "In the epic Ramayana, who was the wife of Lord Rama?",
            ["Draupadi", "Sita", "Radha", "Parvati"],
            1, "She was the princess of Mithila and daughter of King Janaka."),

        // Mathematics | Answer: D (3)
        q('q1_16', 1, 1000, "What is the result when you multiply 5 by 9?",
            ["40", "54", "35", "45"],
            3, "It is 5 less than 50."),

        // Environment | Answer: B (1)
        q('q1_17', 1, 1000, "Which of the following is considered a source of renewable energy?",
            ["Coal", "Solar Energy", "Petroleum", "Natural Gas"],
            1, "We get this energy directly from the sun rays."),

        // Famous Personalities | Answer: A (0)
        q('q1_18', 1, 1000, "Who is famously known as the 'Missile Man of India'?",
            ["Dr. A.P.J. Abdul Kalam", "C.V. Raman", "Homi J. Bhabha", "Vikram Sarabhai"],
            0, "He also served as the 11th President of India."),

        // Inventions | Answer: C (2)
        q('q1_19', 1, 1000, "Who is credited with the invention of the telephone?",
            ["Thomas Edison", "Isaac Newton", "Alexander Graham Bell", "Albert Einstein"],
            2, "His last name sounds like something that rings."),

        // General Trivia | Answer: D (3)
        q('q1_20', 1, 1000, "Which fruit is known as the 'King of Fruits' in India?",
            ["Apple", "Banana", "Grapes", "Mango"],
            3, "It is a yellow, juicy fruit popular in the summer season.")
    ],
    2: [
        // Indian History | Answer: C (2)
        q('q2_1', 2, 2000, "Which iconic monument in Delhi was built by Shah Jahan from red sandstone?",
            ["Qutb Minar", "India Gate", "Red Fort", "Humayun's Tomb"],
            2, "The Prime Minister hoists the national flag here on Independence Day."),

        // World History | Answer: B (1)
        q('q2_2', 2, 2000, "Which ancient civilization is famous for constructing the Pyramids and the Sphinx?",
            ["Roman", "Egyptian", "Mayan", "Greek"],
            1, "This civilization flourished along the banks of the River Nile."),

        // Geography | Answer: C (2)
        q('q2_3', 2, 2000, "Which is the smallest state in India by area?",
            ["Sikkim", "Tripura", "Goa", "Manipur"],
            2, "It is a famous beach destination located on the western coast of India."),

        // Indian Polity | Answer: C (2)
        q('q2_4', 2, 2000, "Who was the first woman President of India?",
            ["Indira Gandhi", "Sarojini Naidu", "Pratibha Patil", "Sushma Swaraj"],
            2, "She served as the 12th President from 2007 to 2012."),

        // Economics | Answer: A (0)
        q('q2_5', 2, 2000, "What is the full form of 'ATM' commonly used in banking?",
            ["Automated Teller Machine", "Any Time Money", "All Time Money", "Auto Truck Machine"],
            0, "It is a machine that allows you to withdraw cash without a human teller."),

        // Science and Technology | Answer: B (1)
        q('q2_6', 2, 2000, "Which gas do plants primarily absorb from the atmosphere during photosynthesis?",
            ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
            1, "It is the same gas that humans exhale while breathing."),

        // Biology | Answer: C (2)
        q('q2_7', 2, 2000, "Which is the largest external organ of the human body?",
            ["Liver", "Heart", "Skin", "Brain"],
            2, "It covers your entire body and protects it from the outside world."),

        // Current Affairs | Answer: D (3)
        q('q2_8', 2, 2000, "As of 2024, which city serves as the location for the new Parliament building of India?",
            ["Mumbai", "Kolkata", "Gandhinagar", "New Delhi"],
            3, "It is the national capital of India."),

        // Sports and Games | Answer: B (1)
        q('q2_9', 2, 2000, "In Chess, what is the term used when a King is under direct attack and cannot escape?",
            ["Stalemate", "Checkmate", "Castling", "En Passant"],
            1, "It means the game is officially over."),

        // Arts and Culture | Answer: C (2)
        q('q2_10', 2, 2000, "Which Indian state is famously known for the 'Garba' dance?",
            ["Tamil Nadu", "Kerala", "Gujarat", "Punjab"],
            2, "It is performed heavily during the Navratri festival."),

        // Literature | Answer: C (2)
        q('q2_11', 2, 2000, "Who is the author of the famous Hindi novel 'Godan'?",
            ["Rabindranath Tagore", "R.K. Narayan", "Munshi Premchand", "Chetan Bhagat"],
            2, "He is a legendary writer known for stories about rural India, such as 'Idgah'."),

        // Film and Entertainment | Answer: D (3)
        q('q2_12', 2, 2000, "In the movie 'Mr. India', what was the name of the iconic villain played by Amrish Puri?",
            ["Shakaal", "Gabbar Singh", "Bhallaladeva", "Mogambo"],
            3, "His famous catchphrase ends with '...khush hua'."),

        // World Capitals | Answer: C (2)
        q('q2_13', 2, 2000, "What is the capital city of Japan?",
            ["Beijing", "Seoul", "Tokyo", "Bangkok"],
            2, "This city hosted the 2020 Summer Olympics."),

        // Flags, Currencies and Symbols | Answer: C (2)
        q('q2_14', 2, 2000, "What color is the bottom band of the Indian National Flag?",
            ["Saffron", "White", "Green", "Blue"],
            2, "It represents the fertility, growth, and auspiciousness of the land."),

        // Mythology | Answer: D (3)
        q('q2_15', 2, 2000, "In the Ramayana, who was the devoted younger brother who accompanied Lord Rama into exile?",
            ["Bharata", "Shatrughna", "Sugriva", "Lakshmana"],
            3, "He was the twin brother of Shatrughna."),

        // Mathematics | Answer: D (3)
        q('q2_16', 2, 2000, "If you buy 3 dozen bananas, how many bananas do you have in total?",
            ["12", "24", "30", "36"],
            3, "One dozen is equal to 12 items."),

        // Environment | Answer: A (0)
        q('q2_17', 2, 2000, "Which animal is famously known as the 'Ship of the Desert'?",
            ["Camel", "Elephant", "Horse", "Yak"],
            0, "It has a hump and can survive for days without water in hot sands."),

        // Famous Personalities | Answer: B (1)
        q('q2_18', 2, 2000, "Which famous Indian athlete is known as the 'Flying Sikh'?",
            ["Dhyan Chand", "Milkha Singh", "P.T. Usha", "Neeraj Chopra"],
            1, "He was a track and field sprinter who narrowly missed bronze in the 1960 Olympics."),

        // Inventions | Answer: C (2)
        q('q2_19', 2, 2000, "Who invented the first practical incandescent light bulb?",
            ["Nikola Tesla", "Alexander Graham Bell", "Thomas Edison", "Albert Einstein"],
            2, "He is also famous for the phonograph."),

        // General Trivia | Answer: D (3)
        q('q2_20', 2, 2000, "Which of these is the primary ingredient in the popular Indian dish 'Dal'?",
            ["Rice", "Wheat", "Potato", "Lentils"],
            3, "It is a source of protein found in varieties like Moong, Masoor, and Arhar.")
    ],
    3: [
        // Indian History | Answer: A (0)
        q('q3_1', 3, 3000, "Which famous monument in Delhi features the Iron Pillar that remarkably hasn't rusted for centuries?",
            ["Qutb Minar Complex", "Red Fort", "Humayun's Tomb", "Lotus Temple"],
            0, "It is a towering minaret built by Qutb-ud-din Aibak."),

        // World History | Answer: C (2)
        q('q3_2', 3, 3000, "Who was the first Prime Minister of independent India?",
            ["Mahatma Gandhi", "Sardar Patel", "Jawaharlal Nehru", "Lal Bahadur Shastri"],
            2, "Children lovingly referred to him as 'Chacha'."),

        // Geography | Answer: C (2)
        q('q3_3', 3, 3000, "Which major latitude line passes through the middle of India, crossing eight states?",
            ["Equator", "Arctic Circle", "Tropic of Cancer", "Tropic of Capricorn"],
            2, "It is located at 23.5 degrees North of the Equator."),

        // Indian Polity | Answer: C (2)
        q('q3_4', 3, 3000, "In the Indian judicial system, which is the highest court of appeal?",
            ["High Court", "District Court", "Supreme Court", "Session Court"],
            2, "It is located in New Delhi on Tilak Marg."),

        // Economics | Answer: A (0)
        q('q3_5', 3, 3000, "Which institution is known as the central bank of India and issues currency notes?",
            ["Reserve Bank of India (RBI)", "State Bank of India (SBI)", "Ministry of Finance", "NITI Aayog"],
            0, "Its headquarters are located in Mumbai and it governs monetary policy."),

        // Science and Technology | Answer: B (1)
        q('q3_6', 3, 3000, "Which famous scientist developed the theory of relativity (E=mc²)?",
            ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
            1, "He won the Nobel Prize in Physics in 1921."),

        // Biology | Answer: D (3)
        q('q3_7', 3, 3000, "Which of these is NOT a sense organ in the human body?",
            ["Skin", "Eyes", "Ears", "Heart"],
            3, "This organ's primary job is to pump blood."),

        // Current Affairs | Answer: D (3)
        q('q3_8', 3, 3000, "In 2023, which country became the fourth nation to successfully land a spacecraft on the Moon?",
            ["Japan", "Israel", "France", "India"],
            3, "The successful mission was named Chandrayaan-3."),

        // Sports and Games | Answer: B (1)
        q('q3_9', 3, 3000, "In Football (Soccer), what is the rule called when an attacking player is closer to the opponent's goal line than both the ball and the second-last opponent?",
            ["Corner Kick", "Offside", "Handball", "Throw-in"],
            1, "It prevents 'cherry-picking' near the goal."),

        // Arts and Culture | Answer: A (0)
        q('q3_10', 3, 3000, "Bharatanatyam is a classical dance form that originated in which Indian state?",
            ["Tamil Nadu", "Kerala", "Karnataka", "Odisha"],
            0, "It is the oldest classical dance tradition in India."),

        // Literature | Answer: C (2)
        q('q3_11', 3, 3000, "Who wrote the classic high-fantasy series 'The Lord of the Rings'?",
            ["J.K. Rowling", "George R.R. Martin", "J.R.R. Tolkien", "C.S. Lewis"],
            2, "He was a professor at Oxford and created languages like Elvish."),

        // Film and Entertainment | Answer: D (3)
        q('q3_12', 3, 3000, "Who directed the Indian blockbuster film 'Baahubali: The Beginning'?",
            ["Mani Ratnam", "Karan Johar", "Rohit Shetty", "S.S. Rajamouli"],
            3, "He also directed the Oscar-winning film 'RRR'."),

        // World Capitals | Answer: D (3)
        q('q3_13', 3, 3000, "What is the capital city of Canada?",
            ["Toronto", "Vancouver", "Montreal", "Ottawa"],
            3, "It is located in the province of Ontario."),

        // Flags, Currencies and Symbols | Answer: B (1)
        q('q3_14', 3, 3000, "According to official guidelines, what is the approximate playing time of the full version of the Indian National Anthem?",
            ["42 seconds", "52 seconds", "60 seconds", "65 seconds"],
            1, "It is just under one minute."),

        // Mythology | Answer: C (2)
        q('q3_15', 3, 3000, "In the Ramayana, who was the vulture king that fought Ravana to try and rescue Sita?",
            ["Garuda", "Sampati", "Jatayu", "Maricha"],
            2, "He was an old friend of King Dasharatha."),

        // Mathematics | Answer: B (1)
        q('q3_16', 3, 3000, "A number that is only divisible by 1 and itself is known as what kind of number?",
            ["Even number", "Prime number", "Composite number", "Rational number"],
            1, "Examples include 2, 3, 5, 7, and 11."),

        // Environment | Answer: B (1)
        q('q3_17', 3, 3000, "Which layer of the atmosphere protects life on Earth by absorbing harmful ultraviolet (UV) radiation from the sun?",
            ["Troposphere", "Ozone Layer", "Mesosphere", "Exosphere"],
            1, "Chlorofluorocarbons (CFCs) were famously creating a hole in it."),

        // Famous Personalities | Answer: B (1)
        q('q3_18', 3, 3000, "Who is popularly known as the 'Iron Man of India'?",
            ["Subhas Chandra Bose", "Sardar Vallabhbhai Patel", "Bhagat Singh", "Jawaharlal Nehru"],
            1, "The 'Statue of Unity' in Gujarat is dedicated to him."),

        // Inventions | Answer: C (2)
        q('q3_19', 3, 3000, "The Wright Brothers are famous for inventing and building the world's first successful what?",
            ["Car", "Train", "Airplane", "Submarine"],
            2, "Their first historic flight took place at Kitty Hawk in 1903."),

        // General Trivia | Answer: D (3)
        q('q3_20', 3, 3000, "Which of these is a primary ingredient in the popular Indian dish 'Dal Makhani'?",
            ["Chicken", "Fish", "Potatoes", "Black Lentils (Urad)"],
            3, "The dish is creamy, buttery, and made with 'Kaali Dal'.")
    ],
    4: [
        // Indian History | Answer: B (1)
        q('q4_1', 4, 5000, "Which Mauryan emperor famously renounced war after witnessing the bloodshed of the Battle of Kalinga?",
            ["Khufu", "Ashoka", "Bindusara", "Kanishka"],
            1, "He is associated with the Lion Capital at Sarnath."),

        // World History | Answer: A (0)
        q('q4_2', 4, 5000, "The Great Pyramid of Giza was built as a tomb for which Egyptian pharaoh?",
            ["Khufu", "Tutankhamun", "Ramses II", "Cleopatra"],
            0, "His name is often known as Cheops in Greek."),

        // Geography | Answer: C (2)
        q('q4_3', 4, 5000, "Which major Indian river is often referred to as the 'Dakshin Ganga' or Ganges of the South?",
            ["Krishna", "Kaveri", "Godavari", "Narmada"],
            2, "It is the longest river in peninsular India."),

        // Indian Polity | Answer: C (2)
        q('q4_4', 4, 5000, "What is the minimum age requirement to become the President of India?",
            ["25 years", "30 years", "35 years", "40 years"],
            2, "You must be older than 30 to hold this office."),

        // Economics | Answer: A (0)
        q('q4_5', 4, 5000, "Which animal is the primary figure in the 'Make in India' campaign logo?",
            ["Lion", "Tiger", "Elephant", "Peacock"],
            0, "The logo depicts a mechanical version of the 'King of the Jungle'."),

        // Science and Technology | Answer: B (1)
        q('q4_6', 4, 5000, "ISRO's historic 'Mangalyaan' mission was sent to orbit which planet?",
            ["Venus", "Mars", "Jupiter", "Saturn"],
            1, "This planet is widely known as the 'Red Planet'."),

        // Biology | Answer: C (2)
        q('q4_7', 4, 5000, "Which component of human blood is primarily responsible for clotting to stop bleeding?",
            ["Red Blood Cells", "White Blood Cells", "Platelets", "Plasma"],
            2, "Their name suggests they are like small 'plates' that patch up wounds."),

        // Current Affairs | Answer: C (2)
        q('q4_8', 4, 5000, "Which city served as the host for the 2024 Summer Olympic Games?",
            ["Los Angeles", "Tokyo", "Paris", "Brisbane"],
            2, "It is the European capital city home to the Eiffel Tower."),

        // Sports and Games | Answer: A (0)
        q('q4_9', 4, 5000, "How many players are there in a standard Basketball team on the court at one time?",
            ["5", "7", "9", "11"],
            0, "It is half the number of a standard soccer team."),

        // Arts and Culture | Answer: B (1)
        q('q4_10', 4, 5000, "Kuchipudi is a classical Indian dance drama that originated in which state?",
            ["Kerala", "Andhra Pradesh", "Odisha", "Tamil Nadu"],
            1, "The dance derives its name from a village in the Krishna district."),

        // Literature | Answer: B (1)
        q('q4_11', 4, 5000, "Sir Arthur Conan Doyle is the author who created which famous fictional detective?",
            ["Hercule Poirot", "Sherlock Holmes", "James Bond", "Miss Marple"],
            1, "This detective lived at 221B Baker Street in London."),

        // Film and Entertainment | Answer: D (3)
        q('q4_12', 4, 5000, "Who directed the iconic dinosaur film 'Jurassic Park' released in 1993?",
            ["James Cameron", "George Lucas", "Christopher Nolan", "Steven Spielberg"],
            3, "He also directed 'E.T.' and 'Jaws'."),

        // World Capitals | Answer: C (2)
        q('q4_13', 4, 5000, "What is the capital city of Italy?",
            ["Venice", "Milan", "Rome", "Florence"],
            2, "It is home to the Colosseum."),

        // Flags, Currencies and Symbols | Answer: D (3)
        q('q4_14', 4, 5000, "Which country's national flag features a red circle on a plain white background?",
            ["Bangladesh", "Palau", "South Korea", "Japan"],
            3, "This nation is poetically known as the 'Land of the Rising Sun'."),

        // Mythology | Answer: C (2)
        q('q4_15', 4, 5000, "In Hindu mythology, who is the father of Lord Hanuman?",
            ["Surya", "Agni", "Vayu", "Indra"],
            2, "He is the Hindu deity of the wind."),

        // Mathematics | Answer: B (1)
        q('q4_16', 4, 5000, "In geometry, how many degrees make up a right angle?",
            ["45 degrees", "90 degrees", "180 degrees", "360 degrees"],
            1, "It is the angle found at the corner of a perfect square."),

        // Environment | Answer: C (2)
        q('q4_17', 4, 5000, "During photosynthesis, plants release which gas into the atmosphere as a byproduct?",
            ["Carbon Dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
            2, "It is the gas required by humans to breathe."),

        // Famous Personalities | Answer: D (3)
        q('q4_18', 4, 5000, "Who is the co-founder of Microsoft and a leading global philanthropist?",
            ["Steve Jobs", "Elon Musk", "Jeff Bezos", "Bill Gates"],
            3, "He was the richest person in the world for many years in the 1990s and 2000s."),

        // Inventions | Answer: B (1)
        q('q4_19', 4, 5000, "Who invented the first mechanical computer, often called the 'Analytical Engine'?",
            ["Alan Turing", "Charles Babbage", "John von Neumann", "Steve Wozniak"],
            1, "He is widely considered the 'Father of the Computer'."),

        // General Trivia | Answer: B (1)
        q('q4_20', 4, 5000, "Which is the only month of the year that can have fewer than 30 days?",
            ["January", "February", "June", "December"],
            1, "In a leap year, this month has 29 days.")
    ],
    5: [
        // Indian History | Answer: C (2)
        q('q5_1', 5, 10000, "Who was the first Governor-General of independent India?",
            ["C. Rajagopalachari", "Rajendra Prasad", "Lord Mountbatten", "Vallabhbhai Patel"],
            2, "He was also the last Viceroy of India before independence."),

        // World History | Answer: A (0)
        q('q5_2', 5, 10000, "The storming of the Bastille prison is associated with which major historical revolution?",
            ["French Revolution", "Russian Revolution", "American Revolution", "Industrial Revolution"],
            0, "This event took place in Paris in 1789."),

        // Geography | Answer: B (1)
        q('q5_3', 5, 10000, "Which imaginary line passes almost through the middle of India?",
            ["Equator", "Tropic of Cancer", "Tropic of Capricorn", "Prime Meridian"],
            1, "It passes through 8 Indian states, including Gujarat and West Bengal."),

        // Indian Polity | Answer: C (2)
        q('q5_4', 5, 10000, "Who appoints the Chief Justice of India?",
            ["The Prime Minister", "The Law Minister", "The President of India", "The Parliament"],
            2, "This official is the ceremonial head of state in India."),

        // Economics | Answer: B (1)
        q('q5_5', 5, 10000, "The terms 'Bull' and 'Bear' are most commonly associated with which commercial sector?",
            ["Agriculture", "Stock Market", "Real Estate", "Banking"],
            1, "One animal signifies rising prices, and the other signifies falling prices."),

        // Science and Technology | Answer: D (3)
        q('q5_6', 5, 10000, "What is the hardest naturally occurring substance found on Earth?",
            ["Gold", "Iron", "Platinum", "Diamond"],
            3, "It is an allotrope of carbon and is famously used in jewelry."),

        // Biology | Answer: A (0)
        q('q5_7', 5, 10000, "In the human body, the 'stapes', which is the smallest bone, is found in which organ?",
            ["Ear", "Nose", "Finger", "Toe"],
            0, "It is located in the middle part of this organ, helping transmit sound vibrations."),

        // Current Affairs | Answer: C (2)
        q('q5_8', 5, 10000, "What phenomenon is the primary cause of 'Acid Rain'?",
            ["Deforestation", "Ozone Depletion", "Sulfur Dioxide emissions", "Plastic Pollution"],
            2, "It occurs when factories release high amounts of sulfur and nitrogen oxides."),

        // Sports and Games | Answer: B (1)
        q('q5_9', 5, 10000, "In Cricket, what is the penalty delivery given to the batting side when a bowler bowls a 'No Ball'?",
            ["Dead Ball", "Free Hit", "Wide Ball", "Bouncer"],
            1, "During this delivery, the batsman cannot be dismissed caught or bowled."),

        // Arts and Culture | Answer: B (1)
        q('q5_10', 5, 10000, "The traditional 'Odissi' dance is native to which Indian state?",
            ["West Bengal", "Odisha", "Jharkhand", "Chhattisgarh"],
            1, "The name of the state is practically in the name of the dance."),

        // Literature | Answer: C (2)
        q('q5_11', 5, 10000, "Who is the author of the famous fictional town of 'Malgudi' in his stories?",
            ["Ruskin Bond", "Mulk Raj Anand", "R.K. Narayan", "Chetan Bhagat"],
            2, "He wrote the famous collection of short stories titled 'Malgudi Days'."),

        // Film and Entertainment | Answer: C (2)
        q('q5_12', 5, 10000, "Which Indian director made the Oscar-nominated film 'Lagaan'?",
            ["Sanjay Leela Bhansali", "Karan Johar", "Ashutosh Gowariker", "Rajkumar Hirani"],
            2, "He also directed the film 'Jodhaa Akbar' and 'Swades'."),

        // World Capitals | Answer: A (0)
        q('q5_13', 5, 10000, "What is the capital city of Egypt?",
            ["Cairo", "Nairobi", "Cape Town", "Tehran"],
            0, "It is situated near the famous Pyramids of Giza."),

        // Flags, Currencies and Symbols | Answer: C (2)
        q('q5_14', 5, 10000, "The 'Pound Sterling' is the official currency of which country?",
            ["Germany", "Australia", "United Kingdom", "Canada"],
            2, "The central bank that issues it is based in London."),

        // Mythology | Answer: C (2)
        q('q5_15', 5, 10000, "In the Ramayana, who was the mother of Bharata?",
            ["Kausalya", "Sumitra", "Kaikeyi", "Urmila"],
            2, "She asked King Dasharatha for two boons that led to Rama's exile."),

        // Mathematics | Answer: C (2)
        q('q5_16', 5, 10000, "A triangle with all three sides of equal length is called an ________ triangle.",
            ["Isosceles", "Scalene", "Equilateral", "Right-angled"],
            2, "All of its internal angles measure exactly 60 degrees."),

        // Environment | Answer: D (3)
        q('q5_17', 5, 10000, "Which major gas makes up approximately 78% of the Earth's atmosphere?",
            ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"],
            3, "It is an inert gas commonly used in fertilizer."),

        // Famous Personalities | Answer: B (1)
        q('q5_18', 5, 10000, "Who was the legendary freedom fighter known as 'Lokmanya'?",
            ["Bipin Chandra Pal", "Bal Gangadhar Tilak", "Lala Lajpat Rai", "Gopal Krishna Gokhale"],
            1, "He famously said, 'Swaraj is my birthright and I shall have it'."),

        // Inventions | Answer: B (1)
        q('q5_19', 5, 10000, "Who is credited with inventing the radio?",
            ["Alexander Graham Bell", "Guglielmo Marconi", "Thomas Edison", "Nikola Tesla"],
            1, "He was an Italian inventor known for his pioneering work on long-distance transmission."),

        // General Trivia | Answer: D (3)
        q('q5_20', 5, 10000, "In a standard deck of playing cards, which King is the only one without a moustache?",
            ["King of Spades", "King of Clubs", "King of Diamonds", "King of Hearts"],
            3, "This King is sometimes referred to as the 'Suicide King'.")
    ],
    // --- SEGMENT II: QUADRATIC GROWTH (Q6-Q10) ---
    // Ends at Milestone 2 (3,20,000)
    6: [
        // Indian History | Answer: D (3)
        q('q6_1', 6, 20000, "Which battle fought in 1757 marked the beginning of British political rule in India?",
            ["Battle of Panipat", "Battle of Haldighati", "Battle of Buxar", "Battle of Plassey"],
            3, "It was fought between the British East India Company and Siraj-ud-Daulah."),

        // World History | Answer: A (0)
        q('q6_2', 6, 20000, "Which country gifted the 'Statue of Liberty' to the United States in 1886?",
            ["France", "United Kingdom", "Spain", "Germany"],
            0, "This European country was a key ally during the American Revolutionary War."),

        // Geography | Answer: D (3)
        q('q6_3', 6, 20000, "Which imaginary line of latitude divides India into almost two equal halves?",
            ["Equator", "Tropic of Capricorn", "Arctic Circle", "Tropic of Cancer"],
            3, "This line passes through eight Indian states, including Gujarat and West Bengal."),

        // Indian Polity | Answer: A (0)
        q('q6_4', 6, 20000, "Who among the following is the ex-officio Chairman of the Rajya Sabha?",
            ["Vice President of India", "Prime Minister", "President of India", "Speaker of Lok Sabha"],
            0, "This person is the second-highest constitutional authority in India."),

        // Economics | Answer: D (3)
        q('q6_5', 6, 20000, "Which regulatory body in India is responsible for overseeing the insurance sector?",
            ["SEBI", "RBI", "NABARD", "IRDAI"],
            3, "Its full name includes 'Insurance Regulatory and Development Authority'."),

        // Science and Technology | Answer: D (3)
        q('q6_6', 6, 20000, "Which planet in our solar system is famous for having the most prominent and visible ring system?",
            ["Jupiter", "Uranus", "Neptune", "Saturn"],
            3, "It is the sixth planet from the Sun."),

        // Biology | Answer: A (0)
        q('q6_7', 6, 20000, "Which organ of the human body is primarily affected by the disease Jaundice?",
            ["Liver", "Heart", "Lungs", "Kidney"],
            0, "It is the largest internal organ and produces bile."),

        // Current Affairs | Answer: D (3)
        q('q6_8', 6, 20000, "In April 2023, which country officially became the 31st member of NATO?",
            ["Sweden", "Ukraine", "Spain", "Finland"],
            3, "A Nordic country that shares a long border with Russia."),

        // Sports and Games | Answer: A (0)
        q('q6_9', 6, 20000, "Who defeated India in the final to win the 2023 ICC Men's Cricket World Cup?",
            ["Australia", "England", "New Zealand", "South Africa"],
            0, "This team wears yellow jerseys and has won the ODI World Cup six times."),

        // Arts and Culture | Answer: B (1)
        q('q6_10', 6, 20000, "The traditional 'Warli' folk painting originated in which Indian state?",
            ["Bihar", "Maharashtra", "Rajasthan", "Madhya Pradesh"],
            1, "It is created mostly by tribal people from the North Sahyadri Range."),

        // Literature | Answer: D (3)
        q('q6_11', 6, 20000, "Who is the author of the classic Hindi novel 'Godan'?",
            ["Ramdhari Singh Dinkar", "Rabindranath Tagore", "Nirala", "Munshi Premchand"],
            3, "He is known as 'Upanyas Samrat' and his real name was Dhanpat Rai."),

        // Film and Entertainment | Answer: C (2)
        q('q6_12', 6, 20000, "Released in 1931, which was the very first 'talkie' (sound film) of India?",
            ["Raja Harishchandra", "Kisan Kanya", "Alam Ara", "Mother India"],
            2, "It was directed by Ardeshir Irani."),

        // World Capitals | Answer: B (1)
        q('q6_13', 6, 20000, "Thimphu is the capital city of which neighboring country of India?",
            ["Nepal", "Bhutan", "Myanmar", "Sri Lanka"],
            1, "Known as the 'Land of the Thunder Dragon'."),

        // Flags, Currencies and Symbols | Answer: A (0)
        q('q6_14', 6, 20000, "The 'Ruble' is the official currency of which massive nation?",
            ["Russia", "China", "Saudi Arabia", "Turkey"],
            0, "This country is the largest in the world by landmass."),

        // Mythology | Answer: B (1)
        q('q6_15', 6, 20000, "In the Mahabharata, who was the mother of Bhishma Pitamah?",
            ["Kunti", "Ganga", "Satyavati", "Gandhari"],
            1, "She is the personification of a holy river in northern India."),

        // Mathematics | Answer: C (2)
        q('q6_16', 6, 20000, "What is the approximate mathematical value of 'Pi' (π) up to two decimal places?",
            ["3.12", "3.16", "3.14", "3.18"],
            2, "March 14th is celebrated globally as the day for this number."),

        // Environment | Answer: C (2)
        q('q6_17', 6, 20000, "Gir National Park in Gujarat is the only natural habitat in the world for which animal?",
            ["Bengal Tiger", "One-horned Rhino", "Asiatic Lion", "Snow Leopard"],
            2, "This animal is known as the 'King of the Jungle'."),

        // Famous Personalities | Answer: B (1)
        q('q6_18', 6, 20000, "Which poet is famously remembered as the 'Nightingale of India' (Bharat Kokila)?",
            ["Lata Mangeshkar", "Sarojini Naidu", "MS Subbulakshmi", "Amrita Pritam"],
            1, "She was the first Indian woman to become the President of the Indian National Congress."),

        // Inventions | Answer: B (1)
        q('q6_19', 6, 20000, "Alexander Fleming is famously credited with discovering which life-saving antibiotic?",
            ["Insulin", "Penicillin", "Aspirin", "Paracetamol"],
            1, "He discovered it from a mold growing in a petri dish."),

        // General Trivia | Answer: C (2)
        q('q6_20', 6, 20000, "On which date is the 'International Day of Yoga' celebrated globally every year?",
            ["June 5", "July 1", "June 21", "May 31"],
            2, "This date is usually the longest day of the year in the Northern Hemisphere.")
    ],
    7: [
        // Indian History | Answer: A (0)
        q('q7_1', 7, 40000, "Which Mauryan emperor famously renounced war and embraced Buddhism after the Kalinga War?",
            ["Ashoka", "Chandragupta Maurya", "Bindusara", "Samudragupta"],
            0, "He is associated with the Lion Capital at Sarnath."),

        // World History | Answer: B (1)
        q('q7_2', 7, 40000, "The storming of which prison fortress in 1789 marked the beginning of the French Revolution?",
            ["Versailles", "Bastille", "Alcatraz", "Tower of London"],
            1, "It was located in Paris and symbolized royal tyranny."),

        // Geography | Answer: C (2)
        q('q7_3', 7, 40000, "Which major line of latitude passes through the middle of India, dividing it into two halves?",
            ["Equator", "Arctic Circle", "Tropic of Cancer", "Tropic of Capricorn"],
            2, "This line is at 23.5 degrees North."),

        // Indian Polity | Answer: D (3)
        q('q7_4', 7, 40000, "Who serves as the ex-officio Chairman of the Rajya Sabha in the Indian Parliament?",
            ["The Prime Minister", "The President", "The Speaker", "The Vice President"],
            3, "This person is the second-highest constitutional official in India."),

        // Economics | Answer: A (0)
        q('q7_5', 7, 40000, "'Sensex', the benchmark index of the Indian stock market, represents top companies listed on which exchange?",
            ["BSE (Bombay Stock Exchange)", "NSE (National Stock Exchange)", "NASDAQ", "NYSE"],
            0, "It is the oldest stock exchange in Asia, located on Dalal Street."),

        // Science and Technology | Answer: B (1)
        q('q7_6', 7, 40000, "What is the normal resting temperature of the human body in degrees Celsius?",
            ["35°C", "37°C", "39°C", "41°C"],
            1, "In Fahrenheit, it is approximately 98.6°F."),

        // Biology | Answer: C (2)
        q('q7_7', 7, 40000, "Which organ in the human body is primarily responsible for filtering waste products from the blood to form urine?",
            ["Liver", "Heart", "Kidney", "Lung"],
            2, "Humans typically have two of these bean-shaped organs."),

        // Current Affairs | Answer: D (3)
        q('q7_8', 7, 40000, "Who was named TIME Magazine's 'Person of the Year' for 2023?",
            ["Volodymyr Zelensky", "Elon Musk", "Joe Biden", "Taylor Swift"],
            3, "She is a global pop superstar known for her 'Eras Tour'."),

        // Sports and Games | Answer: A (0)
        q('q7_9', 7, 40000, "Which country won the ICC Men's T20 World Cup in 2024?",
            ["India", "South Africa", "Australia", "England"],
            0, "The final match was played in Barbados against South Africa."),

        // Arts and Culture | Answer: B (1)
        q('q7_10', 7, 40000, "The famous 'Tanjore painting', known for its gold foil work, originated in which Indian state?",
            ["Karnataka", "Tamil Nadu", "Andhra Pradesh", "Kerala"],
            1, "The city of Thanjavur is located in this southern state."),

        // Literature | Answer: C (2)
        q('q7_11', 7, 40000, "Who is the author of the Booker Prize-winning novel 'The God of Small Things'?",
            ["Kiran Desai", "Salman Rushdie", "Arundhati Roy", "Vikram Seth"],
            2, "She is also known for her political activism and essays."),

        // Film and Entertainment | Answer: B (1)
        q('q7_12', 7, 40000, "Which Indian song won the Academy Award (Oscar) for Best Original Song in 2023?",
            ["Jai Ho", "Naatu Naatu", "Vande Mataram", "Chaiyya Chaiyya"],
            1, "It was composed by M. M. Keeravani for the film 'RRR'."),

        // World Capitals | Answer: C (2)
        q('q7_13', 7, 40000, "What is the capital city of Brazil?",
            ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
            2, "It is a planned city, inaugurated as the capital in 1960."),

        // Flags, Currencies and Symbols | Answer: C (2)
        q('q7_14', 7, 40000, "The 'Rand' is the official currency of which African nation?",
            ["Kenya", "Nigeria", "South Africa", "Egypt"],
            2, "This country has three capital cities: Pretoria, Cape Town, and Bloemfontein."),

        // Mythology | Answer: C (2)
        q('q7_15', 7, 40000, "In the Mahabharata, who was the mother of the Kauravas?",
            ["Kunti", "Draupadi", "Gandhari", "Madri"],
            2, "She famously blindfolded herself to share her husband's disability."),

        // Mathematics | Answer: D (3)
        q('q7_16', 7, 40000, "In the Fibonacci sequence (1, 1, 2, 3, 5...), what number comes next?",
            ["6", "7", "9", "8"],
            3, "Add the last two numbers (3 + 5) to get the answer."),

        // Environment | Answer: A (0)
        q('q7_17', 7, 40000, "Which National Park in Assam is world-famous for its population of the Great One-Horned Rhinoceros?",
            ["Kaziranga National Park", "Manas National Park", "Jim Corbett National Park", "Kanha National Park"],
            0, "It is a UNESCO World Heritage Site located on the banks of the Brahmaputra."),

        // Famous Personalities | Answer: B (1)
        q('q7_18', 7, 40000, "Who was the Pashtun independence activist popularly known as 'Frontier Gandhi'?",
            ["Abul Kalam Azad", "Khan Abdul Ghaffar Khan", "Muhammad Ali Jinnah", "Liaquat Ali Khan"],
            1, "He founded the Khudai Khidmatgar movement."),

        // Inventions | Answer: C (2)
        q('q7_19', 7, 40000, "Who is traditionally credited with the invention of the telephone in 1876?",
            ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Guglielmo Marconi"],
            2, "His first words on the device were to his assistant, Mr. Watson."),

        // General Trivia | Answer: D (3)
        q('q7_20', 7, 40000, "In chemistry, which common metal is represented by the symbol 'Fe'?",
            ["Gold", "Silver", "Copper", "Iron"],
            3, "The symbol comes from the Latin word 'Ferrum'.")
    ],
    8: [
        // Indian History | Answer: A (0)
        q('q8_1', 8, 80000, "Which Chola king assumed the title 'Gangaikonda' after a victorious expedition to the river Ganges?",
            ["Rajendra Chola I", "Rajaraja I", "Karikala Chola", "Vikramaditya II"],
            0, "He was the son of the king who built the Brihadeeswarar Temple in Thanjavur."),

        // World History | Answer: B (1)
        q('q8_2', 8, 80000, "Which famous treaty officially ended World War I and established the League of Nations?",
            ["Treaty of Paris", "Treaty of Versailles", "Treaty of London", "Treaty of Tordesillas"],
            1, "It was signed in a famous Hall of Mirrors in a palace near Paris."),

        // Geography | Answer: C (2)
        q('q8_3', 8, 80000, "Which major latitude line passes through eight Indian states, dividing the country into roughly two halves?",
            ["Equator", "Tropic of Capricorn", "Tropic of Cancer", "Arctic Circle"],
            2, "It passes through Gujarat in the west and Mizoram in the east."),

        // Indian Polity | Answer: D (3)
        q('q8_4', 8, 80000, "Who holds the position of the ex-officio Chairman of the Rajya Sabha in India?",
            ["President", "Prime Minister", "Chief Justice", "Vice President"],
            3, "This person is also the second-highest constitutional authority in the country."),

        // Economics | Answer: A (0)
        q('q8_5', 8, 80000, "In the banking term 'Repo Rate', what does the 'R' in 'Repo' stand for?",
            ["Repurchasing", "Reserve", "Reverse", "Return"],
            0, "It refers to an agreement where the central bank buys back securities from commercial banks."),

        // Science and Technology | Answer: B (1)
        q('q8_6', 8, 80000, "What is the phenomenon of the bending of light when it passes from one medium to another called?",
            ["Reflection", "Refraction", "Diffraction", "Dispersion"],
            1, "This phenomenon is the reason a straw appears bent when placed in a glass of water."),

        // Biology | Answer: C (2)
        q('q8_7', 8, 80000, "Which specific component of human blood is primarily responsible for clotting to stop bleeding?",
            ["Red Blood Cells", "White Blood Cells", "Platelets", "Plasma"],
            2, "Dengue fever is known to cause a dangerous drop in the count of these cells."),

        // Current Affairs | Answer: D (3)
        q('q8_8', 8, 80000, "Which Nordic country became the 31st member of the NATO military alliance in April 2023?",
            ["Sweden", "Ukraine", "Austria", "Finland"],
            3, "It shares a 1,340 km border with Russia and its capital is Helsinki."),

        // Sports and Games | Answer: A (0)
        q('q8_9', 8, 80000, "In which sport is the term 'Libero' used for a specialized defensive player who wears a different coloured jersey?",
            ["Volleyball", "Football", "Hockey", "Basketball"],
            0, "This player cannot serve, block, or attack the ball when it is entirely above net height."),

        // Arts and Culture | Answer: B (1)
        q('q8_10', 8, 80000, "The 'Kathak' classical dance form is predominantly associated with which region of India?",
            ["South India", "North India", "Northeast India", "West India"],
            1, "Its name is derived from the Sanskrit word for 'story'."),

        // Literature | Answer: C (2)
        q('q8_11', 8, 80000, "Who wrote the famous historical novel 'Train to Pakistan', based on the Partition of India?",
            ["R.K. Narayan", "Ruskin Bond", "Khushwant Singh", "Mulk Raj Anand"],
            2, "He was a well-known journalist and served as the editor of The Illustrated Weekly of India."),

        // Film and Entertainment | Answer: D (3)
        q('q8_12', 8, 80000, "Who was the first Indian to win an Academy Award (Oscar), winning for Best Costume Design?",
            ["Satyajit Ray", "A.R. Rahman", "Resul Pookutty", "Bhanu Athaiya"],
            3, "She won the award for Richard Attenborough's biopic Gandhi."),

        // World Capitals | Answer: A (0)
        q('q8_13', 8, 80000, "'Thimphu' is the capital city of which neighbouring country of India?",
            ["Bhutan", "Nepal", "Myanmar", "Tibet"],
            0, "This country is known for measuring 'Gross National Happiness' instead of GDP."),

        // Flags, Currencies and Symbols | Answer: B (1)
        q('q8_14', 8, 80000, "The 'Swiss Franc' is the official currency of which landlocked European nation?",
            ["Austria", "Switzerland", "Hungary", "Czech Republic"],
            1, "This country is famous for the Alps and its neutrality."),

        // Mythology | Answer: C (2)
        q('q8_15', 8, 80000, "In the Mahabharata, who was the commander of the Kaurava army on the 18th and final day of the war?",
            ["Bhishma", "Drona", "Shalya", "Karna"],
            2, "He was the King of Madra and the maternal uncle of the twins Nakula and Sahadeva."),

        // Mathematics | Answer: D (3)
        q('q8_16', 8, 80000, "What is the sum of all the interior angles of a simple pentagon?",
            ["360 degrees", "720 degrees", "180 degrees", "540 degrees"],
            3, "You can calculate this using the formula (n-2) × 180, where n is 5."),

        // Environment | Answer: B (1)
        q('q8_17', 8, 80000, "Which metal is the most abundant in the Earth's crust?",
            ["Iron", "Aluminum", "Copper", "Zinc"],
            1, "It is highly resistant to corrosion and is widely used in aviation."),

        // Famous Personalities | Answer: B (1)
        q('q8_18', 8, 80000, "Who co-founded Microsoft alongside Bill Gates in 1975?",
            ["Steve Jobs", "Paul Allen", "Steve Wozniak", "Larry Page"],
            1, "He also owned the sports teams Seattle Seahawks and Portland Trail Blazers."),

        // Inventions | Answer: C (2)
        q('q8_19', 8, 80000, "Who is credited with the discovery of Penicillin, the world's first antibiotic, in 1928?",
            ["Louis Pasteur", "Marie Curie", "Alexander Fleming", "Edward Jenner"],
            2, "He made the discovery by accident when he noticed a mould killing bacteria in a petri dish."),

        // General Trivia | Answer: D (3)
        q('q8_20', 8, 80000, "Which chemical compound is responsible for the spicy heat sensation in chilli peppers?",
            ["Piperine", "Curcumin", "Casein", "Capsaicin"],
            3, "This compound is the main ingredient in 'pepper spray' used for self-defence.")
    ],
    9: [
        // Indian History | Answer: A (0)
        q('q9_1', 9, 160000, "Which Gupta emperor is known as the 'Napoleon of India' due to his extensive military conquests recorded on the Allahabad Pillar?",
            ["Samudragupta", "Chandragupta I", "Skandagupta", "Kumaragupta"],
            0, "He was a devotee of Vishnu and is also depicted playing the Veena on his coins."),

        // World History | Answer: B (1)
        q('q9_2', 9, 160000, "The 'Boston Tea Party' of 1773 was a major political protest that escalated into which historical event?",
            ["French Revolution", "American Revolution", "Russian Revolution", "Industrial Revolution"],
            1, "It involved dumping 342 chests of tea into a harbor to protest taxation without representation."),

        // Geography | Answer: C (2)
        q('q9_3', 9, 160000, "Which channel separates the Andaman Islands from the Nicobar Islands in the Bay of Bengal?",
            ["Eight Degree Channel", "Nine Degree Channel", "Ten Degree Channel", "Duncan Passage"],
            2, "The name of the channel represents the line of latitude on which it lies."),

        // Indian Polity | Answer: D (3)
        q('q9_4', 9, 160000, "The concept of 'Directive Principles of State Policy' in the Indian Constitution was borrowed from the constitution of which country?",
            ["United States", "Canada", "Australia", "Ireland"],
            3, "This European nation also fought a long struggle for independence from the United Kingdom."),

        // Economics | Answer: A (0)
        q('q9_5', 9, 160000, "The 'Mahalanobis Model,' which focused on rapid industrialization, was the architectural basis for which Five-Year Plan of India?",
            ["Second Five-Year Plan", "First Five-Year Plan", "Third Five-Year Plan", "Fourth Five-Year Plan"],
            0, "This plan ran from 1956 to 1961 and prioritized heavy industries and the public sector."),

        // Science and Technology | Answer: B (1)
        q('q9_6', 9, 160000, "What is the name of India's first dedicated multi-wavelength space astronomy mission launched by ISRO?",
            ["Chandrayaan-1", "AstroSat", "Mangalyaan", "Aditya-L1"],
            1, "Its name is a combination of the word 'Astronomy' and 'Satellite.'"),

        // Biology | Answer: C (2)
        q('q9_7', 9, 160000, "Which is the only internal organ in the human body capable of natural regeneration of lost tissue?",
            ["Heart", "Pancreas", "Liver", "Kidney"],
            2, "This organ produces bile and processes nutrients from the small intestine."),

        // Current Affairs | Answer: D (3)
        q('q9_8', 9, 160000, "Who was the Chief Guest at India's 75th Republic Day celebrations in January 2024?",
            ["Joe Biden", "Rishi Sunak", "Abdel Fattah El-Sisi", "Emmanuel Macron"],
            3, "He is the President of a European country that hosted the 2024 Summer Olympics."),

        // Sports and Games | Answer: A (0)
        q('q9_9', 9, 160000, "In which sport would you find a team member known as a 'Coxswain' who steers the boat and directs the crew?",
            ["Rowing", "Polo", "Golf", "Archery"],
            0, "The coxswain is the only member of the team who does not propel the boat physically."),

        // Arts and Culture | Answer: B (1)
        q('q9_10', 9, 160000, "Mohiniyattam is a graceful classical dance form predominantly performed by women in which state?",
            ["Odisha", "Kerala", "Manipur", "Assam"],
            1, "The name translates to 'Dance of the Enchantress'."),

        // Literature | Answer: C (2)
        q('q9_11', 9, 160000, "Who is the author of the historical novel 'The Glass Palace,' which spans a century in Burma, Bengal, and Malaya?",
            ["Salman Rushdie", "Vikram Seth", "Amitav Ghosh", "Jhumpa Lahiri"],
            2, "This author is also famous for the 'Ibis Trilogy'."),

        // Film and Entertainment | Answer: D (3)
        q('q9_12', 9, 160000, "Who was the first Indian to win an Oscar in a competitive category?",
            ["Satyajit Ray", "A.R. Rahman", "Resul Pookutty", "Bhanu Athaiya"],
            3, "She won the award for Best Costume Design for the 1982 film 'Gandhi'."),

        // World Capitals | Answer: A (0)
        q('q9_13', 9, 160000, "What is the capital city of New Zealand?",
            ["Wellington", "Auckland", "Christchurch", "Hamilton"],
            0, "It is located at the southern tip of the North Island."),

        // Flags, Currencies and Symbols | Answer: B (1)
        q('q9_14', 9, 160000, "Which country's national flag features a green Cedar tree in the center?",
            ["Canada", "Lebanon", "Cyprus", "Belize"],
            1, "The capital of this Middle Eastern country is Beirut."),

        // Mythology | Answer: C (2)
        q('q9_15', 9, 160000, "In the Mahabharata, who was the commander-in-chief of the Kaurava army on the 18th and final day of the war?",
            ["Dronacharya", "Karna", "Shalya", "Ashwatthama"],
            2, "He was the King of Madra and the maternal uncle of Nakula and Sahadeva."),

        // Mathematics | Answer: D (3)
        q('q9_16', 9, 160000, "What is the sum of the interior angles of a standard hexagon?",
            ["360 degrees", "540 degrees", "900 degrees", "720 degrees"],
            3, "The formula is (n-2) × 180, where n is the number of sides (6)."),

        // Environment | Answer: A (0)
        q('q9_17', 9, 160000, "The 'Kyoto Protocol' was an international treaty that committed state parties to primarily reduce what?",
            ["Greenhouse gas emissions", "Nuclear weapons", "Plastic waste", "Ozone depleting substances"],
            0, "It preceded the Paris Agreement in addressing global warming."),

        // Famous Personalities | Answer: B (1)
        q('q9_18', 9, 160000, "Which scientist is popularly known as the 'Missile Woman of India'?",
            ["Kalpana Chawla", "Tessy Thomas", "Ritu Karidhal", "Muthayya Vanitha"],
            1, "She served as the Project Director for the Agni-IV missile at DRDO."),

        // Inventions | Answer: C (2)
        q('q9_19', 9, 160000, "Dr. Jonas Salk is hailed as a medical hero for developing the first successful vaccine against which paralyzing disease?",
            ["Tuberculosis", "Measles", "Polio", "Smallpox"],
            2, "He famously refused to patent the vaccine, saving millions of children worldwide."),

        // General Trivia | Answer: D (3)
        q('q9_20', 9, 160000, "In the Indian PIN code system (e.g., 110001), what does the very first digit indicate?",
            ["The specific Post Office", "The State", "The Sorting District", "The Zone"],
            3, "India is divided into 9 of these postal regions (8 geographical + 1 for the Army).")
    ],
    10: [
        // Indian History | Answer: B (1)
        q('q10_1', 10, 320000, "Which Mughal emperor's reign is traditionally associated with the construction of the famous 'Peacock Throne'?",
            ["Akbar", "Shah Jahan", "Aurangzeb", "Jahangir"],
            1, "His reign is often considered the 'Golden Age' of Mughal architecture, and he commissioned the Taj Mahal."),

        // World History | Answer: C (2)
        q('q10_2', 10, 320000, "The fall of the Berlin Wall in 1989 was a pivotal event that led to the reunification of which country?",
            ["Yugoslavia", "Soviet Union", "Germany", "Czechoslovakia"],
            2, "This country had been divided into East and West during the Cold War."),

        // Geography | Answer: A (0)
        q('q10_3', 10, 320000, "Which parallel of latitude roughly serves as the dividing line between North Korea and South Korea?",
            ["38th Parallel", "49th Parallel", "17th Parallel", "24th Parallel"],
            0, "This line was established as the boundary after World War II, before the Korean War solidified the division."),

        // Indian Polity | Answer: D (3)
        q('q10_4', 10, 320000, "Which Schedule of the Indian Constitution deals specifically with the allocation of seats in the Rajya Sabha to States and Union Territories?",
            ["Second Schedule", "Tenth Schedule", "Seventh Schedule", "Fourth Schedule"],
            3, "It comes right after the schedule that deals with Oaths and Affirmations."),

        // Economics | Answer: C (2)
        q('q10_5', 10, 320000, "Which economic curve illustrates the theoretical relationship between tax rates and the amount of tax revenue collected by the government?",
            ["Lorenz Curve", "Phillips Curve", "Laffer Curve", "Kuznets Curve"],
            2, "It is named after the American economist who reportedly first sketched it on a napkin in 1974."),

        // Science and Technology | Answer: D (3)
        q('q10_6', 10, 320000, "Which chemical element has the highest melting point of all known metals in pure form?",
            ["Platinum", "Titanium", "Iron", "Tungsten"],
            3, "Because of this property, it is commonly used as the filament in incandescent light bulbs."),

        // Biology | Answer: B (1)
        q('q10_7', 10, 320000, "In the human anatomy, the regions of tissue known as the 'Islets of Langerhans' are found in which organ?",
            ["Liver", "Pancreas", "Kidney", "Spleen"],
            1, "These cells are responsible for producing insulin and glucagon."),

        // Current Affairs | Answer: A (0)
        q('q10_8', 10, 320000, "What was the codename of the operation launched by India in 2023 to evacuate its citizens from conflict-hit Sudan?",
            ["Operation Kaveri", "Operation Ganga", "Operation Dost", "Operation Ajay"],
            0, "The operation is named after a major holy river flowing through southern India."),

        // Sports and Games | Answer: C (2)
        q('q10_9', 10, 320000, "The Hopman Cup is a prestigious annual international team tournament associated with which sport?",
            ["Badminton", "Golf", "Tennis", "Table Tennis"],
            2, "It is a mixed-gender team event often held in Australia prior to the Australian Open."),

        // Arts and Culture | Answer: B (1)
        q('q10_10', 10, 320000, "The 'Odissi' classical dance, known for its tribhanga posture, traces its roots to which ancient text?",
            ["Arthashastra", "Natya Shastra", "Rig Veda", "Upanishads"],
            1, "This text was written by the sage Bharata Muni."),

        // Literature | Answer: D (3)
        q('q10_11', 10, 320000, "Which author won the Booker Prize in 1981 for the magical realism novel 'Midnight's Children'?",
            ["Arundhati Roy", "Kiran Desai", "V.S. Naipaul", "Salman Rushdie"],
            3, "The book deals with India's transition from British colonialism to independence."),

        // Film and Entertainment | Answer: A (0)
        q('q10_12', 10, 320000, "Which 1957 classic was the first Indian film to be nominated for the Academy Award for Best Foreign Language Film?",
            ["Mother India", "Salaam Bombay!", "Lagaan", "Pather Panchali"],
            0, "Directed by Mehboob Khan, it stars Nargis as the resilient matriarch Radha."),

        // World Capitals | Answer: C (2)
        q('q10_13', 10, 320000, "What is the capital city of Argentina?",
            ["Santiago", "Lima", "Buenos Aires", "Bogotá"],
            2, "Its name translates to 'Good Airs' or 'Fair Winds' in Spanish."),

        // Flags, Currencies and Symbols | Answer: B (1)
        q('q10_14', 10, 320000, "The 'Quetzal', named after a national bird, is the official currency of which Central American country?",
            ["Honduras", "Guatemala", "Costa Rica", "Panama"],
            1, "This country was the heart of the ancient Maya civilization, and the bird is known for its long green tail feathers."),

        // Mythology | Answer: A (0)
        q('q10_15', 10, 320000, "In the Mahabharata, who was appointed as the commander-in-chief of the Kaurava army on the 18th and final day of the war?",
            ["Shalya", "Ashwatthama", "Kripacharya", "Shakuni"],
            0, "He was the King of Madra and the maternal uncle of Nakula and Sahadeva."),

        // Mathematics | Answer: C (2)
        q('q10_16', 10, 320000, "What is the sum of the interior angles of a simple convex pentagon?",
            ["360 degrees", "720 degrees", "540 degrees", "450 degrees"],
            2, "The formula is (n-2) × 180, where n is the number of sides (5)."),

        // Environment | Answer: B (1)
        q('q10_17', 10, 320000, "CITES is an international treaty drafted in 1973 to protect what?",
            ["The Ozone Layer", "Endangered Flora and Fauna", "Wetland Habitats", "Antarctica"],
            1, "The acronym stands for Convention on International Trade in Endangered Species."),

        // Famous Personalities | Answer: D (3)
        q('q10_18', 10, 320000, "Who was the first woman to hold the post of Secretary-General of the Commonwealth of Nations?",
            ["Kamalesh Sharma", "Theresa May", "Quentin Bryce", "Patricia Scotland"],
            3, "She is a British diplomat and politician, born in Dominica."),

        // Inventions | Answer: A (0)
        q('q10_19', 10, 320000, "The 'Daguerreotype' was the first commercially successful process introduced in which field of technology?",
            ["Photography", "Telegraphy", "Printing", "Sound Recording"],
            0, "Developed in France in the 1830s, it captured images on silver-plated copper sheets."),

        // General Trivia | Answer: D (3)
        q('q10_20', 10, 320000, "What is the specific collective noun used to describe a group of flamingos?",
            ["Parade", "Colony", "Muster", "Flamboyance"],
            3, "The word reflects their bright, colorful, and showy appearance.")
    ],
    // --- SEGMENT III: CUBIC GROWTH (Q11-Q15) ---
    // Ends at Milestone 3 (1 Crore)
    11: [
        // Indian History | Answer: B (1)
        q('q11_1', 11, 640000, "Which Pala emperor is credited with founding the famous Vikramashila University in the late 8th century?",
            ["Gopala", "Dharmapala", "Mahipala", "Ramapala"],
            1, "He was the second ruler of the Pala dynasty and a great patron of Buddhism."),

        // World History | Answer: C (2)
        q('q11_2', 11, 640000, "The assassination of Archduke Franz Ferdinand in 1914 was the spark that ignited which major global conflict?",
            ["World War II", "Crimean War", "World War I", "Franco-Prussian War"],
            2, "The assassination took place in Sarajevo, Bosnia."),

        // Geography | Answer: A (0)
        q('q11_3', 11, 640000, "Which major line of latitude runs almost through the middle of the continent of Australia?",
            ["Tropic of Capricorn", "Tropic of Cancer", "Equator", "Arctic Circle"],
            0, "This line is located at approximately 23.5 degrees South of the Equator."),

        // Indian Polity | Answer: A (0)
        q('q11_4', 11, 640000, "Under which Article of the Indian Constitution can the President proclaim a 'Financial Emergency'?",
            ["Article 360", "Article 356", "Article 352", "Article 370"],
            0, "Unlike other emergencies, this specific type of emergency has never been imposed in India so far."),

        // Economics | Answer: C (2)
        q('q11_5', 11, 640000, "In macroeconomics, the 'Phillips Curve' suggests an inverse relationship between inflation and what?",
            ["Interest Rates", "GDP Growth", "Unemployment", "Taxation"],
            2, "According to this theory, decreased joblessness in an economy will correlate with higher rates of wage rises."),

        // Science and Technology | Answer: B (1)
        q('q11_6', 11, 640000, "'Heavy water', used as a moderator in nuclear reactors, is an oxide of which isotope of Hydrogen?",
            ["Protium", "Deuterium", "Tritium", "Hydronium"],
            1, "This isotope has one proton and one neutron in its nucleus, making it twice as heavy as the most common hydrogen."),

        // Biology | Answer: C (2)
        q('q11_7', 11, 640000, "The 'Islets of Langerhans', responsible for producing insulin, are groups of cells found in which organ?",
            ["Liver", "Spleen", "Pancreas", "Kidney"],
            2, "This organ functions both as a digestive exocrine gland and a hormone-producing endocrine gland."),

        // Current Affairs | Answer: C (2)
        q('q11_8', 11, 640000, "In April 2023, which Nordic country officially became the 31st member of the NATO military alliance?",
            ["Sweden", "Norway", "Finland", "Denmark"],
            2, "This country shares a long border with Russia and remained militarily non-aligned for decades before this shift."),

        // Sports and Games | Answer: D (3)
        q('q11_9', 11, 640000, "The 'Thomas Cup' is a prestigious international championship associated with which sport?",
            ["Lawn Tennis", "Table Tennis", "Hockey", "Badminton"],
            3, "India made history by winning this trophy for the first time in 2022, defeating 14-time champions Indonesia."),

        // Arts and Culture | Answer: B (1)
        q('q11_10', 11, 640000, "Which Indian classical dance form features dancers wearing a cylindrical skirt called a 'Kumil'?",
            ["Kathakali", "Manipuri", "Odissi", "Sattriya"],
            1, "This dance originated in a northeastern state and focuses heavily on the Raslila theme."),

        // Literature | Answer: D (3)
        q('q11_11', 11, 640000, "Who is the author of the historical novel 'Train to Pakistan', published in 1956?",
            ["Mulk Raj Anand", "Ruskin Bond", "R.K. Narayan", "Khushwant Singh"],
            3, "The author was a well-known journalist and served as the editor of The Illustrated Weekly of India."),

        // Film and Entertainment | Answer: B (1)
        q('q11_12', 11, 640000, "Which 1937 film is recognized as India's first indigenously made colour film?",
            ["Alam Ara", "Kisan Kanya", "Raja Harishchandra", "Mother India"],
            1, "While Alam Ara was the first sound film, this movie was produced by Ardeshir Irani using the Cinecolor process."),

        // World Capitals | Answer: D (3)
        q('q11_13', 11, 640000, "What is the capital city of Kenya?",
            ["Addis Ababa", "Kampala", "Dodoma", "Nairobi"],
            3, "It is famously the only city in the world with a national park within its borders."),

        // Flags, Currencies and Symbols | Answer: A (0)
        q('q11_14', 11, 640000, "The 'Baht' is the official currency of which Southeast Asian nation?",
            ["Thailand", "Vietnam", "Cambodia", "Myanmar"],
            0, "This country was formerly known as Siam and is famous for its elephants."),

        // Mythology | Answer: D (3)
        q('q11_15', 11, 640000, "In the Mahabharata, what was the specific name of the conch shell blown by Arjuna at the start of the war?",
            ["Panchajanya", "Paundra", "Anantavijaya", "Devadatta"],
            3, "Krishna's conch was Panchajanya, while this conch's name implies 'God-given'."),

        // Mathematics | Answer: A (0)
        q('q11_16', 11, 640000, "Which number is famously known as the 'Hardy-Ramanujan number' because it is the smallest number expressible as the sum of two cubes in two different ways?",
            ["1729", "6174", "1089", "3141"],
            0, "It is the sum of 1³ + 12³ and also the sum of 9³ + 10³."),

        // Environment | Answer: B (1)
        q('q11_17', 11, 640000, "Adopted in 2015, what is the name of the legally binding international treaty on climate change aiming to limit global warming?",
            ["Kyoto Protocol", "Paris Agreement", "Copenhagen Accord", "Geneva Convention"],
            1, "Its goal is to limit temperature increase to well below 2°C above pre-industrial levels."),

        // Famous Personalities | Answer: C (2)
        q('q11_18', 11, 640000, "'Manikarnika' was the birth name of which legendary Indian freedom fighter and queen?",
            ["Rani Padmini", "Ahilyabai Holkar", "Rani Lakshmibai", "Begum Hazrat Mahal"],
            2, "She was the Queen of Jhansi and became a leading figure of the Indian Rebellion of 1857."),

        // Inventions | Answer: B (1)
        q('q11_19', 11, 640000, "Alfred Nobel established the Nobel Prizes from the vast fortune he made primarily through the invention of what?",
            ["Penicillin", "Dynamite", "X-Rays", "Steam Engine"],
            1, "He invented this explosive to make mining and construction safer, stabilizing nitroglycerin."),

        // General Trivia | Answer: D (3)
        q('q11_20', 11, 640000, "The Latin phrase 'Veni, Vidi, Vici' (I came, I saw, I conquered) is attributed to which Roman leader?",
            ["Augustus", "Nero", "Alexander the Great", "Julius Caesar"],
            3, "He reportedly wrote this in a letter to the Roman Senate after a quick victory in the Battle of Zela.")
    ],
    12: [
        // Indian History | Answer: A (0)
        q('q12_1', 12, 1250000, "Which ancient Indian text on statecraft and political science introduces the 'Saptanga' or seven-limbed theory of the state?",
            ["Arthashastra", "Manusmriti", "Mahabhasya", "Rajatarangini"],
            0, "This text was traditionally authored by Chanakya (Kautilya)."),

        // World History | Answer: B (1)
        q('q12_2', 12, 1250000, "The 'Defenestration of Prague' in 1618, where officials were thrown out of a window, triggered which major conflict?",
            ["Seven Years' War", "Thirty Years' War", "War of the Roses", "Crimean War"],
            1, "This war ended with the Peace of Westphalia in 1648."),

        // Geography | Answer: C (2)
        q('q12_3', 12, 1250000, "The 'Great Channel' separates the Great Nicobar Islands of India from which province of Indonesia?",
            ["Bali", "Java", "Aceh", "Papua"],
            2, "This province is located at the northern tip of Sumatra."),

        // Indian Polity | Answer: B (1)
        q('q12_4', 12, 1250000, "Which Constitutional Amendment Act made Sikkim a full-fledged state of the Indian Union in 1975?",
            ["35th Amendment", "36th Amendment", "38th Amendment", "42nd Amendment"],
            1, "The 35th made it an 'Associate State', but this one made it a full state."),

        // Economics | Answer: C (2)
        q('q12_5', 12, 1250000, "What is the statistical measure used to calculate the distance between a point and a distribution, introduced by an Indian statistician in 1936?",
            ["Euclidean distance", "Manhattan distance", "Mahalanobis distance", "Chebyshev distance"],
            2, "It is named after the founder of the Indian Statistical Institute."),

        // Science and Technology | Answer: B (1)
        q('q12_6', 12, 1250000, "Which chemical element, with atomic number 99, was discovered in the debris of the first hydrogen bomb explosion in 1952?",
            ["Fermium", "Einsteinium", "Plutonium", "Mendelevium"],
            1, "It is named after the physicist who developed the theory of relativity."),

        // Biology | Answer: A (0)
        q('q12_7', 12, 1250000, "What is the scientific botanical name of the 'Touch-me-not' plant that folds its leaves inward when touched?",
            ["Mimosa pudica", "Ocimum tenuiflorum", "Ficus religiosa", "Azadirachta indica"],
            0, "The name roughly translates to 'shy mime'."),

        // Current Affairs | Answer: C (2)
        q('q12_8', 12, 1250000, "Which nation officially became the 32nd member of the North Atlantic Treaty Organization (NATO) in March 2024?",
            ["Finland", "Ukraine", "Sweden", "Georgia"],
            2, "This Nordic country abandoned its long-standing policy of neutrality."),

        // Sports and Games | Answer: D (3)
        q('q12_9', 12, 1250000, "Who is the only footballer in history to have been awarded the 'Super Ballon d'Or', presented by France Football in 1989?",
            ["Pelé", "Diego Maradona", "Johan Cruyff", "Alfredo Di Stéfano"],
            3, "He was a legend for Real Madrid and played for three different national teams."),

        // Arts and Culture | Answer: C (2)
        q('q12_10', 12, 1250000, "Which famous Indian artist painted 'Shakuntala', bringing Western academic art techniques to Indian subjects?",
            ["M.F. Husain", "Amrita Sher-Gil", "Raja Ravi Varma", "Nandalal Bose"],
            2, "He was highly influential in mass-producing lithographs of Hindu deities."),

        // Literature | Answer: C (2)
        q('q12_11', 12, 1250000, "Which novel, involving a character named Alu and the study of phrenology, was the debut novel of author Amitav Ghosh?",
            ["The Shadow Lines", "The Glass Palace", "The Circle of Reason", "Sea of Poppies"],
            2, "It was published in 1986."),

        // Film and Entertainment | Answer: C (2)
        q('q12_12', 12, 1250000, "Which 1969 film, directed by Khwaja Ahmad Abbas, marked the acting debut of Amitabh Bachchan as one of the seven protagonists?",
            ["Anand", "Zanjeer", "Saat Hindustani", "Guddi"],
            2, "He played the role of a poet named Anwar Ali."),

        // World Capitals | Answer: C (2)
        q('q12_13', 12, 1250000, "What is the capital city of Iceland, notable for being the northernmost capital of a sovereign state?",
            ["Oslo", "Helsinki", "Reykjavik", "Copenhagen"],
            2, "The name translates to 'Smoky Bay'."),

        // Flags, Currencies and Symbols | Answer: D (3)
        q('q12_14', 12, 1250000, "Which is the only country in the world to have a non-quadrilateral national flag?",
            ["Switzerland", "Vatican City", "Bhutan", "Nepal"],
            3, "The flag consists of two stacked triangles."),

        // Mythology | Answer: A (0)
        q('q12_15', 12, 1250000, "In the Mahabharata, what was the specific name of the conch shell (Shankha) blown by Yudhishthira at the start of the war?",
            ["Anantavijaya", "Paundra", "Devadatta", "Panchajanya"],
            0, "The name signifies 'Endless Victory'."),

        // Mathematics | Answer: C (2)
        q('q12_16', 12, 1250000, "In mathematics, 'Euler's Number' is the base of the natural logarithm. What is its approximate value?",
            ["1.414", "1.618", "2.718", "3.141"],
            2, "It is an irrational number denoted by the letter 'e'."),

        // Environment | Answer: B (1)
        q('q12_17', 12, 1250000, "The 'Basel Convention' is an international treaty designed to reduce the movements of what?",
            ["Nuclear Weapons", "Hazardous Waste", "Ozone Depleting Gases", "Endangered Animals"],
            1, "It aimed to prevent the transfer of these dangerous materials from developed to less developed countries."),

        // Famous Personalities | Answer: A (0)
        q('q12_18', 12, 1250000, "Which physicist, the founding director of TIFR, is known as the 'Father of the Indian Nuclear Program'?",
            ["Homi J. Bhabha", "Vikram Sarabhai", "APJ Abdul Kalam", "C.V. Raman"],
            0, "The atomic research centre in Trombay is named after him."),

        // Inventions | Answer: D (3)
        q('q12_19', 12, 1250000, "Douglas Engelbart is best known for inventing which computer peripheral in the 1960s, which he originally called an 'X-Y position indicator'?",
            ["Keyboard", "Monitor", "Printer", "Computer Mouse"],
            3, "It got its common name because the cord looked like a tail."),

        // General Trivia | Answer: D (3)
        q('q12_20', 12, 1250000, "In a standard deck of playing cards, which King is the only one depicted without a moustache, often called the 'Suicide King'?",
            ["King of Spades", "King of Clubs", "King of Diamonds", "King of Hearts"],
            3, "He appears to be sticking his sword into his own head.")
    ],
    13: [
        // Indian History | Answer: C (2)
        q('q13_1', 13, 2500000, "Which ancient Indian university was founded by the Gupta King Kumaragupta I in the 5th century CE?",
            ["Vikramshila", "Taxila", "Nalanda", "Vallabhi"],
            2, "It is located in modern-day Bihar and was destroyed by Bakhtiyar Khilji."),

        // World History | Answer: A (0)
        q('q13_2', 13, 2500000, "Which battle marked the final and decisive defeat of Napoleon Bonaparte in 1815?",
            ["Battle of Waterloo", "Battle of Trafalgar", "Battle of Leipzig", "Battle of Austerlitz"],
            0, "The battle took place in present-day Belgium."),

        // Geography | Answer: D (3)
        q('q13_3', 13, 2500000, "Which strait separates the North and South Islands of New Zealand?",
            ["Bass Strait", "Torres Strait", "Foveaux Strait", "Cook Strait"],
            3, "It is named after the British explorer who mapped it in 1770."),

        // Indian Polity | Answer: B (1)
        q('q13_4', 13, 2500000, "Which Schedule of the Indian Constitution contains provisions regarding the ‘Anti-Defection Law’?",
            ["8th Schedule", "10th Schedule", "12th Schedule", "9th Schedule"],
            1, "This schedule was added by the 52nd Amendment Act of 1985."),

        // Economics | Answer: B (1)
        q('q13_5', 13, 2500000, "Which Five-Year Plan in India was primarily based on the ‘Mahalanobis Model’ favoring heavy industries?",
            ["First Plan", "Second Plan", "Third Plan", "Fourth Plan"],
            1, "This plan ran from 1956 to 1961."),

        // Science and Technology | Answer: A (0)
        q('q13_6', 13, 2500000, "The ‘Kessler Syndrome’ is a theoretical scenario primarily associated with which potential catastrophe?",
            ["Space Debris Collision", "Deep Sea Mining", "Viral Mutation", "Supervolcanic Eruption"],
            0, "It involves a chain reaction of collisions in Low Earth Orbit."),

        // Biology | Answer: B (1)
        q('q13_7', 13, 2500000, "Which blood type is considered the 'Universal Donor', meaning its red blood cells can be transfused to anyone?",
            ["AB Positive", "O Negative", "A Positive", "B Negative"],
            1, "It lacks A, B, and Rh antigens on the red blood cells."),

        // Current Affairs | Answer: C (2)
        q('q13_8', 13, 2500000, "Which country became the 20th member to join the Eurozone and adopt the Euro currency in 2023?",
            ["Bulgaria", "Romania", "Croatia", "Poland"],
            2, "This country is located on the Adriatic Sea and was a runner-up in the 2018 FIFA World Cup."),

        // Sports and Games | Answer: D (3)
        q('q13_9', 13, 2500000, "Who is the only tennis player in history to achieve a ‘Golden Slam’ (winning all four Grand Slams and Olympic Gold in the same year)?",
            ["Serena Williams", "Roger Federer", "Novak Djokovic", "Steffi Graf"],
            3, "She achieved this historic feat in 1988."),

        // Arts and Culture | Answer: A (0)
        q('q13_10', 13, 2500000, "The renowned Indian artist Raja Ravi Varma is best known for fusing Indian iconography with which art style?",
            ["European Academic Art", "Persian Miniature", "Japanese Wash", "Abstract Expressionism"],
            0, "He used oil paints and lithographic presses to mass-produce his artwork."),

        // Literature | Answer: B (1)
        q('q13_11', 13, 2500000, "Who authored the famous memoir titled ‘My Days’, which chronicles his life in Mysore?",
            ["Mulk Raj Anand", "R.K. Narayan", "Ruskin Bond", "Raja Rao"],
            1, "He is the creator of the fictional town of ‘Malgudi’."),

        // Film and Entertainment | Answer: C (2)
        q('q13_12', 13, 2500000, "Which legendary Indian filmmaker was awarded the Honorary Academy Award (Oscar) for Lifetime Achievement in 1992?",
            ["Mrinal Sen", "Adoor Gopalakrishnan", "Satyajit Ray", "V. Shantaram"],
            2, "He directed the ‘Apu Trilogy’."),

        // World Capitals | Answer: B (1)
        q('q13_13', 13, 2500000, "The city of ‘Naypyidaw’ officially replaced Yangon as the capital of which country in 2005?",
            ["Thailand", "Myanmar", "Laos", "Cambodia"],
            1, "This country was formerly known as Burma."),

        // Flags, Currencies and Symbols | Answer: C (2)
        q('q13_14', 13, 2500000, "Which country's banknotes prominently feature the face of Nelson Mandela on all denominations?",
            ["Zimbabwe", "Kenya", "South Africa", "Nigeria"],
            2, "The currency of this country is the ‘Rand’."),

        // Mythology | Answer: A (0)
        q('q13_15', 13, 2500000, "In the Ramayana, who was the father of King Dasharatha and the grandfather of Lord Rama?",
            ["King Aja", "King Raghu", "King Dilipa", "King Ikshvaku"],
            0, "His wife was Indumati, and he died of grief shortly after her death."),

        // Mathematics | Answer: A (0)
        q('q13_16', 13, 2500000, "In mathematics, the Fibonacci sequence famously begins with 0 and 1. What are the next three numbers?",
            ["1, 2, 3", "2, 3, 5", "1, 3, 4", "2, 4, 6"],
            0, "You add the previous two numbers together."),

        // Environment | Answer: D (3)
        q('q13_17', 13, 2500000, "The ‘Red Data Book’, which provides a record of endangered species, is published by which organization?",
            ["WWF", "UNEP", "Greenpeace", "IUCN"],
            3, "This organization's headquarters is in Gland, Switzerland."),

        // Famous Personalities | Answer: C (2)
        q('q13_18', 13, 2500000, "Who is the only person to have won Nobel Prizes in two different scientific fields: Physics and Chemistry?",
            ["Albert Einstein", "Linus Pauling", "Marie Curie", "Richard Feynman"],
            2, "She discovered the elements Polonium and Radium."),

        // Inventions | Answer: D (3)
        q('q13_19', 13, 2500000, "The ‘Hollerith Card’, used in early data processing, was the precursor to the technology of which major company?",
            ["Apple", "Microsoft", "Intel", "IBM"],
            3, "This company is nicknamed ‘Big Blue’."),

        // General Trivia | Answer: D (3)
        q('q13_20', 13, 2500000, "The ancient Indian text ‘Kama Sutra’ is attributed to which sage?",
            ["Sage Bharata", "Sage Manu", "Sage Kalidasa", "Sage Vatsyayana"],
            3, "He is believed to have lived during the Gupta period.")
    ],
    14: [
        // Indian History | Answer: A (0)
        q('q14_1', 14, 5000000, "Which Gupta emperor is eulogized as a 'Kaviraja' or 'King of Poets' on his coins, depicting him playing the Veena?",
            ["Samudragupta", "Chandragupta I", "Skandagupta", "Kumaragupta I"],
            0, "He is also known as the 'Napoleon of India' for his extensive military conquests."),

        // World History | Answer: B (1)
        q('q14_2', 14, 5000000, "The 'Cuban Missile Crisis', a tense 13-day political and military standoff, took place in which year?",
            ["1959", "1962", "1965", "1968"],
            1, "It occurred during the presidencies of John F. Kennedy and Nikita Khrushchev."),

        // Geography | Answer: C (2)
        q('q14_3', 14, 5000000, "Located in the Pacific Ocean, 'Challenger Deep' is the deepest known point of the seabed. In which trench is it located?",
            ["Tonga Trench", "Kermadec Trench", "Mariana Trench", "Puerto Rico Trench"],
            2, "It descends over 10,900 meters below sea level."),

        // Indian Polity | Answer: A (0)
        q('q14_4', 14, 5000000, "Which specific Constitutional Amendment Act inserted Article 21A, making education a fundamental right for children between 6 and 14 years?",
            ["86th Amendment", "93rd Amendment", "74th Amendment", "42nd Amendment"],
            0, "This amendment was passed in 2002 and is often linked to the Right to Education (RTE) Act."),

        // Economics | Answer: C (2)
        q('q14_5', 14, 5000000, "In economic theory, what name is given to a good where demand increases as the price increases, violating the standard law of demand?",
            ["Veblen Good", "Public Good", "Giffen Good", "Club Good"],
            2, "It is named after a Scottish economist who observed this phenomenon with bread prices and the poor."),

        // Science and Technology | Answer: C (2)
        q('q14_6', 14, 5000000, "In 1967, Jocelyn Bell Burnell discovered a 'scruff' on a chart recorder paper which turned out to be the first observation of which celestial object?",
            ["Quasar", "Black Hole", "Pulsar", "Exoplanet"],
            2, "The signal was initially jokingly labeled 'LGM-1' for 'Little Green Men' because of its regular pulses."),

        // Biology | Answer: B (1)
        q('q14_7', 14, 5000000, "Which unique substance, produced by sperm whales to protect their digestive tracts from squid beaks, is highly valued in the perfume industry as a fixative?",
            ["Musk", "Ambergris", "Castoreum", "Civet"],
            1, "It is often referred to as 'floating gold' because it is sometimes found washed up on beaches."),

        // Current Affairs | Answer: B (1)
        q('q14_8', 14, 5000000, "As of 2024, which country officially became the 32nd member of the North Atlantic Treaty Organization (NATO)?",
            ["Finland", "Sweden", "Ukraine", "Georgia"],
            1, "This Nordic nation abandoned its long-standing policy of military non-alignment following the invasion of Ukraine."),

        // Sports and Games | Answer: B (1)
        q('q14_9', 14, 5000000, "In the history of Olympic athletics, who is the only athlete to win the gold medal in the marathon while running barefoot?",
            ["Haile Gebrselassie", "Abebe Bikila", "Kenenisa Bekele", "Eliud Kipchoge"],
            1, "He achieved this feat at the 1960 Rome Olympics representing Ethiopia."),

        // Arts and Culture | Answer: D (3)
        q('q14_10', 14, 5000000, "The 'Ragamala' paintings, a distinct genre of Indian miniature painting, are visual depictions illustrating which specific aspect of Indian classical music?",
            ["Musical Instruments", "Biographies of Musicians", "Dance forms", "Specific Ragas"],
            3, "Each painting captures the mood, season, and time of day associated with a particular melodic mode."),

        // Literature | Answer: C (2)
        q('q14_11', 14, 5000000, "Which solitary novel by Emily Brontë was originally published under the pseudonym 'Ellis Bell'?",
            ["Jane Eyre", "Agnes Grey", "Wuthering Heights", "The Tenant of Wildfell Hall"],
            2, "The story features the intense and tragic love between Heathcliff and Catherine Earnshaw."),

        // Film and Entertainment | Answer: D (3)
        q('q14_12', 14, 5000000, "Who holds the record for the most Academy Awards (Oscars) won by a single individual in history?",
            ["Meryl Streep", "John Ford", "Katharine Hepburn", "Walt Disney"],
            3, "This individual won 22 competitive Oscars and 4 honorary ones, primarily for animation and producing."),

        // World Capitals | Answer: D (3)
        q('q14_13', 14, 5000000, "Which is the only national capital city in the world that borders three different countries?",
            ["Vienna", "Kinshasa", "Asunción", "Bratislava"],
            3, "It is the capital of Slovakia and borders both Austria and Hungary."),

        // Flags, Currencies and Symbols | Answer: A (0)
        q('q14_14', 14, 5000000, "The 'Renminbi' is the official currency of China, but what is the name of the base unit of the currency, often used interchangeably in daily life?",
            ["Yuan", "Jiao", "Fen", "Baht"],
            0, "'Renminbi' means 'people's currency', while this term refers to the actual 'piece' or unit of money."),

        // Mythology | Answer: D (3)
        q('q14_15', 14, 5000000, "In the Mahabharata, who was the only Kaurava to switch sides and fight for the Pandavas during the Kurukshetra war?",
            ["Vikarna", "Durmukha", "Dussasana", "Yuyutsu"],
            3, "He was a son of Dhritarashtra born to a maidservant, not Gandhari."),

        // Mathematics | Answer: C (2)
        q('q14_16', 14, 5000000, "The 'Millennium Prize Problems' are seven unsolved problems in mathematics; which is the only one to have been solved (by Grigori Perelman)?",
            ["Riemann Hypothesis", "P vs NP Problem", "Poincaré Conjecture", "Navier–Stokes Existence"],
            2, "It deals with the characterization of the 3-sphere in topology, essentially the shape of the universe."),

        // Environment | Answer: C (2)
        q('q14_17', 14, 5000000, "The 'Minamata Convention' is an international treaty designed specifically to protect human health and the environment from the adverse effects of which element?",
            ["Lead", "Uranium", "Mercury", "Asbestos"],
            2, "The treaty is named after a Japanese city where thousands suffered severe poisoning in the 1950s."),

        // Famous Personalities | Answer: D (3)
        q('q14_18', 14, 5000000, "Which scientist is famously quoted as saying, 'I am become Death, the destroyer of worlds', upon witnessing the first nuclear test?",
            ["Albert Einstein", "Enrico Fermi", "Niels Bohr", "J. Robert Oppenheimer"],
            3, "He was the head of the Los Alamos Laboratory during the Manhattan Project and was quoting the Bhagavad Gita."),

        // Inventions | Answer: B (1)
        q('q14_19', 14, 5000000, "Ada Lovelace, an English mathematician from the 19th century, is often celebrated for being the world's first what?",
            ["Female Doctor", "Computer Programmer", "Patent Holder", "Nobel Laureate"],
            1, "She recognized the potential of Charles Babbage's Analytical Engine beyond simple calculation."),

        // General Trivia | Answer: A (0)
        q('q14_20', 14, 5000000, "The 'Kármán line' is an internationally recognized boundary that attempts to define the edge between what two regions?",
            ["Earth's Atmosphere and Outer Space", "The Mantle and the Crust", "The Atlantic and Pacific Oceans", "North and South Korea"],
            0, "It is typically set at an altitude of 100 kilometers (62 miles) above sea level.")
    ],
    15: [
        // Indian History | Answer: A (0)
        q('q15_1', 15, 10000000, "In 1943, who among the following established the 'Provisional Government of Free India' (Arzi Hukumat-e-Azad Hind) in Singapore?",
            ["Subhash Chandra Bose", "Rash Behari Bose", "Captain Mohan Singh", "Vallabhbhai Patel"],
            0, "He is also the founder of the Forward Bloc."),

        // World History | Answer: B (1)
        q('q15_2', 15, 10000000, "The 'Treaty of Tordesillas' signed in 1494 effectively divided the newly discovered lands outside Europe between which two empires?",
            ["Britain and France", "Spain and Portugal", "Ottoman and Safavid", "Dutch and Spanish"],
            1, "This treaty is the reason people in Brazil speak Portuguese while the rest of South America speaks Spanish."),

        // Geography | Answer: C (2)
        q('q15_3', 15, 10000000, "Located in the Pacific Ocean, which is the only country in the world that is situated in all four hemispheres (North, South, East, and West)?",
            ["Fiji", "Tuvalu", "Kiribati", "Samoa"],
            2, "Its territory spreads across the equator and the 180th meridian."),

        // Indian Polity | Answer: D (3)
        q('q15_4', 15, 10000000, "Who was the only Speaker of the Lok Sabha to have formally resigned from the office to contest for the struggle of India's independence, and later became the first Speaker of independent India?",
            ["M.A. Ayyangar", "Sardar Hukam Singh", "Neelam Sanjiva Reddy", "G.V. Mavalankar"],
            3, "He is often called 'Dadasaheb' and was the first Speaker of the Lok Sabha."),

        // Economics | Answer: B (1)
        q('q15_5', 15, 10000000, "The 'Lorenz Curve' is a graphical representation used in economics primarily to illustrate what?",
            ["Tax Revenue vs Rates", "Income or Wealth Inequality", "Inflation vs Unemployment", "Supply and Demand Equilibrium"],
            1, "It is closely associated with the Gini coefficient."),

        // Science and Technology | Answer: B (1)
        q('q15_6', 15, 10000000, "The element 'Technetium' (Atomic Number 43) holds a unique place in the periodic table because it was the first element to be...?",
            ["Discovered in the sun", "Produced artificially", "Found in ocean water", "Mined from an asteroid"],
            1, "Its name is derived from the Greek word for 'artificial'."),

        // Biology | Answer: C (2)
        q('q15_7', 15, 10000000, "Which is the largest solid internal organ in the human body, capable of regenerating itself even if up to 75% of it is removed?",
            ["Pancreas", "Heart", "Liver", "Kidney"],
            2, "It is responsible for filtering blood from the digestive tract and producing bile."),

        // Current Affairs | Answer: D (3)
        q('q15_8', 15, 10000000, "What is the specific name given to the landing site of the Chandrayaan-3 lander 'Vikram' on the lunar surface?",
            ["Tiranga Point", "Jawahar Point", "Atal Point", "Shiv Shakti Point"],
            3, "It was named to honor the combination of humanity and the strength of the moon."),

        // Sports and Games | Answer: A (0)
        q('q15_9', 15, 10000000, "Who was the only cricketer to captain a team in 100 Test matches?",
            ["Graeme Smith", "Ricky Ponting", "Steve Waugh", "Allan Border"],
            0, "He was the captain of the South African cricket team."),

        // Arts and Culture | Answer: C (2)
        q('q15_10', 15, 10000000, "The 'Kalighat' painting style, characterized by sweeping brush strokes and often satirical themes, originated around a famous temple in which city?",
            ["Varanasi", "Puri", "Kolkata", "Madurai"],
            2, "It developed in the 19th century in the capital of British India at the time."),

        // Literature | Answer: C (2)
        q('q15_11', 15, 10000000, "Who is the only author to have won the Booker Prize twice for the novels 'Waiting for the Barbarians' and 'Disgrace'?",
            ["Hilary Mantel", "Peter Carey", "J.M. Coetzee", "Margaret Atwood"],
            2, "He is a South African-Australian novelist and Nobel laureate."),

        // Film and Entertainment | Answer: D (3)
        q('q15_12', 15, 10000000, "Which was the first Indian film to be insured for a sum of ₹11 crore?",
            ["Mughal-e-Azam", "Sholay", "Hum Aapke Hain Koun..!", "Taal"],
            3, "This 1999 film was directed by Subhash Ghai and starred Aishwarya Rai."),

        // World Capitals | Answer: A (0)
        q('q15_13', 15, 10000000, "Which country changed the name of its capital city from Astana to Nur-Sultan in 2019, only to change it back to Astana in 2022?",
            ["Kazakhstan", "Uzbekistan", "Tajikistan", "Turkmenistan"],
            0, "It is the world's largest landlocked country."),

        // Flags, Currencies and Symbols | Answer: B (1)
        q('q15_14', 15, 10000000, "Which is the only national flag in the world that features a Bible in its coat of arms at the center?",
            ["Vatican City", "Dominican Republic", "Israel", "El Salvador"],
            1, "The Bible is shown open to the Gospel of John, chapter 8, verse 32."),

        // Mythology | Answer: C (2)
        q('q15_15', 15, 10000000, "In the Mahabharata, who was the only brother among the Kauravas who openly opposed the disrobing of Draupadi in the royal court, arguing that Yudhishthira had no right to wager her?",
            ["Yuyutsu", "Duhshasana", "Vikarna", "Durmukha"],
            2, "He is often compared to Kumbhakarna from the Ramayana for fighting on the side of adharma despite knowing the truth."),

        // Mathematics | Answer: D (3)
        q('q15_16', 15, 10000000, "The number 1 followed by 100 zeros is famously known as a 'Googol'. Who is credited with coining this term at the age of nine?",
            ["Edward Kasner", "John von Neumann", "Alan Turing", "Milton Sirotta"],
            3, "He was the nephew of the American mathematician Edward Kasner."),

        // Environment | Answer: C (2)
        q('q15_17', 15, 10000000, "The 'Stockholm Convention', adopted in 2001, aims to eliminate or restrict the production and use of what specific environmental threat?",
            ["CFCs", "Microplastics", "Persistent Organic Pollutants (POPs)", "Heavy Metals"],
            2, "These are 'forever chemicals' that accumulate in the food chain."),

        // Famous Personalities | Answer: B (1)
        q('q15_18', 15, 10000000, "Which famous scientist's tombstone in Vienna bears the equation S = k log W, which is the statistical formulation of entropy?",
            ["Erwin Schrödinger", "Ludwig Boltzmann", "Werner Heisenberg", "Max Planck"],
            1, "He was an Austrian physicist and philosopher known for his role in the development of statistical mechanics."),

        // Inventions | Answer: C (2)
        q('q15_19', 15, 10000000, "On the exact same day that Alexander Graham Bell’s lawyer filed the patent for the telephone, which other inventor filed a caveat for a similar device just hours later?",
            ["Thomas Edison", "Antonio Meucci", "Elisha Gray", "Guglielmo Marconi"],
            2, "He was an electrical engineer who co-founded the Western Electric Manufacturing Company."),

        // General Trivia | Answer: D (3)
        q('q15_20', 15, 10000000, "In the standard NATO phonetic alphabet (Alpha, Bravo, Charlie...), which is the only letter represented by the name of a country?",
            ["L (Lima)", "Q (Quebec)", "O (Oscar)", "I (India)"],
            3, "While Lima and Quebec are cities or provinces, this word represents the letter 'I'.")
    ],
    // --- SEGMENT IV: EXPONENTIAL GROWTH (Q16-Q20) ---
    // Ends at Milestone 4 (10 Crores)
    16: [
        // Indian History | Answer: A (0)
        q('q16_1', 16, 20000000, "The 'Peshwa' was the Prime Minister of the Maratha Empire, but who was the very first person to officially hold the title of Peshwa under Chhatrapati Shivaji Maharaj?",
            ["Moropant Trimbak Pingle", "Balaji Vishwanath", "Ramchandra Pant Amatya", "Baji Rao I"],
            0, "He was one of the Ashta Pradhan and was appointed in 1674."),

        // World History | Answer: B (1)
        q('q16_2', 16, 20000000, "The 'Football War' (La guerra del fútbol) in 1969, sparked by riots during a World Cup qualifier, was fought between which two nations?",
            ["Brazil and Argentina", "El Salvador and Honduras", "Iran and Iraq", "Serbia and Croatia"],
            1, "Both are Central American countries."),

        // Geography | Answer: A (0)
        q('q16_3', 16, 20000000, "Which is the only sovereign country in the world that is situated in all four hemispheres (Northern, Southern, Eastern, and Western)?",
            ["Kiribati", "Maldives", "Ecuador", "France"],
            0, "Its territory is spread across widely scattered island groups in the Pacific Ocean."),

        // Indian Polity | Answer: A (0)
        q('q16_4', 16, 20000000, "Who was the only member of the Constituent Assembly of India to represent the 'Scheduled Castes Federation' other than Dr. B.R. Ambedkar?",
            ["N. Sivaraj", "Jagjivan Ram", "Jogendra Nath Mandal", "Dakshayani Velayudhan"],
            0, "He was a politician from the Madras Presidency."),

        // Economics | Answer: C (2)
        q('q16_5', 16, 20000000, "The 'Gini Coefficient' is an economic index specifically designed to measure what within a nation?",
            ["Tax compliance", "Inflationary pressure", "Income or wealth inequality", "Gross Domestic Product growth"],
            2, "A value of 0 means perfect equality, while a value of 1 means perfect inequality."),

        // Science and Technology | Answer: D (3)
        q('q16_6', 16, 20000000, "In 1971, Ray Tomlinson sent the world's first network email to himself. According to him, what was the content of that message?",
            ["Hello World", "Testing 1 2 3", "Login", "QWERTYUIOP"],
            3, "It was a random string of characters from the top row of the keyboard."),

        // Biology | Answer: B (1)
        q('q16_7', 16, 20000000, "The 'Loop of Henle' is a critical part of which specific organ in the human body?",
            ["Liver", "Kidney", "Pancreas", "Lungs"],
            1, "This organ is responsible for filtering blood and producing urine."),

        // Current Affairs | Answer: C (2)
        q('q16_8', 16, 20000000, "In 2024, the 'SHAPE' (Spectro-polarimetry of HAbitable Planet Earth) payload was carried by the propulsion module of which Indian space mission?",
            ["Aditya-L1", "Gaganyaan", "Chandrayaan-3", "XPoSat"],
            2, "The mission's primary goal was a lunar soft landing."),

        // Sports and Games | Answer: B (1)
        q('q16_9', 16, 20000000, "Who is the only athlete in history to have won Gold Medals in both the Summer and Winter Olympic Games?",
            ["Michael Phelps", "Eddie Eagan", "Usain Bolt", "Clara Hughes"],
            1, "He won in Boxing (1920) and Bobsled (1932)."),

        // Arts and Culture | Answer: C (2)
        q('q16_10', 16, 20000000, "In the context of Indian classical dance, what term is used to describe 'pure dance' movements that convey rhythm and beauty but have no specific meaning or mood?",
            ["Abhinaya", "Natya", "Nritta", "Nritya"],
            2, "It is distinct from Abhinaya, which involves expression."),

        // Literature | Answer: C (2)
        q('q16_11', 16, 20000000, "The manuscript of which famous Pulitzer Prize-winning novel was originally titled 'Tomorrow is Another Day'?",
            ["To Kill a Mockingbird", "The Grapes of Wrath", "Gone with the Wind", "The Old Man and the Sea"],
            2, "The final title comes from a poem by Ernest Dowson, and the book is set during the American Civil War."),

        // Film and Entertainment | Answer: D (3)
        q('q16_12', 16, 20000000, "Which Bollywood film was the first in Indian cinema history to be insured for risk coverage?",
            ["Sholay", "Mughal-e-Azam", "Lagaan", "Taal"],
            3, "Released in 1999 and directed by Subhash Ghai."),

        // World Capitals | Answer: A (0)
        q('q16_13', 16, 20000000, "The island nation of Nauru has no official capital city, but in which district are its government offices located?",
            ["Yaren", "Denigomodu", "Meneng", "Aiwo"],
            0, "It is located on the southern side of the island."),

        // Flags, Currencies and Symbols | Answer: C (2)
        q('q16_14', 16, 20000000, "Which country's national flag features a Bible open to the Gospel of John, chapter 8, verse 32, in its central coat of arms?",
            ["Vatican City", "Israel", "Dominican Republic", "El Salvador"],
            2, "It is a Caribbean nation sharing an island with Haiti."),

        // Mythology | Answer: B (1)
        q('q16_15', 16, 20000000, "In the Mahabharata, what was the name of the divine weapon given to Karna by Lord Indra in exchange for his Kavacha (armor) and Kundala (earrings)?",
            ["Pashupatastra", "Vasavi Shakti", "Brahmastra", "Narayanastra"],
            1, "It could only be used once and was used to kill Ghatotkacha."),

        // Mathematics | Answer: D (3)
        q('q16_16', 16, 20000000, "The famous 'Seven Bridges of Königsberg' problem, solved by Leonhard Euler, laid the foundation for which branch of mathematics?",
            ["Calculus", "Number Theory", "Probability", "Graph Theory"],
            3, "It involves the study of nodes and edges."),

        // Environment | Answer: A (0)
        q('q16_17', 16, 20000000, "The 'Kigali Amendment' to the Montreal Protocol is specifically aimed at phasing down the production and consumption of which potent greenhouse gases?",
            ["Hydrofluorocarbons (HFCs)", "Chlorofluorocarbons (CFCs)", "Methane", "Carbon Dioxide"],
            0, "These are often used as replacements for ozone-depleting substances in air conditioning."),

        // Famous Personalities | Answer: B (1)
        q('q16_18', 16, 20000000, "Before becoming the President of the United States, which leader obtained a license to work as a bartender?",
            ["George Washington", "Abraham Lincoln", "Franklin D. Roosevelt", "Theodore Roosevelt"],
            1, "He co-owned a tavern called 'Berry and Lincoln' in New Salem."),

        // Inventions | Answer: D (3)
        q('q16_19', 16, 20000000, "Which modern kitchen appliance was invented by Percy Spencer after he noticed a chocolate bar melting in his pocket while standing near a magnetron?",
            ["Toaster", "Electric Kettle", "Refrigerator", "Microwave Oven"],
            3, "He was working for Raytheon at the time."),

        // General Trivia | Answer: D (3)
        q('q16_20', 16, 20000000, "The 'Black Diamond' is a rare, dark purple variety of which common fruit, found primarily in the mountains of Tibet?",
            ["Grape", "Plum", "Watermelon", "Apple"],
            3, "Despite the name, the flesh inside is white like the common variety.")
    ],
    17: [
        // Indian History | Answer: C (2)
        q('q17_1', 17, 30000000, "Which Satavahana ruler is credited with composing the 'Gaha Sattasai' (Gathasaptasati), a collection of 700 poems in the Maharashtri Prakrit language?",
            ["Gautamiputra Satakarni", "Vashishthiputra Pulumavi", "King Hala", "Yajnashri Satakarni"],
            2, "His name translates to 'plough' in Sanskrit, and he ruled for a short period of five years."),

        // World History | Answer: B (1)
        q('q17_2', 17, 30000000, "The 'Balfour Declaration' of 1917, a public statement issued by the British government, announced support for the establishment of a 'national home' in which region?",
            ["Transjordan", "Palestine", "Mesopotamia", "Egypt"],
            1, "This declaration played a massive role in the geopolitical makeup of the modern Middle East."),

        // Geography | Answer: A (0)
        q('q17_3', 17, 30000000, "Which Soviet scientific project, abandoned in 1992, remains the deepest artificial point on Earth, reaching a depth of 12,262 meters?",
            ["Kola Superdeep Borehole", "Mariana Drilling Project", "Z-44 Chayvo Well", "Vostok Ice Core"],
            0, "It is located on a peninsula in the far northwest of Russia."),

        // Indian Polity | Answer: A (0)
        q('q17_4', 17, 30000000, "Who was the only Speaker of the Lok Sabha to have also served as the President of India?",
            ["Neelam Sanjiva Reddy", "G.V. Mavalankar", "P.A. Sangma", "Shivraj Patil"],
            0, "He was elected unopposed as the President of India."),

        // Economics | Answer: B (1)
        q('q17_5', 17, 30000000, "Which specific committee was formed by the Government of India in 1949 to calculate the National Income for the first time after Independence?",
            ["The Gadgil Committee", "The Mahalanobis Committee", "The V.K.R.V. Rao Committee", "The K.N. Raj Committee"],
            1, "It was chaired by the architect of the Second Five-Year Plan."),

        // Science and Technology | Answer: B (1)
        q('q17_6', 17, 30000000, "In 1962, which satellite became the first active communications satellite to relay live television signals across the Atlantic Ocean?",
            ["Sputnik 2", "Telstar 1", "Syncom 3", "Explorer 1"],
            1, "It inspired a number-one hit song by the instrumental band The Tornados."),

        // Biology | Answer: A (0)
        q('q17_7', 17, 30000000, "What is the specific name of the immortal jellyfish species that can revert its cells back to their earliest form and grow anew?",
            ["Turritopsis dohrnii", "Physalia physalis", "Chironex fleckeri", "Aurelia aurita"],
            0, "It is named after the biological genus it belongs to, starting with 'T'."),

        // Current Affairs | Answer: C (2)
        q('q17_8', 17, 30000000, "In 2024, which country became the 32nd member to officially join the North Atlantic Treaty Organization (NATO)?",
            ["Finland", "Ukraine", "Sweden", "Georgia"],
            2, "This Nordic nation abandoned its long-standing policy of military non-alignment following the conflict in Ukraine."),

        // Sports and Games | Answer: B (1)
        q('q17_9', 17, 30000000, "Who is the only cricketer to have captained a team in more than 100 Test matches?",
            ["Ricky Ponting", "Graeme Smith", "Steve Waugh", "Allan Border"],
            1, "He was a left-handed opening batsman and captained South Africa."),

        // Arts and Culture | Answer: B (1)
        q('q17_10', 17, 30000000, "The famous 'Ragamala' paintings, illustrating various musical modes, are primarily associated with which school of miniature painting?",
            ["Pahari School", "Rajasthani School", "Mughal School", "Deccani School"],
            1, "While found in others, this style is most deeply rooted in the royal courts of Rajputana."),

        // Literature | Answer: C (2)
        q('q17_11', 17, 30000000, "Which Nobel Laureate wrote the introduction to the first English translation of Rabindranath Tagore's 'Gitanjali'?",
            ["T.S. Eliot", "George Bernard Shaw", "W.B. Yeats", "Rudyard Kipling"],
            2, "He was an Irish poet famous for 'The Second Coming'."),

        // Film and Entertainment | Answer: C (2)
        q('q17_12', 17, 30000000, "Who was the first Indian to win an Oscar in a competitive category?",
            ["Satyajit Ray", "Resul Pookutty", "Bhanu Athaiya", "A.R. Rahman"],
            2, "She won the award for Best Costume Design for the 1982 film Gandhi."),

        // World Capitals | Answer: D (3)
        q('q17_13', 17, 30000000, "Which is the only national capital city in the world that borders three different countries (including its own)?",
            ["Vienna", "Asunción", "Kinshasa", "Bratislava"],
            3, "It is the capital of Slovakia and borders Austria and Hungary."),

        // Flags, Currencies and Symbols | Answer: D (3)
        q('q17_14', 17, 30000000, "The 'Ashoka Chakra' on the Indian flag replaced which symbol that was present on the flag adopted by the Indian National Congress in 1931?",
            ["The Lotus", "The Lion Capital", "The Om Symbol", "The Charkha (Spinning Wheel)"],
            3, "It represented self-reliance and was popularized by Mahatma Gandhi."),

        // Mythology | Answer: C (2)
        q('q17_15', 17, 30000000, "In the Mahabharata, the twin Pandavas blew distinct conch shells at the start of the war. Nakula blew the Sughosha; what was the name of the conch blown by Sahadeva?",
            ["Paundra", "Devadatta", "Manipushpaka", "Anantavijaya"],
            2, "The name roughly translates to 'Jeweled Flower'."),

        // Mathematics | Answer: D (3)
        q('q17_16', 17, 30000000, "The 'Fields Medal,' often regarded as the Nobel Prize of Mathematics, is awarded every four years to mathematicians under what age?",
            ["35", "45", "50", "40"],
            3, "This age limit was established to encourage future achievement, not just past excellence."),

        // Environment | Answer: B (1)
        q('q17_17', 17, 30000000, "Published in 1987, the 'Brundtland Report' coined and popularized which major environmental and economic concept?",
            ["Carbon Footprint", "Sustainable Development", "Circular Economy", "Greenwashing"],
            1, "It defined the concept as meeting the needs of the present without compromising future generations."),

        // Famous Personalities | Answer: D (3)
        q('q17_18', 17, 30000000, "Before becoming a revolutionary leader, Ho Chi Minh worked as a pastry chef in the kitchen of which famous hotel?",
            ["The Ritz, Paris", "The Savoy, London", "The Plaza, New York", "The Carlton, London"],
            3, "He worked under the legendary chef Auguste Escoffier in London."),

        // Inventions | Answer: D (3)
        q('q17_19', 17, 30000000, "What accidental discovery did Percy Spencer make in 1945 while working on a magnetron for radar sets?",
            ["Teflon", "Super Glue", "Velcro", "The Microwave Oven"],
            3, "He noticed a chocolate bar in his pocket had melted."),

        // General Trivia | Answer: A (0)
        q('q17_20', 17, 30000000, "The phrase 'white elephant,' referring to a possession that is useless or troublesome, originates from the practices of the monarchs of which country?",
            ["Thailand (Siam)", "India", "Ivory Coast", "Kenya"],
            0, "The King would gift these sacred but expensive-to-maintain animals to courtiers he disliked to ruin them financially.")
    ],
    18: [
        // Indian History | Answer: A (0)
        q('q18_1', 18, 50000000, "Which Qutb Shahi ruler issued the 'Golden Firman' in 1632, granting the British East India Company free trade rights in the kingdom's ports for 500 pagodas?",
            ["Sultan of Golconda (Abdullah Qutb Shah)", "Mughal Emperor Shah Jahan", "Sultan of Bijapur (Muhammad Adil Shah)", "Zamorin of Calicut"],
            0, "This ruler belonged to the Qutb Shahi dynasty, and the decree opened up the port of Masulipatnam to the British."),

        // World History | Answer: B (1)
        q('q18_2', 18, 50000000, "By what distinctive nickname was King Louis XI of France (1461–1483) known, referring to the webs of intrigue and diplomatic traps he spun against his enemies?",
            ["The Sun King", "The Universal Spider", "The Iron Mask", "The Hammer of Heretics"],
            1, "The nickname implies an arachnid that spins a web to trap its prey."),

        // Geography | Answer: C (2)
        q('q18_3', 18, 50000000, "The 'Ninety East Ridge,' a 5,000 km long submarine volcanic ridge named after the meridian it runs parallel to, is located in which ocean?",
            ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
            2, "It divides the Bengal Fan from the Nicobar Fan."),

        // Indian Polity | Answer: A (0)
        q('q18_4', 18, 50000000, "Who was the calligrapher responsible for the original Hindi version of the Indian Constitution, distinct from Prem Behari Narayan Raizada who wrote the English version?",
            ["Vasant Krishan Vaidya", "Nandalal Bose", "Beohar Rammanohar Sinha", "Dinanath Bhargava"],
            0, "He was a student of the Art School at Shantiniketan and focused specifically on the Hindi script."),

        // Economics | Answer: D (3)
        q('q18_5', 18, 50000000, "Which of these prominent industrialists was NOT one of the eight signatories of the 1944 'Bombay Plan' for the development of the post-independence Indian economy?",
            ["J.R.D. Tata", "G.D. Birla", "Walchand Hirachand", "Jamnalal Bajaj"],
            3, "The person in the correct option had passed away in 1942, two years before the plan was published."),

        // Science and Technology | Answer: C (2)
        q('q18_6', 18, 50000000, "In 1995, physicists Eric Cornell and Carl Wieman created which new state of matter at temperatures near absolute zero, confirming a prediction made 70 years earlier?",
            ["Fermionic Condensate", "Plasma", "Bose-Einstein Condensate", "Quark-Gluon Plasma"],
            2, "The name honors an Indian physicist and a German theoretical physicist."),

        // Biology | Answer: D (3)
        q('q18_7', 18, 50000000, "In which specific part of the human body are 'Peyer's Patches,' organized lymphoid follicles crucial for immune surveillance, primarily found?",
            ["Stomach lining", "Esophagus", "Large Intestine", "Ileum (Small Intestine)"],
            3, "They are most concentrated in the distal portion of the small intestine."),

        // Current Affairs | Answer: A (0)
        q('q18_8', 18, 50000000, "Which private company developed the 'Peregrine Mission One' lunar lander, which failed to reach the moon after its launch in January 2024?",
            ["Astrobotic Technology", "Intuitive Machines", "Blue Origin", "SpaceX"],
            0, "The company is based in Pittsburgh, and the lander was named after a type of falcon."),

        // Sports and Games | Answer: C (2)
        q('q18_9', 18, 50000000, "Sir Jack Hobbs, known as 'The Master,' holds the record for the most first-class centuries in cricket history with exactly how many hundreds?",
            ["100", "151", "199", "212"],
            2, "He finished just one short of a double century of centuries."),

        // Arts and Culture | Answer: B (1)
        q('q18_10', 18, 50000000, "The 'Pattachitra' style of traditional cloth-based scroll painting, known for its intricate details and mythological narratives, is native to which state?",
            ["Rajasthan", "Odisha", "Gujarat", "Maharashtra"],
            1, "The art form is closely linked with the worship of Lord Jagannath."),

        // Literature | Answer: D (3)
        q('q18_11', 18, 50000000, "What is the title of the monumental Persian translation of the Mahabharata that was commissioned by Emperor Akbar?",
            ["Iyar-i-Danish", "Hamzanama", "Tutinama", "Razmnama"],
            3, "The title literally translates to 'Book of War' in Persian."),

        // Film and Entertainment | Answer: A (0)
        q('q18_12', 18, 50000000, "Which Indian film was awarded the 'Grand Prix' (equivalent to the Palme d'Or) at the very first Cannes Film Festival held in 1946?",
            ["Neecha Nagar", "Do Bigha Zamin", "Awaara", "Kalpana"],
            0, "Directed by Chetan Anand, this film was an expressionist social drama based on a story by Maxim Gorky."),

        // World Capitals | Answer: D (3)
        q('q18_13', 18, 50000000, "Which capital city was renamed 'Nur-Sultan' in 2019 in honor of a leader, only to have its original name restored in 2022?",
            ["Bishkek", "Tashkent", "Ashgabat", "Astana"],
            3, "It is the capital of Kazakhstan."),

        // Flags, Currencies and Symbols | Answer: B (1)
        q('q18_14', 18, 50000000, "Which is the only national flag in the world that currently features a modern assault rifle (the AK-47) as part of its official design?",
            ["Angola", "Mozambique", "Zimbabwe", "East Timor"],
            1, "The flag also features a book and a hoe."),

        // Mythology | Answer: C (2)
        q('q18_15', 18, 50000000, "In the Mahabharata, the twin Pandavas blew distinct conch shells at the start of the war. Nakula blew the Sughosha; what was the name of the conch blown by Sahadeva?",
            ["Paundra", "Devadatta", "Manipushpaka", "Anantavijaya"],
            2, "The name roughly translates to 'Jeweled Flower'."),

        // Mathematics | Answer: B (1)
        q('q18_16', 18, 50000000, "For solving which of the Millennium Prize Problems did Russian mathematician Grigori Perelman refuse the Fields Medal in 2006?",
            ["Riemann Hypothesis", "Poincaré Conjecture", "P vs NP Problem", "Navier–Stokes Existence"],
            1, "The problem concerns the characterization of the 3-sphere."),

        // Environment | Answer: D (3)
        q('q18_17', 18, 50000000, "Which international organization compiles and publishes the 'Red List of Threatened Species', the world's most comprehensive inventory of global conservation status?",
            ["WWF", "UNEP", "Greenpeace", "IUCN"],
            3, "Its headquarters are in Gland, Switzerland."),

        // Famous Personalities | Answer: D (3)
        q('q18_18', 18, 50000000, "Who was the first woman to hold the portfolio of Finance Minister of India, doing so while also serving as Prime Minister?",
            ["Nirmala Sitharaman", "Sarojini Naidu", "Rajkumari Amrit Kaur", "Indira Gandhi"],
            3, "She took charge of the Finance portfolio in 1970; Nirmala Sitharaman was the first full-time female FM."),

        // Inventions | Answer: B (1)
        q('q18_19', 18, 50000000, "In the 'Float Glass' process invented by Sir Alastair Pilkington, molten glass is floated on a bath of which molten metal to create a flat surface?",
            ["Mercury", "Tin", "Lead", "Gallium"],
            1, "This metal remains liquid at the temperature where glass begins to solidify."),

        // General Trivia | Answer: C (2)
        q('q18_20', 18, 50000000, "The English word 'Checkmate' is derived from the Persian phrase 'Shah Mat,' which literally translates to what?",
            ["The King is Dead", "The King is Alone", "The King is Helpless", "The King is Captured"],
            2, "While often mistranslated as 'dead,' the roots suggest a state of being frozen or ambushed.")
    ],
    19: [
        // Indian History | Answer: B (1)
        q('q19_1', 19, 70000000, "In the historic trial of the last Mughal Emperor, Bahadur Shah Zafar, in 1858, which British officer served as the Judge Advocate General (prosecutor), famously arguing that the mutiny was a result of a Muslim conspiracy?",
            ["Major General Wilson", "Major F.J. Harriott", "Colonel James Outram", "Captain William Hodson"],
            1, "He is also known for organizing the trial at the Red Fort and was the one to pronounce the sentence of exile to Rangoon."),

        // World History | Answer: D (3)
        q('q19_2', 19, 70000000, "The \"War of the Stray Dog\" (1925), a brief military conflict triggered by a soldier chasing his dog across the border, took place between which two nations?",
            ["El Salvador and Honduras", "Italy and Ethiopia", "Bolivia and Paraguay", "Greece and Bulgaria"],
            3, "The incident occurred at the pass of Demir Kapia on the border of these two Balkan nations."),

        // Geography | Answer: D (3)
        q('q19_3', 19, 70000000, "At 7,570 meters (24,836 ft), Gangkhar Puensum holds the title of being the highest unclimbed mountain in the world. It is located in which country?",
            ["Nepal", "Pakistan", "China", "Bhutan"],
            3, "Mountaineering has been banned here out of respect for local spiritual beliefs."),

        // Indian Polity | Answer: B (1)
        q('q19_4', 19, 70000000, "In the original handcrafted Constitution of India, the section on Fundamental Rights (Part III) is illuminated with a sketch depicting which mythological figures?",
            ["Krishna delivering the Gita", "Rama, Lakshmana, and Sita", "Nataraja", "Gautama Buddha"],
            1, "The illustration symbolizes the triumph of righteousness (Dharma), paralleling the establishment of rights."),

        // Economics | Answer: C (2)
        q('q19_5', 19, 70000000, "The \"Bombay Plan\" of 1944 was a set of proposals for the development of the post-independence Indian economy; who among the following was the only professional economist (non-industrialist) to sign the plan?",
            ["C.D. Deshmukh", "V.K.R.V. Rao", "John Matthai", "P.C. Mahalanobis"],
            2, "He later went on to present India's first Railway Budget and subsequently served as the Finance Minister."),

        // Science and Technology | Answer: A (0)
        q('q19_6', 19, 70000000, "The famous \"Wow! signal,\" a strong narrowband radio signal received by the Big Ear radio telescope in 1977, is represented by which six-character alphanumeric sequence circled on the computer printout?",
            ["6EQUJ5", "5RQZJ6", "7XQW99", "1A2B3C"],
            0, "This sequence represented the intensity of the signal, which rose and fell over 72 seconds."),

        // Biology | Answer: D (3)
        q('q19_7', 19, 70000000, "The \"Coelacanth\" was believed to have gone extinct 66 million years ago until a living specimen was discovered in 1938; in honor of the museum curator who recognized the find, what is the specific species name of this West Indian Ocean coelacanth?",
            ["Tiktaalik roseae", "Latimeria menadoensis", "Eusthenopteron foordi", "Latimeria chalumnae"],
            3, "It was named after Marjorie Courtenay-Latimer, who found the fish among a local fisherman's catch in South Africa."),

        // Current Affairs | Answer: C (2)
        q('q19_8', 19, 70000000, "The \"2023 Nobel Peace Prize\" was awarded to Nargis Mohammadi for her fight against the oppression of women in Iran; in her absence, who accepted the award on her behalf at the ceremony in Oslo?",
            ["Her husband", "Her lawyer", "Her twin children", "Her sister"],
            2, "Her 17-year-old twins, Ali and Kiana Rahmani, collected the medal and read her speech."),

        // Sports and Games | Answer: D (3)
        q('q19_9', 19, 70000000, "Walter Winans, an American marksman and artist, holds the unique distinction of being the only person to win Olympic Gold medals in which two disparate categories?",
            ["Archery and Poetry", "Fencing and Architecture", "Equestrian and Painting", "Shooting and Sculpture"],
            3, "He won Gold in \"Running Deer\" shooting (1908) and Gold in the art competition for his bronze bust \"An American Trotter\" (1912)."),

        // Arts and Culture | Answer: A (0)
        q('q19_10', 19, 70000000, "The 'Padshahnama' is a genre of works written as the official visual history of the reign of which Mughal Emperor?",
            ["Shah Jahan", "Jahangir", "Akbar", "Aurangzeb"],
            0, "The most famous volume contains incredible miniature paintings and is currently in the Royal Collection at Windsor Castle."),

        // Literature | Answer: C (2)
        q('q19_11', 19, 70000000, "The mysterious \"Voynich Manuscript,\" written in an unknown script and language, is currently named after the book dealer who purchased it in 1912; in the catalog of which university library is it officially known as \"MS 408\"?",
            ["Oxford (Bodleian)", "Harvard (Widener)", "Yale (Beinecke)", "Cambridge (Trinity)"],
            2, "It is housed in the Beinecke Rare Book & Manuscript Library in New Haven, Connecticut."),

        // Film and Entertainment | Answer: B (1)
        q('q19_12', 19, 70000000, "Bhanu Athaiya became the first Indian to win an Oscar (Best Costume Design); for the film Gandhi, she shared this award with which British costume designer?",
            ["Edith Head", "John Mollo", "Anthony Powell", "Sandy Powell"],
            1, "He is also famous for designing the costumes for the original Star Wars films."),

        // World Capitals | Answer: C (2)
        q('q19_13', 19, 70000000, "Ulaanbaatar holds the record for being the coldest national capital city in the world on average. It is the capital of which country?",
            ["Kazakhstan", "Kyrgyzstan", "Mongolia", "Belarus"],
            2, "It is a landlocked nation located between Russia and China."),

        // Flags, Currencies and Symbols | Answer: A (0)
        q('q19_14', 19, 70000000, "The Constitution of which country contains a specific Schedule (Article 8) that details the precise geometric steps to draw its national flag, involving \"lines,\" \"angles,\" and \"circles\"?",
            ["Nepal", "Bhutan", "Switzerland", "Saudi Arabia"],
            0, "It is the only non-quadrilateral national flag in the world, and the constitution mandates 24 specific steps to construct it perfectly."),

        // Mythology | Answer: C (2)
        q('q19_15', 19, 70000000, "In Norse mythology, what is the name of the squirrel that runs up and down the world tree, Yggdrasil, to carry insults between the eagle at the top and the dragon Níðhöggr at the bottom?",
            ["Fenrir", "Sleipnir", "Ratatoskr", "Tanngrisnir"],
            2, "The name translates roughly to \"drill-tooth\" or \"bore-tooth\"."),

        // Mathematics | Answer: B (1)
        q('q19_16', 19, 70000000, "The \"Fields Medal\" is often called the Nobel Prize of Mathematics; who is the only mathematician in history to have been awarded the medal but famously declined to accept it in 2006?",
            ["Maryam Mirzakhani", "Grigori Perelman", "Terence Tao", "Andrew Wiles"],
            1, "He solved the Poincaré conjecture but rejected the medal and the $1 million Clay Millennium Prize, stating, \"I'm not interested in money or fame.\""),

        // Environment | Answer: D (3)
        q('q19_17', 19, 70000000, "\"Pando,\" also known as the Trembling Giant, is a massive clonal colony of a single male quaking aspen; it is considered one of the heaviest and oldest living organisms on Earth and is located in which US state?",
            ["California", "Oregon", "Montana", "Utah"],
            3, "It covers 106 acres in the Fishlake National Forest."),

        // Famous Personalities | Answer: C (2)
        q('q19_18', 19, 70000000, "Which future Hollywood icon and humanitarian worked as a courier for the Dutch Resistance during World War II, delivering papers and money, and even performed silent dances to raise funds for the resistance?",
            ["Grace Kelly", "Elizabeth Taylor", "Audrey Hepburn", "Ingrid Bergman"],
            2, "She was living in Arnhem, Netherlands, during the war and suffered from severe malnutrition during the Dutch Famine."),

        // Inventions | Answer: A (0)
        q('q19_19', 19, 70000000, "George de Mestral, a Swiss engineer, invented Velcro in 1941; he was inspired to create the fastening system after noticing how the burrs of which specific plant stuck to his dog's fur?",
            ["Burdock", "Cocklebur", "Dandelion", "Thistle"],
            0, "He examined the burrs under a microscope and saw hundreds of tiny hooks that caught on loops of hair."),

        // General Trivia | Answer: B (1)
        q('q19_20', 19, 70000000, "In typography and anatomy, the \"Glabella\" is the smooth part of the forehead above and between the eyebrows; the term is derived from the Latin word glabellus, which means what?",
            ["Center", "Hairless", "Wrinkled", "Bone"],
            1, "It refers to the area being free of hair (unlike the eyebrows surrounding it).")
    ],
    20: [
        // Indian History | Answer: D (3)
        q('q20_1', 20, 100000000, "Which Mauryan emperor's reign saw the original construction of the Sudarshana Lake by Pushyagupta?",
            ["Bindusara", "Rudradaman I", "Skandagupta", "Chandragupta Maurya"],
            3, "The lake was later repaired by a Greek Governor named Tushaspha during Ashoka's reign."),

        // World History | Answer: C (2)
        q('q20_2', 20, 100000000, "The 'War of the Golden Stool' was triggered by a British demand to sit on the 'Sika Dwa Kofi', the sacred soul of which empire?",
            ["Zulu Kingdom", "Kingdom of Benin", "Ashanti Empire", "Mali Empire"],
            2, "This empire was located in modern-day Ghana, and the stool was never allowed to touch the ground."),

        // Geography | Answer: A (0)
        q('q20_3', 20, 100000000, "The 'Caprivi Strip' was acquired by Germany in 1890 to provide access to which major river?",
            ["Zambezi River", "Congo River", "Orange River", "Limpopo River"],
            0, "The strip is named after German Chancellor Leo von Caprivi, who swapped Zanzibar for it."),

        // Indian Polity | Answer: D (3)
        q('q20_4', 20, 100000000, "Who served as the 'Chief Draftsman' of the Constituent Assembly of India and put the proposals into legal language?",
            ["B.N. Rau", "H.V.R. Iyengar", "Prem Behari Narain Raizada", "S.N. Mukherjee"],
            3, "Dr. Ambedkar praised this man in the Assembly for his ability to simplify complex proposals."),

        // Economics | Answer: A (0)
        q('q20_5', 20, 100000000, "Who was the primary author of the 1944 'Gandhian Plan' for India's economic development?",
            ["Shriman Narayan Agarwal", "J.C. Kumarappa", "M. Visvesvaraya", "Purushottamdas Thakurdas"],
            0, "The author was a strict Gandhian and later served as the Governor of Gujarat."),

        // Science and Technology | Answer: A (0)
        q('q20_6', 20, 100000000, "What was the name of the first cat launched into space by France in 1963 who returned safely to Earth?",
            ["Félicette", "Belle", "Choupette", "Minette"],
            0, "She was a tuxedo cat found on the streets of Paris, often referred to by the press as 'Astrocat'."),

        // Biology | Answer: A (0)
        q('q20_7', 20, 100000000, "What name, meaning 'dried' or 'taboo', did Comoros fishermen give to the Coelacanth fish before its scientific rediscovery?",
            ["Gombessa", "Latimeria", "Mamele", "Tiktaalik"],
            0, "The fishermen didn't eat it because its flesh was oily and caused illness; they used its rough scales as sandpaper."),

        // Current Affairs | Answer: D (3)
        q('q20_8', 20, 100000000, "In 2017, the Whanganui River became the first river in the world to be granted legal human rights in which country?",
            ["India", "Brazil", "Canada", "New Zealand"],
            3, "The local Maori tribe had fought for over 140 years to get this legal recognition for their ancestor river."),

        // Sports and Games | Answer: B (1)
        q('q20_9', 20, 100000000, "Cotah Ramaswami represented India in Test Cricket and which other sport in the Davis Cup?",
            ["Badminton", "Tennis", "Table Tennis", "Squash"],
            1, "The Davis Cup is the premier international team event in men's tennis."),

        // Arts and Culture | Answer: B (1)
        q('q20_10', 20, 100000000, "Which specific Raag did Ustad Bismillah Khan play on the Shehnai at the Red Fort to mark India's independence in 1947?",
            ["Raag Bhairavi", "Raag Kafi", "Raag Yaman", "Raag Malkauns"],
            1, "This raag is often associated with the Holi festival and the spring season, but was chosen for its celebratory nature."),

        // Literature | Answer: C (2)
        q('q20_11', 20, 100000000, "Who was the first recipient of the Sahitya Akademi Award for English literature in 1960 for the novel 'The Guide'?",
            ["Mulk Raj Anand", "Raja Rao", "R.K. Narayan", "Ruskin Bond"],
            2, "The book was later adapted into a famous film starring Dev Anand."),

        // Film and Entertainment | Answer: B (1)
        q('q20_12', 20, 100000000, "Which 1955 film is the only one to have won both the 'Palme d'Or' and the Academy Award for 'Best Picture'?",
            ["The Lost Weekend", "Marty", "Parasite", "The Godfather"],
            1, "It is a romantic drama starring Ernest Borgnine as a lonely butcher."),

        // World Capitals | Answer: D (3)
        q('q20_13', 20, 100000000, "Vaduz is the capital city of which tiny, double-landlocked European microstate?",
            ["San Marino", "Andorra", "Monaco", "Liechtenstein"],
            3, "This country is sandwiched entirely between Switzerland and Austria."),

        // Flags, Currencies and Symbols | Answer: C (2)
        q('q20_14', 20, 100000000, "Whose design suggestion led to the Ashoka Chakra replacing the Charkha in the center of the Indian flag?",
            ["Pingali Venkayya", "Sarojini Naidu", "Surayya Tyabji", "Kanaiyalal Munshi"],
            2, "She was an artist and a member of various committees in the Constituent Assembly, wife of a civil servant."),

        // Mythology | Answer: B (1)
        q('q20_15', 20, 100000000, "In the Mahabharata, who was the only Kaurava brother to stand up and object to the disrobing of Draupadi in the assembly hall?",
            ["Yuyutsu", "Vikarna", "Dussasana", "Durmukha"],
            1, "He argued that Yudhishthira had already lost himself in the dice game and therefore had no right to stake Draupadi."),

        // Mathematics | Answer: C (2)
        q('q20_16', 20, 100000000, "Which mathematician was the first to use the Greek letter 'π' (pi) to denote the circle ratio in 1706?",
            ["Isaac Newton", "Gottfried Leibniz", "William Jones", "John Wallis"],
            2, "He was a Welsh mathematician and a close friend of Sir Isaac Newton."),

        // Environment | Answer: A (0)
        q('q20_17', 20, 100000000, "The 'Chipko Movement' was inspired by a 1730 sacrifice led by which woman to protect Khejri trees?",
            ["Amrita Devi", "Gaura Devi", "Medha Patkar", "Vandana Shiva"],
            0, "The incident took place in the village of Khejarli, Rajasthan."),

        // Famous Personalities | Answer: D (3)
        q('q20_18', 20, 100000000, "Who is the only person to have been awarded both the Bharat Ratna and the Nishan-e-Pakistan?",
            ["Nelson Mandela", "Mother Teresa", "Atal Bihari Vajpayee", "Morarji Desai"],
            3, "He served as the Prime Minister of India and was known for his efforts to normalize relations with Pakistan."),

        // Inventions | Answer: B (1)
        q('q20_19', 20, 100000000, "What was the primary mechanical reason for Christopher Sholes to arrange the QWERTY keyboard keys in non-alphabetical order?",
            ["To increase typing speed", "To separate frequently used letter pairs", "To translate Morse code easier", "To balance hand load"],
            1, "In early typewriters, if two adjacent keys were pressed in quick succession, the metal arms would clash and stick."),

        // General Trivia | Answer: C (2)
        q('q20_20', 20, 100000000, "What is the literal meaning of the Persian phrase 'Shah Mat' from which the chess term 'Checkmate' is derived?",
            ["The King is Dead", "The King is Trapped", "The King is Helpless", "The King is Alone"],
            2, "While often mistranslated as 'dead', linguists argue the original meaning implies a state of defeat or being frozen.")
    ]
};