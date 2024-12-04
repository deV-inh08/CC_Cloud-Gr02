import React from "react"
import { useRouteElements } from "./hooks/useRouteElements"


function App() {
  const routeElements = useRouteElements()
  return (
    <div className="font-poppins">
      {routeElements}
    </div>
  )
}

export default App
