import { useState } from "react";
import { createEMployee } from "../api/api";

export const EmployeeForm = () => {
  const [obj, setObj] = useState({
    name: "",
    email: "",
    age: "",
    department: "",
    salary: "",
  });
  const handleChange = (e) => {
    setObj({
      ...obj,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createApi = createEMployee(obj);
    if (createApi.status) {
      alert(createApi.status);
    } else {
      alert(createApi.message);
    }
    setObj({
      name: "",
      email: "",
      age: "",
      department: "",
      salary: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={obj.name}
          placeholder="Enter Name here"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={obj.email}
          placeholder="Enter the email"
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          value={obj.age}
          placeholder="Enter the age"
          onChange={handleChange}
        />
        <input
          type="text"
          name="department"
          value={obj.department}
          placeholder="Enter the Department"
          onChange={handleChange}
        />
        <input
          type="text"
          name="salary"
          value={obj.salary}
          placeholder="Enter the Department"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
