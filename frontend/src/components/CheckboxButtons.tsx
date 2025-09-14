import { CreateQuizBody } from '@/types';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  Typography,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { AddOptionField } from './AddOptionField';
import DeleteIcon from '@mui/icons-material/Delete';

interface CheckboxButtonsProps {
  control: Control<CreateQuizBody>;
  index: number;
}

export const CheckboxButtons = ({ control, index }: CheckboxButtonsProps) => {
  return (
    <>
      <Typography fontStyle="italic">
        Add minimum 2 options and choose all correct ones
      </Typography>
      <FormControl>
        <FormLabel>Options</FormLabel>
        <Controller
          control={control}
          name={`questions.${index}.options`}
          render={({ field }) => {
            const options = field.value || [];

            return (
              <>
                <FormGroup>
                  {options.map((opt) => (
                    <Box
                      key={opt.text}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={opt.isCorrect || false}
                            onChange={(e) => {
                              const updated = options.map((o) =>
                                o.text === opt.text
                                  ? { ...o, isCorrect: e.target.checked }
                                  : o,
                              );
                              field.onChange(updated);
                            }}
                          />
                        }
                        label={opt.text}
                      />

                      <IconButton
                        type="button"
                        onClick={() => {
                          const updated = options.filter(
                            (o) => o.text !== opt.text,
                          );
                          field.onChange(updated);
                        }}
                      >
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </Box>
                  ))}
                </FormGroup>

                <AddOptionField options={options} field={field} />
              </>
            );
          }}
        />
      </FormControl>
    </>
  );
};
