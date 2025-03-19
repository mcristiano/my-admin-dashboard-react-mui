import React from 'react';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'date'; // Add more types as needed
  size?: number; // Optional size, defaults to 6 (half width)
}

interface GenericFormProps {
  fields: FormField[];
  initialData?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
}

const GenericForm: React.FC<GenericFormProps> = ({ fields, initialData = {}, onSubmit }) => {
  const [formData, setFormData] = React.useState<Record<string, any>>(initialData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={12} sm={field.size || 6} key={field.name}>
            <Typography variant="subtitle1" component="label" htmlFor={field.name}>
              {field.label}
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id={field.name}
              name={field.name}
              type={field.type}
              value={formData[field.name] || ''}
              onChange={handleChange}
            />
          </Grid>
        ))}
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default GenericForm;
