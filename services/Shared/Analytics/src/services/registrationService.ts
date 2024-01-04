export const getNumberOfPatients = (users: any[]): number => {
    return users.filter((user: any) => user.role === 'Patient').length;
}

export const getNumberOfDoctors = (staff: any[]): number => {
    return staff.filter((user: any) => user.role === 'Doctor').length;
}