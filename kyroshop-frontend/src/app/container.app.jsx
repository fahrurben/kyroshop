import { RouterProvider } from "react-router";
import routeConfig from "./route.config.jsx"
import { createTheme, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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

const queryClient = new QueryClient()

const ContainerApp = function () {
  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routeConfig} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}

export default ContainerApp