import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { FileForm } from './components/FileForm'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '@renderer/components/Layout'
import { Home } from '@renderer/components/Home'

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
                <Route path="/form" element={<FileForm />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
