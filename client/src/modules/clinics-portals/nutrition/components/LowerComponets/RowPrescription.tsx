import Box from "@mui/material/Box";
import {Content, InputWrapper, LabelWrapper, StyledButton, Title} from "./shared";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import React, {useState} from "react";
import Modal from "../modal";
import MultiSelect from "../multiSelect";
import {useAppDispatch} from "../../../../../core/store";
import {removePrescription, updatePrescription} from "../../slices/nutritionSlice";


const prescriptionField = [
    {label: "Name", name: "name"},
    {label: "Dosage", name: "dosage"},
    {label: "Notes", name: "notes"},
];

const RowPrescription = (props: any) => {

    let {id,  name, dosage, time, notes} = props.props;
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const [formData, setFormData] = useState(props.props);


    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const dispatch = useAppDispatch();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handlePrescriptionSubmit = (e: any) => {
        e.preventDefault();
        dispatch(updatePrescription(formData));
        setIsModalOpen(false);
    }

    const handleDelete = (e: any) => {
        dispatch(removePrescription(id));
        setIsModalOpen(false)
    }

    return (
        <>
            <Box sx={{padding: "1rem"}}>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Title sx={{ width: '85%'}}> {name} </Title>
                    <IconButton aria-label="edit" onClick={handleOpenModal}>
                        <EditIcon fontSize="medium"/>
                    </IconButton>
                </Box>
                <Content>{ dosage }</Content>
                <Content>{ time } </Content>
                <Content> { notes }</Content>
            </Box>

            {
                isModalOpen &&
                <Modal modalTitle={"Edit Prescription"} onClose={() => setIsModalOpen(false)}>
                    <div>
                        {prescriptionField.map((field) => (
                            <LabelWrapper key={field.name}>
                                {field.label}
                                <InputWrapper
                                    type="text"
                                    name={field.name}
                                    defaultValue={props[field.name]}
                                    variant="outlined"
                                    onChange={handleInputChange}
                                />
                            </LabelWrapper>
                        ))}
                        <LabelWrapper>
                            Time
                            <MultiSelect/>
                        </LabelWrapper>

                        <StyledButton type="submit" onClick={handlePrescriptionSubmit}>
                            Save
                        </StyledButton>
                        <StyledButton
                            sx={{
                                backgroundColor: "#FF0000",
                                color: "#FFFFFF",
                                marginLeft: "1rem"
                            }}
                            type="submit"
                            onClick={handleDelete}
                        >
                            Delete
                        </StyledButton>
                    </div>
                </Modal>
            }
        </>
    )
}

export default RowPrescription;
