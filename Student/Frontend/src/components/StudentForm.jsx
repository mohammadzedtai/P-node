import { useEffect, useState } from "react";
import { createStudent, updateStudent } from "../api/api.js";

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
      [name]: name === "age" || name === "fees"
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
          setObj({ name: "", email: "", age: "", course: "", fees: "" });
          setEditStudent(null);
          refreshData();
        })
        .catch(() => alert("Update failed"));
    } else {
      createStudent(obj)
        .then((res) => {
          alert(res.data.message);
          setObj({ name: "", email: "", age: "", course: "", fees: "" });
          refreshData();
        })
        .catch(() => alert("Create failed"));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 text-left">

      {/* 💎 Glass Card */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl overflow-hidden text-black">

        {/* 🔥 Header */}
        <div className="px-6 py-5 border-b border-gray-300 text-left">
          <h2 className="text-2xl md:text-3xl font-bold">
            {editStudent ? "Update Student Details" : "Add New Student"}
          </h2>
          <p className="text-gray-700 text-sm mt-1">
            {editStudent
              ? "Edit student info and save changes"
              : "Fill details to create new record"}
          </p>
        </div>

        {/* 🧾 Form */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 text-left">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Name */}
            <div className="text-left">
              <label className="text-sm text-gray-700 mb-1 block">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={obj.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="w-full bg-white/60 border border-gray-300 rounded-xl px-4 py-3 text-black placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Email */}
            <div className="text-left">
              <label className="text-sm text-gray-700 mb-1 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={obj.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full bg-white/60 border border-gray-300 rounded-xl px-4 py-3 text-black placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Age */}
            <div className="text-left">
              <label className="text-sm text-gray-700 mb-1 block">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={obj.age}
                onChange={handleChange}
                placeholder="Enter age"
                className="w-full bg-white/60 border border-gray-300 rounded-xl px-4 py-3 text-black placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Course */}
            <div className="text-left">
              <label className="text-sm text-gray-700 mb-1 block">
                Course
              </label>
              <input
                type="text"
                name="course"
                value={obj.course}
                onChange={handleChange}
                placeholder="Enter course"
                className="w-full bg-white/60 border border-gray-300 rounded-xl px-4 py-3 text-black placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Fees */}
            <div className="md:col-span-2 text-left">
              <label className="text-sm text-gray-700 mb-1 block">
                Fees
              </label>
              <input
                type="number"
                name="fees"
                value={obj.fees}
                onChange={handleChange}
                placeholder="Enter fees"
                className="w-full bg-white/60 border border-gray-300 rounded-xl px-4 py-3 text-black placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* 🔘 Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">

            <button
              type="submit"
              className={`flex-1 py-3 rounded-xl font-semibold text-white transition ${
                editStudent
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {editStudent ? "Update Student" : "Add Student"}
            </button>

            {editStudent && (
              <button
                type="button"
                onClick={() => {
                  setEditStudent(null);
                  setObj({
                    name: "",
                    email: "",
                    age: "",
                    course: "",
                    fees: ""
                  });
                }}
                className="flex-1 py-3 rounded-xl font-semibold bg-gray-500 hover:bg-gray-600 text-white transition"
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