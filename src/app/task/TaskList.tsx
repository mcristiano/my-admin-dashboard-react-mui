import React from 'react';
import CustomDataGrid from '@/base/components/CustomDataGrid';
import { Task } from '@/types/individual/Task';

const TaskList: React.FC = () => {

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'create_at', headerName: 'Created At', width: 150 },
    { field: 'finalize_at', headerName: 'Finalized At', width: 150 },
  ];

  return (
    <CustomDataGrid<Task> entityType="tasks" columns={columns}/>
  );
};

export default TaskList;
