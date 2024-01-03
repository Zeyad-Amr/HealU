import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface IDrugTableProps {
    drugs: any[];
}

export default function DrugTable({ drugs }: IDrugTableProps) {

    return (

        <TableContainer component={Paper} sx={{ overflowY: "scroll", maxHeight: "8rem" }} >
            <Table aria-label="simple table" stickyHeader size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell>Drug Name</TableCell>
                        <TableCell >Dose</TableCell>
                        <TableCell >Duration</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {drugs.map((row) => (
                        <TableRow
                            key={row.DrugName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.DrugName}
                            </TableCell>
                            <TableCell >{row.DrugDose}</TableCell>
                            <TableCell >{row.DrugDuration}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}
