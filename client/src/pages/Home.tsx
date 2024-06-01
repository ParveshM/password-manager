import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Clipboard, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import generatePassword from "@/utils/generatePassword";
import { IncludeOptions, OptionsInterface } from "@/types/propsTypes";
import { Slider } from "@/components/ui/slider";
import showToast from "@/utils/showToast";
import SavePasswordDialog from "@/components/Modals/SavePasswordDialog";
import { useAppSelector } from "@/redux/store";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [password, setPassword] = useState<string>("");
  const [filter, setFilter] = useState<OptionsInterface>({
    upperCaseLetter: true,
    lowerCaseLetter: true,
    numbers: true,
    symbols: true,
    length: 12,
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const isAuthenticated = useAppSelector((state) => state.isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    const newPassword = generatePassword(filter);
    setPassword(newPassword);
  }, [filter]);

  const toggleFilter = (key: IncludeOptions) => {
    const isLastChecked =
      Object.values(filter).filter(Boolean).length === 2 && filter[key];
    if (isLastChecked) return;
    setFilter((prevFilter) => ({ ...prevFilter, [key]: !prevFilter[key] }));
  };

  const handleCopyButton = () => {
    navigator.clipboard.writeText(password);
    showToast("Copied to clipboard");
  };

  return (
    <div className="flex flex-col items-center justify-center custom-vh  max-sm:px-2 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-oswald font-bold text-nuetralBlue dark:text-gray-100">
            Password Generator
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create a secure password with just a few clicks.
          </p>
        </div>
        <form className="mt-6 space-y-4">
          <div className="mt-6 flex text-center gap-1">
            <input
              className="border-b-2 border-b-slate-200 font-oswald text-gray-500 outline-none sm:text-2xl
               focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
               dark:border-b-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={password}
              readOnly
            />
            <div className="flex items-center gap-1  text-gray-600 ">
              <Clipboard
                onClick={handleCopyButton}
                className="cursor-pointer hover:text-gray-400 transition delay-100"
              />
              <RefreshCcw
                onClick={() => setFilter((curr) => ({ ...curr }))}
                onMouseDown={(e) => e.preventDefault()} // Avoid double click and prevents nearest text selection
                className="cursor-pointer hover:text-gray-400 transition delay-100"
              />
            </div>
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium dark:text-gray-300"
              htmlFor="length"
            >
              Password Length
            </label>
            <div className="flex items-center mt-2">
              <Slider
                defaultValue={[12]}
                min={1}
                max={50}
                step={1}
                onValueChange={(value) =>
                  setFilter((prevFilter) => ({
                    ...prevFilter,
                    length: value[0],
                  }))
                }
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                {filter.length} characters
              </span>
            </div>
          </div>
          <div className="grid grid-cols-8">
            <div className="flex items-center col-span-8 md:col-span-4">
              <Checkbox
                checked={filter.upperCaseLetter}
                onCheckedChange={() => toggleFilter("upperCaseLetter")}
              />
              <label
                className="ml-2 text-gray-700 dark:text-gray-300"
                htmlFor="uppercase"
              >
                Uppercase Letters
              </label>
            </div>
            <div className="flex items-center col-span-8 md:col-span-4">
              <Checkbox
                checked={filter.lowerCaseLetter}
                onCheckedChange={() => toggleFilter("lowerCaseLetter")}
              />
              <label
                className="ml-2 text-gray-700 dark:text-gray-300"
                htmlFor="lowercase"
              >
                Lowercase Letters
              </label>
            </div>
            <div className="flex items-center col-span-8 md:col-span-4">
              <Checkbox
                checked={filter.numbers}
                onCheckedChange={() => toggleFilter("numbers")}
              />
              <label
                className="ml-2 text-gray-700 dark:text-gray-300"
                htmlFor="numbers"
              >
                Numbers
              </label>
            </div>
            <div className="flex items-center col-span-8 md:col-span-4">
              <Checkbox
                checked={filter.symbols}
                onCheckedChange={() => toggleFilter("symbols")}
              />
              <label
                className="ml-2 text-gray-700 dark:text-gray-300"
                htmlFor="symbols"
              >
                Symbols
              </label>
            </div>
          </div>

          <Button
            className="w-full "
            type="button"
            onClick={() => {
              isAuthenticated ? setShowModal(true) : navigate("/login");
            }}
          >
            Save
          </Button>
        </form>
      </div>
      {showModal && (
        <SavePasswordDialog
          generatedPassword={password}
          setShow={setShowModal}
          action="create"
        />
      )}
    </div>
  );
}
