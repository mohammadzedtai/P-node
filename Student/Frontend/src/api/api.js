import axios from "axios";

const BASE_URL = "https://p-node-5.onrender.com/api/students";

// GET
export const getStudent = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/getStudents?${query}`);
  return res.json();
};

// CREATE
export const createStudent = (data) => {
  return axios.post(`${BASE_URL}/create`, data);
};

// UPDATE
export const updateStudent =  (id, data) => {
  return  axios.patch(`${BASE_URL}/updateStudentsFUll/${id}`, data);
 
};

 
