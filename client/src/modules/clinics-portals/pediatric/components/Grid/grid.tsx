import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { useEffect, useState } from "react";
import "./grid.css";
import PopUp from "../PopUp/Popup";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { styled } from "@mui/material/styles";

let id: number = 0;
const initialRows: GridRowsProp = [
  {
    Slot: dayjs("2023-12-28T15:30"),
    Name: "abram Gad",
    id: id++,
  },
  {
    Slot: dayjs("2023-12-17T1:30"),
    Name: "Nira Yosef",
    id: id++,
  },
  {
    Slot: dayjs("2023-12-10T20:30"),
    Name: "Mayar fayze",
    id: id++,
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  setApointmentDateGlobal: (newValue: Dayjs) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;
  const [ApointmentDate, setApointmentDate] = React.useState<Dayjs | null>(
    null
  );

  const handleClick = () => {
    id = id + 1;
    setRows((oldRows) => [...oldRows, { id, Slot: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "Slot" },
    }));
    // openModal();
  };

  return (
    <div className="CreateContainer">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Apointment day"
          className="date-picker"
          defaultValue={dayjs()}
          value={ApointmentDate}
          onChange={(newValue) => {
            setApointmentDate(newValue);
            props.setApointmentDateGlobal(newValue || dayjs());
          }}
        />
      </LocalizationProvider>
      <Button
        className="AddBtn"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick}
      >
        Create New slot
      </Button>
    </div>
  );
}

export default function ScheduleViwer() {
  const [ApointmentDate, setApointmentDate] = React.useState<Dayjs>(dayjs());
  const handelApointmentDateGlobal = (newValue: Dayjs) => {
    setApointmentDate(newValue);
    setRows(filterRowsByDay(initialRows, newValue));
  };

  const filterRowsByDay = (rows: GridRowsProp, targetDay: dayjs.Dayjs) => {
    return rows.filter((row) => {
      // Compare the day of the Slot with the targetDay
      return dayjs(row.Slot).isSame(targetDay, "day");
    });
  };
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "Slot",
      width: 180,
      editable: false,
      cellClassName: "Slot",
      renderCell: (params) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              className="timePick"
              defaultValue={initialRows[params.id as number]?.Slot}
            ></TimePicker>
          </LocalizationProvider>
        );
      },
    },

    {
      field: "Name",
      width: 500,
      editable: true,
      type: "string",
      cellClassName: "Name",
    },
    {
      field: "actions",
      type: "actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div className="GridContainer">
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          className="grid"
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          hideFooter
          disableColumnFilter
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: {
              setRows,
              setRowModesModel,
              setApointmentDateGlobal: handelApointmentDateGlobal,
            },
          }}
        />
      </Box>
    </div>
  );
}
