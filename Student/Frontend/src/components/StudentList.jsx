import { useState, useEffect } from "react";
import { deleteStudent, getStudent } from "../api/api.js";

export const StudentList = ({ refresh, setEditStudent, refreshData }) => {
  const [student, setStudent] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [params, setParams] = useState({
    search: "",
    sortBy: "",
    order: "asc",
    page: 1,
    limit: 5,
  });

  const fetchStudent = async () => {
    try {
      const res = await getStudent(params);
      setStudent(res.data || res.students || []);
      setTotalPage(res.pagination?.totalPages || 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [params, refresh]);

  const handleDelete = (id) => {
    deleteStudent(id)
      .then((res) => {
        if (res.data.status) {
          alert(res.data.message);
          refreshData();
        }
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Delete Failed");
      });
  };

  return (
    <div className="w-full px-4 py-8 min-h-screen text-left">

      <div className="max-w-7xl mx-auto">

        {/* 🔥 Heading */}
        <h1 className="text-4xl font-bold text-white mb-10">
          Student Data
        </h1>

        {/* 🔍 Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">

          <input
            type="text"
            placeholder="Search by name or course..."
            onChange={(e) =>
              setParams({ ...params, search: e.target.value, page: 1 })
            }
            className="w-full md:w-72 bg-white/60 text-black placeholder-gray-500 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            onChange={(e) =>
              setParams({ ...params, sortBy: e.target.value })
            }
            className="w-full md:w-52 bg-white/60 text-black border border-gray-300 rounded-xl px-4 py-3 outline-none"
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="fees">Fees</option>
            <option value="age">Age</option>
          </select>

          <select
            onChange={(e) =>
              setParams({ ...params, order: e.target.value })
            }
            className="w-full md:w-40 bg-white/60 text-black border border-gray-300 rounded-xl px-4 py-3 outline-none"
          >
            <option value="">Order</option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>

        {/* 📊 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {student.length > 0 ? (
            student.map((std) => (
              <div
                key={std._id}
                className="bg-white/50 backdrop-blur-xl border border-gray-300 rounded-2xl p-5 text-black shadow-xl transition hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="space-y-2 text-sm">

                  <p className="flex justify-between">
                    <span className="font-semibold text-gray-700">Name</span>
                    <span>{std.name}</span>
                  </p>

                  <p className="flex justify-between">
                    <span className="font-semibold text-gray-700">Course</span>
                    <span>{std.course}</span>
                  </p>

                  <p className="flex justify-between">
                    <span className="font-semibold text-gray-700">Email</span>
                    <span>{std.email}</span>
                  </p>

                  <p className="flex justify-between">
                    <span className="font-semibold text-gray-700">Age</span>
                    <span>{std.age}</span>
                  </p>

                  <p className="flex justify-between">
                    <span className="font-semibold text-gray-700">Fees</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                      ₹{std.fees}
                    </span>
                  </p>

                </div>

                {/* 🔘 Buttons */}
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => setEditStudent(std)}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 rounded-xl py-2 font-semibold text-white transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(std._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 rounded-xl py-2 font-semibold text-white transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-black bg-white/50 p-10 rounded-2xl">
              No students found
            </div>
          )}
        </div>

        {/* 🔢 Pagination */}
        <div className="flex items-center gap-4 mt-10">

          <button
            disabled={params.page === 1}
            onClick={() =>
              setParams({ ...params, page: params.page - 1 })
            }
            className={`px-5 py-2 rounded-xl font-semibold transition ${
              params.page === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Prev
          </button>

          <p className="font-semibold bg-white/60 px-6 py-2 rounded-xl">
            Page {params.page} / {totalPage}
          </p>

          <button
            disabled={params.page === totalPage}
            onClick={() =>
              setParams({ ...params, page: params.page + 1 })
            }
            className={`px-5 py-2 rounded-xl font-semibold transition ${
              params.page === totalPage
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};