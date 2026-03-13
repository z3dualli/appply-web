import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { MainPage } from './pages/MainPage'
import { ApplicationsPage } from './pages/ApplicationsPage'
import Header from './widgets/Header/Header'

function App() {
  return(
  <BrowserRouter>
   <Header/>
   <Routes>
    <Route element={<MainPage/>} path='/'/>
    <Route element={<ApplicationsPage/>} path='/applications'/>
  </Routes>
  </BrowserRouter>    
  )
}

export default App
