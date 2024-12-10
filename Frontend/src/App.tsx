import React from "react"
import { useRouteElements } from "./hooks/useRouteElements"
import { ToastContainer } from "react-toastify"


function App() {
  const routeElements = useRouteElements()
  return (
    <div className="font-poppins">
      {routeElements}
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default App
