import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
interface MyDialogProps {
    children: ReactNode;
    triggerButton: ReactNode;
   
  }

const MyDialog: React.FC<MyDialogProps> = ({ children, triggerButton}) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full max-w-md">{triggerButton}</DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default MyDialog;