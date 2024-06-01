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
import { PasswordInteface } from "@/pages/SavedPasswords";

interface DialogProps {
  generatedPassword?: string;
  setShow: (action: boolean) => void;
  passwordInfo?: {
    _id: string;
    name: string;
    password: string;
  };
  action: "create" | "update";
  updatedPassword?: (data: PasswordInteface) => void;
}
const SavePasswordDialog: React.FC<DialogProps> = ({
  generatedPassword,
  setShow,
  passwordInfo,
  action,
  updatedPassword,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: passwordInfo?.name || "",
      password: generatedPassword || passwordInfo?.password || "",
    },
    validationSchema,
    onSubmit: ({ name, password }) => {
      setIsSubmitting(true);
      const url =
        action === "update"
          ? `${SERVER_URL}/passwords/${passwordInfo?._id}`
          : `${SERVER_URL}/passwords`;
      const method = action === "update" ? "put" : "post";

      axiosJWT({
        method: method,
        url: url,
        data: { name, password },
      })
        .then(({ data }) => {
          if (action === "update" && updatedPassword) {
            updatedPassword(data.updatePassword);
          }
          showToast(data.message);
          setShow(false);
        })
        .catch(({ response }) => {
          setIsSubmitting(false);
          showToast(response.data.message, "error");
        });
    },
  });

  return (
    <Dialog defaultOpen onOpenChange={() => setShow(false)}>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle className="font-oswald text-2xl text-nuetralBlue">
            {action === "create" ? "Save" : "Update"} Password
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
