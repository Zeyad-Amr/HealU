import React from 'react'
import PersonalDataBox from "./personalData/PersonalDataBox";
import { Stack } from '@mui/material';
import HistoryBox from './historyBox/HistoryBox';
const PersonCard = () => {
  return (
    <Stack direction='row' spacing={2} style={{ width: '100%' }}>
      <PersonalDataBox name='john doe' weight={90} length={195} age={43}/>
      <HistoryBox/>
    </Stack>
  )
}

export default PersonCard