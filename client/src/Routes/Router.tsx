import LoginForm from "@/components/main/LoginForm";
import Register from "@/components/main/Register";
import Home from "@/pages/Home";
import Layout from "@/pages/Layout";
import { Route, Routes } from "react-router-dom";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default MainRouter;
