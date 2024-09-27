import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Layout } from '@renderer/views/Layout'
import { Home } from '@renderer/views/Home'
import { LoanForm } from './views/LoanForm'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

function App(): JSX.Element {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <BrowserRouter basename={'/'}>
          <div className="main">
            <Layout className="side-bar" />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/form" element={<LoanForm />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
