import { Paper, Table, TableBody, TableCell, TableCellProps, TableContainer, TableHead, TableRow } from '@mui/material';

interface IVitalsTableProps {
    data: Record<string, string | undefined>;
    tableCellProps?: TableCellProps
    labels: Record<string, string>
}

export default function SingleTable({ data, tableCellProps, labels }: IVitalsTableProps) {

    let rowsData: { label: string; data: string | undefined; }[] = []
    const createData = (data: Record<string, string | undefined>) => {
        for (const key of Object.keys(data)) {
            rowsData.push({ label: labels[key], data: data[key] })
        }
    }
    createData(data)

    return (
        <TableContainer component={Paper} sx={{ overflowY: "scroll", maxHeight: "12rem" }} >
            <Table aria-label="simple table" stickyHeader size='small'>
                <TableHead>
                    <TableRow>
                        {rowsData.map((row: any, index) => (
                            <TableCell {...tableCellProps} key={index}>{row.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                        key={"vitals"}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        {rowsData.map((row: any, index) => (
                            <TableCell {...tableCellProps} key={index}>{row.data}</TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>

    );
}
