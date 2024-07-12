import { getUserInfo } from "@/services/authServices";
import { ModeToggle } from "../header/ModeToggle";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/actions/logoutUser";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";


const AuthButton = () => {
    const{toast}=useToast()
    const user=getUserInfo();
    const router=useRouter()
      const handleLogout = () => {
        logoutUser(router);
        toast({
          variant: 'destructive',
          title: 'Logout',
          description: 'User logged out successfully',
        });
      };
  return (
    <div className="flex items-center gap-2">
      <ModeToggle />

      {user && user.userId ? (
        <Button onClick={handleLogout} asChild className="cursor-pointer group">
          <span className="flex items-center gap-2">
            Logout
            <ExitIcon className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
          </span>
        </Button>
      ) : (
        <Button asChild className="group">
          <Link href="/signin" className="flex items-center gap-2">
            <span className="flex items-center justify-center gap-2 font-semibold tracking-wide">
              Login
              <ChevronRightIcon className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Button>
      )}
    </div>
  );
};

export default AuthButton;
