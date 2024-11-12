import './App.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Outlet, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../functions/globalState';

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