
/*
Fetch function for validating login information with
mysql server.  takes in username and pass, returns
boolean (and eventually a user role if true)
*/
async function fetchLogin(user, pass) {
    try {
        /* note for url: this is what the URL is supposed to be, was not working as of creation */
        const url = "http://10.55.0.200:5000/validate"
        const req = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "username": user,
                "password": pass,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res = await req.json()
        return res.success // change to just res later once user role return is implemented
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export default fetchLogin;