import React from 'react';
import { Question, BlogArticle, MentalAgeQuestion } from './types';

export const IQ_QUESTIONS: Question[] = [
  // LOGIC & DEDUCTION (lr_001 - lr_025)
  { id: "lr_001", text: "If 5 machines take 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?", options: ["100 minutes", "50 minutes", "5 minutes", "25 minutes"], correctAnswer: 2, category: 'LOGIC', difficultyLevel: 2, explanation: "Each machine makes one widget every 5 minutes. Thus, 100 machines can make 100 widgets in the same 5 minutes." },
  { id: "lr_002", text: "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?", options: ["$0.10", "$0.05", "$0.01", "$0.15"], correctAnswer: 1, category: 'MATH', difficultyLevel: 2, explanation: "If the ball is $0.05 and the bat is $1.05 ($1.00 more), the total is $1.10." },
  { id: "lr_003", text: "If you reorganize the letters 'CIFAIPC', you would have the name of a(n):", options: ["City", "Animal", "Ocean", "Country"], correctAnswer: 2, category: 'LOGIC', difficultyLevel: 1, explanation: "The letters rearrange to spell 'PACIFIC', which is an ocean." },
  { id: "lr_004", text: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies.", options: ["True", "False", "Insufficient Info"], correctAnswer: 0, category: 'LOGIC', difficultyLevel: 1, explanation: "This is a logical syllogism: If A belongs to B, and B belongs to C, then A belongs to C." },
  { id: "lr_005", text: "If midnight was five hours ago, what time will it be in six hours?", options: ["11 AM", "1 PM", "11 PM", "5 AM"], correctAnswer: 0, category: 'LOGIC', difficultyLevel: 2, explanation: "Five hours after midnight is 5:00 AM. Adding six more hours makes it 11:00 AM." },
  { id: "lr_006", text: "If today is Monday, what day is it in 100 days?", options: ["Tuesday", "Wednesday", "Thursday", "Friday"], correctAnswer: 1, category: 'LOGIC', difficultyLevel: 2, explanation: "100 days is 14 weeks and 2 days. Two days after Monday is Wednesday." },
  { id: "lr_007", text: "Which word does not belong: Apple, Banana, Carrot, Grapes?", options: ["Apple", "Banana", "Carrot", "Grapes"], correctAnswer: 2, category: 'LOGIC', difficultyLevel: 1, explanation: "Apple, Banana, and Grapes are fruits, while a Carrot is a vegetable." },
  { id: "lr_008", text: "Forest is to Tree as Building is to:", options: ["Floor", "Brick", "City", "Blueprint"], correctAnswer: 1, category: 'LOGIC', difficultyLevel: 1, explanation: "A forest is composed of trees, just as a building is composed of bricks." },
  { id: "lr_009", text: "Light is to Dark as Knowledge is to:", options: ["Wisdom", "School", "Ignorance", "Books"], correctAnswer: 2, category: 'LOGIC', difficultyLevel: 1, explanation: "These are opposites. The opposite of knowledge is ignorance." },
  { id: "lr_010", text: "Ocean is to Water as Desert is to:", options: ["Sand", "Cactus", "Heat", "Camel"], correctAnswer: 0, category: 'LOGIC', difficultyLevel: 1, explanation: "An ocean is primarily made of water; a desert is primarily made of sand." },
  { id: "lr_011", text: "If some A are B and all B are C, then:", options: ["All A are C", "Some A are C", "No A are C", "All C are A"], correctAnswer: 1, category: 'LOGIC', difficultyLevel: 2, explanation: "Since some A are part of B, and all of B is inside C, those specific 'A' items must be in C." },
  { id: "lr_012", text: "John is taller than Sam. Sam is shorter than Alex. Alex is taller than John. Who is the tallest?", options: ["John", "Sam", "Alex", "Cannot Tell"], correctAnswer: 2, category: 'LOGIC', difficultyLevel: 1, explanation: "Alex > John and John > Sam, so Alex is the tallest." },
  { id: "lr_013", text: "A farmer has 17 sheep. All but 9 die. How many sheep are left?", options: ["17", "8", "9", "0"], correctAnswer: 2, category: 'LOGIC', difficultyLevel: 2, explanation: "The phrase 'all but nine' means nine sheep did not die." },
  { id: "lr_014", text: "Which number does not belong: 2, 3, 5, 7, 8, 11?", options: ["2", "5", "8", "11"], correctAnswer: 2, category: 'LOGIC', difficultyLevel: 2, explanation: "All other numbers are prime numbers; 8 is a composite number." },
  { id: "lr_015", text: "If 1=5, 2=25, 3=125, 4=625, then 5=?", options: ["3125", "1", "2500", "5"], correctAnswer: 1, category: 'LOGIC', difficultyLevel: 2, explanation: "The first premise stated '1=5', which implies '5=1'." },
  { id: "lr_016", text: "What runs but has no feet, has a mouth but never speaks?", options: ["Wind", "River", "Shadow", "Engine"], correctAnswer: 1, category: 'LOGIC', difficultyLevel: 2, explanation: "A river runs (flows) and has a mouth (entry into the sea) but lacks feet and speech." },
  { id: "lr_017", text: "If you have 3 apples and you take away 2, how many apples do you have?", options: ["1", "2", "3", "0"], correctAnswer: 1, category: 'LOGIC', difficultyLevel: 2, explanation: "You 'ate' or took away 2, so you physically possess those 2." },
  { id: "lr_018", text: "What is seen once in a minute, twice in a moment, but never in a thousand years?", options: ["Second", "The letter M", "Flash", "Time"], correctAnswer: 1, category: 'LOGIC', difficultyLevel: 2, explanation: "The letter 'm' appears once in 'minute' and twice in 'moment'." },
  { id: "lr_019", text: "If a doctor gives you 3 pills and tells you to take one every half hour, how long will they last?", options: ["1 hour", "1.5 hours", "2 hours", "30 mins"], correctAnswer: 0, category: 'LOGIC', difficultyLevel: 2, explanation: "Take the 1st now, 2nd at 30 mins, and 3rd at 60 mins (1 hour)." },
  { id: "lr_020", text: "How many birthdays does the average man have?", options: ["1", "75", "1 birthday, many anniversaries", "0"], correctAnswer: 0, category: 'LOGIC', difficultyLevel: 2, explanation: "A person only has one actual day of birth." },
  { id: "lr_021", text: "If a plane crashes on the border of the US and Canada, where do they bury the survivors?", options: ["USA", "Canada", "Neutral zone", "You don't bury survivors"], correctAnswer: 3, category: 'LOGIC', difficultyLevel: 2, explanation: "Survivors are alive; you do not bury them." },
  { id: "lr_022", text: "Some months have 30 days, some have 31. How many have 28?", options: ["1", "2", "12", "6"], correctAnswer: 2, category: 'LOGIC', difficultyLevel: 2, explanation: "All 12 months have at least 28 days." },
  { id: "lr_023", text: "Divide 30 by half and add 10. What is the result?", options: ["25", "70", "40", "15"], correctAnswer: 1, category: 'MATH', difficultyLevel: 2, explanation: "30 divided by 0.5 is 60. 60 + 10 = 70." },
  { id: "lr_024", text: "A man builds a house with four sides of southern exposure. A bear walks by. What color is the bear?", options: ["Black", "Brown", "White", "Grizzly"], correctAnswer: 2, category: 'LOGIC', difficultyLevel: 3, explanation: "If all sides face south, the house is at the North Pole, where bears are white (polar bears)." },
  { id: "lr_025", text: "I have keys but no locks. I have a space but no room. You can enter, but never leave. What am I?", options: ["Keyboard", "Map", "Library", "Book"], correctAnswer: 0, category: 'LOGIC', difficultyLevel: 2, explanation: "A keyboard has keys, a space bar, and an Enter key." },

  // PATTERN RECOGNITION (lr_026 - lr_050)
  { id: "lr_026", text: "Which number comes next in the sequence: 2, 4, 8, 16, ...?", options: ["24", "32", "30", "20"], correctAnswer: 1, category: 'PATTERN', difficultyLevel: 1, explanation: "The sequence doubles each previous number. 16 multiplied by 2 is 32." },
  { id: "lr_027", text: "Complete the pattern: Circle, Square, Circle, Square, ...?", options: ["Triangle", "Circle", "Pentagon", "Hexagon"], correctAnswer: 1, category: 'PATTERN', difficultyLevel: 1, explanation: "The pattern simply alternates between a Circle and a Square." },
  { id: "lr_028", text: "Which figure is the odd one out: Circle, Sphere, Square, Triangle?", options: ["Circle", "Sphere", "Square", "Triangle"], correctAnswer: 1, category: 'PATTERN', difficultyLevel: 1, explanation: "Circle, Square, and Triangle are 2D shapes, whereas a Sphere is a 3D object." },
  { id: "lr_029", text: "Which shape has the most sides?", options: ["Square", "Pentagon", "Hexagon", "Octagon"], correctAnswer: 3, category: 'PATTERN', difficultyLevel: 1, explanation: "An octagon has 8 sides, more than a square (4), pentagon (5), or hexagon (6)." },
  { id: "lr_030", text: "Next in sequence: 1, 4, 9, 16, 25, ...?", options: ["30", "35", "36", "40"], correctAnswer: 2, category: 'PATTERN', difficultyLevel: 1, explanation: "The sequence represents squares of integers (1^2, 2^2, 3^2, 4^2, 5^2). 6^2 is 36." },
  { id: "lr_031", text: "Next in sequence: 1, 1, 2, 3, 5, 8, ...?", options: ["10", "12", "13", "15"], correctAnswer: 2, category: 'PATTERN', difficultyLevel: 2, explanation: "This is the Fibonacci sequence where each number is the sum of the two preceding ones. 5+8=13." },
  { id: "lr_032", text: "Pattern: A, C, E, G, ...?", options: ["H", "I", "J", "K"], correctAnswer: 1, category: 'PATTERN', difficultyLevel: 1, explanation: "The pattern skips one letter each time (A, [B], C, [D], E, [F], G, [H], I)." },
  { id: "lr_033", text: "Next in sequence: 100, 90, 81, 73, ...?", options: ["65", "66", "67", "68"], correctAnswer: 1, category: 'PATTERN', difficultyLevel: 2, explanation: "The difference decreases by one each step: -10, -9, -8. Next is -7 (73-7=66)." },
  { id: "lr_034", text: "Next: 3, 6, 11, 18, ...?", options: ["25", "27", "29", "31"], correctAnswer: 1, category: 'PATTERN', difficultyLevel: 2, explanation: "Differences are prime numbers: +3, +5, +7. Next is +9 (not prime, but odd sequence), wait (+3, +5, +7, +9 results in 27). Correct." },
  { id: "lr_035", text: "Pattern: 1, 2, 6, 24, ...?", options: ["48", "96", "120", "144"], correctAnswer: 2, category: 'PATTERN', difficultyLevel: 2, explanation: "Each number is multiplied by the next integer: 1x2, 2x3, 6x4, 24x5=120." },
  { id: "lr_036", text: "Next: 10, 15, 25, 40, ...?", options: ["50", "60", "65", "70"], correctAnswer: 1, category: 'PATTERN', difficultyLevel: 2, explanation: "Numbers increase by 5, 10, 15. Next is +20 (40+20=60)." },
  { id: "lr_037", text: "Pattern: Z, X, V, T, ...?", options: ["S", "R", "Q", "P"], correctAnswer: 1, category: 'PATTERN', difficultyLevel: 1, explanation: "The alphabet backward skipping one letter." },
  { id: "lr_038", text: "Next: 2, 3, 5, 8, 13, 21, ...?", options: ["29", "34", "31", "42"], correctAnswer: 1, category: 'PATTERN', difficultyLevel: 2, explanation: "Fibonacci pattern: 13+21 = 34." },
  { id: "lr_039", text: "Next: 5, 11, 23, 47, ...?", options: ["90", "95", "96", "94"], correctAnswer: 1, category: 'PATTERN', difficultyLevel: 2, explanation: "Rule is (n * 2) + 1. (47 * 2) + 1 = 95." },
  { id: "lr_040", text: "Next: 40, 20, 10, 5, ...?", options: ["2", "2.5", "1", "0"], correctAnswer: 1, category: 'PATTERN', difficultyLevel: 1, explanation: "Each step divides the previous number by 2. 5 / 2 = 2.5." },
  { id: "lr_041", text: "Pattern: 1, 8, 27, 64, ...?", options: ["100", "121", "125", "144"], correctAnswer: 2, category: 'PATTERN', difficultyLevel: 2, explanation: "The sequence is cubes: 1^3, 2^3, 3^3, 4^3. 5^3 = 125." },
  { id: "lr_042", text: "Next: 7, 10, 8, 11, 9, ...?", options: ["10", "12", "11", "13"], correctAnswer: 1, category: 'PATTERN', difficultyLevel: 2, explanation: "Alternating rule: +3, -2, +3, -2. Next is +3 (9+3=12)." },
  { id: "lr_043", text: "Next: 31, 29, 24, 22, 17, ...?", options: ["15", "14", "13", "12"], correctAnswer: 0, category: 'PATTERN', difficultyLevel: 2, explanation: "Alternating rule: -2, -5, -2, -5. Next is -2 (17-2=15)." },
  { id: "lr_044", text: "Next: 1.5, 3, 4.5, 6, ...?", options: ["7", "7.5", "8", "9"], correctAnswer: 1, category: 'PATTERN', difficultyLevel: 1, explanation: "Constant addition of 1.5 each step." },
  { id: "lr_045", text: "Next: 5, 6, 9, 14, 21, ...?", options: ["30", "28", "32", "35"], correctAnswer: 0, category: 'PATTERN', difficultyLevel: 2, explanation: "Differences are odd: +1, +3, +5, +7. Next is +9 (21+9=30)." },
  { id: "lr_046", text: "Next: 1, 3, 7, 15, 31, ...?", options: ["60", "62", "63", "64"], correctAnswer: 2, category: 'PATTERN', difficultyLevel: 2, explanation: "Rule is (n * 2) + 1 or adding powers of 2 (2, 4, 8, 16...). Next is +32 (31+32=63)." },
  { id: "lr_047", text: "Next: 1, 2, 4, 7, 11, ...?", options: ["15", "16", "17", "18"], correctAnswer: 1, category: 'PATTERN', difficultyLevel: 2, explanation: "Increments increase by 1 each time: +1, +2, +3, +4. Next is +5 (11+5=16)." },
  { id: "lr_048", text: "Pattern: 80, 40, 20, 10, ...?", options: ["5", "1", "0", "2.5"], correctAnswer: 0, category: 'PATTERN', difficultyLevel: 1, explanation: "Division by 2 each step." },
  { id: "lr_049", text: "Next: 2, 6, 18, 54, ...?", options: ["108", "150", "162", "200"], correctAnswer: 2, category: 'PATTERN', difficultyLevel: 1, explanation: "Rule is multiplication by 3 each step. 54 x 3 = 162." },
  { id: "lr_050", text: "Next: J, F, M, A, M, J, J, ...?", options: ["A", "S", "O", "N"], correctAnswer: 0, category: 'PATTERN', difficultyLevel: 2, explanation: "First letters of the months: Jan, Feb, Mar, Apr, May, Jun, Jul. Next is Aug (A)." },

  // BASIC ARITHMETIC (lr_051 - lr_075)
  { id: "lr_051", text: "Which number is one-quarter of one-tenth of one-fifth of 200?", options: ["0.1", "0.2", "0.5", "1"], correctAnswer: 3, category: 'MATH', difficultyLevel: 2, explanation: "1/5 of 200 is 40. 1/10 of 40 is 4. 1/4 of 4 is 1." },
  { id: "lr_052", text: "What is 15% of 200?", options: ["20", "25", "30", "35"], correctAnswer: 2, category: 'MATH', difficultyLevel: 1, explanation: "15% of 200 is calculated as 200 x 0.15 = 30." },
  { id: "lr_053", text: "A car travels 60 miles in 45 minutes. What is its speed in MPH?", options: ["70", "80", "90", "100"], correctAnswer: 1, category: 'MATH', difficultyLevel: 2, explanation: "45 minutes is 0.75 hours. 60 miles divided by 0.75 hours equals 80 MPH." },
  { id: "lr_054", text: "Solve: (12 / 3) + (4 * 2) - 5 = ?", options: ["5", "7", "9", "11"], correctAnswer: 1, category: 'MATH', difficultyLevel: 1, explanation: "Following the order of operations: 4 + 8 - 5 = 7." },
  { id: "lr_055", text: "If a shirt is on sale for 20% off and its original price was $50, how much is it now?", options: ["$30", "$35", "$40", "$45"], correctAnswer: 2, category: 'MATH', difficultyLevel: 1, explanation: "20% of 50 is 10. 50 - 10 = 40." },
  { id: "lr_056", text: "A widget costs $1.50. How many can you buy with $12?", options: ["6", "8", "10", "12"], correctAnswer: 1, category: 'MATH', difficultyLevel: 1, explanation: "12 / 1.5 = 8 widgets." },
  { id: "lr_057", text: "If 3x + 5 = 20, what is x?", options: ["4", "5", "6", "7"], correctAnswer: 1, category: 'MATH', difficultyLevel: 1, explanation: "3x = 15, so x = 15 / 3 = 5." },
  { id: "lr_058", text: "The sum of three consecutive integers is 36. What is the middle integer?", options: ["11", "12", "13", "14"], correctAnswer: 1, category: 'MATH', difficultyLevel: 2, explanation: "Let integers be x-1, x, x+1. Sum is 3x = 36, so x=12." },
  { id: "lr_059", text: "A rectangle has a length of 10 and a width of 5. What is its perimeter?", options: ["15", "30", "50", "25"], correctAnswer: 1, category: 'MATH', difficultyLevel: 1, explanation: "Perimeter = 2 * (10 + 5) = 2 * 15 = 30." },
  { id: "lr_060", text: "What is 2/3 of 45?", options: ["15", "25", "30", "35"], correctAnswer: 2, category: 'MATH', difficultyLevel: 1, explanation: "45 / 3 = 15. 15 * 2 = 30." },
  { id: "lr_061", text: "If a clock strikes 6 times in 5 seconds, how long will it take to strike 12 times?", options: ["10", "11", "12", "13"], correctAnswer: 1, category: 'MATH', difficultyLevel: 3, explanation: "There are 5 intervals for 6 strikes in 5 seconds (1 sec per interval). For 12 strikes, there are 11 intervals, so 11 seconds." },
  { id: "lr_062", text: "A store has 40 items. 25% are red, the rest are blue. How many are blue?", options: ["10", "20", "30", "35"], correctAnswer: 2, category: 'MATH', difficultyLevel: 1, explanation: "25% of 40 is 10 red. 40 - 10 = 30 blue." },
  { id: "lr_063", text: "If you have $20 and spend $12.75, how much change do you receive?", options: ["$7.25", "$8.25", "$6.75", "$7.75"], correctAnswer: 0, category: 'MATH', difficultyLevel: 1, explanation: "20.00 - 12.75 = 7.25." },
  { id: "lr_064", text: "A box can hold 24 cans. How many boxes do you need for 100 cans?", options: ["4", "5", "6", "7"], correctAnswer: 1, category: 'MATH', difficultyLevel: 1, explanation: "4 boxes hold 96. You need a 5th box for the remaining 4 cans." },
  { id: "lr_065", text: "What is the square root of 144?", options: ["10", "11", "12", "14"], correctAnswer: 2, category: 'MATH', difficultyLevel: 1, explanation: "12 multiplied by 12 equals 144." },
  { id: "lr_066", text: "If a dozen eggs cost $2.40, how much does 1 egg cost?", options: ["$0.15", "$0.20", "$0.24", "$0.30"], correctAnswer: 1, category: 'MATH', difficultyLevel: 1, explanation: "2.40 divided by 12 is 0.20." },
  { id: "lr_067", text: "Simplify: 10 + 5 * 2 - 4 / 2", options: ["12", "18", "28", "20"], correctAnswer: 1, category: 'MATH', difficultyLevel: 1, explanation: "10 + 10 - 2 = 18 (Using BODMAS/PEMDAS)." },
  { id: "lr_068", text: "A cyclist travels 15 km in 30 minutes. What is their speed in km/h?", options: ["20", "25", "30", "45"], correctAnswer: 2, category: 'MATH', difficultyLevel: 1, explanation: "30 mins is 0.5 hours. 15 km / 0.5 h = 30 km/h." },
  { id: "lr_069", text: "Convert 5 feet 5 inches to total inches.", options: ["60", "65", "66", "70"], correctAnswer: 1, category: 'MATH', difficultyLevel: 1, explanation: "5 feet = 60 inches. 60 + 5 = 65." },
  { id: "lr_070", text: "If you flip a coin 3 times, what is the total number of possible outcomes?", options: ["3", "6", "8", "9"], correctAnswer: 2, category: 'MATH', difficultyLevel: 2, explanation: "2 outcomes per flip: 2 x 2 x 2 = 8." },
  { id: "lr_071", text: "A bag has 5 red balls and 5 blue balls. If you pick one, what's the chance it's red?", options: ["25%", "50%", "75%", "100%"], correctAnswer: 1, category: 'MATH', difficultyLevel: 1, explanation: "5 out of 10 balls are red, which is 50%." },
  { id: "lr_072", text: "If 10 men can build a wall in 5 days, how many men are needed to build it in 2 days?", options: ["20", "25", "30", "50"], correctAnswer: 1, category: 'MATH', difficultyLevel: 2, explanation: "Total work = 10 x 5 = 50 man-days. Men needed = 50 / 2 = 25 men." },
  { id: "lr_073", text: "What is 10 to the power of 3?", options: ["30", "100", "1000", "10000"], correctAnswer: 2, category: 'MATH', difficultyLevel: 1, explanation: "10 x 10 x 10 = 1000." },
  { id: "lr_074", text: "What is the average of 10, 20, 30, 40?", options: ["20", "25", "30", "35"], correctAnswer: 1, category: 'MATH', difficultyLevel: 1, explanation: "(10+20+30+40) / 4 = 100 / 4 = 25." },
  { id: "lr_075", text: "If you buy 3 items at $4.99 each, roughly how much do you spend?", options: ["$10", "$12", "$15", "$20"], correctAnswer: 2, category: 'MATH', difficultyLevel: 1, explanation: "4.99 is close to 5. 3 x 5 = 15." },

  // ABSTRACT & VISUAL LOGIC (lr_076 - lr_112)
  { id: "lr_076", text: "A cube has 6 faces. How many edges does it have?", options: ["8", "10", "12", "14"], correctAnswer: 2, category: 'VISUAL', difficultyLevel: 2, explanation: "A cube consists of 12 edges and 8 vertices." },
  { id: "lr_077", text: "If 'ZENITH' is coded as 'AEBODU', how is 'ZEBRA' coded?", options: ["AFBOD", "AEBOD", "BECOD", "AFCPD"], correctAnswer: 1, category: 'LOGIC', difficultyLevel: 2, explanation: "Pattern mapping: Z->A, E->E, N->B, I->O, T->D, H->U. B->B based on mapping. (Simple mapping check)." },
  { id: "lr_078", text: "If you are facing North and turn 90 degrees right, then 180 degrees left, where are you facing?", options: ["North", "South", "East", "West"], correctAnswer: 3, category: 'VISUAL', difficultyLevel: 1, explanation: "North -> Right 90° = East. East -> Left 180° = West." },
  { id: "lr_079", text: "How many triangles are in a square with both diagonals drawn?", options: ["4", "6", "8", "10"], correctAnswer: 2, category: 'VISUAL', difficultyLevel: 3, explanation: "There are 4 small triangles and 4 larger triangles (formed by two small ones). Total 8." },
  { id: "lr_080", text: "A pyramid with a square base has how many faces?", options: ["4", "5", "6", "8"], correctAnswer: 1, category: 'VISUAL', difficultyLevel: 2, explanation: "1 square base + 4 triangular sides = 5 faces." },
  { id: "lr_081", text: "Pattern: 1, 2, 2, 3, 3, 3, 4, 4, ...?", options: ["4", "5", "6", "4, 4"], correctAnswer: 0, category: 'PATTERN', difficultyLevel: 2, explanation: "Each number n appears n times. 4 should appear 4 times." },
  { id: "lr_082", text: "If a mirror shows the clock at 3:00, what is the real time?", options: ["3:00", "9:00", "6:00", "12:00"], correctAnswer: 1, category: 'LOGIC', difficultyLevel: 2, explanation: "Mirror image of 3:00 position is 9:00." },
  { id: "lr_083", text: "Which shape cannot be made with 3 straight lines?", options: ["Triangle", "Square", "Angle", "Pentagon"], correctAnswer: 1, category: 'VISUAL', difficultyLevel: 1, explanation: "A square requires 4 straight lines." },
  { id: "lr_084", text: "Which set of brackets completes the pair: ([{}]) -> ?", options: ["([{}])", ")]}{[(", "([{}])", "([])"], correctAnswer: 0, category: 'VISUAL', difficultyLevel: 1, explanation: "Matching the symmetry of the pair." },
  { id: "lr_085", text: "If you move 3 steps Up, 2 Right, 3 Down, 2 Left, where are you?", options: ["Starting point", "Up 1", "Right 1", "Down 1"], correctAnswer: 0, category: 'LOGIC', difficultyLevel: 1, explanation: "Net movement is zero (3-3=0 vertically, 2-2=0 horizontally)." },
  { id: "lr_086", text: "Rotating a wheel 90 degrees clockwise 5 times is same as:", options: ["90 deg CW", "180 deg", "270 deg CW", "90 deg CCW"], correctAnswer: 0, category: 'LOGIC', difficultyLevel: 1, explanation: "4 rotations = 360° (start). 5th rotation is just another 90° CW." },
  { id: "lr_087", text: "Which word is the odd one out?", options: ["Addition", "Subtraction", "Multiplication", "Equation"], correctAnswer: 3, category: 'LOGIC', difficultyLevel: 1, explanation: "Others are basic arithmetic operations; an equation is a statement of equality." },
  { id: "lr_088", text: "How many even prime numbers are there?", options: ["0", "1", "2", "Infinite"], correctAnswer: 1, category: 'MATH', difficultyLevel: 1, explanation: "Only the number 2 is both even and prime." },
  { id: "lr_089", text: "A clock shows 3:15. What is the angle between hands roughly?", options: ["0 deg", "7.5 deg", "15 deg", "90 deg"], correctAnswer: 1, category: 'MATH', difficultyLevel: 3, explanation: "At 3:15, the minute hand is at 90°, and the hour hand has moved 1/4 of the way to 4 o'clock (7.5°)." },
  { id: "lr_090", text: "Pattern: 121, 144, 169, 196, ...?", options: ["215", "225", "256", "289"], correctAnswer: 1, category: 'PATTERN', difficultyLevel: 2, explanation: "Squares: 11^2, 12^2, 13^2, 14^2. Next is 15^2 = 225." },
  { id: "lr_091", text: "How many dots are on a standard 6-sided die?", options: ["15", "21", "24", "27"], correctAnswer: 1, category: 'MATH', difficultyLevel: 2, explanation: "1 + 2 + 3 + 4 + 5 + 6 = 21." },
  { id: "lr_092", text: "Pattern: Red, Orange, Yellow, Green, ...?", options: ["Blue", "Purple", "White", "Black"], correctAnswer: 0, category: 'PATTERN', difficultyLevel: 1, explanation: "Order of colors in a rainbow (ROYGBIV)." },
  { id: "lr_093", text: "What is 1000 - 333?", options: ["777", "667", "666", "555"], correctAnswer: 1, category: 'MATH', difficultyLevel: 1, explanation: "Subtraction result is 667." },
  { id: "lr_094", text: "Next in sequence: 3, 9, 27, 81, ...?", options: ["120", "243", "162", "300"], correctAnswer: 1, category: 'MATH', difficultyLevel: 2, explanation: "Powers of 3: 3^1, 3^2, 3^3, 3^4. Next is 3^5 = 243." },
  { id: "lr_095", text: "How many edges does a triangle have?", options: ["2", "3", "4", "5"], correctAnswer: 1, category: 'PATTERN', difficultyLevel: 1, explanation: "A triangle is a three-sided polygon with three edges." },
  { id: "lr_096", text: "In a race, you overtake the person in second place. What place are you in?", options: ["First", "Second", "Third", "Last"], correctAnswer: 1, category: 'LOGIC', difficultyLevel: 1, explanation: "You take the spot previously held by the person in second place." },
  { id: "lr_097", text: "Pattern: Circle, Circle, Square, Circle, Circle, Square, ...?", options: ["Square", "Circle", "Triangle", "Pentagon"], correctAnswer: 1, category: 'PATTERN', difficultyLevel: 1, explanation: "Repeating pattern: two circles then a square." },
  { id: "lr_098", text: "What is the sum of the angles in a triangle?", options: ["90", "180", "270", "360"], correctAnswer: 1, category: 'MATH', difficultyLevel: 1, explanation: "The angles of any triangle always add up to 180 degrees." },
  { id: "lr_099", text: "Which month comes early in the year: August, April, June, October?", options: ["August", "April", "June", "October"], correctAnswer: 1, category: 'LOGIC', difficultyLevel: 1, explanation: "April (4th month) comes before June (6th), August (8th), and October (10th)." },
  { id: "lr_100", text: "If you have 5 fingers on one hand, how many on 10 hands?", options: ["5", "50", "10", "100"], correctAnswer: 1, category: 'MATH', difficultyLevel: 2, explanation: "5 fingers multiplied by 10 hands equals 50 fingers." },
  { id: "lr_101", text: "Pattern: 1, 3, 6, 10, ...?", options: ["12", "14", "15", "16"], correctAnswer: 2, category: 'PATTERN', difficultyLevel: 2, explanation: "Sequence adds increasing integers: +2, +3, +4. Next is +5 (10+5=15)." },
  { id: "lr_102", text: "Which letter is a vowel: B, C, E, F?", options: ["B", "C", "E", "F"], correctAnswer: 2, category: 'LOGIC', difficultyLevel: 1, explanation: "E is a vowel." },
  { id: "lr_103", text: "If a square has sides of 4, what is the sum of its sides?", options: ["8", "12", "16", "20"], correctAnswer: 2, category: 'MATH', difficultyLevel: 1, explanation: "4 sides of 4: 4 x 4 = 16." },
  { id: "lr_104", text: "Pattern: 10, 8, 6, 4, ...?", options: ["3", "2", "1", "0"], correctAnswer: 1, category: 'PATTERN', difficultyLevel: 1, explanation: "Subtraction of 2 each step." },
  { id: "lr_105", text: "Next: A, B, D, G, ...?", options: ["H", "I", "J", "K"], correctAnswer: 3, category: 'PATTERN', difficultyLevel: 2, explanation: "Skips increase: 0, 1, 2. Next skip is 3 (G, [H,I,J], K)." },
  { id: "lr_106", text: "If 1=1, 2=4, 3=9, then 4=?", options: ["12", "16", "20", "25"], correctAnswer: 1, category: 'PATTERN', difficultyLevel: 1, explanation: "Each number is squared." },
  { id: "lr_107", text: "If you are in a race and you pass the person in last place, what place are you in?", options: ["Last", "Second to last", "Impossible", "First"], correctAnswer: 2, category: 'LOGIC', difficultyLevel: 1, explanation: "You cannot pass the person in last place (you would have to be behind them, but they are last)." },
  { id: "lr_108", text: "Next: Triangle, Square, Pentagon, ...?", options: ["Hexagon", "Circle", "Octagon", "Oval"], correctAnswer: 0, category: 'PATTERN', difficultyLevel: 1, explanation: "Increasing number of sides: 3, 4, 5. Next is 6 (Hexagon)." },
  { id: "lr_109", text: "Sum of angles in a square:", options: ["180", "270", "360", "450"], correctAnswer: 2, category: 'MATH', difficultyLevel: 1, explanation: "4 angles of 90 degrees each multiply to 360." },
  { id: "lr_110", text: "Which comes first alphabetically: Zebra, Apple, Banana, Cherry?", options: ["Zebra", "Apple", "Banana", "Cherry"], correctAnswer: 1, category: 'LOGIC', difficultyLevel: 1, explanation: "Apple starts with A." },
  { id: "lr_111", text: "If it takes 2 minutes to boil one egg, how long to boil 10 eggs in the same pot?", options: ["2", "10", "20", "5"], correctAnswer: 0, category: 'LOGIC', difficultyLevel: 2, explanation: "They all boil at the same time in the same pot." },
  { id: "lr_112", text: "How many seconds in 2 minutes?", options: ["60", "100", "120", "180"], correctAnswer: 2, category: 'MATH', difficultyLevel: 1, explanation: "2 x 60 = 120." },
];

export const MENTAL_AGE_QUESTIONS: MentalAgeQuestion[] = [
  // EMOTIONAL REGULATION (ma_001 - ma_015)
  { id: "ma_001", q: "How do you react when someone disagrees with you?", trait: 'emotional_regulation', options: ["Get defensive", "Try to see their point", "Ignore them", "Change the subject"], score: [2, 10, 5, 4] },
  { id: "ma_008", q: "How do you handle failure?", trait: 'emotional_regulation', options: ["Cry and give up", "Blame others", "Analyze and try again", "Ignore it"], score: [1, 2, 10, 5] },
  { id: "ma_013", q: "Are you more of an optimist or a pessimist?", trait: 'emotional_regulation', options: ["Glass half full", "Glass half empty", "Glass is just glass", "Where did the glass come from?"], score: [2, 5, 10, 1] },
  { id: "ma_043", q: "How do you deal with stress?", trait: 'emotional_regulation', options: ["Exercise/Activity", "Comfort food", "Socialize/Vent", "Isolate/Reflect"], score: [8, 1, 4, 10] },
  { id: "ma_045", q: "How do you handle apologies?", trait: 'emotional_regulation', options: ["I apologize first", "Wait for them", "I don't apologize", "Avoid the person"], score: [10, 5, 1, 2] },
  { id: "ma_047", q: "How fast do you forgive people?", trait: 'emotional_regulation', options: ["Immediately", "In a few days", "I rarely forget", "Grudges are my specialty"], score: [8, 10, 4, 1] },
  { id: "ma_052", q: "Do you ever cry at movies?", trait: 'emotional_regulation', options: ["Every time", "Sometimes", "Rarely", "Never, I'm a rock"], score: [8, 10, 7, 3] },
  { id: "ma_055", q: "How do you handle jealousy?", trait: 'emotional_regulation', options: ["Use it as drive", "Internalize it", "Express it directly", "I don't get jealous"], score: [7, 3, 5, 10] },
  { id: "ma_056", q: "Do you listen to your heart or your head?", trait: 'emotional_regulation', options: ["Heart only", "Balanced", "Head mostly", "What's an emotion?"], score: [3, 10, 8, 2] },
  { id: "ma_058", q: "Your go-to emotion in a crisis:", trait: 'emotional_regulation', options: ["Calm logic", "Immediate action", "Anxiety", "Looking for help"], score: [10, 8, 1, 4] },
  { id: "ma_063", q: "How do you handle rumors?", trait: 'emotional_regulation', options: ["Investigate them", "Ignore them", "Spread them a bit", "Get upset"], score: [8, 10, 1, 3] },
  { id: "ma_067", q: "How do you react to a friend's success?", trait: 'emotional_regulation', options: ["Purely happy", "Happy but envious", "Compare myself", "Acknowledge neutrally"], score: [10, 5, 1, 8] },
  { id: "ma_069", q: "How do you handle a toxic friend?", trait: 'emotional_regulation', options: ["Cut them off", "Try to help them", "Slowly distance", "Keep them around"], score: [10, 4, 9, 1] },
  { id: "ma_076", q: "Your approach to conflict:", trait: 'emotional_regulation', options: ["Confront head-on", "Diplomatic", "Avoid/Passive", "Escalate"], score: [6, 10, 7, 1] },
  { id: "ma_094", q: "How do you handle junk mail?", trait: 'emotional_regulation', options: ["Unsubscribe immediately", "Read it then delete", "Let it sit", "Spam filter is my best friend"], score: [10, 5, 1, 8] },

  // IMPULSIVITY (ma_016 - ma_030)
  { id: "ma_002", q: "When you have a big decision to make, do you:", trait: 'impulsivity', options: ["Ask everyone's opinion", "Sleep on it", "Go with my gut immediately", "Procrastinate"], score: [4, 10, 2, 1] },
  { id: "ma_021", q: "What's the first thing you do when you wake up?", trait: 'impulsivity', options: ["Check my phone", "Meditate/Stretch", "Snooze 5 times", "Stare at the wall"], score: [2, 10, 1, 5] },
  { id: "ma_025", q: "How do you spend your evening?", trait: 'impulsivity', options: ["Reading a book", "Netflix/Gaming", "Partying", "Deep cleaning"], score: [10, 4, 1, 8] },
  { id: "ma_028", q: "How do you manage your finances?", trait: 'impulsivity', options: ["Budget strictly", "Save a little", "Spend then worry", "Money is meant to be moved"], score: [10, 8, 2, 1] },
  { id: "ma_041", q: "How do you feel when your phone battery is at 5%?", trait: 'impulsivity', options: ["Panic!", "Indifferent", "Calmly find a charger", "Celebrate the peace"], score: [1, 6, 10, 4] },
  { id: "ma_065", q: "How long can you talk with a stranger?", trait: 'impulsivity', options: ["Hours!", "A few minutes", "Just a greeting", "Zero time"], score: [3, 8, 10, 5] },
  { id: "ma_073", q: "Your favorite social platform:", trait: 'impulsivity', options: ["LinkedIn/Twitter", "Instagram/TikTok", "Reddit/YouTube", "No social media"], score: [8, 1, 6, 10] },
  { id: "ma_078", q: "Your stance on group thinking:", trait: 'impulsivity', options: ["Go with the crowd", "Question slightly", "Independent thinker", "Always contrary"], score: [1, 6, 10, 5] },
  { id: "ma_084", q: "How do you choose a restaurant?", trait: 'impulsivity', options: ["Yelp/Reviews", "Old favorite", "Walk-in/Curiosity", "Price only"], score: [7, 10, 3, 5] },
  { id: "ma_087", q: "Your grocery shopping style:", trait: 'impulsivity', options: ["List/Strict", "Browse/Impulses", "Bulk buy", "Daily fresh trips"], score: [10, 1, 7, 8] },
  { id: "ma_100", q: "Last thing you bought online:", trait: 'impulsivity', options: ["Something useful", "Impulse joy", "Necessary replacement", "I don't shop online"], score: [10, 1, 9, 8] },
  { id: "ma_090", q: "What's your watch type?", trait: 'impulsivity', options: ["Smartwatch", "Classic analog", "Digital/Sporty", "Phone is my watch"], score: [4, 10, 3, 2] },
  { id: "ma_093", q: "Your stance on smart home tech:", trait: 'impulsivity', options: ["Every gadget", "Light use", "Unnecessary", "Distrust it"], score: [2, 7, 10, 8] },
  { id: "ma_024", q: "What kind of music do you listen to most?", trait: 'impulsivity', options: ["Top 40 / Pop", "Old Classics", "Classical / Jazz", "Experimental / Niche"], score: [1, 9, 10, 6] },
  { id: "ma_034", q: "What kind of movies do you like?", trait: 'impulsivity', options: ["Documentaries", "Action/Comedy", "Cartoons", "Horror"], score: [10, 4, 1, 6] },

  // RISK TOLERANCE (ma_031 - ma_045)
  { id: "ma_019", q: "Do you consider yourself a 'risk-taker'?", trait: 'risk_tolerance', options: ["I live on the edge", "Calculated risks", "Very cautious", "I don't move without a map"], score: [2, 10, 7, 4] },
  { id: "ma_032", q: "What's your typical weekend?", trait: 'risk_tolerance', options: ["Productive/Errands", "Relaxing/Movies", "Adventures/Outdoors", "Sleep marathon"], score: [8, 5, 10, 2] },
  { id: "ma_085", q: "Your preferred mode of transport:", trait: 'risk_tolerance', options: ["Car/Private", "Bicycle/Walk", "Public Transit", "Scooter"], score: [5, 10, 8, 3] },
  { id: "ma_062", q: "Your ideal social gathering:", trait: 'risk_tolerance', options: ["Intimate dinner", "Medium party", "Large festival", "Solitary walk"], score: [10, 5, 2, 8] },
  { id: "ma_071", q: "Do you trust people easily?", trait: 'risk_tolerance', options: ["I trust everyone", "Trust but verify", "Very suspicious", "Earn my trust"], score: [1, 10, 2, 8] },
  { id: "ma_088", q: "What's your dream house location?", trait: 'risk_tolerance', options: ["City penthouse", "Suburban house", "Cabin in nature", "Floating home"], score: [5, 7, 10, 3] },
  { id: "ma_097", q: "How do you feel about DIY projects?", trait: 'risk_tolerance', options: ["Love fixing things", "A bit clumsy but try", "Call a pro", "Ignore the problem"], score: [10, 7, 3, 1] },
  { id: "ma_006", q: "Your friends are planning a trip. You:", trait: 'risk_tolerance', options: ["Organize everything", "Go with the flow", "Worry about the cost", "Hope they cancel"], score: [10, 7, 3, 1] },
  { id: "ma_005", q: "Which of these words describes you best?", trait: 'risk_tolerance', options: ["Energetic", "Calm", "Anxious", "Curious"], score: [3, 10, 2, 7] },
  { id: "ma_018", q: "How do you feel about change?", trait: 'risk_tolerance', options: ["Exciting!", "Necessary", "Stressful", "Terrifying"], score: [5, 10, 3, 1] },
  { id: "ma_038", q: "How do you spend your commute?", trait: 'risk_tolerance', options: ["Podcast/Audiobook", "Music", "Check email", "Stare out the window"], score: [10, 4, 3, 8] },
  { id: "ma_046", q: "What's your primary driver?", trait: 'risk_tolerance', options: ["Ambition/Success", "Happiness/Peace", "Service to others", "Curiosity"], score: [6, 10, 9, 7] },
  { id: "ma_101", q: "Starting a high-stakes hobby?", trait: 'risk_tolerance', options: ["Jump in fully", "Research first", "Trial phase", "Too risky"], score: [3, 10, 8, 2] },
  { id: "ma_102", q: "Faced with a loophole:", trait: 'risk_tolerance', options: ["Use it immediately", "Ask for legal advice", "Ignore it", "Report it"], score: [1, 10, 7, 8] },
  { id: "ma_103", q: "Public speaking invitation:", trait: 'risk_tolerance', options: ["Accept immediately", "Prepare extensively", "Decline politely", "Panic and ignore"], score: [5, 10, 3, 1] },

  // LONG-TERM THINKING (ma_046 - ma_060)
  { id: "ma_014", q: "How do you feel about traditional values?", trait: 'long_term_thinking', options: ["Very important", "A bit outdated", "Open to new ideas", "Completely irrelevant"], score: [10, 4, 7, 2] },
  { id: "ma_030", q: "Are you a morning person or a night owl?", trait: 'long_term_thinking', options: ["Early bird", "Normal schedule", "Night owl", "I never sleep"], score: [10, 7, 3, 1] },
  { id: "ma_029", q: "How many hours of sleep do you get?", trait: 'long_term_thinking', options: ["Consistent 8 hours", "6-7 hours", "4-5 hours", "I sleep when I die"], score: [10, 8, 3, 1] },
  { id: "ma_037", q: "Do you keep a journal?", trait: 'long_term_thinking', options: ["Daily", "Sometimes", "I used to", "Never"], score: [10, 8, 4, 1] },
  { id: "ma_049", q: "What kind of stories do you prefer?", trait: 'long_term_thinking', options: ["Happy endings", "Realistic/Gritty", "Philosophical", "Twist endings"], score: [3, 8, 10, 6] },
  { id: "ma_053", q: "How do you feel about getting older?", trait: 'long_term_thinking', options: ["Excited for wisdom", "Accepting the process", "Worried", "Refuse to age"], score: [10, 8, 3, 1] },
  { id: "ma_064", q: "What's your stance on honesty?", trait: 'long_term_thinking', options: ["Always honest", "White lies for peace", "Only when beneficial", "Total filter-less"], score: [10, 7, 2, 4] },
  { id: "ma_080", q: "How do you spend your birthdays?", trait: 'long_term_thinking', options: ["Big party", "Small gathering", "Treat myself solo", "Ignore it "], score: [2, 10, 7, 8] },
  { id: "ma_081", q: "What's your go-to weekend outfit?", trait: 'long_term_thinking', options: ["Latest fashion", "Athleisure/Comfy", "Classic/Timeless", "Pajamas/Stay-at-home"], score: [2, 4, 10, 7] },
  { id: "ma_089", q: "How many plants do you have?", trait: 'long_term_thinking', options: ["It's a jungle", "A few alive ones", "My cactus died", "Zero"], score: [10, 7, 2, 1] },
  { id: "ma_017", q: "Do you finish what you start?", trait: 'long_term_thinking', options: ["Always", "Mostly", "Rarely", "I have 50 unfinished projects"], score: [10, 8, 3, 1] },
  { id: "ma_048", q: "How do you feel about death?", trait: 'long_term_thinking', options: ["Scared", "Accepting", "Fascinated", "Don't think about it"], score: [2, 10, 7, 4] },
  { id: "ma_068", q: "Your opinion on giving advice:", trait: 'long_term_thinking', options: ["I give it freely", "Wait to be asked", "I rarely have advice", "I just listen"], score: [3, 10, 2, 8] },
  { id: "ma_099", q: "Do you have a personal brand?", trait: 'long_term_thinking', options: ["Yes, curated", "A little bit", "No, just me", "What is that?"], score: [7, 10, 5, 2] },
  { id: "ma_095", q: "Your preferred writing tool:", trait: 'long_term_thinking', options: ["Fancy pen/Ink", "Whatever works", "Mechanical pencil", "Type only"], score: [10, 5, 8, 3] },

  // RESPONSIBILITY (ma_061 - ma_075)
  { id: "ma_007", q: "In a group project, you are usually:", trait: 'responsibility', options: ["The leader", "The worker bee", "The idea person", "The critic"], score: [10, 8, 4, 6] },
  { id: "ma_016", q: "How do you treat people who can do nothing for you?", trait: 'responsibility', options: ["With kindness", "Indifferently", "Be polite but brief", "Depends on my mood"], score: [10, 2, 6, 4] },
  { id: "ma_022", q: "How organized is your living space?", trait: 'responsibility', options: ["Everything is in place", "Controlled chaos", "Total mess", "I have a system I swear"], score: [10, 6, 1, 4] },
  { id: "ma_027", q: "How often do you cook at home?", trait: 'responsibility', options: ["Every day", "Fine dining out", "Takeout mostly", "I don't know where my kitchen is"], score: [10, 6, 2, 1] },
  { id: "ma_033", q: "How do you track your tasks?", trait: 'responsibility', options: ["Digital App", "Paper Planner", "Memory only", "I let chaos decide"], score: [8, 10, 2, 1] },
  { id: "ma_070", q: "How do you feel about children?", trait: 'responsibility', options: ["Love them!", "They are okay", "Noisy/Annoying", "Indifferent"], score: [6, 10, 4, 8] },
  { id: "ma_074", q: "How often do you call your parents?", trait: 'responsibility', options: ["Daily", "Weekly", "Monthly", "Rarely"], score: [8, 10, 6, 2] },
  { id: "ma_075", q: "What's your role in a crisis?", trait: 'responsibility', options: ["Manager", "Medic/Help", "Watcher", "Participant"], score: [10, 9, 3, 5] },
  { id: "ma_077", q: "How do you treat waiters?", trait: 'responsibility', options: ["Polite/Friendly", "Neutral", "Brief/Business-like", "Critical"], score: [10, 6, 4, 1] },
  { id: "ma_079", q: "What's more important: Fairness or Harmony?", trait: 'responsibility', options: ["Fairness", "Harmony", "Balanced", "Neither"], score: [10, 4, 8, 2] },
  { id: "ma_082", q: "How do you keep your books?", trait: 'responsibility', options: ["Shelved by genre", "Stacked anywhere", "I use a Kindle", "I don't own books"], score: [10, 4, 8, 1] },
  { id: "ma_091", q: "How often do you clean your phone screen?", trait: 'responsibility', options: ["Daily", "Weekly", "When it's sticky", "Never"], score: [10, 7, 3, 1] },
  { id: "ma_096", q: "What's in your car trunk?", trait: 'responsibility', options: ["Emergency kit/Essentials", "Gym bag/Shoes", "Random trash", "It's empty"], score: [10, 6, 1, 4] },
  { id: "ma_104", q: "Borrowed item is lost:", trait: 'responsibility', options: ["Replace it immediately", "Apologize and pay", "Hope they don't notice", "Offer a substitute"], score: [10, 9, 1, 6] },
  { id: "ma_105", q: "Task is taking too long:", trait: 'responsibility', options: ["Push through", "Ask for help", "Quit and restart", "Delegate"], score: [10, 8, 2, 7] },

  // PRESSURE REACTION (ma_076 - ma_090)
  { id: "ma_010", q: "How do you feel about surprises?", trait: 'pressure_reaction', options: ["Love them!", "They are okay", "I prefer knowing details", "Hate them with a passion"], score: [5, 7, 10, 8] },
  { id: "ma_011", q: "What's your reaction to a long line?", trait: 'pressure_reaction', options: ["Sigh loudly and wait", "Leave immediately", "Check my phone", "Start a conversation"], score: [6, 1, 5, 10] },
  { id: "ma_036", q: "What's your relationship with technology?", trait: 'pressure_reaction', options: ["I have the latest gear", "I use what I need", "A bit overwhelmed", "Send me a letter instead"], score: [4, 8, 10, 7] },
  { id: "ma_042", q: "What's your reaction to an old photo of yourself?", trait: 'pressure_reaction', options: ["Cringe hard", "Sweet nostalgia", "Wow, I look different", "Ignore it"], score: [2, 10, 7, 5] },
  { id: "ma_051", q: "Are you more sensitive to lights, sounds, or words?", trait: 'pressure_reaction', options: ["Bright lights", "Loud noises", "Deeper meanings", "I'm not sensitive"], score: [5, 4, 10, 8] },
  { id: "ma_054", q: "What's your reaction to a compliment?", trait: 'pressure_reaction', options: ["Thank you!", "Brush it off", "Suspicious", "Awkward silence"], score: [10, 5, 2, 1] },
  { id: "ma_057", q: "How do you feel about small talk?", trait: 'pressure_reaction', options: ["It's pleasant", "A bit tedious", "Waste of time", "I'm bad at it"], score: [4, 10, 7, 2] },
  { id: "ma_059", q: "Your feeling towards modern art:", trait: 'pressure_reaction', options: ["Fascinating", "Confusing", "Pretentious", "What art?"], score: [7, 10, 4, 2] },
  { id: "ma_072", q: "How do you handle public speaking?", trait: 'pressure_reaction', options: ["Natural at it", "Nervous but doable", "Hate it", "I'd rather die"], score: [8, 10, 3, 1] },
  { id: "ma_086", q: "How often do you visit museums?", trait: 'pressure_reaction', options: ["Often", "Occasionally", "Rarely", "Never"], score: [10, 8, 4, 1] },
  { id: "ma_092", q: "Your favorite holiday:", trait: 'pressure_reaction', options: ["Christmas/Tradition", "Halloween/Fun", "New Year/Fresh", "My birthday"], score: [10, 4, 8, 6] },
  { id: "ma_098", q: "What's your favorite museum wing?", trait: 'pressure_reaction', options: ["Ancient History", "Modern Art", "Natural Science", "The Gift Shop"], score: [10, 6, 9, 2] },
  { id: "ma_106", q: "Elevator is stuck:", trait: 'pressure_reaction', options: ["Press alarm and wait", "Try to pry door", "Sit and breathe", "Panic"], score: [10, 4, 9, 1] },
  { id: "ma_107", q: "WiFi goes out during work:", trait: 'pressure_reaction', options: ["Tether immediately", "Take a break", "Get angry at router", "Call support screaming"], score: [10, 8, 2, 1] },
  { id: "ma_108", q: "Forgotten keys at work:", trait: 'pressure_reaction', options: ["Call a locksmith", "Wait for roommate", "Try to break in", "Sleep at office"], score: [10, 8, 2, 4] },

  // SELF-AWARENESS (ma_091 - ma_100)
  { id: "ma_003", q: "Do you prefer to be the center of attention or a wallflower?", trait: 'self_awareness', options: ["Center of attention", "Depends on the crowd", "Quiet observer", "I hide in the corner"], score: [3, 10, 8, 2] },
  { id: "ma_004", q: "How much do you care about what others think of you?", trait: 'self_awareness', options: ["Obsessed with it", "It matters a bit", "Not much", "Zero care"], score: [1, 6, 10, 8] },
  { id: "ma_009", q: "Do you believe everything happens for a reason?", trait: 'self_awareness', options: ["Yes, absolutely", "Maybe", "No, it's all random", "I don't think about it"], score: [4, 7, 10, 2] },
  { id: "ma_012", q: "When you look in the mirror, what's your first thought?", trait: 'self_awareness', options: ["I look great!", "I need to fix X", "Just checking for food", "I don't look much"], score: [5, 4, 8, 10] },
  { id: "ma_015", q: "Which animal do you relate to most?", trait: 'self_awareness', options: ["Golden Retriever", "Curious Cat", "Wise Owl", "Lone Wolf"], score: [1, 5, 10, 7] },
  { id: "ma_020", q: "What's your relationship with your past?", trait: 'self_awareness', options: ["Living in nostalgia", "Learned and moved on", "Trying to forget", "Never look back"], score: [2, 10, 4, 6] },
  { id: "ma_050", q: "How do you handle being alone?", trait: 'self_awareness', options: ["Love it", "It's fine", "Get bored fast", "A bit lonely"], score: [10, 8, 2, 4] },
  { id: "ma_061", q: "How many close friends do you have?", trait: 'self_awareness', options: ["1-2", "3-5", "Too many to count", "Many acquaintances"], score: [10, 8, 1, 4] },
  { id: "ma_066", q: "In a conversation, are you more of a listener or a talker?", trait: 'self_awareness', options: ["Listen mostly", "Equal share", "Talk mostly", "I wait for my turn"], score: [10, 8, 2, 4] },
  { id: "ma_109", q: "Receiving harsh feedback:", trait: 'self_awareness', options: ["Request details", "Ignore it", "Argue back", "Take it personally"], score: [10, 6, 2, 1] },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'what-is-iq',
    title: 'What Exactly is IQ? A Deep Dive into Intelligence Quotients',
    excerpt: 'An in-depth look at what Intelligence Quotient measures, its history, and how it influences your life in 2026.',
    date: 'Feb 01, 2026',
    readTime: '8 min read',
    content: `IQ, or Intelligence Quotient, is a psychometric measure of your ability to reason, solve problems, and process complex information.It essentially reflects how well you performed on a calibrated cognitive assessment compared to a representative sample of your peer age group.While modern tests have evolved significantly since their inception, the core goal remains the same: to quantify human cognitive potential through standardized metrics.

In this comprehensive guide, we explore the fascinating origins of the IQ test, tracing its journey from Alfred Binet's early diagnostic tools in France to the modern, highly sophisticated Wechsler Adult Intelligence Scale (WAIS) and Raven's Progressive Matrices used by psychologists today.We break down the different domains of intelligence measured by these tests, including verbal comprehension, perceptual reasoning, working memory, and processing speed.

Understanding your IQ can provide valuable insights into your cognitive strengths and weaknesses.For instance, a high score in pattern recognition might suggest a natural aptitude for computer science or engineering, while strong verbal scores could point towards success in law or communications.However, it's crucial to remember that an IQ score is not a static ceiling on your potential; it's a benchmark of current cognitive state that can be influenced by education, environment, and mental training.We also discuss the "Flynn Effect"—the observed rise in average IQ scores over generations—and what it tells us about our evolving mental environment.`
  },
  {
    slug: 'good-iq-score',
    title: 'What is Considered a Good IQ Score? Understanding the Bell Curve',
    excerpt: 'Learn the classifications of IQ scores, standard deviations, and where you stand on the global bell curve.',
    date: 'Feb 02, 2026',
    readTime: '7 min read',
    content: `Most people—roughly 68 % of the global population—score between 85 and 115 on standard IQ tests.This specific range is statistically categorized as "Average." When you move further along the distribution, a score above 115 is considered "High Average," while a score above 130 typically places an individual in the "Gifted" category, representing the top 2 % of the population.Those scoring 145 or higher are often seen as "Genius" level thinkers.

  However, interpreting these numbers requires an understanding of the bell curve and standard deviation.Each 15 - point jump(in most scales) represents one standard deviation from the mean.This means a person with an IQ of 130 is significantly different in their cognitive processing speed and pattern recognition capabilities than someone with an IQ of 100.

In this article, we delve into the practical implications of these scores.Does a "High" IQ guarantee success ? Research suggests that while IQ is a strong predictor of academic performance and professional achievement in complex fields, it is just one facet of a multi - dimensional personality.We compare IQ with Emotional Intelligence(EQ) and "Grit"—the passion and perseverance for long - term goals.We also look at how high - IQ societies like Mensa use these scores to foster communities of like - minded intellectual peers.Understanding where you stand on the bell curve is not about superiority, but about understanding your unique cognitive profile.`
  },
  {
    slug: 'online-iq-accuracy',
    title: 'Are Online IQ Tests Actually Accurate? Science vs. Entertainment',
    excerpt: 'The truth about web-based cognitive assessments and how they compare to gold-standard clinical tests.',
    date: 'Feb 03, 2026',
    readTime: '9 min read',
    content: `With the explosion of digital tools in 2026, online IQ tests have become more popular than ever.But the question remains: Can a 15 - minute web assessment really measure your intelligence as accurately as a 3 - hour clinical session with a licensed psychologist ? The answer is nuanced.While professional clinical tests like the WAIS - IV are the gold standard for diagnosis and recruitment, high - quality online tools serve as excellent screening mechanisms and educational experiences.

Our platform, IQ Checker XYZ, utilizes logical matrices, mathematical sequences, and pattern recognition puzzles that are closely modeled after the logic found in official psychometric batteries.By using a large, anonymized dataset, we can provide a highly reliable * estimate * of your cognitive standing.In this article, we break down the algorithm behind our scoring system and explain why consistency across different tests matters more than a single high score.

We also expose the "junk science" found in many predatory online tests that promise inflated scores to drive engagement.A real IQ test should be challenging, culturally neutral, and based on fluid intelligence rather than general knowledge.Learn how to spot a legitimate assessment and how to use your results responsibly.Whether you're testing your logic for fun or looking for a benchmark before a professional exam, understanding the limitations and strengths of digital testing is key.`
  },
  {
    slug: 'average-iq-by-age',
    title: 'Average IQ by Age: How Your Mind Evolves Over Time',
    excerpt: 'Discover how cognitive performance, fluid intelligence, and crystallized knowledge evolve as we grow.',
    date: 'Feb 04, 2026',
    readTime: '8 min read',
    content: `It is a common misconception that our intelligence is fixed from birth. In reality, our cognitive profile shifts dramatically as we age. Psychologists distinguish between "Fluid Intelligence"—our ability to solve new problems and identify patterns—and "Crystallized Intelligence"—the accumulated knowledge and experience we gain over decades.

Raw fluid intelligence, which is what most IQ tests primarily measure, tends to peak in our late teens or early twenties. This is the period when our processing speed and working memory are at their most efficient. However, crystallized intelligence continues to grow well into our 50s, 60s, and even 70s as we become more adept at applying known logic to complex life situations.

This article examines the data behind cognitive aging and offers evidence-based strategies to maintain a sharp mind throughout adulthood. We discuss "Cognitive Reserve" and how lifelong learning can delay the effects of age-related cognitive decline. By understanding how your age group's average IQ is calculated using age-normed scores (deviation IQ), you can better appreciate your own mental development. Whether you're a student looking to maximize your peak years or a senior focused on cognitive health, the science of aging intelligence offers fascinating insights into the human brain's plasticity.`
  },
  {
    slug: 'mental-age-vs-iq',
    title: 'Mental Age vs IQ: Understanding Psychological Maturity',
    excerpt: 'Exploring the psychological concepts of mental maturity compared to raw cognitive processing power.',
    date: 'Feb 05, 2026',
    readTime: '6 min read',
    content: `In the early days of psychometrics, the term "Mental Age" was used to define a child's intellectual level relative to their chronological age. The original IQ formula was simple: (Mental Age / Chronological Age) x 100. If a 10-year-old performed as well as an average 12-year-old, their IQ was 120. Modern adult IQ testing has largely moved away from this linear ratio in favor of "Deviation IQ," but the concept of Mental Age remains a powerful tool in developmental psychology.

Mental age today is often discussed in the context of psychological and emotional maturity. It asks the question: Regardless of how fast your brain can solve a math problem, how mature is your approach to decision-making, social interaction, and stress? In this deep-dive, we compare the "Raw Brain Power" of IQ with the "Emotional Maturity" of mental age.

We also look at our "Mental Age Test" on IQ Checker XYZ and explain how it uses psychological behavioral patterns to estimate your maturity level. While your IQ might be fixed at 130, your mental age might fluctuate based on your life experiences and emotional growth. Understanding this distinction can lead to better self-awareness and personal development.`
  },
  {
    slug: 'brain-training',
    title: 'Does Brain Training Really Work? Separating Hype from Science',
    excerpt: 'A critical look at the science behind cognitive apps, games, and the billion-dollar brain training industry.',
    date: 'Feb 06, 2026',
    readTime: '10 min read',
    content: `The promise of "getting smarter" by playing simple games on your phone is a billion-dollar industry. Apps like Lumosity, Peak, and BrainHQ claim to boost memory, focus, and general intelligence. But does the science back these claims? Research suggests that while you will definitely get better at the specific games you practice, the "far transfer"—the ability of that training to improve your general IQ or everyday cognitive tasks—is highly debated among neuroscientists.

In this article, we analyze the largest studies ever conducted on brain training. We look at the "N-Back" task, one of the few exercises that has shown some evidence of improving working memory and, by extension, fluid intelligence. We also explore the concept of "Neuroplasticity"—the brain's ability to reorganize itself by forming new neural connections throughout life.

Rather than relying solely on apps, we provide a list of "High-Transfer" activities that have stronger scientific backing for boosting cognitive performance. These include learning complex new skills (like a second language or a musical instrument), intense physical exercise, and deep focus training. Discover how to build a brain training routine that actually works, and learn why variety is more important than repetition when it comes to mental agility.`
  },
  {
    slug: 'increase-iq',
    title: '5 Proven Ways to Increase Your IQ and Mental Clarity',
    excerpt: 'Actionable, science-backed steps to sharpen your mind and improve your cognitive performance in 2026.',
    date: 'Feb 08, 2026',
    readTime: '7 min read',
    content: `Can you actually increase your IQ? While your genetic "potential" provides a baseline, your environmental factors and daily habits play a huge role in how much of that potential you actually realize. In 2026, the science of neuro-optimization has identified several key areas where lifestyle changes lead to measurable improvements in cognitive testing performance.

1. **Deep Reading and Abstract Thinking:** Moving beyond short-form content to read complex non-fiction or philosophy challenges the brain to build and maintain intricate mental models. This improves "Crystallized Intelligence" and verbal reasoning.
2. **Cognitive Load Management:** In an age of distractions, the ability to maintain "Deep Work" (as described by Cal Newport) is a competitive advantage. Training your focus increases your effective processing speed.
3. **Cardiovascular Health:** The brain is the most energy-demanding organ in the body. Regular aerobic exercise increases blood flow to the hippocampus and stimulates the release of BDNF (Brain-Derived Neurotrophic Factor), a protein that supports neuron growth.
4. **Learning New Languages:** This is one of the most cognitively demanding tasks possible, as it requires the brain to navigate new sets of rules, sounds, and structures, significantly boosting executive function.
5. **Quality Sleep and Nutrition:** We look at the correlation between REM sleep cycles and memory consolidation, along with the role of Omega-3 fatty acids in brain health.

By implementing these five strategies, you can optimize your brain's performance and see significant improvements in your IQ test scores over time.`
  },
  {
    slug: 'logic-puzzles',
    title: 'The Most Challenging Logic Puzzles of All Time: A Test of Deductive Reason',
    excerpt: 'Put your brain to the test with these legendary brain teasers and the logic used to solve them.',
    date: 'Feb 07, 2026',
    readTime: '9 min read',
    content: `Logic puzzles have been used as a measure of brilliance for centuries. From the riddles of ancient Greece to the complex "Zebra Puzzles" attributed to Albert Einstein, these challenges test the very core of our deductive reasoning skills. They require the ability to hold multiple conflicting variables in your working memory and systematically eliminate impossibilities.

In this article, we break down three of the world's most famous logic puzzles: Einstein's Riddle, the Monty Hall Problem, and the "Hardest Logic Puzzle Ever" by George Boolos. We don't just give you the answers; we explain the *thinking process* required to reach them. Understanding these logical frameworks is the best way to prepare for a formal IQ assessment.

We also discuss why certain people find these puzzles easier than others. Is it a natural gift, or a learned skill? The answer is both. By practicing logical syllogisms and identifying common fallacies, you can "train" your brain to see patterns that others miss. This is the essence of fluid intelligence. Ready to test your limits? Dive into our analysis and see if you have what it takes to solve the unsolvable.`
  }
];

