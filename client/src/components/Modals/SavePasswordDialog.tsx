import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useFormik } from "formik";
import showToast from "@/utils/showToast";
import { SERVER_URL } from "@/constants";
import { axiosJWT } from "@/utils/axiosJwt";
import validationSchema from "@/utils/validations";

interface DialogProps {
  generatedPassword: string;
  setShow: (action: boolean) => void;
}
const SavePasswordDialog: React.FC<DialogProps> = ({
  generatedPassword,
  setShow,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      password: generatedPassword || "",
    },
    validationSchema,
    onSubmit: ({ name, password }) => {
      setIsSubmitting(true);
      axiosJWT
        .post(SERVER_URL + "/passwords", { name, password })
        .then(({ data }) => {
          showToast(data.message);
          setShow(false);
        })
        .catch(() => {
          setIsSubmitting(false);
          showToast("Opps,something went wrong");
        });
    },
  });

  return (
    <Dialog defaultOpen onOpenChange={() => setShow(false)}>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle className="font-oswald text-2xl text-nuetralBlue">
            Save Password
          </DialogTitle>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="name" className="font-oswald">
              Name
            </Label>
            <input
              className="col-span-3 border-2 rounded-xl border-slate-200   text-gray-500 outline-none  
              focus:ring-primary-600 focus:border-primary-600 block w-full p-2 placeholder:font-sans placeholder:text-sm "
              type="text"
              placeholder="Enter website name"
              {...formik.getFieldProps("name")}
            />
            {formik.errors.name && (
              <p className="text-red-500">{formik.errors.name}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="name" className="font-oswald">
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
              {formik.errors.password && (
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
          <div className="flex items-center justify-center">
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SavePasswordDialog;
