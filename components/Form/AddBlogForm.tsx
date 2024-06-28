

"use client";

import React from "react";
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
import { toast } from "../ui/use-toast";

import { uploadImage } from "@/utils/imgbb";

import useUserInfo from "@/hooks/useUserInfo";

import { Loader } from "lucide-react";
import { useCreateBlogMutation } from "@/redux/features/blog/blogApi";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { BlogCategory } from "@/types";
import { useDispatch } from "react-redux";
import { addBlog } from "@/redux/features/blog/blogSlice";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });



const formSchema = z.object({
    title: z.string().min(6, { message: "Title must be at least 6 characters" }),
    content: z.string().min(1, { message: "Content must be provided" }),
    category: z.string().min(1, { message: "Category must be selected" }),
    conclusion: z.string().min(1, { message: "Conclusion must be provided" }),
    image: z.any(),
});

const AddBlogForm = () => {
    const dispatch=useDispatch()
    const router = useRouter();
    const user = useUserInfo();
    const [createBlog, { isLoading }] = useCreateBlogMutation();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
            category: "",
            conclusion: "",
            image: null,
        },
    });

    const onSubmit = async (values: any) => {
        if (values.image && values.image.length > 0) {
            const url = await uploadImage(values.image[0]);
            values.image = url;
        } else {
            values.image = "";
        }

        try {
            const res = await createBlog(values).unwrap();
            if (res?.id) {
                toast({
                    title: "Success!",
                    description: "Blog created successfully",
                });
                router.push(`/dashboard/${user?.role}/show-blogs`);
                dispatch(addBlog({
                    name:user?.name,
                    category:values?.category,
                    message:'create a new blog'
                  }))
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "An error occurred while creating the blog",
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="w-full space-y-4 px-2 md:px-5 py-6">
                    <div className="grid grid-cols-1  gap-4 justify-center items-center">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            required
                                            type="text"
                                            placeholder="Title..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
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
                                                    <SelectLabel>Categories</SelectLabel>
                                                    {BlogCategory.map((category) => (
                                                        <SelectItem key={category} value={category}>
                                                            {category}
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
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <ReactQuill
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Content..."
                                            theme="snow"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="conclusion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Conclusion</FormLabel>
                                    <FormControl>
                                        <ReactQuill
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Conclusion..."
                                            theme="snow"
                                            className="rounded-md"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => field.onChange(e.target.files)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mt-6">
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading && <Loader className="ml-6 h-4 w-4 animate-spin" />}
                            Add Now
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default AddBlogForm;


