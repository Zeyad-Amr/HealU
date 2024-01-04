import LowerComponent from "../LowerComponent";
import MultiSelect from "../multiSelect";
import React, {useState} from "react";
import {LabelWrapper, InputWrapper, StyledButton, Title, Content} from "./shared";
import {Card} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import RowPrescription from "./RowPrescription";
import Dropdown from "../dropDown";
import RowServices from "./RowServices";

const servicesData = [
    {value: "New Appointment", label: "New Appointment"},
    {value: "Follow-up Appointment", label: "Follow-up Appointment"},
];

const Services = () => {

    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

    const handleOptionChange = (event: any) => {
        setSelectedOptions(event.target.value as string[]);
    };

    const handleDeleteOption = (option: string) => {
        const updatedOptions = selectedOptions.filter(
            (selectedOption) => selectedOption !== option
        );
        setSelectedOptions(updatedOptions);
    };

    const handleServiceSubmit = (e: any) => {
        e.preventDefault();
        console.log("service edited");
    }

    return <>
        <LowerComponent title={"Services"}>
            <div>
                <Dropdown options={servicesData}/>

                <StyledButton type="submit" onClick={handleServiceSubmit}>
                    Save
                </StyledButton>
            </div>
        </LowerComponent>

        <Box>
            <Card sx={{
                borderRadius: "0 0 1rem 1rem "
            }}>
                <Box sx={{padding: "1rem"}}>
                    <RowServices serivceName={"Comtrex"} />
                </Box>
            </Card>
        </Box>
    </>
};

export default Services;
