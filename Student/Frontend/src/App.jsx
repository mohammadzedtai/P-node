import { useState } from 'react'
import './App.css'
import { StudentForm } from './components/StudentForm.jsx'
function App() {
  const [refresh, setRefresh] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  const refreshData = () => setRefresh(!refresh);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Student Management System
          </h1>
        </div>

        <div className="space-y-8">

          <div className="glass shadow-premium p-6">
            <StudentForm
              refreshData={refreshData}
              editStudent={editStudent}
              setEditStudent={setEditStudent}
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default App