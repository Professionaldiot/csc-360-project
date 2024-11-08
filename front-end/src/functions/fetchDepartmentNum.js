/*
Fetch function for grabbing a list of objects containing
department names and their respective ID numbers
(ID numbers are used for search)
*/
async function fetchDepartments() {
    try {
        const url = "http://10.101.128.56:5000/getDepartments"
        const req = await Response.json()
        return req
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}

export default fetchDepartments;