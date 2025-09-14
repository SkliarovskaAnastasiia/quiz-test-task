'use client';
import { deleteQuiz } from '@/services/api';
import { Quiz } from '@/types';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface QuizCardProps {
  quiz: Quiz;
}

export const QuizCard = ({ quiz }: QuizCardProps) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, number>({
    mutationFn: (id: number) => deleteQuiz(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
    },
  });

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        borderRadius: '12px',
        padding: { xs: '10px', sm: '14px' },
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}
    >
      <Typography>{quiz.title}</Typography>
      <Typography>
        <Typography component="span" fontWeight={700}>
          {quiz.questions?.length}{' '}
        </Typography>
        {quiz.questions?.length > 1 ? 'questions' : 'question'}
      </Typography>

      <Stack
        sx={{
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          gap: '8px',
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            router.push(`/quizzes/${quiz.id}`);
          }}
          sx={{ width: '100%' }}
        >
          Open
        </Button>
        <Button
          variant="outlined"
          sx={{ color: '#CE1919', borderColor: '#CE1919', width: '100%' }}
          onClick={() => {
            mutation.mutate(quiz.id);
          }}
        >
          Delete
        </Button>
      </Stack>
    </Paper>
  );
};
