
const BASE_URL = "https://p-node-3.onrender.com/api/employees"

export const getEmployee = async (params = {}) =>{
    const query = new URLSearchParams(params).toString();
    console.log("here in api function from getEmployee",query)
    const res = await fetch(`${BASE_URL}/getEmployee?${query}`)
    return res.json()
}