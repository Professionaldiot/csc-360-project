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


export default function Root() {
    return(
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
                <Link to={'courses'}><p>Courses</p></Link>
                </div>
                <div className='selfService-Header'>
                <Link to={'login'}><Avatar alt="Login" sx = {{width: 56, height: 56}}/></Link>
                </div>
                <div id='detail'>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}