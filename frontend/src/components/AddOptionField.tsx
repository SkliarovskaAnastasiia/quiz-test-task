'use client';
import { QuestionOption } from '@/types';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

interface AddOptionFieldProps {
  options: QuestionOption[];
  field: {
    onChange: (value: QuestionOption[]) => void;
    value?: QuestionOption[];
  };
}

export const AddOptionField = ({ options, field }: AddOptionFieldProps) => {
  const [newOption, setNewOption] = useState<string>('');

  return (
    <Box display="flex" mt={1} sx={{ width: '100%' }}>
      <TextField
        placeholder="Add option"
        value={newOption}
        onChange={(e) => setNewOption(e.target.value)}
        sx={{ mr: 1, flexGrow: 1 }}
      />
      <Button
        type="button"
        onClick={() => {
          if (!newOption) return;

          const updatedOptions = [
            ...options,
            { text: newOption, isCorrect: false },
          ];
          field.onChange(updatedOptions);
          setNewOption('');
        }}
      >
        Add
      </Button>
    </Box>
  );
};
