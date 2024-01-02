import PersonalDataBox from "./personalData/PersonalDataBox";
import { Stack } from "@mui/material";
import HistoryBox from "./historyBox/HistoryBox";
import styles from "../examination.module.css";

const PersonCard = () => {
  return (
    <Stack direction="row" spacing={1.5} className={styles.container}>
      <PersonalDataBox />
      <HistoryBox />
    </Stack>
  );
};

export default PersonCard;
