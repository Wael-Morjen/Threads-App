'use client';

import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

import { updateUser } from "@/lib/actions/user.actions";
import { threadValidation } from "@/lib/validations/thread";

interface PostThreadProps {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}

const PostThread = ({ userId }: { userId: string}) => {
    
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm<z.infer<typeof threadValidation>>({
        resolver: zodResolver(threadValidation),
        defaultValues: {
            thread: '',
            accountId: userId,
        },
      });
    
    const onSubmit = async () => {
        //await createThread()
    }
    

    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="flex flex-col justify-start gap-10 mt-10"
            >
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold text-light-2">
                               Content
                            </FormLabel>
                            <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                                <Textarea 
                                    rows={15}
                                    className="border border-dark-4 bg-dark-3 text-light-1 !important"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="bg-primary-500">
                    Post Thread
                </Button>
            </form>
        </Form>

    );
}
 
export default PostThread;