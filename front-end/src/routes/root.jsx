import './App.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Outlet, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../functions/globalState';
import { Fragment } from 'react';

export default function Root() {
    const navigate = useNavigate();
    const { userData, setUserData, isLogged, setIsLogged } = useGlobalState();

    const ScheduleAndRegistration = () => {
        if (isLogged) {
            if (userData.userType === "student") {
                return (
                    <Fragment>
                        <Button onClick={() => { navigate("/schedule") }}>Schedule</Button>
                        <Button onClick={() => { navigate("/registration") }}>Registration</Button>
                    </Fragment>
                )
            } if (userData.userType === "faculty") {
                return (
                    <Fragment>
                        <Button onClick={() => { navigate("/schedule") }}>Schedule</Button>
                    </Fragment>
                )
            }
        }
    }
    
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
                    <ScheduleAndRegistration />
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