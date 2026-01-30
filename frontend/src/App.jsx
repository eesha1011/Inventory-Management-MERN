import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Users from './pages/Users'
import Inventory from './pages/Inventory'
import Expenses from './pages/Expenses'
import Settings from './pages/Settings'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<ProtectedRoute allowedRoles={["Admin", "User"]}>
            <Dashboard/>
          </ProtectedRoute>}/>
          <Route path='/inventory' element={<ProtectedRoute allowedRoles={["Admin", "User"]}>
            <Inventory/>
          </ProtectedRoute>}/>
          <Route path='/products' element={<ProtectedRoute allowedRoles={["Admin"]}>
            <Products/>
          </ProtectedRoute>}/>
          <Route path='/users' element={<ProtectedRoute allowedRoles={["Admin"]}>
            <Users/>
          </ProtectedRoute>}/>
          <Route path='/expenses' element={<ProtectedRoute allowedRoles={["Admin"]}>
            <Expenses/>
          </ProtectedRoute>}/>
          <Route path='/settings' element={<ProtectedRoute allowedRoles={["Admin", "User"]}>
            <Settings/>
          </ProtectedRoute>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    
  )
}

export default App
