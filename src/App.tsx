import { useState } from 'react'
import './App.scss'
import {RouterProvider} from "react-router-dom";
import routes from "./routes/routes";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <RouterProvider router={routes} />
    </div>
  )
}

export default App
