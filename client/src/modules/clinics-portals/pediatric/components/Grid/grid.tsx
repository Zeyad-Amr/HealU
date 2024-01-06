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
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../../core/store";
import { fetchSlotsData, AllSlots, deleteSlot } from "../../slices/slots-slice";
import { useSelector } from "react-redux";
import "./grid.css";
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

let id: string = "";
const convertDate = (date: string) => {
  const [hours, minutes] = date.split(":").map(Number);
  const d = new Date();
  d.setHours(hours);
  d.setMinutes(minutes);
  return d;
};

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  setApointmentDateGlobal: (newValue: Dayjs) => void;
  setAllRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel, setAllRows } = props;

  const [ApointmentDate, setApointmentDate] = React.useState<Dayjs | null>(
    null
  );

  const handleClick = () => {
    id = Math.random().toString(36).substr(2, 9);

    setAllRows((oldRows) => [...oldRows, { id, isNew: true }]);
    setRows((oldRows) => [...oldRows, { id, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "Slot" },
    }));
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

export default function ScheduleViwer(props: any) {
  const dispatch = useAppDispatch();
  const [ApointmentDate, setApointmentDate] = React.useState<Dayjs>(dayjs());
  const [allrows, setAllRows] = useState<GridRowsProp>({} as GridRowsProp);
  const [rows, setRows] = React.useState<GridRowsProp>({} as GridRowsProp);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const slotsState = useSelector((state: any) => state.slots);
  useEffect(() => {
    dispatch(fetchSlotsData(ApointmentDate.format("YYYY-MM-DD"))).then(
      (res: any) => {
        console.log(res.payload.slots);
        if (res.payload.slots === undefined) {
          setAllRows([]);
          setRows([]);
          return;
        }
        setAllRows(
          res.payload.slots?.map((item: AllSlots) => {
            return {
              Slot: convertDate(item.slot.time as string),
              Name: item.appointmentObject.patient?.firstName,
              id: item.slot._id,
              appointmentId: item.appointmentObject._id,
            };
          })
        );
        setRows(
          res.payload.slots?.map((item: AllSlots) => {
            return {
              Slot: convertDate(item.slot.time as string),
              Name: item.appointmentObject.patient?.firstName,
              id: item.slot._id,
              appointmentId: item.appointmentObject._id,
            };
          })
        );
      }
    );
  }, [ApointmentDate]);

  const handelApointmentDateGlobal = (newValue: Dayjs) => {
    setApointmentDate(newValue);
  };

  const filterRowsByDay = (rows: GridRowsProp, targetDay: dayjs.Dayjs) => {
    return rows.filter((row) => {
      return dayjs(row.Slot).isSame(targetDay, "day");
    });
  };

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
    dispatch(deleteSlot(id as string));
    setRows(rows.filter((row: GridRowModel) => row.id !== id));
    setAllRows(allrows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row: GridRowModel) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row: GridRowModel) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(
      rows.map((row: GridRowModel) => (row.id === newRow.id ? updatedRow : row))
    );
    setAllRows(allrows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const getAppointmentId = (id: string) => {
    const appointment = slotsState.allSlots.slots.find(
      (item: AllSlots) => item.slot._id === id
    );
    return appointment?.appointmentObject._id;
  };
  const columns: GridColDef[] = [
    {
      field: "Slot",
      width: 190,
      editable: true,
      cellClassName: "Slot",
      type: "dateTime",
      valueFormatter: ({ value }) => {
        return dayjs(value as Date).format("HH:mm");
      },
    },

    {
      field: "Name",
      width: 550,
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
          onCellDoubleClick={(params, event) => {
            if (params.field === "Name") {
              props.setValueOfScreen(2);
              props.setValueOfappointmentID(
                getAppointmentId(params.id as string)
              );
            }
          }}
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
              setAllRows: setAllRows,
            },
          }}
        />
      </Box>
    </div>
  );
}
