import './App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
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
import fetchCourses from "../functions/fetchCourses.js";
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

export default function Registration() {

    const [dept, setDept] = React.useState('');

    const handleDept = (event) => {
        setDept(event.target.value);
    };

    const [block, setBlock] = React.useState('');

    const handleBlock = (event) => {
        setBlock(event.target.value);
    };

    const [searchText, setSearchText] = useState('');

    const updateCourses = async () => {
        const asyncCourseList = await TestFetchCourses(searchText, block, dept);
        setCourseList(asyncCourseList)
        console.log(courseList)
    };

    const [courseList, setCourseList] = React.useState([{}]);

    function TestFetchCourses(search, blockNum, department) {
        if (department === 1) {
            return ([{ courseCode: 'CS101', courseName: 'Introduction to Computer Science', blockNum: 'B1', courseDescription: 'Fundamentals of computer science, including algorithms and data structures.', departmentID: 1, faculty_id: 21 },
            { courseCode: 'CS102', courseName: 'Data Structures', blockNum: 'B2', courseDescription: 'Introduction to data organization techniques for efficient data processing.', departmentID: 1, faculty_id: 21 },
            { courseCode: 'CS202', courseName: 'Computer Architecture', blockNum: 'B3', courseDescription: 'Introduction to computer hardware and low-level programming.', departmentID: 1, faculty_id: 21 }])
        }
        else if (department === 2) {
            return ([{ courseCode: 'MAT101', courseName: 'Calculus I', blockNum: 'B1', courseDescription: 'Introduction to differential and integral calculus.', departmentID: 2, faculty_id: 22 },
            { courseCode: 'MAT102', courseName: 'Linear Algebra', blockNum: 'B2', courseDescription: 'Introduction to vector spaces and matrix operations.', departmentID: 2, faculty_id: 22 }])
        }
        else if (department === 3) {
            return ([{ courseCode: 'PHY101', courseName: 'Physics I', blockNum: 'B1', courseDescription: 'Fundamentals of mechanics and thermodynamics.', departmentID: 3, faculty_id: 23 },
            { courseCode: 'PHY102', courseName: 'Physics II', blockNum: 'B2', courseDescription: 'Introduction to electricity and magnetism.', departmentID: 3, faculty_id: 23 },
            { courseCode: 'PHY201', courseName: 'Quantum Mechanics', blockNum: 'B3', courseDescription: 'Introduction to quantum theory.', departmentID: 3, faculty_id: 23 }])
        }
        else if (department === 4) {
            return ([{ courseCode: 'BIO201', courseName: 'Genetics', blockNum: 'B3', courseDescription: 'Introduction to Mendelian and molecular genetics.', departmentID: 4, faculty_id: 24 },
            { courseCode: 'BIO202', courseName: 'Microbiology', blockNum: 'B4', courseDescription: 'Study of microorganisms and their roles in the environment.', departmentID: 4, faculty_id: 24 }])
        }
        else if (department === 5) {
            return ([{ courseCode: 'CHE101', courseName: 'General Chemistry I', blockNum: 'B1', courseDescription: 'Fundamentals of chemistry including atomic theory and bonding.', departmentID: 5, faculty_id: 25 },
            { courseCode: 'CHE102', courseName: 'Organic Chemistry', blockNum: 'B2', courseDescription: 'Introduction to organic compounds and reactions.', departmentID: 5, faculty_id: 25 }])
        }
        else {
            return ([{ courseCode: 'CS101', courseName: 'Introduction to Computer Science', blockNum: 'B1', courseDescription: 'Fundamentals of computer science, including algorithms and data structures.', departmentID: 1, faculty_id: 21 },
            { courseCode: 'CS102', courseName: 'Data Structures', blockNum: 'B2', courseDescription: 'Introduction to data organization techniques for efficient data processing.', departmentID: 1, faculty_id: 21 },
            { courseCode: 'CS202', courseName: 'Computer Architecture', blockNum: 'B3', courseDescription: 'Introduction to computer hardware and low-level programming.', departmentID: 1, faculty_id: 21 },
            { courseCode: 'MAT101', courseName: 'Calculus I', blockNum: 'B1', courseDescription: 'Introduction to differential and integral calculus.', departmentID: 2, faculty_id: 22 },
            { courseCode: 'MAT102', courseName: 'Linear Algebra', blockNum: 'B2', courseDescription: 'Introduction to vector spaces and matrix operations.', departmentID: 2, faculty_id: 22 },
            { courseCode: 'PHY101', courseName: 'Physics I', blockNum: 'B1', courseDescription: 'Fundamentals of mechanics and thermodynamics.', departmentID: 3, faculty_id: 23 },
            { courseCode: 'PHY102', courseName: 'Physics II', blockNum: 'B2', courseDescription: 'Introduction to electricity and magnetism.', departmentID: 3, faculty_id: 23 },
            { courseCode: 'PHY201', courseName: 'Quantum Mechanics', blockNum: 'B3', courseDescription: 'Introduction to quantum theory.', departmentID: 3, faculty_id: 23 },
            { courseCode: 'BIO201', courseName: 'Genetics', blockNum: 'B3', courseDescription: 'Introduction to Mendelian and molecular genetics.', departmentID: 4, faculty_id: 24 },
            { courseCode: 'BIO202', courseName: 'Microbiology', blockNum: 'B4', courseDescription: 'Study of microorganisms and their roles in the environment.', departmentID: 4, faculty_id: 24 },
            { courseCode: 'CHE101', courseName: 'General Chemistry I', blockNum: 'B1', courseDescription: 'Fundamentals of chemistry including atomic theory and bonding.', departmentID: 5, faculty_id: 25 },
            { courseCode: 'CHE102', courseName: 'Organic Chemistry', blockNum: 'B2', courseDescription: 'Introduction to organic compounds and reactions.', departmentID: 5, faculty_id: 25 }])
        }
    }

    useEffect(() => {
        console.log(courseList);
    }, [courseList]);

    useEffect(() => {

    }, )

    const { userData, setUserData, isLogged, setIsLogged } = useGlobalState();
    console.log(userData + " " + isLogged);

    return (
        <>
            <div className='loginBack'>
                <Box component='section' sx={{ maxHeight: '95.5%', width: '100vw', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'end', position: "absolute", top: '25px', overflow: 'auto' }}>
                    <Typography variant='h3' component='div' sx={{ textAlign: 'Left', marginLeft: '48px' }}>Registration</Typography>
                    <br />
                    <Card sx={{ width: '950px', float: 'left', marginRight: "48px", marginLeft: '48px' }}>
                        <CardContent sx={{ justifyContent: 'space-between' }}>
                            <TextField
                                id="filled-search"
                                label="Search"
                                type="search"
                                variant="filled"
                                sx={{ width: '800px' }}
                                onChange={(event) => {
                                    setSearchText(event.target.value);
                                }}
                            />

                            <Button variant='contained' onClick={() => {
                                updateCourses()
                                console.log(courseList)
                            }

                            } sx={{ height: '8vmin', position: 'absolute', float: 'right', marginLeft: '12px', backgroundColor: '#7c2bb3' }}>Search</Button>
                            
                        </CardContent>
                    </Card>

                    <Card sx={{ width: '360px', float: 'right', marginRight: '30px' }}>
                        <CardContent >
                            <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
                                Filter Search
                            </Typography>
                            <FormControl sx={{ m: 1, minWidth: 80, width: "90%", display: 'flex', flexDirection: 'column' }}>
                                <InputLabel id="simple-select-label" >Dept.</InputLabel>
                                <Select
                                    labelId="simple-select-label"
                                    id="simple-select"
                                    value={dept}
                                    label="dept"
                                    onChange={handleDept}
                                >
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={null}>None</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={1}>COMPUTER SCIENCE</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={2}>MATH</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={3}>PHYSICS</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={4}>BIOLOGY</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={5}>CHEMISTY</MenuItem>
                                </Select>
                            </FormControl>
                            <br />
                            <FormControl sx={{ m: 1, minWidth: 80, width: "90%", display: 'flex', flexDirection: 'column' }}>

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
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={4}>Block 4</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={5}>Block 5</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={6}>Block 6</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={7}>Block 7</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={8}>Block 8</MenuItem>

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

                        {courseList.length > 0 ? (
                            courseList.map((course, index) => (
                                    <Item key={index} sx={{ height: '64px' }}>{course.courseCode}:{course.courseName} - {course.blockNum} - {course.courseDescription} <Button sx={{backgroundColor: 'black', color: 'white', float: 'right', height: '60px'}}>Register</Button></Item>
                            ))
                            
                        )
                            :
                            (<p>No Courses to Display.</p>)
                        }
                    </Stack>
                </Box>
            </div>
        </>
    );

};