import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Users from './pages/Users'
import Inventory from './pages/Inventory'
import Expenses from './pages/Expenses'
import Settings from './pages/Settings'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/inventory' element={<ProtectedRoute allowedRoles={["Admin"]}>
            <Inventory/>
          </ProtectedRoute>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/users' element={<ProtectedRoute allowedRoles={["Admin"]}>
            <Users/>
          </ProtectedRoute>}/>
          <Route path='/expenses' element={<ProtectedRoute allowedRoles={["Admin"]}>
            <Expenses/>
          </ProtectedRoute>}/>
          <Route path='/settings' element={<Settings/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    
  )
}

export default App
