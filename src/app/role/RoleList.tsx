import React from 'react';
import CustomDataGrid from '@/base/components/CustomDataGrid';
import { GridColDef } from '@mui/x-data-grid';
import { Role } from '@/types/individual/Role';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'description', headerName: 'Description', width: 250 },
];

const RoleList: React.FC = () => {
  return (
    <CustomDataGrid<"roles"> entityType="roles" columns={columns} />
  );
};

export default RoleList;
