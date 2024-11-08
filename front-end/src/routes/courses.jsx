import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, FormHelperText } from '@mui/material';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { Card, CardActions, CardContent, Typography } from '@mui/material';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import Avatar from '@mui/material/Avatar';
import { Outlet, Link } from 'react-router-dom'
import Menu from '@mui/material/Menu';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { positions } from '@mui/system';

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

    const [age, setAge] = React.useState('');

    const handleChange = (prop) => (event) => {
        setAge(event.target.value);
    };

    return (
        <>
            <div className='loginBack'>
                <Box component='section' sx={{ justifyContent: 'space-between', alignItems: 'end', position: "absolute", top: '25px', overflow: 'auto' }}>
                    <Typography variant='h3' component='div' sx={{ textAlign: 'Left', marginLeft: '48px' }}>Courses</Typography>
                    <br />
                    <Card sx={{ width: '950px', float: 'left', marginRight: "48px", marginLeft: '48px' }}>
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
                        <CardContent >
                            <Typography variant="h5" component="div" sx={{ textAlign: "center",}}>
                                Filter Search
                            </Typography>
                            <FormControl sx={{ m: 1, minWidth: 80, width: "90%", display: 'flex', flexDirection: 'column', spacing: '3' }}>
                                <InputLabel id="simple-select-label" >Age</InputLabel>
                                <Select
                                    labelId="simple-select-label"
                                    id="simple-select"
                                    value={age}
                                    label="Age"
                                    onChange={handleChange}

                                >
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={10}>Ten</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={20}>Twenty</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 80, width: "90%", display: 'flex', flexDirection: 'column', spacing: '3', textAlign: 'justify' }}>
                                <br />
                                <InputLabel id="simple-select-label">Age2</InputLabel>
                                <Select
                                    labelId="simple-select-label"
                                    id="simple-select"
                                    value={age}
                                    label="Age"
                                    onChange={handleChange}
                                    autoWidth
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </CardContent>
                    </Card>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <Stack spacing={2} sx={{ float: 'left', marginLeft: '48px', width: '950px', textAlign: 'left' }}>
                        <Item sx={{ height: '64px' }}>Thing 1</Item>
                        <Item sx={{ height: '64px' }}>Thing 2</Item>
                        <Item sx={{ height: '64px' }}>Secret Third Thing</Item>
                        <Item sx={{ height: '64px' }}>Thing 1</Item>
                        <Item sx={{ height: '64px' }}>Thing 2</Item>
                        <Item sx={{ height: '64px' }}>Secret Third Thing</Item>
                        <Item sx={{ height: '64px' }}>Thing 1</Item>
                        <Item sx={{ height: '64px' }}>Thing 2</Item>
                        <Item sx={{ height: '64px' }}>Secret Third Thing</Item>
                    </Stack>
                </Box>
            </div>

        </>
    );
};