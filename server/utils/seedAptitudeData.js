import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AptitudeModule from '../models/AptitudeModule.js';
import AptitudeCategory from '../models/AptitudeCategory.js';
import AptitudeTopic from '../models/AptitudeTopic.js';
import AptitudeQuestion from '../models/AptitudeQuestion.js';
import TestPattern from '../models/TestPattern.js';

dotenv.config();

const seedAptitudeData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('📦 Connected to MongoDB');

        // Clear existing data
        await AptitudeModule.deleteMany({});
        await AptitudeCategory.deleteMany({});
        await AptitudeTopic.deleteMany({});
        await AptitudeQuestion.deleteMany({});
        await TestPattern.deleteMany({});
        console.log('🗑️  Cleared existing aptitude data');

        // Create Modules
        const modules = await AptitudeModule.insertMany([
            { name: 'English & Communication', description: 'Verbal ability, grammar, and comprehension', icon: '📝', order: 1 },
            { name: 'Logical & Critical Ability', description: 'Logical reasoning and critical thinking', icon: '🧠', order: 2 },
            { name: 'Quantitative Aptitude', description: 'Mathematical and numerical ability', icon: '🔢', order: 3 },
            { name: 'Programming & Coding', description: 'Programming fundamentals and logic', icon: '💻', order: 4 }
        ]);
        console.log('✅ Created modules');

        // Create Categories
        const categories = await AptitudeCategory.insertMany([
            // English
            { module: modules[0]._id, name: 'Verbal Ability', order: 1 },
            { module: modules[0]._id, name: 'Reading Comprehension', order: 2 },
            // Logical
            { module: modules[1]._id, name: 'Logical Reasoning', order: 1 },
            { module: modules[1]._id, name: 'Critical Reasoning', order: 2 },
            // Quantitative
            { module: modules[2]._id, name: 'Arithmetic', order: 1 },
            { module: modules[2]._id, name: 'Algebra', order: 2 },
            { module: modules[2]._id, name: 'Data Interpretation', order: 3 },
            // Programming
            { module: modules[3]._id, name: 'Programming Fundamentals', order: 1 }
        ]);
        console.log('✅ Created categories');

        // Create Topics
        const topics = await AptitudeTopic.insertMany([
            // Verbal Ability
            {
                module: modules[0]._id,
                category: categories[0]._id,
                name: 'Synonyms & Antonyms',
                shortNotes: 'Words with similar or opposite meanings',
                keyPoints: ['Learn root words', 'Context matters', 'Practice daily'],
                order: 1
            },
            {
                module: modules[0]._id,
                category: categories[0]._id,
                name: 'Sentence Correction',
                shortNotes: 'Grammar and sentence structure',
                keyPoints: ['Subject-verb agreement', 'Tense consistency', 'Modifier placement'],
                order: 2
            },
            // Reading Comprehension
            {
                module: modules[0]._id,
                category: categories[1]._id,
                name: 'Passage Reading',
                shortNotes: 'Understanding written passages',
                keyPoints: ['Read actively', 'Identify main idea', 'Note supporting details'],
                order: 1
            },
            // Logical Reasoning
            {
                module: modules[1]._id,
                category: categories[2]._id,
                name: 'Series Completion',
                shortNotes: 'Number and letter patterns',
                keyPoints: ['Look for arithmetic patterns', 'Check geometric patterns', 'Mixed operations'],
                order: 1
            },
            {
                module: modules[1]._id,
                category: categories[2]._id,
                name: 'Blood Relations',
                shortNotes: 'Family relationship problems',
                keyPoints: ['Draw family tree', 'Mark gender', 'Trace relationships'],
                order: 2
            },
            // Critical Reasoning
            {
                module: modules[1]._id,
                category: categories[3]._id,
                name: 'Argument Analysis',
                shortNotes: 'Strengthen/weaken arguments',
                keyPoints: ['Identify conclusion', 'Find assumptions', 'Check logic'],
                order: 1
            },
            // Arithmetic
            {
                module: modules[2]._id,
                category: categories[4]._id,
                name: 'Percentages',
                shortNotes: 'Percentage calculations and applications',
                keyPoints: ['Basic formula: (Part/Whole) × 100', 'Percentage change', 'Successive percentages'],
                formulas: ['% = (Part/Whole) × 100', 'Increase% = [(New-Old)/Old] × 100'],
                order: 1
            },
            {
                module: modules[2]._id,
                category: categories[4]._id,
                name: 'Profit & Loss',
                shortNotes: 'Profit, loss, discount calculations',
                keyPoints: ['Profit = SP - CP', 'Loss = CP - SP', 'Discount = MP - SP'],
                formulas: ['Profit% = (Profit/CP) × 100', 'SP = CP × (100 + Profit%)/100'],
                order: 2
            },
            {
                module: modules[2]._id,
                category: categories[4]._id,
                name: 'Time & Work',
                shortNotes: 'Work rate and efficiency problems',
                keyPoints: ['Work = Rate × Time', 'Combined work formula', 'Efficiency ratios'],
                formulas: ['1/x + 1/y = 1/combined', 'Work done = Days × Efficiency'],
                order: 3
            },
            // Algebra
            {
                module: modules[2]._id,
                category: categories[5]._id,
                name: 'Linear Equations',
                shortNotes: 'Solving equations with one or two variables',
                keyPoints: ['Isolate variable', 'Substitution method', 'Elimination method'],
                order: 1
            },
            // Data Interpretation
            {
                module: modules[2]._id,
                category: categories[6]._id,
                name: 'Tables & Graphs',
                shortNotes: 'Interpreting data from tables and charts',
                keyPoints: ['Read carefully', 'Quick calculations', 'Percentage estimation'],
                order: 1
            },
            // Programming
            {
                module: modules[3]._id,
                category: categories[7]._id,
                name: 'Programming Logic',
                shortNotes: 'Basic programming concepts and logic',
                keyPoints: ['Variables and data types', 'Loops and conditions', 'Functions'],
                order: 1
            }
        ]);
        console.log('✅ Created topics');

        // Create Sample Questions
        const questions = [];

        // ENGLISH - Synonyms (10 questions)
        const synonymQuestions = [
            {
                module: modules[0]._id,
                category: categories[0]._id,
                topic: topics[0]._id,
                question: 'Choose the word that is most similar in meaning to "ABUNDANT"',
                options: [
                    { label: 'A', text: 'Scarce' },
                    { label: 'B', text: 'Plentiful' },
                    { label: 'C', text: 'Meager' },
                    { label: 'D', text: 'Insufficient' }
                ],
                correctAnswer: 'B',
                explanation: 'Abundant means existing in large quantities; plentiful. Scarce, meager, and insufficient all mean the opposite.',
                quickTip: 'Abundant = A-BUND-ant (a bundle of plenty)',
                difficulty: 'Easy',
                timeToSolve: 30,
                companies: ['AMCAT', 'CoCubes', 'TCS']
            },
            {
                module: modules[0]._id,
                category: categories[0]._id,
                topic: topics[0]._id,
                question: 'Choose the word that is most similar in meaning to "METICULOUS"',
                options: [
                    { label: 'A', text: 'Careless' },
                    { label: 'B', text: 'Precise' },
                    { label: 'C', text: 'Hasty' },
                    { label: 'D', text: 'Rough' }
                ],
                correctAnswer: 'B',
                explanation: 'Meticulous means showing great attention to detail; very careful and precise.',
                difficulty: 'Medium',
                timeToSolve: 30,
                companies: ['Infosys', 'Wipro']
            },
            {
                module: modules[0]._id,
                category: categories[0]._id,
                topic: topics[0]._id,
                question: 'Choose the word that is OPPOSITE in meaning to "BENEVOLENT"',
                options: [
                    { label: 'A', text: 'Kind' },
                    { label: 'B', text: 'Generous' },
                    { label: 'C', text: 'Malevolent' },
                    { label: 'D', text: 'Charitable' }
                ],
                correctAnswer: 'C',
                explanation: 'Benevolent means kind and generous. Malevolent means having evil intentions.',
                difficulty: 'Medium',
                timeToSolve: 30,
                companies: ['AMCAT', 'CoCubes']
            }
        ];

        // LOGICAL - Series (10 questions)
        const seriesQuestions = [
            {
                module: modules[1]._id,
                category: categories[2]._id,
                topic: topics[3]._id,
                question: 'Find the next number in the series: 2, 6, 12, 20, 30, ?',
                options: [
                    { label: 'A', text: '40' },
                    { label: 'B', text: '42' },
                    { label: 'C', text: '44' },
                    { label: 'D', text: '46' }
                ],
                correctAnswer: 'B',
                explanation: 'Pattern: 1×2, 2×3, 3×4, 4×5, 5×6, 6×7 = 42. Each term is n(n+1).',
                quickTip: 'Look for n(n+1) pattern in series',
                difficulty: 'Easy',
                timeToSolve: 45,
                companies: ['TCS', 'Wipro']
            },
            {
                module: modules[1]._id,
                category: categories[2]._id,
                topic: topics[3]._id,
                question: 'Find the next number: 3, 7, 15, 31, 63, ?',
                options: [
                    { label: 'A', text: '127' },
                    { label: 'B', text: '125' },
                    { label: 'C', text: '129' },
                    { label: 'D', text: '131' }
                ],
                correctAnswer: 'A',
                explanation: 'Pattern: Each number is (previous × 2) + 1. 63 × 2 + 1 = 127',
                difficulty: 'Medium',
                timeToSolve: 60,
                companies: ['AMCAT', 'CoCubes']
            }
        ];

        // QUANTITATIVE - Percentages (15 questions)
        const percentageQuestions = [
            {
                module: modules[2]._id,
                category: categories[4]._id,
                topic: topics[6]._id,
                question: 'What is 25% of 80?',
                options: [
                    { label: 'A', text: '15' },
                    { label: 'B', text: '20' },
                    { label: 'C', text: '25' },
                    { label: 'D', text: '30' }
                ],
                correctAnswer: 'B',
                explanation: '25% of 80 = (25/100) × 80 = 20',
                quickTip: '25% = 1/4, so divide by 4',
                difficulty: 'Easy',
                timeToSolve: 30,
                companies: ['TCS', 'Infosys', 'Wipro']
            },
            {
                module: modules[2]._id,
                category: categories[4]._id,
                topic: topics[6]._id,
                question: 'If a number is increased by 20% and then decreased by 20%, what is the net change?',
                options: [
                    { label: 'A', text: 'No change' },
                    { label: 'B', text: '4% decrease' },
                    { label: 'C', text: '4% increase' },
                    { label: 'D', text: '2% decrease' }
                ],
                correctAnswer: 'B',
                explanation: 'Net change = x + y + (xy/100) = 20 + (-20) + (20×-20/100) = -4%',
                quickTip: 'Successive percentage formula: x + y + xy/100',
                difficulty: 'Medium',
                timeToSolve: 60,
                companies: ['AMCAT', 'CoCubes']
            },
            {
                module: modules[2]._id,
                category: categories[4]._id,
                topic: topics[6]._id,
                question: 'A shirt is marked at ₹500 and sold at ₹400. What is the discount percentage?',
                options: [
                    { label: 'A', text: '15%' },
                    { label: 'B', text: '20%' },
                    { label: 'C', text: '25%' },
                    { label: 'D', text: '30%' }
                ],
                correctAnswer: 'B',
                explanation: 'Discount% = [(500-400)/500] × 100 = 20%',
                difficulty: 'Easy',
                timeToSolve: 45,
                companies: ['TCS', 'Wipro']
            }
        ];

        // QUANTITATIVE - Profit & Loss (15 questions)
        const profitLossQuestions = [
            {
                module: modules[2]._id,
                category: categories[4]._id,
                topic: topics[7]._id,
                question: 'If CP = ₹100 and SP = ₹120, what is the profit percentage?',
                options: [
                    { label: 'A', text: '15%' },
                    { label: 'B', text: '20%' },
                    { label: 'C', text: '25%' },
                    { label: 'D', text: '30%' }
                ],
                correctAnswer: 'B',
                explanation: 'Profit% = [(120-100)/100] × 100 = 20%',
                quickTip: 'Profit% = (Profit/CP) × 100',
                difficulty: 'Easy',
                timeToSolve: 30,
                companies: ['TCS', 'Infosys']
            },
            {
                module: modules[2]._id,
                category: categories[4]._id,
                topic: topics[7]._id,
                question: 'If the cost price of 12 pens equals the selling price of 10 pens, what is the profit percentage?',
                options: [
                    { label: 'A', text: '16.67%' },
                    { label: 'B', text: '20%' },
                    { label: 'C', text: '25%' },
                    { label: 'D', text: '30%' }
                ],
                correctAnswer: 'B',
                explanation: 'Let CP of 1 pen = ₹1. CP of 12 pens = ₹12 = SP of 10 pens. SP of 1 pen = ₹1.2. Profit% = 20%',
                quickTip: 'When CP of x = SP of y, Profit% = [(x-y)/y] × 100',
                difficulty: 'Medium',
                timeToSolve: 90,
                companies: ['AMCAT', 'CoCubes']
            }
        ];

        // QUANTITATIVE - Time & Work (15 questions)
        const timeWorkQuestions = [
            {
                module: modules[2]._id,
                category: categories[4]._id,
                topic: topics[8]._id,
                question: 'A can complete a work in 10 days. B can complete the same work in 15 days. How many days will they take working together?',
                options: [
                    { label: 'A', text: '5 days' },
                    { label: 'B', text: '6 days' },
                    { label: 'C', text: '7 days' },
                    { label: 'D', text: '8 days' }
                ],
                correctAnswer: 'B',
                explanation: 'Combined work per day = 1/10 + 1/15 = 1/6. So they will take 6 days.',
                quickTip: '1/x + 1/y = 1/combined',
                difficulty: 'Easy',
                timeToSolve: 60,
                companies: ['TCS', 'Wipro']
            },
            {
                module: modules[2]._id,
                category: categories[4]._id,
                topic: topics[8]._id,
                question: 'A and B can do a work in 12 days. A alone can do it in 20 days. In how many days can B alone do it?',
                options: [
                    { label: 'A', text: '25 days' },
                    { label: 'B', text: '30 days' },
                    { label: 'C', text: '35 days' },
                    { label: 'D', text: '40 days' }
                ],
                correctAnswer: 'B',
                explanation: 'B\'s work per day = 1/12 - 1/20 = 1/30. So B takes 30 days.',
                difficulty: 'Medium',
                timeToSolve: 75,
                companies: ['AMCAT', 'Infosys']
            }
        ];

        // PROGRAMMING - Logic (10 questions)
        const programmingQuestions = [
            {
                module: modules[3]._id,
                category: categories[7]._id,
                topic: topics[11]._id,
                question: 'What will be the output of: int x = 5; printf("%d", x++);',
                options: [
                    { label: 'A', text: '4' },
                    { label: 'B', text: '5' },
                    { label: 'C', text: '6' },
                    { label: 'D', text: 'Error' }
                ],
                correctAnswer: 'B',
                explanation: 'x++ is post-increment, so it prints 5 first, then increments to 6.',
                quickTip: 'Post-increment: use then increment',
                difficulty: 'Easy',
                timeToSolve: 45,
                companies: ['TCS', 'Infosys', 'Wipro']
            },
            {
                module: modules[3]._id,
                category: categories[7]._id,
                topic: topics[11]._id,
                question: 'What is the time complexity of binary search?',
                options: [
                    { label: 'A', text: 'O(n)' },
                    { label: 'B', text: 'O(log n)' },
                    { label: 'C', text: 'O(n log n)' },
                    { label: 'D', text: 'O(n²)' }
                ],
                correctAnswer: 'B',
                explanation: 'Binary search divides the search space in half each time, giving O(log n) complexity.',
                difficulty: 'Easy',
                timeToSolve: 30,
                companies: ['AMCAT', 'CoCubes']
            }
        ];

        // Combine all questions
        questions.push(...synonymQuestions, ...seriesQuestions, ...percentageQuestions,
            ...profitLossQuestions, ...timeWorkQuestions, ...programmingQuestions);

        await AptitudeQuestion.insertMany(questions);
        console.log(`✅ Created ${questions.length} sample questions`);

        // Create 5 Company Test Patterns
        const testPatterns = await TestPattern.insertMany([
            // 1. AMCAT Pattern
            {
                name: 'AMCAT Pattern Test',
                company: 'AMCAT',
                description: 'Standard AMCAT placement test pattern',
                sections: [
                    {
                        module: modules[0]._id,
                        category: categories[0]._id,
                        name: 'English Comprehension',
                        questionCount: 18,
                        timeLimit: 18,
                        difficulty: 'Medium'
                    },
                    {
                        module: modules[1]._id,
                        category: categories[2]._id,
                        name: 'Logical Ability',
                        questionCount: 14,
                        timeLimit: 15,
                        difficulty: 'Medium'
                    },
                    {
                        module: modules[2]._id,
                        category: categories[4]._id,
                        name: 'Quantitative Ability',
                        questionCount: 16,
                        timeLimit: 18,
                        difficulty: 'Medium'
                    },
                    {
                        module: modules[3]._id,
                        category: categories[7]._id,
                        name: 'Programming Logic',
                        questionCount: 18,
                        timeLimit: 20,
                        difficulty: 'Medium'
                    }
                ],
                totalQuestions: 66,
                totalTime: 71,
                cutoff: 60,
                difficulty: 'Medium'
            },

            // 2. CoCubes Pattern
            {
                name: 'CoCubes Pattern Test',
                company: 'CoCubes',
                description: 'Standard CoCubes assessment pattern',
                sections: [
                    {
                        module: modules[2]._id,
                        category: categories[4]._id,
                        name: 'Quantitative Aptitude',
                        questionCount: 25,
                        timeLimit: 30,
                        difficulty: 'Medium'
                    },
                    {
                        module: modules[1]._id,
                        category: categories[2]._id,
                        name: 'Logical Reasoning',
                        questionCount: 25,
                        timeLimit: 30,
                        difficulty: 'Medium'
                    },
                    {
                        module: modules[0]._id,
                        category: categories[0]._id,
                        name: 'Verbal Ability',
                        questionCount: 25,
                        timeLimit: 30,
                        difficulty: 'Medium'
                    }
                ],
                totalQuestions: 75,
                totalTime: 90,
                cutoff: 65,
                difficulty: 'Medium'
            },

            // 3. TCS NQT Pattern
            {
                name: 'TCS NQT Pattern Test',
                company: 'TCS',
                description: 'TCS National Qualifier Test pattern',
                sections: [
                    {
                        module: modules[2]._id,
                        category: categories[4]._id,
                        name: 'Numerical Ability',
                        questionCount: 26,
                        timeLimit: 40,
                        difficulty: 'Medium'
                    },
                    {
                        module: modules[1]._id,
                        category: categories[2]._id,
                        name: 'Reasoning Ability',
                        questionCount: 30,
                        timeLimit: 50,
                        difficulty: 'Medium'
                    },
                    {
                        module: modules[0]._id,
                        category: categories[0]._id,
                        name: 'Verbal Ability',
                        questionCount: 24,
                        timeLimit: 30,
                        difficulty: 'Medium'
                    },
                    {
                        module: modules[3]._id,
                        category: categories[7]._id,
                        name: 'Programming Logic',
                        questionCount: 10,
                        timeLimit: 20,
                        difficulty: 'Medium'
                    }
                ],
                totalQuestions: 90,
                totalTime: 140,
                cutoff: 55,
                difficulty: 'Medium'
            },

            // 4. Infosys Pattern
            {
                name: 'Infosys Pattern Test',
                company: 'Infosys',
                description: 'Infosys placement test pattern',
                sections: [
                    {
                        module: modules[2]._id,
                        category: categories[4]._id,
                        name: 'Quantitative Aptitude',
                        questionCount: 10,
                        timeLimit: 25,
                        difficulty: 'Hard'
                    },
                    {
                        module: modules[1]._id,
                        category: categories[2]._id,
                        name: 'Logical Reasoning',
                        questionCount: 15,
                        timeLimit: 25,
                        difficulty: 'Hard'
                    },
                    {
                        module: modules[0]._id,
                        category: categories[0]._id,
                        name: 'Verbal Ability',
                        questionCount: 10,
                        timeLimit: 20,
                        difficulty: 'Medium'
                    },
                    {
                        module: modules[3]._id,
                        category: categories[7]._id,
                        name: 'Pseudo Code',
                        questionCount: 5,
                        timeLimit: 10,
                        difficulty: 'Hard'
                    }
                ],
                totalQuestions: 40,
                totalTime: 80,
                cutoff: 70,
                difficulty: 'Hard'
            },

            // 5. Wipro NLTH Pattern
            {
                name: 'Wipro NLTH Pattern Test',
                company: 'Wipro',
                description: 'Wipro National Level Talent Hunt pattern',
                sections: [
                    {
                        module: modules[0]._id,
                        category: categories[0]._id,
                        name: 'Verbal Ability',
                        questionCount: 20,
                        timeLimit: 20,
                        difficulty: 'Medium'
                    },
                    {
                        module: modules[2]._id,
                        category: categories[4]._id,
                        name: 'Quantitative Aptitude',
                        questionCount: 20,
                        timeLimit: 30,
                        difficulty: 'Medium'
                    },
                    {
                        module: modules[1]._id,
                        category: categories[2]._id,
                        name: 'Logical Reasoning',
                        questionCount: 20,
                        timeLimit: 25,
                        difficulty: 'Medium'
                    }
                ],
                totalQuestions: 60,
                totalTime: 75,
                cutoff: 60,
                difficulty: 'Medium'
            }
        ]);

        console.log('✅ Created 5 company test patterns');
        console.log('\n📊 Summary:');
        console.log(`   Modules: ${modules.length}`);
        console.log(`   Categories: ${categories.length}`);
        console.log(`   Topics: ${topics.length}`);
        console.log(`   Questions: ${questions.length}`);
        console.log(`   Test Patterns: ${testPatterns.length}`);
        console.log('\n🎉 Aptitude data seeded successfully!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding aptitude data:', error);
        process.exit(1);
    }
};

seedAptitudeData();
