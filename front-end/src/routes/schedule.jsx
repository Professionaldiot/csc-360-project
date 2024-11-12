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
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();
    const { userData, setUserData, isLogged, setIsLogged } = useGlobalState();
    console.log(userData);

    const [userClasses, setUserClasses] = React.useState([]);
    
    React.useEffect(() => {
        const fetchClassList = async () => {
            const classList = await fetchSchedule(userData.userID)
            setUserClasses(classList)
        }
    fetchClassList()
    }, [userClasses, setUserClasses]);
    // console.log(userClasses);
    if (userData.user_type === "student") {
        // Show schedule page

        return(
            <>
                <div className="loginBack">
                    <Box
                        sx={{ justifyContent: 'space-evenly', alignItems: 'end',
                        position: "absolute", alignContent:'center',top:'10%', overflow: 'auto',maxWidth:'100%'}}>
                            <Stack spacing={2} sx={{ float: 'left', marginLeft: '48px', width: '200px', textAlign: 'left' }}>
                                {userClasses.length>0 ? (
                                    userClasses.map((course, index) => {
                                    
                                    return (
                                    <Item sx={{ height: '28px' }}>
                                        {course.courseName}:{course.blockNum}
                                    </Item>)
                                })) : (<p>die</p>)}
                            </Stack>
                    </Box>
                </div>
            </>
        )
    }



    else if (userData.user_type === "faculty") {
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
        navigate("/error");
    }
}