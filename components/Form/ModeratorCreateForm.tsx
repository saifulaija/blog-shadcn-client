"use client";

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
import { useRouter } from "next/navigation";
import { toast, useToast } from "../ui/use-toast";
import { uploadImage } from "@/utils/imgbb";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Gender } from "@/types";
import { useCreateAuthorMutation } from "@/redux/features/blogger/bloggerApi";
import { useCreateModeratorMutation } from "@/redux/features/moderator/moderatorApi";

const formSchema = z
    .object({
        email: z.string().email({
            message: "Please enter valid email",
        }),
        password: z.string().min(6, {
            message: "Password at least 6 characters",
        }),
        name: z.string().min(1, {
            message: "Enter your yserName",
        }),
        contactNumber: z.string().min(1, {
            message: "Enter your contact number",
        }),
        // gender:z.enum(["MALE", "FEMALE"]),
        gender:z.string(),
        profilePhoto: z.any(),


    })


const CreateModeratorForm = () => {
    const [createModerator, { isLoading }] = useCreateModeratorMutation();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [error, setError] = useState("");
    const{}=useToast()
    // const [createUser, { isLoading, isError }] = useCreateUserMutation();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            contactNumber: "",
            gender:"",
            profilePhoto: null,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
    setError("");
        if (values.profilePhoto && values.profilePhoto.length > 0) {
            const url = await uploadImage(values.profilePhoto[0]);
            values.profilePhoto = url;
        } else {
            values.profilePhoto = "";
        }

        try {
            const res = await createModerator(values);
            console.log(res, 'values.........')
         
            if (res?.data) {
                toast({
                    title: "Success!",
                    description: `Author created successfully`,
                });
              
            } else {
                // setError(res?.error.error || "An unexpected error occurred.");
              }
        } catch (err: any) {
            setError(err?.message || "An unexpected error occurred.");
        }finally {
            setLoading(false);
          }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="w-full space-y-4 md:px-4 py-6">
                {error && <p className="text-red-500">{error}</p>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Enter your name" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                    <FormLabel>password</FormLabel>
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

                        <FormField
                            control={form.control}
                            name="contactNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>contactNumber</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Contact Number.."
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Gender</SelectLabel>
                                                    {Gender.map((item) => (
                                                        <SelectItem key={item} value={item}>
                                                            {item}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="profilePhoto"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>profilePhoto</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => field.onChange(e.target.files)}
                                        className="w-full"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full">
                        Create Now
                        {loading && <Loader className="ml-6 h-5 w-5 animate-spin" />}
                    </Button>

                
                </div>
            </form>
        </Form>
    );
};

export default CreateModeratorForm;