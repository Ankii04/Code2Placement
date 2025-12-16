# 🎯 Complete DSA Platform Refactor - Implementation Plan

## Overview
Building a placement-focused DSA learning platform with clear separation between Learn and Practice.

## Flow Architecture

### 1. DSA Topics Landing Page
**URL:** `/topics`
**Purpose:** Show high-level topics only
**Content:**
- Topic cards (Arrays, Strings, Linked List, etc.)
- Each card shows:
  - Topic name
  - Short description
  - "X Subtopics" count
  - Clean card design

### 2. Subtopics List Page
**URL:** `/topics/:topicId/subtopics`
**Purpose:** List all subtopics for a main topic
**Content:**
- Vertical list/cards of subtopics
- Example for Arrays:
  1. Introduction to Arrays
  2. Array Traversal
  3. Insertion & Deletion
  4. Searching in Arrays
  5. Sorting Basics
- Minimal animations (fade/scale only)

### 3. Subtopic Teaching Page
**URL:** `/topics/:topicId/subtopics/:subtopicId`
**Purpose:** Detailed teaching content
**Content:**
- Clear explanation (placement-level)
- Examples with code
- Edge cases
- Time & Space Complexity
- Optional lightweight animations
- "Practice Questions" button at bottom

### 4. Questions Page (Filtered)
**URL:** `/questions?topic=:topicId&subtopic=:subtopicId`
**Purpose:** Show filtered practice questions
**Content:**
- Filter panel (Topic, Subtopic, Difficulty)
- Question cards with "Solve" button
- Auto-generate 5+ questions per subtopic if none exist
- Support both direct access and filtered access

### 5. Problem Solving Page
**URL:** `/problems/:questionId`
**Purpose:** LeetCode-style problem page
**Content:**
- Problem statement
- Input/Output format
- Examples
- Constraints
- Monaco Editor with starter code
- Run & Submit buttons
- Test cases execution

### 6. Completion & Progress Tracking
**Logic:**
- Mark completed ONLY after all test cases pass
- Update user progress in database
- Update dashboard stats
- Show "Completed" badge on question card

## Database Schema

### Collections:

1. **Topics** (Main categories)
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  icon: String,
  order: Number,
  isMainCategory: Boolean (true)
}
```

2. **Subtopics**
```javascript
{
  _id: ObjectId,
  topicId: ObjectId (ref: Topics),
  title: String,
  description: String,
  order: Number
}
```

3. **SubtopicContent** (Teaching material)
```javascript
{
  _id: ObjectId,
  subtopicId: ObjectId (ref: Subtopics),
  explanation: String,
  examples: Array,
  edgeCases: Array,
  timeComplexity: String,
  spaceComplexity: String,
  visualizations: Array (optional)
}
```

4. **Questions**
```javascript
{
  _id: ObjectId,
  topicId: ObjectId,
  subtopicId: ObjectId,
  title: String,
  difficulty: String,
  description: String,
  examples: Array,
  constraints: Array,
  starterCode: String,
  testCases: Array,
  solution: String
}
```

5. **Submissions**
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  questionId: ObjectId,
  code: String,
  language: String,
  status: String (Accepted/Wrong Answer/etc),
  timestamp: Date
}
```

6. **UserProgress**
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  completedQuestions: [ObjectId],
  topicProgress: Map,
  totalSolved: Number,
  lastUpdated: Date
}
```

## Implementation Steps

### Phase 1: Routing & Pages
- [x] Create `/topics` - Main topics list
- [ ] Create `/topics/:topicId/subtopics` - Subtopics list
- [ ] Update `/topics/:topicId/subtopics/:subtopicId` - Teaching page
- [ ] Update `/questions` - Support filtering
- [ ] Ensure `/problems/:questionId` - Problem page exists

### Phase 2: Components
- [ ] TopicCard component
- [ ] SubtopicsList component
- [ ] SubtopicTeaching component
- [ ] QuestionCard component (with "Solve" button)
- [ ] ProblemPage component
- [ ] ProgressTracker component

### Phase 3: Backend APIs
- [ ] GET `/api/topics` - Main topics
- [ ] GET `/api/topics/:id/subtopics` - Subtopics for topic
- [ ] GET `/api/subtopics/:id/content` - Teaching content
- [ ] GET `/api/questions?topic=&subtopic=&difficulty=` - Filtered questions
- [ ] POST `/api/submissions` - Submit solution
- [ ] PUT `/api/progress` - Update user progress

### Phase 4: Data Seeding
- [ ] Seed main topics (17 topics)
- [ ] Seed subtopics (5 per topic = 85 total)
- [ ] Seed teaching content for each subtopic
- [ ] Seed questions (5+ per subtopic = 425+ questions)

### Phase 5: UI/UX Polish
- [ ] Minimal animations (fade, scale ≤ 1.05)
- [ ] Clean, professional design
- [ ] Responsive layout
- [ ] Loading states
- [ ] Error handling

## Success Criteria

✅ Clear separation: Learn vs Practice
✅ Topics → Subtopics → Teaching → Practice flow
✅ Questions marked completed only after passing tests
✅ Progress tracking works automatically
✅ Professional, placement-focused UI
✅ Minimal, subtle animations
✅ All 425+ questions available

## Timeline

- Phase 1-2: Routing & Components (Current)
- Phase 3: Backend APIs
- Phase 4: Data Seeding
- Phase 5: UI/UX Polish

---

**Status:** Starting implementation
**Priority:** High
**Goal:** Complete placement-focused DSA platform
