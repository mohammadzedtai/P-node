import { useState } from 'react'
import './App.css'
import { EmployeeList } from './components/EmployeeList'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <EmployeeList/>
    </>
  )
}

export default App
