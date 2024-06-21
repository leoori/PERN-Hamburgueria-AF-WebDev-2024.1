import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Burgers from './pages/burgers'
import Users from './pages/users'
import Register_Burger from './pages/register_burger'

const PrivateRoutes = () => {
  const {isAuth} = useSelector((state) => state.auth)

  return <>{isAuth ? <Outlet /> : <Navigate to = '/login' />}</>
}

const RestrictedRoutes = () => {
  const {isAuth} = useSelector((state) => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to = '/dashboard' />}</>
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home />} />

        <Route element={<PrivateRoutes />} >
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/register_burger' element={<Register_Burger />} />
          <Route path='/burgers' element={<Burgers />} />
          <Route path='/users' element={<Users />} />
        </Route>

        <Route element={<RestrictedRoutes />} >
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App