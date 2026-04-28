const BASE_URL = "https://p-node-4.onrender.com/api/student";

export const getStudent = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();

    console.log("API Query 👉", query);

    const res = await fetch(`${BASE_URL}?${query}`); 

    const data = await res.json();
    return data;

  } catch (error) {
    console.log("API Error:", error);
    return { data: [], pagination: { totalPages: 1 } }; // fallback
  }
};