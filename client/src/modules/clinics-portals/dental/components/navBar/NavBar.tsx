// NavBar.tsx

import { AppBar, Toolbar, IconButton, Button, Box, Stack } from "@mui/material";
import Logo from "../../imgs/NavBarlogo.png";
import styles from "./navBar.module.css";

const NavBar = () => {
  return (
    <AppBar position="static" className={styles.Bar}>
      <Toolbar className={styles.toolbar}>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <img src={Logo} alt="Logo" className={styles.logo} />
        </IconButton>
        <Stack direction="row" spacing={2} className={styles.buttonsStack}>
          <Button
            color="inherit"
            className={styles.button}
            onClick={() => console.log("Slots")}
          >
            Slots
          </Button>
          <Button
            color="inherit"
            className={styles.button}
            onClick={() => console.log("Logout")}
          >
            Logout
          </Button>
          <Button
            color="inherit"
            className={styles.button}
            onClick={() => console.log("Profile")}
          >
            Profile
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
