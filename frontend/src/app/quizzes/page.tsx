'use client';
import { Quiz } from '@/types';
import { getAllQuizzes } from '@/services/api';
import { useRouter } from 'next/navigation';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { QuizList } from '@/components/QuizList';
import { useQuery } from '@tanstack/react-query';

const QuizzesPage = () => {
  const router = useRouter();

  const { data: quizzes = [], isLoading } = useQuery<Quiz[]>({
    queryKey: ['quizzes'],
    queryFn: getAllQuizzes,
  });

  return (
    <>
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Typography fontSize="32px" fontWeight={700}>
          All Quizzes
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            router.push('/create');
          }}
        >
          Create quiz
        </Button>
      </Stack>

      {isLoading && (
        <Stack
          sx={{
            width: '100%',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Stack>
      )}

      {!isLoading && <QuizList data={quizzes} />}
    </>
  );
};

export default QuizzesPage;
