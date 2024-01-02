import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Mentor } from '../../interfaces/mentor'

interface Props {
    item: Mentor
}

const DoctorCardItem: FC<Props> = ({ item }) => {
    return (
        <Box
            sx={{
                px: 1.5,
                py: 5,
            }}
        >
            <Box
                sx={{
                    p: 2,
                    backgroundColor: 'background.paper',
                    borderRadius: 4,
                    transition: (theme) => theme.transitions.create(['box-shadow']),
                    '&:hover': {
                        boxShadow: 2,
                    },
                }}
            >
                <Box
                    sx={{
                        lineHeight: 0,
                        overflow: 'hidden',
                        borderRadius: 3,
                        height: 200,
                        mb: 2,
                    }}
                >
                    <img src={item.photo as string}  style={{ width: '570px', height: '427px', objectFit: 'cover' }} alt={'Mentor ' + item.id} />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography component="h2" variant="h4" sx={{ fontSize: '1.4rem' }}>
                        {item.name}
                    </Typography>
                    <Typography sx={{ mb: 2, color: 'text.secondary' }}>{item.category}</Typography>
                    <Typography sx={{ mb: 2, color: 'text.secondary' }} variant="subtitle1">
                        {item.description}
                    </Typography>
                    <Box sx={{ '& img': { height: 26 } }}>
                        {/* eslint-disable-next-line */}
                        <img src={item.company?.logo} alt={item.company?.name + ' logo'} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default DoctorCardItem
