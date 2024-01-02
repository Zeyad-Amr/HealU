import {Outlet} from "react-router-dom";
import Footer from "../components/footer/footer";
import {Box} from "@mui/material";

const MainLayout = ({children} : any) => {
    return (
        <Box>
            {children}
            <Footer />
        </Box>
    );
};

export default MainLayout;
