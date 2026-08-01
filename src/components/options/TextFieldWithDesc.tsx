import { Box, TextField, TextFieldProps } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';

type OwnProps = {
  description?: string;
  value: string | number;
  onOwnChange: (value: string) => void;
  placeholder?: string;
};
const TextFieldWithDesc = ({
  description,
  value,
  onOwnChange,
  placeholder,
  ...props
}: TextFieldProps & OwnProps) => {
  return (
    <Box mb={2}>
      <TextField
        placeholder={placeholder}
        size="small"
        fullWidth
        sx={{
          backgroundColor: 'background.paper',
          '& .MuiOutlinedInput-root': { borderRadius: 1 }
        }}
        value={value}
        onChange={(event) => onOwnChange(event.target.value)}
        {...props}
      />
      {description && (
        <Typography fontSize={12} mt={0.75} color="text.secondary">
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default TextFieldWithDesc;
