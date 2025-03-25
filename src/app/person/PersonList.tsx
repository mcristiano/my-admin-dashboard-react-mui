import React from 'react';
import CustomDataGrid from '@/base/components/CustomDataGrid';
import { Person } from '@/types/individual/Person';

const PersonList: React.FC = () => {

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'full_name', headerName: 'Nome Completo', width: 150 },
    { field: 'age', headerName: 'Idade', width: 90 },
    { field: 'email', headerName: 'Email', width: 200 },
    // Add other relevant fields here
  ];

  return (
    <CustomDataGrid<Person> entityType="people" columns={columns} />
  );
};

export default PersonList;
