import React, { FC } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Link as ScrollLink } from 'react-scroll'
import StyledButton from "../styledButton/StyledButton";
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface Exp {
    label: string
    value: string
}
interface ExpItemProps {
    item: Exp
}

const exps: Array<Exp> = [
    {
        label: 'Patients',
        value: '10K+',
    },
    {
        label: 'Clinics',
        value: '7+',
    },
    {
        label: 'Doctors',
        value: '10+',
    },
    {
        label: 'Services',
        value: '240+',
    },
]

const ExpItem: FC<ExpItemProps> = ({ item }) => {
    const { value, label } = item
    return (
        <Box sx={{ textAlign: 'center', mb: { xs: 1, md: 0 } }}>
            <Typography
                sx={{ color: 'secondary.main', mb: { xs: 1, md: 2 }, fontSize: { xs: 34, md: 44 }, fontWeight: 'bold' }}
            >
                {value}
            </Typography>
            <Typography color="text.secondary" variant="h5">
                {label}
            </Typography>
        </Box>
    )
}

const HomeHero: FC = () => {
    return (
        <Box id="hero" sx={{ backgroundColor: 'background.paper', position: 'relative', pt: 4, pb: { xs: 8, md: 10 } }}>
            <Container maxWidth="lg">
                <Grid container spacing={0} sx={{ flexDirection: { xs: 'column', md: 'unset' } }}>
                    <Grid item xs={12} md={7}>
                        <Box
                            sx={{
                                textAlign: { xs: 'center', md: 'left' },
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    component="h2"
                                    sx={{
                                        position: 'relative',
                                        fontSize: { xs: 40, md: 72 },
                                        letterSpacing: 1.5,
                                        fontWeight: 'bold',
                                        lineHeight: 1.3,
                                    }}
                                >
                                    <Typography
                                        component="mark"
                                        sx={{
                                            position: 'relative',
                                            color: 'primary.main',
                                            fontSize: 'inherit',
                                            fontWeight: 'inherit',
                                            backgroundColor: 'unset',
                                        }}
                                    >
                                        Complete
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: { xs: 24, md: 34 },
                                                left: 2,
                                                transform: 'rotate(3deg)',
                                                '& img': { width: { xs: 146, md: 210 }, height: 'auto' },
                                            }}
                                        >
                                            {/* eslint-disable-next-line */}
                                            <img src="/images/headline-curve.svg" alt="Headline curve" />
                                        </Box>
                                    </Typography>
                                    {' '}
                                    <Typography
                                        component="span"
                                        sx={{
                                            fontSize: 'inherit',
                                            fontWeight: 'inherit',
                                            position: 'relative',
                                            '& svg': {
                                                position: 'absolute',
                                                top: -16,
                                                right: -21,
                                                width: { xs: 22, md: 30 },
                                                height: 'auto',
                                            },
                                        }}
                                    >
                                        Care
                                        <svg version="1.1" viewBox="0 0 3183 3072">
                                            <g id="Layer_x0020_1">
                                                <path
                                                    fill="#127C71"
                                                    d="M2600 224c0,0 0,0 0,0 236,198 259,562 52,809 -254,303 -1849,2089 -2221,1776 -301,-190 917,-1964 1363,-2496 207,-247 570,-287 806,-89z"
                                                />
                                                <path
                                                    fill="#127C71"
                                                    d="M3166 2190c0,0 0,0 0,0 64,210 -58,443 -270,516 -260,90 -1848,585 -1948,252 -104,-230 1262,-860 1718,-1018 212,-73 437,39 500,250z"
                                                />
                                                <path
                                                    fill="#127C71"
                                                    d="M566 3c0,0 0,0 0,0 -219,-26 -427,134 -462,356 -44,271 -255,1921 90,1962 245,62 628,-1392 704,-1869 36,-221 -114,-424 -332,-449z"
                                                />
                                            </g>
                                        </svg>
                                    </Typography>{' '}
                                    <br />
                                    Starts Here
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 4, width: { xs: '100%', md: '70%' } }}>
                                <Typography sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                    {
                                        "Let's take an online course to improve your skills in a different way, you can set your own study time according to your learning speed. So you san study comfortable and absorb tge material easily."
                                    }
                                </Typography>
                            </Box>
                            <Box sx={{ '& button': { mr: 2 } }}>
                                <ScrollLink to="popular-course" spy={true} smooth={true} offset={0} duration={350}>
                                    <StyledButton color="primary" size="large" variant="contained">
                                        Book your appointment
                                    </StyledButton>
                                </ScrollLink>
                                <ScrollLink to="video-section" spy={true} smooth={true} offset={0} duration={350}>
                                    <StyledButton color="primary" size="large" variant="outlined" startIcon={<MoreHorizIcon />}>
                                        Know more
                                    </StyledButton>
                                </ScrollLink>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5} sx={{ position: 'relative' }}>
                        {/* Sertificate badge */}
                        <Box sx={{ lineHeight: 0 }}>
                            {/*<img src="/images/healcare.png" style={{ width: '775px', height: '787px' }} alt="Hero img" />*/}
                        </Box>
                    </Grid>
                </Grid>

                {/* Experience */}
                <Box sx={{ boxShadow: 2, py: 4, px: 7, borderRadius: 4 }}>
                    <Grid container spacing={2}>
                        {exps.map((item) => (
                            <Grid key={item.value} item xs={12} md={3}>
                                <ExpItem item={item} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}

export default HomeHero
