import PersonalDataBox from "./personalData/PersonalDataBox";
import { Stack } from "@mui/material";
import HistoryBox from "./historyBox/HistoryBox";


const PersonCard = () => {

  return (
    <Stack direction="row" spacing={1}>
      <PersonalDataBox />
      <HistoryBox />
    </Stack>
  );
};

export default PersonCard;
