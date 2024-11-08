/*
Fetch function for searching courses.
Takes a search string, block #, and department as inputs,
returns a list of course objects.
*/
async function fetchCourses(search, blockNum, department) {
    try {

        const url = "10.101.128.56:5000/search"
        const req = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "search": search,
                "block": blockNum,
                "department": department
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res = await req.json()

        return res
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}

export default fetchCourses;