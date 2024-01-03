import { Button, ButtonTypeMap, ExtendButtonBase, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Add, Upload } from '@mui/icons-material';
interface IDrugTableProps {
    tests: any[];
}

export default function TestsTable({ tests }: IDrugTableProps) {
    let rowsData: { name: any; action: any }[] = []
    const createData = (data: Record<string, string | number | undefined>[]) => {
        for (const item of data) {
            rowsData.push(
                {
                    name: item.TestDescription,
                    action:
                        <IconButton color='secondary' onClick={() => testBtnAction(item.TestID)} >
                            {item.TestID ?
                                <VisibilityIcon /> :
                                <Upload />
                            }
                        </IconButton>


                })
        }
    }
    const testBtnAction = (id: any) => {
        if (id) {
            // retrieve the test from the storage service
        } else {
            // browse to add test
        }
    }
    createData(tests)

    return (

        <TableContainer component={Paper} sx={{ overflowY: "scroll", maxHeight: "10rem" }} >
            <Table aria-label="simple table" stickyHeader size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell>Test Name</TableCell>
                        <TableCell ></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsData.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell >{row.name}</TableCell>
                            <TableCell align='right'>{row.action}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}
