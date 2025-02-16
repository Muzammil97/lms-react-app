import React from 'react';
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';

const DataGrid = ({ rows, columns, ...rest }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <MuiDataGrid rows={rows} columns={columns} {...rest} />
    </div>
  );
};

export default DataGrid;