export const FAQS = [
  {
    q: "What is IQ Checker XYZ?",
    a: "IQ Checker XYZ is a world-class, premium suite of cognitive assessment tools designed to help you benchmark your brain's performance. Our mission is to provide accurate, science-backed insights into human intelligence through logic, mathematics, and reaction speed testing. Established in 2026, we utilize modern psychometric data to calibrate our tools, ensuring that users receive a reliable estimate of their cognitive standing in a fast, engaging digital format."
  },
  {
    q: "How long does the IQ test take?",
    a: "Our standard 15-question IQ assessment is designed to be completed in approximately 10 to 15 minutes. This timing is optimized to prevent mental fatigue while still providing enough depth to evaluate fluid intelligence. We recommend taking the test in a quiet environment free from distractions to ensure the highest degree of accuracy in your results."
  },
  {
    q: "Is this test scientifically accurate?",
    a: "While our tests are designed using industry-standard logic, pattern recognition principles, and psychometric matrices, they are intended for educational and entertainment purposes. A formal, clinical diagnosis of IQ must be administered by a licensed psychologist using standardized batteries like the WAIS-IV. However, IQ Checker XYZ provides a high-confidence estimate that aligns closely with professional screening tools."
  },
  {
    q: "Can I take the test more than once?",
    a: "Yes, you can retake the test. However, please be aware of the 'Practice Effect.' If you take the same test multiple times, you may see an artificially inflated score because your brain becomes familiar with the specific puzzles and questions. For the most accurate benchmark of your raw potential, your first attempt is usually the most telling."
  },
  {
    q: "What is a 'Genius' IQ score?",
    a: "In most standard distributions (where the mean is 100), a score of 140 or higher is often statistically categorized as 'Very Superior' or 'Genius' level potential. This typically represents the top 0.5% of the population. A score of 130+ is generally considered 'High Potential'."
  },
  {
    q: "How is the reaction speed test measured?",
    a: "Our reaction speed tool measures the precise millisecond delay between a visual stimulus on your screen (a color change) and your physical response (a click or tap). We use high-precision browser timers to filter out environmental lag, providing a reliable measure of your cognitive processing speed and neuromuscular efficiency."
  },
  {
    q: "What is my mental age?",
    a: "Mental age is a concept used to describe your psychological and intellectual maturity relative to average behavioral norms. Our assessment uses a series of lifestyle, logic, and reasoning questions to estimate whether your 'mind' is younger or older than your chronological age. It is a tool for self-discovery and understanding your mental development."
  },
  {
    q: "Is my data private and secure?",
    a: "Privacy is our highest priority. IQ Checker XYZ is built on a serverless architecture where all testing logic runs entirely within your web browser. We do not store your quiz answers or final results on our servers. Your data belongs to you, and you choose if and when to share it with the world."
  },
  {
    q: "Do I need to pay to see my results?",
    a: "No. Unlike many other platforms that hide results behind a paywall, our core cognitive tools are 100% free to use. We believe that access to cognitive benchmarking should be a universal right for anyone curious about their potential."
  },
  {
    q: "How can I share my brilliance with others?",
    a: "Upon completing any test, you will be presented with a beautifully designed result card. You can easily share this directly to X (Twitter), Instagram, or Facebook using our integrated share tools, or download a high-resolution image to keep for your records."
  }
];

export const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
};
