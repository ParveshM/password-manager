import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SERVER_URL } from "@/constants";
import showToast from "@/utils/showToast";
import { useFormik } from "formik";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { registerValidation } from "@/utils/validations";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidation,
    onSubmit: ({ name, email, password }) => {
      setIsSubmitting(true);
      axios
        .post(SERVER_URL + "/signup", { name, email, password })
        .then(({ data }) => {
          showToast(data.message);
          navigate("/login");
        })
        .catch(({ response }) => {
          setIsSubmitting(false);
          showToast(response.data.message, "error");
        });
    },
  });
  return (
    <div className="flex justify-center items-center custom-vh">
      <Card className="w-[350px] md:w-[500px]">
        <CardHeader>
          <CardTitle className="text-3xl text-nuetralBlue font-oswald">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <input
                className="border-2 rounded-xl border-slate-200 text-gray-500 outline-none focus:ring-primary-600 focus:border-primary-600 block w-full p-2 placeholder:font-sans placeholder:text-sm"
                type="text"
                placeholder="Enter name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500">{formik.errors.name}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="font-oswald">
                Email
              </Label>
              <input
                className="border-2 rounded-xl border-slate-200 text-gray-500 outline-none focus:ring-primary-600 focus:border-primary-600 block w-full p-2 placeholder:font-sans placeholder:text-sm"
                type="text"
                placeholder="johndoe@gmail.com"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500">{formik.errors.email}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className="font-oswald">
                Password
              </Label>
              <div className="relative">
                <input
                  className="border-2 rounded-xl border-slate-200 pr-12 text-gray-500 outline-none focus:ring-primary-600 focus:border-primary-600 block w-full p-2 placeholder:font-sans placeholder:text-sm"
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="••••••••"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword" className="font-oswald">
                Confirm Password
              </Label>
              <input
                className="border-2 rounded-xl border-slate-200 text-gray-500 outline-none focus:ring-primary-600 focus:border-primary-600 block w-full p-2 placeholder:font-sans placeholder:text-sm"
                type="password"
                placeholder="••••••••"
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>
            <div className="flex justify-center mt-4 md:col-span-2">
              <Button type="submit" className="w-full " disabled={isSubmitting}>
                Register
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-between">
          <p className="text-nuetralBlue font-sans text-sm">
            Already have an account?
            <Link to="/login">
              <span className="ml-2 font-oswald text-[16px] text-customRed">
                Login
              </span>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
