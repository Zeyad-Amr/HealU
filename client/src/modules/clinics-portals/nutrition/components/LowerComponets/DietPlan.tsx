import LowerComponent from "../LowerComponent";
import MultiSelect from "../multiSelect";
import React, {useState} from "react";
import {LabelWrapper, InputWrapper, StyledButton, Title, Content} from "./shared";
import {Card} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import RowPrescription from "./RowPrescription";
import RowDietPlan from "./RowDietPlan";
import {useAppDispatch} from "../../../../../core/store";
import {addDietPlan} from "../../slices/nutritionSlice";
import {useSelector} from "react-redux";

const dietFields = [
    {label: "Title", name: "title"},
    {label: "Breakfast", name: "breakfast"},
    {label: "Lunch", name: "lunch"},
    {label: "Dinner", name: "dinner"},
    {label: "Snacks", name: "snacks"},
];
const initialDietData: { [key: string]: string } = {
    title: "Diet Plan 1",
    breakfast: "Brown Toast with low fat cheese",
    lunch: "Seafood",
    dinner: "Youghurt",
    snacks: "Apple",
};

const DietPlans = () => {

    const [formData, setFormData] = useState(initialDietData);
    const dipatch = useAppDispatch();


    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleDietPlanSubmit = (e: any) => {
        e.preventDefault();
        dipatch(addDietPlan({
            ...formData,
            id: Math.floor(Math.random() * 100),
        }));
    }
    const {
        currentPatient: {dietPlans}
    } = useSelector((state: any) => state.nutrition);


    return <>
        <LowerComponent title={"Diet Plans"}>
            <div>
                {dietFields.map((field: any) => (
                    <LabelWrapper key={field.name}>
                        {field.label}
                        <InputWrapper
                            type="text"
                            name={field.name}
                            defaultValue={initialDietData[field.name]}
                            variant="outlined"
                        />
                    </LabelWrapper>
                ))}
                <StyledButton type="submit" onClick={handleDietPlanSubmit}>
                    Save
                </StyledButton>
            </div>
        </LowerComponent>

        {
            dietPlans.length > 0 &&
            <Box>
                <Card sx={{
                    borderRadius: "0 0 1rem 1rem "
                }}>
                    <Box sx={{padding: "1rem"}}>
                        {
                            dietPlans.map((plan: any) => (
                                <RowDietPlan data={plan}/>
                            ))
                        }
                    </Box>
                </Card>
            </Box>
        }
    </>
};

export default DietPlans;
