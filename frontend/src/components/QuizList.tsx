import { Quiz } from '@/types';
import { List, ListItem } from '@mui/material';
import { QuizCard } from './QuizCard';

interface QuizListProps {
  data: Quiz[];
}

export const QuizList = ({ data }: QuizListProps) => {
  return (
    <List
      sx={{
        padding: 0,
        '& .MuiListItem-root ': {
          padding: 0,
          width: { xs: '100%', sm: '280px', md: '340px' },
        },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: '10px',
      }}
    >
      {data?.map((q) => (
        <ListItem key={q.id}>
          <QuizCard quiz={q} />
        </ListItem>
      ))}
    </List>
  );
};
