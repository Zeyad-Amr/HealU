import React, { useEffect, useState } from "react";
import axios from "axios";

interface TableColumn {
    key: string;
    header: string;
}

interface TableProps {
    columns: TableColumn[];
    apiUrl: string;
}

function Table({ columns, apiUrl }: TableProps) {
    // Define the user interface based on the columns
    interface User {
        [key: string]: string;
    }

    //  for storing data from api
    const [data, setData] = useState<User[]>([]);

    //  for fetching data from api
    useEffect(() => {
        axios
            .get(apiUrl)
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
            .catch((err) => console.log(err));
    }, [apiUrl]);

    return (
        <div className="container">
            <div className="mt-3">
                <table>
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index}>{column.header}</th>
                            ))}
                        </tr>
                    </thead>
                    {/* map the attributes in the table row */}
                    <tbody>
                        {data.map((rowData, index) => (
                            <tr key={index}>
                                {columns.map((column, columnIndex) => (
                                    <td key={columnIndex}>
                                        {rowData[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
