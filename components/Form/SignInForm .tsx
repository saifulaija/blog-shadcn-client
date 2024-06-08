import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import Link from "next/link";
import { useState } from "react";


import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { signInUser } from "@/services/actions/signInUser";
import { storeUserInfo } from "@/services/authServices";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError("");

    try {
      const res = await signInUser(values);

      if (res?.data?.accessToken) {
        storeUserInfo({ accessToken: res?.data?.accessToken });
        toast({ title: "Login", description: "User login successfully" });
        router.refresh();
      } else {
        setError(res?.message || "An unexpected error occurred.");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="w-full max-w-md space-y-4 p-4 border-0 shadow-sm">
          <CardHeader>
            <h2 className="text-xl  md:text-2xl font-semibold text-primary">Login</h2>
            <p>
              Enter your email below to login to your account.
            </p>
          </CardHeader>

          {error && <p className="text-red-500">{error}</p>}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link href='/forgot-password'><p className="text-sm font-semibold mt-4 hover:underline text-end">Forgot password ?</p></Link>
          <Button type="submit" disabled={loading} className="w-full">
            Login
            {loading && <Loader2 className="ml-6 h-5 w-5 animate-spin" />}
          </Button>

          <div className="text-balance flex justify-center items-center gap-1 text-center">
           <span>New user?</span>
            <Link href="/signup" className="text-primary hover:underline">
              Register Here
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;