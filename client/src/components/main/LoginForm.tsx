import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useFormik } from "formik";
import showToast from "@/utils/showToast";
import { SERVER_URL } from "@/constants";
import { axiosJWT } from "@/utils/axiosJwt";
import { loginValidation } from "@/utils/validations";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: ({ email, password }) => {
      setIsSubmitting(true);
      axiosJWT
        .post(SERVER_URL + "/register", { email, password })
        .then(({ data }) => {
          showToast(data.message);
        })
        .catch(() => {
          setIsSubmitting(false);
          showToast("Opps,something went wrong");
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
          <form className="grid   items-center gap-4">
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
          </form>
          <div className="flex justify-center mt-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Login
            </Button>
          </div>
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
export default LoginForm;
