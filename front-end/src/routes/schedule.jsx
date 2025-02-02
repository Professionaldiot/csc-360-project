
import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
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
    }, []);
    // console.log(userClasses);
    if (userData.userType === "student") {
        // Show schedule page

        return (
            <>
                <div className="loginBack">
                    <Box
                        sx={{
                            justifyContent: 'space-evenly', alignItems: 'end',
                            position: "absolute", alignContent: 'center', top: '10%', overflow: 'auto', maxWidth: '100%'
                        }}>
                        <Stack spacing={2} sx={{ float: 'left', marginLeft: '48px', width: '200px', textAlign: 'left' }}>
                            {userClasses.length > 0 ? (
                                userClasses.map((course, index) => {

                                    return (
                                        <Item key={index} sx={{ height: '28px' }}>
                                            {course.courseName}:{course.blockNum}
                                        </Item>)
                                })) : (<p>Loading schedule...</p>)}
                        </Stack>
                    </Box>
                </div>
            </>
        )
    }
    else {
        // How did you get here?
        navigate("/login");
    }
}
