import React, { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { AuthContext, AuthProvider } from "./context/AuthContext";

import Auth from "./auth/Auth";
import Login from "./auth/Login";
import Register from "./auth/Register";

import NoPage from "./page/NoPage";
import Home from "./page/Home";
import File from "./page/File";
import Profile from "./page/Profile";

import Header from "./component/Header";
import Footer from "./component/Footer";
import FileUpload from "./component/FileUpload";
import Files from "./component/Files";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="file" element={<File />}>
              <Route index element={<Files />} />
              <Route path="upload" element={<FileUpload />} />
            </Route>
            <Route path="/profile">
              <Route index element={<Profile />} />
            </Route>
          </Route>
          {/* <Route path="/user/:id/verify/:token" element={<EmailVerify />}></Route> */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

const Layout = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  return (
    <>
      {user && isAuthenticated ? (
        <>
          <Header />
          <div className="min-h-screen">
            <Outlet />
          </div>
          <Footer />
        </>
      ) : (
        <Navigate to="/auth/login" />
      )}
    </>
  );
};

export default App;
