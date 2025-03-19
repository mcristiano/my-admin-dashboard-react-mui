import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridRowParams, GridSelectionModel, GridActionsCellItem, GridToolbarContainer } from '@mui/x-data-grid';
import { db } from '@/services/db';
import { EntityType } from '@/types/EntityType';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon, GetApp as GetAppIcon } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

interface CustomDataGridProps<T extends EntityType> {
  entityType: T;
  columns: GridColDef[];
  initialSelectedRowId?: string | number;
  showDefaultButtons?: {
    insert?: boolean;
    update?: boolean;
    delete?: boolean;
  };
  customButtons?: {
    title: string;
    onClick: (selectedRows: any[]) => void;
  }[];
}

function CustomDataGrid<T extends EntityType>({
  entityType,
  columns,
  initialSelectedRowId,
  showDefaultButtons = { insert: true, update: true, delete: true },
  customButtons = [],
}: CustomDataGridProps<T>) {
  console.log("CustomDataGrid rendered"); // Debugging log
  const [rows, setRows] = useState<any[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [openExportDialog, setOpenExportDialog] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchField, setSearchField] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      const data = await db[entityType].getAll();
      setRows(data);
    };

    fetchData();
  }, [entityType]);

  useEffect(() => {
    if (initialSelectedRowId !== undefined) {
      setSelectionModel([initialSelectedRowId]);
    }
  }, [initialSelectedRowId]);

  const handleSelectionChange = (selectionModel: GridSelectionModel) => {
    setSelectionModel(selectionModel);
  };

  const handleDelete = () => {
    const selectedRows = rows.filter((row) => selectionModel.includes(row.id));
    selectedRows.forEach((row) => db[entityType].delete(row.id));
    setRows(rows.filter((row) => !selectionModel.includes(row.id)));
    setSelectionModel([]);
  };

  const handleUpdate = () => {
    if (selectionModel.length === 1) {
      const selectedRowId = selectionModel[0];
      console.log(`Update row with ID: ${selectedRowId}`);
      // Example: navigate(`/edit/${entityType}/${selectedRowId}`);
    }
  };

  const handleInsert = () => {
    console.log('Insert new row');
    // Example: navigate(`/create/${entityType}`);
  };

  const handleExport = () => {
    if (selectionModel.length === 0) {
      setOpenExportDialog(true);
    } else {
      exportData(rows.filter((row) => selectionModel.includes(row.id)));
    }
  };

  const handleConfirmExportAll = async () => {
    setOpenExportDialog(false);
    const allData = await db[entityType].getAll();
    exportData(allData);
  };

  const handleCloseExportDialog = () => {
    setOpenExportDialog(false);
  };

  const exportData = (dataToExport: any[]) => {
    if (dataToExport.length === 0) {
      return; // No data to export
    }

    const header = columns.map((col) => col.headerName).join(',');
    const csv = dataToExport.map((row) =>
      columns.map((col) => {
        const value = row[col.field];
        return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value; // Handle strings with quotes
      }).join(',')
    ).join('\n');

    const csvContent = `data:text/csv;charset=utf-8,${header}\n${csv}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${entityType}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getActions = () => {
    const actions: GridActionsCellItem[] = [];

    if (showDefaultButtons.update) {
      actions.push(
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Update"
          onClick={handleUpdate}
          disabled={selectionModel.length !== 1}
        />
      );
    }

    if (showDefaultButtons.delete) {
      actions.push(
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDelete}
          disabled={selectionModel.length === 0}
        />
      );
    }
    return actions;
  };

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearchFieldChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearchField(event.target.value as string);
  };

  const filterRows = () => {
      if (!searchText) {
        return rows;
      }

      const lowerCaseSearchText = searchText.toLowerCase();

      return rows.filter(row => {
        if (searchField === 'all') {
          // Search in all fields
          return Object.values(row).some(value =>
            value !== null && value !== undefined && String(value).toLowerCase().includes(lowerCaseSearchText)
          );
        } else {
          // Search in the specified field
          const fieldValue = row[searchField];
          return fieldValue !== null && fieldValue !== undefined && String(fieldValue).toLowerCase().includes(lowerCaseSearchText);
        }
      });
    };

    const CustomToolbar = () => {
      console.log("CustomToolbar rendered"); // Debugging log
      return (
      <GridToolbarContainer>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="search-field-label">Search Field</InputLabel>
          <Select
            labelId="search-field-label"
            id="search-field"
            value={searchField}
            label="Search Field"
            onChange={handleSearchFieldChange}
          >
            <MenuItem value="all">All</MenuItem>
            {columns.map((column) => (
              <MenuItem key={column.field} value={column.field}>
                {column.headerName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Search"
          variant="standard"
          value={searchText}
          onChange={handleSearchTextChange}
          size="small"
        />
        {showDefaultButtons.insert && (
          <Tooltip title="Insert">
            <IconButton color="primary" onClick={handleInsert}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
        {customButtons.map((button, index) => (
          <Tooltip key={index} title={button.title}>
            <IconButton
              color="primary"
              onClick={() => {
                const selectedRows = rows.filter((row) => selectionModel.includes(row.id));
                button.onClick(selectedRows);
              }}
            >
              {button.icon || <AddIcon />}
            </IconButton>
          </Tooltip>
        ))}
        <Tooltip title="Export">
          <IconButton color="primary" onClick={handleExport}>
            <GetAppIcon />
          </IconButton>
        </Tooltip>
      </GridToolbarContainer>
    );
    }

  const updatedColumns = [...columns];
  const actionsIndex = updatedColumns.findIndex((col) => col.field === 'actions');
  if (actionsIndex > -1) {
    updatedColumns[actionsIndex] = {
      ...updatedColumns[actionsIndex],
      getActions: (params: GridRowParams) => [...getActions(), ...updatedColumns[actionsIndex].getActions(params)],
    };
  } else {
    updatedColumns.push({
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: getActions,
    });
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={filterRows()}
        columns={updatedColumns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
        onRowSelectionModelChange={handleSelectionChange}
        selectionModel={selectionModel}
        components={{
          Toolbar: CustomToolbar,
        }}
      />

      <Dialog
        open={openExportDialog}
        onClose={handleCloseExportDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Export All Data?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            No rows are selected. Do you want to export all data?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseExportDialog}>Cancel</Button>
          <Button onClick={handleConfirmExportAll} autoFocus>
            Export All
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomDataGrid;
