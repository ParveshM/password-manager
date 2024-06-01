import { toast } from "@/components/ui/use-toast";
type action = "success" | "error";
const showToast = (text: string, type: action = "success") => {
  toast({
    variant: type === "success" ? "default" : "destructive",
    description: text,
    duration: 3000,
  });
};
export default showToast;
