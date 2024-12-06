import { useRoutes } from "react-router-dom"
import Main from "../layout/Main"
import Home from "../pages/Home"
import { paths } from "../constants/paths"
import SignUpLayout from "../layout/SignUpLayout/SignUpLayout"
import SignUp from "../pages/SignUp"
import SignIn from "../pages/SignIn"
import Contact from "../pages/Contact"
import About from "../pages/About/About"
import ProductList from "../pages/ProductList"

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
    },
    {
      path: paths.contact,
      element: (
        <Main>
          <Contact></Contact>
        </Main>
      )
    },
    {
      path: paths.about,
      element: (
        <Main>
          <About></About>
        </Main>
      )
    },
    {
      path: paths.products,
      element: (
        <Main>
          <ProductList></ProductList>
        </Main>
      )
    },
    {
      path: paths.signup,
      element: (
        <SignUpLayout>
          <SignUp></SignUp>
        </SignUpLayout>
      )
    },
    {
      path: paths.signin,
      element: (
        <SignUpLayout>
          <SignIn></SignIn>
        </SignUpLayout>
      )
    }
  ])

  return routesElememt
}


