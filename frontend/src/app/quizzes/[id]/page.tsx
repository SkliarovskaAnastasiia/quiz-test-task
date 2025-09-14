'use client';
import { getQuizById } from '@/services/api';
import { Quiz } from '@/types';
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const QuizDetailsPage = () => {
  const { id } = useParams();

  const { data: quiz, isLoading } = useQuery<Quiz>({
    queryKey: ['quiz', id],
    queryFn: () => getQuizById(Number(id)),
    enabled: !!id,
  });

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Box>
      <Typography
        fontWeight={700}
        sx={{ fontSize: { xs: '24px', sm: '28px' } }}
      >
        {quiz?.title}
      </Typography>

      <Typography sx={{ marginBottom: '12px', color: '#ccc' }}>
        Read only
      </Typography>

      <Paper
        elevation={3}
        sx={{
          borderRadius: '12px',
          padding: { xs: '12px', sm: '20px' },
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {quiz?.questions.map((q, idx) => {
          return (
            <Box key={q.id}>
              <Typography>{`Q${idx + 1} ${q.text}`}</Typography>

              {q.type === 'INPUT' && (
                <TextField fullWidth disabled label="Write answer" />
              )}

              {q.type === 'BOOLEAN' && (
                <FormControl>
                  <RadioGroup>
                    {q.options?.map((opt) => (
                      <FormControlLabel
                        key={opt.text}
                        value={opt.text}
                        control={<Radio disabled />}
                        label={opt.text}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}

              {q.type === 'CHECKBOX' && (
                <FormControl>
                  {q.options?.map((opt) => (
                    <FormControlLabel
                      key={opt.text}
                      control={<Checkbox disabled />}
                      label={opt.text}
                    />
                  ))}
                </FormControl>
              )}
            </Box>
          );
        })}
      </Paper>
    </Box>
  );
};

export default QuizDetailsPage;
