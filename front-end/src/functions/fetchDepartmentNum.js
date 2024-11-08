

async function fetchDepartments() {
    try {
        const url = "10.101.128.56:5000/getDepartments"
        const req = await Response.json()
        return req
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}

export default fetchDepartments;