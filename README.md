# quiz-test-task

Clone the repository

1. Backend setup
   Install dependencies, run:
   cd backend
   npm install

   Create .env file
   add DATABASE_URL="file:./dev.db" and PORT=8080

- Database setup
  - Generate Prisma client:
    run: npx prisma generate
  - Apply migrations (reset database if needed):
    run: npx prisma migrate dev --name init
  - Start backend in development mode
    run: npm run dev

By default, backend will run on http://localhost:8080

2. Frontend setup
   Install dependencies, run:
   cd frontend
   npm install

   Create .env.local file
   add NEXT_PUBLIC_API_URL=http://localhost:8080

- Start frontend in development mode
  run: npm run dev

By default, frontend will run on http://localhost:3000

3. Create a Quiz
   You can create a quiz either through the frontend UI or directly via the API.

Option 1: Using the Frontend

- Start the backend (npm run dev in /backend)
- Start the frontend (npm run dev in /frontend)
- Open http://localhost:3000 in your browser
- Go to the Create Quiz page
- Enter:
  - Quiz title
  - Questions (choose type: Short answer, True/False, or Multiple)
  - Add correct answers
- Submit the form — the quiz will be saved to the database.

Option 2: Using the API

- Send a POST request to:
  POST http://localhost:8080/quizzes

body must be like this:

```json
{
  "title": "France Quiz",
  "questions": [
    {
      "text": "What is the capital of France?",
      "type": "INPUT",
      "correctAnswer": "Paris"
    },
    {
      "text": "Is France in Europe?",
      "type": "BOOLEAN",
      "options": [
        { "text": "True", "isCorrect": true },
        { "text": "False", "isCorrect": false }
      ]
    },
    {
      "text": "Which of the following are French cities?",
      "type": "CHECKBOX",
      "options": [
        { "text": "Lyon", "isCorrect": true },
        { "text": "Berlin", "isCorrect": false },
        { "text": "Marseille", "isCorrect": true }
      ]
    }
  ]
}
```
