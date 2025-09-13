# quiz-test-task

1. Start the Backend
   Install dependencies
   cd backend
   npm install

Database setup

Generate Prisma client:

npx prisma generate

Apply migrations (reset database if needed):

npx prisma migrate dev --name init

Start backend in development mode
npm run dev

By default, backend will run on http://localhost:5000
.

2. Start the Frontend
   Install dependencies
   cd frontend
   npm install

Start frontend in development mode
npm run dev

By default, frontend will run on http://localhost:3000
.

3. Database Overview

The project uses SQLite with Prisma ORM.

Schema includes:

Quiz

id (Int, auto-increment)

title (String)

createdAt (DateTime)

questions (Relation)

Question

id (Int, auto-increment)

text (String)

type (Enum: BOOLEAN, INPUT, CHECKBOX)

quizId (Relation → Quiz)

options (Relation → QuestionOption[])

correctAnswer (String, optional – for INPUT type)

QuestionOption

id (Int, auto-increment)

text (String)

isCorrect (Boolean)

questionId (Relation → Question)

4. API Endpoints
   Get all quizzes
   GET /quizzes

Get quiz by ID
GET /quizzes/:id

Create a quiz
POST /quizzes

Body example:

{
"title": "General Knowledge Quiz",
"questions": [
{
"text": "Is the Earth round?",
"type": "BOOLEAN",
"options": [
{ "text": "True", "isCorrect": true },
{ "text": "False", "isCorrect": false }
]
},
{
"text": "What is the capital of France?",
"type": "INPUT",
"correctAnswer": "Paris"
},
{
"text": "Which of these are programming languages?",
"type": "CHECKBOX",
"options": [
{ "text": "Python", "isCorrect": true },
{ "text": "JavaScript", "isCorrect": true },
{ "text": "Banana", "isCorrect": false }
]
}
]
}

Delete quiz
DELETE /quizzes/:id
