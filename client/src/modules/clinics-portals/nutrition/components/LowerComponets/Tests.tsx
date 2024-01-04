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
import RowTests from "./RowTests";
import {useAppDispatch} from "../../../../../core/store";
import {addTest} from "../../slices/nutritionSlice";
import {useSelector} from "react-redux";

const TestsData = [
    {value: "CBC", label: "CBC Test"},
    {value: "Vitamin-D", label: "Vitamin-D Test"},
];

const initialData = {}

const Tests = () => {

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

    const dipatch = useAppDispatch();


    const handleTestSubmit = (e: any) => {
        e.preventDefault();
        dipatch(addTest({
            ...selectedOptions,
            id: Math.floor(Math.random() * 100),
        }));
    }

    const {
        currentPatient: {tests}
    } = useSelector((state: any) => state.nutrition);

    return <>
        <LowerComponent title={"Tests"}>
            <div>
                <Dropdown options={TestsData}
                          selectedOptions={selectedOptions}
                          optionChangeHandler={handleOptionChange}
                          optionDeleteHandler={handleDeleteOption}
                />

                <StyledButton type="submit" onClick={handleTestSubmit}>
                    Save
                </StyledButton>
            </div>
        </LowerComponent>

        {
            tests.length > 0 &&
            <Box>
                <Card sx={{
                    borderRadius: "0 0 1rem 1rem "
                }}>
                    <Box sx={{padding: "1rem"}}>
                        {
                            tests.map((test: any) => (
                                <RowTests props={test}/>
                            ))
                        }
                    </Box>
                </Card>
            </Box>
        }
    </>
};

export default Tests;
