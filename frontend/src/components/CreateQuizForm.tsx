'use client';
import { CreateQuizBody, QuestionType } from '@/types';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Stack } from '@mui/system';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { RadioButtons } from './RadioButtons';
import { CheckboxButtons } from './CheckboxButtons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createQuiz } from '@/services/api';

export const CreateQuizForm = () => {
  const { control, register, handleSubmit, watch, reset, formState } =
    useForm<CreateQuizBody>({
      defaultValues: { title: '', questions: [] },
      mode: 'onChange',
    });

  const questions = watch('questions');
  const quizTitle = watch('title');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, CreateQuizBody>({
    mutationFn: (quizData: CreateQuizBody) => createQuiz(quizData),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
    },
  });

  const onSubmit = (data: CreateQuizBody) => {
    mutation.mutate(data);
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ gap: '12px' }}
    >
      <TextField
        label="Quiz Title"
        fullWidth
        {...register('title', { required: true })}
      />

      {fields.map((field, index) => {
        const type = watch(`questions.${index}.type`) as QuestionType;

        return (
          <Stack
            key={field.id}
            sx={{
              border: '1px solid #ccc',
              padding: '16px',
              borderRadius: '12px',
              gap: '10px',
            }}
          >
            <Controller
              control={control}
              name={`questions.${index}.type`}
              defaultValue={field.type}
              render={({ field: selectField }) => (
                <FormControl fullWidth>
                  <InputLabel>Question Type</InputLabel>
                  <Select {...selectField} label="Question Type">
                    <MenuItem value="INPUT">Short answer</MenuItem>
                    <MenuItem value="BOOLEAN">True/False</MenuItem>
                    <MenuItem value="CHECKBOX">Multiply</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <TextField
              label="Question"
              fullWidth
              {...register(`questions.${index}.text`, {
                required: true,
              })}
            />

            {type === 'INPUT' && (
              <TextField
                label="Correct Answer"
                fullWidth
                {...register(`questions.${index}.correctAnswer`, {
                  required: true,
                })}
              />
            )}

            {type === 'BOOLEAN' && (
              <RadioButtons control={control} index={index} />
            )}

            {type === 'CHECKBOX' && (
              <CheckboxButtons control={control} index={index} />
            )}

            <Button
              variant="outlined"
              color="error"
              onClick={() => remove(index)}
            >
              Remove Question
            </Button>
          </Stack>
        );
      })}

      <Button
        variant="outlined"
        type="button"
        onClick={() =>
          append({
            text: '',
            type: 'INPUT',
            correctAnswer: '',
            options: [],
          })
        }
      >
        Add Question
      </Button>

      <Button
        variant="outlined"
        type="submit"
        disabled={!(!!quizTitle && questions.length > 0 && formState.isValid)}
      >
        Submit
      </Button>
    </Stack>
  );
};
