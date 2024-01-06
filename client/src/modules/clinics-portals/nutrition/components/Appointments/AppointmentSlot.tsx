import Box from "@mui/material/Box";
import {Grid, IconButton, Typography, useTheme} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const AppointmentSlot = ({time, name, onDeleteSlot, onClearSlot} : {
    time: string,
    name: string,
    onDeleteSlot: () => void,
    onClearSlot: () => void,
}) => {

    const theme = useTheme();

    return (
        <Box>

            <Grid
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "0.5rem",
                }}
            >
                <Grid item sx={{
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    borderRadius: 2,
                    padding: "0.7rem",
                    width: "10%",
                    textAlign: "center",
                    alignItems: "center",
                    color: theme.palette.common.white,
                }}>
                    <Typography>
                        {time}
                    </Typography>
                </Grid>


                <Grid item
                      sx={{
                          backgroundColor: theme.palette.grey[200],
                          borderRadius: 2,
                          padding: "0.7rem",
                          width: "80%",
                          alignItems: "center",
                      }}
                >
                    <Typography>
                        {name}
                    </Typography>
                </Grid>

                <Grid item
                      sx={{
                          borderRadius: 2,
                      }}
                >
                    <IconButton
                        sx={{
                            backgroundColor: theme.palette.grey[600],
                            color: theme.palette.common.white,
                            borderRadius: 1,
                            padding: "0.7rem",
                            height: "100%",
                            "&:hover": {
                                backgroundColor: theme.palette.grey[700],
                            },
                        }}
                        onClick={onClearSlot}
                    >
                        <CloseIcon/>
                    </IconButton>
                </Grid>

                <Grid item
                      sx={{
                          borderRadius: 2,
                          alignItems: "center",
                      }}
                >

                    <IconButton
                        sx={{
                            backgroundColor: theme.palette.error.main,
                            color: theme.palette.common.white,
                            borderRadius: 1,
                            padding: "0.7rem",
                            height: "100%",
                            "&:hover": {
                                backgroundColor: theme.palette.error.dark,
                            },
                        }}
                        onClick={onDeleteSlot}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </Grid>

            </Grid>

        </Box>
    )
};

export default AppointmentSlot;
