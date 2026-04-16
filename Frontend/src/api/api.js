import axios from 'axios'
const BASE_URL = "http://localhost:8080/api/employees"

export const getEmployee = (params) => {
    return axios.get(`${BASE_URL}/`, {params})
}

//create
export const createEMployee = (data) => {
    return axios.post(`${BASE_URL}/create`, data)
}
console.log(createEMployee)

//update
export const updateEmployee = (id,data) => {
    return axios.patch(`${BASE_URL}/updatePartial/${id}`, data)
}

//DELETE
export const deleteEmployee = (id) => {
    return axios.delete(`${BASE_URL}/deleteEmployee/${id}`)
}