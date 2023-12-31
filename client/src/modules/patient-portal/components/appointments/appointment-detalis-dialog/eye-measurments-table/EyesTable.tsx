import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface IEyesTableProps {
    eyeMeasurements: Record<string, string | undefined>;
}

export default function EyesTable({ eyeMeasurements }: IEyesTableProps) {

    return (

        <TableContainer component={Paper} sx={{ overflowY: "scroll", maxHeight: "12rem" }} >
            <Table aria-label="simple table" stickyHeader size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell>Left Eye</TableCell>
                        <TableCell >Right Eye</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                        key={"eye-measurements"}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell >{eyeMeasurements?.LeftEye}</TableCell>
                        <TableCell >{eyeMeasurements?.RightEye}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>

    );
}
