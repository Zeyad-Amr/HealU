import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, IconButton, TextField } from "@mui/material";
import { Edit, Delete, Save } from "@mui/icons-material";
import { useState } from "react";
import api from "../../../core/api/api";

interface ServicesTableProps {
  rows: never[];
}

const ServicesTable: React.FC<ServicesTableProps> = ({ rows }) => {
  const [updatedDescription, updateDescription] = useState("");
  const [editModeId, setEditModeId] = useState("");
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateDescription(event.target.value);
  };
  const handleEdit = (id: string) => {
    setEditModeId(id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete clicked for ID:", id);
    api
      .delete(`/admin/clinic-service/${id}`)
      .then(() => window.location.reload());
  };
  const handleSave = (id: string) => {
    console.log("Saving changes at:", updatedDescription);
    api
      .patch(`/admin/clinic-service/${id}`, {
        description: updatedDescription,
      })
      .then(() => window.location.reload());

    updateDescription("");
    setEditModeId("");
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
          {editModeId === params.row.id ? (
            <>
              <TextField
                name="updatedDescription"
                defaultValue={params.row.description}
                size="small"
                margin="dense"
                onChange={handleDescriptionChange}
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
              />
            </>
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
          {editModeId === params.row.id ? (
            <>
              <IconButton
                aria-label="save"
                color="primary"
                onClick={() => handleSave(params.row.id)}
              >
                <Save />
              </IconButton>
            </>
          ) : (
            <IconButton
              aria-label="edit"
              color="secondary"
              onClick={() => handleEdit(params.row.id)}
            >
              <Edit />
            </IconButton>
          )}

          <IconButton
            aria-label="delete"
            color="warning"
            onClick={() => handleDelete(params.row.id)}
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
