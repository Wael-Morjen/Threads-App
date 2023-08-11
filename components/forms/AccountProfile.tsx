'use client';

import { useForm } from "react-hook-form";
import * as z from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "@/lib/validations/user";
import { Button } from "../ui/button";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";

import { useUploadThing } from '@/lib/uploadthing'

interface AccountProfileProps {
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

const AccountProfile: React.FC<AccountProfileProps> = ({
    user,
    btnTitle,
}) => {
    const [files, setFiles] = useState<File[]>([]);
    const { startUpload } = useUploadThing("media");

    const form = useForm({
        resolver: zodResolver(userValidation), 
        defaultValues: {
            username: user?.username || '',
            name: user?.name || '',
            bio: user?.bio || '',
            profile_photo: user?.image || ''
        }
    });

    const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
        e.preventDefault();

        const fileReader = new FileReader()

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            setFiles(Array.from(e.target.files))

            if (!file.type.includes('image')) return;

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || '';

                fieldChange(imageDataUrl)
            }

            fileReader.readAsDataURL(file)
        }
    }

    const onSubmit = async (values: z.infer<typeof userValidation>) => {
        const blob = values.profile_photo;

        const imgChanged = isBase64Image(blob);

        if (imgChanged) {
            const imgRes = await startUpload(files);

            if (imgRes && imgRes[0].url) {
                values.profile_photo = imgRes[0].url;
            }
        }

        // TODO: Update user profile
      }

    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="flex flex-col justify-start gap-10"
            >
                <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4">
                            <FormLabel className="flex h-24 w-24 items-center justify-center rounded-full bg-dark-4 !important">
                                {field.value ? (
                                    <Image 
                                        src={field.value}
                                        alt="profile photo"
                                        width={96}
                                        height={96}
                                        priority
                                        className="rounded-full object-contain cursor-pointer"
                                    />
                                ) : (
                                    <Image 
                                        src="/assets/profile.svg"
                                        alt="profile photo"
                                        width={24}
                                        height={24}
                                        className="object-contain cursor-pointer"
                                    />
                                )}
                            </FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Input 
                                    type="file"
                                    accept="image/"
                                    placeholder="Upload a photo"
                                    className="cursor-pointer border-none bg-transparent outline-none file:text-blue !important"
                                    onChange={(e) => handleImage(e, field.onChange)}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold text-light-2">
                               Name
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    type="text"
                                    className="border border-dark-4 bg-dark-3 text-light-1 !important"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold text-light-2">
                               Username
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    type="text"
                                    className="border border-dark-4 bg-dark-3 text-light-1 !important"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold text-light-2">
                               Bio
                            </FormLabel>
                            <FormControl>
                                <Textarea 
                                    rows={10}
                                    className="border border-dark-4 bg-dark-3 text-light-1 !important"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="bg-primary-500">Submit</Button>
            </form>
        </Form>
    );
}
 
export default AccountProfile;