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
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

export default function Courses() {
    return(
        <>
            <div className='loginBack'>
                <Box component='section' sx={{ justifyContent: 'space-between', alignItems: 'end', position: "absolute", top: '25px' }}>
                    <Typography variant='h3' component='div' sx={{ textAlign: 'Left', marginLeft: '48px' }}>Courses</Typography>
                    <br/>
                    <Card sx={{ width: '950px', float: 'left', marginRight: "48px", marginLeft: '48px'}}>
                        <CardContent sx={{ justifyContent: 'space-between' }}>
                            <TextField
                                id="filled-search"
                                label="Search"
                                type="search"
                                variant="filled"
                                sx={{ width: '800px' }}
                            />
                            <Button variant='contained' sx={{ height: '8vmin', position: 'absolute', float: 'right', marginLeft: '12px', backgroundColor: '#7c2bb3' }}>Search</Button>
                        </CardContent>
                    </Card>

                    <Card sx={{ width: '360px', float: 'right' }}>
                        <CardContent>
                            <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
                                Filter Search
                            </Typography>

                        </CardContent>
                    </Card>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <Stack spacing={2} sx={{ float: 'left', marginLeft: '48px', width: '950px' }}>
                        <Item sx={{ height: '64px'  }}>Thing 1</Item>
                        <Item sx={{ height: '64px'  }}>Thing 2</Item>
                        <Item sx={{ height: '64px'  }}>Secret Third Thing</Item>
                    </Stack>
                </Box>
            </div>

        </>
    );
};