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
import fetchSchedule from "../functions/fetchSchedule.js";
import {UserContext} from "./root.jsx";

export default function Schedule() {
    let userT = "student";
    let userID = "1"
    const studentCourses = fetchSchedule(userID);
    console.log(userID);
    if (userT === "student") {
        // Show schedule page
        return (
            <>
                    <Box component='section'
                    sx={{ justifyContent: 'space-between', alignItems: 'end',
                    position: "absolute", left: '10%', top: '20%', overflow: 'auto' }}>
                    <div>
                        hello john
                    </div>    
                    </Box>
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