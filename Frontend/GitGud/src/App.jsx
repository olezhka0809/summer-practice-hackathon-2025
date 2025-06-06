
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//pages

import LoginPage from './pages/Login_Page';
import Registration_Page from './pages/Register_Page';
import Dashboard from './pages/Dashboard';
import MyProjects from './pages/MyProjects';
import AddProject from './pages/AddProjectPage';
import ViewProject from './pages/ViewProjectPage';
//styles
import './App.scss'

function App() {
 

  return (
    <>
    <Routes>
      <Route path="*" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Registration_Page />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/myprojects" element={<MyProjects />} />
      <Route path="/addproject" element={<AddProject />} />
      <Route path="/viewproject" element={<ViewProject />} />

    </Routes>
    </>
  )
}

export default App
