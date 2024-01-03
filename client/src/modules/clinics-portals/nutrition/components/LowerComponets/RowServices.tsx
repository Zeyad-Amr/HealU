import Box from "@mui/material/Box";
import {Content, InputWrapper, LabelWrapper, StyledButton, Title} from "./shared";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import Modal from "../modal";
import MultiSelect from "../multiSelect";
import Dropdown from "../dropDown";

const servicesData = [
    {value: "New Appointment", label: "New Appointment"},
    {value: "Follow-up Appointment", label: "Follow-up Appointment"},
];



const RowServices = ({serivceName}: { serivceName: string }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleTestsSubmit = (e: any) => {
        e.preventDefault();
        console.log("service edited");
    }

    return (
        <>
            <Box sx={{padding: "1rem"}}>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Title> {serivceName} </Title>
                    <IconButton aria-label="edit" onClick={handleOpenModal}>
                        <EditIcon fontSize="medium"/>
                    </IconButton>
                </Box>
            </Box>

            {
                isModalOpen &&
                <Modal modalTitle={"Edit Services"} onClose={() => setIsModalOpen(false)}>
                    <div>
                        <Dropdown options={servicesData} />

                        <StyledButton type="submit" onClick={handleTestsSubmit}>
                            Save
                        </StyledButton>

                        <StyledButton
                            sx={{
                                backgroundColor: "#FF0000",
                                color: "#FFFFFF",
                                marginLeft: "1rem"
                            }}
                            type="submit">
                            Delete
                        </StyledButton>
                    </div>
                </Modal>
            }

        </>
    )
}


export default RowServices;
