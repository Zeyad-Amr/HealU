import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
interface ServicesTableProps {
  rows: never[];
}
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "description", headerName: "Description", width: 250 },
  {
    field: "clinicId",
    headerName: "Clinic ID",
    width: 150,
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
  },
];

const ServicesTable: React.FC<ServicesTableProps> = ({ rows }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Box>
    </>
  );
};
export default ServicesTable;
