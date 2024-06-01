import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useFormik } from "formik";
import showToast from "@/utils/showToast";
import { SERVER_URL } from "@/constants";
import { loginValidation } from "@/utils/validations";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "@/redux/store";
import { setUser } from "@/redux/userSlice";
type JwtUser = {
  name: string;
  id: string;
  email: string;
};
const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: ({ email, password }) => {
      setIsSubmitting(true);
      axios
        .post(SERVER_URL + "/login", { email, password })
        .then(({ data }) => {
          const { access_token } = data;
          const { id, name } = jwtDecode(access_token) as JwtUser;
          localStorage.setItem("access_token", access_token);
          dispatch(
            setUser({
              id,
              name,
              isAuthenticated: true,
            })
          );
          showToast(data.message);
          navigate("/");
        })
        .catch(({ response }) => {
          setIsSubmitting(false);
          showToast(response.data.message, "error");
        });
    },
  });
  return (
    <div className="flex justify-center items-center custom-vh">
      <Card className="w-[350px] ">
        <CardHeader>
          <CardTitle className="text-3xl text-nuetralBlue font-oswald">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="grid items-center gap-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="col-span-3 flex flex-col space-y-1.5">
              <Label htmlFor="email" className="font-oswald">
                Email
              </Label>
              <input
                className=" border-2 rounded-xl border-slate-200   text-gray-500 outline-none
              focus:ring-primary-600 focus:border-primary-600 block w-full p-2 placeholder:font-sans placeholder:text-sm "
                type="text"
                placeholder="johndoe@gmail.com"
                {...formik.getFieldProps("email")}
              />
              {formik.touched && formik.errors.email && (
                <p className="text-red-500">{formik.errors.email}</p>
              )}
            </div>
            <div className="col-span-3 flex flex-col space-y-1.5">
              <Label htmlFor="Password" className="font-oswald">
                Password
              </Label>
              <div className="col-span-2 relative">
                <input
                  className="border-2 rounded-xl border-slate-200 pr-12  text-gray-500 outline-none
              focus:ring-primary-600 focus:border-primary-600 block w-full p-2 placeholder:font-sans placeholder:text-sm "
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="••••••••"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched && formik.errors.password && (
                  <p className="text-red-500">{formik.errors.password}</p>
                )}
                <div
                  className="absolute top-3 right-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="col-span-3"
              disabled={isSubmitting}
            >
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-between">
          <p className="text-nuetralBlue font-sans text-sm">
            Don't have an account?
            <Link to="/register">
              <span className="ml-2 font-oswald text-[16px] text-customRed">
                Register
              </span>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
export default Login;
