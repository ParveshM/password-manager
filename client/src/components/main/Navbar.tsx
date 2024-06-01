import { Sun, LogOut, Moon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { clearUser } from "@/redux/userSlice";
import { Logo } from "@/assets";
import showToast from "@/utils/showToast";
import { Button } from "../ui/button";
import { useTheme } from "@/context/ThemeProvider";

const Navbar = () => {
  const name = useAppSelector((state) => state.name);
  const dispatch = useAppDispatch();
  const { setTheme } = useTheme();
  return (
    <nav className="sticky top-0 z-100 bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} className="h-8" alt="OnePass" />
          <span className="self-center text-2xl  font-oswald text-nuetralBlue font-semibold whitespace-nowrap dark:text-white">
            OnePass
          </span>
        </Link>
        <div className="flex items-center gap-4 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {name && (
            <div className="flex text-sm bg-green-600 rounded-full md:me-0 ">
              <DropdownMenu>
                <DropdownMenuTrigger className="h-7 w-7 text-white font-semibold text-xl focus:outline-none">
                  {name && name[0].toUpperCase()}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-5">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/saved">
                    <DropdownMenuItem>Saved Passwords</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex items-center gap-2"
                    onClick={() => {
                      dispatch(clearUser());
                      showToast("Logout sucess");
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
