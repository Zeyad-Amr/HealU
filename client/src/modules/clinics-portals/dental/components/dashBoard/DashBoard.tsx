// DashBoard.tsx
import React, { useEffect, useState } from "react";
import {
    TableContainer,
    Paper,
    Stack,
    Button,
    MenuItem,
    Menu,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateSlotModal from "./popUP/CreateSlotModal";
import styles from "./DashBoard.module.css"; // Import the CSS module
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../../core/store";
import { Slot, fetchSlots } from "../../state/slices/slotsSlice";
import {
    Appointment,
    fetchAppointments,
} from "../../state/slices/appointmentSlice";
import AppointmentModal from "./AppointmentModal";
import dayjs from "dayjs";
import SlotsTable from "./SlotsTable";
import { useNavigate } from "react-router-dom";
import { fetchExaminationByAppointmentID } from "../../state/slices/examinationSlice";
import { fetchPatients } from "../../state/slices/patientSlice";

interface DashBoardProps {
    // Other props if needed
}

const DashBoard: React.FC<DashBoardProps> = () => {
    const dispatch = useAppDispatch();
    const SlotsState = useSelector((state: RootState) => state.slotReducer);

    const [selectedDate, setSelectedDate] = useState<number>(0);
    const [selectedAppointment, setSelectedAppointment] =
        useState<Appointment | null>(null);
    const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
    const [showCreateSlotModal, setShowCreateSlotModal] =
        useState<boolean>(false);
    const [slots, setSlots] = useState<Slot[]>([]);

    ///////////////////////////////////////////////////

    useEffect(() => {
        dispatch(fetchSlots());
        dispatch(fetchAppointments());
        dispatch(fetchPatients());
    }, [dispatch]);

    useEffect(() => {
        const selectedWeekday = dayjs(
            getCurrentWeekDates()[selectedDate]
        ).format("dddd");
        setSlots(
            SlotsState.slots
                .filter((slot) => slot.weekDay === selectedWeekday)
                .sort((a: Slot, b: Slot) => {
                    if (a.time > b.time) return 1;
                    if (a.time < b.time) return -1;
                    return 0;
                })
        );
    }, [selectedDate, SlotsState.slots]);

    ///////////////////////////////////////////////////

    function getCurrentWeekDates() {
        const today = dayjs();
        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const daysUntilNextSelectedDay = (i - today.day() + 7) % 7;
            const nextSelectedDay = today.add(daysUntilNextSelectedDay, "days");
            weekDates.push(nextSelectedDay.format("dddd YYYY-MM-DD"));
        }
        return weekDates;
    }

    ///////////////////////////////////////////////////

    const navigate = useNavigate();

    const handleAppointmenClick = async (
        selectedAppointment: Appointment | undefined
    ) => {
        if (selectedAppointment === undefined) return;
        // setSelectedAppointment(selectedAppointment);
        dispatch(
            await fetchExaminationByAppointmentID(selectedAppointment._id ?? "")
        ).then(() => {
            navigate(`/clinic/dental/examination`);
        });
    };

    const handleCloseModal = () => {
        setSelectedAppointment(null);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const handleCreateSlotClick = () => {
        setShowCreateSlotModal(true);
    };

    const handleCreateSlotModalClose = () => {
        setShowCreateSlotModal(false);
    };

    const handleDateChange = (date: string) => {
        setSelectedDate(getCurrentWeekDates().indexOf(date));
        handleMenuClose();
    };

    return (
        <div className={styles.dashboardContainer}>
            <TableContainer component={Paper} className={styles.tableContainer}>
                <div className={styles.createSlotButtonContainer}>
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        className={styles.textStyle}
                    >
                        {/* Customized Date Selection */}
                        <div
                            className={styles.dateSelection}
                            onClick={handleMenuOpen}
                        >
                            {getCurrentWeekDates()[selectedDate].toString()}
                        </div>
                        <Menu
                            anchorEl={menuAnchor}
                            open={Boolean(menuAnchor)}
                            onClose={handleMenuClose}
                            className={styles.menu}
                        >
                            {getCurrentWeekDates().map((date) => (
                                <MenuItem
                                    key={date.toString()}
                                    value={date}
                                    onClick={() => handleDateChange(date)}
                                >
                                    {date}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Stack>

                    <Button
                        variant="contained"
                        className={styles.createSlotButton}
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handleCreateSlotClick}
                    >
                        Create New Slot
                    </Button>
                </div>

                <SlotsTable
                    slots={slots}
                    handleAppointmentClick={handleAppointmenClick}
                />
            </TableContainer>

            {/* Modal for displaying patient details */}
            <AppointmentModal
                selectedAppointment={selectedAppointment ?? undefined}
                handleCloseModal={handleCloseModal}
            />

            {/* Modal for creating a new slot */}
            <CreateSlotModal
                open={showCreateSlotModal}
                onClose={handleCreateSlotModalClose}
            />
        </div>
    );
};

export default DashBoard;
