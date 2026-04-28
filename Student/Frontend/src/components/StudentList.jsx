import { useEffect, useState } from "react";
import { getStudent } from "../api/api.js"; // ✅ change


export const StudentList = () => {
  const [students, setStudents] = useState([]); // ✅ change
  const [totalPages, setTotalPages] = useState(1);

  const [params, setParams] = useState({
    search: "",
    sortBy: "",
    order: "asc",
    page: 1,
    limit: 5,
  });

  const fetchStudents = async () => {
    try {
      const res = await getStudent(params);

      console.log("API 👉", res);

      setStudents(res.data?.data || []); // ✅ change
      setTotalPages(res.data?.pagination?.totalPages || 1);

    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [params]);

  return (
    <div className="container">
      <h2>STUDENT LIST</h2>

      {/* 🔍 Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search name or course"
          onChange={(e) =>
            setParams({ ...params, search: e.target.value, page: 1 })
          }
        />

        <select onChange={(e) =>
          setParams({ ...params, sortBy: e.target.value })
        }>
          <option value="">Sort</option>
          <option value="name">Name</option>
          <option value="fees">Fees</option>
          <option value="age">Age</option>
        </select>

        <select onChange={(e) =>
          setParams({ ...params, order: e.target.value })
        }>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
      </div>

      {/* 📦 Cards */}
      <div className="card-container">
        {students.length > 0 ? (
          students.map((std) => (
            <div key={std._id} className="card">
              <p><strong>Name:</strong> {std.name}</p>
              <p><strong>Email:</strong> {std.email}</p>
              <p><strong>Course:</strong> {std.course}</p>
              <p><strong>Age:</strong> {std.age}</p>
              <p><strong>Fees:</strong> ₹{std.fees}</p>
            </div>
          ))
        ) : (
          <p className="empty">No students found</p>
        )}
      </div>

      {/* 📄 Pagination */}
      <div className="pagination">
        <button
          disabled={params.page === 1}
          onClick={() =>
            setParams({ ...params, page: params.page - 1 })
          }
        >
          Prev
        </button>

        <span>
          Page {params.page} / {totalPages}
        </span>

        <button
          disabled={params.page === totalPages}
          onClick={() =>
            setParams({ ...params, page: params.page + 1 })
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};