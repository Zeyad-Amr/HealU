import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface IVitalsTableProps {
    vitals: Record<string, string | undefined>;
}

export default function VitalsTable({ vitals }: IVitalsTableProps) {

    return (
        <TableContainer component={Paper} sx={{ overflowY: "scroll", maxHeight: "12rem" }} >
            <Table aria-label="simple table" stickyHeader size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell>Blood Pressure</TableCell>
                        <TableCell >Respiration Rate</TableCell>
                        <TableCell >Heart Rate</TableCell>
                        <TableCell >Diabetic Test</TableCell>
                        <TableCell >SpO2</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                        key={"vitals"}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell >{vitals?.BloodPressure}</TableCell>
                        <TableCell >{vitals?.RespirationRate}</TableCell>
                        <TableCell >{vitals?.HeartRate}</TableCell>
                        <TableCell >{vitals?.DiabeticTest}</TableCell>
                        <TableCell >{vitals?.SPO2}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>

    );
}
