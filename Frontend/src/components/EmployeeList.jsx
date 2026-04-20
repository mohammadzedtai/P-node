import { useEffect, useState } from "react";
import { getEmployee } from "../api/api";

export const EmployeeList = () => {
  const [employee, setEmployee] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  //All Dynamic controls from frontend
  const [params, setParams] = useState({
    search: "",
    sortBy: "",
    order: "asc",
    page: 1,
    limit: 5,
  });
  
  const fetchEmployee = async () => {
    try {
      const res = await getEmployee(params);

      setEmployee(res.data);
      setTotalPages(res.pagination.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEmployee();
  }, [params]);
  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee List</h2>
      {/*===========Search============ */}
      <input
        type="text"
        placeholder="Enter Either name OR department"
        onChange={(e) => {
          setParams({ ...params, search: e.target.value, page: 1 });
        }}
      />

      {/*==========Sort=============*/}
      <select onChange={(e)=>{setParams({...params, sortBy: e.target.value})}}>
        <option value="">Sort</option>
        <option value="name">Name</option>
        <option value="salary">Salary</option>
      </select>
      <select onChange={(e)=>{setParams({...params, order:e.target.value})}}>
        <option value="asc">ASC</option>
        <option value="desc">DESC</option>
      </select>

      {/*==========DATA=============*/}
      {employee.map((emp) => (
        <div
          key={emp._id}
          style={{ border: "1px solid", margin: "10px", padding: "10px" }}
        >
            <p>{emp.name}</p>
            <p>{emp.email}</p>
            <p>{emp.department}</p>
            <p>{emp.salary}</p>
        </div>
      ))}

      {/*Pagination */}
      <div>
        <button disabled={params.page === 1} onClick={()=>{setParams({...params, page: params.page - 1})}}>Prev</button>
        <span>Page {params.page}/{totalPages}</span>
        <button disabled={params.page === totalPages} onClick={()=> setParams({...params, page: params.page + 1})}>Next</button>
      </div>
    </div>
  );
};
