import { useRoutes } from "react-router-dom"
import Main from "../layout/Main"
import Home from "../pages/Home"

export const useRouteElements = () => {
  const routesElememt = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <Main>
          <Home></Home>
        </Main>
      )
    }
  ])

  return routesElememt
}


