import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import IconButton, { iconButtonClasses } from '@mui/material/IconButton'
import ArrowForward from '@mui/icons-material/ArrowForward'

interface Course {
    id: number | string
    title: string
    cover: string
    rating: number
    ratingCount: number
    price: number
    category: string
}


interface Props {
    item: Course
}

const ServiceCardItem: FC<Props> = ({ item }) => {
    return (
        <Box
            sx={{
                px: 1,
                py: 4,
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
                        [`& .${iconButtonClasses.root}`]: {
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            boxShadow: 2,
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        lineHeight: 0,
                        overflow: 'hidden',
                        borderRadius: 3,
                        mb: 2,
                    }}
                >
                    <img src={item.cover} style={{width: "100px", height:"auto"}} alt={'Course ' + item.id} />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography component="h2" variant="h5" sx={{ mb: 2, height: 56, overflow: 'hidden', fontSize: '1.2rem' }}>
                        {item.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating name="rating-course" value={item.rating} max={5} sx={{ color: '#ffce31', mr: 1 }} readOnly />
                        <Typography component="span" variant="h5">
                            ({item.ratingCount})
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h5" color="primary.main">
                            {'$' + item.price}
                        </Typography>
                        <Typography variant="h6">/ course</Typography>
                    </Box>
                    <IconButton
                        color="primary"
                        sx={{ '&:hover': { backgroundColor: 'primary.main', color: 'primary.contrastText' } }}
                    >
                        <ArrowForward />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default ServiceCardItem
