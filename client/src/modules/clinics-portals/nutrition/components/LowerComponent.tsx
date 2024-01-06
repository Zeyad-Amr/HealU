import {Grid, IconButton, Container, Card, Box, TextField, Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import MultiSelect from "./multiSelect";
import {styled, Theme} from "@mui/material/styles";
import Modal from "./modal";




const LowerComponent = ({title, children}: { title: string, children: any }) => {
    const [openModal, setOpenModal] = useState(false);
    const [cardVisible, setCardVisible] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    return (
        <Box>
            <Card sx={{
                backgroundColor: "#BDBDBD",
                borderRadius: "1rem 1rem 0 0",
                padding: "0.5rem",
                boxSizing: "border-box",
                width: "100%",
            }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Grid
                        sx={{
                            width: "70%",
                        }}
                    >
                        <Typography sx={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            color: "#333333",
                            marginBottom: "1rem",
                            width: "50%",
                        }}>{title}</Typography>

                    </Grid>

                    <Grid>
                        <IconButton
                            sx={{color: "black", border: 2}}
                            onClick={handleOpenModal}
                        >
                            <AddIcon/>
                        </IconButton>
                        {/*{openModal && renderModal()}*/}
                    </Grid>

                    {
                        openModal &&
                        <Modal onClose={handleCloseModal} modalTitle={`Add ${title}`}>
                            {children}
                        </Modal>
                    }
                </Box>
            </Card>
        </Box>
    )
}

export default LowerComponent;
