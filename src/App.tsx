import { Navigate, Route, Routes } from "react-router-dom"
import RegisterView from "./modules/auth/views/RegisterView"
import LoginView from "./modules/auth/views/LoginView"
import HomeView from "./modules/home/views/HomeView"
import { tokenStore } from "./modules/shared/store/AuthTokenStore"
function App() {
  const token = tokenStore((state) => state.token);

  return (
    <>
      <div className='h-screen w-full bg-slate-100'>
        <Routes>
          <Route
            path="*"
            element={
              token.length > 0 ? <Navigate to="/home" replace /> : <Navigate to="/register" replace />
            }
          />
          <Route path={'/register'} element={<RegisterView />} />
          <Route path={'/login'} element={<LoginView />} />
          <Route path={'/home'} element={<HomeView />} />
        </Routes>
      </div>
    </>
  )
}

export default App
