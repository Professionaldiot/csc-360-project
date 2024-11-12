

async function fetchRegister(studentID, entryID) {
    try{
        const url = "http://10.101.128.56:5000/register"
        const req = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "studentID": studentID,
                "entryID": entryID,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res = await req.json()
        console.log(res.message)
        return res.message
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export default fetchRegister;