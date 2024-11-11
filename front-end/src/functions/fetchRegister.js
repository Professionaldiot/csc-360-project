

async function fetchRegister(studentID, courseID) {
    try{
        const url = "http://10.101.128.56:5000/register"
        const req = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "studentID": studentID,
                "courseCode": courseID,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res = await req.json()
        console.log(res)
        return res
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export default fetchRegister;