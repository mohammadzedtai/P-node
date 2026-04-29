import axios from "axios";

const BASE_URL = "https://p-node-5.onrender.com/api/students";


// CREATE
export const createStudent = (data) => {
  return axios.post(`${BASE_URL}/create`, data);
};

// UPDATE
export const updateStudent =  (id, data) => {
  return  axios.patch(`${BASE_URL}/updateStudentsFUll/${id}`, data);
 
};

 
