import Box from "@mui/material/Box";
import {Content, InputWrapper, LabelWrapper, StyledButton, Title} from "./shared";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import React, {useState} from "react";
import Modal from "../modal";
import MultiSelect from "../multiSelect";
import {useAppDispatch} from "../../../../../core/store";
import {addDietPlan, addPrescription, removeDietPlan} from "../../slices/nutritionSlice";
import {useSelector} from "react-redux";

const dietFields = [
    {label: "Breakfast", name: "breakfast"},
    {label: "Lunch", name: "lunch"},
    {label: "Dinner", name: "dinner"},
    {label: "Snacks", name: "snacks"},
];

const RowPrescription = ({data}: { data: any }) => {
    const [formData, setFormData] = useState(data);

    const [isModalOpen, setIsModalOpen] = React.useState(false);


    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const dipatch = useAppDispatch();


    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handlePlanSubmit = (e: any) => {
        e.preventDefault();
        dipatch(addDietPlan({
            ...formData,
            id: Math.floor(Math.random() * 100),
        }));
    }

    const handleDelete = (e: any) => {
        dipatch(removeDietPlan(data.id));
        setIsModalOpen(false)
    }


    return (
        <>
            <Box sx={{padding: "1rem"}}>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Title> {data.title} </Title>
                    <IconButton aria-label="edit" onClick={handleOpenModal}>
                        <EditIcon fontSize="medium"/>
                    </IconButton>
                </Box>
                <Content>Breakfast: {data.breakfast}</Content>
                <Content>Lunch: {data.lunch} </Content><
                Content>Dinner: {data.dinner}</Content>
                <Content>Snacks: {data.snacks} </Content>
            </Box>

            {
                isModalOpen &&
                <Modal modalTitle={"Edit Diet Plan"} onClose={() => setIsModalOpen(false)}>
                    <div>
                        {dietFields.map((field) => (
                            <LabelWrapper key={field.name}>
                                {field.label}
                                <InputWrapper
                                    type="text"
                                    name={field.name}
                                    defaultValue={data[field.name]}
                                    variant="outlined"
                                />
                            </LabelWrapper>
                        ))}
                        <LabelWrapper>
                            Time
                            <MultiSelect/>
                        </LabelWrapper>

                        <StyledButton type="submit" onClick={handlePlanSubmit}>
                            Save
                        </StyledButton>
                        <StyledButton
                            sx={{
                                backgroundColor: "#FF0000",
                                color: "#FFFFFF",
                                marginLeft: "1rem"
                            }}
                            type="submit" onClick={handleDelete}>
                            Delete
                        </StyledButton>
                    </div>
                </Modal>
            }

        </>
    )
}

export default RowPrescription;
