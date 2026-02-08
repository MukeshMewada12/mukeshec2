import { useEffect, useState } from "react";

const Contact = () => {
  const [data, setData] = useState([]);

  // DELETE handler
  const deleteData = async (id) => {
    // confirmation before delete
    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/deleteData/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
   

      // remove deleted item from state — good for UI
   fetchData();
    } catch (error) {
      console.error("Error happened while deleting:", error);
    }
  };

  // fetch data
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getData");
      const result = await response.json();

      if (Array.isArray(result.data)) {
        setData(result.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Data Listing</h1>

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4">NO Data Found</td>
            </tr>
          ) : (
            data.map(e => (
              <tr key={e._id}>
                <td>{e._id}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>
                  {/* 👇 Correct: pass function reference */}
                  <button onClick={() => deleteData(e._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default Contact;
