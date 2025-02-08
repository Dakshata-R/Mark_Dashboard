import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";



function Dashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5001/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleEdit = (student) => {
    setEditStudent(student);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditStudent({ ...editStudent, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5001/update-student/${editStudent.id}`, editStudent);
      setIsEditing(false);
      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/delete-student/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Back to Home Button */}
      <button onClick={() => navigate("/")} className="back-home-btn">
        Back to Home
      </button>

      <h1 className="dashboard-title">Dashboard</h1>

      {/* Table */}
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sub 1</th>
            <th>Sub 2</th>
            <th>Sub 3</th>
            <th>Sub 4</th>
            <th>Sub 5</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.subject1}</td>
                <td>{student.subject2}</td>
                <td>{student.subject3}</td>
                <td>{student.subject4}</td>
                <td>{student.subject5}</td>
                <td className="actions">
                  <button onClick={() => handleEdit(student)} className="edit-btn">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(student.id)} className="delete-btn">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Student</h2>
            <input type="text" name="name" value={editStudent.name} onChange={handleChange} placeholder="Name" />
            <input type="number" name="subject1" value={editStudent.subject1} onChange={handleChange} placeholder="Subject 1" />
            <input type="number" name="subject2" value={editStudent.subject2} onChange={handleChange} placeholder="Subject 2" />
            <input type="number" name="subject3" value={editStudent.subject3} onChange={handleChange} placeholder="Subject 3" />
            <input type="number" name="subject4" value={editStudent.subject4} onChange={handleChange} placeholder="Subject 4" />
            <input type="number" name="subject5" value={editStudent.subject5} onChange={handleChange} placeholder="Subject 5" />

            <div className="modal-buttons">
              <button onClick={() => setIsEditing(false)} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleUpdate} className="update-btn">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
