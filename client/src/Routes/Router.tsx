import Login from "@/components/main/Login";
import Register from "@/components/main/Register";
import Home from "@/pages/Home";
import Layout from "@/pages/Layout";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute, PublicRoute } from "./privateRoute";
import SavedPasswords from "@/pages/SavedPasswords";
import PageNotFound from "@/pages/PageNotFound";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<PublicRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="saved" element={<SavedPasswords />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MainRouter;
