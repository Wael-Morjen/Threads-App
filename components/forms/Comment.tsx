'use client';

import { commentValidation } from "@/lib/validations/thread";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";

interface CommentProps {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}

const Comment: React.FC<CommentProps> = ({
    threadId,
    currentUserImg,
    currentUserId
}) => {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm<z.infer<typeof commentValidation>>({
        resolver: zodResolver(commentValidation),
        defaultValues: {
            thread: '',
        },
      });
    
    const onSubmit = async (values: z.infer<typeof commentValidation>) => {
        await addCommentToThread(
            threadId,
            values.thread,
            JSON.parse(currentUserId),
            pathname
        );
        
        form.reset()
    }
    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="mt-10 flex items-center gap-4 border-y border-y-dark-4 py-5 max-xs:flex-col !important"
            >
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className="flex gap-3 w-full items-center">
                            <FormLabel>
                                <Image
                                    src={currentUserImg}
                                    alt="Currentuser"
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover"
                                />
                            </FormLabel>
                            <FormControl className="border-none bg-transparent">
                                <Input 
                                    type="text"
                                    placeholder="Comment..."
                                    className="no-focus text-light-1 outline-none"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button 
                    type="submit" 
                    className="
                        rounded-3xl 
                        bg-primary-500 
                        px-8 
                        py-2 
                        !text-small-regular 
                        text-light-1 
                        max-xs:w-full 
                        !important
                    "
                >
                    Reply
                </Button>
            </form>
        </Form>
    );
}
 
export default Comment;