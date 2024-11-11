import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { circularProgressClasses, createTheme, FormHelperText } from '@mui/material';
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
import fetchSchedule from "../functions/fetchSchedule.js";
import { useGlobalState } from '../functions/globalState.js';

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

export default function Schedule() {
    
    const { userData, setUserData, isLogged, setIsLogged } = useGlobalState();
    console.log(userData);
    let classes = [];
    classes.push({courseCode: 'BIO101', courseName: 'Introduction to Biology',blockNum:'B1',courseYear:'2024'});
    classes.push({courseCode: 'BIO102', courseName: 'Ecology',blockNum:'B2',courseYear:'2024'});
    classes.push({courseCode: 'BIO201', courseName: 'Genetics',blockNum:'B3',courseYear:'2025'});
    classes.push({courseCode: 'BIO202', courseName: 'Mirobiology',blockNum:'B4',courseYear:'2025'});
    console.log(classes);
    let userT = "student";
    let userID = "1"
    const [studentCourses, setStudentCourses] = React.useState(null);
    React.useEffect(() => {setStudentCourses(fetchSchedule(userID))},[]);
    console.log(studentCourses);
    console.log(userID);
    if (userT === "student") {
        // Show schedule page

        return (
            <>
                <div className="loginBack">
                    <Box
                        sx={{ justifyContent: 'space-around', alignItems: 'end',
                        position: "absolute", alignContent:'center',top:'10%', overflow: 'auto' }}>
                            <Stack spacing={2} sx={{ float: 'left', marginLeft: '48px', width: '200px', textAlign: 'left' }}>
                                <Item sx={{ height: '28px' }}>{classes[0].courseCode + ": " + classes[0].blockNum}</Item>
                                <Item sx={{ height: '28px' }}>{classes[1].courseCode + ": " + classes[1].blockNum}</Item>
                                <Item sx={{ height: '28px' }}>{classes[2].courseCode + ": " + classes[2].blockNum}</Item>
                                <Item sx={{ height: '28px' }}>{classes[3].courseCode + ": " + classes[3].blockNum}</Item>
                            </Stack>
                    </Box>
                </div>
            </>
        )
    }
    else if (userT === "faculty") {
        // Show schedule page
        return (
            <>
                    <Box component='section'
                    sx={{ justifyContent: 'space-between', alignItems: 'end',
                    position: "absolute", left: '10%', top: '20%', overflow: 'auto' }}>
                        Hello Ajit
                    </Box>
            </>
        )
    }
    else {
        // How did you get here?
        return (
            <>
                    <Box component='section'
                    sx={{ justifyContent: 'space-between', alignItems: 'end',
                    position: "absolute", left: '10%', top: '20%', overflow: 'auto' }}>
                        You shouldn't be here
                    </Box>
            </>
        )
    }
}