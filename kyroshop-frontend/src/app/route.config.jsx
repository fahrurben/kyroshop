import { createBrowserRouter } from "react-router"
import HomeView from "../views/home/home.view.jsx"
import LoginView from "../views/login/login.view.jsx"

const routeConfig = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
  },
  {
    path: "/login",
    element: <LoginView />,
  }
])

export default routeConfig