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

    const [dept, setDept] = React.useState('');

    const handleDept = (event) => {
        setDept(event.target.value);
    };

    const [block, setBlock] = React.useState('');

    const handleBlock = (event) => {
        setBlock(event.target.value);
    };

    return (
        <>
            <div className='loginBack'>
                <Box component='section' sx={{maxHeight: '100%', width: '100vw', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'end', position: "absolute", top: '25px', overflow: 'auto' }}>
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
                    

                    <Card sx={{ width: '360px', float: 'right', marginRight: '30px'}}>
                        <CardContent >
                            <Typography variant="h5" component="div" sx={{ textAlign: "center"}}>
                                Filter Search
                            </Typography>
                            <FormControl sx={{ m: 1, minWidth: 80, width: "90%", display: 'flex', flexDirection: 'column'}}>
                                <InputLabel id="simple-select-label" >Dept.</InputLabel>
                                <Select
                                    labelId="simple-select-label"
                                    id="simple-select"
                                    value={dept}
                                    label="dept"
                                    onChange={handleDept}

                                >
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={null}>None</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={"csc"}>COMPUTER SCIENCE</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={"phys"}>PHYSICS</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={"math"}>MATH</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={"bio"}>BIOLOGY</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={"chem"}>CHEMISTY</MenuItem>
                                </Select>
                            </FormControl>
                            <br />
                            <FormControl sx={{ m: 1, minWidth: 80, width: "90%", display: 'flex', flexDirection: 'column'}}>
                                
                                <InputLabel id="simple-select-label">Block</InputLabel>
                                <Select
                                    labelId="simple-select-label"
                                    id="simple-select"
                                    value={block}
                                    label="block"
                                    onChange={handleBlock}
                                    autoWidth
                                >
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={null}>None</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={1}>Block 1</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={2}>Block 2</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={3}>Block 3</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={1}>Block 4</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={2}>Block 5</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={3}>Block 6</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={1}>Block 7</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={2}>Block 8</MenuItem>
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