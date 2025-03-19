import React from 'react';
import GenericForm, { FormField } from '@/base/components/GenericForm';
import { Task } from '@/types/individual/Task';
import { localDbService } from '@/services/localDbService'; // Import localDbService
import { TextField } from '@mui/material';

const TaskForm: React.FC = () => {
  const fields: FormField[] = [
    { name: 'description', label: 'Description', type: 'text' },
    {
      name: 'finalize_at',
      label: 'Finalization Date',
      type: 'date',
      render: (props, handleChange) => (
        <TextField
          {...props}
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            pattern: '[0-9]{2}/[0-9]{2}/[0-9]{4}',
          }}
          onChange={(e) => {
            const dateValue = e.target.value;
            if (dateValue) {
              const [year, month, day] = dateValue.split('-');
              const formattedDate = `${day}/${month}/${year}`;
              handleChange({ target: { value: formattedDate, name: props.name } });
            } else {
              handleChange(e);
            }
          }}
        />
      )
    },
  ];

  const handleSubmit = async (data: Partial<Task>) => {
    try {
      const taskData: Task = {
        ...data,
        create_at: new Date().toLocaleDateString('pt-BR'),
      } as Task;

      // Use localDbService.create instead of api.post
      const createdTask = await localDbService.create('tasks', taskData);
      console.log('Task created:', createdTask);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <GenericForm fields={fields} onSubmit={handleSubmit} labelPlacement="top" />
  );
};

export default TaskForm;
