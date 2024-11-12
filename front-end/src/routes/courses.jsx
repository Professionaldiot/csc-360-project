import './App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { Card, CardActions, CardContent, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
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

function TestFetchCourses(search, blockNum, department) {
    if (department === 1) {
        return ([{ course_code: 'CS101', course_name: 'Introduction to Computer Science', block_num: 'B1', course_description: 'Fundamentals of computer science, including algorithms and data structures.', department_id: 1, faculty_id: 21 },
        { course_code: 'CS102', course_name: 'Data Structures', block_num: 'B2', course_description: 'Introduction to data organization techniques for efficient data processing.', department_id: 1, faculty_id: 21 },
        { course_code: 'CS202', course_name: 'Computer Architecture', block_num: 'B3', course_description: 'Introduction to computer hardware and low-level programming.', department_id: 1, faculty_id: 21 }])
    }
    else if (department === 2) {
        return ([{ course_code: 'MAT101', course_name: 'Calculus I', block_num: 'B1', course_description: 'Introduction to differential and integral calculus.', department_id: 2, faculty_id: 22 },
        { course_code: 'MAT102', course_name: 'Linear Algebra', block_num: 'B2', course_description: 'Introduction to vector spaces and matrix operations.', department_id: 2, faculty_id: 22 }])
    }
    else if (department === 3) {
        return ([{ course_code: 'PHY101', course_name: 'Physics I', block_num: 'B1', course_description: 'Fundamentals of mechanics and thermodynamics.', department_id: 3, faculty_id: 23 },
        { course_code: 'PHY102', course_name: 'Physics II', block_num: 'B2', course_description: 'Introduction to electricity and magnetism.', department_id: 3, faculty_id: 23 },
        { course_code: 'PHY201', course_name: 'Quantum Mechanics', block_num: 'B3', course_description: 'Introduction to quantum theory.', department_id: 3, faculty_id: 23 }])
    }
    else if (department === 4) {
        return ([{ course_code: 'BIO201', course_name: 'Genetics', block_num: 'B3', course_description: 'Introduction to Mendelian and molecular genetics.', department_id: 4, faculty_id: 24 },
        { course_code: 'BIO202', course_name: 'Microbiology', block_num: 'B4', course_description: 'Study of microorganisms and their roles in the environment.', department_id: 4, faculty_id: 24 }])
    }
    else if (department === 5) {
        return ([{ course_code: 'CHE101', course_name: 'General Chemistry I', block_num: 'B1', course_description: 'Fundamentals of chemistry including atomic theory and bonding.', department_id: 5, faculty_id: 25 },
        { course_code: 'CHE102', course_name: 'Organic Chemistry', block_num: 'B2', course_description: 'Introduction to organic compounds and reactions.', department_id: 5, faculty_id: 25 }])
    }
    else {
        return ([{ course_code: 'CS101', course_name: 'Introduction to Computer Science', block_num: 'B1', course_description: 'Fundamentals of computer science, including algorithms and data structures.', department_id: 1, faculty_id: 21 },
        { course_code: 'CS102', course_name: 'Data Structures', block_num: 'B2', course_description: 'Introduction to data organization techniques for efficient data processing.', department_id: 1, faculty_id: 21 },
        { course_code: 'CS202', course_name: 'Computer Architecture', block_num: 'B3', course_description: 'Introduction to computer hardware and low-level programming.', department_id: 1, faculty_id: 21 },
        { course_code: 'MAT101', course_name: 'Calculus I', block_num: 'B1', course_description: 'Introduction to differential and integral calculus.', department_id: 2, faculty_id: 22 },
        { course_code: 'MAT102', course_name: 'Linear Algebra', block_num: 'B2', course_description: 'Introduction to vector spaces and matrix operations.', department_id: 2, faculty_id: 22 },
        { course_code: 'PHY101', course_name: 'Physics I', block_num: 'B1', course_description: 'Fundamentals of mechanics and thermodynamics.', department_id: 3, faculty_id: 23 },
        { course_code: 'PHY102', course_name: 'Physics II', block_num: 'B2', course_description: 'Introduction to electricity and magnetism.', department_id: 3, faculty_id: 23 },
        { course_code: 'PHY201', course_name: 'Quantum Mechanics', block_num: 'B3', course_description: 'Introduction to quantum theory.', department_id: 3, faculty_id: 23 },
        { course_code: 'BIO201', course_name: 'Genetics', block_num: 'B3', course_description: 'Introduction to Mendelian and molecular genetics.', department_id: 4, faculty_id: 24 },
        { course_code: 'BIO202', course_name: 'Microbiology', block_num: 'B4', course_description: 'Study of microorganisms and their roles in the environment.', department_id: 4, faculty_id: 24 },
        { course_code: 'CHE101', course_name: 'General Chemistry I', block_num: 'B1', course_description: 'Fundamentals of chemistry including atomic theory and bonding.', department_id: 5, faculty_id: 25 },
        { course_code: 'CHE102', course_name: 'Organic Chemistry', block_num: 'B2', course_description: 'Introduction to organic compounds and reactions.', department_id: 5, faculty_id: 25 }])
    }
}

export default function Courses() {

    const [dept, setDept] = React.useState('');

    const [block, setBlock] = React.useState('');

    const [searchText, setSearchText] = useState('');

    const updateCourses = async () => {
        const asyncCourseList = await fetchCourses(searchText, block, dept);
        setCourseList(asyncCourseList)
        console.log(courseList)
    };

    const [courseList, setCourseList] = React.useState([]);

    useEffect(() => {
        console.log(courseList);
    }, [courseList]);

    const { userData, setUserData, isLogged, setIsLogged } = useGlobalState();
    console.log(userData + " " + isLogged);

    return (
        <>
            <div className='loginBack'>
                <Box component='section' sx={{ maxHeight: '95.5%', width: '100vw', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'end', position: "absolute", top: '25px', overflow: 'auto' }}>
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
                                    onChange={(event) => {
                                        setDept(event.target.value);
                                    }}
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
                                    onChange={(event) => {
                                        setBlock(event.target.value);
                                    }}
                                    autoWidth
                                >
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={null}>None</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={'B1'}>Block 1</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={'B2'}>Block 2</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={'B3'}>Block 3</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={'B4'}>Block 4</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={'B5'}>Block 5</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={'B6'}>Block 6</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={'B7'}>Block 7</MenuItem>
                                    <MenuItem sx={{ minWidth: 80, width: "90%", display: 'flex' }} value={'B8'}>Block 8</MenuItem>

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
                                <Item key={index} sx={{ height: '64px' }}>{course.courseCode}:{course.courseName} - {course.blockNum} - {course.courseDescription}</Item>
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