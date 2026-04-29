import { useEffect, useState } from "react";
import { createStudent, updateStudent } from "../api/api.js";
import "../App.css";

export const StudentForm = ({ refreshData, editStudent, setEditStudent }) => {
  const [obj, setObj] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
    fees: ""
  });

  useEffect(() => {
    if (editStudent) {
      setObj({
        name: editStudent.name || "",
        email: editStudent.email || "",
        age: editStudent.age || "",
        course: editStudent.course || "",
        fees: editStudent.fees || ""
      });
    }
  }, [editStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setObj({
      ...obj,
      [name]:
        name === "age" || name === "fees"
          ? value === "" ? "" : Number(value)
          : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editStudent) {
      updateStudent(editStudent._id, obj)
        .then((res) => {
          alert(res.data.message);
          resetForm();
          setEditStudent(null);
          refreshData();
        })
        .catch(() => alert("Update failed"));
    } else {
      createStudent(obj)
        .then((res) => {
          alert(res.data.message);
          resetForm();
          refreshData();
        })
        .catch(() => alert("Create failed"));
    }
  };

  const resetForm = () => {
    setObj({
      name: "",
      email: "",
      age: "",
      course: "",
      fees: ""
    });
  };

  return (
    <div className="center-container">

      <div className="form-card">

        {/* Header */}
        <div className="form-header">
          <h2>
            {editStudent ? "Update Student" : "Add New Student"}
          </h2>
          <p>
            {editStudent
              ? "Modify and save student details"
              : "Fill the form to add a new student"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            {[
              { label: "Full Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Age", name: "age", type: "number" },
              { label: "Course", name: "course", type: "text" }
            ].map((field, i) => (
              <div key={i} className="form-group">
                <label>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={obj[field.name]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.label}`}
                />
              </div>
            ))}

            {/* Fees */}
            <div className="form-group full-width">
              <label>Fees</label>
              <input
                type="number"
                name="fees"
                value={obj.fees}
                onChange={handleChange}
                placeholder="Enter Fees"
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="btn-group">

            <button type="submit" className="btn primary">
              {editStudent ? "Update Student" : "Add Student"}
            </button>

            {editStudent && (
              <button
                type="button"
                className="btn cancel"
                onClick={() => {
                  setEditStudent(null);
                  resetForm();
                }}
              >
                Cancel
              </button>
            )}

          </div>

        </form>
      </div>
    </div>
  );
};