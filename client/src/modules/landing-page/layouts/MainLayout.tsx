import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";
import Footer from "../New/Footer/Footer";

const MainLayout = ({children} : any) => {
    return (
        <Box>
            {children}
            <Footer />
        </Box>
    );
};

export default MainLayout;
