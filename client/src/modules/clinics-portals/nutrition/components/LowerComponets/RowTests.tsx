import Box from "@mui/material/Box";
import {Content, InputWrapper, LabelWrapper, StyledButton, Title} from "./shared";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import Modal from "../modal";
import MultiSelect from "../multiSelect";
import Dropdown from "../dropDown";
import {useAppDispatch} from "../../../../../core/store";
import {removeTest} from "../../slices/nutritionSlice";

const testsData = [
    {value: "CBC", label: "CBC Test"},
    {value: "Vitamin-D", label: "Vitamin-D Test"},
];


const RowTests = (props :any) => {

    let {id, name} = props.props
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const dispatch = useAppDispatch();



    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleTestsSubmit = (e: any) => {
        e.preventDefault();
        console.log("prescription edited");
    }

    const handleDelete = (e : any) => {
        e.preventDefault();
        dispatch(removeTest(id));
        setIsModalOpen(false)
    }

    return (
        <>
            <Box sx={{padding: "1rem"}}>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Title> {name} </Title>
                    <IconButton aria-label="edit" onClick={handleOpenModal}>
                        <EditIcon fontSize="medium"/>
                    </IconButton>
                </Box>
            </Box>

            {
                isModalOpen &&
                <Modal modalTitle={"Edit Test"} onClose={() => setIsModalOpen(false)}>
                    <div>
                        <Dropdown options={testsData}/>

                        <StyledButton type="submit" onClick={handleTestsSubmit}>
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


export default RowTests;
