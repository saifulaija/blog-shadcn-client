import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../ui/form";
  import { Input } from "../ui/input";
  import { Button } from "../ui/button";
  
  import { useToast } from "../ui/use-toast";

  
  import { useForm } from "react-hook-form";
  import { useEffect, useState } from "react";

  import { Loader, Loader2 } from "lucide-react";
import { useUpdateBlogMutation } from "@/redux/features/blog/blogApi";
import { IBlogUpdateProps } from "@/types/blog";
import { title } from "process";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { BlogCategory } from "@/types";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";


const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
  
  const BlogUpdateForm = ({ data  }: IBlogUpdateProps) => {
    

    const { toast } = useToast();
    const [updateFlat, { isLoading:update }] = useUpdateBlogMutation();
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState("");
  
    const form = useForm({
      // resolver: zodResolver(formSchema),
      defaultValues: {
        title: "",
        content: "",
        category: "",
        conclusion: "",
       
      },
    });
  
    useEffect(() => {
      if (data) {
        form.reset({
          title: data.title || "",
          content: data.content || "",
          conclusion: data.conclusion || "",
          category: data.category || ""
         
        });
      }
    }, [data, form]);
  
    const onSubmit = async (values: any) => {
      const updatedData = {
        id: data?.id,
        body: values,
      };
      setLoading(true);
      try {
        const res = await updateFlat(updatedData).unwrap();
  
        if (res?.id) {
          toast({
            title: "Flat Request",
            description: "Your flat updated  successfully",
          });
         
        }
      } catch (err: any) {
        setSubmitError("Something went wrong. Please try again."); // Set submit error message
        toast({
          title: "Error",
          description: "Something went wrong",
        });
      } finally {
        setLoading(false);
      }
    };
  
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="w-full space-y-4 px-10 py-6">
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

                  
                </div>
                <div className="mt-6">
                    <Button type="submit" disabled={update} className="w-full">
                        Update Now
                        {update && <Loader className="ml-6 h-5 w-5 animate-spin" />}
                    </Button>
                </div>
            </div>
        </form>
    </Form>
    );
  };
  
  export default BlogUpdateForm;
  