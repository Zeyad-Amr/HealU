import LowerComponent from "../LowerComponent";
import MultiSelect from "../multiSelect";
import React, {useState} from "react";
import {LabelWrapper, InputWrapper, StyledButton, Title, Content} from "./shared";
import {Card} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import RowPrescription from "./RowPrescription";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../../../core/store";
import { addPrescription } from "../../slices/nutritionSlice";

const prescriptionField = [
    {label: "Name", name: "name"},
    {label: "Dosage", name: "dosage"},
    {label: "Notes", name: "notes"},
];

const initialPrescriptionData: { [key: string]: string } = {
    name: "Cometrex",
    dosage: "30 ML",
    notes: "Test",
    time: "After Breakfast",
};

const Prescription = () => {

    const [formData, setFormData] = useState(initialPrescriptionData);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const dipatch = useAppDispatch();


    const handlePrescriptionSubmit = (e: any) => {
        e.preventDefault();
        dipatch(addPrescription({
            ...formData,
            id: Math.floor(Math.random() * 100),
        }));

    }

    const {
        currentPatient: {prescriptions}
    } = useSelector((state: any) => state.nutrition);


    return <>
        <LowerComponent title={"Prescriptions"}>
            <div>
                {prescriptionField.map((field) => (
                    <LabelWrapper key={field.name}>
                        {field.label}
                        <InputWrapper
                            type="text"
                            name={field.name}
                            value={formData[field.name]} // Use value instead of defaultValue
                            onChange={handleInputChange}
                            variant="outlined"
                        />
                    </LabelWrapper>
                ))}
                <LabelWrapper>
                    Time
                    <MultiSelect changeHandler={handleInputChange}/>
                </LabelWrapper>

                <StyledButton type="submit" onClick={handlePrescriptionSubmit}>
                    Save
                </StyledButton>
            </div>
        </LowerComponent>

        {
            prescriptions.length > 0 &&
            <Box>
                <Card sx={{
                    borderRadius: "0 0 1rem 1rem "
                }}>
                    <Box sx={{padding: "1rem"}}>
                        {
                            prescriptions.map((prescription: any) => (
                                <RowPrescription
                                    props={prescription}
                                />
                            ))
                        }
                    </Box>
                </Card>
            </Box>
        }
    </>
};

export default Prescription;
