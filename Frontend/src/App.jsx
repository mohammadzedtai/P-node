import { useState } from 'react'
import './App.css'
import { EmployeeForm } from './components/EmployeeForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <EmployeeForm/>
    </>
  )
}

export default App
