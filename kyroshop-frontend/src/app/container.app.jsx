import { RouterProvider } from "react-router";
import routeConfig from "./route.config.jsx"
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiTextField: {
      defaultProps: {
        // The default props to change
        size: "small",
        margin: "normal",
        fullWidth: true,
      }
    },
  }
})

const ContainerApp = function () {
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={routeConfig} />
      </ThemeProvider>
    </>
  )
}

export default ContainerApp