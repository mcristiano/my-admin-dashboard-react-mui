import React, { useState, useEffect, useCallback } from 'react';
    import {
      DataGrid,
      GridColDef,
      GridToolbarContainer,
      GridToolbarColumnsButton,
      GridToolbarFilterButton,
      GridToolbarDensitySelector,
      GridToolbarExport,
      ptBR,
    } from '@mui/x-data-grid';
    import { Box, IconButton, TextField, MenuItem, Select, SelectChangeEvent } from '@mui/material';
    import DeleteIcon from '@mui/icons-material/Delete';
    import AddIcon from '@mui/icons-material/Add';
    import { EntityTypeMap } from '@/services/db';

    interface CustomToolbarProps {
      onAddClick: () => void;
      onDeleteClick: () => void;
      entityType: keyof EntityTypeMap;
      columnFields: string[];
    }

    const CustomToolbar: React.FC<CustomToolbarProps> = ({
      onAddClick,
      onDeleteClick,
      entityType,
      columnFields,
    }) => {
      const [filterField, setFilterField] = useState<string>(columnFields.length > 0 ? columnFields[0] : '');
      const [searchText, setSearchText] = useState('');

      const handleFilterFieldChange = (event: SelectChangeEvent) => {
        setFilterField(event.target.value as string);
        console.log('filterField changed:', event.target.value); // Log
      };

      const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        console.log('searchText changed:', event.target.value); // Log
      };

      console.log('CustomToolbar rendered'); // Log
      console.log('columnFields:', columnFields); // Log

      return (
        <GridToolbarContainer>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
          <IconButton onClick={onAddClick} data-testid="add-button">
            <AddIcon />
          </IconButton>
          <IconButton onClick={onDeleteClick} data-testid="delete-button">
            <DeleteIcon />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Select
              value={filterField}
              onChange={handleFilterFieldChange}
              sx={{ mr: 1 }}
              data-testid="filter-select"
            >
              {columnFields.map((field) => (
                <MenuItem key={field} value={field}>
                  {field}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Search"
              value={searchText}
              onChange={handleSearchTextChange}
              variant="standard"
              data-testid="search-input"
            />
          </Box>
        </GridToolbarContainer>
      );
    };

    interface CustomDataGridProps<T extends keyof EntityTypeMap> {
      rows: EntityTypeMap[T][];
      columns: GridColDef[];
      onAddClick: () => void;
      onDeleteClick: (ids: string[]) => void;
      entityType: T;
      columnFields: string[];
    }

    const CustomDataGrid = <T extends keyof EntityTypeMap>({
      rows,
      columns,
      onAddClick,
      onDeleteClick,
      entityType,
      columnFields,
    }: CustomDataGridProps<T>) => {
      const [selectedRows, setSelectedRows] = useState<string[]>([]);

      const handleDeleteClick = useCallback(() => {
        onDeleteClick(selectedRows);
        setSelectedRows([]);
      }, [onDeleteClick, selectedRows]);

      useEffect(() => {
        console.log('CustomDataGrid rendered');
      }, []);

      return (
        <Box style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(ids) => {
              const stringIds = ids.map((id) => String(id));
              setSelectedRows(stringIds);
            }}
            slots={{
              toolbar: CustomToolbar,
            }}
            slotProps={{
              toolbar: {
                onAddClick,
                onDeleteClick: handleDeleteClick,
                entityType,
                columnFields,
              },
            }}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          />
        </Box>
      );
    };

    export default CustomDataGrid;
