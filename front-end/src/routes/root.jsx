import './App.css';
import * as React from 'react';
import { useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../functions/globalState';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
/*
const ShowForUser = (role) => {
    const navigate = useNavigate();
    if (role === "student" || role === "faculty") {
        return(
            <Button onClick={() => {navigate("/schedule")}}>Schedule</Button>
        )
    } else return(null)
}
    */



export default function Root() {
    const navigate = useNavigate();
    const { userData, setUserData, isLogged, setIsLogged } = useGlobalState();

    function checkLogged() {
        if (isLogged) {
            return 'schedule'
        } 
        else {
            return 'login'
        }
    }
    if (isLogged) {
        return (
            <>
                {/*Header business here*/}
                <div className='headContainer'>
                    <div className='selfService-Header'>
                        <img
                            //cornell logo
                            src={"https://www.cornellcollege.edu/assets/production/images/cornell_logo_white.png"}
                            className="cornell-logo"
                            alt="logo" />
                    </div>
                    <div className='subHeader'>
                        <Button onClick={() => { navigate("/courses") }}>Courses</Button>
                        <Button onClick={() => { navigate("/schedule") }}>Schedule</Button>
                        <Button onClick={() => { navigate("/registration") }}>Registration</Button>
                    </div>
                    <div className='selfService-Header'>
                        <Link to={'schedule'}><Avatar alt="Schedule" sx={{ width: 56, height: 56 }} /></Link>
                    </div>
                    <div id='detail'>
                        <Outlet />
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                {/*Header business here*/}
                <div className='headContainer'>
                    <div className='selfService-Header'>
                        <img
                            //cornell logo
                            src={"https://www.cornellcollege.edu/assets/production/images/cornell_logo_white.png"}
                            className="cornell-logo"
                            alt="logo" />
                    </div>
                    <div className='subHeader'>
                        <Button onClick={() => { navigate("/courses") }}>Courses</Button>
                    </div>
                    <div className='selfService-Header'>
                        <Link to={'login'}><Avatar alt="Login" sx={{ width: 56, height: 56 }} /></Link>
                    </div>
                    <div id='detail'>
                        <Outlet />
                    </div>
                </div>
            </>
        )
    }
}