import { toast } from "@/components/ui/use-toast";

const showToast = (text: string) => {
  toast({
    description: text,
    duration: 3000,
  });
};
export default showToast;
