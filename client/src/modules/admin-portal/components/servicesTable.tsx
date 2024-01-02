import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, IconButton, TextField } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
interface ServicesTableProps {
  rows: never[];
}

const ServicesTable: React.FC<ServicesTableProps> = ({ rows }) => {
  const [editRowId, setEditRowId] = useState("");
  const handleEdit = (id: string) => {
    setEditRowId(id);
    console.log("Edit clicked for ID:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete clicked for ID:", id);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowId: string
  ) => {
    // Handle description change here and update state or perform other actions
    console.log("New description:", e.target.value, "for ID:", rowId);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70, hideable: false },
    { field: "name", headerName: "Name", width: 150, hideable: false },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      hideable: false,
      renderCell: (params) => (
        <>
          {editRowId === params.row.id ? (
            <TextField
              name="updatedDescription"
              defaultValue={params.row.description}
              // variant="filled"
              size="small"
              margin="dense"
              // onChange={handleChange}
            />
          ) : (
            <span>{params.row.description}</span>
          )}
        </>
      ),
    },
    {
      field: "clinicId",
      headerName: "Clinic ID",
      width: 150,
      hideable: false,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      hideable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      hideable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            aria-label="edit"
            onClick={() => handleEdit(params.row.id)} // Implement handleEdit function
          >
            <Edit />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="warning"
            onClick={() => handleDelete(params.row.id)} // Implement handleDelete function
          >
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];
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
        />
      </Box>
    </>
  );
};

export default ServicesTable;
