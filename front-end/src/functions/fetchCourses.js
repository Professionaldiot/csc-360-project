/*
Fetch function for searching courses.
Takes a search string, block #, and department as inputs,
returns a list of course objects.
*/
async function fetchCourses(search, blockNum, department) {
    const dictionary = {
        1: "B1",
        2: "B2",
        3: "B3",
        4: "B4",
        5: "B5",
        6: "B6",
        7: "B7",
        8: "B8",
    } /* Why blocks are stored as a string over int is beyond me.  I should've clarified but I assumed incorrectly. -Aaron */
    try {

        const url = "http://10.101.128.56:5000/search"
        const req = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "search": search,
                "block": dictionary[blockNum],
                "department": department
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res = await req.json()
        console.log(res);
        return res
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}

export default fetchCourses;