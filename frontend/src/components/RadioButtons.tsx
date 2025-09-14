import { CreateQuizBody } from '@/types';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { AddOptionField } from './AddOptionField';
import DeleteIcon from '@mui/icons-material/Delete';

interface RadioButtonsProps {
  control: Control<CreateQuizBody>;
  index: number;
}

export const RadioButtons = ({ control, index }: RadioButtonsProps) => {
  return (
    <Controller
      control={control}
      name={`questions.${index}.options`}
      render={({ field }) => {
        const options = field.value || [];

        return (
          <>
            <Typography fontStyle="italic">
              Add minimum 2 options and choose correct one
            </Typography>

            <FormControl>
              <FormLabel>Options</FormLabel>
              <RadioGroup
                value={options.find((opt) => opt.isCorrect)?.text || ''}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  const updatedOptions = options.map((opt) => ({
                    ...opt,
                    isCorrect: opt.text === selectedValue,
                  }));
                  field.onChange(updatedOptions);
                }}
              >
                {(field.value || []).map((opt) => (
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
                      value={opt.text}
                      control={<Radio />}
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

                <AddOptionField options={options} field={field} />
              </RadioGroup>
            </FormControl>
          </>
        );
      }}
    />
  );
};
