import { useState } from 'react'
import './App.css'
import MyTask from "./Pages/MyTask/MyTask";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <MyTask />
    </div>
  )
}

export default App
