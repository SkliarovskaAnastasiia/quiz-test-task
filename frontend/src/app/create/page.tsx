import { CreateQuizForm } from '@/components/CreateQuizForm';
import { Paper, Typography } from '@mui/material';

const CreateQuizPage = () => {
  return (
    <Paper
      elevation={3}
      sx={{ borderRadius: '12px', padding: { xs: '12px', sm: '20px' } }}
    >
      <Typography
        fontWeight={700}
        sx={{ fontSize: { xs: '24px', sm: '28px' }, marginBottom: '20px' }}
      >
        Create Quiz
      </Typography>
      <CreateQuizForm />
    </Paper>
  );
};

export default CreateQuizPage;
