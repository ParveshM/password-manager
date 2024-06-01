import { Clipboard, EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { forwardRef } from "react";

interface ListInterface {
  _id: string;
  name: string;
  password: string;
  handleCopy: (password: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: () => void;
}
const PasswordList: React.ForwardRefRenderFunction<
  HTMLDivElement,
  ListInterface
> = ({ _id, name, password, handleCopy, handleDelete, handleEdit }, ref) => {
  return (
    <div
      className="flex items-center p-3 border rounded-lg bg-gray-50"
      ref={ref}
    >
      <div className="w-10 h-10 flex-shrink-0 bg-nuetralBlue flex items-center justify-center bg-neutralBlue rounded-md">
        <p className="font-semibold text-xl text-white">{name[0]}</p>
      </div>
      <div className="flex-grow ml-4">
        <p className="text-gray-700 font-medium">{name}</p>
      </div>
      <Clipboard
        className="cursor-pointer hover:text-blue-500 transition duration-200"
        onClick={() => handleCopy(password)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger className="h-7 w-7 text-white font-semibold text-xl focus:outline-none">
          <EllipsisVertical className="text-gray-700" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-5">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel onClick={() => handleEdit()}>
            Edit
          </DropdownMenuLabel>
          <DropdownMenuItem className="flex justify-center text-white">
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => handleDelete(_id)}
            >
              Delete
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default forwardRef(PasswordList);
