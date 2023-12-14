import React from 'react';


const ScheduleTable = (Props) => { 
    return (    
        <>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">email</th>
                    </tr>
                </thead>
                <tbody>
                    {Props.data.map((item: any) => (
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.name} {item.lastName}</td>
                            <td>{item.age}</td>
                            <td>{item.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default ScheduleTable;