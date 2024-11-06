import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, FormHelperText } from '@mui/material';
import FormControl, {useFormControl} from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { Card, CardActions, CardContent, Typography } from '@mui/material';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import Avatar from '@mui/material/Avatar';
import { Outlet, Link } from 'react-router-dom'
import Menu from '@mui/material/Menu';

export default function Courses() {
    return(
        <>
            <div className='loginBack'>
                <Box component='section' sx={{ justifyContent: 'space-between', alignItems: 'end', position: "absolute", top: '25px' }}>
                    <Typography variant='h3' component='div' sx={{ textAlign: 'Left', marginLeft: '48px' }}>Courses</Typography>
                    <br/>
                    <Card sx={{ width: '1000px', float: 'left', marginRight: "48px", marginLeft: '48px'}}>
                        <CardContent sx={{ justifyContent: 'space-between' }}>
                            <TextField
                                id="filled-search"
                                label="Search"
                                type="search"
                                variant="filled"
                                sx={{ width: '80%' }}
                            />
                            <Button variant='outlined' sx={{ height: '8vmin', position: 'absolute', float: 'right' }}>Search</Button>
                        </CardContent>
                    </Card>

                    <Card sx={{ width: '360px', float: 'right' }}>
                        <CardContent>
                            <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
                                Filter Search
                            </Typography>
                            
                        </CardContent>
                    </Card>
                </Box>
            </div>

        </>
    );
};