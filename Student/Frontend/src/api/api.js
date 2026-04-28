import axios from "axios";

const BASE_URL = "https://p-node-4.onrender.com/api/students";

// GET
export const getStudent = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/getStudent?${query}`);
  return res.json();
};

// CREATE
export const createStudent = (data) => {
  return axios.post(`${BASE_URL}/create`, data);
};

// UPDATE
export const updateStudent =  (id, data) => {
  return  axios.patch(`${BASE_URL}/updateStudent/${id}`, data);
 
};

// DELETE
export const deleteStudent =  (id) => {
  return  axios.delete(`${BASE_URL}/deleteStudent/${id}`);
   
};