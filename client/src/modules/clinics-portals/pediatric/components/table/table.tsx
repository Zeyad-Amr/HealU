import React from 'react';
import './table.css';

const ScheduleTable = (props:any) => { 
    return (    
        <>
            <div className='Container'>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">email</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((item: any) => (
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.name} {item.lastName}</td>
                            <td>{item.age}</td>
                            <td>{item.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            
        </>
    );
}

export default ScheduleTable;